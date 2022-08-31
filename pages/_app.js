import Layout from '../components/layout/layout';
import '../styles/globals.css';
import Head from 'next/head';

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Head>
        <title>Nextjs events</title>
        <meta name='description' content='All the events for next js event pages.' />
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />
      </Head>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
