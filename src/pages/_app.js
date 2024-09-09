import { NearContext } from '@/context';
import { Inter } from '@next/font/google'
import Head from 'next/head'

// Import Google Font

import '@/styles/globals.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const russoOne = Inter({ subsets: ['latin'] });
export default function MyApp({ Component }) {
 

  return (
    <NearContext.Provider value="">
    <Head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Russo+One&display=swap"
        />
      </Head>
      <Component  />
    </NearContext.Provider>
  );
}
