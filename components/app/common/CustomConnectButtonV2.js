import { useEffect, useState } from 'react';

import metamaskLogo from 'assets/app/home/metamask.svg';
import walletConnectLogo from 'assets/app/home/wallet-connect.svg';
import ethIcon from 'assets/app/meta/eth-icon.svg';
import WalletPng from 'assets/app/wallet@2x.png';
import OkxWalletLogo from 'assets/okx.png';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';

async function getTrustWalletInjectedProvider({ timeout } = { timeout: 3000 }) {
  const provider = getTrustWalletFromWindow();

  if (provider) {
    return provider;
  }

  return listenForTrustWalletInitialized({ timeout });
}

async function listenForTrustWalletInitialized(
  { timeout } = { timeout: 3000 },
) {
  return new Promise(resolve => {
    const handleInitialization = () => {
      resolve(getTrustWalletFromWindow());
    };

    window.addEventListener('trustwallet#initialized', handleInitialization, {
      once: true,
    });

    setTimeout(() => {
      window.removeEventListener(
        'trustwallet#initialized',
        handleInitialization,
        { once: true },
      );
      resolve(null);
    }, timeout);
  });
}

function getTrustWalletFromWindow() {
  const isTrustWallet = ethereum => {
    // Identify if Trust Wallet injected provider is present.
    const trustWallet = !!ethereum.isTrust;

    return trustWallet;
  };

  const injectedProviderExist =
    typeof window !== 'undefined' && typeof window.ethereum !== 'undefined';

  // No injected providers exist.
  if (!injectedProviderExist) {
    return null;
  }

  // Trust Wallet was injected into window.ethereum.
  if (isTrustWallet(window.ethereum)) {
    return window.ethereum;
  }

  // Trust Wallet provider might be replaced by another
  // injected provider, check the providers array.
  if (window.ethereum?.providers) {
    // ethereum.providers array is a non-standard way to
    // preserve multiple injected providers. Eventually, EIP-5749
    // will become a living standard and we will have to update this.
    return window.ethereum.providers.find(isTrustWallet) ?? null;
  }

  // Trust Wallet injected provider is available in the global scope.
  // There are cases that some cases injected providers can replace window.ethereum
  // without updating the ethereum.providers array. To prevent issues where
  // the TW connector does not recognize the provider when TW extension is installed,
  // we begin our checks by relying on TW's global object.
  return window.trustwallet ?? null;
}

