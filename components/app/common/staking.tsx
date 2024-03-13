import axios from "axios";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import React, { useState, useEffect, useRef,useLayoutEffect } from "react";
import { Button, Tooltip, Checkbox, Radio,message } from "antd";
import Header from "./Header";
import dynamic from "next/dynamic";
import { ethers } from "ethers";
import { useConnectWallet, useWallets } from "@web3-onboard/react";
import type { RadioChangeEvent, GetProp } from "antd";
import { toast } from "react-toastify";
import { nextTick } from "process";
import abi from "./Staking.json";
const ModalLarge = dynamic(() => import("./ModalLarge"), { ssr: false });
interface TsOption {
  value: number;
  apy: number;
  stakeTime: String;
  futureTime: Date; // time
}

const currentDate: Date = new Date();

// Get 7day time
const sevenDaysLater: Date = new Date(currentDate);
sevenDaysLater.setDate(currentDate.getDate() + 7);

// Get 14day time
const fourteenDaysLater: Date = new Date(currentDate);
fourteenDaysLater.setDate(currentDate.getDate() + 14);

// Get 30day time
const thirtyDaysLater: Date = new Date(currentDate);
thirtyDaysLater.setDate(currentDate.getDate() + 30);

const tsOptions: TsOption[] = [
  { value: 7, apy: 417.14, stakeTime: '604800', futureTime: sevenDaysLater },
  { value: 14, apy: 521.42, stakeTime: '1209600', futureTime: fourteenDaysLater },
  { value: 30, apy: 584, stakeTime: '2592000', futureTime: thirtyDaysLater },
];

