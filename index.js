require("dotenv").config();
const { transactionHandler } = require("./src/transactionHandler");
const { txnHonk } = require("./src/txnHonk");
const { txnFrog } = require("./src/txnFrog");
const EventSource = require("eventsource");
const btoa = require("btoa");
const tokenId = process.env.TOKENID;
var amount=0; var exp=0;
const frog=0; const honk=1; 
var tokens = ["c8947a3c68dfa4c1c4f5112132b6518aff9b9aa42d823780f52b06c2faf7005e","7f8889682d57369ed0e32336f8b7e0ffec625a35cca183f4e81fde4e71a538a1"];
var decimals = ["0","1"];
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

let listen_slp = async function () {
    var query = {
        "v": 3,
        "q": {"find": {}},
        "r": {"f": "[ .[] | { txid: .tx.h, out: .slp.detail.outputs?, in: .in[0].e.a, token: .slp.detail.tokenIdHex, valid: .slp.valid }]"}
    }
    
    var socket = new EventSource('https://slpstream.fountainhead.cash/s/'+btoa(JSON.stringify(query)))
    socket.onopen = function() {console.log('Connected to SLPStream at ' + (new Date().getTime()))}
    socket.onmessage = function(event) {
        var event = JSON.parse(event.data)
        if(event.type == 'mempool' && event.data[0].valid) {
            amount=event.data[0].out[0].amount;
            exp=10**-(decimals[tokens[event.data[0].token]]);
            amount=event.data[0].out[0].amount*exp;  //       console.log(event.data[0]);
            console.log("From");
            console.log(event.data[0].in);
            console.log("To");
            console.log(event.data[0].out[0].address);
            console.log(amount);
            console.log(tokens[event.data[0].token]);
 transactionHandler(event);
        }
    }
}
listen_slp();
