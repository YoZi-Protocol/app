import '../styles/global.scss';
import '@rainbow-me/rainbowkit/styles.css';
import React, { useEffect } from 'react';

import bitgetWalletModule from '@web3-onboard/bitget';
import injectedModule from '@web3-onboard/injected-wallets';
import metamaskSDK from '@web3-onboard/metamask';
import { Web3OnboardProvider, init } from '@web3-onboard/react';
import trustModule from '@web3-onboard/trust';
import walletConnectModule from '@web3-onboard/walletconnect';

import { StoreProvider } from '../components/app/updateContext';

import { CustomWindow } from './types.js';

import type { WalletInit, EIP1193Provider } from '@web3-onboard/common';
import type { OnboardAPI } from '@web3-onboard/core';
import type { AppProps } from 'next/app';

declare const window: CustomWindow;
// const okxWalletModule = import {  } from "module";('@rangersprotocol-web3-onboard/okx')
const injected = injectedModule();
// const walletConnect = walletConnectModule()
const trust = trustModule();
const walletConnect = walletConnectModule({
  projectId: '72a693bfa2184202b077e28d22cc30e0',
});
const bitgetWallet = bitgetWalletModule();

// console.log(`async () => (await import('./icon')).default: `, async () => (await import('./icon')).default)

const metamaskSDKWallet = metamaskSDK({
  options: {
    extensionOnly: false,
    dappMetadata: {
      name: 'metamask Web3Onboard',
    },
  },
});

