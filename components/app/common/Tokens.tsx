
import axios from "axios";
import type { NextPage } from 'next';
import { useRouter } from 'next/router'
import React, { useState, useEffect, Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { useNotifications } from '@web3-onboard/react'

import 'react-toastify/dist/ReactToastify.css';


import Header from './Header'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { useConnectWallet, useWallets } from '@web3-onboard/react'
import { ethers } from 'ethers'

// console.log(`hexlify, toUtf8Bytes: `, ethers.utils.hexlify, ethers.utils.toUtf8Bytes, ethers)
// console.log(`ethers.providers: `, ethers.providers);

const Model = dynamic(
  () => import('./Modal'),
  { ssr: false }
)

const ModelMid = dynamic(
  () => import('./ModalMid'),
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

const Tokens: NextPage = (props) => {
  const router = useRouter();
  let urlParams = parseURLParams(router.asPath);
  const [loading, setLoading] = useState(false);
  const [currentTab, setCurrentTab] = useState('mint');
  const [tick, setTick] = useState('');
  const connectedWallets = useWallets();
  const [account, setAccount] = useState(null);
  // const [chains, setChain] = useSetChain();
  const [
    notifications, // the list of all notifications that update when notifications are added, updated or removed
    customNotification, // a function that takes a customNotification object and allows custom notifications to be shown to the user, returns an update and dismiss callback
    updateNotify, // a function that takes a Notify object to allow updating of the properties
    preflightNotifications // a function that takes a PreflightNotificationsOption to create preflight notifications
  ] = useNotifications();
  const [tokenList, setTokenList] = useState(
    []
  );
  let [isOpen, setIsOpen] = useState(false)
  const [{ wallet, connecting }, connect, disconnect] = useConnectWallet()
  const [ethersProvider, setProvider] = useState(null);

  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }

  // /api/v1/token/
  const getAllToken = async () => {
    axios.get('https://api.yozi.pro/api/v1/token/', {
      params: {
        chain_id: '17777',
      }
    }).then((res: any) => {
      console.log(`res`, res.data);
      // debugger;
      if (res?.status === 200) {
        // debugger;
        // setTokenList([{
        //   "chain_id": "17777",
        //   "asset_id": "EIFT",
        //   "name": "EIFT",
        //   "symbol": "EIFT",
        //   "description": "EOS-420 Inscription",
        //   "cover_image_uri": "ipfs://",
        //   "type": "non-fungible",
        //   "protocol": "eos420",
        //   "max_supply": "21000000",
        //   "mint_limit": "100",
        //   "state": "deployed",
        //   "supply": "21000000",
        //   "holder_count": "1000000",
        //   "deployed_at": "2024-01-01T00:00:00.000Z",
        //   "to_address": "playuplandme",
        //   "fee": 0.1
        // },
        // {
        //   "chain_id": "17777",
        //   "asset_id": "EINS",
        //   "name": "EINS",
        //   "symbol": "EINS",
        //   "description": "EOS-20 Inscription",
        //   "cover_image_uri": "ipfs://",
        //   "type": "fungible",
        //   "protocol": "eos20",
        //   "max_supply": "21000000",
        //   "mint_limit": "100",
        //   "state": "deployed",
        //   "supply": "2",
        //   "holder_count": "2",
        //   "deployed_at": "2024-01-01T00:00:00.000Z",
        //   "to_address": "playuplandme",
        //   "fee": 0.1
        // }])
        setTokenList(res?.data?.data);
      }
    })
  }

  const onTickChange = (e: any) => {
    setTick(e.target.value);
    if (currentTab === 'mint') {
      if (e.target.value.length === 4) {
        // 接口验证

      } else {

      }
    }

  }


  const onAmountChange = (e: any) => {
    setTick(e.target.value);
  }

  useEffect(() => {
    console.log(`connectedWallets: `, connectedWallets)
    getAllToken()
  }, [])


const sendTransactionWithPreFlightNotifications = async () => {
  console.log(`wallet: `, wallet)
  // debugger;
  // const balanceValue = wallet?.accounts?.[0]?.balance || 0
  const balanceValue = Object.values(wallet?.accounts?.[0]?.balance)[0]
  console.log(`balanceValue: `, balanceValue);
  debugger;
  // const signer = await ethersProvider.getSigner()
  const signer = await ethersProvider.getUncheckedSigner()
  // console.log(`ethers.utils.defaultAbiCoder.encode: `, ethers.utils.defaultAbiCoder.encode(['string', 'string', 'string'], ['eos420', 'mint', 'EINB']));

  console.log(`ethers.utils.toUtf8Bytes: `, ethers.utils.toUtf8Bytes)
  debugger;
  const json = { p: 'eos420', op: 'mint', tick: 'einb' };
  const data = `data:application/json,${JSON.stringify(json)};`
  const hex = ethers.utils.hexlify(ethers.utils.toUtf8Bytes(data));

  console.log(`hex: `, hex)
  const txDetails = {
    to: '0x948a95bCdF029d1600e58784938Cd1b105de17BC',
    value: 1000000000000000,
    data: hex
    // data: ethers.utils.solidityPack(["bytes4", "boolean", "address"], ["0x0000dead", true, "0xE5f2A565Ee0Aa9836B4c80a07C8b32aAd7978e22"])
  }

  const sendTransaction = async() => {
    console.log(`signer: `, signer);
    debugger;
    return await signer.sendTransaction(txDetails).then(tx => tx.hash)
    // return await signer.call(txDetails).then(tx => tx.hash)
  }

  const gasPrice = () => ethersProvider?.getGasPrice()?.then(res => res.toString())
  // const gasPrice = async() => (await ethersProvider.getFeeData()).gasPrice?.toString();

  const estimateGas = () => {
    // console.log(`ethersProvider: `, ethersProvider, ethersProvider.estimateGas)
    // debugger;
    return ethersProvider?.estimateGas(txDetails)?.then(res => res.toString())
  }

  // const transactionHash =
  //   await preflightNotifications({
  //     sendTransaction,
  //     gasPrice,
  //     estimateGas,
  //     balance: balanceValue,
  //     txDetails: txDetails,
  //   })
  sendTransaction();
  // console.log(`transactionHash: `, transactionHash)
}

useEffect(() => {
  // If the wallet has a provider than the wallet is connected
  if (wallet?.provider) {
    // debugger;
    setProvider(new ethers.providers.Web3Provider(wallet.provider, 'any'))
    // const success = setChain({ chainId: '0x5' });
  }
}, [wallet])

useEffect(() => {

}, [])



  return (
    <>
      <div className={` flex-col w-full flex relative bg-[#13021a]`}>

        <Header />

        <div className={`min-h-screen  `}>

          <div className="hidden md:flex relative  text-white w-full  justify-center  ">
            <div className="w-[1080px] lg:w-[1280px] xl:w-[1280px] flex flex-col ">

              <div
                className="w-[160px] mmd:w-[130px] h-[30px] mmd:h-[40px] flex flex-row items-center pl-[50px] rounded-[30px] border-linear-black my-[40px]">
                <span className="text-[16px] text-white">ALL</span>
              </div>

              <div className="mt-6 rounded-[10px] border px-4">
                <div className="w-full overflow-auto">
                  <table>
                    <thead className="[&_tr]:border-0">
                      <tr className="border-b transition-colors data-[state=selected]:bg-muted text-sm">

                      {/* columns-2 pl-[40px] */}
                        <th
                          className="h-10 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px] py-4 columns-2  ">
                          <div className="flex items-center gap-[5px]">
                            <div className="capitalize opacity-60" ></div>
                          </div>
                        </th>

                        <th
                          className=" h-10 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px] py-4 ">
                            <div className="capitalize opacity-60 " >Token</div>
                        </th>

                        <th
                          className="h-10 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px] py-4 ">
                          <div className="capitalize cursor-pointer select-none flex items-center gap-[5px] opacity-60">
                            holders
                          </div>
                        </th>
                        <th
                          className="h-10 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px] py-4  ">
                          <div className="cursor-pointer select-none flex items-center gap-[5px]">
                            <div className="capitalize opacity-60" >supply</div>
                          </div>
                        </th>
                        <th
                          className="h-10 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px] py-4  ">
                            <div className="capitalize opacity-60 flex " >mint limit</div>
                        </th>

                        <th
                          className="h-10 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px] py-4   ">
                            <div className="capitalize opacity-60 flex " >deploy time</div>
                        </th>

                        <th
                          className="h-10 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px] py-4   ">
                            <div className="capitalize opacity-60 flex " > </div>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="[&_tr:last-child]:border-0">
                    {
                        tokenList?.map((item) => {
                          return (
                            <tr key={item?.asset_id} className="transition-colors data-[state=selected]:bg-muted cursor-pointer border-0 text-sm hover:bg-[#815fb7]"
                              data-state="false">
                              <td
                                className="p-2 align-middle [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]  rounded-l-[10px]">
                                <div className="flex gap-[10px]">
                                  <div className="border rounded-md aspect-square shrink-0 max-h-full max-w-[160px] w-[160px]">
                                    <Model />
                                  </div>

                                </div>
                              </td>

                              <td className="p-2 align-middle [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]  text-center ">
                                <p className="text-center font-medium flex justify-center items-center " >

                                  <Link className={`text-[white]/[0.6] underline`} href={`/info/?assets_id=${item?.asset_id}`}>
                                    {item?.symbol}
                                  </Link>
                                </p>
                              </td>

                              <td className="p-2 align-middle [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]  ">
                                <p className="text-center font-medium" >
                                  {item?.holder_count ? item?.holder_count : '-'}
                                </p>
                              </td>
                              <td className="p-2 align-middle [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]  ">
                                <p className="flex items-center font-medium" >
                                  {/* <span className="!hidden font-normal opacity-50" ></span> */}
                                  {/* {item?.max_supply} */}
                                  {parseInt(item?.max_supply)}
                                </p>
                              </td>
                              <td className="p-2 align-middle [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]  ">
                                {/* <p className="flex items-center gap-1 font-medium" >0.0064<span className="font-normal opacity-50" >$277.34</span></p> */}
                                {item?.mint_limit}
                              </td>

                              <td className="align-middle [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]  ">
                                {item?.deployed_at?.replace('T', ' ')?.replace('Z', ' ')}
                              </td>

                              <td className="p-2  [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px] ">
                                <div className="ml-[40px] flex justify-center items-center ">
                                  <button
                                  style={{
                                    background: 'linear-gradient(to bottom,#4c1d95 2%, #b29bd6)',
                                    textShadow: '2px 3px 2px rgba(0, 0, 0, 0.5)'
                                  }}
                                  className="text-white inline-flex items-center justify-center rounded-md text-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50    hover:text-accent-foreground h-9 px-4 py-2 font-bold text-primary"
                                  onClick={async () => {
                                    // openModal();
                                    await sendTransactionWithPreFlightNotifications();
                                  }}>Mint</button>
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

          {/* h5 start */}
          <div className="flex md:hidden relative mt-[20px]  text-white w-full  overflow-x-hidden">
            <div className=" w-full flex flex-col ">
              {
                tokenList?.map((item, i) => {
                  return (
                    <div className={`flex flex-col items-center`}  key={i} >

                      <div className={`mt-[20px] text-[40px]`}>{item?.asset_id}</div>

                      <div className={`w-full my-[20px] text-[14px] `}>
                        {/* <div className={`flex`}> */}
                        <div className={`flex flex-col px-[20px]`}>
                          <div className={`capitalize`}>holders: {item?.holder_count}</div>
                          <div className={`capitalize`}>supply: {item?.max_supply}</div>
                          <div className={`capitalize`}>limit: {item?.mint_limit}</div>
                          <div className={`capitalize`}>deploy time: {item?.deployed_at}</div>
                        </div>

                        {/* </div> */}

                      </div>

                      <div className={`my-[20px]`}>
                        <ModelMid />
                      </div>

                      <div className={`w-[80%] my-[20px] mx-auto`}>
                        <button
                          style={{
                            background: 'linear-gradient(to bottom,#4c1d95 2%, #b29bd6)',
                            textShadow: '2px 3px 2px rgba(0, 0, 0, 0.5)'
                          }}
                          className="w-full text-white inline-flex items-center justify-center rounded-md text-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50    hover:text-accent-foreground h-9 px-4 py-2 font-bold text-primary"
                          onClick={async () => {
                            // openModal();
                            await sendTransactionWithPreFlightNotifications();
                          }}>
                            Mint
                        </button>
                      </div>

                    </div>
                  )
                })
              }
            </div>
          </div>

        </div>

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
                      Payment successful
                    </Dialog.Title>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Your payment has been successfully submitted. We’ve sent
                        you an email with all of the details of your order.
                      </p>
                    </div>

                    <div className="mt-4">
                      <button
                        type="button"
                        className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                        onClick={closeModal}
                      >
                        Got it, thanks!
                      </button>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition>

      </div>


    </>
  );
};

export default Tokens;
