import { ConnectButton } from '@rainbow-me/rainbowkit';
import Image from 'next/image';

import WalletPng from '../assets/pc_icon_moneybag_grey.png';
import WalletPngWhite from '../assets/pc_icon_moneybag_white.png';
import styles from '../styles/index.module.scss';

const CustomConnectButton = ({ onSuccess, loading }) => {
  return (
    <div
      className='w-[22.9rem] mt-2.5'
      style={{
        display: 'flex',
        justifyContent: 'center',
        marginLeft: 'auto',
        marginRight: 'auto',
      }}>
      <ConnectButton.Custom>
        {({
          account,
          chain,
          openAccountModal,
          openChainModal,
          openConnectModal,
          mounted,
        }) => {
          return (
            <div
              {...(!mounted && {
                'aria-hidden': true,
                style: {
                  opacity: 0,
                  pointerEvents: 'none',
                  userSelect: 'none',
                },
              })}>
              {(() => {
                if (!mounted || !account || !chain) {
                  return (
                    <div
                      onClick={e => {
                        if (loading) {
                          return false;
                        }
                        openConnectModal(e);
                      }}
                      className={`w-[22.9rem] h-[3.28rem] ${styles.modalButton}`}>
                      <div className={styles.buttonInner}>
                        <Image
                          src={WalletPng}
                          width={42}
                          height={42}
                          alt='wallet'
                        />
                        <span className='ml-3'>Connect Wallet</span>
                      </div>
                    </div>
                  );
                }

                if (chain.unsupported) {
                  return (
                    <div
                      onClick={openChainModal}
                      className={`w-[22.9rem] h-[3.28rem] text-white ${styles.modalButton}`}>
                      Wrong network
                    </div>
                  );
                }

                return (
                  <div
                    className={`w-[22.9rem] h-[3.28rem] ${styles.modalButton}`}
                    onClick={() => {
                      openConnectModal();
                    }}
                    style={{
                      background:
                        'linear-gradient(89deg, #FF4E00 0%, #FF9327 100%)',
                    }}>
                    <div className={styles.buttonInner}>
                      <Image
                        src={WalletPngWhite}
                        width={42}
                        height={42}
                        alt='wallet'
                      />
                      <span className='ml-3'>
                        {account.displayName}
                        {account.displayBalance
                          ? ` (${account.displayBalance})`
                          : ''}
                      </span>
                    </div>
                  </div>
                  // <div style={{ display: 'flex', gap: 12 }}>
                  //   <button onClick={openAccountModal} type="button">
                  //     {account.displayName}
                  //     {account.displayBalance
                  //       ? ` (${account.displayBalance})`
                  //       : ''}
                  //   </button>
                  // </div>
                );
              })()}
            </div>
          );
        }}
      </ConnectButton.Custom>
    </div>
  );
};

export default CustomConnectButton;
