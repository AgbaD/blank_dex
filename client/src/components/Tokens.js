import React, { useEffect, useState } from 'react';
import tokenList from '../tokenList.json';
import axios from 'axios';
import { Space, Table, Tag } from 'antd';


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
    const data = resp.data.data
    console.log(data)
    setTokenInfo(data)
  }

  function playWithTokenInfo() {
    console.log(Object.keys(tokenInfo))
  }

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Ticker',
      dataIndex: 'ticker',
      key: 'ticker',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
    }
  ];
  const data = [
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
      tags: ['nice', 'developer'],
    }
  ];
  const table = () => <Table columns={columns} dataSource={data} />;

  useEffect(async () => {
    await fetchTokensInfo()
    playWithTokenInfo()
  }, [])

  return (
    <div>
      
    </div>
  )
}

export default Tokens