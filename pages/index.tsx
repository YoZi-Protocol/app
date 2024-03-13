import type { NextPage } from "next";

import React, { useState } from "react";

import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";

import gitbookIconImg from "../assets/app/home/gitbook-i@2x.png";
import githubIconImg from "../assets/app/home/github.png";
import twitterImg from "../assets/app/home/twitter@2x.png";
import "react-toastify/dist/ReactToastify.css";

import Header from "../components/app/common/Header";
import NoSSR from "../components/NoSSR";
import styles from "../styles/index.module.scss";
import { background } from "@chakra-ui/system";


function parseURLParams(url) {
  const params = new URLSearchParams(url.split("?")[1]);
  const paramObj = {};
  for (const [key, value] of params) {
    paramObj[key] = value;
  }
  // console.log(`paramObj`, paramObj)
  // // debugger
  return paramObj;
}

const Home: NextPage = (props) => {
  const router = useRouter();
  const urlParams = parseURLParams(router.asPath);
  // const { chain } = getPublicClient();
  const [screenHeight, setScreenHeight] = useState("");
  const [modalIsOpen, setIsOpen] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [userAddress, setUserAddress] = useState("");
  const [currentStep, setCurrentStep] = useState("login");
  const [loading, setLoading] = useState(false);
  // const [chains, setChain] = useSetChain();
  // const { address, isConnected } = useAccount()

  const metaTitle = "YoZi Protocol";
  const metaDescription = `Redefining Asset Formats and Empowering Creators in the Metaverse`;

  // @ts-ignore
  return (
    <div>
      <Head>
        <title>{metaTitle}</title>
        <meta
          name="description"
          content="Redefining Asset Formats and Empowering Creators in the Metaverse"
        />
        <link rel="icon" href="/favicon.ico?t=2" />
        <meta property="og:title" content={metaTitle} />
        <meta property="og:site_name" content={metaTitle} />
        <meta property="og:description" content="YoZi Protocol" />
        <meta property="og:image" content="" />
        <meta property="og:url" content="" />
        <meta name="description" content="" />
        {/* <meta name="viewport" content="width=device-width, initial-scale=1" /> */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=0, minimum-scale=1.0, maximum-scale=1.0"/>

        <meta name="theme-color" content="#ffffff" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={metaTitle} />
        <meta name="twitter:description" content={metaDescription} />
        <meta name="twitter:image" content="" />
        <meta name="google" content="notranslate" />
        <link rel="manifest" href="/manifest.json" />
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
        <div className="hidden flex-col w-full md:flex relative bg-[#13021a]">
          <Header />

          <div className={`min-h-screen relative  ${styles["main-bg"]}`} />

          <div className="h-screen box-border text-white">
            <div className="w-[1100px] mx-auto">
              <div className="text-[40px] mt-[70px] mb-[50px]  text-center">
                <span className="font-[600]">Meet to YoZi</span>
              </div>
              <div>
                <div>
                  <div className="flex flex-row text-white">
                    <div className="text-[20px] mb-[60px] mr-[120px]">
                      <div
                        className="h-[280px] w-[480px]  rounded-[35px] px-[20px] mt-[16px] py-[26px] bg-[rgba(255,255,255,0.1)] backdrop-blur"
                        style={{
                          boxShadow: "rgb(200 200 200 / 50%) 2px 4px 8px",
                        }}
                      >
                        <p
                          className="text-[25px] text-center mb-[30px]"
                          style={{ textShadow: "rgb(0 0 0 / 50%) 4px 6px 2px" }}
                        >
                          Token Extensions
                        </p>
                        <span
                          className="text-[16px] text-center  mb-[30px]"
                          style={{ textShadow: "rgb(0 0 0 / 50%) 4px 6px 2px" }}
                        >
                          Token Extensions (formerly known as 3D YoZi) allow us
                          to store protocol data directly in the YoZi token mint
                          account, removing the need for EOS NFT standards.
                        </span>
                      </div>
                    </div>
                    <div className="text-[20px] mb-[20px]">
                      <div
                        style={{
                          boxShadow: "rgb(200 200 200 / 50%) 2px 4px 8px",
                          backgroundColor: "#13021a",
                        }}
                        className="h-[280px] w-[480px]  rounded-[35px] px-[20px] mt-[16px] py-[26px] bg-[rgba(255,255,255,0.1)] backdrop-blur"
                      >
                        <p
                          className="text-[28px] text-center mb-[30px]"
                          style={{ textShadow: "rgb(0 0 0 / 50%) 4px 6px 2px" }}
                        >
                          Duality of FT and NFT
                        </p>
                        <span
                          className="text-[16px] text-center"
                          style={{ textShadow: "rgb(0 0 0 / 50%) 4px 6px 2px" }}
                        >
                          $YoZi is the first YoZi Protocol token that can be
                          traded as a regular token and an NFT, providing
                          trading diversity, and can be merged or split,
                          enhancing its flexibility and utility.
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="flex flex-row text-white">
                    <div className="text-[20px] mb-[20px] mr-[120px]">
                      <div
                        style={{
                          boxShadow: "rgb(200 200 200 / 50%) 2px 4px 8px",
                          backgroundColor: "#13021a",
                        }}
                        className="h-[280px] w-[480px]  rounded-[35px] px-[20px] mt-[16px] py-[26px] bg-[rgba(255,255,255,0.1)] backdrop-blur"
                      >
                        <p
                          className="text-[28px] text-center  mb-[30px]"
                          style={{ textShadow: "rgb(0 0 0 / 50%) 4px 6px 2px" }}
                        >
                          Crowdfunded LP
                        </p>
                        <span
                          className="text-[16px]"
                          style={{ textShadow: "rgb(0 0 0 / 50%) 4px 6px 2px" }}
                        >
                          By adding a small fee to each mint, we can crowdfund
                          an LP in a fair distributed manner, solving Token
                          YoZi's problem of low liquidity on the fungible DEX
                          side of the two way bridge, enabling immediate
                          tradability upon mint out.
                        </span>
                      </div>
                    </div>
                    <div className="text-[20px] mb-[20px]">
                      <div
                        style={{
                          boxShadow: "rgb(200 200 200 / 50%) 2px 4px 8px",
                        }}
                        className="h-[280px] w-[480px]  rounded-[35px] px-[20px] mt-[16px] py-[26px] bg-[rgba(255,255,255,0.1)] backdrop-blur"
                      >
                        <p
                          className="text-[28px] text-center mb-[30px]"
                          style={{ textShadow: "rgb(0 0 0 / 50%) 4px 6px 2px" }}
                        >
                          Royalty Management System
                        </p>
                        <span
                          className="text-[16px] text-center"
                          style={{ textShadow: "rgb(0 0 0 / 50%) 4px 6px 2px" }}
                        >
                          Our platform incorporates a robust royalty management
                          system powered by YoZi Protocol. Launchers can set
                          royalty terms for their assets, earning a percentage
                          of each transaction or usage.
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
            
          <div
            className="py-[30px] px-[20px] "
            style={{ color: "white", marginTop: "120px" }}
          >
            {/* <span
              className="text-linear text-[26px] font-[600]"
              style={{
                color: "white",
                marginLeft: "60px",
                fontFamily: "BioRhyme",
                fontWeight: "600",
                fontSize: "30px",
              }}
            >
              Economic Model
            </span> */}
            <div className="text-[40px] mt-[70px] mb-[50px]  text-center">
              <span className="font-[600]">Economic Model</span>
            </div>
          </div>
          <div className={`min-h-screen relative  ${styles["flow-bg"]}`} />
          
          <div className={`min-h-screen relative  ${styles["future-bg"]}`} />
          
           {/* future */}

          <div className="h-screen box-border relative text-white">
            <div className="flex flex-col items-center pt-[100px]">
              <div className="text-[60px] pb-[84px]">
                <span className="font-[600]">ROAD MAP</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="flex flex-row w-[1240px] text-[15px] items-end">
                  <div className="flex-1">
                    <p className="max-w-[380px] font-[300]">
                    Protocol Optimization and Feature Expansion<br />
                    User Interface and Experience Improvements<br />
                    Community Building and Market Promotion<br />
                    $YoZi Token IDO Preparation<br />
                    Launch $YoZi Token IDO<br />
                    $YoZi Token Listing on CEX<br />
                    </p>
                  </div>
                  <div className="flex-1">
                    <p className="max-w-[300px] font-[300]">
                      Integration of More Asset Types<br />
                      Establishment of Partnerships<br />
                      Initial User Feedback and Iterative Updates<br />
                    </p>
                  </div>
                  <div className="flex-1">
                    <p className="max-w-[380px] font-[300]">
                    Develop 3D Metaverse Game <br />
                    Integrate ETH, BTC, EOS, Solana chains to complete NFT-TOKEN
                    conversion feature <br />
                    List on other CEXs <br />
                    List more than 20 3D assets on YoZi Protocol <br />
                    </p>
                  </div>
                </div>
                <div className="flex flex-row w-[1280px] text-[18px] px-[20px] py-[15px] relative items-center">
                  <div className="w-full absolute h-[1px] bg-[#FFFFFF]/[0.5] left-0" />
                  <div className="flex-1">
                    <div className="w-[20px] h-[20px] bg-[#fff]/[0.2] rounded-full flex items-center justify-center">
                      <span className="w-[11px] h-[11px] bg-[#fff] rounded-full" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="w-[20px] h-[20px] bg-[#fff]/[0.2] rounded-full flex items-center justify-center">
                      <span className="w-[11px] h-[11px] bg-[#fff] rounded-full" />
                    </div>
                  </div>
                  <div className="flex-[.6]">
                    <div className="w-[20px] h-[20px] bg-[#fff]/[0.2] rounded-full flex items-center justify-center">
                      <span className="w-[11px] h-[11px] bg-[#fff] rounded-full" />
                    </div>
                  </div>
                  <div className="flex-[.6]">
                    <div className="w-[20px] h-[20px] bg-[#fff]/[0.2] rounded-full flex items-center justify-center">
                      <span className="w-[11px] h-[11px] bg-[#fff] rounded-full" />
                    </div>
                  </div>
                </div>
                <div className="flex flex-row w-[1240px] text-[30px]">
                  <span className="flex-1"> 2024 Q1 </span>
                  <span className="flex-1"> 2024 Q2 </span>
                  <span className="flex-[.6]"> 2024 Q3</span>
                </div>
              </div>
            </div>
            <div className="flex flex-row justify-center">
              <div className="flex flex-col items-center absolute bottom-[40px] ">
                <div className="flex flex-row ">
                  <a
                    className="mr-[19px]"
                    target="block"
                    href="https://twitter.com/Eos420/"
                    previewlistener="true"
                  >
                    <Image
                      alt="twitterImg"
                      className="w-[24px] h-[24px]"
                      src={twitterImg}
                      alt=""
                    />
                  </a>
                  {/* <a className="mr-[19px]" target="block"
                      href=""
                      previewlistener="true"><Image
                      className="w-[24px] h-[24px]"
                      alt="discordImg"
                      src={discordImg} /></a> */}
                  <a
                    className="mr-[19px]"
                    target="block"
                    href="https://eos420.gitbook.io/yozi-protocol/"
                  >
                    <Image
                      className="w-[24px] h-[24px]"
                      src={gitbookIconImg}
                      alt="gitbookIconImg"
                    />
                  </a>
                  <a
                    className="mr-[19px]"
                    target="block"
                    href="https://github.com/YoZi-Protocol"
                  >
                    <Image
                      className="w-[24px] h-[24px]"
                      src={githubIconImg}
                      alt="githubIconImg"
                    />
                  </a>
                  {/* <a
                        className="mr-[19px]" target="block" href="javascript:;">
                    <Image className="w-[24px] h-[24px]"
                      width={24}
                      height={24}
                      src="https://www.x-gon.com//assets/home/github-fill@2x.png"
                      alt="github-fill" /></a> */}
                </div>
                <div>
                  <span className="text-[14px] opacity-60">
                    @2024 YoZi Protocol All Rights Reserved
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* h5 start */}
        <div
          className={`flex flex-col md:hidden relative bg-[#13021a] w-full `}
        >
          <Header />

          <div
            className={`h-[200px] relative !bg-[cover]  ${styles["main-bg"]}`}
          />
          <div className="min-h-screen box-border text-white">
            <div className="w-full ">
              <div className="mt-[30px]  py-[10px] px-[20px] ">
                <span className="text-linear text-[20px] font-[600]">
                  Meet to YoZi
                </span>
              </div>
              <div>
                <div>
                  <div className="flex flex-col text-white">
                    <div className="text-[14px] mb-[20px] px-[20px]">
                      <div
                        style={{
                          boxShadow: "rgb(200 200 200 / 50%) 2px 4px 8px",
                          backgroundColor:'#2b1c31'
                        }}
                        className=" w-full rounded-[35px] px-[20px] mt-[16px] py-[26px]"
                      >
                         <p
                            className="text-[16px] text-center mb-[20px]"
                            style={{
                              textShadow: "rgb(0 0 0 / 50%) 4px 6px 2px",
                            }}
                          >
                            Token Extensions
                          </p>
                        <span
                          className="text-[14px] text-center"
                          style={{ textShadow: "rgb(0 0 0 / 50%) 4px 6px 2px" }}
                        >
                          Token Extensions (formerly known as 3D YoZi) allow us
                          to store protocol data directly in the YoZi token mint
                          account, removing the need for EOS NFT standards.
                          Royalty Management System
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-col text-white">
                      <div className="text-[14px] mb-[20px] px-[20px]">
                        <div
                          style={{
                            boxShadow: "rgb(200 200 200 / 50%) 2px 4px 8px",
                          }}
                          className=" w-full rounded-[35px] px-[20px] mt-[16px] py-[26px]"
                        >
                          <p
                            className="text-[16px] text-center mb-[20px]"
                            style={{
                              textShadow: "rgb(0 0 0 / 50%) 4px 6px 2px",
                            }}
                          >
                            Duality of FT and NFT
                          </p>
                          <span
                            className="text-[14px] text-center"
                            style={{
                              textShadow: "rgb(0 0 0 / 50%) 4px 6px 2px",
                            }}
                          >
                            $YoZi is the first YoZi Protocol token that can be
                            traded as a regular token and an NFT, providing
                            trading diversity, and can be merged or split,
                            enhancing its flexibility and utility.
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="flex flex-col text-white">
                    <div className="text-[14px] mb-[20px] px-[20px]">
                      <div
                        style={{
                          boxShadow: "rgb(200 200 200 / 50%) 2px 4px 8px",
                          backgroundColor:'#2b1c31'
                        }}
                        className=" w-full rounded-[35px] px-[20px] mt-[16px] py-[26px]"
                      >
                        <p
                          className="text-[16px] text-center mb-[20px]"
                          style={{ textShadow: "rgb(0 0 0 / 50%) 4px 6px 2px" }}
                        >
                          Crowdfunded LP
                        </p>
                        <span
                          className="text-[14px] text-center"
                          style={{ textShadow: "rgb(0 0 0 / 50%) 4px 6px 2px" }}
                        >
                          By adding a small fee to each mint, we can crowdfund
                          an LP in a fair distributed manner, solving Token
                          YoZi's problem of low liquidity on the fungible DEX
                          side of the two way bridge, enabling immediate
                          tradability upon mint out.
                        </span>
                      </div>
                    </div>
                    <div className="text-[14px] mb-[20px] px-[20px]">
                        <div
                          style={{
                            boxShadow: "rgb(200 200 200 / 50%) 2px 4px 8px",
                          }}
                          className=" w-full rounded-[35px] px-[20px] mt-[16px] py-[26px]"
                        >
                          <p
                            className="text-[16px] text-center mb-[20px]"
                            style={{
                              textShadow: "rgb(0 0 0 / 50%) 4px 6px 2px",
                            }}
                          >
                             Royalty Management System 
                          </p>
                          <span
                            className="text-[14px] text-center"
                            style={{
                              textShadow: "rgb(0 0 0 / 50%) 4px 6px 2px",
                            }}
                          >
                          Our platform incorporates a
                          robust royalty management system powered by YoZi
                          Protocol. Launchers can set royalty terms for their
                          assets, earning a percentage of each transaction or
                          usage.
                          </span>
                        </div>
                      </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            className="py-[30px] px-[20px] "
            style={{ color: "white", marginTop: "40px" }}
          >
            <span
              className="text-linear text-[20px] font-[600]"
              style={{ color: "white" }}
            >
              Economic Model
            </span>
          </div>
          <div
            className={`h-[200px] relative !bg-[cover]  ${styles["flow-bg"]}`}
          />

          <div className={`min-h-screen relative  ${styles["future-bg"]}`} />
          <div className=" box-border  text-white my-[10px]">
            <div className="flex flex-col  ">
              <div className="text-[30px] text-center">
                <span className="font-[600]">ROAD MAP</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-[20px] mt-[30px]"> 2024 Q1 </span>
                <p
                  className="max-w-[380px] text-[14px] font-[300] p-[20px]"
                  style={{ width: "100%", textAlign: "center" }}
                >
                    Protocol Optimization and Feature Expansion<br />
                    User Interface and Experience Improvements<br />
                    Community Building and Market Promotion<br />
                    $YoZi Token IDO Preparation<br />
                    Launch $YoZi Token IDO<br />
                    $YoZi Token Listing on CEX<br />
                </p>

                <span className="text-[20px]">2024 Q2</span>

                <p
                  className="max-w-[380px] text-[14px] font-[300] p-[20px]"
                  style={{ width: "100%", textAlign: "center" }}
                >
                  Integration of More Asset Types<br />
                  Establishment of Partnerships<br />
                  Initial User Feedback and Iterative Updates<br />
                </p>

                <span className="text-[20px] mt-[20px]"> 2024 Q3 </span>

                <p
                  className="max-w-[360px] text-[14px]  font-[300] p-[20px]"

                  style={{
                    margin: "0px 0 80px",
                    width: "100%",
                    textAlign: "center",
                  }}
                >
                  Develop 3D Metaverse Game <br />
                  Integrate ETH, BTC, EOS, Solana chains to complete NFT-TOKEN
                  conversion feature <br />
                  List on other CEXs <br />
                  List more than 20 3D assets on YoZi Protocol <br />
                </p>
              </div>
            </div>

            <div className="flex flex-row justify-center">
              <div className="flex flex-col items-center absolute bottom-[30px] ">
                <div className="flex flex-row ">
                  <a
                    className="mr-[19px]"
                    target="block"
                    href="https://twitter.com/Eos420/"
                    previewlistener="true"
                  >
                    <Image
                      alt="twitterImg"
                      className="w-[24px] h-[24px]"
                      src={twitterImg}
                      alt=""
                    />
                  </a>

                  <a
                    className="mr-[19px]"
                    target="block"
                    href="https://eos420.gitbook.io/eos-420/"
                  >
                    <Image
                      className="w-[24px] h-[24px]"
                      src={gitbookIconImg}
                      alt="gitbookIconImg"
                    />
                  </a>
                  <a
                    className="mr-[19px]"
                    target="block"
                    href="https://github.com/YoZi-Protocol"
                  >
                    <Image
                      className="w-[24px] h-[24px]"
                      src={githubIconImg}
                      alt="githubIconImg"
                    />
                  </a>
                </div>
                <div>
                  <span className="text-[11px] opacity-60">
                    @2024 YoZi Protocol All Rights Reserved
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </NoSSR>
    </div>
  );
};

export default Home;
