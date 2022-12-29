"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OwnablePayable__factory = void 0;
/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
const ethers_1 = require("ethers");
const _abi = [
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "address",
                name: "previousOwner",
                type: "address",
            },
            {
                indexed: true,
                internalType: "address",
                name: "newOwner",
                type: "address",
            },
        ],
        name: "OwnershipTransferred",
        type: "event",
    },
    {
        inputs: [],
        name: "owner",
        outputs: [
            {
                internalType: "address",
                name: "",
                type: "address",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "renounceOwnership",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "newOwner",
                type: "address",
            },
        ],
        name: "transferOwnership",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "to",
                type: "address",
            },
        ],
        name: "withdrawAll",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "contract IERC20",
                name: "token",
                type: "address",
            },
            {
                internalType: "address",
                name: "to",
                type: "address",
            },
        ],
        name: "withdrawAllERC20",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "contract IERC721",
                name: "token",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "tokenId",
                type: "uint256",
            },
            {
                internalType: "address",
                name: "to",
                type: "address",
            },
        ],
        name: "withdrawERC721",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
];
const _bytecode = "0x608060405234801561001057600080fd5b5061001a3361001f565b61006f565b600080546001600160a01b038381166001600160a01b0319831681178455604051919092169283917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e09190a35050565b61055a8061007e6000396000f3fe608060405234801561001057600080fd5b50600436106100625760003560e01c8063715018a6146100675780637b9f76b5146100715780638da5cb5b14610084578063ae11c7f8146100a3578063f2fde38b146100b6578063fa09e630146100c9575b600080fd5b61006f6100dc565b005b61006f61007f366004610473565b6100f0565b600054604080516001600160a01b039092168252519081900360200190f35b61006f6100b13660046104b5565b610165565b61006f6100c43660046104ee565b610253565b61006f6100d73660046104ee565b6102d1565b6100e46103b4565b6100ee600061040e565b565b6100f86103b4565b604051632142170760e11b81523060048201526001600160a01b038281166024830152604482018490528416906342842e0e90606401600060405180830381600087803b15801561014857600080fd5b505af115801561015c573d6000803e3d6000fd5b50505050505050565b61016d6103b4565b6040516370a0823160e01b81523060048201526001600160a01b0383169063a9059cbb90839083906370a0823190602401602060405180830381865afa1580156101bb573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906101df9190610512565b6040516001600160e01b031960e085901b1681526001600160a01b03909216600483015260248201526044016020604051808303816000875af115801561022a573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061024e919061052b565b505050565b61025b6103b4565b6001600160a01b0381166102c55760405162461bcd60e51b815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201526564647265737360d01b60648201526084015b60405180910390fd5b6102ce8161040e565b50565b6102d96103b4565b600047116103185760405162461bcd60e51b815260206004820152600c60248201526b5a65726f2062616c616e636560a01b60448201526064016102bc565b6000816001600160a01b03164760405160006040518083038185875af1925050503d8060008114610365576040519150601f19603f3d011682016040523d82523d6000602084013e61036a565b606091505b50509050806103b05760405162461bcd60e51b81526020600482015260126024820152714661696c656420746f20776974686472617760701b60448201526064016102bc565b5050565b6000546001600160a01b031633146100ee5760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e657260448201526064016102bc565b600080546001600160a01b038381166001600160a01b0319831681178455604051919092169283917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e09190a35050565b6001600160a01b03811681146102ce57600080fd5b60008060006060848603121561048857600080fd5b83356104938161045e565b92506020840135915060408401356104aa8161045e565b809150509250925092565b600080604083850312156104c857600080fd5b82356104d38161045e565b915060208301356104e38161045e565b809150509250929050565b60006020828403121561050057600080fd5b813561050b8161045e565b9392505050565b60006020828403121561052457600080fd5b5051919050565b60006020828403121561053d57600080fd5b8151801515811461050b57600080fdfea164736f6c634300080d000a";
const isSuperArgs = (xs) => xs.length > 1;
class OwnablePayable__factory extends ethers_1.ContractFactory {
    constructor(...args) {
        if (isSuperArgs(args)) {
            super(...args);
        }
        else {
            super(_abi, _bytecode, args[0]);
        }
    }
    deploy(overrides) {
        return super.deploy(overrides || {});
    }
    getDeployTransaction(overrides) {
        return super.getDeployTransaction(overrides || {});
    }
    attach(address) {
        return super.attach(address);
    }
    connect(signer) {
        return super.connect(signer);
    }
    static createInterface() {
        return new ethers_1.utils.Interface(_abi);
    }
    static connect(address, signerOrProvider) {
        return new ethers_1.Contract(address, _abi, signerOrProvider);
    }
}
exports.OwnablePayable__factory = OwnablePayable__factory;
OwnablePayable__factory.bytecode = _bytecode;
OwnablePayable__factory.abi = _abi;