function okxWalletModule(): WalletInit {
  if (typeof window === 'undefined') return () => null;

  return () => {
    return {
      label: 'OKX Wallet',
      // getIcon: async () => (await import('https://github.com/blocknative/web3-onboard/blob/develop/packages/core/src/icons/binance.ts')).default,
      getIcon:
        () => `<svg width="1080" height="1080" viewBox="0 0 1080 1080" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="1080" height="1080" fill="white"/>
      <path d="M385.67 428H171.631C170.311 428 169.045 428.524 168.112 429.458C167.178 430.391 166.654 431.657 166.654 432.978V647.017C166.654 648.337 167.178 649.603 168.112 650.536C169.045 651.47 170.311 651.994 171.631 651.994H385.67C386.991 651.994 388.257 651.47 389.19 650.536C390.124 649.603 390.648 648.337 390.648 647.017V432.978C390.648 431.657 390.124 430.391 389.19 429.458C388.257 428.524 386.991 428 385.67 428ZM315.983 572.352C315.983 573.672 315.459 574.938 314.525 575.872C313.592 576.805 312.326 577.33 311.006 577.33H246.296C244.976 577.33 243.71 576.805 242.776 575.872C241.843 574.938 241.319 573.672 241.319 572.352V507.642C241.319 506.322 241.843 505.056 242.776 504.123C243.71 503.189 244.976 502.665 246.296 502.665H311.006C312.326 502.665 313.592 503.189 314.525 504.123C315.459 505.056 315.983 506.322 315.983 507.642V572.352Z" fill="black"/>
      <path d="M833.783 502.673H769.074C766.325 502.673 764.096 504.901 764.096 507.65V572.36C764.096 575.109 766.325 577.338 769.074 577.338H833.783C836.532 577.338 838.761 575.109 838.761 572.36V507.65C838.761 504.901 836.532 502.673 833.783 502.673Z" fill="black"/>
      <path d="M759.088 428.006H694.379C691.63 428.006 689.401 430.234 689.401 432.984V497.693C689.401 500.442 691.63 502.671 694.379 502.671H759.088C761.838 502.671 764.066 500.442 764.066 497.693V432.984C764.066 430.234 761.838 428.006 759.088 428.006Z" fill="black"/>
      <path d="M908.418 428.006H843.708C840.959 428.006 838.73 430.234 838.73 432.984V497.693C838.73 500.442 840.959 502.671 843.708 502.671H908.418C911.167 502.671 913.395 500.442 913.395 497.693V432.984C913.395 430.234 911.167 428.006 908.418 428.006Z" fill="black"/>
      <path d="M759.088 577.334H694.379C691.63 577.334 689.401 579.562 689.401 582.311V647.021C689.401 649.77 691.63 651.999 694.379 651.999H759.088C761.838 651.999 764.066 649.77 764.066 647.021V582.311C764.066 579.562 761.838 577.334 759.088 577.334Z" fill="black"/>
      <path d="M908.418 577.334H843.708C840.959 577.334 838.73 579.562 838.73 582.311V647.021C838.73 649.77 840.959 651.999 843.708 651.999H908.418C911.167 651.999 913.395 649.77 913.395 647.021V582.311C913.395 579.562 911.167 577.334 908.418 577.334Z" fill="black"/>
      <path d="M646.997 428.006H582.288C579.539 428.006 577.31 430.234 577.31 432.984V497.693C577.31 500.442 579.539 502.671 582.288 502.671H646.997C649.746 502.671 651.975 500.442 651.975 497.693V432.984C651.975 430.234 649.746 428.006 646.997 428.006Z" fill="black"/>
      <path d="M646.997 577.334H582.288C579.539 577.334 577.31 579.562 577.31 582.311V647.021C577.31 649.77 579.539 651.999 582.288 651.999H646.997C649.746 651.999 651.975 649.77 651.975 647.021V582.311C651.975 579.562 649.746 577.334 646.997 577.334Z" fill="black"/>
      <path d="M577.31 507.586C577.31 506.266 576.785 505 575.852 504.067C574.918 503.133 573.652 502.609 572.332 502.609H502.645V432.978C502.645 431.657 502.12 430.391 501.187 429.458C500.253 428.524 498.987 428 497.667 428H432.958C431.637 428 430.371 428.524 429.438 429.458C428.504 430.391 427.98 431.657 427.98 432.978V646.905C427.98 648.225 428.504 649.491 429.438 650.424C430.371 651.358 431.637 651.882 432.958 651.882H497.667C498.987 651.882 500.253 651.358 501.187 650.424C502.12 649.491 502.645 648.225 502.645 646.905V577.274H572.332C573.652 577.274 574.918 576.749 575.852 575.816C576.785 574.882 577.31 573.616 577.31 572.296V507.586Z" fill="black"/>
      </svg>
      `,
      // getIcon: async () => (await import('./icon.tsx')),
      // getIcon: import('/assets/okx.png'),
      getInterface: async () => {
        const ethereumInjectionExists = window.hasOwnProperty('ethereum');

        let provider: EIP1193Provider;

        // check if trust is injected into window.ethereum
        if (ethereumInjectionExists) {
          provider = window.ethereum;
        } else if (window.okxwallet) {
          // directly use the window.trustwallet injection
          provider = window.okxwallet;
        } else {
          // trustwallet extension is not installed
          // send user to install page
          window.open(
            'https://chromewebstore.google.com/detail/%E6%AC%A7%E6%98%93-web3-%E9%92%B1%E5%8C%85/mcohilncbfahbmgdjkbpemcciiolgcge',
            '_blank',
          );
          throw new Error('Please Install Trust to use this wallet');
        }

        return {
          provider,
        };
      },
    };
  };
}

// function otherProviderFlagsExist(identity: string, provider: any): boolean {
//   const otherProviderFlags = Object.values(ProviderIdentityFlag).filter(
//     id => id !== identity && id !== ProviderIdentityFlag.Detected
//   )
//   return otherProviderFlags.some(id => !!provider[id])
// }

// function getInterfaceFromProvidersArray(
//   identity: string,
//   checkOtherProviderFlags?: boolean
// ) {
//   return window.ethereum.providers.find(provider => {
//     return checkOtherProviderFlags
//       ? !!provider[identity] && !otherProviderFlagsExist(identity, provider)
//       : !!provider[identity]
//   })
// }

