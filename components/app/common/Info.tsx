
import axios from "axios";
import type { NextPage } from 'next';
import { useRouter } from 'next/router'
import React, { useState, useEffect } from 'react';
import Image from 'next/image'

import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';

// import NoSSR from '../NoSSR'
import twitter from "../../../assets/app/home/twitter@2x.png";
import tg from "../../../assets/app/home/tg.png";
import Header from './Header'
import dynamic from 'next/dynamic'
import { useConnectWallet } from '@web3-onboard/react'
import { ethers } from 'ethers'
import {CopyToClipboard} from 'react-copy-to-clipboard';
import * as Tooltip from '@radix-ui/react-tooltip';

const ModalLarge = dynamic(
  () => import('./ModalLarge'),
  { ssr: false }
)

const ModalMid = dynamic(
  () => import('./ModalMid'),
  { ssr: false }
)

function formatAddress(address = "", firstlen = 6, lastlen = 3) {
  const tmp = [];
  if (!address) {
    return "";
  }
  tmp.push(address.substr(0, firstlen));
  tmp.push("...");
  if (lastlen !== false) {
    tmp.push(address.substr(-1 * lastlen));
  }
  return tmp.join("");
}

function parseURLParams(url) {
  const params = new URLSearchParams(url.split('?')[1]);
  let paramObj = {};
  for (const [key, value] of params) {
    paramObj[key] = value;
  }

  return paramObj;
}

const toastStyle = {
  position: "top-center",
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
}

