const { getDepositsTable } = require("./db/getAddrData");
const { getSession, saveSession } = require("./db/dynamoDB");
const { notification } = require("./notification/notification");
const tokenType = process.env.TOKENTYPE;
const tokenDecimalPlaces = process.env.DECIMALPLACES;

// var amount=0; var exp=0;
// const frog=0; const honk=1; 
var decimals = ["0","1"];
var tokens = ["c8947a3c68dfa4c1c4f5112132b6518aff9b9aa42d823780f52b06c2faf7005e",
              "7f8889682d57369ed0e32336f8b7e0ffec625a35cca183f4e81fde4e71a538a1"];
tokens["CyFrog"]="c8947a3c68dfa4c1c4f5112132b6518aff9b9aa42d823780f52b06c2faf7005e";
tokens["c8947a3c68dfa4c1c4f5112132b6518aff9b9aa42d823780f52b06c2faf7005e"]="CyFrog";
    decimals["CyFrog"]=2;
tokens["Honk"]="7f8889682d57369ed0e32336f8b7e0ffec625a35cca183f4e81fde4e71a538a1";
tokens["7f8889682d57369ed0e32336f8b7e0ffec625a35cca183f4e81fde4e71a538a1"]="Honk";
    decimals["Honk"]=0;
tokens["Sour"]="6448381f9649ecacd8c30189cfbfee71a91b6b9738ea494fe33f8b8b51cbfca0";
tokens["6448381f9649ecacd8c30189cfbfee71a91b6b9738ea494fe33f8b8b51cbfca0"]="Sour";
    decimals["Sour"]=8;
tokens["AUDC"]="f05faf13a29c7f5e54ab921750aafb6afaa953db863bd2cf432e918661d4132f";
tokens["f05faf13a29c7f5e54ab921750aafb6afaa953db863bd2cf432e918661d4132f"]="AUDC";
    decimals["AUDC"]=6;
tokens["Spice"]="4de69e374a8ed21cbddd47f2338cc0f479dc58daa2bbe11cd604ca488eca0ddf";
tokens["4de69e374a8ed21cbddd47f2338cc0f479dc58daa2bbe11cd604ca488eca0ddf"]="Spice";
    decimals["Spice"]=8;
tokens["RNEW"]="57b76544521b5ee8e2e918cda81a5faf276d38acf96fe20475e1359077850d8b";
tokens["57b76544521b5ee8e2e918cda81a5faf276d38acf96fe20475e1359077850d8b"]="RNEW";
    decimals["RNEW"]=8;
tokens["Mint"]="1a1fd545b922c8ee4ecd89bc312904f4e3ba4cf7850141066ad3e3f281668188";
tokens["1a1fd545b922c8ee4ecd89bc312904f4e3ba4cf7850141066ad3e3f281668188"]="Mint";
    decimals["Mint"]=8;
tokens["SBS"]="419ce621b69abf5877141135ae7c3f1f51ed311888c004df3c28aaae2198242d";
tokens["419ce621b69abf5877141135ae7c3f1f51ed311888c004df3c28aaae2198242d"]="SBS";
    decimals["SBS"]=2;
tokens["USDH"]="c4b0d62156b3fa5c8f3436079b5394f7edc1bef5dc1cd2f9d0c4d46f82cca479";
tokens["c4b0d62156b3fa5c8f3436079b5394f7edc1bef5dc1cd2f9d0c4d46f82cca479"]="USDH";
decimals["USDH"]=2;
    tokens["SAI"]="7853218e23fdabb103b4bccbe6e987da8974c7bc775b7e7e64722292ac53627f";
tokens["7853218e23fdabb103b4bccbe6e987da8974c7bc775b7e7e64722292ac53627f"]="SAI";
decimals["SAI"]=8;
    tokens["Toba"]="56292ef08a4e387dc4395d393401d6e88d27b347e40e51dc2a79edebbf2bcdc1";
tokens["56292ef08a4e387dc4395d393401d6e88d27b347e40e51dc2a79edebbf2bcdc1"]="Toba";
    decimals["Toba"]=8;
tokens["Drop"]="0f3f223902c44dc2bee6d3f77d565904d8501affba5ee0c56f7b32e8080ce14b";
tokens["0f3f223902c44dc2bee6d3f77d565904d8501affba5ee0c56f7b32e8080ce14b"]="Drop";
    decimals["Drop"]=8;
tokens["Atom"]="2b51ebf985367e6598bf01df27d6da6ea455dbaa8bea6b71aae57e50edd45f42";
tokens["2b51ebf985367e6598bf01df27d6da6ea455dbaa8bea6b71aae57e50edd45f42"]="Atom";
    decimals["Atom"]=2;

// let listen_slp = async function () {
//     var query = {
//         "v": 3,
//         "q": {"find": {}},
//         "r": {"f": "[ .[] | { txid: .tx.h, out: .slp.detail.outputs?, 
// in: .in[0].e.a, token: .slp.detail.tokenIdHex, valid: .slp.valid }]"}
//     }
//     var socket = new EventSource('https://slpstream.fountainhead.cash/s/'+btoa(JSON.stringify(query)))
//     socket.onopen = function() {console.log('Connected to SLPStream at ' + (new Date().getTime()))}
//     socket.onmessage = function(event) {
//         var event = JSON.parse(event.data)
//         if(event.type == 'mempool' && event.data[0].valid) {

