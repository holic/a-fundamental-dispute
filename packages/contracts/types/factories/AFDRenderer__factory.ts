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
    name: "fullscreenHtml",
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
  "0x60c034620000a057601f62001eca38819003918201601f19168301916001600160401b03831184841017620000a5578084926040948552833981010312620000a0578060206200006a9251916200005683620000bb565b0151906200006482620000bb565b620000cd565b604051611dcd9081620000fd82396080518181816103ee0152611c50015260a05181818160ac015281816101c201526103910152f35b600080fd5b634e487b7160e01b600052604160045260246000fd5b6001600160a01b03811603620000a057565b60805260a0527f5daa87a0e9463431830481fd4b6e3403442dfb9a12b9c07597e9f61d50b633c86000604051a156fe60806040526004361015610013575b600080fd5b6000803560e01c90816321ea07e11461009a57816382829f741461007157508063c87b56dd14610068578063e1a06b771461005f5763fc0c546a1461005757600080fd5b61000e6103d7565b5061000e610334565b5061000e610151565b34610097576020610089610084366100de565b611c34565b63ffffffff60405191168152f35b80fd5b346100975780600319360112610097577f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03166080908152602090f35b602090600319011261000e5760043590565b918091926000905b828210610110575011610109575050565b6000910152565b915080602091830151818601520182916100f8565b6040916020825261014581518092816020860152602086860191016100f0565b601f01601f1916010190565b503461000e576102d96102cd610166366100de565b61018c61018761017e61017884611d81565b93611c34565b63ffffffff1690565b611d81565b604051631c10ed5560e31b80825260206004830152600e60248301526d381a9698971a97181735399733bd60911b6044830152917f00000000000000000000000000000000000000000000000000000000000000006001600160a01b0316916102c49060009061021890828180606481015b0381895afa908115610327575b839161030d575b506117ce565b93816102706040518881528281806102586004820160609060208152601060208201526f30b33216b81a9736b4b71735399733bd60811b60408201520190565b0381875afa90811561032757839161030d57506117ce565b60405197885260206004890152601660248901527567756e7a6970536372697074732d302e302e312e6a7360501b60448901529691829060649082905afa918215610300575b80926102dd575b50506117ce565b938080806105b3565b60405191829182610125565b0390f35b6102f992503d8091833e6102f18183610479565b8101906104af565b38806102bd565b61030861058f565b6102b6565b61032191503d8085833e6102f18183610479565b38610212565b61032f61058f565b61020b565b503461000e576102d96102cd610349366100de565b61035b61018761017e61017884611d81565b604051631c10ed5560e31b80825260206004830152600e60248301526d381a9698971a97181735399733bd60911b6044830152917f00000000000000000000000000000000000000000000000000000000000000006001600160a01b0316916103d19060009061021890828180606481016101fe565b93611831565b503461000e57600036600319011261000e576040517f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03168152602090f35b50634e487b7160e01b600052604160045260246000fd5b6040810190811067ffffffffffffffff82111761045057604052565b61045861041d565b604052565b6080810190811067ffffffffffffffff82111761045057604052565b90601f8019910116810190811067ffffffffffffffff82111761045057604052565b51906001600160a01b038216820361000e57565b906020808383031261000e57825167ffffffffffffffff9384821161000e570192604090818585031261000e578151946104e886610434565b80518652838101519082821161000e57019084601f8301121561000e578151908111610582575b825194610521858360051b0187610479565b818652848087019260061b8401019281841161000e578501915b83831061054d57505050505082015290565b848383031261000e57858591825161056481610434565b8551815261057383870161049b565b8382015281520192019161053b565b61058a61041d565b61050f565b506040513d6000823e3d90fd5b906105af602092828151948592016100f0565b0190565b959391979694929097604051988997602089017519185d184e985c1c1b1a58d85d1a5bdb8bda9cdbdb8b60521b9052603689017f2537422532326e616d652532322533412532324125323046756e64616d656e749052605689016e0616c2532304469737075746525323608c1b90528051908160658b019160200191610638926100f0565b7f2532463231382532322532432532326465736372697074696f6e2532322533416065918a01918201527f253232254532253830253934253230612532306c6f6e672d666f726d2532306760858201527f656e65726174697665253230617274253230636f6c6c656374696f6e2532307560a58201527f73696e6725323070352e6a732532432532306d61646525323066756c6c79253260c58201527f306f6e2d636861696e2532307769746825323045746846532e2535436e25354360e58201527f6e253230253230417274253230627925323025343067656e6c696768742532436101058201527f25323077656273697465253230616e64253230636f6e747261637473253230626101258201527f7925323025343066726f6c696325323225324325323265787465726e616c5f756101458201527f726c25323225334125323268747470732533412532462532466166756e64616d6101658201527f656e74616c646973707574652e636f6d253246617274253246000000000000006101858201526107cd9161019e9091019061059c565b7f253232253243253232696d61676525323225334125323268747470732533412581527f32462532466166756e64616d656e74616c646973707574652e636f6d2532466160208201527f70692532466172742d706c616365686f6c64657225324600000000000000000060408201526057016108489161059c565b7f253232253243253232616e696d6174696f6e5f75726c2532322533412532326481527f6174612533417465787425324668746d6c25324325323530412532353230253260208201527f35323025323533436d657461253235323063686172736574253235334425323560408201527f32325554462d382532353232253235334525323530412532353230253235323060608201527f25323533436d65746125323532306e616d65253235334425323532327669657760808201527f706f727425323532322532353230636f6e74656e74253235334425323532327760a08201527f6964746825323533446465766963652d7769647468253235324325323532306960c08201527f6e697469616c2d7363616c652532353344312e3025323532322532353345253260e08201527f3530412532353230253235323025323533437469746c6525323533450000000061010082015261011c016109a99161059c565b6110d49061060f907f253235324632313825323532302532354532253235383025323539342532353281527f3041253235323046756e64616d656e74616c253235323044697370757465253260208201527f35334325323532467469746c652532353345253235304125323530412532353260408201527f30253235323025323533437374796c652532353345253235304125323532302560608201527f32353230253235323025323532302a253235323025323537422532353041253260808201527f35323025323532302532353230253235323025323532302532353230626f782d60a08201527f73697a696e6725323533412532353230626f726465722d626f7825323533422560c08201527f323530412532353230253235323025323532302532353230253235374425323560e08201527f3041253235323025323532302532353230253235323068746d6c2532353243256101008201527f323530412532353230253235323025323532302532353230626f6479253235326101208201527f30253235374225323530412532353230253235323025323532302532353230256101408201527f32353230253235323077696474682532353341253235323031303076772532356101608201527f3342253235304125323532302532353230253235323025323532302532353230806101808301527f25323532306865696768742532353341253235323031303076682532353342256101a08301527f32353041253235323025323532302532353230253235323025323532302532356101c08301527f32306d617267696e2532353341253235323030253235334225323530412532356101e08301527f3230253235323025323532302532353230253235323025323532306261636b676102008301527f726f756e642532353341253235323025323532333131312532353342253235306102208301527f41253235323025323532302532353230253235323025323537442532353041256102408301527f3235323025323532302532353230253235323063616e766173253235323025326102608301527f35374225323530412532353230253235323025323532302532353230253235326102808301527f302532353230646973706c617925323533412532353230626c6f636b253235336102a08301527f42253235304125323532302532353230253235323025323532302532353230256102c08301527f323532306d617267696e253235334125323532306175746f25323533422532356102e08301527f30412532353230253235323025323532302532353230253235374425323530416103008301527f2532353230253235323025323532302532353230626f64792e66756c6c7363726103208301527f65656e253235323063616e7661732532353230253235374225323530412532356103408301527f32302532353230253235323025323532302532353230253235323077696474686103608301527f25323533412532353230313230307078253235323021696d706f7274616e74256103808301527f32353342253235304125323532302532353230253235323025323532302532356103a08301527f32302532353230686569676874253235334125323532303136353070782532356103c08301527f323021696d706f7274616e74253235334225323530412532353230253235323090816103e08401527f25323532302532353230253235374425323530412532353230253235323025326104008401527f3532302532353230626f647925323533416e6f74282e66756c6c73637265656e6104208401527f29253235323063616e76617325323532302532353742253235304125323532306104408401527f2532353230253235323025323532302532353230253235323070616464696e676104608401527f2532353341253235323038766d696e25323533422532353041253235323025326104808401527f35323025323532302532353230253235323025323532307769647468253235336104a08401527f4125323532303130302532353235253235323021696d706f7274616e742532356104c08401526104e08301527f25323532306865696768742532353341253235323031303025323532352532356105008301526105208201527f25323532302532353230253235323025323532306f626a6563742d66697425326105408201527f3533412532353230636f6e7461696e25323533422532353041253235323025326105608201527f35323025323532302532353230253235374425323530412532353230253235326105808201527f30253235334325323532467374796c65253235334525323530412532353041256105a08201527f32353230253235323025323533437363726970742532353345253235304125326105c08201527f353230253235323025323532302532353230636f6e73742532353230736565646105e08201526e025323532302532353344253235323608c1b6106008201520190565b6110dd9161059c565b7f253235334225323530412532353041253235323025323532302532353230253281527f353230646f63756d656e742e6164644576656e744c697374656e65722825323560208201527f3232636c69636b253235323225323532432532353230286576656e742925323560408201527f323025323533442532353345253235323025323537422532353041253235323060608201527f25323532302532353230253235323025323532302532353230636f6e7374253260808201527f353230782532353230253235334425323532306576656e742e636c69656e745860a08201527f253235323025323532462532353230646f63756d656e742e626f64792e636c6960c08201527f656e74576964746825323533422532353041253235323025323532302532353260e08201527f30253235323025323532302532353230636f6e737425323532307925323532306101008201527f253235334425323532306576656e742e636c69656e74592532353230253235326101208201527f462532353230646f63756d656e742e626f64792e636c69656e744865696768746101408201527f25323533422532353041253235323025323532302532353230253235323025326101608201527f3532302532353230646f63756d656e742e626f64792e636c6173734c6973742e6101808201527f746f67676c6528253235323266756c6c73637265656e253235323229253235336101a08201527f42253235304125323532302532353230253235323025323532302532353230256101c08201527f32353230646f63756d656e742e626f64792e7363726f6c6c546f2825323537426101e08201527f25323530412532353230253235323025323532302532353230253235323025326102008201527f353230253235323025323532306c65667425323533412532353230646f63756d6102208201527f656e742e626f64792e7363726f6c6c576964746825323532302a2532353230786102408201527f25323532302d2532353230646f63756d656e742e626f64792e636c69656e74576102608201527f69647468253235323025323532462532353230322532353243253235304125326102808201527f35323025323532302532353230253235323025323532302532353230253235326102a08201527f302532353230746f7025323533412532353230646f63756d656e742e626f64796102c08201527f2e7363726f6c6c48656967687425323532302a25323532307925323532302d256102e08201527f32353230646f63756d656e742e626f64792e636c69656e7448656967687425326103008201527f35323025323532462532353230322532353041253235323025323532302532356103208201527f32302532353230253235323025323532302532353744292532353342253235306103408201527f41253235323025323532302532353230253235323025323537442925323533426103608201527f25323530412532353230253235323025323533432532353246736372697074256103808201527f32353345253235304125323530412532353230253235323025323533437363726103a08201527f697074253235323074797065253235334425323532327465787425323532466a6103c08201527f6176617363726970742532353242677a697025323532322532353230737263256103e08201527f3235334425323532326461746125323533417465787425323532466a617661736104008201527463726970742532353342626173653634253235324360581b610420820152610435016116059161059c565b7f253235323225323533452532353343253235324673637269707425323533452581527f323530412532353230253235323025323533437363726970742532353230747960208201527f7065253235334425323532327465787425323532466a6176617363726970742560408201527f32353242677a697025323532322532353230737263253235334425323532326460608201527f61746125323533417465787425323532466a617661736372697074253235334260808201526a626173653634253235324360a81b60a082015260ab016116e09161059c565b7f253235323225323533452532353343253235324673637269707425323533452581527f323530412532353230253235323025323533437363726970742532353230737260208201527f63253235334425323532326461746125323533417465787425323532466a617660408201527f617363726970742532353342626173653634253235324300000000000000000060608201526077016117819161059c565b7f25323532322532353345253235334325323532467363726970742532353345258152690c8d4c10494c8c894dd160b21b6020820152602a0103601f19810183526117cc9083610479565b565b906020809201518051908391604051946000925b8284106118005750505050601f801991828101855201168201604052565b9091929360019083808760051b85010151015190813b90600019928484840191838d01903c010194019291906117e2565b9290949391604051958694602086017f3c6d65746120636861727365743d225554462d38223e0a20203c6d657461206e9052604086017f616d653d2276696577706f72742220636f6e74656e743d2277696474683d64659052606086017f766963652d77696474682c20696e697469616c2d7363616c653d312e30223e0a9052608086016810101e3a34ba36329f60b91b9052805190816089880191602001916118da926100f0565b7f2f32313820266d646173683b20412046756e64616d656e74616c2044697370756089918701918201527f74653c2f7469746c653e0a0a20203c7374796c653e0a202020202a207b0a202060a98201527f20202020626f782d73697a696e673a20626f726465722d626f783b0a2020202060c98201527f7d0a2020202068746d6c2c0a20202020626f6479207b0a20202020202077696460e98201527f74683a2031303076773b0a2020202020206865696768743a2031303076683b0a6101098201527f2020202020206d617267696e3a20303b0a2020202020206261636b67726f756e6101298201527f643a20233131313b0a202020207d0a2020202063616e766173207b0a202020206101498201527f2020646973706c61793a20626c6f636b3b0a2020202020206d617267696e3a206101698201527f6175746f3b0a20202020202077696474683a20313030252021696d706f7274616101898201527f6e743b0a2020202020206865696768743a20313030252021696d706f7274616e6101a98201527f743b0a2020202020206f626a6563742d6669743a20636f6e7461696e3b0a20206101c98201527f20207d0a20203c2f7374796c653e0a0a20203c7363726970743e0a20202020636101e98201526b037b739ba1039b2b2b2101e960a51b610209820152611ad4916102159091019061059c565b7f3b0a20203c2f7363726970743e0a0a20203c73637269707420747970653d227481527f6578742f6a6176617363726970742b677a697022207372633d22646174613a74602082015275195e1d0bda985d985cd8dc9a5c1d0ed8985cd94d8d0b60521b6040820152605601611b489161059c565b7f223e3c2f7363726970743e0a20203c73637269707420747970653d227465787481527f2f6a6176617363726970742b677a697022207372633d22646174613a746578746020820152720bda985d985cd8dc9a5c1d0ed8985cd94d8d0b606a1b6040820152605301611bb99161059c565b7f223e3c2f7363726970743e0a20203c736372697074207372633d22646174613a81527f746578742f6a6176617363726970743b6261736536342c0000000000000000006020820152603701611c0e9161059c565b6a111f1e17b9b1b934b83a1f60a91b81520360141981018352600b016117cc9083610479565b60405163140364a160e01b8152600481018290526080816024817f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03165afa908115611d74575b600091611ce2575b5090611cc5611cd3611ca56060611cdf95015162ffffff1690565b604080516020810195865262ffffff909216908201529182906060820190565b03601f198101835282610479565b51902063ffffffff1690565b90565b906080823d8211611d6c575b81611cfb60809383610479565b810103126100975760405191611d108361045d565b611d198161049b565b8352602081015167ffffffffffffffff81168103611d6857602084015260408101518015158103611d68576040840152606001519062ffffff8216820361009757506060820152611cc5611c8a565b8280fd5b3d9150611cee565b611d7c61058f565b611c82565b9060405160a08101604052608081019260008452925b6000190192600a906030828206018553049283611d9757809350608091030191601f190191825256fea164736f6c634300080d000a";

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
