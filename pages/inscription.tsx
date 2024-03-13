import React, { useState } from 'react';

import Head from 'next/head';

import type { NextPage } from 'next';

import { useRouter } from 'next/router';

import 'react-toastify/dist/ReactToastify.css';
import Inscription from '../components/app/common/Inscription';
import NoSSR from '../components/NoSSR';

const TG = 'https://t.me/brc20ant';
const TW = 'https://twitter.com/BRCAntArmy';

function parseURLParams(url) {
  const params = new URLSearchParams(url.split('?')[1]);
  const paramObj = {};
  for (const [key, value] of params) {
    paramObj[key] = value;
  }
  // console.log(`paramObj`, paramObj)
  // // debugger
  return paramObj;
}

const InscriptionPage: NextPage = props => {
  const router = useRouter();
  const urlParams = parseURLParams(router.asPath);

  const [modalIsOpen, setIsOpen] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [userAddress, setUserAddress] = useState('');
  const [currentStep, setCurrentStep] = useState('login');
  const [loading, setLoading] = useState(false);

  const [isHasGenesisNft, setGenesisHasNft] = useState(true);

  const toPage = () => {
    // let r = `/imbox?earneth=${code || 1}`
    // if (chain?.name === 'mantle') {
    //   r = `/dropBox?earneth=${code || 1}&chain=mantle`
    // }
    // router.push(r);
  };

  const metaTitle = 'YoZi Protocol';
  const metaDescription = `Redefining Asset Formats and Empowering Creators in the Metaverse`;

  // @ts-ignore
  return (
    <div>
      <Head>
        <title>{metaTitle}</title>
        <meta
          name='description'
          content='Redefining Asset Formats and Empowering Creators in the Metaverse'
        />
        <link rel='icon' href='/favicon.ico?t=2' />
        <meta property='og:title' content={metaTitle} />
        <meta property='og:site_name' content={metaTitle} />
        <meta property='og:description' content='.ant' />
        <meta property='og:image' content='' />
        <meta property='og:url' content='' />
        <meta name='description' content='' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <meta name='theme-color' content='#ffffff' />
        <meta name='twitter:card' content='summary_large_image' />
        <meta name='twitter:title' content={metaTitle} />
        <meta name='twitter:description' content={metaDescription} />
        <meta name='twitter:image' content='' />
        <meta name='google' content='notranslate' />
        <link rel='manifest' href='/manifest.json' />
        {/* <script async src="https://www.googletagmanager.com/gtag/js?id=G-KC2GE3VWBN"></script> */}
        {/* <script */}
        {/*  dangerouslySetInnerHTML={{ */}
        {/*    __html: ` window.dataLayer = window.dataLayer || []; */}
        {/*    function gtag(){dataLayer.push(arguments);} */}
        {/*    gtag('js', new Date()); */}
        {/*    gtag('config', 'G-KC2GE3VWBN');` */}
        {/*  }} */}
        {/* > */}
        {/* </script> */}
      </Head>
      <NoSSR>
        <Inscription />
      </NoSSR>
    </div>
  );
};

export default InscriptionPage;
