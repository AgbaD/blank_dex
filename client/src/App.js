import { useState } from "react";
import "./App.css";
import { Header, Swap, Token } from "./components";
import { useConnect, useAccount } from 'wagmi';
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'

function App() {
  const [swapPage, setSwapPage] = useState(true);
  const { address, isConnected } = useAccount();
  const { connect } = useConnect({
    connector: new MetaMaskConnector(),
  })

  const handleSetSwapPage = (val) => {
    setSwapPage(val)
  }

  return (
    <div className="App">
      <Header swapPage={setSwapPage} handleSetSwapPage={handleSetSwapPage}
      connect={connect} isConnected={isConnected} address={address}/>
      <div className="body">
        {swapPage === true ? ( <Swap isConnected={isConnected} address={address}/> ): (
          <Token />
        )}
      </div>
    </div>
  )
}

export default App;
