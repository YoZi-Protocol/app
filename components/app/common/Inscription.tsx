
import axios from "axios";
import type { NextPage } from 'next';
import { useRouter } from 'next/router'
import React, { useState, useEffect } from 'react';
import Image from 'next/image'
import warningImg from '/assets/app/home/warning@2x.png';
import selectedImg from '/assets/app/home/selected@2x.png';
import unselectImg from '/assets/app/home/unselect@2x.png';
import { ethers } from 'ethers'
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';

// import NoSSR from '../NoSSR'
import Header from './Header'
import { useConnectWallet } from '@web3-onboard/react'
import BigNumber from "bignumber.js";
// //console.log(`Bignumber: `, Bignumber);
const toastStyle = {
  position: "top-center",
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
}
function parseURLParams(url) {
  const params = new URLSearchParams(url.split('?')[1]);
  let paramObj = {};
  for (const [key, value] of params) {
    paramObj[key] = value;
  }
  // //console.log(`paramObj`, paramObj)
  // // debugger
  return paramObj;
}

const Inscription: NextPage = (props) => {
  const router = useRouter();
  let urlParams = parseURLParams(router.asPath);
  const [loading, setLoading] = useState(false);
  const [currentTab, setCurrentTab] = useState('mint');
  const [sendInfo, setSendInfo] = useState({})

  const [tick, setTick] = useState(urlParams['assets_id']);
  const [amount, setAmount] = useState('');
  const [totalSupply, setTotalSupply] = useState('');
  const [limit, setLimit] = useState('');
  const [ipfs, setIPFS] = useState('');
  const [amt, setAMT] = useState('');
  const [ID, setID] = useState('');
  const [toAddress, setToAddress] = useState('');
  const [ethersProvider, setProvider] = useState(null);
  const [{ wallet, connecting }, connect, disconnect] = useConnectWallet()
  // const [chains, setChain] = useSetChain()


  const checkGetTick = async (name: string) => {
    axios.get(`https://api.yozi.pro/api/v1/token/${name}`, {
      params: {
        chain_id: '17777',
      }
    }).then((res: any) => {
      //console.log(`res`, res.data);
      // debugger;
      if (res?.status === 200) {
        // setTokenList([{"chain_id":"17777","asset_id":"EINS","name":"EINS","symbol":"EINS","description":"EINS","cover_image_uri":"ipfs://","type":"fungible","protocol":"eos20"}])
        setSendInfo(res?.data?.data);
      } else {

      }
    })
  }

  const checkPostTick = async (name: string) => {
    axios.post('https://api.yozi.pro/api/v1/token/', {
      chain_id: '17777',
      name
    }).then((res: any) => {
      //console.log(`res`, res.data);
      debugger;
      if (res?.status === 202) {
        debugger;
        // setTokenList([{"chain_id":"17777","asset_id":"EINS","name":"EINS","symbol":"EINS","description":"EINS","cover_image_uri":"ipfs://","type":"fungible","protocol":"eos20"}])
        setSendInfo(res?.data?.data);
      }
    })
  }

  const sendTransactionDeploy = async() => {
    // //console.log(`signer: `, signer);
    // debugger;

    const signer = await ethersProvider.getUncheckedSigner()
    const json = { p: 'eos420', op: 'deploy', tick, ipfs, max: totalSupply, lim: limit };
    const data = `data:application/json,${JSON.stringify(json)};`
    const hex = ethers.utils.hexlify(ethers.utils.toUtf8Bytes(data));

    const txDetails = {
      to: `0x${sendInfo?.to_address}`,
      value: sendInfo?.fee,
      data: hex
    }
    let res = await signer.sendTransaction(txDetails).then(tx => {
      //console.log(`tx.hash: `, tx.hash)
      debugger;
    })
    // return await signer.call(txDetails).then(tx => tx.hash)
  }


  const sendTransactionMint = async() => {

    const signer = await ethersProvider.getUncheckedSigner()
    const json = { p: 'eos420', op: 'mint', tick, amt };
    const data = `data:application/json,${JSON.stringify(json)};`
    const hex = ethers.utils.hexlify(ethers.utils.toUtf8Bytes(data));

    const txDetails = {
      to: `0x${sendInfo?.to_address}`,
      value: amt ? new BigNumber(sendInfo?.fee).times(amt)?.toString() : sendInfo?.fee,
      data: hex
    }
    // debugger;
    try {
      await signer.sendTransaction(txDetails).then(tx => {
        //console.log(`tx.hash: `, tx.hash)
        if (tx.hash) {
          toast('Mint Success!', toastStyle);
        }
      })
    } catch (error) {
      //console.log('error', typeof error)
      //console.log('error', error)
      debugger;
      toast?.dismiss();
      toast(error?.data?.message, toastStyle);
    }
    // return await signer.call(txDetails).then(tx => tx.hash)
  }

  const sendTransactionTransfer = async() => {

    const signer = await ethersProvider.getUncheckedSigner()
    const json = { p: 'eos420', op: 'transfer', tick, id: ID, to: toAddress };
    const data = `data:application/json,${JSON.stringify(json)};`
    const hex = ethers.utils.hexlify(ethers.utils.toUtf8Bytes(data));

    const txDetails = {
      to: toAddress,
      value: 0,
      data: hex
    }
    debugger;
    try {
      await signer.sendTransaction(txDetails).then(tx => {
        //console.log(`tx.hash: `, tx.hash)
        if (tx.hash) {
          toast('Transfer Success!', toastStyle);
        }
      })
    } catch (error) {
      //console.log('error', typeof error)
      //console.log('error', error)
      debugger;
      toast?.dismiss();
      toast(error?.data?.message, toastStyle);
    }
    // return await signer.call(txDetails).then(tx => tx.hash)
  }

  const onclickDeploy = () => {
    //console.log(`wallet: `, wallet);
    //console.log(`wallet: `, wallet?.accounts?.[0]?.address);
    if (!wallet?.accounts?.[0]?.address) {
      document.querySelector('.connect-btn')?.click();
      return;
    }
    if (!tick) {
      toast('tick cannot be empty', toastStyle);
      return;
    }
    if (!ipfs) {
      toast('ipfs cannot be empty', toastStyle);
      return;
    }
    debugger;
    // alert(1222222);
    sendTransactionDeploy();
  }

  const onclickMint = () => {
    //console.log(`wallet: `, wallet);
    //console.log(`wallet: `, wallet?.accounts?.[0]?.address);
    if (!wallet?.accounts?.[0]?.address) {
      document.querySelector('.connect-btn')?.click();
      return;
    }
    if (!tick) {
      toast('tick cannot be empty', toastStyle);
      return;
    }
    debugger;
    sendTransactionMint();
  }

  const onclickTransfer = () => {
    if (!wallet?.accounts?.[0]?.address) {
      document.querySelector('.connect-btn')?.click();
      return;
    }
    if (!tick) {
      toast('tick cannot be empty', toastStyle);
      return;
    }
    if (!ID) {
      toast('ID cannot be empty', toastStyle);
      return;
    }
    debugger;
    sendTransactionTransfer();
  }

  const onTickChange = (e: any) => {
    setTick(e.target.value);
    if (e.target.value.length === 4) {
      if (currentTab === 'mint') {
        // 接口验证
        checkGetTick(e.target.value);
      } else {
        // 接口验证
        checkPostTick(e.target.value);
      }
    }

  }

  const onAmountChange = (e: any) => {
    setTick(e.target.value);
  }

  useEffect(() => {
    // If the wallet has a provider than the wallet is connected
    if (wallet?.provider) {
      setProvider(new ethers.providers.Web3Provider(wallet.provider, 'any'))
    }
  }, [wallet])

  useEffect(() => {
    if (urlParams['assets_id']) {
      checkGetTick(urlParams['assets_id'])
    }
  }, [])

  // @ts-ignore
  return (
    <>

      {/* pc start */}
      <div className={`hidden flex-col w-full md:flex relative bg-[#13021a]`}>
        <Header />
        <div className="h-screen relative pt-[50px]">
          <div className="flex flex-col items-center text-white">
            <span className="text-[40px] font-[600]">
              EOS-420
            </span>
            <span className="text-[18px] pt-[15px] max-w-[85%] text-center">
              Redefining Asset Formats and Empowering Creators in the Metaverse
            </span>
            <div className="flex flex-row text-[18px]">
              <div className="w-[800px] mmd:w-full">
                <div
                  className="w-[160px] mmd:w-[130px] h-[30px] mmd:h-[40px] flex flex-row items-center justify-center rounded-[30px] border-linear-black my-[40px]">
                  <span className="text-[16px] text-white">EOS-420</span>
                </div>
                <div
                  className="w-full py-[24px] mmd:py-[25px] border border-[#FFFFFF]/60 rounded-[5px] bg-[rgba(255,255,255,0.1)] backdrop-blur">
                  <div className="w-full">
                    <div className="flex flex-col items-center">
                      <div className="flex flex-row text-[14px]">
                        <div
                          onClick={() => {
                            setCurrentTab('mint');
                            setTotalSupply('');
                            setIPFS('');
                          }}
                          className={` flex flex-row items-center rounded-[30px] pl-[2px] bg-violet-900  mr-[40px] ${currentTab === 'mint' ? '!bg-violet-600' : ''}`}>
                          <Image className="w-[28px] h-[28px]" src={currentTab === 'mint' ? selectedImg : unselectImg} alt="unselectImg" />
                          <span className="px-[10px]  ">Mint</span>
                        </div>

                        {/* <div
                          onClick={() => {
                            setCurrentTab('transfer');
                            setTotalSupply('');
                            setIPFS('');
                          }}
                          className={` flex flex-row items-center rounded-[30px] pl-[2px] bg-violet-900  mr-[40px] ${currentTab === 'mint' ? '!bg-violet-600' : ''}`}>
                          <Image className="w-[28px] h-[28px]" src={currentTab === 'transfer' ? selectedImg : unselectImg} alt="unselectImg" />
                          <span className="px-[10px]  ">Transfer</span>
                        </div> */}

                        <div
                          onClick={() => {
                            toast('Coming Soon', toastStyle);
                          }}
                          className={`flex flex-row items-center rounded-[30px] pl-[2px] bg-violet-900 mr-[40px] ${currentTab === 'deploy' ? '!bg-violet-600' : ''} `}>
                          <Image className="w-[28px] h-[28px]" src={currentTab === 'deploy' ? selectedImg : unselectImg} alt="selectedImg" />
                          <span className="px-[10px] opacity-50">Deploy</span>
                        </div>
                      </div>

                      <div className="flex flex-col items-center pb-[30px] mb-[]">

                        <div className="flex flex-row items-center text-[16px] pt-[30px]">
                          <div className="w-[140px] text-right pr-[10px]">
                            <span>Ticker</span>
                          </div>
                          <div
                            className="w-[324px] h-[40px] rounded-[8px] border border-[#FFFFFF]/60 flex items-center px-[20px]">
                            <input disabled onChange={(e) => {
                              onTickChange(e)
                            }} value={tick} maxLength="4" type="text" className="bg-transparent text-[14px] w-full h-full"
                              placeholder="4 characters like &quot;abcd&quot;..." />
                          </div>
                          <div className="w-[140px]"></div>
                        </div>

                        <div className={`flex flex-row items-center text-[16px] py-[15px] ${currentTab === 'transfer' ? '' : '!hidden'}`}>
                          <div className="w-[140px] text-right pr-[10px]">
                            <span>ID</span>
                          </div>
                          <div
                            className="w-[324px] h-[40px] rounded-[8px] border border-[#FFFFFF]/60 flex items-center px-[20px]">
                            <input
                              onChange={(e) => {
                                setID(e?.target?.value)
                              }}
                              value={ID}
                              type="number" className="bg-transparent text-[14px] w-full h-full"
                              placeholder="Please input ID" />
                          </div>
                          <div className="w-[140px]"></div>
                        </div>

                        <div className={`flex flex-row items-center text-[16px] pb-[15px] ${currentTab === 'transfer' ? '' : '!hidden'}`}>
                          <div className="w-[140px] text-right pr-[10px]">
                            <span>To Address</span>
                          </div>
                          <div
                            className="w-[324px] h-[40px] rounded-[8px] border border-[#FFFFFF]/60 flex items-center px-[20px]">
                            <input
                              onChange={(e) => {
                                setToAddress(e?.target?.value)
                              }}
                              value={toAddress}
                              type="text" className="bg-transparent text-[14px] w-full h-full"
                              placeholder="Please input address" />
                          </div>
                          <div className="w-[140px]"></div>
                        </div>

                        <div className={`flex flex-row items-center text-[16px] py-[30px] ${currentTab === 'mint'  ? '' : '!hidden'}`}>
                          <div className="w-[140px] text-right pr-[10px]">
                            <span>Amt</span>
                          </div>
                          <div
                            className="w-[324px] h-[40px] rounded-[8px] border border-[#FFFFFF]/60 flex items-center px-[20px]">
                            <input onChange={(e) => {
                              setAMT(e?.target?.value)
                            }} value={amt} maxLength="3" type="number" className="bg-transparent text-[14px] w-full h-full"
                              placeholder="1-20" />
                          </div>
                          <div className="w-[140px]"></div>
                        </div>

                        <div className={`flex flex-row items-center text-[16px] py-[15px] ${currentTab === 'mint' || currentTab === 'transfer' ? '!hidden' : ''}`}>
                          <div className="w-[140px] text-right pr-[10px]">
                            <span>IPFS</span>
                          </div>
                          <div
                            className="w-[324px] h-[40px] rounded-[8px] border border-[#FFFFFF]/60 flex items-center px-[20px]">
                            <input
                              onChange={(e) => {
                                setIPFS(e?.target?.value)
                              }}
                              value={ipfs}
                              placeholder="Please input IPFS "
                              className="bg-transparent text-[14px] w-full h-full" />
                          </div>
                          <div className="w-[140px]"></div>
                        </div>

                        <div className={`flex flex-row items-center text-[16px] pb-[15px] ${currentTab === 'deploy' ? '' : '!hidden'}`}>
                          <div className="w-[140px] text-right pr-[10px]">
                            <span>Total Supply</span>
                          </div>
                          <div
                            className="w-[324px] h-[40px] rounded-[8px] border border-[#FFFFFF]/60 flex items-center px-[20px]">
                            <input
                              onChange={(e) => {
                                setTotalSupply(e?.target?.value)
                              }}
                              value={totalSupply}
                              type="number" className="bg-transparent text-[14px] w-full h-full"
                              placeholder="Please input amount" />
                          </div>
                          <div className="w-[140px]"></div>
                        </div>

                        <div className={`flex flex-row items-center text-[16px] pb-[15px] ${currentTab === 'deploy' ? '' : '!hidden'}`}>
                          <div className="w-[140px] text-right pr-[10px]">
                            <span>Limit</span>
                          </div>
                          <div
                            className="w-[324px] h-[40px] rounded-[8px] border border-[#FFFFFF]/60 flex items-center px-[20px]">
                            <input
                              onChange={(e) => {
                                setLimit(e?.target?.value)
                              }}
                              value={limit}
                              type="number" className="bg-transparent text-[14px] w-full h-full"
                              placeholder="Please input amount" />
                          </div>
                          <div className="w-[140px]"></div>
                        </div>

                        <div className="w-[720px] h-[1px] bg-[#FFFFFF]/[0.2]"></div>
                        <div className={`flex pt-[20px] w-full px-[68px] ${currentTab === 'deploy' ? '' : '!hidden'}`}>
                          <Image className="w-[26px] h-[26px]"
                            src={warningImg}
                            alt="warningImg" />
                          <span className="text-[14px] text-[#FFCD2A] pl-[10px]">
                            Given the high demand for the "Deploy" function,
                            please note the elevated risk of the "Deploy" feature being quickly taken.
                          </span>
                        </div>
                      </div>
                      <div
                        onClick={() => {
                          if (currentTab === 'mint') {
                            onclickMint();
                          } else if (currentTab === 'transfer') {
                            onclickTransfer();
                          } else if (currentTab === 'deploy') {
                            onclickDeploy();
                          }
                        }}
                        className="bg-[#FFFFFF] rounded-[8px] w-[130px] h-[40px] flex items-center justify-center text-[#333333] text-[16px] cursor-pointer">
                        <span>Next</span></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* pc end */}

      {/* h5 start */}
      <div className={`flex md:hidden flex-col w-full  relative bg-[#13021a]`}>
        <Header />
        <div className="h-screen relative pt-[50px]">
          <div className="flex flex-col items-center text-white">
            <span className="text-[40px] font-[600]">
              EOS-420
            </span>
            <span className="text-[18px] pt-[15px] max-w-[85%] text-center">
              Redefining Asset Formats and Empowering Creators in the Metaverse
            </span>
            <div className="flex flex-row text-[18px]">
              <div className="w-full">

                <div
                  className="w-full mt-[20px] p-[24px] border border-[#FFFFFF]/60 rounded-[5px] bg-[rgba(255,255,255,0.1)] backdrop-blur">
                  <div className="w-full">
                    <div className="flex flex-col ">
                      <div className="flex flex-row text-[14px] mb-[30px]">
                        <div
                          onClick={() => {
                            setCurrentTab('mint');
                            setTotalSupply('');
                            setIPFS('');
                            setID('');
                            setToAddress('');
                          }}
                          className={`px-[25px] flex flex-row items-center rounded-[30px] pl-[2px] bg-violet-900  mr-[40px] ${currentTab === 'mint' ? '!bg-violet-600' : ''}`}>
                          <Image className="w-[28px] h-[28px]" src={currentTab === 'mint' ? selectedImg : unselectImg} alt="unselectImg" />
                          <span className=" ">Mint</span>
                        </div>

                        <div
                          onClick={() => {
                            setCurrentTab('transfer');
                            setTotalSupply('');
                            setIPFS('');
                            setID('');
                            setToAddress('');
                          }}
                          className={`!hidden px-[22px] flex flex-row items-center rounded-[30px] pl-[2px] bg-violet-900  mr-[40px] ${currentTab === 'transfer' ? '!bg-violet-600' : ''}`}>
                          <Image className="w-[28px] h-[28px]" src={currentTab === 'transfer' ? selectedImg : unselectImg} alt="unselectImg" />
                          <span className=" ">Transfer</span>
                        </div>

                        <div
                          onClick={() => {
                            toast('Coming Soon', toastStyle);
                          }}
                          className={`px-[12px] flex flex-row items-center rounded-[30px] pl-[2px] bg-violet-900  mr-[40px] ${currentTab === 'deploy' ? '!bg-violet-600' : ''}`}>
                          <Image className="w-[28px] h-[28px]" src={currentTab === 'deploy' ? selectedImg : unselectImg} alt="selectedImg" />
                          <span className=" opacity-50">Deploy</span>
                        </div>
                      </div>

                      <div className="flex flex-col text-[14px] ">

                        <div className="flex flex-col text-[12px] pt-[30px]">
                          <div className="w-[50px]  pb-[10px]">
                            <span>Ticker</span>
                          </div>
                          <div
                            className="w-full h-[40px] rounded-[8px] border border-[#FFFFFF]/60 flex items-center px-[20px]">
                            <input disabled onChange={(e) => {
                              onTickChange(e)
                            }} value={tick} maxLength="4" type="text" className="bg-transparent text-[14px] w-full h-full"
                              placeholder="4 characters like &quot;abcd&quot;..." />
                          </div>
                          <div className="w-[140px]"></div>
                        </div>

                        <div className={`flex flex-col text-[12px] py-[15px] ${currentTab === 'mint' ? '' : '!hidden'}`}>
                          <div className="w-[50px]  pb-[10px]">
                            <span>Amt</span>
                          </div>
                          <div
                            className="w-full h-[40px] rounded-[8px] border border-[#FFFFFF]/60 flex items-center px-[20px]">
                            <input onChange={(e) => {
                              setAMT(e?.target?.value)
                            }} value={amt} maxLength="2" type="number" className="bg-transparent text-[14px] w-full h-full"
                              placeholder="1-20" />
                          </div>
                          <div className="w-[140px]"></div>
                        </div>

                        <div className={`flex flex-col text-[12px] py-[15px] ${currentTab === 'transfer' ? '' : '!hidden'}`}>
                          <div className="w-[90px]  pb-[10px]">
                            <span>ID</span>
                          </div>
                          <div
                            className="w-full h-[40px] rounded-[8px] border border-[#FFFFFF]/60 flex items-center px-[20px]">
                            <input
                              onChange={(e) => {
                                setID(e?.target?.value)
                              }}
                              value={ID}
                              type="number" className="bg-transparent text-[14px] w-full h-full"
                              placeholder="1-100" />
                          </div>
                        </div>

                        <div className={`flex flex-col text-[12px] pb-[15px] ${currentTab === 'transfer' ? '' : '!hidden'}`}>
                          <div className="w-[90px]  pb-[10px]">
                            <span>To Address</span>
                          </div>
                          <div
                            className="w-full h-[40px] rounded-[8px] border border-[#FFFFFF]/60 flex items-center px-[20px]">
                            <input
                              onChange={(e) => {
                                setToAddress(e?.target?.value)
                              }}
                              value={totalSupply}
                              type="text" className="bg-transparent text-[14px] w-full h-full"
                              placeholder="Please input address" />
                          </div>
                        </div>

                        <div className={`flex flex-col text-[12px] pb-[15px] ${currentTab === 'deploy' ? '' : '!hidden'}`}>
                          <div className="w-[90px]  pb-[10px]">
                            <span>Total Supply</span>
                          </div>
                          <div
                            className="w-full h-[40px] rounded-[8px] border border-[#FFFFFF]/60 flex items-center px-[20px]">
                            <input
                              onChange={(e) => {
                                setTotalSupply(e?.target?.value)
                              }}
                              value={totalSupply}
                              type="number" className="bg-transparent text-[14px] w-full h-full"
                              placeholder="1-100" />
                          </div>
                          {/* <div className="w-[140px]"></div> */}
                        </div>
                        <div className={`flex flex-col text-[12px] py-[15px] ${currentTab === 'deploy' ? '' : '!hidden'}`}>
                          <div className="w-[50px]  pb-[10px]">
                            <span>IPFS</span>
                          </div>
                          <div
                            className="w-full h-[40px] rounded-[8px] border border-[#FFFFFF]/60 flex items-center px-[20px]">
                            <input
                              onChange={(e) => {
                                setIPFS(e?.target?.value)
                              }}
                              value={ipfs}
                              type="number" placeholder="Please input IPFS "
                              className="bg-transparent text-[14px] w-full h-full" />
                          </div>
                          <div className="w-[140px]"></div>
                        </div>

                      </div>
                      <div
                        onClick={() => {
                          if (currentTab === 'mint') {
                            onclickMint();
                          } else if (currentTab === 'transfer') {
                            onclickTransfer();
                          } else if (currentTab === 'deploy') {
                            onclickDeploy();
                          }
                        }}
                        className="my-[20px] bg-[#FFFFFF] rounded-[8px] w-[130px] h-[40px] flex items-center justify-center text-[#333333] text-[16px] cursor-pointer">
                        <span>Next</span></div>
                    </div>
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

export default Inscription;
