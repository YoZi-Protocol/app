import Head from 'next/head'
import type { NextPage } from 'next';
import { useRouter } from 'next/router'
import React, { useState, useEffect } from 'react';
//@ts-ignore
import 'react-toastify/dist/ReactToastify.css';


import NoSSR from '../components/NoSSR'
import Header from '../components/app/common/Header'
import Staking from '../components/app/common/staking'


const TG = "https://t.me/brc20ant"
const TW = "https://twitter.com/BRCAntArmy"



const TokensPage: NextPage = (props) => {
  const router = useRouter();



  const metaTitle = 'YoZi Protocol'
  const metaDescription = `Redefining Asset Formats and Empowering Creators in the Metaverse`;

  // @ts-ignore
  return (
    <div>
      <Head>
        <title>{metaTitle}</title>
        <meta name="description"
          content="Redefining Asset Formats and Empowering Creators in the Metaverse" />
        <link rel="icon" href="/favicon.ico?t=2" />
        <meta property="og:title" content={metaTitle} />
        <meta property="og:site_name" content={metaTitle} />
        <meta property="og:description" content={`.ant`} />
        <meta property="og:image" content="" />
        <meta property="og:url" content="" />
        <meta name="description" content={``} />
        {/* <meta name="viewport" content="width=device-width, initial-scale=1" /> */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=0, minimum-scale=1.0, maximum-scale=1.0"/>

        {/* <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0"/> */}
        <meta name="theme-color" content="#ffffff" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={metaTitle} />
        <meta name="twitter:description" content={metaDescription} />
        <meta
          name="twitter:image"
          content=""
        />
        <meta name="google" content="notranslate" />
        <link rel="manifest" href="/manifest.json"></link>
        
      </Head>
      <NoSSR>

        <Staking />

      </NoSSR>

      
      
    </div>
  );
};

export default TokensPage;

