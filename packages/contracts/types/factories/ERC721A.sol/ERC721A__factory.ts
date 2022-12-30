/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../common";
import type { ERC721A, ERC721AInterface } from "../../ERC721A.sol/ERC721A";

const _abi = [
  {
    inputs: [
      {
        internalType: "string",
        name: "name_",
        type: "string",
      },
      {
        internalType: "string",
        name: "symbol_",
        type: "string",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [],
    name: "ApprovalCallerNotOwnerNorApproved",
    type: "error",
  },
  {
    inputs: [],
    name: "ApprovalQueryForNonexistentToken",
    type: "error",
  },
  {
    inputs: [],
    name: "BalanceQueryForZeroAddress",
    type: "error",
  },
  {
    inputs: [],
    name: "MintERC2309QuantityExceedsLimit",
    type: "error",
  },
  {
    inputs: [],
    name: "MintToZeroAddress",
    type: "error",
  },
  {
    inputs: [],
    name: "MintZeroQuantity",
    type: "error",
  },
  {
    inputs: [],
    name: "OwnerQueryForNonexistentToken",
    type: "error",
  },
  {
    inputs: [],
    name: "OwnershipNotInitializedForExtraData",
    type: "error",
  },
  {
    inputs: [],
    name: "TransferCallerNotOwnerNorApproved",
    type: "error",
  },
  {
    inputs: [],
    name: "TransferFromIncorrectOwner",
    type: "error",
  },
  {
    inputs: [],
    name: "TransferToNonERC721ReceiverImplementer",
    type: "error",
  },
  {
    inputs: [],
    name: "TransferToZeroAddress",
    type: "error",
  },
  {
    inputs: [],
    name: "URIQueryForNonexistentToken",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "approved",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "approved",
        type: "bool",
      },
    ],
    name: "ApprovalForAll",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "fromTokenId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "toTokenId",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
    ],
    name: "ConsecutiveTransfer",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "approve",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
    ],
    name: "balanceOf",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "getApproved",
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
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
    ],
    name: "isApprovedForAll",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "ownerOf",
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
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "_data",
        type: "bytes",
      },
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        internalType: "bool",
        name: "approved",
        type: "bool",
      },
    ],
    name: "setApprovalForAll",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes4",
        name: "interfaceId",
        type: "bytes4",
      },
    ],
    name: "supportsInterface",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "tokenURI",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalSupply",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "transferFrom",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
];

