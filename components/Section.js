import React, { useState } from 'react';
import { gql, useMutation } from '@apollo/client';
import styles from './Section.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faInfo } from '@fortawesome/free-solid-svg-icons';
import Spinner from './Spinner';
import { convertToHHMMSS } from '../service/times';

const REMOVE = gql`
  mutation removeVideo($id: String!) {
    removeVideo(id: $id)
  }
`

const CarrouselItem = ({ children }) => (
  <div className={styles.carrouselItem}>
    {children}
  </div>
);

const VideoItem = ({ video, id, refetch, codec_audio, codec_video, duration }) => {
  const [active, setActive] = useState('');
  const [removeVideo, { loading }] = useMutation(REMOVE, { onCompleted: () => refetch() });

  return (
    <>
      <div className={styles.toolbox}>
        <div className={`popover ${active}`} >
          <FontAwesomeIcon className="icon_wrap" onClick={() => setActive(active ? '' : 'active')} icon={faInfo} style={{ width: '7px' }} />
          <div className="containerList">
            <ul className={styles.list}>
              <li>Codec Video: {codec_video}</li>
              <li>Codec Audio: {codec_audio}</li>
              <li>Duracion: {convertToHHMMSS(duration)}</li>
            </ul>
          </div>
        </div>
        <FontAwesomeIcon onClick={() => { removeVideo({ variables: { id } }) }} icon={faTrashAlt} style={{ width: '15px' }} />
      </div>
      <Spinner loading={loading}>
        <video controls>
          <source src={video} type="video/mp4" />
          <p>Your browser doesn't support HTML5 video. Here is a <a href={video}>link to the video</a> instead.</p>
        </video>
      </Spinner>
    </>
  );
}

function Section({ title, videos, refetch }) {
  return (
    <div>
      <h2 className={styles.h2}>{title}</h2>
      <section className={styles['section-carrousel']}>
        <div className={styles['carrousel-container']}>
          {videos && videos.map((video) => (
            <CarrouselItem key={video.id}>
              <VideoItem {...video} refetch={refetch} />
            </CarrouselItem>))}
        </div>
      </section>
    </div>
  );
}

export default Section;