export function formatAddress(address = '', firstlen = 6, lastlen = 3) {
  const tmp = [];
  if (!address) {
    return '';
  }
  tmp.push(address.substr(0, firstlen));
  tmp.push('...');
  if (lastlen !== false) {
    tmp.push(address.substr(-1 * lastlen));
  }
  return tmp.join('');
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

const CustomConnectButton = ({ onSuccess, loading }) => {
  // const { openConnectModal } = useConnectModal();
  // const { disconnect } = useDisconnect()
  const [isHover, setIsHover] = useState(false);
  const router = useRouter();
  // const {
  //   activeChain,
  //   // chains,
  //   // error,
  //   // isLoading,
  //   // pendingChainId,
  //   // switchNetwork,
  // } = useNetwork()

  const code = router?.query?.earneth;

  let cacheAddress = '';
  if (typeof window !== 'undefined')
    cacheAddress = window?.localStorage?.getItem('ethAddress');
  const [ethAddress, setEthAddress] = useState(cacheAddress);
  // const { sdk, connected, connecting, provider, chainId } = useSDK();

  // useEffect(() => {
  //   if (isConnected && address) {
  //     // updateBack(address, 1);
  //     setethAddress('');
  //     window?.localStorage?.setItem('ethAddress', '');
  //     document.querySelector('.main-net')?.classList?.remove('!hidden');
  //   }
  // }, [isConnected, address])

  useEffect(() => {
    // const getAccount = async () => {
    //   try {
    //     let res = await window?.unisat?.getAccounts();
    //     console.log(res)
    //     res[0] && setethAddress(res[0]);
    //   } catch (e) {
    //     console.log(e);
    //   }
    // }
    // getAccount();
  }, []);

  return (
    <div className='w-[11.375rem] ml-2.5 relative z-[2]'>
      <div className='!h-[188px]  !rounded-t-[10px] !rounded-b-[10px]  hidden' />
      {!ethAddress && (
        <div
          onClick={() => {}}
          className={`bg-[#13021a]  connect-btn-v2 hover:mt-[172px] hover:h-[210px] hover:rounded-t-[10px] hover:rounded-b-[10px]  rounded-[10px]  w-full h-[40px] overflow-y-hidden flex flex-col  text-white cursor-pointer `}>
          <div className='w-full flex h-[40px]  items-center justify-center rounded-[20px]'>
            <div className='w-[15px]'>
              <Image src={WalletPng} alt='wallet' />
            </div>
            <div className='ml-[10px] h-[40px] leading-[40px]'>
              Connect Wallet
            </div>
          </div>

          <div
            onClick={async () => {
              try {
                if (!window?.okxwallet) {
                  toast('please install okx wallet!', {
                    position: 'top-center',
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                  });
                } else {
                  const accounts = await window?.okxwallet?.request({
                    method: 'eth_requestAccounts',
                  });
                  console.log('connect success', accounts);
                  accounts && setEthAddress(formatAddress(accounts[0]));
                  accounts &&
                    window?.localStorage?.setItem('ethAddress', accounts[0]);
                }
              } catch (e) {
                console.log('connect failed');
              }
            }}
            className='w-full my-[5px] h-[36px] leading-[36px] flex text-center items-center pl-[16px] rounded-[20px]'>
            <div className='w-[15px]'>
              <Image src={OkxWalletLogo} alt='OKX Wallet' />
            </div>
            <div className='ml-[10px] h-[36px] leading-[36px]'>OKX Wallet</div>
          </div>

          <div
            onClick={async () => {
              // debugger;
              // let accounts = await sdk?.connect();
              // console.log(`accounts`, accounts)
              try {
                if (!window?.ethereum) {
                  toast('please install MetaMask wallet!', {
                    position: 'top-center',
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                  });
                } else {
                  const accounts = await window?.ethereum?.request({
                    method: 'eth_requestAccounts',
                    params: [],
                  });
                  // console.log('connect success', accounts);
                  accounts && setEthAddress(formatAddress(accounts[0]));
                  accounts &&
                    window?.localStorage?.setItem('ethAddress', accounts[0]);
                }
              } catch (e) {
                console.log('connect failed');
              }
            }}
            className='bg-[#13021a] w-full h-[36px] mb-[5px] leading-[36px] flex text-center items-center pl-[16px] rounded-full'>
            <div className='w-[15px]'>
              <Image src={metamaskLogo} alt='metamaskLogo' />
            </div>
            <div className='ml-[10px] h-[36px] leading-[36px]'>MetaMask</div>
          </div>

          <div
            onClick={async e => {
              // if (loading) return false;
              // openConnectModal && openConnectModal(e);
              if (!getTrustWalletFromWindow()) {
                toast('please install Trust Wallet!', {
                  position: 'top-center',
                  autoClose: 3000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                });
              }
              const injectedProvider = await getTrustWalletInjectedProvider();
              try {
                const account = await injectedProvider.request({
                  method: 'eth_requestAccounts',
                });
                console.log(account); // => ['0x...']
                accounts && setEthAddress(formatAddress(accounts[0]));
                accounts &&
                  window?.localStorage?.setItem('ethAddress', accounts[0]);
              } catch (e) {
                if (e.code === 4001) {
                  console.error('User denied connection.');
                }
              }
            }}
            className='bg-[#13021a] w-full h-[36px] mb-[5px] leading-[36px] flex text-center items-center pl-[16px] rounded-full'>
            <div className='w-[15px]'>
              {/* <Image
                  src={trustLogo}
                  alt="trustLogo"
                /> */}
            </div>
            <div className='ml-[10px] h-[36px] leading-[36px]'>
              Trust Wallet
            </div>
          </div>

          <div
            onClick={e => {
              // open();
              // if (loading) return false;
              openConnectModal && openConnectModal(e);
            }}
            className='bg-[#13021a] w-full h-[36px] mb-[5px] leading-[36px] flex text-center items-center pl-[16px] rounded-full'>
            <div className='w-[15px]'>
              <Image src={walletConnectLogo} alt='walletConnectLogo' />
            </div>
            <div className='ml-[10px] h-[36px] leading-[36px]'>
              WalletConnect
            </div>
          </div>
        </div>
      )}

      {ethAddress && (
        <div className='bg-[#13021a] w-full hover:mt-[40px] hover:h-[84px] hover:rounded-t-[10px] hover:rounded-b-[10px]  rounded-[10px]  h-[40px] overflow-y-hidden flex flex-col  text-white cursor-pointer'>
          <div className='w-full flex h-[40px]  items-center justify-center rounded-[10px]'>
            <div className='w-[15px]'>
              <Image src={ethIcon} alt='ethIcon' />
            </div>
            <div className='ml-[10px] h-[40px] leading-[40px]'>
              {formatAddress(ethAddress)}
            </div>
          </div>

          <div
            onClick={async () => {
              try {
                window?.localStorage?.setItem('ethAddress', '');
                setEthAddress('');
                // disconnect();
                window?.location?.reload();
              } catch (e) {
                console.log('connect failed');
              }
            }}
            className='w-full my-[5px] h-[40px] leading-[40px] text-center items-center justify-center rounded-[10px]'>
            Disconnect
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomConnectButton;