// let balance=session.wallet.balances;
// console.log(balances);
  
  //
//  let pairs=balances.split("&"); let pair=""; let i=0; let key[0]="bch"; let value[0]=""; let k=""; let v="";
//  for(i=1;i<pairs.length;i++) {
//    pair=pairs[i]; [key,value]=pair.split("=");
//    key[i]=k; value[i]=v;
//  }
//  for(i=1;i<pairs.length;i++) {
//
//    let token = something.sometokenid;
//  if(key[i])=token); value[i]+=amount;
//  }
//  
//      session.wallet.balances = balances;

//            amount=event.data[0].out[0].amount;
//            exp=10**-(decimals[tokens[event.data[0].token]]);
//            amount=event.data[0].out[0].amount*exp;  //       console.log(event.data[0]);
//            console.log("From");
//            console.log(event.data[0].in);
//            console.log("To");
//            console.log(event.data[0].out[0].address);
//            console.log(amount);
//            console.log(tokens[event.data[0].token]);
//         }
//     }      
/** Searching for new deposits
 * @param {Object} trx - transaction object
 */
module.exports.transactionHandler = async trx => {
  if (trx.type === "mempool") {
          let txnamount=trx.data[0].out[0].amount;
            let exp=10**-(decimals[tokens[trx.data[0].token]]);
            txnamount=trx.data[0].out[0].amount*exp;  //       console.log(event.data[0]);
            console.log("Sending");
            console.log(trx.data[0].in);
            console.log("Receiving");
            console.log(trx.data[0].out[0].address);
            console.log(txnamount);
            console.log(trx.data[0].token);    
            console.log(trx.data[0].token.tokenIdHex);    
            console.log(tokens[trx.data[0].token]);    
            console.log(trx);    
    
    const txData = trx.data[0];
//    if (txData.token.transactionType === "SEND") {
    if (txData.valid === "true") {
      const outputs = txData.token.outputs; // recipients array
      const inputAddress = txData.input; // "from" address
      const txid = txData.txid;
            console.log("SEND");    

      //Checking outputs addresses
      for (const output of outputs) {
        if (output.address !== inputAddress) {
          const toAddress = output.address;
          const amount =
            tokenType === "integer"
              ? parseInt(output.amount)
              : parseFloat(output.amount);
            console.log("waiting");    
          await checkOutput(toAddress, amount, txid, inputAddress);
        }
      }
    }
  }
};

const checkOutput = async (toAddress, amount, txid, inputAddress) => {
  console.log("Checking if toAddress includes in db: ", toAddress);
  let toAddressIncludes;

  try {
    toAddressIncludes = await getDepositsTable(toAddress);
  } catch (err) {
    console.log("toAddress doesn't includes: ", toAddress);
    return;
  }

  if (!toAddressIncludes) return;

  if (toAddressIncludes.Item && amount > 0) {
    let res = "";
    res += `***************************`;
    res += `\nNew deposit transaction At: ${new Date()}\nFrom: ${inputAddress}`;
    res += `\nTo: ${toAddress}\nAmount: ${amount}`;
    res += `\nTransaction ID: ${txid}`;
    res += `\n***************************`;

    console.log(res);

    if (toAddressIncludes.Item.userId === process.env.BOT_ID) {
      console.log("match");
      await updateEscrowSession(toAddressIncludes.Item.userId, amount);
    } else {
      console.log("mismatch");
      await updateSession(toAddressIncludes.Item.userId, txid, amount);
      // Send notification to Telegram
      notification(toAddressIncludes.Item.userId, amount);
    }
  }
};

const updateSession = async (userId, trx, amount) => {
  const session = await getSession(userId);

  let deposits = session.wallet.transferedDeposits;

  deposits.transactions.push(trx);
  deposits.totalReceived = sum(deposits.totalReceived, amount);
  deposits.txAppearances = deposits.transactions.length;

  // Update Session
  session.wallet.honkPoints = sum(session.wallet.honkPoints, amount);
  session.wallet.transferedDeposits = deposits;
// let balance=session.wallet.balances;
// console.log(balances);
  
  //
//  let pairs=balances.split("&"); let pair=""; let i=0; let key[0]="bch"; let value[0]=""; let k=""; let v="";
//  for(i=1;i<pairs.length;i++) {
//    pair=pairs[i]; [key,value]=pair.split("=");
//    key[i]=k; value[i]=v;
//  }
//  for(i=1;i<pairs.length;i++) {
//
//    let token = something.sometokenid;
//  if(key[i])=token); value[i]+=amount;
//  }
//  
//      session.wallet.balances = balances;

  saveSession(userId, session);
};

const updateEscrowSession = async (userId, amount) => {
  const session = await getSession(userId);

  // Update Session
  session.wallet.honkPoints = sum(session.wallet.honkPoints, amount);
  session.totalTokensReceived = sum(session.totalTokensReceived, amount);

  saveSession(userId, session);
};

const sum = (val1, val2) => {
  const confVal = Math.pow(10, tokenDecimalPlaces);
  return (confVal * val1 + confVal * val2) / confVal;
};
