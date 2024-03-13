
import axios from "axios";
import type { NextPage } from 'next';
import { useRouter } from 'next/router'
import React, { useState, useEffect, useRef } from 'react';
import { useConnectWallet } from '@web3-onboard/react'
import Pagination from '@mui/material/Pagination';

import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import { ethers } from 'ethers'
import { Dialog, Transition } from '@headlessui/react'
import { Fragment } from 'react'

import Header from './Header'
import dynamic from 'next/dynamic'

const ModalNormal = dynamic(
  () => import('./ModalNormal'),
  { ssr: false }
)


function parseURLParams(url) {
  const params = new URLSearchParams(url.split('?')[1]);
  let paramObj = {};
  for (const [key, value] of params) {
    paramObj[key] = value;
  }
  // console.log(`paramObj`, paramObj)
  // // debugger
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

const Tokens: NextPage = (props) => {
  const router = useRouter();
  const containerRef = useRef(null);
  let urlParams = parseURLParams(router.asPath);
  const [loading, setLoading] = useState(false);
  const [currentTab, setCurrentTab] = useState('mint')
  const [tick, setTick] = useState('');
  const [tokenList, setTokenList] = useState([]);
  const [{ wallet, connecting }, connect, disconnect] = useConnectWallet()
  const [account, setAccount] = useState(null)
  const [ID, setID] = useState('');
  const [toAddress, setToAddress] = useState('');
  const [ethersProvider, setProvider] = useState(null);
  const [params, setParams] = useState({
    size: 12,
    page: 0
  });
  const [count, setCount] = useState(0);
  const [isOpen, setIsOpen] = useState(false)

  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }

  const getMyToken = async (address, params) => {
    params.address = address?.substr(2);
    params.chain_id = '17777';
    axios.get('https://api.yozi.pro/api/v1/asset', {
      params
    }).then((res: any) => {
      if (res?.status === 200) {
        // debugger;
        // setTokenList([{"chain_id":"17777","asset_id":"EINS","name":"EINS","symbol":"EINS","description":"EINS","cover_image_uri":"ipfs://","type":"fungible","protocol":"eos20"}])
        setTokenList(res?.data?.data);
        setCount(res?.data?.total);
      }
    })
  }

  const onclickTransfer = () => {
    if (!wallet?.accounts?.[0]?.address) {
      document.querySelector('.connect-btn')?.click();
      return;
    }
    // if (!tick) {
    //   toast('tick cannot be empty', toastStyle);
    //   return;
    // }
    // if (!ID) {
    //   toast('ID cannot be empty', toastStyle);
    //   return;
    // }

    if (!toAddress) {
      toast('to address cannot be empty', toastStyle);
      return;
    }
    // debugger;
    sendTransactionTransfer();
  }

  const sendTransactionTransfer = async() => {

    const signer = await ethersProvider.getUncheckedSigner()
    const json = { p: 'eos420', op: 'transfer', tick: 'yozi', id: ID, to: toAddress };
    const data = `data:application/json,${JSON.stringify(json)};`
    const hex = ethers.utils.hexlify(ethers.utils.toUtf8Bytes(data));

    const txDetails = {
      to: toAddress,
      value: 0,
      data: hex
    }
    // debugger;
    try {
      await signer.sendTransaction(txDetails).then(tx => {
        //console.log(`tx.hash: `, tx.hash)
        if (tx.hash) {
          toast('Transfer Success!', toastStyle);
          closeModal()
        }
      })
    } catch (error) {
      //console.log('error', typeof error)
      //console.log('error', error)
      debugger;
      toast?.dismiss();
      toast(error?.data?.message, toastStyle);
      closeModal();
    }
    // return await signer.call(txDetails).then(tx => tx.hash)
  }

  useEffect(() => {
    if (wallet?.accounts?.[0]?.address) {
      getMyToken(ethers.utils.getAddress(wallet?.accounts?.[0]?.address), params);
    }
  }, [params])

  // let ethersProvider;
  useEffect(() => {
    // If the wallet has a provider than the wallet is connected
    if (wallet?.provider) {
      // setProvider(new ethers.providers.Web3Provider(wallet.provider, 'any'))
      // if using ethers v6 this is:
      // ethersProvider = new ethers.providers.Web3Provider(wallet.provider, 'any')
      if (wallet?.provider) {
        setProvider(new ethers.providers.Web3Provider(wallet.provider, 'any'))
      }
      const { name, avatar } = wallet?.accounts[0].ens ?? {}
      setAccount({
        address: wallet.accounts[0].address,
        balance: wallet.accounts[0].balance,
        ens: { name, avatar: avatar?.url }
      })
      if (wallet.accounts[0].address) {

        // 0x713cA98d494D92664774E2Ad6B9DA7Fb078fED80
        // 0x10c59fec67d9a7fc35fb2cfbb1120d44657348b9
        // console.log(`ethers: `, ethers);
        // debugger;
        getMyToken(ethers.utils.getAddress((wallet.accounts[0].address)), params);
        // getMyToken(ethers.utils.getAddress('0xaedb27cc7aee4dc74c02cfcc80f71fff7a3dfe36'), params);
      }
    }
  }, [wallet])

  const handleChange = (event, c) => {
    // console.log(`c: `, c)
    // debugger;
    // if (c > count) {
    //   setCount(count + 1)
    // } else if (c < count) {
    //   setCount(count - 1)
    // }
    setCount(c - 1);

    // console.log(1);
    // debugger;
    setParams({
      ...params,
      page: c - 1
    })
  }

  // @ts-ignore
  return (
    <div ref={containerRef} className={`flex-col w-full flex relative bg-[#13021a] pb-[80px]`}>

      <Header />

      <div className=" relative  text-white w-full flex  justify-center mt-[50px] pb-[50px]">
        <div className={`min-h-screen min-w-screen w-[88vw] md:w-[52vw]`}>

          <>
            <Transition appear show={isOpen} as={Fragment}>
              <Dialog as="div" className="relative z-10" onClose={closeModal}>
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="fixed inset-0 bg-black/25" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                  <div className="flex min-h-full items-center justify-center p-4 text-center">
                    <Transition.Child
                      as={Fragment}
                      enter="ease-out duration-300"
                      enterFrom="opacity-0 scale-95"
                      enterTo="opacity-100 scale-100"
                      leave="ease-in duration-200"
                      leaveFrom="opacity-100 scale-100"
                      leaveTo="opacity-0 scale-95"
                    >
                      <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                        <Dialog.Title
                          as="h3"
                          className="text-lg font-medium leading-6 text-gray-900"
                        >
                          To Address
                        </Dialog.Title>
                        <div className="mt-6">
                          <input
                              onChange={(e) => {
                                setToAddress(e?.target?.value)
                              }}
                              value={toAddress}
                              type="text" className="bg-transparent text-[14px] w-full h-full border-[1px] py-2 pl-4"
                              placeholder="Please input to address" />
                        </div>

                        <div className="mt-4">
                          <button
                            type="button"
                            className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                            onClick={() => {
                              // closeModal();
                              onclickTransfer();
                            }}
                          >
                            Confirm
                          </button>
                        </div>
                      </Dialog.Panel>
                    </Transition.Child>
                  </div>
                </div>
              </Dialog>
            </Transition>
          </>

          <div className="mt-[20px] grid grid-cols-2 md:grid-cols-4 justify-center gap-4">
            {
              tokenList && tokenList?.map((item, i) => {
                return (
                  <div
                    key={i}
                    style={{boxShadow:'rgb(200 200 200 / 50%) 2px 4px 8px'}}
                    className=" relative flex h-full flex-col justify-between overflow-hidden rounded-lg  group hover:border hover:border-primary hover:bg-gradient-to-t hover:from-primary/20 hover:to-primary/0">
                    <div className="flex aspect-square flex-col items-center justify-center">
                      <div className="rounded-md aspect-square shrink-0 max-h-full w-full max-w-[260px] flex justify-center items-center">
                        <ModalNormal />
                      </div>
                    </div>
                    <div className="flex flex-col gap-2 p-3">
                      <div className="flex flex-col gap-0">
                        <p className="break-words text-lg font-bold leading-5" >
                          {item?.asset_name}
                        </p>
                        <p className="text-[12px] opacity-40" >Inscription #{item?.identifier}</p>
                      </div>
                      <div className="flex items-center justify-between !hidden">
                        <div className="flex items-center gap-1">
                          <p >30 EOS</p>
                        </div>
                        <p className="text-sm opacity-40" >$24</p>
                      </div>
                      <div className="flex  gap-[10px]">
                        <button
                          onClick={() => {
                            toast?.dismiss();
                            toast('Coming Soon!', toastStyle)
                          }}
                          style={{
                            boxShadow: '2px 2px 8px rgba(200, 200, 200, 0.5)',
                            background: 'linear-gradient(to bottom,#4c1d95 2%, #b29bd6)',
                            textShadow: '2px 3px 2px rgba(0, 0, 0, 0.5)'
                          }}
                          className="md:w-[100px] inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-[36px] px-2 md:px-6  border-primary/60 text-primary group-hover:bg-primary group-hover:text-primary-foreground opacity-60 text-[14px]"
                        >Sell
                        </button>

                        <button
                          onClick={() => {
                            openModal();
                            // console.log(`item: `, item)
                            // debugger;
                            setID(item?.identifier);
                          }}
                          style={{
                            boxShadow: '2px 2px 8px rgba(200, 200, 200, 0.5)',
                            background: 'linear-gradient(to bottom,#4c1d95 2%, #b29bd6)',
                            textShadow: '2px 3px 2px rgba(0, 0, 0, 0.5)'
                          }}
                          className=" w-1/2 inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none  border bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-[36px] px-1  border-primary/60 text-primary group-hover:bg-primary group-hover:text-primary-foreground text-[14px]"
                        >Transfer
                        </button>
                      </div>

                    </div>
                  </div>
                )
              })
            }
            {
              !tokenList.length && (
                <div className={`text-white w-[88vw] md:w-[52vw] h-[60vh] flex items-center justify-center`}>
                  No result
                </div>
              )
            }
          </div>

          <div className={`flex justify-center my-[20px] ${tokenList.length > 0 && count > 0 ? '' : '!hidden'}`} style={{
            // background: 'linear-gradient(to bottom,#4c1d95 2%, #b29bd6)',
          }}>
            <Pagination style={{
              color: 'white'
            }} count={count} onChange={handleChange} />
          </div>

        </div>
      </div>

    </div>
  );
};

export default Tokens;