const Info: NextPage = (props) => {
  const router = useRouter();
  let urlParams = parseURLParams(router.asPath);
  const [loading, setLoading] = useState(false);
  const [currentTab, setCurrentTab] = useState('hold')
  const [tick, setTick] = useState('');
  // const [tokenList, setTokenList] = useState([]);
  const [E420List, setEos420List] = useState([]);
  const [holdList, setHoldList] = useState([]);
  const [tokenInfo, setTokenInfo] = useState({});
  const [status, setStatus] = useState({});
  const [{ wallet, connecting }, connect, disconnect] = useConnectWallet()
  const [ethersProvider, setProvider] = useState(null);

  // const [chains, setChain] = useSetChain();
  // const code = router?.query?.earneth;
  // console.log(`asset_id: `, urlParams);

  const chain_id = '17777';
  const getTokenInfo = async () => {
    await axios.get(`https://api.yozi.pro/api/v1/token/${urlParams['assets_id']}/`, {
      params: {
        chain_id,
      }
    }).then((res: any) => {
      // console.log(`res`, res.data);
      // debugger;
      if (res?.status === 200) {
        // debugger;
        // setTokenList([{"chain_id":"17777","asset_id":"EINS","name":"EINS","symbol":"EINS","description":"EINS","cover_image_uri":"ipfs://","type":"fungible","protocol":"eos20"}])
        setTokenInfo(res?.data?.data);
      }
    })
  }

  const getStatus = async () => {
    await axios.get(`https://api.yozi.pro/api/v1/status`, {
      params: {
        chain_id,
        'asset_id': [urlParams['assets_id']]
      }
    }).then((res: any) => {
      if (res?.status === 200) {
        setStatus(res?.data)
      }
    })
  }

  const getEos420List = async () => {
    await axios.get(`https://api.yozi.pro/api/v1/asset`, {
      params: {
        chain_id,
        'asset_id': [urlParams['assets_id']]
      }
    }).then((res: any) => {
      // console.log(`res`, res.data);
      // debugger;
      if (res?.status === 200) {
        // debugger;
        // setTokenList([{"chain_id":"17777","asset_id":"EINS","name":"EINS","symbol":"EINS","description":"EINS","cover_image_uri":"ipfs://","type":"fungible","protocol":"eos20"}])
        // setTokenInfo(res?.data?.data);
        setEos420List(res?.data?.data)
      }
    })
  }

  const getHoldList = async () => {
    await axios.get(`https://api.yozi.pro/api/v1/token/${urlParams['assets_id']}/holder`, {
      params: {
        chain_id,
      }
    }).then((res: any) => {
      // console.log(`res`, res.data);
      // debugger;
      if (res?.status === 200) {
        // debugger;
        // setTokenList([{"chain_id":"17777","asset_id":"EINS","name":"EINS","symbol":"EINS","description":"EINS","cover_image_uri":"ipfs://","type":"fungible","protocol":"eos20"}])
        // setTokenInfo(res?.data?.data);
        setHoldList(res?.data?.data);
      }
    })
  }

  const onAmountChange = (e: any) => {
    setTick(e.target.value);
  }

  // const sendTransactionMint = async() => {

  //   const signer = await ethersProvider.getUncheckedSigner()
  //   const json = { p: 'eos420', op: 'mint', tick: tokenInfo?.id };
  //   const data = `data:application/json,${JSON.stringify(json)};`
  //   const hex = ethers.utils.hexlify(ethers.utils.toUtf8Bytes(data));

  //   const txDetails = {
  //     to: `0x${tokenInfo?.to_address}`,
  //     value: tokenInfo?.fee,
  //     data: hex
  //   }
  //   // debugger;
  //   try {
  //     let res = await signer.sendTransaction(txDetails).then(tx => {
  //       // console.log(`tx.hash: `, tx.hash)
  //       // debugger;
  //     })
  //   } catch (error) {
  //     // console.log('error')
  //   }
  //   // return await signer.call(txDetails).then(tx => tx.hash)
  // }

  useEffect(() => {
    if (wallet?.provider) {
      // debugger;
      setProvider(new ethers.providers.Web3Provider(wallet.provider, 'any'))
      // const success = setChain({ chainId: '0x5' });
    }
  }, [wallet])

  useEffect(() => {
    getTokenInfo();
    getEos420List();
    getHoldList();
    getStatus();
  }, [])

  // @ts-ignore
  return (
    <>

      <div className={`hidden flex-col w-full md:flex relative bg-[#13021a]`}>

        <Header />

        <div className="relative  text-white w-full flex  justify-center mt-[50px] pb-[50px]">
          <div className={`min-h-screen`}>
            <div className=" w-[1080px] lg:w-[1280px] xl:w-[1280px] flex flex-col items-center justify-between">

            <div className="flex gap-14 w-full">
              <div className="flex-1 space-y-12">
                <div className="space-y-2 ">
                  <div >
                    <div onClick={() => {
                      router.back();
                    }} className="!hidden group inline-flex cursor-pointer items-center gap-4">
                      <div className="w-10 rounded-[10px] border p-1">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                          viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                          stroke-linejoin="round" className="h-full w-full">
                          <path d="m12 19-7-7 7-7"></path>
                          <path d="M19 12H5"></path>
                        </svg></div>
                      <p className="capitalize opacity-30 ease-in-out group-hover:opacity-100" >token list</p>
                    </div>
                  </div>

                  <p className="text-4xl font-medium capitalize">
                    {tokenInfo?.name}
                  </p>

                  <div className="flex gap-4 ">
                    <div>
                      <div
                        style={{
                          background: 'linear-gradient(to bottom,#4c1d95 2%, #b29bd6)',
                          textShadow: '2px 3px 2px rgba(0, 0, 0, 0.5)'
                        }}
                        className="inline-block rounded-full  bg-primary/20 text-center text-xs font-normal text-primary px-6 py-1 uppercase"
                        >3d</div>
                    </div>
                  </div>

                  <Tooltip.Provider>
                    <Tooltip.Root>
                      <Tooltip.Trigger asChild>
                      <div className="flex items-center gap-8 max-w-[90vw]">
                        <div className="relative w-full overflow-hidden rounded bg-[hsla(0,0%,100%,.1)] h-[6px]" >
                          <div className="absolute left-0 top-0 z-[1] h-full bg-[#4c1d95] " style={{
                            width: (parseInt(tokenInfo?.supply) / parseInt(tokenInfo?.max_supply) * 100)?.toFixed(2) + '%'
                          }}></div>
                          <div className="absolute left-0 top-0 z-[2] h-full bg-[#13021a]/20" ></div>
                        </div>
                        <p className="font-medium">{
                          (parseInt(tokenInfo?.supply) / parseInt(tokenInfo?.max_supply) * 100)?.toFixed(2) + '%'
                        }</p>
                      </div>
                      </Tooltip.Trigger>
                      <Tooltip.Portal>
                        <Tooltip.Content className="TooltipContent" sideOffset={5}>
                          <div className={`text-[black]/70 text-[12px]`}>
                            <p className="">
                            dropped: {
                                status?.dropped
                              }

                            </p>
                            <p className=" ">
                            finalized: {
                                status?.finalized
                              }
                            </p>
                            <p className=" ">
                            pending: <span className={`text-[#4c1d95] font-bold`}>{
                                status?.pending
                              }</span>
                            </p>
                          </div>
                          <Tooltip.Arrow className="TooltipArrow" />
                        </Tooltip.Content>
                      </Tooltip.Portal>
                    </Tooltip.Root>
                  </Tooltip.Provider>



                  <div className="flex gap-3">

                    <div onClick={() => { window?.open('https://twitter.com/EOS420') }} className="flex items-center justify-center opacity-100 cursor-pointer h-[40px] w-[40px] rounded-full border border-[white]">
                      <Image width={25} height={25} src={twitter} alt={`twitter`} />
                    </div>
                    <div onClick={() => { window?.open('https://t.me/eos420') }} className="flex items-center justify-center border border-[white] rounded-full opacity-100 cursor-pointer h-[40px] w-[40px]" >
                      <Image width={25} height={25} src={tg} alt={`tg`} />
                    </div>
                  </div>
                </div>
                <div className="max-w-full rounded-[10px] border p-6 border-[#2e1f2f]">
                  <p className="mb-9 text-2xl capitalize" >overview</p>
                  <div className="space-y-9">
                    <div className="flex items-center justify-between">
                      <p className="opacity-50" >
                        Original Inscription
                      </p>
                      <div className="flex items-center gap-2">
                        <a target="_blank" className="underline"
                          href={`https://explorer.evm.eosnetwork.com/tx/0x${tokenInfo?.tx_hash}`}
                          previewlistener="true">
                          <p>
                            {tokenInfo?.tx_hash ? formatAddress(tokenInfo?.tx_hash) : '-'}
                          </p>
                        </a>
                        <CopyToClipboard text={tokenInfo?.tx_hash} onCopy={() => {
                          toast('Copy Success', toastStyle);
                        }}>
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                            stroke="currentColor"
                            className="h-4 w-4 cursor-pointer opacity-30 hover:opacity-80">
                            <rect width="14" height="14" x="8" y="8" rx="2" ry="2"></rect>
                            <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"></path>
                          </svg>
                        </CopyToClipboard>

                        </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="opacity-50" >Deploy Inscription</p>
                      <div className="flex items-center gap-2"><a target="_blank" className="underline"
                          href={`https://explorer.evm.eosnetwork.com/tx/0x${tokenInfo?.tx_hash}`}
                          previewlistener="true">
                          <p >
                            {tokenInfo?.tx_hash ? formatAddress(tokenInfo?.tx_hash) : '-'}
                          </p>
                        </a>
                        <CopyToClipboard text={tokenInfo?.tx_hash} onCopy={() => {
                          toast('Copy Success', toastStyle);
                        }}>
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                            stroke="currentColor"
                            className="h-4 w-4 cursor-pointer opacity-30 hover:opacity-80">
                            <rect width="14" height="14" x="8" y="8" rx="2" ry="2"></rect>
                            <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"></path>
                          </svg>
                        </CopyToClipboard>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="opacity-50" >Supply</p>
                      <p >{
                        tokenInfo?.supply ? parseInt(tokenInfo?.supply) : '-' } /
                        {tokenInfo?.max_supply ? ' ' + parseInt(tokenInfo?.max_supply) : ' -'}
                      </p>
                    </div>
                    <div className="flex items-center justify-between ">
                      <p className="opacity-50" >Royalty</p>
                      <div className="flex items-center gap-2">
                        <p>30 EOS</p><span className="font-normal opacity-50" >≈$24</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between !hidden">
                      <p className="opacity-50" >Deploy By</p>
                      <div className="flex items-center gap-2">
                        <p >
                          {tokenInfo?.owner ? formatAddress(tokenInfo?.owner) : '-'}
                        </p>
                        <CopyToClipboard text={tokenInfo?.tx_hash} onCopy={() => {
                          toast('Copy Success', toastStyle);
                        }}>
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                            viewBox="0 0 24 24" fill="none"
                            className="h-4 w-4 cursor-pointer opacity-30 hover:opacity-80">
                            <rect width="14" height="14" x="8" y="8" rx="2" ry="2"></rect>
                            <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"></path>
                          </svg>
                        </CopyToClipboard>

                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="opacity-50" >Deploy Time</p>
                      <p >
                        {tokenInfo?.deployed_at?.replace('T', ' ')?.replace('Z', ' ')}
                      </p>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="opacity-50" >Holders</p>
                      <p >{tokenInfo?.holder_count ? tokenInfo?.holder_count : '-'}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full max-w-[612px] space-y-10">
                <div>
                  <div className="border border-[#1b2518] rounded-md aspect-square shrink-0 max-h-full w-full max-w-[612px]">
                    <ModalLarge />
                  </div>
                </div>
                <div className="flex w-full gap-6">

                <button
                    onClick={() => {
                      // sendTransactionMint();
                      router.push('inscription?assets_id=' + tokenInfo?.id);
                    }}
                    style={{
                      boxShadow: '2px 2px 8px rgba(200, 200, 200, 0.5)',
                      background: 'linear-gradient(to bottom,#4c1d95 2%, #b29bd6)',
                      textShadow: '2px 3px 2px rgba(0, 0, 0, 0.5)'
                    }}
                    className="flex items-center justify-center transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-10 rounded-md px-8 flex-1  text-base font-semibold capitalize "
                    >
                      mint
                    </button>

                  <button
                    style={{
                      boxShadow: '2px 2px 8px rgba(200, 200, 200, 0.5)',
                      background: 'linear-gradient(to bottom,#4c1d95 2%, #b29bd6)',
                      textShadow: '2px 3px 2px rgba(0, 0, 0, 0.5)'
                    }}
                    className="flex items-center justify-center transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-10 rounded-md px-8 flex-1  text-base font-semibold capitalize  opacity-30 cursor-not-allowed"
                    >
                      trade
                  </button>
                </div>
              </div>
            </div>


              <div className="w-full mt-[105px] rounded-[10px] border p-4 border-[#2e1f2f]">
                <div className="flex items-center justify-center ">
                  <div className="inline-block rounded-[10px] border border-[#2e1f2f] p-[2px]">
                    <div
                      onClick={() => {
                        setCurrentTab('hold');
                      }}
                      className={`inline-block cursor-pointer rounded-[10px] px-6 py-1 text-sm opacity-40  transition ease-in-out ${currentTab === 'hold' ? 'bg-[#D9D9D91A] !opacity-100' : ''}`}
                      >Holders</div>
                    <div
                      onClick={() => {
                        setCurrentTab('eos')
                      }}
                      className={`inline-block cursor-pointer rounded-[10px] px-6 py-1 text-sm opacity-40 transition ease-in-out ${currentTab === 'eos' ? 'bg-[#D9D9D91A] !opacity-100' : ''} `} >
                      EOS420
                    </div>
                  </div>
                </div>
                <div className="">
                  <div className={`w-full overflow-auto ${currentTab === 'eos' ? ' ' : '!hidden'}`}>
                    <table className="w-full caption-bottom text-sm">
                      <thead className="[&_tr]:border-0">
                        <tr className="border-b transition-colors data-[state=selected]:bg-muted text-sm">
                          <th
                            className="h-10 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px] px-5 py-4">
                            <div className="capitalize opacity-60" >identifier</div>
                          </th>
                          <th
                            className="h-10 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px] px-5 py-4">
                            <div className="capitalize opacity-60" >address</div>
                          </th>

                        </tr>
                      </thead>
                      <tbody className="[&_tr:last-child]:border-0">
                        {
                          E420List?.map((item, i) => {
                            return (
                              <tr
                                key={i}
                                className="transition-colors data-[state=selected]:bg-muted cursor-pointer border-0 text-sm hover:bg-[#FFFFFF0F]"
                                data-state="false">
                                <td
                                  className="p-2 align-middle [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px] px-4 py-3 rounded-l-[10px]">
                                  <p className="font-medium" >{item?.identifier}</p>
                                </td>
                                <td
                                  className="p-2 align-middle [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px] px-4 py-3">
                                  <p className="font-medium" >
                                    <a target="_blank" href={`https://explorer.evm.eosnetwork.com/tx/0x${item?.tx_hash}`}>
                                      {item?.tx_hash}
                                    </a>
                                  </p>
                                </td>

                              </tr>
                            )
                          })
                        }

                      </tbody>
                    </table>
                  </div>

                  <div className={`max-w-full overflow-auto ${currentTab === 'hold' ? ' ' : '!hidden'}`}>
                    <table className="w-full caption-bottom text-sm">
                      <thead className="[&_tr]:border-0">
                        <tr className="border-b transition-colors data-[state=selected]:bg-muted text-sm">
                          <th
                            className="h-10 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px] px-5 py-4">
                            <div className="capitalize opacity-60" >rank</div>
                          </th>
                          <th
                            className="h-10 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px] px-5 py-4">
                            <div className="capitalize opacity-60" >address</div>
                          </th>
                          <th
                            className="h-10 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px] px-5 py-4">
                            <div className="w-[120px] capitalize opacity-60" >percentage</div>
                          </th>
                        </tr>
                      </thead>
                      <tbody className="[&_tr:last-child]:border-0">
                        {
                          holdList?.map((item, i) => {
                            return(
                              <tr
                              key={i}
                              className="transition-colors data-[state=selected]:bg-muted cursor-pointer border-0 text-sm hover:bg-[#FFFFFF0F]"
                                data-state="false">
                                <td
                                  className="p-2 align-middle [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px] px-4 py-3 rounded-l-[10px]">
                                  <p className="font-medium" >{i + 1}</p>
                                </td>

                                <td
                                  className="p-2 align-middle [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px] px-4 py-3">
                                  <p className="font-medium" >{
                                    item?.[0] ? formatAddress(item?.[0]) : ''
                                  }</p>
                                </td>

                                <td
                                  className="p-2 align-middle [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px] px-4 py-3">
                                  <div className="w-[120px]">
                                    <p className="opacity-60" >
                                      {
                                        (parseInt(item?.[1]) / parseInt(tokenInfo?.max_supply) * 100)?.toFixed(2) + '%'
                                      }

                                    </p>
                                    <div aria-valuemax="100" aria-valuemin="0" role="progressbar" data-state="indeterminate" data-max="100"
                                      className="relative w-full overflow-hidden rounded-full bg-primary/20 h-[6px]">
                                      <div data-state="indeterminate" data-max="100" className="h-full w-full flex-1 bg-primary transition-all"
                                        style={{
                                          transform: 'translateX(-98.45%)'
                                        }}></div>
                                    </div>
                                  </div>
                                </td>

                              </tr>
                            )
                          })
                        }


                      </tbody>
                    </table>
                  </div>
                </div>

              </div>
            </div>
          </div>


        </div>


      </div>

      {/* h5 */}
      <div className={`flex md:hidden flex-col w-full relative bg-[#13021a]`}>

        <Header />

        <div className="relative  text-white w-full flex  justify-center mt-[15px]">
          <div className={`min-h-screen px-[10px] mb-[50px]`}>
            <div className=" w-full flex flex-col ">

            <div className="space-y-2">

                  <p className="text-4xl font-medium capitalize">
                    {tokenInfo?.name}
                  </p>

                  <div className="flex items-center gap-8 max-w-[90vw]">
                    <div className="relative w-full overflow-hidden rounded bg-[hsla(0,0%,100%,.1)] h-[6px]" >
                      <div className="absolute left-0 top-0 z-[1] h-full bg-[#4c1d95] " style={{
                        width: (parseInt(tokenInfo?.supply) / parseInt(tokenInfo?.max_supply) * 100)?.toFixed(2) + '%'
                      }}></div>
                      <div className="absolute left-0 top-0 z-[2] h-full bg-[#13021a]/20" ></div>
                    </div>
                    <p className="font-medium">{
                      (parseInt(tokenInfo?.supply) / parseInt(tokenInfo?.max_supply) * 100)?.toFixed(2) + '%'
                    }</p>
                  </div>

                  <div className="flex gap-3">

                    <div onClick={() => { window?.open('https://twitter.com/EOS420') }} className="flex items-center justify-center opacity-100 cursor-pointer h-[40px] w-[40px] rounded-full border border-[#1b2518]">
                      <Image width={25} height={25} src={twitter} alt={`twitter`} />
                    </div>
                    <div onClick={() => { window?.open('https://t.me/eos420') }} className="flex items-center justify-center border border-[#1b2518] rounded-full opacity-100 cursor-pointer h-[40px] w-[40px]" >
                      <Image width={25} height={25} src={tg} alt={`tg`} />
                    </div>
                  </div>
                </div>

            <div className="flex flex-col gap-14 w-full mt-[20px]">
            <div className="w-full max-w-full space-y-10 flex flex-col">
                <div className={`flex items-center justify-center`}>
                  <div className="">
                    <ModalMid />
                  </div>
                </div>
                <div className="flex w-full gap-6">

                <button
                    onClick={() => {
                      router.push('inscription?assets_id=' + tokenInfo?.id);
                    }}
                    style={{
                      boxShadow: '2px 2px 8px rgba(200, 200, 200, 0.5)',
                      background: 'linear-gradient(to bottom,#4c1d95 2%, #b29bd6)',
                      textShadow: '2px 3px 2px rgba(0, 0, 0, 0.5)'
                    }}
                    className="flex items-center justify-center transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-10 rounded-md px-8 flex-1  text-base font-semibold capitalize "
                    >mint</button>

                  <button
                    style={{
                      boxShadow: '2px 2px 8px rgba(200, 200, 200, 0.5)',
                      background: 'linear-gradient(to bottom,#4c1d95 2%, #b29bd6)',
                      textShadow: '2px 3px 2px rgba(0, 0, 0, 0.5)'
                    }}
                    className="flex items-center justify-center transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-10 rounded-md px-8 flex-1  text-base font-semibold capitalize  opacity-30 cursor-not-allowed"
                    >
                      trade
                  </button>
                </div>
              </div>

              <div className="rounded-[10px] border p-6 border-[#2e1f2f] max-w-[90%] min-w-[90vw] m-auto">
                  <p className="mb-9 text-2xl capitalize" >overview</p>
                  <div className="space-y-9">
                    <div className="flex items-center justify-between">
                      <p className="opacity-50" >
                        Original Inscription
                      </p>
                      <div className="flex items-center gap-2">
                        <a target="_blank" className="underline"
                          href={`https://explorer.evm.eosnetwork.com/tx/0x${tokenInfo?.tx_hash}`}
                          >
                          <p>
                            {tokenInfo?.tx_hash ? formatAddress(tokenInfo?.tx_hash) : '-'}
                          </p>
                        </a>
                        <CopyToClipboard text={tokenInfo?.tx_hash} onCopy={() => {
                          toast('Copy Success', toastStyle);
                        }}>
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                            stroke="currentColor"
                            className="h-4 w-4 cursor-pointer opacity-30 hover:opacity-80">
                            <rect width="14" height="14" x="8" y="8" rx="2" ry="2"></rect>
                            <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"></path>
                          </svg>
                        </CopyToClipboard>

                        </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="opacity-50" >Deploy Inscription</p>
                      <div className="flex items-center gap-2"><a target="_blank" className="underline"
                         href={`https://explorer.evm.eosnetwork.com/tx/0x${tokenInfo?.tx_hash}`}
                          >
                          <p >
                            {tokenInfo?.tx_hash ? formatAddress(tokenInfo?.tx_hash) : '-'}
                          </p>
                        </a>
                        <CopyToClipboard text={tokenInfo?.tx_hash} onCopy={() => {
                          toast('Copy Success', toastStyle);
                        }}>
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                            stroke="currentColor"
                            className="h-4 w-4 cursor-pointer opacity-30 hover:opacity-80">
                            <rect width="14" height="14" x="8" y="8" rx="2" ry="2"></rect>
                            <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"></path>
                          </svg>
                        </CopyToClipboard>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="opacity-50" >Supply</p>
                      <p >{
                        tokenInfo?.supply ? parseInt(tokenInfo?.supply) : '-' } /
                        {tokenInfo?.max_supply ? ' ' + parseInt(tokenInfo?.max_supply) : ' -'}
                      </p>
                    </div>
                    <div className="flex items-center justify-between ">
                      <p className="opacity-50" >Royalty</p>
                      <div className="flex items-center gap-2">
                        <p>30 EOS</p><span className="font-normal opacity-50" >≈$24</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between !hidden">
                      <p className="opacity-50" >Deploy By</p>
                      <div className="flex items-center gap-2">
                        <p >
                          {tokenInfo?.owner ? formatAddress(tokenInfo?.owner) : '-'}
                        </p>
                        <CopyToClipboard text={tokenInfo?.tx_hash} onCopy={() => {
                          toast('Copy Success', toastStyle);
                        }}>
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                            viewBox="0 0 24 24" fill="none"
                            className="h-4 w-4 cursor-pointer opacity-30 hover:opacity-80">
                            <rect width="14" height="14" x="8" y="8" rx="2" ry="2"></rect>
                            <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"></path>
                          </svg>
                        </CopyToClipboard>

                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="opacity-50" >Deploy Time</p>
                      <p >
                        {tokenInfo?.deployed_at?.replace('T', ' ')?.replace('Z', ' ')}
                      </p>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="opacity-50" >Holders</p>
                      <p >{tokenInfo?.holder_count ? tokenInfo?.holder_count : '-'}</p>
                    </div>
                  </div>
                </div>

            </div>


            <div className="min-w-[90vw] max-w-[90%] mt-[55px] mx-auto rounded-[10px] border py-4 border-[#2e1f2f] overflow-x-auto">
                <div className="flex items-center justify-center ">
                  <div className="inline-block rounded-[10px] border p-[2px] border-[#2e1f2f]">
                    <div
                      onClick={() => {
                        setCurrentTab('hold');
                      }}
                      className={`inline-block cursor-pointer rounded-[10px] px-6 py-1 text-sm opacity-40  transition ease-in-out ${currentTab === 'hold' ? 'bg-[#D9D9D91A] !opacity-100' : ''}`}
                      >Holders</div>
                    <div
                      onClick={() => {
                        setCurrentTab('eos')
                      }}
                      className={`inline-block cursor-pointer rounded-[10px] px-6 py-1 text-sm opacity-40 transition ease-in-out ${currentTab === 'eos' ? 'bg-[#D9D9D91A] !opacity-100' : ''} `} >
                      EOS420
                    </div>
                  </div>
                </div>
                <div className="">
                  <div className={`min-w-[90%] max-w-[90%] mx-auto overflow-auto ${currentTab === 'eos' ? ' ' : '!hidden'}`}>
                    <table className="w-full caption-bottom text-sm">
                      <thead className="[&_tr]:border-0">
                        <tr className="border-b transition-colors data-[state=selected]:bg-muted text-sm">
                          <th
                            className="h-10 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px] px-5 py-4">
                            <div className="capitalize opacity-60" >identifier</div>
                          </th>
                          <th
                            className="h-10 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px] px-5 py-4">
                            <div className="capitalize opacity-60" >address</div>
                          </th>
                        </tr>
                      </thead>
                      <tbody className="[&_tr:last-child]:border-0">
                        {
                          E420List?.map((item, i) => {
                            return (
                              <tr
                                key={i}
                                className="transition-colors data-[state=selected]:bg-muted cursor-pointer border-0 text-sm hover:bg-[#FFFFFF0F]"
                                data-state="false">
                                <td
                                  className="p-2 align-middle [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px] px-4 py-3 rounded-l-[10px]">
                                  <p className="font-medium" >{item?.identifier}</p>
                                </td>
                                <td
                                  className="p-2 align-middle [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px] px-4 py-3">
                                  <p className="font-medium" >
                                    <a target="_blank" href={`https://explorer.evm.eosnetwork.com/tx/0x${item?.tx_hash}`}>
                                      {item?.tx_hash ? formatAddress(item?.tx_hash) : '-'}
                                    </a>
                                  </p>
                                </td>
                              </tr>
                            )
                          })
                        }

                      </tbody>
                    </table>
                  </div>

                  <div className={`min-w-[90%] max-w-[90%] overflow-auto ${currentTab === 'hold' ? ' ' : '!hidden'}`}>
                    <table className="w-full caption-bottom text-sm">
                      <thead className="[&_tr]:border-0">
                        <tr className="border-b transition-colors data-[state=selected]:bg-muted text-sm">
                          <th
                            className="h-10 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px] px-5 py-4">
                            <div className="capitalize opacity-60" >rank</div>
                          </th>
                          <th
                            className="h-10 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px] px-5 py-4">
                            <div className="capitalize opacity-60" >address</div>
                          </th>
                          <th
                            className="h-10 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px] px-5 py-4">
                            <div className="w-[120px] capitalize opacity-60" >percentage</div>
                          </th>
                        </tr>
                      </thead>
                      <tbody className="[&_tr:last-child]:border-0">
                        {
                          holdList?.map((item, i) => {
                            return(
                              <tr
                                key={i}
                                className="transition-colors data-[state=selected]:bg-muted cursor-pointer border-0 text-sm hover:bg-[#FFFFFF0F]"
                                >
                                <td
                                  className="p-2 align-middle [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px] px-4 py-3 rounded-l-[10px]">
                                  <p className="font-medium" >{i + 1}</p>
                                </td>

                                <td
                                  className="p-2 align-middle [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px] px-4 py-3">
                                  <p className="font-medium" >{
                                    item?.[0] ? formatAddress(item?.[0]) : '-'
                                  }</p>
                                </td>

                                <td
                                  className="p-2 align-middle [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px] px-4 py-3">
                                  <div className="w-[120px]">
                                    <p className="opacity-60 max-w-[50px]" >

                                      {
                                        (parseInt(item?.[1]) / parseInt(tokenInfo?.max_supply) * 100)?.toFixed(2) + '%'
                                      }
                                    </p>
                                    <div aria-valuemax="100" aria-valuemin="0" role="progressbar" data-state="indeterminate" data-max="100"
                                      className="relative w-full overflow-hidden rounded-full bg-primary/20 h-[6px]">
                                      <div data-state="indeterminate" data-max="100" className="h-full w-full flex-1 bg-primary transition-all"
                                        style={{
                                          transform: 'translateX(-98.45%)'
                                        }}></div>
                                    </div>
                                  </div>
                                </td>

                              </tr>
                            )
                          })
                        }


                      </tbody>
                    </table>
                  </div>
                </div>

              </div>
            </div>
          </div>


        </div>


      </div>
    </>
  );
};

export default Info;
