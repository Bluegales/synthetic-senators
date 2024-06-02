/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
  Contract,
  ContractFactory,
  ContractTransactionResponse,
  Interface,
} from "ethers";
import type {
  Signer,
  AddressLike,
  ContractDeployTransaction,
  ContractRunner,
} from "ethers";
import type { NonPayableOverrides } from "../../common";
import type {
  Quickstart,
  QuickstartInterface,
} from "../../contracts/Quickstart";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "initialOracleAddress",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "newOracleAddress",
        type: "address",
      },
    ],
    name: "OracleAddressUpdated",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "message",
        type: "string",
      },
    ],
    name: "initializeDalleCall",
    outputs: [
      {
        internalType: "uint256",
        name: "i",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "lastResponse",
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
        name: "",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "response",
        type: "string",
      },
      {
        internalType: "string",
        name: "errorMessage",
        type: "string",
      },
    ],
    name: "onOracleFunctionResponse",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "oracleAddress",
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
        name: "newOracleAddress",
        type: "address",
      },
    ],
    name: "setOracleAddress",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

const _bytecode =
  "0x60803461007a57601f61083f38819003918201601f19168301916001600160401b0383118484101761007f5780849260209460405283398101031261007a57516001600160a01b0381169081900361007a5760018060a01b03193381600054161760005560015416176001556040516107a990816100968239f35b600080fd5b634e487b7160e01b600052604160045260246000fdfe6040608081526004908136101561001557600080fd5b600091823560e01c90816344404ee7146105305781634c69c00f1461048a57816362747e42146103b35781637397454d14610085575063a89ae4ba1461005a57600080fd5b3461008157816003193601126100815760015490516001600160a01b039091168152602090f35b5080fd5b919050346103af5760603660031901126103af5767ffffffffffffffff906024358281116103ab576100ba9036908501610675565b926044358381116103a7576100d29036908301610675565b9060019460018060a01b03865416330361036d5783519360209485810190610111878288516101048187858d0161070b565b810103808452018261063d565b519020908051868101918a82528183108984111761035a578290525190201461026357508151938411610250575061014a6002546106d1565b601f81116101fd575b5081601f841160011461018e57509282939183928694610183575b50501b916000199060031b1c19161760025580f35b01519250388061016e565b919083601f198116600288526000805160206107548339815191529488905b888383106101e357505050106101ca575b505050811b0160025580f35b015160001960f88460031b161c191690553880806101be565b8587015188559096019594850194879350908101906101ad565b60028652600080516020610754833981519152601f850160051c810191848610610246575b601f0160051c019085905b82811061023b575050610153565b87815501859061022d565b9091508190610222565b634e487b7160e01b865260419052602485fd5b80925051938411610250575061027a6002546106d1565b601f8111610307575b5081601f84116001146102b2575092829391839286946101835750501b916000199060031b1c19161760025580f35b919083601f198116600288526000805160206107548339815191529488905b888383106102ed57505050106101ca57505050811b0160025580f35b8587015188559096019594850194879350908101906102d1565b60028652600080516020610754833981519152601f850160051c810191848610610350575b601f0160051c019085905b828110610345575050610283565b878155018590610337565b909150819061032c565b634e487b7160e01b8b526041865260248bfd5b835162461bcd60e51b8152602081840152601460248201527343616c6c6572206973206e6f74206f7261636c6560601b6044820152606490fd5b8580fd5b8480fd5b8280fd5b505034610081578160031936011261008157805190826002546103d5816106d1565b808552916001918083169081156104625750600114610417575b5050506104018261041394038361063d565b5191829160208352602083019061072e565b0390f35b9450600285526000805160206107548339815191525b82861061044a5750505061040182602061041395820101946103ef565b8054602087870181019190915290950194810161042d565b61041397508693506020925061040194915060ff191682840152151560051b820101946103ef565b9050346103af5760203660031901126103af5780356001600160a01b0381811693918490036103ab5784541633036104f7575050600180546001600160a01b031916821790557f107a9fafffb7ac890f780879e423760c9ffea8dcee8045681f40f542aede2cb88280a280f35b906020606492519162461bcd60e51b8352820152601360248201527221b0b63632b91034b9903737ba1037bbb732b960691b6044820152fd5b919050346103af576020928360031936011261061657823567ffffffffffffffff8111610081576105649036908501610675565b600354936001850180861161062a579186916105d993600355868560018060a01b036001541692885196879586948593634b04236b60e01b855284015260606024840152601060648401526f34b6b0b3b2afb3b2b732b930ba34b7b760811b608484015260a0604484015260a483019061072e565b03925af18015610620579085916105f4575b50505051908152f35b813d8311610619575b610607818361063d565b810103126106165783816105eb565b80fd5b503d6105fd565b83513d84823e3d90fd5b634e487b7160e01b845260118252602484fd5b90601f8019910116810190811067ffffffffffffffff82111761065f57604052565b634e487b7160e01b600052604160045260246000fd5b81601f820112156106cc5780359067ffffffffffffffff821161065f57604051926106aa601f8401601f19166020018561063d565b828452602083830101116106cc57816000926020809301838601378301015290565b600080fd5b90600182811c92168015610701575b60208310146106eb57565b634e487b7160e01b600052602260045260246000fd5b91607f16916106e0565b60005b83811061071e5750506000910152565b818101518382015260200161070e565b906020916107478151809281855285808601910161070b565b601f01601f191601019056fe405787fa12a823e0f2b7631cc41b3ba8828b3321ca811111fa75cd3aa3bb5acea26469706673582212204f79c0510d1344597d95c290743d47df9ace3ec552e5ae8189eaa322a581b50364736f6c63430008140033";

type QuickstartConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: QuickstartConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class Quickstart__factory extends ContractFactory {
  constructor(...args: QuickstartConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override getDeployTransaction(
    initialOracleAddress: AddressLike,
    overrides?: NonPayableOverrides & { from?: string }
  ): Promise<ContractDeployTransaction> {
    return super.getDeployTransaction(initialOracleAddress, overrides || {});
  }
  override deploy(
    initialOracleAddress: AddressLike,
    overrides?: NonPayableOverrides & { from?: string }
  ) {
    return super.deploy(initialOracleAddress, overrides || {}) as Promise<
      Quickstart & {
        deploymentTransaction(): ContractTransactionResponse;
      }
    >;
  }
  override connect(runner: ContractRunner | null): Quickstart__factory {
    return super.connect(runner) as Quickstart__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): QuickstartInterface {
    return new Interface(_abi) as QuickstartInterface;
  }
  static connect(address: string, runner?: ContractRunner | null): Quickstart {
    return new Contract(address, _abi, runner) as unknown as Quickstart;
  }
}