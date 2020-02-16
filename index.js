require("dotenv").config();
const { transactionHandler } = require("./src/transactionHandler");
const { txnHonk } = require("./src/txnHonk");
const { txnFrog } = require("./src/txnFrog");
const EventSource = require("eventsource");
const btoa = require("btoa");
const tokenId = process.env.TOKENID;
const frog=0; const honk=1; 
var tokens = ["c8947a3c68dfa4c1c4f5112132b6518aff9b9aa42d823780f52b06c2faf7005e","7f8889682d57369ed0e32336f8b7e0ffec625a35cca183f4e81fde4e71a538a1"];

// const honkID="7f8889682d57369ed0e32336f8b7e0ffec625a35cca183f4e81fde4e71a538a1";
// const honkQuery = { "v": 3, "q": { "find": { "slp.detail.tokenIdHex": honkID } }, 
//   "r": { "f": "[ .[] | { valid: .slp.valid, token: .slp.detail, input: .in[0].e.a, blocktime: .blk.t, txid: .tx.h }]" } };
// let honkURL = "https://slpsocket.fountainhead.cash/s/" + btoa(JSON.stringify(honkQuery));


const slpQuery = { "v": 3, "q": {"find": {}}, "r": {"f": "[ .[] | { txid: .tx.h, out: .slp.detail.outputs?, in: .in[0].e.a, token: .slp.detail.tokenIdHex, valid: .slp.valid }]"} }
let slpURL = "https://slpsocket.fountainhead.cash/s/" + btoa(JSON.stringify(slpQuery));

const slpSocket = new EventSource(slpURL);
slpSocket.onmessage = function(event) { console.log("slpSocket connected.");
  let slpData = JSON.parse(event.data); console.log(slpData); //  txnHonk(honkData); 
  };
var supported = ['tokenid1', 'tokenid2']
if(supported.includes(event.slp.detail.tokenIdHex) { //check if event.slp.detail.outputs contains one of your addresses, credit deposit
  }
//7f8889682d57369ed0e32336f8b7e0ffec625a35cca183f4e81fde4e71a538a1                
// const honkSocket = new EventSource(honkURL);
// honkSocket.onmessage = function(event) { console.log("honkSocket connected.");
//  let honkData = JSON.parse(event.data); console.log(honkData);
//  txnHonk(honkData); };
//  transactionHandler(honkData); };
// const frogID="c8947a3c68dfa4c1c4f5112132b6518aff9b9aa42d823780f52b06c2faf7005e";
// const frogQuery = { "v": 3, "q": { "find": { "slp.detail.tokenIdHex": frogID } }, 
//  "r": { "f": "[ .[] | { valid: .slp.valid, token: .slp.detail, input: .in[0].e.a, blocktime: .blk.t, txid: .tx.h }]" } };
// let frogURL = "https://slpsocket.fountainhead.cash/s/" + btoa(JSON.stringify(frogQuery));

// const frogSocket = new EventSource(frogURL);
// honkSocket.onmessage = function(event) { console.log("frogSocket connected.");
//  let frogData = JSON.parse(event.data); console.log(frogData);
//  txnFrog(frogData); };


// const query = {
//   "v": 3,
//   "q": {
//     "find": {
//       "slp.detail.tokenIdHex": tokenId
//     }
//   },
//   "r": {
//     "f":
//       "[ .[] | { valid: .slp.valid, token: .slp.detail, input: .in[0].e.a, blocktime: .blk.t, txid: .tx.h }]"
//   }
// };

// let url = "https://slpsocket.fountainhead.cash/s/" + btoa(JSON.stringify(query));

// const bitsocket = new EventSource(url);

// bitsocket.onmessage = function(event) {
//   console.log("Socket connected.");
//   data = JSON.parse(event.data);
//   console.log(data);
//   transactionHandler(data);
// };

// https://slpsocket.fountainhead.cash/s/ewogICJ2IjogMywKICAicSI6IHsKICAgICJmaW5kIjogewogICAgICAic2xwLmRldGFpbC50b2tlbklkSGV4IjogIjI5ZDM1M2EzZDE5Y2RkNzMyNGYxYzE0YjNmZTI4OTI5Mzk3Njg0Mjg2OWZlZDFiZWEzZjk1MTA1NThmNmYwMDYiCiAgICB9CiAgfSwKICAiciI6IHsKICAgICJmIjoKICAgICAgIlsgLltdIHwgeyB2YWxpZDogLnNscC52YWxpZCwgdG9rZW46IC5zbHAuZGV0YWlsLCBpbnB1dDogLmluWzBdLmUuYSwgYmxvY2t0aW1lOiAuYmxrLnQsIHR4aWQ6IC50eC5oIH1dIgogIH0KfQ==

// //Query example
// {
//   "v": 3,
//   "q": {
//     "find": {
//       "slp.detail.tokenIdHex":
//         "7f8889682d57369ed0e32336f8b7e0ffec625a35cca183f4e81fde4e71a538a1"
//     }
//   },
//   "r": {
//     "f":
//       "[ .[] | { valid: .slp.valid, token: .slp.detail, input: .in[0].e.a, blocktime: .blk.t, txid: .tx.h }]"
//   }
// };

