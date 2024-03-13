import { useRouter } from 'next/router'
import { Menu, Transition } from '@headlessui/react'

import { useEffect, useState, Fragment } from 'react'
import { ethers } from 'ethers'
import { useConnectWallet, useSetChain } from '@web3-onboard/react'


export function formatAddress(address = "", firstlen = 6, lastlen = 3) {
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

// 检索交易 (tx) 获取链上交易 (TX) 列表
// /api/v1/transaction/{tx}/?chain_id={chain_id}
// {
//   "data": [
//     {
//       "chain_id": "17777",
//       "tx": "358df7dfcd5055edf4b30adad3adc607a47e6569db7e977f7ba93468c4e324a5",
//       "block": "14de30d732ed53c9139493b1db0c7fbe5800a21b20a8fe2d720e230768c3e0b8",
//       "state": "finalized",
//       "finalized": true,
//       "finalized_at": "2024-01-03T01:25:16.000Z"
//     }
//   ],
//   "next": "CiAKGjBpNDd2"
// }


// 检索资产名录 & 单个资产（系统有哪些发行列表）
// /api/v1/token/{asset_id}?chain_id


// 检索链上动态 (extrinsic) （token => 币的交易信息详情
// /api/v1/extrinsic/{tx}/?chain_id=


// 检索资产(我得「nft」资产列表数据)
// /api/v1/asset?chain_id=x&address=x




const CustomConnectButton = ({onSuccess, loading}) => {

  // const connectedWallets = useWallets()
  const router = useRouter();

  const [{ wallet, connecting }, connect, disconnect] = useConnectWallet()
  const [account, setAccount] = useState(null)
  const [chains, setChain] = useSetChain()


  //console.log(`wallet.provider: `, wallet?.provider)

  // create an ethers provider
  let ethersProvider
  if (wallet && wallet.provider) {
    ethersProvider = new ethers.providers.Web3Provider(wallet.provider, 'any');
    // ethersProvider = new ethers.providers.Web3Provider(wallet.provider, 'any')
    //console.log(`wallet: `,
      // { wallet, connecting }, connect, disconnect
    // );
  }


  useEffect(() => {
    // If the wallet has a provider than the wallet is connected
    if (wallet?.provider) {
      // setProvider(new ethers.providers.Web3Provider(wallet.provider, 'any'))
      // if using ethers v6 this is:
      ethersProvider = new ethers.providers.Web3Provider(wallet.provider, 'any')
      const { name, avatar } = wallet?.accounts[0].ens ?? {}
      setAccount({
        address: wallet.accounts[0].address,
        balance: wallet.accounts[0].balance,
        ens: { name, avatar: avatar?.url }
      })
      setChain({ chainId: '0x4571' });
      // document.querySelector('onboard-v2').shadowRoot.querySelector('.icon-container').style.display = 'none!important';
      let onboardV2 = document?.querySelector('onboard-v2');
      let shadow = onboardV2?.shadowRoot;
      let iconContainer = shadow?.querySelector('.icon-container');
      if (iconContainer) {
        iconContainer.style.display = 'none';
      }
    }
  }, [wallet])

  if(wallet?.provider && account) {
    return (
      // <button
      //   class="bg-background hover:bg-accent inline-flex items-center justify-center rounded-md text-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input  shadow-sm  hover:text-accent-foreground h-[36px] px-4  font-bold text-primary"
      //   type="button" id="radix-:r1q:" aria-haspopup="menu" aria-expanded="true" data-state="open"
      //   aria-controls="radix-:r1r:">
      //     <span>{formatAddress(account?.address}</span>
      //   <svg class="-mr-1 h-5 w-5 text-gray-400" viewBox="0 0 20 20"
      //     fill="currentColor" aria-hidden="true">
      //     <path fill-rule="evenodd"
      //       d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
      //       clip-rule="evenodd"></path>
      //   </svg>
      // </button>
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button
          style={{
            boxShadow: '2px 2px 8px rgba(200, 200, 200, 0.5)',
            background: 'linear-gradient(to bottom,#4c1d95 2%, #b29bd6)',
            textShadow: '2px 3px 2px rgba(0, 0, 0, 0.5)'
          }}
          className="text-white inline-flex items-center justify-center rounded-md text-xs transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50    hover:text-accent-foreground h-[36px] px-4  font-bold text-primary">
              <span>{formatAddress(account?.address)}</span>
              <svg class="-mr-1 h-5 w-5 text-gray-400" viewBox="0 0 20 20"
                fill="white" aria-hidden="true">
                <path fill-rule="evenodd"
                  d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                  clip-rule="evenodd"></path>
              </svg>
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items 
                    style={{zIndex: '999',position:'absolute'}} className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
            <div className="px-1 py-1 ">
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={() => {
                      disconnect(wallet);
                    }}
                    className={`${
                      active ? 'bg-[#4c1d95] text-white' : 'text-gray-900'
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                  >
                    Disconnect
                  </button>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    )
  }

  return (
    <div className={` relative z-[2] `}>
      <button
        disabled={connecting}
        onClick={() => {
          connect();
          setTimeout(() => {
            // disconnect.qu
            let onboardV2 = document?.querySelector('onboard-v2');
            let shadow = onboardV2?.shadowRoot;
            let iconContainer = shadow?.querySelector('.icon-container');
            if (iconContainer) {
              iconContainer.style.display = 'none';
            }
          }, 30);
        }}
        style={{
          // color: white;
          boxShadow: '2px 2px 8px rgba(200, 200, 200, 0.5)',
          background: 'linear-gradient(to bottom,#4c1d95 2%, #b29bd6)',
          textShadow: '2px 3px 2px rgba(0, 0, 0, 0.5)'
        }}
        className="connect-btn text-white flex items-center justify-center rounded-md text-xs transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50  text-primary-foreground shadow  h-[36px] px-4  font-bold"
        ><svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"
          class="mr-2">
          <g clip-path="url(#clip0_300_6427)">
            <rect x="4" y="8" width="12" height="7" fill="url(#paint0_linear_300_6427)" fill-opacity="0.4"></rect>
            <g>
              <path
                d="M14.9998 5.33333H17.4998C17.7208 5.33333 17.9328 5.42113 18.0891 5.57741C18.2454 5.73369 18.3332 5.94565 18.3332 6.16667V16.6667C18.3332 16.8877 18.2454 17.0996 18.0891 17.2559C17.9328 17.4122 17.7208 17.5 17.4998 17.5H2.49984C2.27882 17.5 2.06686 17.4122 1.91058 17.2559C1.7543 17.0996 1.6665 16.8877 1.6665 16.6667V2.83333C1.6665 2.61232 1.7543 2.40036 1.91058 2.24408C2.06686 2.0878 2.27882 2 2.49984 2H14.9998V5.33333ZM3.33317 7V15.8333H16.6665V7H3.33317ZM3.33317 3.66667V5.33333H13.3332V3.66667H3.33317Z"
                fill="white"></path>
              <path d="M15 10.8334H12.5V12.5H15V10.8334Z" fill="white"></path>
            </g>
          </g>
          <defs>
            <linearGradient x1="10" y1="8" x2="10" y2="15" gradientUnits="userSpaceOnUse">
              <stop stop-opacity="0.4"></stop>
              <stop offset="1"></stop>
            </linearGradient>
            <clipPath>
              <rect width="20" height="20" fill="white"></rect>
            </clipPath>
          </defs>
        </svg>Connect Wallet
      </button>
    </div>
  );
};

export default CustomConnectButton;
