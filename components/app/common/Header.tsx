import type { NextPage } from 'next';

import React, { useState } from 'react';

import className from 'classnames';
import Image from 'next/image';
import { useRouter } from 'next/router';

import logo from '../../../assets/logo-b.jpg';

import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from 'react-toastify';

// import NoSSR from '../components/NoSSR'
import TabSelect from '../../../assets/header-tab-select.svg';

import CustomConnectButton from './CustomConnectButton';

const toastStyle = {
  position: 'top-center',
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
};

function parseURLParams(url) {
  const params = new URLSearchParams(url.split('?')[1]);
  const paramObj = {};
  for (const [key, value] of params) {
    paramObj[key] = value;
  }
  // console.log(`paramObj`, paramObj)
  // // debugger
  return paramObj;
}

const Header: NextPage = props => {
  const router = useRouter();
  const urlParams = parseURLParams(router.asPath);
  // const { chain } = getPublicClient();
  const [modalIsOpen, setIsOpen] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [userAddress, setUserAddress] = useState('');
  const [currentStep, setCurrentStep] = useState('login');
  const [loading, setLoading] = useState(false);
  // const { address, isConnected } = useAccount()

  // {
  //   name: '/tokens',
  //   text: 'Tokens',
  //   url: '/tokens'
  // }

  const navList = [
    {
      name: '/',
      text: 'Home',
      url: '/',
    },
    {
      name: '/info',
      text: 'Mint',
      url: '/info?assets_id=yozi',
      // url: '/info?assets_id=egtt'
    },
    {
      name: '/inscription',
      text: 'Inscription',
      url: '/inscription?assets_id=yozi',
    },
    {
      name: '/my',
      text: 'My Assets',
      url: '/my',
    }, 
    {
      name: '/staking',
      text: 'Staking',
      url: '/staking'
    },
    {
      name: 'marketplace',
      text: 'Marketplace',
      url: '/marketplace',
    },
  ];

  const navListH5 = [
    // {
    //   name: '/',
    //   text: 'Home',
    //   url: '/',
    // },
    {
      name: '/info',
      text: 'Mint',
      url: '/info?assets_id=yozi',
    },
    {
      name: '/inscription',
      text: 'Inscription',
      url: '/inscription?assets_id=yozi',
    },
    {
      name: '/my',
      text: 'My',
      url: '/my',
    }, 
    {
      name: '/staking',
      text: 'Staking',
      url: '/staking'
    },
    {
      name: 'marketplace',
      text: 'Marketplace',
      url: '/marketplace',
    },
  ];

  // @ts-ignore
  return (
    <>
      {/* 顶部 start */}
      <div className='w-full sticky z-[2] top-0'>
        {/* pc start */}
        <header
          className={className(
            'hidden md:flex justify-center  backdrop-blur-xl top-0 sticky z-[100] inset-x-0',
          )}>
          <section className='w-[1080px] lg:w-[1280px] xl:w-[1280px] flex  h-[75px] justify-between items-center relative'>
            <section className='ml-[6%] md:ml-[20px] flex items-center'>
              <section
                onClick={() => {
                  router.push('/');
                }}
                className=' w-[80px] h-[80px] cursor-pointer flex items-center'>
                <Image width={50} height={50} src={logo} alt='logo' />
              </section>

              <section className='w-[66px] ml-2 hidden' />
            </section>

            <section className='flex items-center mr-[335px]'>
              {navList.map(
                (item: { name: string; url: string; text: string }) => {
                  return (
                    <div
                      key={item.text}
                      className={className(
                        'relative  select-none mx-5 text-[#E4E4E4] font-normal hover:text-[#fff] hover:font-medium hover:text-shadow-white font-light cursor-pointer ',
                        item.name ===
                          `${
                            typeof window !== 'undefined' &&
                            window?.location?.pathname
                          }`
                          ? 'text-[#fff] font-normal '
                          : '',
                        item.name === 'my' ? 'w-[108px] text-center' : '',
                        // item.name === '/' ? '!hidden' : '',
                      )}
                      onClick={() => {
                        if (item?.name === 'marketplace') {
                          toast?.dismiss();
                          toast('Coming Soon...', toastStyle);
                          return;
                        }
                        router.push(item.url);
                      }}>
                      {item.text}
                      <div
                        className={className(
                          'absolute w-[10px] h-[6px] left-1/2 -ml-[5px] -bottom-[10px]',
                          item.name ===
                            `${
                              typeof window !== 'undefined' &&
                              window?.location?.pathname
                            }`
                            ? ' '
                            : ' hidden',
                        )}
                        style={
                          {
                            // backgroundImage: `url(${TabSelect})`,
                          }
                        }>
                        <Image src={TabSelect} alt='TabSelect' />
                      </div>
                    </div>
                  );
                },
              )}
            </section>

            <CustomConnectButton />

            <ToastContainer />
          </section>
        </header>
        {/* pc end */}

        {/* h5 start */}
        <header
          className={className(
            ' flex flex-col md:hidden justify-center  backdrop-blur-xl top-0 sticky z-[100] inset-x-0 max-w-full',
          )}>
          <section className='w-full h-[75px] flex justify-between  relative'>
            <section className='pl-[6%] flex justify-between items-center'>
              <section
                onClick={() => {
                  router.push('/');
                }}
                className=' w-[80px] h-[80px] cursor-pointer flex items-center'>
                <Image width={50} height={50} src={logo} alt='logo' />
              </section>
            </section>

            <div className='mt-[20px] mr-[6%]'>
              <CustomConnectButton />
            </div>
          </section>

          <ToastContainer />

          <section className='pl-[6%] flex w-full  items-center pb-[25px]'>
            {navListH5.map(
              (item: { name: string; url: string; text: string }) => {
                return (
                  <div
                    key={item.text}
                    className={className(
                      'relative  select-none mx-1 text-[#E4E4E4] font-normal hover:text-[#fff] hover:font-medium hover:text-shadow-white font-light cursor-pointer text-sm',
                      item.name ===
                        `${
                          typeof window !== 'undefined' &&
                          window?.location?.pathname
                        }`
                        ? 'text-[#fff] font-normal '
                        : '',
                      item.name === '/my' ? 'w-[38px] text-center' : '',
                      // item.name === '/' ? '!hidden' : '',
                    )}
                    onClick={() => {
                      if (item?.name === 'marketplace') {
                        toast?.dismiss();
                        toast('Coming Soon...', toastStyle);
                        return;
                      }
                      router.push(item.url);
                    }}>
                    {item.text}
                    <div
                      className={className(
                        'absolute w-[10px] h-[6px] left-1/2 -ml-[5px] -bottom-[10px]',
                        item.name ===
                          `${
                            typeof window !== 'undefined' &&
                            window?.location?.pathname
                          }`
                          ? ' '
                          : ' hidden',
                      )}
                      style={
                        {
                          // backgroundImage: `url(${TabSelect})`,
                        }
                      }>
                      <Image src={TabSelect} alt='TabSelect' />
                    </div>
                  </div>
                );
              },
            )}
          </section>
        </header>
        {/* pc end */}
      </div>
      {/* 顶部 end */}
    </>
  );
};

export default Header;
