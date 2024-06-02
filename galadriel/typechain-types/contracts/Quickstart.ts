/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumberish,
  BytesLike,
  FunctionFragment,
  Result,
  Interface,
  EventFragment,
  AddressLike,
  ContractRunner,
  ContractMethod,
  Listener,
} from "ethers";
import type {
  TypedContractEvent,
  TypedDeferredTopicFilter,
  TypedEventLog,
  TypedLogDescription,
  TypedListener,
  TypedContractMethod,
} from "../common";

export interface QuickstartInterface extends Interface {
  getFunction(
    nameOrSignature:
      | "initializeDalleCall"
      | "lastResponse"
      | "onOracleFunctionResponse"
      | "oracleAddress"
      | "setOracleAddress"
  ): FunctionFragment;

  getEvent(nameOrSignatureOrTopic: "OracleAddressUpdated"): EventFragment;

  encodeFunctionData(
    functionFragment: "initializeDalleCall",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "lastResponse",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "onOracleFunctionResponse",
    values: [BigNumberish, string, string]
  ): string;
  encodeFunctionData(
    functionFragment: "oracleAddress",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "setOracleAddress",
    values: [AddressLike]
  ): string;

  decodeFunctionResult(
    functionFragment: "initializeDalleCall",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "lastResponse",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "onOracleFunctionResponse",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "oracleAddress",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setOracleAddress",
    data: BytesLike
  ): Result;
}

export namespace OracleAddressUpdatedEvent {
  export type InputTuple = [newOracleAddress: AddressLike];
  export type OutputTuple = [newOracleAddress: string];
  export interface OutputObject {
    newOracleAddress: string;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export interface Quickstart extends BaseContract {
  connect(runner?: ContractRunner | null): Quickstart;
  waitForDeployment(): Promise<this>;

  interface: QuickstartInterface;

  queryFilter<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEventLog<TCEvent>>>;
  queryFilter<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEventLog<TCEvent>>>;

  on<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    listener: TypedListener<TCEvent>
  ): Promise<this>;
  on<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    listener: TypedListener<TCEvent>
  ): Promise<this>;

  once<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    listener: TypedListener<TCEvent>
  ): Promise<this>;
  once<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    listener: TypedListener<TCEvent>
  ): Promise<this>;

  listeners<TCEvent extends TypedContractEvent>(
    event: TCEvent
  ): Promise<Array<TypedListener<TCEvent>>>;
  listeners(eventName?: string): Promise<Array<Listener>>;
  removeAllListeners<TCEvent extends TypedContractEvent>(
    event?: TCEvent
  ): Promise<this>;

  initializeDalleCall: TypedContractMethod<
    [message: string],
    [bigint],
    "nonpayable"
  >;

  lastResponse: TypedContractMethod<[], [string], "view">;

  onOracleFunctionResponse: TypedContractMethod<
    [arg0: BigNumberish, response: string, errorMessage: string],
    [void],
    "nonpayable"
  >;

  oracleAddress: TypedContractMethod<[], [string], "view">;

  setOracleAddress: TypedContractMethod<
    [newOracleAddress: AddressLike],
    [void],
    "nonpayable"
  >;

  getFunction<T extends ContractMethod = ContractMethod>(
    key: string | FunctionFragment
  ): T;

  getFunction(
    nameOrSignature: "initializeDalleCall"
  ): TypedContractMethod<[message: string], [bigint], "nonpayable">;
  getFunction(
    nameOrSignature: "lastResponse"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "onOracleFunctionResponse"
  ): TypedContractMethod<
    [arg0: BigNumberish, response: string, errorMessage: string],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "oracleAddress"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "setOracleAddress"
  ): TypedContractMethod<[newOracleAddress: AddressLike], [void], "nonpayable">;

  getEvent(
    key: "OracleAddressUpdated"
  ): TypedContractEvent<
    OracleAddressUpdatedEvent.InputTuple,
    OracleAddressUpdatedEvent.OutputTuple,
    OracleAddressUpdatedEvent.OutputObject
  >;

  filters: {
    "OracleAddressUpdated(address)": TypedContractEvent<
      OracleAddressUpdatedEvent.InputTuple,
      OracleAddressUpdatedEvent.OutputTuple,
      OracleAddressUpdatedEvent.OutputObject
    >;
    OracleAddressUpdated: TypedContractEvent<
      OracleAddressUpdatedEvent.InputTuple,
      OracleAddressUpdatedEvent.OutputTuple,
      OracleAddressUpdatedEvent.OutputObject
    >;
  };
}