// function getInjectedInterface(
//   identity: string,
//   checkOtherProviderFlags?: boolean
// ): () => Promise<{ provider: EIP1193Provider }> {
//   return async () => ({
//     provider: (window.ethereum.providers &&
//     Array.isArray(window.ethereum.providers)
//       ? getInterfaceFromProvidersArray(identity, checkOtherProviderFlags)
//       : window.ethereum) as EIP1193Provider
//   })
// }

// const tokenpocket = {
//   label: 'TokenPocket',
//   injectedNamespace: 'ethereum',
//   checkProviderIdentity: ({ provider }) =>
//     !!provider &&
//     !!provider['isTokenPocket'] &&
//     !provider['isTp'],
//   getIcon: async () => (`<?xml version="1.0" encoding="utf-8"?>
//   <svg width="100%" height="100%" viewBox="0 0 1024 1024" fill="none" xmlns="http://www.w3.org/2000/svg">
//       <g>
//           <path d="M1041.52 0H-27V1024H1041.52V0Z" fill="#2980FE"/>
//           <g clip-path="url(#clip0_408_225)">
//               <path d="M406.796 438.643H406.927C406.796 437.857 406.796 436.94 406.796 436.154V438.643Z" fill="#29AEFF"/>
//               <path d="M667.602 463.533H523.249V724.076C523.249 736.389 533.204 746.345 545.517 746.345H645.333C657.647 746.345 667.602 736.389 667.602 724.076V463.533Z" fill="white"/>
//               <path d="M453.563 277H448.716H190.269C177.955 277 168 286.955 168 299.269V389.653C168 401.967 177.955 411.922 190.269 411.922H250.918H275.021V438.644V724.731C275.021 737.045 284.976 747 297.289 747H392.128C404.441 747 414.396 737.045 414.396 724.731V438.644V436.156V411.922H438.499H448.323H453.17C490.372 411.922 520.631 381.663 520.631 344.461C521.024 307.259 490.765 277 453.563 277Z" fill="white"/>
//               <path d="M667.735 463.533V645.35C672.713 646.529 677.821 647.446 683.061 648.232C690.397 649.28 697.994 649.935 705.592 650.066C705.985 650.066 706.378 650.066 706.902 650.066V505.45C685.026 504.009 667.735 485.801 667.735 463.533Z" fill="url(#paint0_linear_408_225)"/>
//               <path d="M709.781 277C606.822 277 523.249 360.573 523.249 463.533C523.249 552.084 584.946 626.225 667.733 645.35V463.533C667.733 440.347 686.596 421.484 709.781 421.484C732.967 421.484 751.83 440.347 751.83 463.533C751.83 483.051 738.6 499.425 720.523 504.14C717.117 505.057 713.449 505.581 709.781 505.581V650.066C713.449 650.066 716.986 649.935 720.523 649.804C818.505 644.171 896.314 562.956 896.314 463.533C896.445 360.573 812.872 277 709.781 277Z" fill="white"/>
//               <path d="M709.78 650.066V505.581C708.733 505.581 707.816 505.581 706.768 505.45V650.066C707.816 650.066 708.864 650.066 709.78 650.066Z" fill="white"/>
//           </g>
//       </g>
//       <defs>
//           <linearGradient id="paint0_linear_408_225" x1="709.844" y1="556.827" x2="667.753" y2="556.827" gradientUnits="userSpaceOnUse">
//               <stop stop-color="white"/>
//               <stop offset="0.9667" stop-color="white" stop-opacity="0.3233"/>
//               <stop offset="1" stop-color="white" stop-opacity="0.3"/>
//           </linearGradient>
//           <clipPath id="clip0_408_225">
//               <rect width="728.448" height="470" fill="white" transform="translate(168 277)"/>
//           </clipPath>
//       </defs>
//   </svg>`),
//   getInterface: getInjectedInterface('isTokenPocket'),
//   platforms: ['all']
// }

// function tpModule(): WalletInit {
//   if (typeof window === 'undefined') return () => null

