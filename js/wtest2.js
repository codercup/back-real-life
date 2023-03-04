
 



var contracts_m={
	motorn:{
		address:'0x6Afba772da803ac758A55C100Dcb1aB25FdaB147',
		abi:[
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			},
			{
				"internalType": "bytes",
				"name": "signature",
				"type": "bytes"
			}
		],
		"name": "permit",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "version",
				"type": "string"
			}
		],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [],
		"name": "flag",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "get_hash",
		"outputs": [
			{
				"internalType": "bytes32",
				"name": "",
				"type": "bytes32"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "signer",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]
}
}
var flag = 0;
var provider;
var is_whitelist;
var myAccount;
var flag_white;
var ChainID;
async function metamaskConnect(){

    var modal__connect = document.getElementsByClassName('modal-warp');
    // var cleanwallet_c = document.getElementsByClassName('cleanwallet');
    var modal__connect__item = modal__connect[0]
    modal__connect__item.style.display = 'none';



	if (typeof window.ethereum !== 'undefined') {
		var ethereum = window.ethereum
		//禁止自动刷新，metamask要求写的
		ethereum.autoRefreshOnNetworkChange = false
		try {
			//第一次链接Metamask
			window.web3 = new Web3(ethereum);  
            //var web3 = window.web3;
            //请求用户授权 解决web3js无法直接唤起Meta Mask获取用户身份
            const enable = await ethereum.enable();
            var accounts = await web3.eth.getAccounts();
            var address = accounts[0];
            var provider1 = new Web3(ethereum);
            var contract =new provider1.eth.Contract(contracts_m.motorn.abi,contracts_m.motorn.address);
            var hash;
            // var address = '0x4d2E1A38d07Eadf5C62CfDaF93547DAe09F1EF83';
            // var spender = '0x5B38Da6a701c568545dCfcB03FcB875f56beddC4';
            // contract.methods.get_hash(address,spender,5).call().then(function (res){
            //              hash = res;
            //              console.log(hash)
            //          })
            
            
            const domain = [
                { name: "name", type: "string" },
                { name: "version", type: "string" },
                { name: "chainId", type: "uint256" },
                { name: "verifyingContract", type: "address" },
                { name: "salt", type: "bytes32" },
            ];
            const bid = [
                { name: "amount", type: "uint256" },
                { name: "bidder", type: "Identity" },
            ];
            const identity = [
                { name: "userId", type: "uint256" },
                { name: "wallet", type: "uint256" },
            ];
            
            
            
            
            console.log(ethereum.chainId);
            
            const domainData = {
                name: "My amazing dApp",
                version: "2",
                chainId: 4,
                verifyingContract: "0x1C56346CD2A2Bf3202F771f50d3D14a367B48070",
                salt: "0xf2d857f4a3edcb9b78b4d503bfe733db1e3f6cdc2b7971ee739626c97e86a558"
            };
            
            // var message = {
            //     amount: 100,
            //     bidder: {
            //         userId: 323,
            //         wallet: "0x4d2E1A38d07Eadf5C62CfDaF93547DAe09F1EF83"
            //     }
            // };
            
            var message = {
                amount: 100,
                bidder: {
                    userId: 10,
                    wallet: 11
                }
            };
                                    
            
            const data = JSON.stringify({
                types: {
                    EIP712Domain: domain,
                    Bid: bid,
                    Identity: identity,
                },
                domain: domainData,
                primaryType: "Bid",
                message: message
            });
            
            var signer = address;
            
            
            web3.currentProvider.sendAsync(
                {
                    method: "eth_signTypedData_v4",
                    params: [signer, data],
                    from: signer
                },
                function(err, result) {
                    if (err) {
                        return console.error(err);
                    }
                    const signature = result.result.substring(2);
                    console.log(signature);
                    const r = "0x" + signature.substring(0, 64);
                    const s = "0x" + signature.substring(64, 128);
                    const v = parseInt(signature.substring(128, 130), 16);
                    //The signature is now comprised of r, s, and v.
                    console.log('r',r);
                    console.log('s',s);
                    console.log('v',v);
                    }
                );00

            

            
            

		} catch (e) {
			alert("Error:"+e);
		}
	} else {
		alert("Install metamask first，pls!");
	}
}






