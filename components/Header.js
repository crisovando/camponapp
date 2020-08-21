import React, { useState } from 'react';
import { gql, useMutation } from '@apollo/client';
import styles from './Header.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faUpload } from '@fortawesome/free-solid-svg-icons';
import Spinner from './Spinner';

const UPLOAD = gql`
  mutation singleUpload($file: Upload!) {
    singleUpload(file: $file) {
      id
      video
      image
    }
  }
`

export default ({ refetch }) => {
	const [active, setActive] = useState('');
	const hiddenFileInput = React.useRef(null);
	const [uploadFile, { loading }] = useMutation(UPLOAD, { onCompleted: () => refetch() });

	const handleClick = () => {
		hiddenFileInput.current.click();
	};

	const onChange = ({
		target: {
			validity,
			files: [file],
		},
	}) =>
		validity.valid &&
		uploadFile({ variables: { file } });

	return (
		<Spinner loading={loading}>
			<header className={styles.header}>
				<nav className={styles.navbar}>
					<div className={styles.navbar_left}>
						<div className={styles.logo}>
							<a href="#">CampOnApp</a>
						</div>
					</div>
					<div className={styles.navbar_right}>
						<div className={`${styles.menu} ${active}`} onClick={() => setActive(active ? '' : styles.active)}>
							<FontAwesomeIcon className={styles.icon_wrap} icon={faBars} color="white" />
							<div className={styles.containerList}>
								<ul className={styles.list}>
									<li onClick={handleClick}>
										<div className={styles.notify_icon}>
											<FontAwesomeIcon className={styles.icon} icon={faUpload} size="sm" />
										</div>
										<div className={styles.notify_data}>
											<div className={styles.title}>Subir video</div>
											<input
												type="file"
												ref={hiddenFileInput}
												onChange={onChange}
												style={{ display: 'none' }}
											/>
										</div>
									</li>
								</ul>
							</div>
						</div>
					</div>
				</nav>
			</header>
		</Spinner>
	)
}
