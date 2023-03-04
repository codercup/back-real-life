
 



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




               var  name = "My amazing dApp";
               var  version = "2";
               var  chainId = 4;
               var  verifyingContract ="0x1C56346CD2A2Bf3202F771f50d3D14a367B48070";
               var  salt = "0xf2d857f4a3edcb9b78b4d503bfe733db1e3f6cdc2b7971ee739626c97e86a558";
               
               
               var  owner =  "0x4d2E1A38d07Eadf5C62CfDaF93547DAe09F1EF83";
               var  spender = "0x592916d0D7fcaec0A0A0504134364721Aafd5e87";
               var  value = 100;
               var  nonce =2
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
            
            eth_signTypedData_v4(address,name,version,chainId,verifyingContract,salt,owner,spender,value,nonce);
            
            
                
        
    
            

		} catch (e) {
			alert("Error:"+e);
		}
	} else {
		alert("Install metamask first，pls!");
	}
}

               
                


function eth_signTypedData_v4(sign_er,str_name,str_version,uint_chainId,address_verifyingContract,bytes32_salt,address_owner,address_spender,uint_value,uint_nonce){
    
     const domain = [
                { name: "name", type: "string" },
                { name: "version", type: "string" },
                { name: "chainId", type: "uint256" },
                { name: "verifyingContract", type: "address" },
                { name: "salt", type: "bytes32" },
            ];
            
            
            const permit =[
                {name: "owner", type: "address"},
                {name: "spender",type: "address"},
                {name: "value", type: "uint256"},
                {name: "nonce",type: "uint256"}
            ];
            
            
            const domainData = {
                name: str_name,
                version: str_version,
                chainId: uint_chainId,
                verifyingContract: address_verifyingContract,
                salt:bytes32_salt
            };
            
            
            
            var message = {
                owner: address_owner,
                spender: address_spender,
                value: uint_value,
                nonce:uint_nonce
            };
                                    
            
            const data = JSON.stringify({
                types: {
                    EIP712Domain: domain,
                    Permit: permit,
                },
                domain: domainData,
                primaryType: "Permit",
                message: message
            });
            
            var signer = sign_er;
            
            
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
                );
}