//   return () => {
//     return {
//       label: 'TokenPocket',
//       // getIcon: async () => (await import('https://github.com/blocknative/web3-onboard/blob/develop/packages/core/src/icons/binance.ts')).default,
//       getIcon: () => (`data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFwAAABcCAMAAADUMSJqAAAAYFBMVEUpgP7///8be/4iff4Pef7d6f+Pt/42hv5fm/7C2f6Ctf7e6//z9/9Bi/77/P9Pk/5Wlv4Adf610v+qxv7p8f+hwf+DsP4Acv7X5P9Kj/60zv/Q3/9/q/5oof53p/6Wuv5JnOtxAAAB0klEQVRoge2W3XqCMAxAIQ0CE8QKRZSB7/+WA6auRegf7tvFci7Tcr6QppAgIAiCIAiCIOYwXAXYbCsgH8Ic2bLq1X1sohUacQFpJ2Cxuw6bm7b8jO38PAo1JE87w07e2VrpIdPJw+SuwGSeRKq8lpc8u+86vS4datwoD3sYS9Iurgm+US7G9JqVxdKQu0leQrCS94ihMib5DrDWLBfanjHJLyzQ7Yi0LWOQC8CFRpHodamjVp4iyw9aeaurOtzWH6xuqF2fyLV1yY8ThZAfSYZIjkNB+VobPqi1VWff4E5+JB5D4+pZVZ2Oea9+CK7Gezq+gSp/xhWT4GMaqRxqTNd0Xc4KORpNIpbLsezsL08WSqC0b2b+ODrJmdydmX/NVXk6nTF0cqx6V1nSHhB4XMmxdsOBqvKPk7gpvXL/Jr9JXoUzOptftaV8P3MfrMYAT7nVBfWVX34xc7vE/eT6H9FGuV1R/OSJZeIe8upiV3AfeRPbTtLO8qifT+/b5el0/atrxx3UdvIy7nalqI8MbU/SRY4MAJhT0g5yZy3J/0rO5Bk/e0aVAUg4dqCENHL+TJf8FB7uhHtv9Ti6PcilTob8SeDe4JL9wQYHQRAEQRD/jC9ePhq1YaoQAgAAAABJRU5ErkJggg==`),
//       // getIcon: async () => (await import('./icon.tsx')),
//       // getIcon: import('/assets/okx.png'),
//       getInterface: async () => {
//         const ethereumInjectionExists = window.hasOwnProperty('ethereum')

//         let provider: EIP1193Provider

//         // check if trust is injected into window.ethereum
//         if (window['tokenpocket']) {
//           // directly use the window.trustwallet injection
//           provider = window['tokenpocket']
//         } else {
//           // trustwallet extension is not installed
//           // send user to install page
//           window.open('https://chromewebstore.google.com/detail/tokenpocket/mfgccjchihfkkindfppnaooecgfneiii', '_blank')
//           throw new Error('Please Install tokenpocket to use this wallet')
//         }

//         return {
//           provider
//         }
//       }
//     }
//   }
// }

