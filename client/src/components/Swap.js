import React, { useEffect, useState } from 'react';
import {Input, Popover, Modal, Radio, message} from 'antd';
import {
  ArrowDownOutlined, DownOutlined,
  SettingOutlined
} from '@ant-design/icons';
import tokenList from '../tokenList.json';
import axios from 'axios';

function Swap() {
  const [slippage, setSlippage] = useState(2.5);
  const [tokenOneAmount, setTokenOneAmount] = useState(null);
  const [tokenTwoAmount, setTokenTwoAmount] = useState(null);
  const [tokenOne, setTokenOne] = useState(tokenList[0]);
  const [tokenTwo, setTokenTwo] = useState(tokenList[1]);
  const [isOpen, setIsOpen] = useState();
  const [changeToken, setChangeToken] = useState(1);
  const [prices, setPrices] = useState(null);

  const backendServer = "http://localhost:3001"

  const handleSlippageChange = (e) => {
    setSlippage(e.target.value)
  }

  function changeAmount (e) {
    setTokenOneAmount(e.target.value)
    if (e.target.value && prices) {
      const amount = (e.target.value * prices.ratio).toFixed(2)
      setTokenTwoAmount(amount)
    } else {
      setTokenTwoAmount(null)
    }
  }

  function switchToken () {
    setPrices(null)
    setTokenOneAmount(null)
    setTokenTwoAmount(null)
    const one = tokenOne;
    const two = tokenTwo;
    setTokenOne(two)
    setTokenTwo(one)
    fetchPrices(two.address, one.address)
  }

  function openModal (asset) {
    setChangeToken(asset)
    setIsOpen(true)
  }

  function modifyToken (ind) {
    setPrices(null)
    setTokenOneAmount(null)
    setTokenTwoAmount(null)
    if (changeToken === 1) {
      setTokenOne(tokenList[ind]);
    } else {
      setTokenTwo(tokenList[ind]);
    }
    setIsOpen(false);
    fetchPrices(tokenOne.address, tokenTwo.address)
  }

  async function fetchPrices( one, two ) {
    const url = backendServer + '/tokenPrice'
    const resp = await axios.get(url, {
      params: {addressOne: one, addressTwo: two}
    })
    setPrices(resp.data.data)
  }

  useEffect(() => {
    fetchPrices(tokenList[0].address, tokenList[1].address);
  }, [])

  const settings = (
    <>
      <div>Slippage Tolarance</div>
      <div>
        <Radio.Group value={slippage} onChange={handleSlippageChange}>
          <Radio.Button value={0.5}>0.5%</Radio.Button>
          <Radio.Button value={2.5}>2.5%</Radio.Button>
          <Radio.Button value={5}>5%</Radio.Button>
        </Radio.Group>
      </div>
    </>
  )

  return (
    <>
    <Modal
      open={isOpen}
      footer={null}
      onCancel={() => setIsOpen(false)}
      title='Select a token'>
        <div className='modalContent'>
          {tokenList?.map((e, i) => {
            return (
              <div className='tokenChoice' key={i} onClick={() => modifyToken(i)}>
                <img src={e.img} className='tokenLogo' alt={e.ticker} />
                <div className='tokenChoiceNames'>
                  <div className='tokenName'>{e.name}</div>
                  <div className='tokenTicker'>{e.ticker}</div>
                </div>
              </div>
            )
          })}
        </div>
    </Modal>
    <div className='tradeBox'>

      <div className='tradeBoxHeader'>
        <h4>Swap</h4>
        <Popover 
          content={settings}
          title='Settings' trigger="click" placement='bottomRight'>
          <SettingOutlined className='cog'/>
        </Popover>
      </div>

      <div className='inputs'>

        <Input placeholder='0' value={tokenOneAmount} onChange={changeAmount} disabled={!prices}/>
        <Input placeholder='0' value={tokenTwoAmount} disabled={true}/>
        <div className='switchButton' onClick={switchToken}>
          <ArrowDownOutlined className='switchArrow' />
        </div>

        <div className='assetOne' onClick={() => openModal(1)}>
          <img src={tokenOne.img} alt='assetOneLogo' className='assetLogo'/>
          {tokenOne.ticker}
          <DownOutlined />
        </div>
        <div className='assetTwo' onClick={() => openModal(2)}>
          <img src={tokenTwo.img} alt='assetOneLogo' className='assetLogo'/>
          {tokenTwo.ticker}
          <DownOutlined />
        </div>

      </div>

      <div className='swapButton' disabled={!tokenOneAmount}>Swap</div>

    </div>
    </>
  )
}

export default Swap