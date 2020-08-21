import Head from 'next/head';
import Header from '../components/Header';
import Search from '../components/Search';
import Section from '../components/Section'
import { useQuery, gql } from '@apollo/client'

const VIDEOS = gql`
  query videos {
    videos {
      id
      video
      image
      codec_audio
      codec_video
      duration
    }
  }
`

function Home() {
  const { data, refetch } = useQuery(VIDEOS, { fetchPolicy: 'network-only' })

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
        <link href="https://fonts.googleapis.com/css2?family=Trade+Winds&display=swap" rel="stylesheet"></link>
      </Head>
      <Header refetch={refetch} />
      <Search />
      <Section title={'Ultimos subidos'} videos={data ? data.videos : null} refetch={refetch} />
      <Section title={'Mas vistos'} videos={data ? data.videos.slice(3) : null} refetch={refetch} />
    </>
  )
}


export default Home;