function gateModule(): WalletInit {
  if (typeof window === 'undefined') return () => null;

  return () => {
    return {
      label: 'Gate Wallet',
      // getIcon: async () => (await import('https://github.com/blocknative/web3-onboard/blob/develop/packages/core/src/icons/binance.ts')).default,
      getIcon: () =>
        `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAAAYFBMVEUAAAAfT98iVOgiVOYiVOUjVOYjU+MiVOUlVeQiVeYjVOYfT+cjUuUiU+UjU+UjUuIW5aEW5qAjUuUX5qEW5aEjVOUiVOUgU+ghU+UjU+YiVOYjU+QiUuQhU+QiU+YiUud6nSxBAAAAIHRSTlMAEG+v3/9AvzBf7yCgz4BQ359Q/7/fcE+An3+QYJDPYENPskUAAADSSURBVHgBjZJFAoRADASDZJCwhjv/f+VqgmSxunaNdmDCsh0XEbYwHr7ZFCwHcU/wXdwVghB3BV/yDYFc3BciFC7XG92ZBwhG4jCGNwmTguBxnhGsCjTl60LOQgBKUCdksCXwH+SbAp9gjgQ6LejvEaEAxY1/D7iIcqMADxwxFbywko+Sdwr1eLQlVdFiRJCxVFl6BKtF3XKKVYc4f32DQlbdjGm7EIXrb4GLG0iDFG7kpMda52qwFT3BDKtBxdWCJRThRNgR/END1IfvsK9aC0ZeJK0S2xxdE2UAAAAASUVORK5CYII=`,
      // getIcon: async () => (await import('./icon.tsx')),
      // getIcon: import('/assets/okx.png'),
      getInterface: async () => {
        const ethereumInjectionExists = window.hasOwnProperty('ethereum');

        let provider: EIP1193Provider;

        // check if trust is injected into window.ethereum
        if (ethereumInjectionExists) {
          provider = window.ethereum;
        } else if (window.gatewallet) {
          // directly use the window.trustwallet injection
          provider = window.gatewallet;
        } else {
          // trustwallet extension is not installed
          // send user to install page
          window.open(
            'https://chromewebstore.google.com/detail/gate-wallet/cpmkedoipcpimgecpmgpldfpohjplkpp',
            '_blank',
          );
          throw new Error('Please Install gate to use this wallet');
        }

        return {
          provider,
        };
      },
    };
  };
}

const okx = okxWalletModule();
const gate = gateModule();

const wallets = [
  injected,
  metamaskSDKWallet,
  gate,
  okx,
  bitgetWallet,
  trust,
  walletConnect,
];

const MAINNET_RPC_URL =
  'https://mainnet.infura.io/v3/ca3bd291c12e4e71b9ab11444ea2e0d3';
const chains = [
  // {
  //   id: '0x5',
  //   token: 'GoerliETH',
  //   label: 'Ethereum goerli',
  //   rpcUrl: 'https://rpc.ankr.com/eth_goerli'
  // },
  // {
  //   id: '0x1',
  //   token: 'ETH',
  //   label: 'Ethereum Mainnet',
  //   rpcUrl: MAINNET_RPC_URL
  // },
  {
    id: '0x4571',
    token: 'EOS',
    label: 'EOS EVM',
    // rpcUrl: 'https://api.evm.eosnetwork.com/'
    rpcUrl: 'https://api.evm.eosnetwork.com',
  },
  // {
  //   id: '0x15557',
  //   token: 'EOS',
  //   label: 'EOS-EVM-test',
  //   rpcUrl: 'https://eos-evm-network-testnet.rpc.thirdweb.com'
  // },

  // {
  //   id: '0x89',
  //   token: 'MATIC',
  //   label: 'Matic',
  //   rpcUrl: 'https://matic-mainnet.chainstacklabs.com'
  // },
  // {
  //   id: '204',
  //   token: 'BNB',
  //   label: 'op BNB',
  //   rpcUrl: 'https://opbnb.publicnode.com'
  // },
  //
  // {
  //   id: '0x7001',
  //   token: 'aZETA',
  //   label: 'aZETA',
  //   rpcUrl: 'https://zetachain-athens-evm.blockpi.network/v1/rpc/public'
  // },
];
export const Context: React.Context<OnboardAPI | undefined> =
  React.createContext<OnboardAPI | undefined>(undefined);

const appMetadata = {
  name: 'Connect Wallet',
  icon: '/logo-b.jpg',
  description: ' how to connect a wallet.',
  recommendedInjectedWallets: [
    { name: 'TokenPocket', url: 'https://www.tokenpocket.pro/' },
    { name: 'MetaMask', url: 'https://metamask.io' },
  ],
};

const web3Onboard = init({
  // icon: '',
  theme: 'dark',
  wallets,
  chains,
  appMetadata,
  connect: {
    autoConnectLastWallet: true,
  },
});

const MyApp = ({ Component, pageProps }: AppProps) => {
  useEffect(() => {}, []);

  return (
    <Web3OnboardProvider web3Onboard={web3Onboard}>
      <StoreProvider>
        <Component {...pageProps} />
      </StoreProvider>
    </Web3OnboardProvider>
  );
};

export default MyApp;
