require("dotenv").config();
const { transactionHandler } = require("./src/transactionHandler");
const EventSource = require("eventsource");
const btoa = require("btoa");
const tokenId = process.env.TOKENID;

const honkID="7f8889682d57369ed0e32336f8b7e0ffec625a35cca183f4e81fde4e71a538a1";
const honkQuery = { "v": 3, "q": { "find": { "slp.detail.tokenIdHex": honkId } }, 
  "r": { "f": "[ .[] | { valid: .slp.valid, token: .slp.detail, input: .in[0].e.a, blocktime: .blk.t, txid: .tx.h }]" } };

let honkURL = "https://slpsocket.fountainhead.cash/s/" + btoa(JSON.stringify(honkQuery));

const honkSocket = new EventSource(honkURL);
honkSocket.onmessage = function(event) { console.log("honkSocket connected.");
  let honkData = JSON.parse(event.data); console.log(honkData);
  transactionHandler(honkData); };

const query = {
  "v": 3,
  "q": {
    "find": {
      "slp.detail.tokenIdHex": tokenId
    }
  },
  "r": {
    "f":
      "[ .[] | { valid: .slp.valid, token: .slp.detail, input: .in[0].e.a, blocktime: .blk.t, txid: .tx.h }]"
  }
};

let url = "https://slpsocket.fountainhead.cash/s/" + btoa(JSON.stringify(query));

const bitsocket = new EventSource(url);

bitsocket.onmessage = function(event) {
  console.log("Socket connected.");
  data = JSON.parse(event.data);
  console.log(data);
  transactionHandler(data);
};

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

