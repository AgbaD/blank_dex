import React from 'react';
import Logo from '../invitation.svg';
import Eth from '../eth.svg';

function Header(props) {

  const  { address, isConnected, connect, 
    handleSetSwapPage, swapPage } = props;

  const changeToSwapPage = (e) => {
    e.preventDefault()
    handleSetSwapPage(true)
  }

  const changeToTokenPage = (e) => {
    e.preventDefault()
    handleSetSwapPage(false)
  }

  return (
    <div className='header'>
      <div className='leftH'>
        <img src={Logo} alt='logo' className='logo'/>
        <div className='headerItem'>BDEx 1.0</div>
        <div className='headerItem' onClick={changeToSwapPage}>Swap</div>
        <div className='headerItem' onClick={changeToTokenPage}>Token</div>
      </div>
      <div className='rightH'>
        <div className='headerItem'>
          <img src={Eth} alt='eth' className='eth'/>
          Ethereum
        </div>
        <div className='connectButton' onClick={connect}>
          {isConnected ? (address.slice(0, 4) + '...' + address.slice(38)) : "Connect"}
        </div>
      </div>
    </div>
  )
}

export default Header