const express = require("express");
const Moralis = require("moralis").default;
const app = express();
const cors = require("cors");
require("dotenv").config();
const { EvmChain } = require("@moralisweb3/common-evm-utils");

const port = 3001;
app.use(cors());
app.use(express.json());


app.get("/tokenPrice", async (req, res) => {
  const { query } = req;
  const chain = EvmChain.ETHEREUM;
  const token1 = await Moralis.EvmApi.token.getTokenPrice({
    "address": query.addressOne,
    chain
  });
  const token2 = await Moralis.EvmApi.token.getTokenPrice({
    "address": query.addressTwo,
    chain
  });
  const usdPrices = {
    tokenOne: token1.raw.usdPrice,
    tokenTwo: token2.raw.usdPrice,
    ratio: token1.raw.usdPrice/ token2.raw.usdPrice
  }
  return res.status(200).json({
    data: usdPrices
  });
});


const startServer = async () => {
  await Moralis.start({
    apiKey: process.env.MORALIS_KEY,
  });

  app.listen(port, () => {
    console.log(`Listening for API Calls on port: ${port}`);
  });
};

// Call startServer()
startServer();