const _bytecode =
  "0x608060405234620001885762001120803803806200001d81620001a4565b9283398101604082820312620001885781516001600160401b03908181116200018857826200004e918501620001d9565b926020928382015183811162000188576200006a9201620001d9565b91835191821162000178575b6200008e82620000886002546200026d565b620002aa565b80601f8311600114620000e757508190620000c794600092620000db575b50508160011b916000199060031b1c1916176002556200035c565b60008055604051610cbf9081620004618239f35b015190503880620000ac565b60026000529193601f1985167f405787fa12a823e0f2b7631cc41b3ba8828b3321ca811111fa75cd3aa3bb5ace936000905b8282106200015f575050916001939186620000c797941062000145575b505050811b016002556200035c565b015160001960f88460031b161c1916905538808062000136565b8060018697829497870151815501960194019062000119565b620001826200018d565b62000076565b600080fd5b50634e487b7160e01b600052604160045260246000fd5b6040519190601f01601f191682016001600160401b03811183821017620001ca57604052565b620001d46200018d565b604052565b81601f8201121562000188578051906001600160401b0382116200025d575b6020906200020f601f8401601f19168301620001a4565b93838552828483010111620001885782906000905b8383831062000244575050116200023a57505090565b6000918301015290565b8193508281939201015182828801015201839162000224565b620002676200018d565b620001f8565b90600182811c921680156200029f575b60208310146200028957565b634e487b7160e01b600052602260045260246000fd5b91607f16916200027d565b601f8111620002b7575050565b6000906002825260208220906020601f850160051c83019410620002f8575b601f0160051c01915b828110620002ec57505050565b818155600101620002df565b9092508290620002d6565b601f811162000310575050565b6000906003825260208220906020601f850160051c8301941062000351575b601f0160051c01915b8281106200034557505050565b81815560010162000338565b90925082906200032f565b80519091906001600160401b03811162000450575b6200038981620003836003546200026d565b62000303565b602080601f8311600114620003c85750819293600092620003bc575b50508160011b916000199060031b1c191617600355565b015190503880620003a5565b6003600052601f198316949091907fc2575a0e9e593c00f959f8c92f12db2869c3395a3b0502d05e2516446f71f85b926000905b878210620004375750508360019596106200041d575b505050811b01600355565b015160001960f88460031b161c1916905538808062000412565b80600185968294968601518155019501930190620003fc565b6200045a6200018d565b6200037156fe60806040526004361015610013575b600080fd5b60003560e01c806301ffc9a71461012b57806306fdde0314610122578063081812fc14610119578063095ea7b31461011057806318160ddd1461010757806323b872dd146100fe57806342842e0e146100f55780636352211e146100ec57806370a08231146100e357806395d89b41146100da578063a22cb465146100d1578063b88d4fde146100c8578063c87b56dd146100bf5763e985e9c5146100b757600080fd5b61000e610889565b5061000e61081f565b5061000e61079a565b5061000e61067e565b5061000e6105ba565b5061000e61055d565b5061000e61052d565b5061000e6104ea565b5061000e6104d5565b5061000e61047c565b5061000e6103a3565b5061000e610322565b5061000e61021a565b5061000e610146565b6001600160e01b031981160361000e57565b503461000e57602036600319011261000e57602060043561016681610134565b63ffffffff60e01b166301ffc9a760e01b81149081156101a4575b8115610193575b506040519015158152f35b635b5e139f60e01b14905038610188565b6380ac58cd60e01b81149150610181565b91908251928382526000905b8482106101ee5750928060209394116101e1575b601f01601f1916010190565b60008382840101526101d5565b906020908180828501015190828601015201906101c1565b9060206102179281815201906101b5565b90565b503461000e5760008060031936011261031f5760405190806002549060019180831c92808216928315610315575b60209283861085146103015785885260208801949081156102e5575060011461028c575b6102888761027c8189038261074d565b60405191829182610206565b0390f35b600260005294509192917f405787fa12a823e0f2b7631cc41b3ba8828b3321ca811111fa75cd3aa3bb5ace5b8386106102d4575050509101905061027c82610288388061026c565b8054858701529482019481016102b8565b60ff1916855250505001915061027c905082610288388061026c565b634e487b7160e01b82526022600452602482fd5b93607f1693610248565b80fd5b503461000e57602036600319011261000e5760043561034081610969565b15610365576000526006602052602060018060a01b0360406000205416604051908152f35b6040516333d1c03960e21b8152600490fd5b600435906001600160a01b038216820361000e57565b602435906001600160a01b038216820361000e57565b50604036600319011261000e576103b8610377565b6001600160a01b0390602435826103ce826108e7565b169182330361042b575b600093828552600660205260408520911690816bffffffffffffffffffffffff60a01b825416179055604051927f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b9258585a4f35b60ff6104643361044d8660018060a01b03166000526007602052604060002090565b9060018060a01b0316600052602052604060002090565b54166103d8576040516367d9dca160e11b8152600490fd5b503461000e57600036600319011261000e5760206000546001549003604051908152f35b606090600319011261000e576001600160a01b0390600435828116810361000e5791602435908116810361000e579060443590565b506104e86104e2366104a0565b91610992565b005b506104e86104f7366104a0565b90604051926020840184811067ffffffffffffffff821117610520575b60405260008452610b4f565b61052861070d565b610514565b503461000e57602036600319011261000e5760206001600160a01b036105546004356108e7565b16604051908152f35b503461000e57602036600319011261000e576001600160a01b0361057f610377565b1680156105a8576000526005602052602067ffffffffffffffff60406000205416604051908152f35b6040516323d3ad8160e21b8152600490fd5b503461000e5760008060031936011261031f5760405190806003549060019180831c92808216928315610674575b60209283861085146103015785885260208801949081156102e5575060011461061b576102888761027c8189038261074d565b600360005294509192917fc2575a0e9e593c00f959f8c92f12db2869c3395a3b0502d05e2516446f71f85b5b838610610663575050509101905061027c82610288388061026c565b805485870152948201948101610647565b93607f16936105e8565b503461000e57604036600319011261000e57610698610377565b6024359081151580920361000e573360009081526007602090815260408083206001600160a01b0385168452909152902060ff1981541660ff841617905560405191825260018060a01b0316907f17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c3160203392a3005b50634e487b7160e01b600052604160045260246000fd5b6020810190811067ffffffffffffffff82111761074057604052565b61074861070d565b604052565b90601f8019910116810190811067ffffffffffffffff82111761074057604052565b60209067ffffffffffffffff811161078d575b601f01601f19160190565b61079561070d565b610782565b50608036600319011261000e576107af610377565b6107b761038d565b6064359167ffffffffffffffff831161000e573660238401121561000e578260040135916107e48361076f565b926107f2604051948561074d565b808452366024828701011161000e5760208160009260246104e89801838801378501015260443591610b4f565b503461000e57602036600319011261000e5761083c600435610969565b1561087757600060405161084f81610724565b5261028860405161085f81610724565b600081526040519182916020835260208301906101b5565b604051630a14c4b560e41b8152600490fd5b503461000e57604036600319011261000e57602060ff6108db6108aa610377565b6108b261038d565b6001600160a01b0391821660009081526007865260408082209290931681526020919091522090565b54166040519015158152f35b6108fb816000526004602052604060002090565b5490600160e01b82161561091b57604051636f96cda160e11b8152600490fd5b8115610925575090565b9050600054811015610957575b60001901600081815260046020526040902054908115610950575090565b9050610932565b604051636f96cda160e11b8152600490fd5b60005481109081610978575090565b90506000526004602052600160e01b604060002054161590565b9061099c836108e7565b6001600160a01b0383811692828216849003610b3e576000868152600660205260409020805490926109e16001600160a01b03881633908114908414171590565b1590565b610afa575b8216958615610ae857610a3993610a1792610ade575b506001600160a01b0316600090815260056020526040902090565b80546000190190556001600160a01b0316600090815260056020526040902090565b80546001019055600160e11b804260a01b851717610a61866000526004602052604060002090565b55811615610a94575b507fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef6000604051a4565b60018401610aac816000526004602052604060002090565b5415610ab9575b50610a6a565b6000548114610ab357610ad6906000526004602052604060002090565b553880610ab3565b60009055386109fc565b604051633a954ecd60e21b8152600490fd5b610b276109dd610b203361044d8b60018060a01b03166000526007602052604060002090565b5460ff1690565b156109e657604051632ce44b5f60e11b8152600490fd5b60405162a1148160e81b8152600490fd5b929190610b5d828286610992565b803b610b6a575b50505050565b610b7393610c09565b15610b815738808080610b64565b6040516368d2bf6b60e11b8152600490fd5b9081602091031261000e575161021781610134565b6001600160a01b039182168152911660208201526040810191909152608060608201819052610217929101906101b5565b3d15610c04573d90610bea8261076f565b91610bf8604051938461074d565b82523d6000602084013e565b606090565b92602091610c32936000604051809681958294630a85bd0160e11b9a8b85523360048601610ba8565b03926001600160a01b03165af160009181610c82575b50610c7457610c55610bd9565b80519081610c6f576040516368d2bf6b60e11b8152600490fd5b602001fd5b6001600160e01b0319161490565b610ca491925060203d8111610cab575b610c9c818361074d565b810190610b93565b9038610c48565b503d610c9256fea164736f6c634300080d000a";

type ERC721AConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: ERC721AConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class ERC721A__factory extends ContractFactory {
  constructor(...args: ERC721AConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    name_: PromiseOrValue<string>,
    symbol_: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ERC721A> {
    return super.deploy(name_, symbol_, overrides || {}) as Promise<ERC721A>;
  }
  override getDeployTransaction(
    name_: PromiseOrValue<string>,
    symbol_: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(name_, symbol_, overrides || {});
  }
  override attach(address: string): ERC721A {
    return super.attach(address) as ERC721A;
  }
  override connect(signer: Signer): ERC721A__factory {
    return super.connect(signer) as ERC721A__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): ERC721AInterface {
    return new utils.Interface(_abi) as ERC721AInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): ERC721A {
    return new Contract(address, _abi, signerOrProvider) as ERC721A;
  }
}
