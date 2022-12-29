/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../common";
import type { AFDRenderer, AFDRendererInterface } from "../AFDRenderer";

const _abi = [
  {
    inputs: [
      {
        internalType: "contract NFT",
        name: "_token",
        type: "address",
      },
      {
        internalType: "contract IFileStore",
        name: "_fileStore",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [],
    name: "Initialized",
    type: "event",
  },
  {
    inputs: [],
    name: "fileStore",
    outputs: [
      {
        internalType: "contract IFileStore",
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
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "seedOf",
    outputs: [
      {
        internalType: "uint32",
        name: "",
        type: "uint32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "token",
    outputs: [
      {
        internalType: "contract NFT",
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
];

const _bytecode =
  "0x60c060405234801561001057600080fd5b5060405161121138038061121183398101604081905261002f9161008a565b6001600160a01b03808316608052811660a0526040517f5daa87a0e9463431830481fd4b6e3403442dfb9a12b9c07597e9f61d50b633c890600090a150506100c4565b6001600160a01b038116811461008757600080fd5b50565b6000806040838503121561009d57600080fd5b82516100a881610072565b60208401519092506100b981610072565b809150509250929050565b60805160a05161110e6101036000396000818160560152818161023e015281816102f3015261036801526000818160e20152610127015261110e6000f3fe608060405234801561001057600080fd5b506004361061004c5760003560e01c806321ea07e11461005157806382829f7414610095578063c87b56dd146100bd578063fc0c546a146100dd575b600080fd5b6100787f000000000000000000000000000000000000000000000000000000000000000081565b6040516001600160a01b0390911681526020015b60405180910390f35b6100a86100a336600461046e565b610104565b60405163ffffffff909116815260200161008c565b6100d06100cb36600461046e565b6101d3565b60405161008c91906104b7565b6100787f000000000000000000000000000000000000000000000000000000000000000081565b60405163140364a160e01b81526004810182905260009082906001600160a01b037f0000000000000000000000000000000000000000000000000000000000000000169063140364a190602401608060405180830381865afa15801561016e573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906101929190610576565b606001516040516020016101b592919091825262ffffff16602082015260400190565b60408051601f19818403018152919052805160209091012092915050565b606060006101e0836103c3565b905060006101fb6101f085610104565b63ffffffff166103c3565b604051631c10ed5560e31b815260206004820152600c60248201526b389a9736b4b71735399733bd60a11b604482015290915082906102b3906001600160a01b037f0000000000000000000000000000000000000000000000000000000000000000169063e0876aa8906064015b600060405180830381865afa158015610286573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f191682016040526102ae9190810190610610565b610407565b604051631c10ed5560e31b815260206004820152601660248201527567756e7a6970536372697074732d302e302e312e6a7360501b604482015261032a907f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03169063e0876aa890606401610269565b604051631c10ed5560e31b815260206004820152600a6024820152696166642e6d696e2e6a7360b01b60448201528490610397906001600160a01b037f0000000000000000000000000000000000000000000000000000000000000000169063e0876aa890606401610269565b6040516020016103ab959493929190610738565b60405160208183030381529060405292505050919050565b606060a06040510180604052602081039150506000815280825b600183039250600a81066030018353600a9004806103dd5750819003601f19909101908152919050565b60208082015180516040519260008080805b8581101561044f57602081026020018701519250602083015191506001823b039350836001868a01843c93830193600101610419565b50505050602081038452601f19601f8201168401604052505050919050565b60006020828403121561048057600080fd5b5035919050565b60005b838110156104a257818101518382015260200161048a565b838111156104b1576000848401525b50505050565b60208152600082518060208401526104d6816040850160208701610487565b601f01601f19169190910160400192915050565b634e487b7160e01b600052604160045260246000fd5b6040805190810167ffffffffffffffff81118282101715610523576105236104ea565b60405290565b604051601f8201601f1916810167ffffffffffffffff81118282101715610552576105526104ea565b604052919050565b80516001600160a01b038116811461057157600080fd5b919050565b60006080828403121561058857600080fd5b6040516080810167ffffffffffffffff82821081831117156105ac576105ac6104ea565b816040526105b98561055a565b83526020850151915080821682146105d057600080fd5b506020820152604083015180151581146105e957600080fd5b6040820152606083015162ffffff8116811461060457600080fd5b60608201529392505050565b6000602080838503121561062357600080fd5b825167ffffffffffffffff8082111561063b57600080fd5b8185019150604080838803121561065157600080fd5b610659610500565b83518152848401518381111561066e57600080fd5b80850194505087601f85011261068357600080fd5b835183811115610695576106956104ea565b6106a3868260051b01610529565b818152868101945060069190911b8501860190898211156106c357600080fd5b948601945b8186101561070a5783868b0312156106e05760008081fd5b6106e8610500565b865181526106f788880161055a565b81890152855294830194938601936106c8565b95820195909552979650505050505050565b6000815161072e818560208601610487565b9290920192915050565b7519185d184e985c1c1b1a58d85d1a5bdb8bda9cdbdb8b60521b81527f2537422532326e616d652532322533412532324125323046756e64616d656e74601682015271616c2532304469737075746525323025323360701b6036820152600086516107aa816048850160208b01610487565b7f2532322532432532326465736372697074696f6e25323225334125323267656e6048918401918201527f65726174697665253230617274253230627925323067656e6c6967687425324360688201527f2532306d61646525323066756c6c792532306f6e2d636861696e25323062792560888201527f323066726f6c6963253232253243253232616e696d6174696f6e5f75726c253260a88201527f32253341253232646174612533417465787425324668746d6c2532432532353060c88201527f412532353230253235323025323533436d65746125323532306368617273657460e88201527f253235334425323532325554462d3825323532322532353345253235304125326101088201527f353230253235323025323533436d65746125323532306e616d652532353344256101288201527f3235323276696577706f727425323532322532353230636f6e74656e742532356101488201527f33442532353232776964746825323533446465766963652d77696474682532356101688201527f32432532353230696e697469616c2d7363616c652532353344312e30253235326101888201527f32253235334525323530412532353230253235323025323533437469746c65256101a88201527f3235334541253235323046756e64616d656e74616c25323532304469737075746101c88201527f65253235334325323532467469746c65253235334525323530412532353041256101e88201527f32353230253235323025323533437374796c65253235334525323530412532356102088201527f3230253235323025323532302532353230626f647925323532302532353742256102288201527f32353041253235323025323532302532353230253235323025323532302532356102488201527f32306d617267696e2532353341253235323030253235334225323530412532356102688201527f32302532353230253235323025323532302532353230253235323077696474686102888201527f25323533412532353230313030767725323533422532353041253235323025326102a88201527f35323025323532302532353230253235323025323532306865696768742532356102c88201527f33412532353230313030766825323533422532353041253235323025323532306102e88201527f2532353230253235323025323532302532353230646973706c617925323533416103088201527f2532353230666c657825323533422532353041253235323025323532302532356103288201527f3230253235323025323532302532353230616c69676e2d6974656d73253235336103488201527f41253235323063656e74657225323533422532353041253235323025323532306103688201527f25323532302532353230253235323025323532306a7573746966792d636f6e746103888201527f656e742532353341253235323063656e746572253235334225323530412532356103a88201527f3230253235323025323532302532353230253235323025323532306261636b676103c88201527f726f756e642532353341253235323025323532333131312532353342253235306103e88201527f41253235323025323532302532353230253235323025323537442532353041256104088201527f3235323025323532302532353230253235323063616e766173253235323025326104288201527f35374225323530412532353230253235323025323532302532353230253235326104488201527f3025323532306d61782d776964746825323533412532353230313030253235326104688201527f352532353342253235304125323532302532353230253235323025323532302561048882018190527f3235323025323532306d61782d686569676874253235334125323532303130306104a88301527f25323532352532353342253235304125323532302532353230253235323025326104c88301527f353230253235323025323532306f626a6563742d6669742532353341253235326104e88301527f30636f6e7461696e2532353342253235304125323532302532353230253235326105088301527f302532353230253235323025323532307a6f6f6d25323533412532353230322e6105288301526105488201527f32353744253235304125323532302532353230253235334325323532467374796105688201527f6c652532353345253235304125323530412532353230253235323025323533436105888201527f73637269707425323532307479706525323533442532353232746578742532356105a88201527f32466a6176617363726970742532353242677a697025323532322532353230736105c88201527f7263253235334425323532326461746125323533417465787425323532466a616105e88201527f76617363726970742532353342626173653634253235324300000000000000006106088201526110f56110b96110b361100e611008610f76610f70610ed561062089018f61071c565b7f253235323225323533452532353343253235324673637269707425323533452581527f323530412532353230253235323025323533437363726970742532353230737260208201527f63253235334425323532326461746125323533417465787425323532466a617660408201527f6173637269707425323533426261736536342532353243000000000000000000606082015260770190565b8c61071c565b7f253235323225323533452532353343253235324673637269707425323533452581527f323530412532353230253235323025323533437363726970742532353345253260208201527f3530412532353230253235323025323532302532353230636f6e737425323532604082015273030736565642532353230253235334425323532360641b606082015260740190565b8961071c565b7f253235334225323530412532353230253235323025323533432532353246736381527f726970742532353345253235304125323532302532353230253235334373637260208201527f697074253235323073726325323533442532353232646174612532353341746560408201527f787425323532466a6176617363726970742532353342626173653634253235326060820152604360f81b608082015260810190565b8661071c565b7f25323532322532353345253235334325323532467363726970742532353345258152690c8d4c10494c8c894dd160b21b6020820152602a0190565b9897505050505050505056fea164736f6c634300080d000a";

type AFDRendererConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: AFDRendererConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class AFDRenderer__factory extends ContractFactory {
  constructor(...args: AFDRendererConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    _token: PromiseOrValue<string>,
    _fileStore: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<AFDRenderer> {
    return super.deploy(
      _token,
      _fileStore,
      overrides || {}
    ) as Promise<AFDRenderer>;
  }
  override getDeployTransaction(
    _token: PromiseOrValue<string>,
    _fileStore: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(_token, _fileStore, overrides || {});
  }
  override attach(address: string): AFDRenderer {
    return super.attach(address) as AFDRenderer;
  }
  override connect(signer: Signer): AFDRenderer__factory {
    return super.connect(signer) as AFDRenderer__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): AFDRendererInterface {
    return new utils.Interface(_abi) as AFDRendererInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): AFDRenderer {
    return new Contract(address, _abi, signerOrProvider) as AFDRenderer;
  }
}