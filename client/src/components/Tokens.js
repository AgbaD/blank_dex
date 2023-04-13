import React, { useEffect, useState } from 'react';
import tokenList from '../tokenList.json';
import axios from 'axios';


function Tokens() {
  const [tokenInfo, setTokenInfo] = useState({})

  const backendServer = "http://localhost:3001"

  async function fetchTokensInfo() {
    let symbols = []
    tokenList.forEach(token => {
      symbols.push({name: token.name, ticker: token.ticker, address: token.address})
    });
    const url = backendServer + '/tokenInfo'
    const resp = await axios.get(url, {
      params: {symbols: symbols}
    })
    console.log(resp.data.data)
    setTokenInfo(resp.data)
  }

  useEffect(() => {
    fetchTokensInfo()
  }, [])

  return (
    <div>
      
    </div>
  )
}

export default Tokens