const Staking: NextPage = (props) => {
  const containerRef = useRef(null);
  const [ID, setID] = useState("");
  const [{ wallet, connecting }, connect, disconnect] = useConnectWallet();
  const [tokenList, setTokenList] = useState([]);
  const [account, setAccount] = useState(null);
  const [ethersProvider, setProvider] = useState();
  const [params, setParams] = useState({
    size: 12,
    page: 0,
  });
  const [clickedId, clickedIdList] = useState();;
  const [value, setValue] = useState(7);
  const [address, setToAddress] = useState("");

  const [selectedValue, setSelectedValue] = useState<number>(7);
  const [apy, setApy] = useState<number | undefined>();
  const [stakeTime, setStakeTime] = useState<string | undefined>();
  const [futureTime, setFutureTime] = useState<Date | undefined>();
  const [unstakeId, setunstakeId] = useState<number | undefined>();

  const [getstakeId, setStakesId] = useState([]);
  const [getStakeValue, setStakesValue] = useState([])

  useEffect(() => {
    const selectedOption = tsOptions.find(
      (option) => option.value === selectedValue
    );
    if (selectedOption) {
      setApy(selectedOption.apy);
      setStakeTime(selectedOption.stakeTime);
      setFutureTime(selectedOption.futureTime);
    } else {
      setApy(undefined);
      setStakeTime(undefined);
      setFutureTime(undefined);
    }
  }, [selectedValue]);

  // Checkbox
  const IdOnChange: GetProp<typeof Checkbox.Group, "onChange"> = (
    checkedValues
  ) => {
    clickedIdList(checkedValues);
  };

  const TimeOnChange = (e: RadioChangeEvent) => {
    setSelectedValue(e.target.value);
    setValue(e.target.value);
  };
  
  // getYozi
  const getMyToken = async (address, params) => {
    params.address = address?.substr(2);
    params.chain_id = "17777";
    params.size= 1000;
    axios
      .get("https://api.yozi.pro/api/v1/asset", {
        params,
      })
      .then((res: any) => {
        if (res?.status === 200) {
          setTokenList(res?.data?.data);
        }
      }).catch((e)=>{
        message.error(e.message)
      });
  };
  useEffect(() => {
    if (wallet?.accounts?.[0]?.address) {
      getMyToken(ethers.utils.getAddress(wallet?.accounts?.[0]?.address), {});
      setToAddress(ethers.utils.getAddress(wallet?.accounts?.[0]?.address));
    }
  }, []);
  useEffect(() => {
    // If the wallet has a provider than the wallet is connected
    if (wallet?.provider) {
      if (wallet?.provider) {
        setProvider(new ethers.providers.Web3Provider(wallet.provider, "any"));
      }
      const { name, avatar } = wallet?.accounts[0].ens ?? {};
      setAccount({
        address: wallet.accounts[0].address,
        balance: wallet.accounts[0].balance,
        ens: { name, avatar: avatar?.url },
      });
      if (wallet.accounts[0].address) {
        getMyToken(ethers.utils.getAddress(wallet.accounts[0].address), params);
        setToAddress(ethers.utils.getAddress(wallet?.accounts?.[0]?.address));
      }
    }
  }, [wallet]);

  useEffect(() => {
    if(wallet?.provider){
      abiEvent('',2)
    }
  }, [ethersProvider,wallet]);

  const addHexPrefix = (arr: any) => {
    if (Array.isArray(arr)) {
      return arr.map(item => addHexPrefix(item));
    } else {
        return "0x" + arr.toString();
    }
  }

  const toastStyle = {
    position: "top-center",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  };
  
  // lock
  const lockEvent = async (apiJsonChange) => {
    apiJsonChange.chain_id = "17777";
    axios
      .post("https://api.yozi.pro/api/v1/transaction ", apiJsonChange)
      .then((res: any) => {
        if (res?.status === 200) {
          // goTransfer(JSON.stringify(res?.data));
          if(res?.data){
            abiEvent(res?.data,1)
          }
        }
      }).catch((e)=>{
         message.error(e.message)
         alert(e.message)
      })
  };
  //  lock signerck 签名
  const sendTransactionTransfer = async (e) => {
    if (!ethersProvider) {
      return;
    }
    const signer = await ethersProvider.getSigner();
    const clickedIdMap = clickedId.map((item) => {
      return { id: item, to: "0xd8658aD5a0b444a83a7Ee435c28d44e49fD4A012" };
    });
    const json = {
      p: "eos420",
      tick: "yozi",
      op: "stake",
      to: clickedIdMap,
      period:stakeTime
    };
    const apiJson = {
      p: "eos420",
      tick: "yozi",
      op: "stake",
      to: clickedIdMap,
      period:stakeTime
    };
    // signMessage
    const message = JSON.stringify(json);
    try {
      await signer.signMessage(message).then((signature) => {
        if (signature) {
          const data = {
            ordinal: apiJson,
            signature: signature,
          };
          lockEvent(data);
        }
      });
    } catch (error) {
      toast?.dismiss();
      toast(error?.data?.message, toastStyle);
    }
  };
  const abiEvent = async (data,type) => {

    if (!ethersProvider) {
      return;
    }
    let newProviders
    if (wallet?.provider) {
      newProviders = new ethers.providers.Web3Provider(wallet.provider, "any");
    }

    const daiAddress = "0xbC692A910d74F453FdDF81A21aacafc02a88e1e6";
    const daiContract = new ethers.Contract(daiAddress, abi, newProviders);
    const signer = await newProviders.getUncheckedSigner();

    const daiWithSigner = daiContract.connect(signer);
    
    if(data && type === 1){
      const idArray = data.to.map(item => item.id);
      const exp = data.exp;
      const period = data.period;
      const a = data.a.map(item => '0x' + item)
      const proof = data.proof;
      const proofWithPrefix = proof.map(subArray => subArray.map(addHexPrefix));
      const [pi_a, pi_b, pi_c] = proofWithPrefix;
      daiWithSigner
        .stake(idArray, +exp, +period, a, pi_a, pi_b, pi_c)
        .then(tx => tx.wait())
        .then(() => {
            message.success('staked Yozi Id:' + idArray )
            abiEvent('',2)
            getMyToken(address, {});
        })
    } 

  if(address && type === 2){
      // yozi stake
      const getstakesId = await daiWithSigner.getStakes(address)
      setStakesId(getstakesId)
      const arr2 = []
      for (const id of getstakesId) {
        const getStakes = await daiWithSigner.getStake(address,id)
        let day = '';
        let stakeApy = '';
        if(getStakes.period.toString() === '604800'){
          day ='7';
          stakeApy = '417.14%';
        }else if(getStakes.period.toString() === '1209600'){
          day ='14'
          stakeApy = '521.42%';

        }else if(getStakes.period.toString() === '2592000'){
          day ='30'
          stakeApy = '584%';
        }
        const newRew = ethers.utils.formatUnits(getStakes.reward.toString()*6/1000/(10**12),6)
        const newReward = ethers.utils.formatUnits(getStakes.reward.toString(),18)
        const arr = {
          id: id,
          height: getStakes.height.toNumber(),
          period: getStakes.period.toNumber(),
          day:day,
          stakeApy:stakeApy,
          reward: parseFloat(newReward).toFixed(3),
          rewardUsdt: parseFloat(newRew).toFixed(3)
        }
        arr2.push(arr)

      }
      setTimeout(() => {
        setStakesValue(arr2)
      }, 30);

    }
    // unstake
    if(unstakeId  && type === 3){
      daiWithSigner.withdraw(unstakeId).then(()=>{
        message.success('unstaked Yozi Id:' + unstakeId)
        abiEvent('',2)
        getMyToken(address,{})
      }).catch((e)=>{
        message.error('Error')
      })
    }
  };
  // Unstake
  const Unstake  =async (id) => {
    if(id){
     abiEvent('',3)
    }
  }
  return (
    <div
      ref={containerRef}
      className={`staking-container flex-col w-full flex relative bg-[#13021a] pb-[80px]`}
    >
      <Header />
      <div className="staking-r">
        <div className="staking-relative relative  text-white w-full flex  justify-center mt-[50px] pb-[50px]">
          <div
            className={`new-min-h-screen min-h-screen min-w-screen w-[88vw] md:w-[52vw]`}
          >
            <div className="App">
              <div className="staking-main">
                <div className="input-content">
                  <p className="input-title">Staking $YoZi:</p>
                  <div className="yozi-tag">
                    <Checkbox.Group onChange={IdOnChange}>
                      {tokenList &&
                        tokenList?.map((item, i) => {
                            if(!item?.locked){
                                return (
                                    <Checkbox  value={item?.identifier}>
                                      #{ item?.identifier }
                                    </Checkbox>
                                  );
                            }
                        })}
                    </Checkbox.Group>
                  </div>
                  <p className="input-title2">Stake Time:</p>
                  <div className="yozi-tag">
                    <Radio.Group onChange={TimeOnChange} value={value}>
                      <Radio value={7}>7 day</Radio>
                      <Radio value={14}>14 day</Radio>
                      <Radio value={30}>30 day</Radio>
                    </Radio.Group>
                  </div>
                  <p className="input-title2">Unstake Time:</p>

                  <div className="unstake-time">
                    <p>≈ {futureTime?.toLocaleString("en-US")}</p>
                  </div>

                  <p className="input-title2">
                    APY: {apy}%

                  </p>

                  <Button
                    className="lock-button"
                    onClick={() => {
                      if(clickedId){
                        sendTransactionTransfer(address);
                      }
                      // lockEvent(address)
                    }}
                  >
                    Lock YoZi
                  </Button>
                </div>
                <div className="new-yozi border border-[#1b2518] rounded-md aspect-square shrink-0 max-h-full w-full max-w-[612px]">
                  <ModalLarge />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="staking-list">
          {/* Staked */}
          {getStakeValue.map((item, index) => (
            <div className="list-content" key={index}>
            <div className="list-item">
              <div className="list-title">Staked</div>
              <div className="content-box">
                {/* total */}
                {/* <div className="flex-content">
                  <div className="left-title"> $YoZi </div>
                  <div className="right-value">6</div>
                </div> */}
                {/* $YoZi Number  */}
                <div className="flex-content">
                  <div className="left-title"> $YoZi Number </div>
                  <div className="right-value">{item.id}</div>
                </div>
                {/* Stake Time  */}
                <div className="flex-content">
                  <div className="left-title"> Stake Time </div>
                  <div className="right-value">{item.day + ' day'}</div>
                </div>
                {/* Ustake Time  */}
                <div className="flex-content">
                  <div className="left-title"> Ustake Time </div>
                  <div className="right-value" style={{textAlign: 'right'}}>
                  ≈  {new Date((Number(item.height) + Number(item.period) + 1680661090 )* 1000).toLocaleString("en-US")}
                  </div>
                </div>
                {/* APY */}
                <div className="flex-content">
                  <div className="left-title">APY</div>
                  <div className="right-value">{item.stakeApy}</div>
                </div>
                {/* Rewards */}
                <div className="flex-content">
                  <div className="left-title">Rewards</div>
                  
                  <div className="right-value">{item.reward} ($YoZi )</div>
                  {/* <div className="right-value">≈ {item.rewardUsdt} ($Usdt)</div> */}
                </div>
              </div>
              <Tooltip placement="topLeft" title="unstake and get your reward">
                <Button className="item-button" onClick={() => {
                      setunstakeId(item.id)
                      Unstake(item.id);
                      // lockEvent(address)
                    }}>Unstake</Button>
              </Tooltip>

              {/* <Button className="item-button">Claim Rewards</Button> */}
            </div>
          </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Staking;
