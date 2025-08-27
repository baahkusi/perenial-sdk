import { GraphQLClient } from 'graphql-request';
import { Address, PublicClient, WalletClient } from 'viem';
import { BuildClaimTxArgs, BuildDepositTxArgs, BuildRedeemSharesTxArgs, MarketOracles } from '..';
import { SupportedChainId } from '../../constants';
import { OptionalAddress } from '../../types/shared';
import { OracleClients } from '../oracle';
import { VaultSnapshot, fetchVaultPositionHistory, fetchVaultSnapshots } from './chain';
/**
 * Fetches the vault commitments for a given chain.
 * @param chainId - The chain ID.
 * @param oracleClients - {@link OracleClients}
 * @param preMarketSnapshots - The pre-market snapshots.
 * @param marketOracles - The market oracles.
 * @param publicClient - The public client.
 * @returns The vault commitments.
 */
export declare const fetchVaultCommitments: ({ chainId, oracleClients, preMarketSnapshots, marketOracles, publicClient, }: {
    chainId: SupportedChainId;
    oracleClients: OracleClients;
    preMarketSnapshots: VaultSnapshot['pre']['marketSnapshots'];
    marketOracles: MarketOracles;
    publicClient: PublicClient;
}) => Promise<{
    value: bigint;
    commitAction: {
        action: number;
        args: `0x${string}`;
    };
}[]>;
type OmitBound<T> = Omit<T, 'chainId' | 'publicClient' | 'oracleClients' | 'graphClient' | 'address'>;
type VaultConfig = {
    chainId: SupportedChainId;
    publicClient: PublicClient;
    graphClient?: GraphQLClient;
    oracleClients: OracleClients;
    walletClient?: WalletClient;
    operatingFor?: Address;
};
/**
 * Vaults module class
 * @param config SDK configuration
 * @param config.chainId {@link SupportedChainId}
 * @param config.publicClient Public Client
 * @param config.graphClient GraphQl Client
 * @param config.oracleClients Oracle Clients
 * @param config.walletClient Wallet Client
 * @param config.operatingFor If set, the module will read data and send multi-invoker transactions on behalf of this address.
 *
 * @returns Vaults module instance
 */
export declare class VaultsModule {
    private config;
    private defaultAddress;
    constructor(config: VaultConfig);
    get read(): {
        /**
         * Fetches the vault snapshots
         * @param address Wallet Address [defaults to operatingFor or walletSigner address if set]
         * @param marketOracles {@link MarketOracles}
         * @param onError Error callback
         * @param onSuccess Success callback
         * @returns {@link VaultSnapshots}
         */
        vaultSnapshots: (args?: OmitBound<Parameters<typeof fetchVaultSnapshots>[0]> & OptionalAddress) => Promise<{
            user: {
                alpha?: import("./chain").VaultAccountSnapshot | undefined;
                bravo?: import("./chain").VaultAccountSnapshot | undefined;
            } | undefined;
            vault: {
                alpha?: VaultSnapshot | undefined;
                bravo?: VaultSnapshot | undefined;
            };
            commitments: readonly `0x${string}`[];
            settles: readonly `0x${string}`[];
            updates: readonly `0x${string}`[];
        } | undefined>;
        /**
         * Fetches the vault commitments
         * @param preMarketSnapshots {@link VaultSnapshot['pre']['marketSnapshots']}
         * @param marketOracles {@link MarketOracles}
         * @returns The vault commitments.
         */
        vaultCommitments: (args: OmitBound<Parameters<typeof fetchVaultCommitments>[0]>) => Promise<{
            value: bigint;
            commitAction: {
                action: number;
                args: `0x${string}`;
            };
        }[]>;
        /**
         * Fetches the vault position history
         * @param address Wallet Address [defaults to operatingFor or walletSigner address if set]
         * @returns The vault position history.
         */
        vaultPositionHistory: (args?: OmitBound<Parameters<typeof fetchVaultPositionHistory>[0]> & OptionalAddress) => Promise<Record<import("../..").PerennialVaultType, {
            vault: import("../..").PerennialVaultType;
            vaultAddress: `0x${string}`;
            logs: import("viem").GetLogsReturnType<{
                readonly anonymous: false;
                readonly inputs: readonly [{
                    readonly indexed: true;
                    readonly internalType: "address";
                    readonly name: "sender";
                    readonly type: "address";
                }, {
                    readonly indexed: true;
                    readonly internalType: "address";
                    readonly name: "account";
                    readonly type: "address";
                }, {
                    readonly indexed: false;
                    readonly internalType: "uint256";
                    readonly name: "version";
                    readonly type: "uint256";
                }, {
                    readonly indexed: false;
                    readonly internalType: "UFixed6";
                    readonly name: "depositAssets";
                    readonly type: "uint256";
                }, {
                    readonly indexed: false;
                    readonly internalType: "UFixed6";
                    readonly name: "redeemShares";
                    readonly type: "uint256";
                }, {
                    readonly indexed: false;
                    readonly internalType: "UFixed6";
                    readonly name: "claimAssets";
                    readonly type: "uint256";
                }];
                readonly name: "Updated";
                readonly type: "event";
            }, [{
                readonly anonymous: false;
                readonly inputs: readonly [{
                    readonly indexed: true;
                    readonly internalType: "address";
                    readonly name: "sender";
                    readonly type: "address";
                }, {
                    readonly indexed: true;
                    readonly internalType: "address";
                    readonly name: "account";
                    readonly type: "address";
                }, {
                    readonly indexed: false;
                    readonly internalType: "uint256";
                    readonly name: "version";
                    readonly type: "uint256";
                }, {
                    readonly indexed: false;
                    readonly internalType: "UFixed6";
                    readonly name: "depositAssets";
                    readonly type: "uint256";
                }, {
                    readonly indexed: false;
                    readonly internalType: "UFixed6";
                    readonly name: "redeemShares";
                    readonly type: "uint256";
                }, {
                    readonly indexed: false;
                    readonly internalType: "UFixed6";
                    readonly name: "claimAssets";
                    readonly type: "uint256";
                }];
                readonly name: "Updated";
                readonly type: "event";
            }], true, 0n, "latest">;
            deposits: import("viem").Log<bigint, number, false, {
                readonly anonymous: false;
                readonly inputs: readonly [{
                    readonly indexed: true;
                    readonly internalType: "address";
                    readonly name: "sender";
                    readonly type: "address";
                }, {
                    readonly indexed: true;
                    readonly internalType: "address";
                    readonly name: "account";
                    readonly type: "address";
                }, {
                    readonly indexed: false;
                    readonly internalType: "uint256";
                    readonly name: "version";
                    readonly type: "uint256";
                }, {
                    readonly indexed: false;
                    readonly internalType: "UFixed6";
                    readonly name: "depositAssets";
                    readonly type: "uint256";
                }, {
                    readonly indexed: false;
                    readonly internalType: "UFixed6";
                    readonly name: "redeemShares";
                    readonly type: "uint256";
                }, {
                    readonly indexed: false;
                    readonly internalType: "UFixed6";
                    readonly name: "claimAssets";
                    readonly type: "uint256";
                }];
                readonly name: "Updated";
                readonly type: "event";
            }, true, [{
                readonly anonymous: false;
                readonly inputs: readonly [{
                    readonly indexed: true;
                    readonly internalType: "address";
                    readonly name: "sender";
                    readonly type: "address";
                }, {
                    readonly indexed: true;
                    readonly internalType: "address";
                    readonly name: "account";
                    readonly type: "address";
                }, {
                    readonly indexed: false;
                    readonly internalType: "uint256";
                    readonly name: "version";
                    readonly type: "uint256";
                }, {
                    readonly indexed: false;
                    readonly internalType: "UFixed6";
                    readonly name: "depositAssets";
                    readonly type: "uint256";
                }, {
                    readonly indexed: false;
                    readonly internalType: "UFixed6";
                    readonly name: "redeemShares";
                    readonly type: "uint256";
                }, {
                    readonly indexed: false;
                    readonly internalType: "UFixed6";
                    readonly name: "claimAssets";
                    readonly type: "uint256";
                }];
                readonly name: "Updated";
                readonly type: "event";
            }], "Updated">[];
            redeems: import("viem").Log<bigint, number, false, {
                readonly anonymous: false;
                readonly inputs: readonly [{
                    readonly indexed: true;
                    readonly internalType: "address";
                    readonly name: "sender";
                    readonly type: "address";
                }, {
                    readonly indexed: true;
                    readonly internalType: "address";
                    readonly name: "account";
                    readonly type: "address";
                }, {
                    readonly indexed: false;
                    readonly internalType: "uint256";
                    readonly name: "version";
                    readonly type: "uint256";
                }, {
                    readonly indexed: false;
                    readonly internalType: "UFixed6";
                    readonly name: "depositAssets";
                    readonly type: "uint256";
                }, {
                    readonly indexed: false;
                    readonly internalType: "UFixed6";
                    readonly name: "redeemShares";
                    readonly type: "uint256";
                }, {
                    readonly indexed: false;
                    readonly internalType: "UFixed6";
                    readonly name: "claimAssets";
                    readonly type: "uint256";
                }];
                readonly name: "Updated";
                readonly type: "event";
            }, true, [{
                readonly anonymous: false;
                readonly inputs: readonly [{
                    readonly indexed: true;
                    readonly internalType: "address";
                    readonly name: "sender";
                    readonly type: "address";
                }, {
                    readonly indexed: true;
                    readonly internalType: "address";
                    readonly name: "account";
                    readonly type: "address";
                }, {
                    readonly indexed: false;
                    readonly internalType: "uint256";
                    readonly name: "version";
                    readonly type: "uint256";
                }, {
                    readonly indexed: false;
                    readonly internalType: "UFixed6";
                    readonly name: "depositAssets";
                    readonly type: "uint256";
                }, {
                    readonly indexed: false;
                    readonly internalType: "UFixed6";
                    readonly name: "redeemShares";
                    readonly type: "uint256";
                }, {
                    readonly indexed: false;
                    readonly internalType: "UFixed6";
                    readonly name: "claimAssets";
                    readonly type: "uint256";
                }];
                readonly name: "Updated";
                readonly type: "event";
            }], "Updated">[];
            claims: import("viem").Log<bigint, number, false, {
                readonly anonymous: false;
                readonly inputs: readonly [{
                    readonly indexed: true;
                    readonly internalType: "address";
                    readonly name: "sender";
                    readonly type: "address";
                }, {
                    readonly indexed: true;
                    readonly internalType: "address";
                    readonly name: "account";
                    readonly type: "address";
                }, {
                    readonly indexed: false;
                    readonly internalType: "uint256";
                    readonly name: "version";
                    readonly type: "uint256";
                }, {
                    readonly indexed: false;
                    readonly internalType: "UFixed6";
                    readonly name: "depositAssets";
                    readonly type: "uint256";
                }, {
                    readonly indexed: false;
                    readonly internalType: "UFixed6";
                    readonly name: "redeemShares";
                    readonly type: "uint256";
                }, {
                    readonly indexed: false;
                    readonly internalType: "UFixed6";
                    readonly name: "claimAssets";
                    readonly type: "uint256";
                }];
                readonly name: "Updated";
                readonly type: "event";
            }, true, [{
                readonly anonymous: false;
                readonly inputs: readonly [{
                    readonly indexed: true;
                    readonly internalType: "address";
                    readonly name: "sender";
                    readonly type: "address";
                }, {
                    readonly indexed: true;
                    readonly internalType: "address";
                    readonly name: "account";
                    readonly type: "address";
                }, {
                    readonly indexed: false;
                    readonly internalType: "uint256";
                    readonly name: "version";
                    readonly type: "uint256";
                }, {
                    readonly indexed: false;
                    readonly internalType: "UFixed6";
                    readonly name: "depositAssets";
                    readonly type: "uint256";
                }, {
                    readonly indexed: false;
                    readonly internalType: "UFixed6";
                    readonly name: "redeemShares";
                    readonly type: "uint256";
                }, {
                    readonly indexed: false;
                    readonly internalType: "UFixed6";
                    readonly name: "claimAssets";
                    readonly type: "uint256";
                }];
                readonly name: "Updated";
                readonly type: "event";
            }], "Updated">[];
            currentPositionDeposits: bigint;
            currentPositionClaims: bigint;
        }>>;
    };
    get build(): {
        /**
         * Build a transaction to deposit into a vault
         * @param vaultAddress Vault Address
         * @param amount Amount to deposit
         * @param address Wallet Address [defaults to operatingFor or walletSigner address if set]
         * @returns Vault deposit transaction data.
         */
        deposit: (args: OmitBound<BuildDepositTxArgs> & OptionalAddress) => Promise<{
            to: `0x${string}`;
            value: bigint;
            data: `0x${string}`;
        }>;
        /**
         * Build a transaction to redeem shares from a vault
         *
         * @param vaultAddress Vault Address
         * @param amount Amount to redeem
         * @param assets (optional) boolean - Whether to redeem assets
         * @param max (optional) boolean - Whether to redeem max
         * @param marketOracles {@link MarketOracles}
         * @param vaultSnapshots {@link VaultSnapshots}
         */
        redeem: (args: OmitBound<BuildRedeemSharesTxArgs> & OptionalAddress) => Promise<{
            to: `0x${string}`;
            value: bigint;
            data: `0x${string}`;
        }>;
        /**
         * Build a transaction to claim rewards from a vault
         * @param vaultAddress Vault Address
         * @param address Wallet Address [defaults to operatingFor or walletSigner address if set]
         * @param marketOracles {@link MarketOracles}
         * @param vaultSnapshots {@link VaultSnapshots}
         * @returns Vault claim transaction data.
         */
        claim: (args: OmitBound<BuildClaimTxArgs> & OptionalAddress) => Promise<{
            to: `0x${string}`;
            value: bigint;
            data: `0x${string}`;
        }>;
    };
    get write(): {
        /**
         * Deposit into a vault
         * @param vaultAddress Vault Address
         * @param amount Amount to deposit
         * @param marketOracles {@link MarketOracles}
         * @param vaultSnapshots {@link VaultSnapshots}
         * @returns Transaction hash
         * */
        deposit: (args: OmitBound<BuildDepositTxArgs> & OptionalAddress) => Promise<`0x${string}`>;
        /**
         * Redeem shares from a vault
         * @param vaultAddress Vault Address
         * @param amount Amount to redeem
         * @param assets (optional) boolean - Whether to redeem assets
         * @param max (optional) boolean - Whether to redeem max
         * @param marketOracles {@link MarketOracles}
         * @param vaultSnapshots {@link VaultSnapshots}
         * @returns Transaction hash
         */
        redeem: (args: OmitBound<BuildRedeemSharesTxArgs> & OptionalAddress) => Promise<`0x${string}`>;
        /**
         * Claim rewards from a vault
         * @param vaultAddress Vault Address
         * @param address Wallet Address [defaults to operatingFor or walletSigner address if set]
         * @param marketOracles {@link MarketOracles}
         * @param vaultSnapshots {@link VaultSnapshots}
         * @returns Transaction hash
         */
        claim: (args: OmitBound<{
            chainId: 60850 | 1424 | 42161 | 421614;
            publicClient: {
                account: undefined;
                batch?: {
                    multicall?: boolean | {
                        batchSize?: number | undefined;
                        wait?: number | undefined;
                    } | undefined;
                } | undefined;
                cacheTime: number;
                ccipRead?: false | {
                    request?: ((parameters: import("viem").CcipRequestParameters) => Promise<`0x${string}`>) | undefined;
                } | undefined;
                chain: import("viem").Chain | undefined;
                key: string;
                name: string;
                pollingInterval: number;
                request: import("viem").EIP1193RequestFn<import("viem").PublicRpcSchema>;
                transport: import("viem").TransportConfig<string, import("viem").EIP1193RequestFn> & Record<string, any>;
                type: string;
                uid: string;
                call: (parameters: import("viem").CallParameters<import("viem").Chain | undefined>) => Promise<import("viem").CallReturnType>;
                createAccessList: (parameters: import("viem").CreateAccessListParameters<import("viem").Chain | undefined>) => Promise<{
                    accessList: import("viem").AccessList;
                    gasUsed: bigint;
                }>;
                createBlockFilter: () => Promise<{
                    id: `0x${string}`;
                    request: import("viem").EIP1193RequestFn<readonly [{
                        Method: "eth_getFilterChanges";
                        Parameters: [filterId: `0x${string}`];
                        ReturnType: `0x${string}`[] | import("viem").RpcLog[];
                    }, {
                        Method: "eth_getFilterLogs";
                        Parameters: [filterId: `0x${string}`];
                        ReturnType: import("viem").RpcLog[];
                    }, {
                        Method: "eth_uninstallFilter";
                        Parameters: [filterId: `0x${string}`];
                        ReturnType: boolean;
                    }]>;
                    type: "block";
                }>;
                createContractEventFilter: <const abi extends import("viem").Abi | readonly unknown[], eventName extends import("viem").ContractEventName<abi> | undefined, args extends import("viem").MaybeExtractEventArgsFromAbi<abi, eventName> | undefined, strict extends boolean | undefined = undefined, fromBlock extends bigint | import("viem").BlockTag | undefined = undefined, toBlock extends bigint | import("viem").BlockTag | undefined = undefined>(args: import("viem").CreateContractEventFilterParameters<abi, eventName, args, strict, fromBlock, toBlock>) => Promise<import("viem").CreateContractEventFilterReturnType<abi, eventName, args, strict, fromBlock, toBlock>>;
                createEventFilter: <const abiEvent extends import("viem").AbiEvent | undefined = undefined, const abiEvents extends readonly unknown[] | readonly import("viem").AbiEvent[] | undefined = abiEvent extends import("viem").AbiEvent ? [abiEvent] : undefined, strict_1 extends boolean | undefined = undefined, fromBlock_1 extends bigint | import("viem").BlockTag | undefined = undefined, toBlock_1 extends bigint | import("viem").BlockTag | undefined = undefined, _EventName extends string | undefined = import("viem").MaybeAbiEventName<abiEvent>, _Args extends import("viem").MaybeExtractEventArgsFromAbi<abiEvents, _EventName> | undefined = undefined>(args?: import("viem").CreateEventFilterParameters<abiEvent, abiEvents, strict_1, fromBlock_1, toBlock_1, _EventName, _Args> | undefined) => Promise<import("viem").Filter<"event", abiEvents, _EventName, _Args, strict_1, fromBlock_1, toBlock_1> extends infer T ? { [K in keyof T]: import("viem").Filter<"event", abiEvents, _EventName, _Args, strict_1, fromBlock_1, toBlock_1>[K]; } : never>;
                createPendingTransactionFilter: () => Promise<{
                    id: `0x${string}`;
                    request: import("viem").EIP1193RequestFn<readonly [{
                        Method: "eth_getFilterChanges";
                        Parameters: [filterId: `0x${string}`];
                        ReturnType: `0x${string}`[] | import("viem").RpcLog[];
                    }, {
                        Method: "eth_getFilterLogs";
                        Parameters: [filterId: `0x${string}`];
                        ReturnType: import("viem").RpcLog[];
                    }, {
                        Method: "eth_uninstallFilter";
                        Parameters: [filterId: `0x${string}`];
                        ReturnType: boolean;
                    }]>;
                    type: "transaction";
                }>;
                estimateContractGas: <chain extends import("viem").Chain | undefined, const abi_1 extends import("viem").Abi | readonly unknown[], functionName extends import("viem").ContractFunctionName<abi_1, "nonpayable" | "payable">, args_1 extends import("viem").ContractFunctionArgs<abi_1, "nonpayable" | "payable", functionName>>(args: import("viem").EstimateContractGasParameters<abi_1, functionName, args_1, chain>) => Promise<bigint>;
                estimateGas: (args: import("viem").EstimateGasParameters<import("viem").Chain | undefined>) => Promise<bigint>;
                getBalance: (args: import("viem").GetBalanceParameters) => Promise<bigint>;
                getBlobBaseFee: () => Promise<bigint>;
                getBlock: <includeTransactions extends boolean = false, blockTag extends import("viem").BlockTag = "latest">(args?: import("viem").GetBlockParameters<includeTransactions, blockTag> | undefined) => Promise<{
                    number: blockTag extends "pending" ? null : bigint;
                    hash: blockTag extends "pending" ? null : `0x${string}`;
                    nonce: blockTag extends "pending" ? null : `0x${string}`;
                    logsBloom: blockTag extends "pending" ? null : `0x${string}`;
                    baseFeePerGas: bigint | null;
                    blobGasUsed: bigint;
                    difficulty: bigint;
                    excessBlobGas: bigint;
                    extraData: `0x${string}`;
                    gasLimit: bigint;
                    gasUsed: bigint;
                    miner: `0x${string}`;
                    mixHash: `0x${string}`;
                    parentBeaconBlockRoot?: `0x${string}` | undefined;
                    parentHash: `0x${string}`;
                    receiptsRoot: `0x${string}`;
                    sealFields: `0x${string}`[];
                    sha3Uncles: `0x${string}`;
                    size: bigint;
                    stateRoot: `0x${string}`;
                    timestamp: bigint;
                    totalDifficulty: bigint | null;
                    transactionsRoot: `0x${string}`;
                    uncles: `0x${string}`[];
                    withdrawals?: import("viem").Withdrawal[] | undefined;
                    withdrawalsRoot?: `0x${string}` | undefined;
                    transactions: includeTransactions extends true ? ({
                        yParity?: undefined;
                        from: `0x${string}`;
                        gas: bigint;
                        hash: `0x${string}`;
                        input: `0x${string}`;
                        nonce: number;
                        r: `0x${string}`;
                        s: `0x${string}`;
                        to: `0x${string}` | null;
                        typeHex: `0x${string}` | null;
                        v: bigint;
                        value: bigint;
                        accessList?: undefined;
                        authorizationList?: undefined;
                        blobVersionedHashes?: undefined;
                        chainId?: number | undefined;
                        type: "legacy";
                        gasPrice: bigint;
                        maxFeePerBlobGas?: undefined;
                        maxFeePerGas?: undefined;
                        maxPriorityFeePerGas?: undefined;
                        blockHash: (blockTag extends "pending" ? true : false) extends infer T_1 ? T_1 extends (blockTag extends "pending" ? true : false) ? T_1 extends true ? null : `0x${string}` : never : never;
                        blockNumber: (blockTag extends "pending" ? true : false) extends infer T_2 ? T_2 extends (blockTag extends "pending" ? true : false) ? T_2 extends true ? null : bigint : never : never;
                        transactionIndex: (blockTag extends "pending" ? true : false) extends infer T_3 ? T_3 extends (blockTag extends "pending" ? true : false) ? T_3 extends true ? null : number : never : never;
                    } | {
                        yParity: number;
                        from: `0x${string}`;
                        gas: bigint;
                        hash: `0x${string}`;
                        input: `0x${string}`;
                        nonce: number;
                        r: `0x${string}`;
                        s: `0x${string}`;
                        to: `0x${string}` | null;
                        typeHex: `0x${string}` | null;
                        v: bigint;
                        value: bigint;
                        accessList: import("viem").AccessList;
                        authorizationList?: undefined;
                        blobVersionedHashes?: undefined;
                        chainId: number;
                        type: "eip2930";
                        gasPrice: bigint;
                        maxFeePerBlobGas?: undefined;
                        maxFeePerGas?: undefined;
                        maxPriorityFeePerGas?: undefined;
                        blockHash: (blockTag extends "pending" ? true : false) extends infer T_4 ? T_4 extends (blockTag extends "pending" ? true : false) ? T_4 extends true ? null : `0x${string}` : never : never;
                        blockNumber: (blockTag extends "pending" ? true : false) extends infer T_5 ? T_5 extends (blockTag extends "pending" ? true : false) ? T_5 extends true ? null : bigint : never : never;
                        transactionIndex: (blockTag extends "pending" ? true : false) extends infer T_6 ? T_6 extends (blockTag extends "pending" ? true : false) ? T_6 extends true ? null : number : never : never;
                    } | {
                        yParity: number;
                        from: `0x${string}`;
                        gas: bigint;
                        hash: `0x${string}`;
                        input: `0x${string}`;
                        nonce: number;
                        r: `0x${string}`;
                        s: `0x${string}`;
                        to: `0x${string}` | null;
                        typeHex: `0x${string}` | null;
                        v: bigint;
                        value: bigint;
                        accessList: import("viem").AccessList;
                        authorizationList?: undefined;
                        blobVersionedHashes?: undefined;
                        chainId: number;
                        type: "eip1559";
                        gasPrice?: undefined;
                        maxFeePerBlobGas?: undefined;
                        maxFeePerGas: bigint;
                        maxPriorityFeePerGas: bigint;
                        blockHash: (blockTag extends "pending" ? true : false) extends infer T_7 ? T_7 extends (blockTag extends "pending" ? true : false) ? T_7 extends true ? null : `0x${string}` : never : never;
                        blockNumber: (blockTag extends "pending" ? true : false) extends infer T_8 ? T_8 extends (blockTag extends "pending" ? true : false) ? T_8 extends true ? null : bigint : never : never;
                        transactionIndex: (blockTag extends "pending" ? true : false) extends infer T_9 ? T_9 extends (blockTag extends "pending" ? true : false) ? T_9 extends true ? null : number : never : never;
                    } | {
                        yParity: number;
                        from: `0x${string}`;
                        gas: bigint;
                        hash: `0x${string}`;
                        input: `0x${string}`;
                        nonce: number;
                        r: `0x${string}`;
                        s: `0x${string}`;
                        to: `0x${string}` | null;
                        typeHex: `0x${string}` | null;
                        v: bigint;
                        value: bigint;
                        accessList: import("viem").AccessList;
                        authorizationList?: undefined;
                        blobVersionedHashes: readonly `0x${string}`[];
                        chainId: number;
                        type: "eip4844";
                        gasPrice?: undefined;
                        maxFeePerBlobGas: bigint;
                        maxFeePerGas: bigint;
                        maxPriorityFeePerGas: bigint;
                        blockHash: (blockTag extends "pending" ? true : false) extends infer T_10 ? T_10 extends (blockTag extends "pending" ? true : false) ? T_10 extends true ? null : `0x${string}` : never : never;
                        blockNumber: (blockTag extends "pending" ? true : false) extends infer T_11 ? T_11 extends (blockTag extends "pending" ? true : false) ? T_11 extends true ? null : bigint : never : never;
                        transactionIndex: (blockTag extends "pending" ? true : false) extends infer T_12 ? T_12 extends (blockTag extends "pending" ? true : false) ? T_12 extends true ? null : number : never : never;
                    } | {
                        yParity: number;
                        from: `0x${string}`;
                        gas: bigint;
                        hash: `0x${string}`;
                        input: `0x${string}`;
                        nonce: number;
                        r: `0x${string}`;
                        s: `0x${string}`;
                        to: `0x${string}` | null;
                        typeHex: `0x${string}` | null;
                        v: bigint;
                        value: bigint;
                        accessList: import("viem").AccessList;
                        authorizationList: import("viem").SignedAuthorizationList;
                        blobVersionedHashes?: undefined;
                        chainId: number;
                        type: "eip7702";
                        gasPrice?: undefined;
                        maxFeePerBlobGas?: undefined;
                        maxFeePerGas: bigint;
                        maxPriorityFeePerGas: bigint;
                        blockHash: (blockTag extends "pending" ? true : false) extends infer T_13 ? T_13 extends (blockTag extends "pending" ? true : false) ? T_13 extends true ? null : `0x${string}` : never : never;
                        blockNumber: (blockTag extends "pending" ? true : false) extends infer T_14 ? T_14 extends (blockTag extends "pending" ? true : false) ? T_14 extends true ? null : bigint : never : never;
                        transactionIndex: (blockTag extends "pending" ? true : false) extends infer T_15 ? T_15 extends (blockTag extends "pending" ? true : false) ? T_15 extends true ? null : number : never : never;
                    })[] : `0x${string}`[];
                }>;
                getBlockNumber: (args?: import("viem").GetBlockNumberParameters | undefined) => Promise<bigint>;
                getBlockTransactionCount: (args?: import("viem").GetBlockTransactionCountParameters | undefined) => Promise<number>;
                getBytecode: (args: import("viem").GetBytecodeParameters) => Promise<import("viem").GetBytecodeReturnType>;
                getChainId: () => Promise<number>;
                getCode: (args: import("viem").GetBytecodeParameters) => Promise<import("viem").GetBytecodeReturnType>;
                getContractEvents: <const abi_2 extends import("viem").Abi | readonly unknown[], eventName_1 extends import("viem").ContractEventName<abi_2> | undefined = undefined, strict_2 extends boolean | undefined = undefined, fromBlock_2 extends bigint | import("viem").BlockTag | undefined = undefined, toBlock_2 extends bigint | import("viem").BlockTag | undefined = undefined>(args: import("viem").GetContractEventsParameters<abi_2, eventName_1, strict_2, fromBlock_2, toBlock_2>) => Promise<import("viem").GetContractEventsReturnType<abi_2, eventName_1, strict_2, fromBlock_2, toBlock_2>>;
                getEip712Domain: (args: import("viem").GetEip712DomainParameters) => Promise<import("viem").GetEip712DomainReturnType>;
                getEnsAddress: (args: {
                    blockNumber?: bigint | undefined;
                    blockTag?: import("viem").BlockTag | undefined;
                    coinType?: number | undefined;
                    gatewayUrls?: string[] | undefined;
                    name: string;
                    strict?: boolean | undefined;
                    universalResolverAddress?: `0x${string}` | undefined;
                }) => Promise<import("viem").GetEnsAddressReturnType>;
                getEnsAvatar: (args: {
                    name: string;
                    blockNumber?: bigint | undefined;
                    blockTag?: import("viem").BlockTag | undefined;
                    gatewayUrls?: string[] | undefined;
                    strict?: boolean | undefined;
                    universalResolverAddress?: `0x${string}` | undefined;
                    assetGatewayUrls?: import("viem").AssetGatewayUrls | undefined;
                }) => Promise<import("viem").GetEnsAvatarReturnType>;
                getEnsName: (args: {
                    blockNumber?: bigint | undefined;
                    blockTag?: import("viem").BlockTag | undefined;
                    address: `0x${string}`;
                    gatewayUrls?: string[] | undefined;
                    strict?: boolean | undefined;
                    universalResolverAddress?: `0x${string}` | undefined;
                }) => Promise<import("viem").GetEnsNameReturnType>;
                getEnsResolver: (args: {
                    blockNumber?: bigint | undefined;
                    blockTag?: import("viem").BlockTag | undefined;
                    name: string;
                    universalResolverAddress?: `0x${string}` | undefined;
                }) => Promise<`0x${string}`>;
                getEnsText: (args: {
                    blockNumber?: bigint | undefined;
                    blockTag?: import("viem").BlockTag | undefined;
                    name: string;
                    gatewayUrls?: string[] | undefined;
                    key: string;
                    strict?: boolean | undefined;
                    universalResolverAddress?: `0x${string}` | undefined;
                }) => Promise<import("viem").GetEnsTextReturnType>;
                getFeeHistory: (args: import("viem").GetFeeHistoryParameters) => Promise<import("viem").GetFeeHistoryReturnType>;
                estimateFeesPerGas: <chainOverride extends import("viem").Chain | undefined = undefined, type extends import("viem").FeeValuesType = "eip1559">(args?: import("viem").EstimateFeesPerGasParameters<import("viem").Chain | undefined, chainOverride, type> | undefined) => Promise<import("viem").EstimateFeesPerGasReturnType<type>>;
                getFilterChanges: <filterType extends import("viem").FilterType, const abi_3 extends import("viem").Abi | readonly unknown[] | undefined, eventName_2 extends string | undefined, strict_3 extends boolean | undefined = undefined, fromBlock_3 extends bigint | import("viem").BlockTag | undefined = undefined, toBlock_3 extends bigint | import("viem").BlockTag | undefined = undefined>(args: import("viem").GetFilterChangesParameters<filterType, abi_3, eventName_2, strict_3, fromBlock_3, toBlock_3>) => Promise<import("viem").GetFilterChangesReturnType<filterType, abi_3, eventName_2, strict_3, fromBlock_3, toBlock_3>>;
                getFilterLogs: <const abi_4 extends import("viem").Abi | readonly unknown[] | undefined, eventName_3 extends string | undefined, strict_4 extends boolean | undefined = undefined, fromBlock_4 extends bigint | import("viem").BlockTag | undefined = undefined, toBlock_4 extends bigint | import("viem").BlockTag | undefined = undefined>(args: import("viem").GetFilterLogsParameters<abi_4, eventName_3, strict_4, fromBlock_4, toBlock_4>) => Promise<import("viem").GetFilterLogsReturnType<abi_4, eventName_3, strict_4, fromBlock_4, toBlock_4>>;
                getGasPrice: () => Promise<bigint>;
                getLogs: <const abiEvent_1 extends import("viem").AbiEvent | undefined = undefined, const abiEvents_1 extends readonly unknown[] | readonly import("viem").AbiEvent[] | undefined = abiEvent_1 extends import("viem").AbiEvent ? [abiEvent_1] : undefined, strict_5 extends boolean | undefined = undefined, fromBlock_5 extends bigint | import("viem").BlockTag | undefined = undefined, toBlock_5 extends bigint | import("viem").BlockTag | undefined = undefined>(args?: import("viem").GetLogsParameters<abiEvent_1, abiEvents_1, strict_5, fromBlock_5, toBlock_5> | undefined) => Promise<import("viem").GetLogsReturnType<abiEvent_1, abiEvents_1, strict_5, fromBlock_5, toBlock_5>>;
                getProof: (args: import("viem").GetProofParameters) => Promise<import("viem").GetProofReturnType>;
                estimateMaxPriorityFeePerGas: <chainOverride_1 extends import("viem").Chain | undefined = undefined>(args?: {
                    chain: chainOverride_1 | null;
                } | undefined) => Promise<bigint>;
                getStorageAt: (args: import("viem").GetStorageAtParameters) => Promise<import("viem").GetStorageAtReturnType>;
                getTransaction: <blockTag_1 extends import("viem").BlockTag = "latest">(args: import("viem").GetTransactionParameters<blockTag_1>) => Promise<{
                    yParity?: undefined;
                    from: `0x${string}`;
                    gas: bigint;
                    hash: `0x${string}`;
                    input: `0x${string}`;
                    nonce: number;
                    r: `0x${string}`;
                    s: `0x${string}`;
                    to: `0x${string}` | null;
                    typeHex: `0x${string}` | null;
                    v: bigint;
                    value: bigint;
                    accessList?: undefined;
                    authorizationList?: undefined;
                    blobVersionedHashes?: undefined;
                    chainId?: number | undefined;
                    type: "legacy";
                    gasPrice: bigint;
                    maxFeePerBlobGas?: undefined;
                    maxFeePerGas?: undefined;
                    maxPriorityFeePerGas?: undefined;
                    blockHash: (blockTag_1 extends "pending" ? true : false) extends infer T_16 ? T_16 extends (blockTag_1 extends "pending" ? true : false) ? T_16 extends true ? null : `0x${string}` : never : never;
                    blockNumber: (blockTag_1 extends "pending" ? true : false) extends infer T_17 ? T_17 extends (blockTag_1 extends "pending" ? true : false) ? T_17 extends true ? null : bigint : never : never;
                    transactionIndex: (blockTag_1 extends "pending" ? true : false) extends infer T_18 ? T_18 extends (blockTag_1 extends "pending" ? true : false) ? T_18 extends true ? null : number : never : never;
                } | {
                    yParity: number;
                    from: `0x${string}`;
                    gas: bigint;
                    hash: `0x${string}`;
                    input: `0x${string}`;
                    nonce: number;
                    r: `0x${string}`;
                    s: `0x${string}`;
                    to: `0x${string}` | null;
                    typeHex: `0x${string}` | null;
                    v: bigint;
                    value: bigint;
                    accessList: import("viem").AccessList;
                    authorizationList?: undefined;
                    blobVersionedHashes?: undefined;
                    chainId: number;
                    type: "eip2930";
                    gasPrice: bigint;
                    maxFeePerBlobGas?: undefined;
                    maxFeePerGas?: undefined;
                    maxPriorityFeePerGas?: undefined;
                    blockHash: (blockTag_1 extends "pending" ? true : false) extends infer T_19 ? T_19 extends (blockTag_1 extends "pending" ? true : false) ? T_19 extends true ? null : `0x${string}` : never : never;
                    blockNumber: (blockTag_1 extends "pending" ? true : false) extends infer T_20 ? T_20 extends (blockTag_1 extends "pending" ? true : false) ? T_20 extends true ? null : bigint : never : never;
                    transactionIndex: (blockTag_1 extends "pending" ? true : false) extends infer T_21 ? T_21 extends (blockTag_1 extends "pending" ? true : false) ? T_21 extends true ? null : number : never : never;
                } | {
                    yParity: number;
                    from: `0x${string}`;
                    gas: bigint;
                    hash: `0x${string}`;
                    input: `0x${string}`;
                    nonce: number;
                    r: `0x${string}`;
                    s: `0x${string}`;
                    to: `0x${string}` | null;
                    typeHex: `0x${string}` | null;
                    v: bigint;
                    value: bigint;
                    accessList: import("viem").AccessList;
                    authorizationList?: undefined;
                    blobVersionedHashes?: undefined;
                    chainId: number;
                    type: "eip1559";
                    gasPrice?: undefined;
                    maxFeePerBlobGas?: undefined;
                    maxFeePerGas: bigint;
                    maxPriorityFeePerGas: bigint;
                    blockHash: (blockTag_1 extends "pending" ? true : false) extends infer T_22 ? T_22 extends (blockTag_1 extends "pending" ? true : false) ? T_22 extends true ? null : `0x${string}` : never : never;
                    blockNumber: (blockTag_1 extends "pending" ? true : false) extends infer T_23 ? T_23 extends (blockTag_1 extends "pending" ? true : false) ? T_23 extends true ? null : bigint : never : never;
                    transactionIndex: (blockTag_1 extends "pending" ? true : false) extends infer T_24 ? T_24 extends (blockTag_1 extends "pending" ? true : false) ? T_24 extends true ? null : number : never : never;
                } | {
                    yParity: number;
                    from: `0x${string}`;
                    gas: bigint;
                    hash: `0x${string}`;
                    input: `0x${string}`;
                    nonce: number;
                    r: `0x${string}`;
                    s: `0x${string}`;
                    to: `0x${string}` | null;
                    typeHex: `0x${string}` | null;
                    v: bigint;
                    value: bigint;
                    accessList: import("viem").AccessList;
                    authorizationList?: undefined;
                    blobVersionedHashes: readonly `0x${string}`[];
                    chainId: number;
                    type: "eip4844";
                    gasPrice?: undefined;
                    maxFeePerBlobGas: bigint;
                    maxFeePerGas: bigint;
                    maxPriorityFeePerGas: bigint;
                    blockHash: (blockTag_1 extends "pending" ? true : false) extends infer T_25 ? T_25 extends (blockTag_1 extends "pending" ? true : false) ? T_25 extends true ? null : `0x${string}` : never : never;
                    blockNumber: (blockTag_1 extends "pending" ? true : false) extends infer T_26 ? T_26 extends (blockTag_1 extends "pending" ? true : false) ? T_26 extends true ? null : bigint : never : never;
                    transactionIndex: (blockTag_1 extends "pending" ? true : false) extends infer T_27 ? T_27 extends (blockTag_1 extends "pending" ? true : false) ? T_27 extends true ? null : number : never : never;
                } | {
                    yParity: number;
                    from: `0x${string}`;
                    gas: bigint;
                    hash: `0x${string}`;
                    input: `0x${string}`;
                    nonce: number;
                    r: `0x${string}`;
                    s: `0x${string}`;
                    to: `0x${string}` | null;
                    typeHex: `0x${string}` | null;
                    v: bigint;
                    value: bigint;
                    accessList: import("viem").AccessList;
                    authorizationList: import("viem").SignedAuthorizationList;
                    blobVersionedHashes?: undefined;
                    chainId: number;
                    type: "eip7702";
                    gasPrice?: undefined;
                    maxFeePerBlobGas?: undefined;
                    maxFeePerGas: bigint;
                    maxPriorityFeePerGas: bigint;
                    blockHash: (blockTag_1 extends "pending" ? true : false) extends infer T_28 ? T_28 extends (blockTag_1 extends "pending" ? true : false) ? T_28 extends true ? null : `0x${string}` : never : never;
                    blockNumber: (blockTag_1 extends "pending" ? true : false) extends infer T_29 ? T_29 extends (blockTag_1 extends "pending" ? true : false) ? T_29 extends true ? null : bigint : never : never;
                    transactionIndex: (blockTag_1 extends "pending" ? true : false) extends infer T_30 ? T_30 extends (blockTag_1 extends "pending" ? true : false) ? T_30 extends true ? null : number : never : never;
                }>;
                getTransactionConfirmations: (args: import("viem").GetTransactionConfirmationsParameters<import("viem").Chain | undefined>) => Promise<bigint>;
                getTransactionCount: (args: import("viem").GetTransactionCountParameters) => Promise<number>;
                getTransactionReceipt: (args: import("viem").GetTransactionReceiptParameters) => Promise<import("viem").TransactionReceipt>;
                multicall: <const contracts extends readonly unknown[], allowFailure extends boolean = true>(args: import("viem").MulticallParameters<contracts, allowFailure>) => Promise<import("viem").MulticallReturnType<contracts, allowFailure>>;
                prepareTransactionRequest: <const request extends import("viem").PrepareTransactionRequestRequest<import("viem").Chain | undefined, chainOverride_2>, chainOverride_2 extends import("viem").Chain | undefined = undefined, accountOverride extends `0x${string}` | import("viem").Account | undefined = undefined>(args: import("viem").PrepareTransactionRequestParameters<import("viem").Chain | undefined, import("viem").Account | undefined, chainOverride_2, accountOverride, request>) => Promise<import("viem").UnionRequiredBy<Extract<import("viem").UnionOmit<import("viem").ExtractChainFormatterParameters<import("viem").DeriveChain<import("viem").Chain | undefined, chainOverride_2>, "transactionRequest", import("viem").TransactionRequest>, "from"> & (import("viem").DeriveChain<import("viem").Chain | undefined, chainOverride_2> extends infer T_45 ? T_45 extends import("viem").DeriveChain<import("viem").Chain | undefined, chainOverride_2> ? T_45 extends import("viem").Chain ? {
                    chain: T_45;
                } : {
                    chain?: undefined;
                } : never : never) & (import("viem").DeriveAccount<import("viem").Account | undefined, accountOverride> extends infer T_46 ? T_46 extends import("viem").DeriveAccount<import("viem").Account | undefined, accountOverride> ? T_46 extends import("viem").Account ? {
                    account: T_46;
                    from: `0x${string}`;
                } : {
                    account?: undefined;
                    from?: undefined;
                } : never : never), import("viem").IsNever<((request["type"] extends string | undefined ? request["type"] : import("viem").GetTransactionType<request, (request extends {
                    accessList?: undefined;
                    authorizationList?: undefined;
                    blobs?: undefined;
                    blobVersionedHashes?: undefined;
                    gasPrice?: bigint | undefined;
                    sidecars?: undefined;
                } & import("viem").FeeValuesLegacy ? "legacy" : never) | (request extends {
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: undefined;
                    blobs?: undefined;
                    blobVersionedHashes?: undefined;
                    gasPrice?: undefined;
                    maxFeePerBlobGas?: undefined;
                    maxFeePerGas?: bigint | undefined;
                    maxPriorityFeePerGas?: bigint | undefined;
                    sidecars?: undefined;
                } & (import("viem").OneOf<{
                    maxFeePerGas: bigint;
                } | {
                    maxPriorityFeePerGas: bigint;
                }, import("viem").FeeValuesEIP1559> & {
                    accessList?: import("viem").AccessList | undefined;
                }) ? "eip1559" : never) | (request extends {
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: undefined;
                    blobs?: undefined;
                    blobVersionedHashes?: undefined;
                    gasPrice?: bigint | undefined;
                    sidecars?: undefined;
                    maxFeePerBlobGas?: undefined;
                    maxFeePerGas?: undefined;
                    maxPriorityFeePerGas?: undefined;
                } & {
                    accessList: import("viem").AccessList | undefined;
                } ? "eip2930" : never) | (request extends ({
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: undefined;
                    blobs?: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
                    blobVersionedHashes?: readonly `0x${string}`[] | undefined;
                    maxFeePerBlobGas?: bigint | undefined;
                    maxFeePerGas?: bigint | undefined;
                    maxPriorityFeePerGas?: bigint | undefined;
                    sidecars?: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
                } | {
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: undefined;
                    blobs?: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
                    blobVersionedHashes?: readonly `0x${string}`[] | undefined;
                    maxFeePerBlobGas?: bigint | undefined;
                    maxFeePerGas?: bigint | undefined;
                    maxPriorityFeePerGas?: bigint | undefined;
                    sidecars?: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
                }) & (import("viem").ExactPartial<import("viem").FeeValuesEIP4844> & import("viem").OneOf<{
                    blobs: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
                } | {
                    blobVersionedHashes: readonly `0x${string}`[] | undefined;
                } | {
                    sidecars: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
                }, import("viem").TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: import("viem").SignedAuthorizationList | undefined;
                    blobs?: undefined;
                    blobVersionedHashes?: undefined;
                    gasPrice?: undefined;
                    maxFeePerBlobGas?: undefined;
                    maxFeePerGas?: bigint | undefined;
                    maxPriorityFeePerGas?: bigint | undefined;
                    sidecars?: undefined;
                } | {
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: import("viem").SignedAuthorizationList | undefined;
                    blobs?: undefined;
                    blobVersionedHashes?: undefined;
                    gasPrice?: undefined;
                    maxFeePerBlobGas?: undefined;
                    maxFeePerGas?: bigint | undefined;
                    maxPriorityFeePerGas?: bigint | undefined;
                    sidecars?: undefined;
                }) & {
                    authorizationList: import("viem").SignedAuthorizationList;
                } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)> extends "legacy" ? unknown : import("viem").GetTransactionType<request, (request extends {
                    accessList?: undefined;
                    authorizationList?: undefined;
                    blobs?: undefined;
                    blobVersionedHashes?: undefined;
                    gasPrice?: bigint | undefined;
                    sidecars?: undefined;
                } & import("viem").FeeValuesLegacy ? "legacy" : never) | (request extends {
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: undefined;
                    blobs?: undefined;
                    blobVersionedHashes?: undefined;
                    gasPrice?: undefined;
                    maxFeePerBlobGas?: undefined;
                    maxFeePerGas?: bigint | undefined;
                    maxPriorityFeePerGas?: bigint | undefined;
                    sidecars?: undefined;
                } & (import("viem").OneOf<{
                    maxFeePerGas: bigint;
                } | {
                    maxPriorityFeePerGas: bigint;
                }, import("viem").FeeValuesEIP1559> & {
                    accessList?: import("viem").AccessList | undefined;
                }) ? "eip1559" : never) | (request extends {
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: undefined;
                    blobs?: undefined;
                    blobVersionedHashes?: undefined;
                    gasPrice?: bigint | undefined;
                    sidecars?: undefined;
                    maxFeePerBlobGas?: undefined;
                    maxFeePerGas?: undefined;
                    maxPriorityFeePerGas?: undefined;
                } & {
                    accessList: import("viem").AccessList | undefined;
                } ? "eip2930" : never) | (request extends ({
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: undefined;
                    blobs?: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
                    blobVersionedHashes?: readonly `0x${string}`[] | undefined;
                    maxFeePerBlobGas?: bigint | undefined;
                    maxFeePerGas?: bigint | undefined;
                    maxPriorityFeePerGas?: bigint | undefined;
                    sidecars?: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
                } | {
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: undefined;
                    blobs?: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
                    blobVersionedHashes?: readonly `0x${string}`[] | undefined;
                    maxFeePerBlobGas?: bigint | undefined;
                    maxFeePerGas?: bigint | undefined;
                    maxPriorityFeePerGas?: bigint | undefined;
                    sidecars?: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
                }) & (import("viem").ExactPartial<import("viem").FeeValuesEIP4844> & import("viem").OneOf<{
                    blobs: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
                } | {
                    blobVersionedHashes: readonly `0x${string}`[] | undefined;
                } | {
                    sidecars: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
                }, import("viem").TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: import("viem").SignedAuthorizationList | undefined;
                    blobs?: undefined;
                    blobVersionedHashes?: undefined;
                    gasPrice?: undefined;
                    maxFeePerBlobGas?: undefined;
                    maxFeePerGas?: bigint | undefined;
                    maxPriorityFeePerGas?: bigint | undefined;
                    sidecars?: undefined;
                } | {
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: import("viem").SignedAuthorizationList | undefined;
                    blobs?: undefined;
                    blobVersionedHashes?: undefined;
                    gasPrice?: undefined;
                    maxFeePerBlobGas?: undefined;
                    maxFeePerGas?: bigint | undefined;
                    maxPriorityFeePerGas?: bigint | undefined;
                    sidecars?: undefined;
                }) & {
                    authorizationList: import("viem").SignedAuthorizationList;
                } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)>) extends infer T_47 ? T_47 extends (request["type"] extends string | undefined ? request["type"] : import("viem").GetTransactionType<request, (request extends {
                    accessList?: undefined;
                    authorizationList?: undefined;
                    blobs?: undefined;
                    blobVersionedHashes?: undefined;
                    gasPrice?: bigint | undefined;
                    sidecars?: undefined;
                } & import("viem").FeeValuesLegacy ? "legacy" : never) | (request extends {
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: undefined;
                    blobs?: undefined;
                    blobVersionedHashes?: undefined;
                    gasPrice?: undefined;
                    maxFeePerBlobGas?: undefined;
                    maxFeePerGas?: bigint | undefined;
                    maxPriorityFeePerGas?: bigint | undefined;
                    sidecars?: undefined;
                } & (import("viem").OneOf<{
                    maxFeePerGas: bigint;
                } | {
                    maxPriorityFeePerGas: bigint;
                }, import("viem").FeeValuesEIP1559> & {
                    accessList?: import("viem").AccessList | undefined;
                }) ? "eip1559" : never) | (request extends {
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: undefined;
                    blobs?: undefined;
                    blobVersionedHashes?: undefined;
                    gasPrice?: bigint | undefined;
                    sidecars?: undefined;
                    maxFeePerBlobGas?: undefined;
                    maxFeePerGas?: undefined;
                    maxPriorityFeePerGas?: undefined;
                } & {
                    accessList: import("viem").AccessList | undefined;
                } ? "eip2930" : never) | (request extends ({
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: undefined;
                    blobs?: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
                    blobVersionedHashes?: readonly `0x${string}`[] | undefined;
                    maxFeePerBlobGas?: bigint | undefined;
                    maxFeePerGas?: bigint | undefined;
                    maxPriorityFeePerGas?: bigint | undefined;
                    sidecars?: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
                } | {
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: undefined;
                    blobs?: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
                    blobVersionedHashes?: readonly `0x${string}`[] | undefined;
                    maxFeePerBlobGas?: bigint | undefined;
                    maxFeePerGas?: bigint | undefined;
                    maxPriorityFeePerGas?: bigint | undefined;
                    sidecars?: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
                }) & (import("viem").ExactPartial<import("viem").FeeValuesEIP4844> & import("viem").OneOf<{
                    blobs: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
                } | {
                    blobVersionedHashes: readonly `0x${string}`[] | undefined;
                } | {
                    sidecars: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
                }, import("viem").TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: import("viem").SignedAuthorizationList | undefined;
                    blobs?: undefined;
                    blobVersionedHashes?: undefined;
                    gasPrice?: undefined;
                    maxFeePerBlobGas?: undefined;
                    maxFeePerGas?: bigint | undefined;
                    maxPriorityFeePerGas?: bigint | undefined;
                    sidecars?: undefined;
                } | {
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: import("viem").SignedAuthorizationList | undefined;
                    blobs?: undefined;
                    blobVersionedHashes?: undefined;
                    gasPrice?: undefined;
                    maxFeePerBlobGas?: undefined;
                    maxFeePerGas?: bigint | undefined;
                    maxPriorityFeePerGas?: bigint | undefined;
                    sidecars?: undefined;
                }) & {
                    authorizationList: import("viem").SignedAuthorizationList;
                } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)> extends "legacy" ? unknown : import("viem").GetTransactionType<request, (request extends {
                    accessList?: undefined;
                    authorizationList?: undefined;
                    blobs?: undefined;
                    blobVersionedHashes?: undefined;
                    gasPrice?: bigint | undefined;
                    sidecars?: undefined;
                } & import("viem").FeeValuesLegacy ? "legacy" : never) | (request extends {
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: undefined;
                    blobs?: undefined;
                    blobVersionedHashes?: undefined;
                    gasPrice?: undefined;
                    maxFeePerBlobGas?: undefined;
                    maxFeePerGas?: bigint | undefined;
                    maxPriorityFeePerGas?: bigint | undefined;
                    sidecars?: undefined;
                } & (import("viem").OneOf<{
                    maxFeePerGas: bigint;
                } | {
                    maxPriorityFeePerGas: bigint;
                }, import("viem").FeeValuesEIP1559> & {
                    accessList?: import("viem").AccessList | undefined;
                }) ? "eip1559" : never) | (request extends {
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: undefined;
                    blobs?: undefined;
                    blobVersionedHashes?: undefined;
                    gasPrice?: bigint | undefined;
                    sidecars?: undefined;
                    maxFeePerBlobGas?: undefined;
                    maxFeePerGas?: undefined;
                    maxPriorityFeePerGas?: undefined;
                } & {
                    accessList: import("viem").AccessList | undefined;
                } ? "eip2930" : never) | (request extends ({
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: undefined;
                    blobs?: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
                    blobVersionedHashes?: readonly `0x${string}`[] | undefined;
                    maxFeePerBlobGas?: bigint | undefined;
                    maxFeePerGas?: bigint | undefined;
                    maxPriorityFeePerGas?: bigint | undefined;
                    sidecars?: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
                } | {
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: undefined;
                    blobs?: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
                    blobVersionedHashes?: readonly `0x${string}`[] | undefined;
                    maxFeePerBlobGas?: bigint | undefined;
                    maxFeePerGas?: bigint | undefined;
                    maxPriorityFeePerGas?: bigint | undefined;
                    sidecars?: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
                }) & (import("viem").ExactPartial<import("viem").FeeValuesEIP4844> & import("viem").OneOf<{
                    blobs: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
                } | {
                    blobVersionedHashes: readonly `0x${string}`[] | undefined;
                } | {
                    sidecars: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
                }, import("viem").TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: import("viem").SignedAuthorizationList | undefined;
                    blobs?: undefined;
                    blobVersionedHashes?: undefined;
                    gasPrice?: undefined;
                    maxFeePerBlobGas?: undefined;
                    maxFeePerGas?: bigint | undefined;
                    maxPriorityFeePerGas?: bigint | undefined;
                    sidecars?: undefined;
                } | {
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: import("viem").SignedAuthorizationList | undefined;
                    blobs?: undefined;
                    blobVersionedHashes?: undefined;
                    gasPrice?: undefined;
                    maxFeePerBlobGas?: undefined;
                    maxFeePerGas?: bigint | undefined;
                    maxPriorityFeePerGas?: bigint | undefined;
                    sidecars?: undefined;
                }) & {
                    authorizationList: import("viem").SignedAuthorizationList;
                } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)>) ? T_47 extends "legacy" ? import("viem").TransactionRequestLegacy : never : never : never) | ((request["type"] extends string | undefined ? request["type"] : import("viem").GetTransactionType<request, (request extends {
                    accessList?: undefined;
                    authorizationList?: undefined;
                    blobs?: undefined;
                    blobVersionedHashes?: undefined;
                    gasPrice?: bigint | undefined;
                    sidecars?: undefined;
                } & import("viem").FeeValuesLegacy ? "legacy" : never) | (request extends {
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: undefined;
                    blobs?: undefined;
                    blobVersionedHashes?: undefined;
                    gasPrice?: undefined;
                    maxFeePerBlobGas?: undefined;
                    maxFeePerGas?: bigint | undefined;
                    maxPriorityFeePerGas?: bigint | undefined;
                    sidecars?: undefined;
                } & (import("viem").OneOf<{
                    maxFeePerGas: bigint;
                } | {
                    maxPriorityFeePerGas: bigint;
                }, import("viem").FeeValuesEIP1559> & {
                    accessList?: import("viem").AccessList | undefined;
                }) ? "eip1559" : never) | (request extends {
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: undefined;
                    blobs?: undefined;
                    blobVersionedHashes?: undefined;
                    gasPrice?: bigint | undefined;
                    sidecars?: undefined;
                    maxFeePerBlobGas?: undefined;
                    maxFeePerGas?: undefined;
                    maxPriorityFeePerGas?: undefined;
                } & {
                    accessList: import("viem").AccessList | undefined;
                } ? "eip2930" : never) | (request extends ({
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: undefined;
                    blobs?: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
                    blobVersionedHashes?: readonly `0x${string}`[] | undefined;
                    maxFeePerBlobGas?: bigint | undefined;
                    maxFeePerGas?: bigint | undefined;
                    maxPriorityFeePerGas?: bigint | undefined;
                    sidecars?: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
                } | {
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: undefined;
                    blobs?: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
                    blobVersionedHashes?: readonly `0x${string}`[] | undefined;
                    maxFeePerBlobGas?: bigint | undefined;
                    maxFeePerGas?: bigint | undefined;
                    maxPriorityFeePerGas?: bigint | undefined;
                    sidecars?: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
                }) & (import("viem").ExactPartial<import("viem").FeeValuesEIP4844> & import("viem").OneOf<{
                    blobs: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
                } | {
                    blobVersionedHashes: readonly `0x${string}`[] | undefined;
                } | {
                    sidecars: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
                }, import("viem").TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: import("viem").SignedAuthorizationList | undefined;
                    blobs?: undefined;
                    blobVersionedHashes?: undefined;
                    gasPrice?: undefined;
                    maxFeePerBlobGas?: undefined;
                    maxFeePerGas?: bigint | undefined;
                    maxPriorityFeePerGas?: bigint | undefined;
                    sidecars?: undefined;
                } | {
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: import("viem").SignedAuthorizationList | undefined;
                    blobs?: undefined;
                    blobVersionedHashes?: undefined;
                    gasPrice?: undefined;
                    maxFeePerBlobGas?: undefined;
                    maxFeePerGas?: bigint | undefined;
                    maxPriorityFeePerGas?: bigint | undefined;
                    sidecars?: undefined;
                }) & {
                    authorizationList: import("viem").SignedAuthorizationList;
                } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)> extends "legacy" ? unknown : import("viem").GetTransactionType<request, (request extends {
                    accessList?: undefined;
                    authorizationList?: undefined;
                    blobs?: undefined;
                    blobVersionedHashes?: undefined;
                    gasPrice?: bigint | undefined;
                    sidecars?: undefined;
                } & import("viem").FeeValuesLegacy ? "legacy" : never) | (request extends {
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: undefined;
                    blobs?: undefined;
                    blobVersionedHashes?: undefined;
                    gasPrice?: undefined;
                    maxFeePerBlobGas?: undefined;
                    maxFeePerGas?: bigint | undefined;
                    maxPriorityFeePerGas?: bigint | undefined;
                    sidecars?: undefined;
                } & (import("viem").OneOf<{
                    maxFeePerGas: bigint;
                } | {
                    maxPriorityFeePerGas: bigint;
                }, import("viem").FeeValuesEIP1559> & {
                    accessList?: import("viem").AccessList | undefined;
                }) ? "eip1559" : never) | (request extends {
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: undefined;
                    blobs?: undefined;
                    blobVersionedHashes?: undefined;
                    gasPrice?: bigint | undefined;
                    sidecars?: undefined;
                    maxFeePerBlobGas?: undefined;
                    maxFeePerGas?: undefined;
                    maxPriorityFeePerGas?: undefined;
                } & {
                    accessList: import("viem").AccessList | undefined;
                } ? "eip2930" : never) | (request extends ({
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: undefined;
                    blobs?: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
                    blobVersionedHashes?: readonly `0x${string}`[] | undefined;
                    maxFeePerBlobGas?: bigint | undefined;
                    maxFeePerGas?: bigint | undefined;
                    maxPriorityFeePerGas?: bigint | undefined;
                    sidecars?: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
                } | {
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: undefined;
                    blobs?: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
                    blobVersionedHashes?: readonly `0x${string}`[] | undefined;
                    maxFeePerBlobGas?: bigint | undefined;
                    maxFeePerGas?: bigint | undefined;
                    maxPriorityFeePerGas?: bigint | undefined;
                    sidecars?: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
                }) & (import("viem").ExactPartial<import("viem").FeeValuesEIP4844> & import("viem").OneOf<{
                    blobs: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
                } | {
                    blobVersionedHashes: readonly `0x${string}`[] | undefined;
                } | {
                    sidecars: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
                }, import("viem").TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: import("viem").SignedAuthorizationList | undefined;
                    blobs?: undefined;
                    blobVersionedHashes?: undefined;
                    gasPrice?: undefined;
                    maxFeePerBlobGas?: undefined;
                    maxFeePerGas?: bigint | undefined;
                    maxPriorityFeePerGas?: bigint | undefined;
                    sidecars?: undefined;
                } | {
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: import("viem").SignedAuthorizationList | undefined;
                    blobs?: undefined;
                    blobVersionedHashes?: undefined;
                    gasPrice?: undefined;
                    maxFeePerBlobGas?: undefined;
                    maxFeePerGas?: bigint | undefined;
                    maxPriorityFeePerGas?: bigint | undefined;
                    sidecars?: undefined;
                }) & {
                    authorizationList: import("viem").SignedAuthorizationList;
                } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)>) extends infer T_48 ? T_48 extends (request["type"] extends string | undefined ? request["type"] : import("viem").GetTransactionType<request, (request extends {
                    accessList?: undefined;
                    authorizationList?: undefined;
                    blobs?: undefined;
                    blobVersionedHashes?: undefined;
                    gasPrice?: bigint | undefined;
                    sidecars?: undefined;
                } & import("viem").FeeValuesLegacy ? "legacy" : never) | (request extends {
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: undefined;
                    blobs?: undefined;
                    blobVersionedHashes?: undefined;
                    gasPrice?: undefined;
                    maxFeePerBlobGas?: undefined;
                    maxFeePerGas?: bigint | undefined;
                    maxPriorityFeePerGas?: bigint | undefined;
                    sidecars?: undefined;
                } & (import("viem").OneOf<{
                    maxFeePerGas: bigint;
                } | {
                    maxPriorityFeePerGas: bigint;
                }, import("viem").FeeValuesEIP1559> & {
                    accessList?: import("viem").AccessList | undefined;
                }) ? "eip1559" : never) | (request extends {
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: undefined;
                    blobs?: undefined;
                    blobVersionedHashes?: undefined;
                    gasPrice?: bigint | undefined;
                    sidecars?: undefined;
                    maxFeePerBlobGas?: undefined;
                    maxFeePerGas?: undefined;
                    maxPriorityFeePerGas?: undefined;
                } & {
                    accessList: import("viem").AccessList | undefined;
                } ? "eip2930" : never) | (request extends ({
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: undefined;
                    blobs?: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
                    blobVersionedHashes?: readonly `0x${string}`[] | undefined;
                    maxFeePerBlobGas?: bigint | undefined;
                    maxFeePerGas?: bigint | undefined;
                    maxPriorityFeePerGas?: bigint | undefined;
                    sidecars?: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
                } | {
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: undefined;
                    blobs?: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
                    blobVersionedHashes?: readonly `0x${string}`[] | undefined;
                    maxFeePerBlobGas?: bigint | undefined;
                    maxFeePerGas?: bigint | undefined;
                    maxPriorityFeePerGas?: bigint | undefined;
                    sidecars?: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
                }) & (import("viem").ExactPartial<import("viem").FeeValuesEIP4844> & import("viem").OneOf<{
                    blobs: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
                } | {
                    blobVersionedHashes: readonly `0x${string}`[] | undefined;
                } | {
                    sidecars: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
                }, import("viem").TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: import("viem").SignedAuthorizationList | undefined;
                    blobs?: undefined;
                    blobVersionedHashes?: undefined;
                    gasPrice?: undefined;
                    maxFeePerBlobGas?: undefined;
                    maxFeePerGas?: bigint | undefined;
                    maxPriorityFeePerGas?: bigint | undefined;
                    sidecars?: undefined;
                } | {
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: import("viem").SignedAuthorizationList | undefined;
                    blobs?: undefined;
                    blobVersionedHashes?: undefined;
                    gasPrice?: undefined;
                    maxFeePerBlobGas?: undefined;
                    maxFeePerGas?: bigint | undefined;
                    maxPriorityFeePerGas?: bigint | undefined;
                    sidecars?: undefined;
                }) & {
                    authorizationList: import("viem").SignedAuthorizationList;
                } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)> extends "legacy" ? unknown : import("viem").GetTransactionType<request, (request extends {
                    accessList?: undefined;
                    authorizationList?: undefined;
                    blobs?: undefined;
                    blobVersionedHashes?: undefined;
                    gasPrice?: bigint | undefined;
                    sidecars?: undefined;
                } & import("viem").FeeValuesLegacy ? "legacy" : never) | (request extends {
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: undefined;
                    blobs?: undefined;
                    blobVersionedHashes?: undefined;
                    gasPrice?: undefined;
                    maxFeePerBlobGas?: undefined;
                    maxFeePerGas?: bigint | undefined;
                    maxPriorityFeePerGas?: bigint | undefined;
                    sidecars?: undefined;
                } & (import("viem").OneOf<{
                    maxFeePerGas: bigint;
                } | {
                    maxPriorityFeePerGas: bigint;
                }, import("viem").FeeValuesEIP1559> & {
                    accessList?: import("viem").AccessList | undefined;
                }) ? "eip1559" : never) | (request extends {
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: undefined;
                    blobs?: undefined;
                    blobVersionedHashes?: undefined;
                    gasPrice?: bigint | undefined;
                    sidecars?: undefined;
                    maxFeePerBlobGas?: undefined;
                    maxFeePerGas?: undefined;
                    maxPriorityFeePerGas?: undefined;
                } & {
                    accessList: import("viem").AccessList | undefined;
                } ? "eip2930" : never) | (request extends ({
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: undefined;
                    blobs?: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
                    blobVersionedHashes?: readonly `0x${string}`[] | undefined;
                    maxFeePerBlobGas?: bigint | undefined;
                    maxFeePerGas?: bigint | undefined;
                    maxPriorityFeePerGas?: bigint | undefined;
                    sidecars?: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
                } | {
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: undefined;
                    blobs?: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
                    blobVersionedHashes?: readonly `0x${string}`[] | undefined;
                    maxFeePerBlobGas?: bigint | undefined;
                    maxFeePerGas?: bigint | undefined;
                    maxPriorityFeePerGas?: bigint | undefined;
                    sidecars?: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
                }) & (import("viem").ExactPartial<import("viem").FeeValuesEIP4844> & import("viem").OneOf<{
                    blobs: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
                } | {
                    blobVersionedHashes: readonly `0x${string}`[] | undefined;
                } | {
                    sidecars: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
                }, import("viem").TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: import("viem").SignedAuthorizationList | undefined;
                    blobs?: undefined;
                    blobVersionedHashes?: undefined;
                    gasPrice?: undefined;
                    maxFeePerBlobGas?: undefined;
                    maxFeePerGas?: bigint | undefined;
                    maxPriorityFeePerGas?: bigint | undefined;
                    sidecars?: undefined;
                } | {
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: import("viem").SignedAuthorizationList | undefined;
                    blobs?: undefined;
                    blobVersionedHashes?: undefined;
                    gasPrice?: undefined;
                    maxFeePerBlobGas?: undefined;
                    maxFeePerGas?: bigint | undefined;
                    maxPriorityFeePerGas?: bigint | undefined;
                    sidecars?: undefined;
                }) & {
                    authorizationList: import("viem").SignedAuthorizationList;
                } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)>) ? T_48 extends "eip1559" ? import("viem").TransactionRequestEIP1559 : never : never : never) | ((request["type"] extends string | undefined ? request["type"] : import("viem").GetTransactionType<request, (request extends {
                    accessList?: undefined;
                    authorizationList?: undefined;
                    blobs?: undefined;
                    blobVersionedHashes?: undefined;
                    gasPrice?: bigint | undefined;
                    sidecars?: undefined;
                } & import("viem").FeeValuesLegacy ? "legacy" : never) | (request extends {
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: undefined;
                    blobs?: undefined;
                    blobVersionedHashes?: undefined;
                    gasPrice?: undefined;
                    maxFeePerBlobGas?: undefined;
                    maxFeePerGas?: bigint | undefined;
                    maxPriorityFeePerGas?: bigint | undefined;
                    sidecars?: undefined;
                } & (import("viem").OneOf<{
                    maxFeePerGas: bigint;
                } | {
                    maxPriorityFeePerGas: bigint;
                }, import("viem").FeeValuesEIP1559> & {
                    accessList?: import("viem").AccessList | undefined;
                }) ? "eip1559" : never) | (request extends {
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: undefined;
                    blobs?: undefined;
                    blobVersionedHashes?: undefined;
                    gasPrice?: bigint | undefined;
                    sidecars?: undefined;
                    maxFeePerBlobGas?: undefined;
                    maxFeePerGas?: undefined;
                    maxPriorityFeePerGas?: undefined;
                } & {
                    accessList: import("viem").AccessList | undefined;
                } ? "eip2930" : never) | (request extends ({
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: undefined;
                    blobs?: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
                    blobVersionedHashes?: readonly `0x${string}`[] | undefined;
                    maxFeePerBlobGas?: bigint | undefined;
                    maxFeePerGas?: bigint | undefined;
                    maxPriorityFeePerGas?: bigint | undefined;
                    sidecars?: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
                } | {
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: undefined;
                    blobs?: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
                    blobVersionedHashes?: readonly `0x${string}`[] | undefined;
                    maxFeePerBlobGas?: bigint | undefined;
                    maxFeePerGas?: bigint | undefined;
                    maxPriorityFeePerGas?: bigint | undefined;
                    sidecars?: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
                }) & (import("viem").ExactPartial<import("viem").FeeValuesEIP4844> & import("viem").OneOf<{
                    blobs: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
                } | {
                    blobVersionedHashes: readonly `0x${string}`[] | undefined;
                } | {
                    sidecars: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
                }, import("viem").TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: import("viem").SignedAuthorizationList | undefined;
                    blobs?: undefined;
                    blobVersionedHashes?: undefined;
                    gasPrice?: undefined;
                    maxFeePerBlobGas?: undefined;
                    maxFeePerGas?: bigint | undefined;
                    maxPriorityFeePerGas?: bigint | undefined;
                    sidecars?: undefined;
                } | {
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: import("viem").SignedAuthorizationList | undefined;
                    blobs?: undefined;
                    blobVersionedHashes?: undefined;
                    gasPrice?: undefined;
                    maxFeePerBlobGas?: undefined;
                    maxFeePerGas?: bigint | undefined;
                    maxPriorityFeePerGas?: bigint | undefined;
                    sidecars?: undefined;
                }) & {
                    authorizationList: import("viem").SignedAuthorizationList;
                } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)> extends "legacy" ? unknown : import("viem").GetTransactionType<request, (request extends {
                    accessList?: undefined;
                    authorizationList?: undefined;
                    blobs?: undefined;
                    blobVersionedHashes?: undefined;
                    gasPrice?: bigint | undefined;
                    sidecars?: undefined;
                } & import("viem").FeeValuesLegacy ? "legacy" : never) | (request extends {
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: undefined;
                    blobs?: undefined;
                    blobVersionedHashes?: undefined;
                    gasPrice?: undefined;
                    maxFeePerBlobGas?: undefined;
                    maxFeePerGas?: bigint | undefined;
                    maxPriorityFeePerGas?: bigint | undefined;
                    sidecars?: undefined;
                } & (import("viem").OneOf<{
                    maxFeePerGas: bigint;
                } | {
                    maxPriorityFeePerGas: bigint;
                }, import("viem").FeeValuesEIP1559> & {
                    accessList?: import("viem").AccessList | undefined;
                }) ? "eip1559" : never) | (request extends {
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: undefined;
                    blobs?: undefined;
                    blobVersionedHashes?: undefined;
                    gasPrice?: bigint | undefined;
                    sidecars?: undefined;
                    maxFeePerBlobGas?: undefined;
                    maxFeePerGas?: undefined;
                    maxPriorityFeePerGas?: undefined;
                } & {
                    accessList: import("viem").AccessList | undefined;
                } ? "eip2930" : never) | (request extends ({
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: undefined;
                    blobs?: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
                    blobVersionedHashes?: readonly `0x${string}`[] | undefined;
                    maxFeePerBlobGas?: bigint | undefined;
                    maxFeePerGas?: bigint | undefined;
                    maxPriorityFeePerGas?: bigint | undefined;
                    sidecars?: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
                } | {
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: undefined;
                    blobs?: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
                    blobVersionedHashes?: readonly `0x${string}`[] | undefined;
                    maxFeePerBlobGas?: bigint | undefined;
                    maxFeePerGas?: bigint | undefined;
                    maxPriorityFeePerGas?: bigint | undefined;
                    sidecars?: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
                }) & (import("viem").ExactPartial<import("viem").FeeValuesEIP4844> & import("viem").OneOf<{
                    blobs: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
                } | {
                    blobVersionedHashes: readonly `0x${string}`[] | undefined;
                } | {
                    sidecars: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
                }, import("viem").TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: import("viem").SignedAuthorizationList | undefined;
                    blobs?: undefined;
                    blobVersionedHashes?: undefined;
                    gasPrice?: undefined;
                    maxFeePerBlobGas?: undefined;
                    maxFeePerGas?: bigint | undefined;
                    maxPriorityFeePerGas?: bigint | undefined;
                    sidecars?: undefined;
                } | {
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: import("viem").SignedAuthorizationList | undefined;
                    blobs?: undefined;
                    blobVersionedHashes?: undefined;
                    gasPrice?: undefined;
                    maxFeePerBlobGas?: undefined;
                    maxFeePerGas?: bigint | undefined;
                    maxPriorityFeePerGas?: bigint | undefined;
                    sidecars?: undefined;
                }) & {
                    authorizationList: import("viem").SignedAuthorizationList;
                } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)>) extends infer T_49 ? T_49 extends (request["type"] extends string | undefined ? request["type"] : import("viem").GetTransactionType<request, (request extends {
                    accessList?: undefined;
                    authorizationList?: undefined;
                    blobs?: undefined;
                    blobVersionedHashes?: undefined;
                    gasPrice?: bigint | undefined;
                    sidecars?: undefined;
                } & import("viem").FeeValuesLegacy ? "legacy" : never) | (request extends {
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: undefined;
                    blobs?: undefined;
                    blobVersionedHashes?: undefined;
                    gasPrice?: undefined;
                    maxFeePerBlobGas?: undefined;
                    maxFeePerGas?: bigint | undefined;
                    maxPriorityFeePerGas?: bigint | undefined;
                    sidecars?: undefined;
                } & (import("viem").OneOf<{
                    maxFeePerGas: bigint;
                } | {
                    maxPriorityFeePerGas: bigint;
                }, import("viem").FeeValuesEIP1559> & {
                    accessList?: import("viem").AccessList | undefined;
                }) ? "eip1559" : never) | (request extends {
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: undefined;
                    blobs?: undefined;
                    blobVersionedHashes?: undefined;
                    gasPrice?: bigint | undefined;
                    sidecars?: undefined;
                    maxFeePerBlobGas?: undefined;
                    maxFeePerGas?: undefined;
                    maxPriorityFeePerGas?: undefined;
                } & {
                    accessList: import("viem").AccessList | undefined;
                } ? "eip2930" : never) | (request extends ({
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: undefined;
                    blobs?: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
                    blobVersionedHashes?: readonly `0x${string}`[] | undefined;
                    maxFeePerBlobGas?: bigint | undefined;
                    maxFeePerGas?: bigint | undefined;
                    maxPriorityFeePerGas?: bigint | undefined;
                    sidecars?: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
                } | {
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: undefined;
                    blobs?: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
                    blobVersionedHashes?: readonly `0x${string}`[] | undefined;
                    maxFeePerBlobGas?: bigint | undefined;
                    maxFeePerGas?: bigint | undefined;
                    maxPriorityFeePerGas?: bigint | undefined;
                    sidecars?: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
                }) & (import("viem").ExactPartial<import("viem").FeeValuesEIP4844> & import("viem").OneOf<{
                    blobs: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
                } | {
                    blobVersionedHashes: readonly `0x${string}`[] | undefined;
                } | {
                    sidecars: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
                }, import("viem").TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: import("viem").SignedAuthorizationList | undefined;
                    blobs?: undefined;
                    blobVersionedHashes?: undefined;
                    gasPrice?: undefined;
                    maxFeePerBlobGas?: undefined;
                    maxFeePerGas?: bigint | undefined;
                    maxPriorityFeePerGas?: bigint | undefined;
                    sidecars?: undefined;
                } | {
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: import("viem").SignedAuthorizationList | undefined;
                    blobs?: undefined;
                    blobVersionedHashes?: undefined;
                    gasPrice?: undefined;
                    maxFeePerBlobGas?: undefined;
                    maxFeePerGas?: bigint | undefined;
                    maxPriorityFeePerGas?: bigint | undefined;
                    sidecars?: undefined;
                }) & {
                    authorizationList: import("viem").SignedAuthorizationList;
                } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)> extends "legacy" ? unknown : import("viem").GetTransactionType<request, (request extends {
                    accessList?: undefined;
                    authorizationList?: undefined;
                    blobs?: undefined;
                    blobVersionedHashes?: undefined;
                    gasPrice?: bigint | undefined;
                    sidecars?: undefined;
                } & import("viem").FeeValuesLegacy ? "legacy" : never) | (request extends {
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: undefined;
                    blobs?: undefined;
                    blobVersionedHashes?: undefined;
                    gasPrice?: undefined;
                    maxFeePerBlobGas?: undefined;
                    maxFeePerGas?: bigint | undefined;
                    maxPriorityFeePerGas?: bigint | undefined;
                    sidecars?: undefined;
                } & (import("viem").OneOf<{
                    maxFeePerGas: bigint;
                } | {
                    maxPriorityFeePerGas: bigint;
                }, import("viem").FeeValuesEIP1559> & {
                    accessList?: import("viem").AccessList | undefined;
                }) ? "eip1559" : never) | (request extends {
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: undefined;
                    blobs?: undefined;
                    blobVersionedHashes?: undefined;
                    gasPrice?: bigint | undefined;
                    sidecars?: undefined;
                    maxFeePerBlobGas?: undefined;
                    maxFeePerGas?: undefined;
                    maxPriorityFeePerGas?: undefined;
                } & {
                    accessList: import("viem").AccessList | undefined;
                } ? "eip2930" : never) | (request extends ({
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: undefined;
                    blobs?: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
                    blobVersionedHashes?: readonly `0x${string}`[] | undefined;
                    maxFeePerBlobGas?: bigint | undefined;
                    maxFeePerGas?: bigint | undefined;
                    maxPriorityFeePerGas?: bigint | undefined;
                    sidecars?: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
                } | {
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: undefined;
                    blobs?: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
                    blobVersionedHashes?: readonly `0x${string}`[] | undefined;
                    maxFeePerBlobGas?: bigint | undefined;
                    maxFeePerGas?: bigint | undefined;
                    maxPriorityFeePerGas?: bigint | undefined;
                    sidecars?: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
                }) & (import("viem").ExactPartial<import("viem").FeeValuesEIP4844> & import("viem").OneOf<{
                    blobs: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
                } | {
                    blobVersionedHashes: readonly `0x${string}`[] | undefined;
                } | {
                    sidecars: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
                }, import("viem").TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: import("viem").SignedAuthorizationList | undefined;
                    blobs?: undefined;
                    blobVersionedHashes?: undefined;
                    gasPrice?: undefined;
                    maxFeePerBlobGas?: undefined;
                    maxFeePerGas?: bigint | undefined;
                    maxPriorityFeePerGas?: bigint | undefined;
                    sidecars?: undefined;
                } | {
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: import("viem").SignedAuthorizationList | undefined;
                    blobs?: undefined;
                    blobVersionedHashes?: undefined;
                    gasPrice?: undefined;
                    maxFeePerBlobGas?: undefined;
                    maxFeePerGas?: bigint | undefined;
                    maxPriorityFeePerGas?: bigint | undefined;
                    sidecars?: undefined;
                }) & {
                    authorizationList: import("viem").SignedAuthorizationList;
                } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)>) ? T_49 extends "eip2930" ? import("viem").TransactionRequestEIP2930 : never : never : never) | ((request["type"] extends string | undefined ? request["type"] : import("viem").GetTransactionType<request, (request extends {
                    accessList?: undefined;
                    authorizationList?: undefined;
                    blobs?: undefined;
                    blobVersionedHashes?: undefined;
                    gasPrice?: bigint | undefined;
                    sidecars?: undefined;
                } & import("viem").FeeValuesLegacy ? "legacy" : never) | (request extends {
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: undefined;
                    blobs?: undefined;
                    blobVersionedHashes?: undefined;
                    gasPrice?: undefined;
                    maxFeePerBlobGas?: undefined;
                    maxFeePerGas?: bigint | undefined;
                    maxPriorityFeePerGas?: bigint | undefined;
                    sidecars?: undefined;
                } & (import("viem").OneOf<{
                    maxFeePerGas: bigint;
                } | {
                    maxPriorityFeePerGas: bigint;
                }, import("viem").FeeValuesEIP1559> & {
                    accessList?: import("viem").AccessList | undefined;
                }) ? "eip1559" : never) | (request extends {
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: undefined;
                    blobs?: undefined;
                    blobVersionedHashes?: undefined;
                    gasPrice?: bigint | undefined;
                    sidecars?: undefined;
                    maxFeePerBlobGas?: undefined;
                    maxFeePerGas?: undefined;
                    maxPriorityFeePerGas?: undefined;
                } & {
                    accessList: import("viem").AccessList | undefined;
                } ? "eip2930" : never) | (request extends ({
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: undefined;
                    blobs?: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
                    blobVersionedHashes?: readonly `0x${string}`[] | undefined;
                    maxFeePerBlobGas?: bigint | undefined;
                    maxFeePerGas?: bigint | undefined;
                    maxPriorityFeePerGas?: bigint | undefined;
                    sidecars?: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
                } | {
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: undefined;
                    blobs?: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
                    blobVersionedHashes?: readonly `0x${string}`[] | undefined;
                    maxFeePerBlobGas?: bigint | undefined;
                    maxFeePerGas?: bigint | undefined;
                    maxPriorityFeePerGas?: bigint | undefined;
                    sidecars?: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
                }) & (import("viem").ExactPartial<import("viem").FeeValuesEIP4844> & import("viem").OneOf<{
                    blobs: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
                } | {
                    blobVersionedHashes: readonly `0x${string}`[] | undefined;
                } | {
                    sidecars: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
                }, import("viem").TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: import("viem").SignedAuthorizationList | undefined;
                    blobs?: undefined;
                    blobVersionedHashes?: undefined;
                    gasPrice?: undefined;
                    maxFeePerBlobGas?: undefined;
                    maxFeePerGas?: bigint | undefined;
                    maxPriorityFeePerGas?: bigint | undefined;
                    sidecars?: undefined;
                } | {
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: import("viem").SignedAuthorizationList | undefined;
                    blobs?: undefined;
                    blobVersionedHashes?: undefined;
                    gasPrice?: undefined;
                    maxFeePerBlobGas?: undefined;
                    maxFeePerGas?: bigint | undefined;
                    maxPriorityFeePerGas?: bigint | undefined;
                    sidecars?: undefined;
                }) & {
                    authorizationList: import("viem").SignedAuthorizationList;
                } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)> extends "legacy" ? unknown : import("viem").GetTransactionType<request, (request extends {
                    accessList?: undefined;
                    authorizationList?: undefined;
                    blobs?: undefined;
                    blobVersionedHashes?: undefined;
                    gasPrice?: bigint | undefined;
                    sidecars?: undefined;
                } & import("viem").FeeValuesLegacy ? "legacy" : never) | (request extends {
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: undefined;
                    blobs?: undefined;
                    blobVersionedHashes?: undefined;
                    gasPrice?: undefined;
                    maxFeePerBlobGas?: undefined;
                    maxFeePerGas?: bigint | undefined;
                    maxPriorityFeePerGas?: bigint | undefined;
                    sidecars?: undefined;
                } & (import("viem").OneOf<{
                    maxFeePerGas: bigint;
                } | {
                    maxPriorityFeePerGas: bigint;
                }, import("viem").FeeValuesEIP1559> & {
                    accessList?: import("viem").AccessList | undefined;
                }) ? "eip1559" : never) | (request extends {
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: undefined;
                    blobs?: undefined;
                    blobVersionedHashes?: undefined;
                    gasPrice?: bigint | undefined;
                    sidecars?: undefined;
                    maxFeePerBlobGas?: undefined;
                    maxFeePerGas?: undefined;
                    maxPriorityFeePerGas?: undefined;
                } & {
                    accessList: import("viem").AccessList | undefined;
                } ? "eip2930" : never) | (request extends ({
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: undefined;
                    blobs?: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
                    blobVersionedHashes?: readonly `0x${string}`[] | undefined;
                    maxFeePerBlobGas?: bigint | undefined;
                    maxFeePerGas?: bigint | undefined;
                    maxPriorityFeePerGas?: bigint | undefined;
                    sidecars?: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
                } | {
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: undefined;
                    blobs?: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
                    blobVersionedHashes?: readonly `0x${string}`[] | undefined;
                    maxFeePerBlobGas?: bigint | undefined;
                    maxFeePerGas?: bigint | undefined;
                    maxPriorityFeePerGas?: bigint | undefined;
                    sidecars?: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
                }) & (import("viem").ExactPartial<import("viem").FeeValuesEIP4844> & import("viem").OneOf<{
                    blobs: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
                } | {
                    blobVersionedHashes: readonly `0x${string}`[] | undefined;
                } | {
                    sidecars: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
                }, import("viem").TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: import("viem").SignedAuthorizationList | undefined;
                    blobs?: undefined;
                    blobVersionedHashes?: undefined;
                    gasPrice?: undefined;
                    maxFeePerBlobGas?: undefined;
                    maxFeePerGas?: bigint | undefined;
                    maxPriorityFeePerGas?: bigint | undefined;
                    sidecars?: undefined;
                } | {
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: import("viem").SignedAuthorizationList | undefined;
                    blobs?: undefined;
                    blobVersionedHashes?: undefined;
                    gasPrice?: undefined;
                    maxFeePerBlobGas?: undefined;
                    maxFeePerGas?: bigint | undefined;
                    maxPriorityFeePerGas?: bigint | undefined;
                    sidecars?: undefined;
                }) & {
                    authorizationList: import("viem").SignedAuthorizationList;
                } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)>) extends infer T_50 ? T_50 extends (request["type"] extends string | undefined ? request["type"] : import("viem").GetTransactionType<request, (request extends {
                    accessList?: undefined;
                    authorizationList?: undefined;
                    blobs?: undefined;
                    blobVersionedHashes?: undefined;
                    gasPrice?: bigint | undefined;
                    sidecars?: undefined;
                } & import("viem").FeeValuesLegacy ? "legacy" : never) | (request extends {
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: undefined;
                    blobs?: undefined;
                    blobVersionedHashes?: undefined;
                    gasPrice?: undefined;
                    maxFeePerBlobGas?: undefined;
                    maxFeePerGas?: bigint | undefined;
                    maxPriorityFeePerGas?: bigint | undefined;
                    sidecars?: undefined;
                } & (import("viem").OneOf<{
                    maxFeePerGas: bigint;
                } | {
                    maxPriorityFeePerGas: bigint;
                }, import("viem").FeeValuesEIP1559> & {
                    accessList?: import("viem").AccessList | undefined;
                }) ? "eip1559" : never) | (request extends {
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: undefined;
                    blobs?: undefined;
                    blobVersionedHashes?: undefined;
                    gasPrice?: bigint | undefined;
                    sidecars?: undefined;
                    maxFeePerBlobGas?: undefined;
                    maxFeePerGas?: undefined;
                    maxPriorityFeePerGas?: undefined;
                } & {
                    accessList: import("viem").AccessList | undefined;
                } ? "eip2930" : never) | (request extends ({
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: undefined;
                    blobs?: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
                    blobVersionedHashes?: readonly `0x${string}`[] | undefined;
                    maxFeePerBlobGas?: bigint | undefined;
                    maxFeePerGas?: bigint | undefined;
                    maxPriorityFeePerGas?: bigint | undefined;
                    sidecars?: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
                } | {
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: undefined;
                    blobs?: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
                    blobVersionedHashes?: readonly `0x${string}`[] | undefined;
                    maxFeePerBlobGas?: bigint | undefined;
                    maxFeePerGas?: bigint | undefined;
                    maxPriorityFeePerGas?: bigint | undefined;
                    sidecars?: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
                }) & (import("viem").ExactPartial<import("viem").FeeValuesEIP4844> & import("viem").OneOf<{
                    blobs: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
                } | {
                    blobVersionedHashes: readonly `0x${string}`[] | undefined;
                } | {
                    sidecars: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
                }, import("viem").TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: import("viem").SignedAuthorizationList | undefined;
                    blobs?: undefined;
                    blobVersionedHashes?: undefined;
                    gasPrice?: undefined;
                    maxFeePerBlobGas?: undefined;
                    maxFeePerGas?: bigint | undefined;
                    maxPriorityFeePerGas?: bigint | undefined;
                    sidecars?: undefined;
                } | {
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: import("viem").SignedAuthorizationList | undefined;
                    blobs?: undefined;
                    blobVersionedHashes?: undefined;
                    gasPrice?: undefined;
                    maxFeePerBlobGas?: undefined;
                    maxFeePerGas?: bigint | undefined;
                    maxPriorityFeePerGas?: bigint | undefined;
                    sidecars?: undefined;
                }) & {
                    authorizationList: import("viem").SignedAuthorizationList;
                } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)> extends "legacy" ? unknown : import("viem").GetTransactionType<request, (request extends {
                    accessList?: undefined;
                    authorizationList?: undefined;
                    blobs?: undefined;
                    blobVersionedHashes?: undefined;
                    gasPrice?: bigint | undefined;
                    sidecars?: undefined;
                } & import("viem").FeeValuesLegacy ? "legacy" : never) | (request extends {
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: undefined;
                    blobs?: undefined;
                    blobVersionedHashes?: undefined;
                    gasPrice?: undefined;
                    maxFeePerBlobGas?: undefined;
                    maxFeePerGas?: bigint | undefined;
                    maxPriorityFeePerGas?: bigint | undefined;
                    sidecars?: undefined;
                } & (import("viem").OneOf<{
                    maxFeePerGas: bigint;
                } | {
                    maxPriorityFeePerGas: bigint;
                }, import("viem").FeeValuesEIP1559> & {
                    accessList?: import("viem").AccessList | undefined;
                }) ? "eip1559" : never) | (request extends {
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: undefined;
                    blobs?: undefined;
                    blobVersionedHashes?: undefined;
                    gasPrice?: bigint | undefined;
                    sidecars?: undefined;
                    maxFeePerBlobGas?: undefined;
                    maxFeePerGas?: undefined;
                    maxPriorityFeePerGas?: undefined;
                } & {
                    accessList: import("viem").AccessList | undefined;
                } ? "eip2930" : never) | (request extends ({
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: undefined;
                    blobs?: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
                    blobVersionedHashes?: readonly `0x${string}`[] | undefined;
                    maxFeePerBlobGas?: bigint | undefined;
                    maxFeePerGas?: bigint | undefined;
                    maxPriorityFeePerGas?: bigint | undefined;
                    sidecars?: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
                } | {
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: undefined;
                    blobs?: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
                    blobVersionedHashes?: readonly `0x${string}`[] | undefined;
                    maxFeePerBlobGas?: bigint | undefined;
                    maxFeePerGas?: bigint | undefined;
                    maxPriorityFeePerGas?: bigint | undefined;
                    sidecars?: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
                }) & (import("viem").ExactPartial<import("viem").FeeValuesEIP4844> & import("viem").OneOf<{
                    blobs: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
                } | {
                    blobVersionedHashes: readonly `0x${string}`[] | undefined;
                } | {
                    sidecars: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
                }, import("viem").TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: import("viem").SignedAuthorizationList | undefined;
                    blobs?: undefined;
                    blobVersionedHashes?: undefined;
                    gasPrice?: undefined;
                    maxFeePerBlobGas?: undefined;
                    maxFeePerGas?: bigint | undefined;
                    maxPriorityFeePerGas?: bigint | undefined;
                    sidecars?: undefined;
                } | {
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: import("viem").SignedAuthorizationList | undefined;
                    blobs?: undefined;
                    blobVersionedHashes?: undefined;
                    gasPrice?: undefined;
                    maxFeePerBlobGas?: undefined;
                    maxFeePerGas?: bigint | undefined;
                    maxPriorityFeePerGas?: bigint | undefined;
                    sidecars?: undefined;
                }) & {
                    authorizationList: import("viem").SignedAuthorizationList;
                } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)>) ? T_50 extends "eip4844" ? import("viem").TransactionRequestEIP4844 : never : never : never) | ((request["type"] extends string | undefined ? request["type"] : import("viem").GetTransactionType<request, (request extends {
                    accessList?: undefined;
                    authorizationList?: undefined;
                    blobs?: undefined;
                    blobVersionedHashes?: undefined;
                    gasPrice?: bigint | undefined;
                    sidecars?: undefined;
                } & import("viem").FeeValuesLegacy ? "legacy" : never) | (request extends {
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: undefined;
                    blobs?: undefined;
                    blobVersionedHashes?: undefined;
                    gasPrice?: undefined;
                    maxFeePerBlobGas?: undefined;
                    maxFeePerGas?: bigint | undefined;
                    maxPriorityFeePerGas?: bigint | undefined;
                    sidecars?: undefined;
                } & (import("viem").OneOf<{
                    maxFeePerGas: bigint;
                } | {
                    maxPriorityFeePerGas: bigint;
                }, import("viem").FeeValuesEIP1559> & {
                    accessList?: import("viem").AccessList | undefined;
                }) ? "eip1559" : never) | (request extends {
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: undefined;
                    blobs?: undefined;
                    blobVersionedHashes?: undefined;
                    gasPrice?: bigint | undefined;
                    sidecars?: undefined;
                    maxFeePerBlobGas?: undefined;
                    maxFeePerGas?: undefined;
                    maxPriorityFeePerGas?: undefined;
                } & {
                    accessList: import("viem").AccessList | undefined;
                } ? "eip2930" : never) | (request extends ({
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: undefined;
                    blobs?: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
                    blobVersionedHashes?: readonly `0x${string}`[] | undefined;
                    maxFeePerBlobGas?: bigint | undefined;
                    maxFeePerGas?: bigint | undefined;
                    maxPriorityFeePerGas?: bigint | undefined;
                    sidecars?: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
                } | {
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: undefined;
                    blobs?: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
                    blobVersionedHashes?: readonly `0x${string}`[] | undefined;
                    maxFeePerBlobGas?: bigint | undefined;
                    maxFeePerGas?: bigint | undefined;
                    maxPriorityFeePerGas?: bigint | undefined;
                    sidecars?: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
                }) & (import("viem").ExactPartial<import("viem").FeeValuesEIP4844> & import("viem").OneOf<{
                    blobs: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
                } | {
                    blobVersionedHashes: readonly `0x${string}`[] | undefined;
                } | {
                    sidecars: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
                }, import("viem").TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: import("viem").SignedAuthorizationList | undefined;
                    blobs?: undefined;
                    blobVersionedHashes?: undefined;
                    gasPrice?: undefined;
                    maxFeePerBlobGas?: undefined;
                    maxFeePerGas?: bigint | undefined;
                    maxPriorityFeePerGas?: bigint | undefined;
                    sidecars?: undefined;
                } | {
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: import("viem").SignedAuthorizationList | undefined;
                    blobs?: undefined;
                    blobVersionedHashes?: undefined;
                    gasPrice?: undefined;
                    maxFeePerBlobGas?: undefined;
                    maxFeePerGas?: bigint | undefined;
                    maxPriorityFeePerGas?: bigint | undefined;
                    sidecars?: undefined;
                }) & {
                    authorizationList: import("viem").SignedAuthorizationList;
                } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)> extends "legacy" ? unknown : import("viem").GetTransactionType<request, (request extends {
                    accessList?: undefined;
                    authorizationList?: undefined;
                    blobs?: undefined;
                    blobVersionedHashes?: undefined;
                    gasPrice?: bigint | undefined;
                    sidecars?: undefined;
                } & import("viem").FeeValuesLegacy ? "legacy" : never) | (request extends {
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: undefined;
                    blobs?: undefined;
                    blobVersionedHashes?: undefined;
                    gasPrice?: undefined;
                    maxFeePerBlobGas?: undefined;
                    maxFeePerGas?: bigint | undefined;
                    maxPriorityFeePerGas?: bigint | undefined;
                    sidecars?: undefined;
                } & (import("viem").OneOf<{
                    maxFeePerGas: bigint;
                } | {
                    maxPriorityFeePerGas: bigint;
                }, import("viem").FeeValuesEIP1559> & {
                    accessList?: import("viem").AccessList | undefined;
                }) ? "eip1559" : never) | (request extends {
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: undefined;
                    blobs?: undefined;
                    blobVersionedHashes?: undefined;
                    gasPrice?: bigint | undefined;
                    sidecars?: undefined;
                    maxFeePerBlobGas?: undefined;
                    maxFeePerGas?: undefined;
                    maxPriorityFeePerGas?: undefined;
                } & {
                    accessList: import("viem").AccessList | undefined;
                } ? "eip2930" : never) | (request extends ({
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: undefined;
                    blobs?: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
                    blobVersionedHashes?: readonly `0x${string}`[] | undefined;
                    maxFeePerBlobGas?: bigint | undefined;
                    maxFeePerGas?: bigint | undefined;
                    maxPriorityFeePerGas?: bigint | undefined;
                    sidecars?: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
                } | {
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: undefined;
                    blobs?: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
                    blobVersionedHashes?: readonly `0x${string}`[] | undefined;
                    maxFeePerBlobGas?: bigint | undefined;
                    maxFeePerGas?: bigint | undefined;
                    maxPriorityFeePerGas?: bigint | undefined;
                    sidecars?: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
                }) & (import("viem").ExactPartial<import("viem").FeeValuesEIP4844> & import("viem").OneOf<{
                    blobs: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
                } | {
                    blobVersionedHashes: readonly `0x${string}`[] | undefined;
                } | {
                    sidecars: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
                }, import("viem").TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: import("viem").SignedAuthorizationList | undefined;
                    blobs?: undefined;
                    blobVersionedHashes?: undefined;
                    gasPrice?: undefined;
                    maxFeePerBlobGas?: undefined;
                    maxFeePerGas?: bigint | undefined;
                    maxPriorityFeePerGas?: bigint | undefined;
                    sidecars?: undefined;
                } | {
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: import("viem").SignedAuthorizationList | undefined;
                    blobs?: undefined;
                    blobVersionedHashes?: undefined;
                    gasPrice?: undefined;
                    maxFeePerBlobGas?: undefined;
                    maxFeePerGas?: bigint | undefined;
                    maxPriorityFeePerGas?: bigint | undefined;
                    sidecars?: undefined;
                }) & {
                    authorizationList: import("viem").SignedAuthorizationList;
                } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)>) extends infer T_51 ? T_51 extends (request["type"] extends string | undefined ? request["type"] : import("viem").GetTransactionType<request, (request extends {
                    accessList?: undefined;
                    authorizationList?: undefined;
                    blobs?: undefined;
                    blobVersionedHashes?: undefined;
                    gasPrice?: bigint | undefined;
                    sidecars?: undefined;
                } & import("viem").FeeValuesLegacy ? "legacy" : never) | (request extends {
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: undefined;
                    blobs?: undefined;
                    blobVersionedHashes?: undefined;
                    gasPrice?: undefined;
                    maxFeePerBlobGas?: undefined;
                    maxFeePerGas?: bigint | undefined;
                    maxPriorityFeePerGas?: bigint | undefined;
                    sidecars?: undefined;
                } & (import("viem").OneOf<{
                    maxFeePerGas: bigint;
                } | {
                    maxPriorityFeePerGas: bigint;
                }, import("viem").FeeValuesEIP1559> & {
                    accessList?: import("viem").AccessList | undefined;
                }) ? "eip1559" : never) | (request extends {
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: undefined;
                    blobs?: undefined;
                    blobVersionedHashes?: undefined;
                    gasPrice?: bigint | undefined;
                    sidecars?: undefined;
                    maxFeePerBlobGas?: undefined;
                    maxFeePerGas?: undefined;
                    maxPriorityFeePerGas?: undefined;
                } & {
                    accessList: import("viem").AccessList | undefined;
                } ? "eip2930" : never) | (request extends ({
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: undefined;
                    blobs?: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
                    blobVersionedHashes?: readonly `0x${string}`[] | undefined;
                    maxFeePerBlobGas?: bigint | undefined;
                    maxFeePerGas?: bigint | undefined;
                    maxPriorityFeePerGas?: bigint | undefined;
                    sidecars?: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
                } | {
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: undefined;
                    blobs?: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
                    blobVersionedHashes?: readonly `0x${string}`[] | undefined;
                    maxFeePerBlobGas?: bigint | undefined;
                    maxFeePerGas?: bigint | undefined;
                    maxPriorityFeePerGas?: bigint | undefined;
                    sidecars?: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
                }) & (import("viem").ExactPartial<import("viem").FeeValuesEIP4844> & import("viem").OneOf<{
                    blobs: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
                } | {
                    blobVersionedHashes: readonly `0x${string}`[] | undefined;
                } | {
                    sidecars: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
                }, import("viem").TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: import("viem").SignedAuthorizationList | undefined;
                    blobs?: undefined;
                    blobVersionedHashes?: undefined;
                    gasPrice?: undefined;
                    maxFeePerBlobGas?: undefined;
                    maxFeePerGas?: bigint | undefined;
                    maxPriorityFeePerGas?: bigint | undefined;
                    sidecars?: undefined;
                } | {
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: import("viem").SignedAuthorizationList | undefined;
                    blobs?: undefined;
                    blobVersionedHashes?: undefined;
                    gasPrice?: undefined;
                    maxFeePerBlobGas?: undefined;
                    maxFeePerGas?: bigint | undefined;
                    maxPriorityFeePerGas?: bigint | undefined;
                    sidecars?: undefined;
                }) & {
                    authorizationList: import("viem").SignedAuthorizationList;
                } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)> extends "legacy" ? unknown : import("viem").GetTransactionType<request, (request extends {
                    accessList?: undefined;
                    authorizationList?: undefined;
                    blobs?: undefined;
                    blobVersionedHashes?: undefined;
                    gasPrice?: bigint | undefined;
                    sidecars?: undefined;
                } & import("viem").FeeValuesLegacy ? "legacy" : never) | (request extends {
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: undefined;
                    blobs?: undefined;
                    blobVersionedHashes?: undefined;
                    gasPrice?: undefined;
                    maxFeePerBlobGas?: undefined;
                    maxFeePerGas?: bigint | undefined;
                    maxPriorityFeePerGas?: bigint | undefined;
                    sidecars?: undefined;
                } & (import("viem").OneOf<{
                    maxFeePerGas: bigint;
                } | {
                    maxPriorityFeePerGas: bigint;
                }, import("viem").FeeValuesEIP1559> & {
                    accessList?: import("viem").AccessList | undefined;
                }) ? "eip1559" : never) | (request extends {
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: undefined;
                    blobs?: undefined;
                    blobVersionedHashes?: undefined;
                    gasPrice?: bigint | undefined;
                    sidecars?: undefined;
                    maxFeePerBlobGas?: undefined;
                    maxFeePerGas?: undefined;
                    maxPriorityFeePerGas?: undefined;
                } & {
                    accessList: import("viem").AccessList | undefined;
                } ? "eip2930" : never) | (request extends ({
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: undefined;
                    blobs?: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
                    blobVersionedHashes?: readonly `0x${string}`[] | undefined;
                    maxFeePerBlobGas?: bigint | undefined;
                    maxFeePerGas?: bigint | undefined;
                    maxPriorityFeePerGas?: bigint | undefined;
                    sidecars?: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
                } | {
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: undefined;
                    blobs?: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
                    blobVersionedHashes?: readonly `0x${string}`[] | undefined;
                    maxFeePerBlobGas?: bigint | undefined;
                    maxFeePerGas?: bigint | undefined;
                    maxPriorityFeePerGas?: bigint | undefined;
                    sidecars?: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
                }) & (import("viem").ExactPartial<import("viem").FeeValuesEIP4844> & import("viem").OneOf<{
                    blobs: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
                } | {
                    blobVersionedHashes: readonly `0x${string}`[] | undefined;
                } | {
                    sidecars: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
                }, import("viem").TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: import("viem").SignedAuthorizationList | undefined;
                    blobs?: undefined;
                    blobVersionedHashes?: undefined;
                    gasPrice?: undefined;
                    maxFeePerBlobGas?: undefined;
                    maxFeePerGas?: bigint | undefined;
                    maxPriorityFeePerGas?: bigint | undefined;
                    sidecars?: undefined;
                } | {
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: import("viem").SignedAuthorizationList | undefined;
                    blobs?: undefined;
                    blobVersionedHashes?: undefined;
                    gasPrice?: undefined;
                    maxFeePerBlobGas?: undefined;
                    maxFeePerGas?: bigint | undefined;
                    maxPriorityFeePerGas?: bigint | undefined;
                    sidecars?: undefined;
                }) & {
                    authorizationList: import("viem").SignedAuthorizationList;
                } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)>) ? T_51 extends "eip7702" ? import("viem").TransactionRequestEIP7702 : never : never : never)> extends true ? unknown : import("viem").ExactPartial<((request["type"] extends string | undefined ? request["type"] : import("viem").GetTransactionType<request, (request extends {
                    accessList?: undefined;
                    authorizationList?: undefined;
                    blobs?: undefined;
                    blobVersionedHashes?: undefined;
                    gasPrice?: bigint | undefined;
                    sidecars?: undefined;
                } & import("viem").FeeValuesLegacy ? "legacy" : never) | (request extends {
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: undefined;
                    blobs?: undefined;
                    blobVersionedHashes?: undefined;
                    gasPrice?: undefined;
                    maxFeePerBlobGas?: undefined;
                    maxFeePerGas?: bigint | undefined;
                    maxPriorityFeePerGas?: bigint | undefined;
                    sidecars?: undefined;
                } & (import("viem").OneOf<{
                    maxFeePerGas: bigint;
                } | {
                    maxPriorityFeePerGas: bigint;
                }, import("viem").FeeValuesEIP1559> & {
                    accessList?: import("viem").AccessList | undefined;
                }) ? "eip1559" : never) | (request extends {
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: undefined;
                    blobs?: undefined;
                    blobVersionedHashes?: undefined;
                    gasPrice?: bigint | undefined;
                    sidecars?: undefined;
                    maxFeePerBlobGas?: undefined;
                    maxFeePerGas?: undefined;
                    maxPriorityFeePerGas?: undefined;
                } & {
                    accessList: import("viem").AccessList | undefined;
                } ? "eip2930" : never) | (request extends ({
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: undefined;
                    blobs?: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
                    blobVersionedHashes?: readonly `0x${string}`[] | undefined;
                    maxFeePerBlobGas?: bigint | undefined;
                    maxFeePerGas?: bigint | undefined;
                    maxPriorityFeePerGas?: bigint | undefined;
                    sidecars?: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
                } | {
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: undefined;
                    blobs?: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
                    blobVersionedHashes?: readonly `0x${string}`[] | undefined;
                    maxFeePerBlobGas?: bigint | undefined;
                    maxFeePerGas?: bigint | undefined;
                    maxPriorityFeePerGas?: bigint | undefined;
                    sidecars?: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
                }) & (import("viem").ExactPartial<import("viem").FeeValuesEIP4844> & import("viem").OneOf<{
                    blobs: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
                } | {
                    blobVersionedHashes: readonly `0x${string}`[] | undefined;
                } | {
                    sidecars: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
                }, import("viem").TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: import("viem").SignedAuthorizationList | undefined;
                    blobs?: undefined;
                    blobVersionedHashes?: undefined;
                    gasPrice?: undefined;
                    maxFeePerBlobGas?: undefined;
                    maxFeePerGas?: bigint | undefined;
                    maxPriorityFeePerGas?: bigint | undefined;
                    sidecars?: undefined;
                } | {
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: import("viem").SignedAuthorizationList | undefined;
                    blobs?: undefined;
                    blobVersionedHashes?: undefined;
                    gasPrice?: undefined;
                    maxFeePerBlobGas?: undefined;
                    maxFeePerGas?: bigint | undefined;
                    maxPriorityFeePerGas?: bigint | undefined;
                    sidecars?: undefined;
                }) & {
                    authorizationList: import("viem").SignedAuthorizationList;
                } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)> extends "legacy" ? unknown : import("viem").GetTransactionType<request, (request extends {
                    accessList?: undefined;
                    authorizationList?: undefined;
                    blobs?: undefined;
                    blobVersionedHashes?: undefined;
                    gasPrice?: bigint | undefined;
                    sidecars?: undefined;
                } & import("viem").FeeValuesLegacy ? "legacy" : never) | (request extends {
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: undefined;
                    blobs?: undefined;
                    blobVersionedHashes?: undefined;
                    gasPrice?: undefined;
                    maxFeePerBlobGas?: undefined;
                    maxFeePerGas?: bigint | undefined;
                    maxPriorityFeePerGas?: bigint | undefined;
                    sidecars?: undefined;
                } & (import("viem").OneOf<{
                    maxFeePerGas: bigint;
                } | {
                    maxPriorityFeePerGas: bigint;
                }, import("viem").FeeValuesEIP1559> & {
                    accessList?: import("viem").AccessList | undefined;
                }) ? "eip1559" : never) | (request extends {
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: undefined;
                    blobs?: undefined;
                    blobVersionedHashes?: undefined;
                    gasPrice?: bigint | undefined;
                    sidecars?: undefined;
                    maxFeePerBlobGas?: undefined;
                    maxFeePerGas?: undefined;
                    maxPriorityFeePerGas?: undefined;
                } & {
                    accessList: import("viem").AccessList | undefined;
                } ? "eip2930" : never) | (request extends ({
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: undefined;
                    blobs?: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
                    blobVersionedHashes?: readonly `0x${string}`[] | undefined;
                    maxFeePerBlobGas?: bigint | undefined;
                    maxFeePerGas?: bigint | undefined;
                    maxPriorityFeePerGas?: bigint | undefined;
                    sidecars?: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
                } | {
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: undefined;
                    blobs?: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
                    blobVersionedHashes?: readonly `0x${string}`[] | undefined;
                    maxFeePerBlobGas?: bigint | undefined;
                    maxFeePerGas?: bigint | undefined;
                    maxPriorityFeePerGas?: bigint | undefined;
                    sidecars?: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
                }) & (import("viem").ExactPartial<import("viem").FeeValuesEIP4844> & import("viem").OneOf<{
                    blobs: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
                } | {
                    blobVersionedHashes: readonly `0x${string}`[] | undefined;
                } | {
                    sidecars: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
                }, import("viem").TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: import("viem").SignedAuthorizationList | undefined;
                    blobs?: undefined;
                    blobVersionedHashes?: undefined;
                    gasPrice?: undefined;
                    maxFeePerBlobGas?: undefined;
                    maxFeePerGas?: bigint | undefined;
                    maxPriorityFeePerGas?: bigint | undefined;
                    sidecars?: undefined;
                } | {
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: import("viem").SignedAuthorizationList | undefined;
                    blobs?: undefined;
                    blobVersionedHashes?: undefined;
                    gasPrice?: undefined;
                    maxFeePerBlobGas?: undefined;
                    maxFeePerGas?: bigint | undefined;
                    maxPriorityFeePerGas?: bigint | undefined;
                    sidecars?: undefined;
                }) & {
                    authorizationList: import("viem").SignedAuthorizationList;
                } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)>) extends infer T_52 ? T_52 extends (request["type"] extends string | undefined ? request["type"] : import("viem").GetTransactionType<request, (request extends {
                    accessList?: undefined;
                    authorizationList?: undefined;
                    blobs?: undefined;
                    blobVersionedHashes?: undefined;
                    gasPrice?: bigint | undefined;
                    sidecars?: undefined;
                } & import("viem").FeeValuesLegacy ? "legacy" : never) | (request extends {
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: undefined;
                    blobs?: undefined;
                    blobVersionedHashes?: undefined;
                    gasPrice?: undefined;
                    maxFeePerBlobGas?: undefined;
                    maxFeePerGas?: bigint | undefined;
                    maxPriorityFeePerGas?: bigint | undefined;
                    sidecars?: undefined;
                } & (import("viem").OneOf<{
                    maxFeePerGas: bigint;
                } | {
                    maxPriorityFeePerGas: bigint;
                }, import("viem").FeeValuesEIP1559> & {
                    accessList?: import("viem").AccessList | undefined;
                }) ? "eip1559" : never) | (request extends {
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: undefined;
                    blobs?: undefined;
                    blobVersionedHashes?: undefined;
                    gasPrice?: bigint | undefined;
                    sidecars?: undefined;
                    maxFeePerBlobGas?: undefined;
                    maxFeePerGas?: undefined;
                    maxPriorityFeePerGas?: undefined;
                } & {
                    accessList: import("viem").AccessList | undefined;
                } ? "eip2930" : never) | (request extends ({
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: undefined;
                    blobs?: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
                    blobVersionedHashes?: readonly `0x${string}`[] | undefined;
                    maxFeePerBlobGas?: bigint | undefined;
                    maxFeePerGas?: bigint | undefined;
                    maxPriorityFeePerGas?: bigint | undefined;
                    sidecars?: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
                } | {
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: undefined;
                    blobs?: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
                    blobVersionedHashes?: readonly `0x${string}`[] | undefined;
                    maxFeePerBlobGas?: bigint | undefined;
                    maxFeePerGas?: bigint | undefined;
                    maxPriorityFeePerGas?: bigint | undefined;
                    sidecars?: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
                }) & (import("viem").ExactPartial<import("viem").FeeValuesEIP4844> & import("viem").OneOf<{
                    blobs: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
                } | {
                    blobVersionedHashes: readonly `0x${string}`[] | undefined;
                } | {
                    sidecars: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
                }, import("viem").TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: import("viem").SignedAuthorizationList | undefined;
                    blobs?: undefined;
                    blobVersionedHashes?: undefined;
                    gasPrice?: undefined;
                    maxFeePerBlobGas?: undefined;
                    maxFeePerGas?: bigint | undefined;
                    maxPriorityFeePerGas?: bigint | undefined;
                    sidecars?: undefined;
                } | {
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: import("viem").SignedAuthorizationList | undefined;
                    blobs?: undefined;
                    blobVersionedHashes?: undefined;
                    gasPrice?: undefined;
                    maxFeePerBlobGas?: undefined;
                    maxFeePerGas?: bigint | undefined;
                    maxPriorityFeePerGas?: bigint | undefined;
                    sidecars?: undefined;
                }) & {
                    authorizationList: import("viem").SignedAuthorizationList;
                } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)> extends "legacy" ? unknown : import("viem").GetTransactionType<request, (request extends {
                    accessList?: undefined;
                    authorizationList?: undefined;
                    blobs?: undefined;
                    blobVersionedHashes?: undefined;
                    gasPrice?: bigint | undefined;
                    sidecars?: undefined;
                } & import("viem").FeeValuesLegacy ? "legacy" : never) | (request extends {
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: undefined;
                    blobs?: undefined;
                    blobVersionedHashes?: undefined;
                    gasPrice?: undefined;
                    maxFeePerBlobGas?: undefined;
                    maxFeePerGas?: bigint | undefined;
                    maxPriorityFeePerGas?: bigint | undefined;
                    sidecars?: undefined;
                } & (import("viem").OneOf<{
                    maxFeePerGas: bigint;
                } | {
                    maxPriorityFeePerGas: bigint;
                }, import("viem").FeeValuesEIP1559> & {
                    accessList?: import("viem").AccessList | undefined;
                }) ? "eip1559" : never) | (request extends {
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: undefined;
                    blobs?: undefined;
                    blobVersionedHashes?: undefined;
                    gasPrice?: bigint | undefined;
                    sidecars?: undefined;
                    maxFeePerBlobGas?: undefined;
                    maxFeePerGas?: undefined;
                    maxPriorityFeePerGas?: undefined;
                } & {
                    accessList: import("viem").AccessList | undefined;
                } ? "eip2930" : never) | (request extends ({
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: undefined;
                    blobs?: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
                    blobVersionedHashes?: readonly `0x${string}`[] | undefined;
                    maxFeePerBlobGas?: bigint | undefined;
                    maxFeePerGas?: bigint | undefined;
                    maxPriorityFeePerGas?: bigint | undefined;
                    sidecars?: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
                } | {
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: undefined;
                    blobs?: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
                    blobVersionedHashes?: readonly `0x${string}`[] | undefined;
                    maxFeePerBlobGas?: bigint | undefined;
                    maxFeePerGas?: bigint | undefined;
                    maxPriorityFeePerGas?: bigint | undefined;
                    sidecars?: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
                }) & (import("viem").ExactPartial<import("viem").FeeValuesEIP4844> & import("viem").OneOf<{
                    blobs: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
                } | {
                    blobVersionedHashes: readonly `0x${string}`[] | undefined;
                } | {
                    sidecars: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
                }, import("viem").TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: import("viem").SignedAuthorizationList | undefined;
                    blobs?: undefined;
                    blobVersionedHashes?: undefined;
                    gasPrice?: undefined;
                    maxFeePerBlobGas?: undefined;
                    maxFeePerGas?: bigint | undefined;
                    maxPriorityFeePerGas?: bigint | undefined;
                    sidecars?: undefined;
                } | {
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: import("viem").SignedAuthorizationList | undefined;
                    blobs?: undefined;
                    blobVersionedHashes?: undefined;
                    gasPrice?: undefined;
                    maxFeePerBlobGas?: undefined;
                    maxFeePerGas?: bigint | undefined;
                    maxPriorityFeePerGas?: bigint | undefined;
                    sidecars?: undefined;
                }) & {
                    authorizationList: import("viem").SignedAuthorizationList;
                } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)>) ? T_52 extends "legacy" ? import("viem").TransactionRequestLegacy : never : never : never) | ((request["type"] extends string | undefined ? request["type"] : import("viem").GetTransactionType<request, (request extends {
                    accessList?: undefined;
                    authorizationList?: undefined;
                    blobs?: undefined;
                    blobVersionedHashes?: undefined;
                    gasPrice?: bigint | undefined;
                    sidecars?: undefined;
                } & import("viem").FeeValuesLegacy ? "legacy" : never) | (request extends {
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: undefined;
                    blobs?: undefined;
                    blobVersionedHashes?: undefined;
                    gasPrice?: undefined;
                    maxFeePerBlobGas?: undefined;
                    maxFeePerGas?: bigint | undefined;
                    maxPriorityFeePerGas?: bigint | undefined;
                    sidecars?: undefined;
                } & (import("viem").OneOf<{
                    maxFeePerGas: bigint;
                } | {
                    maxPriorityFeePerGas: bigint;
                }, import("viem").FeeValuesEIP1559> & {
                    accessList?: import("viem").AccessList | undefined;
                }) ? "eip1559" : never) | (request extends {
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: undefined;
                    blobs?: undefined;
                    blobVersionedHashes?: undefined;
                    gasPrice?: bigint | undefined;
                    sidecars?: undefined;
                    maxFeePerBlobGas?: undefined;
                    maxFeePerGas?: undefined;
                    maxPriorityFeePerGas?: undefined;
                } & {
                    accessList: import("viem").AccessList | undefined;
                } ? "eip2930" : never) | (request extends ({
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: undefined;
                    blobs?: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
                    blobVersionedHashes?: readonly `0x${string}`[] | undefined;
                    maxFeePerBlobGas?: bigint | undefined;
                    maxFeePerGas?: bigint | undefined;
                    maxPriorityFeePerGas?: bigint | undefined;
                    sidecars?: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
                } | {
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: undefined;
                    blobs?: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
                    blobVersionedHashes?: readonly `0x${string}`[] | undefined;
                    maxFeePerBlobGas?: bigint | undefined;
                    maxFeePerGas?: bigint | undefined;
                    maxPriorityFeePerGas?: bigint | undefined;
                    sidecars?: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
                }) & (import("viem").ExactPartial<import("viem").FeeValuesEIP4844> & import("viem").OneOf<{
                    blobs: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
                } | {
                    blobVersionedHashes: readonly `0x${string}`[] | undefined;
                } | {
                    sidecars: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
                }, import("viem").TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: import("viem").SignedAuthorizationList | undefined;
                    blobs?: undefined;
                    blobVersionedHashes?: undefined;
                    gasPrice?: undefined;
                    maxFeePerBlobGas?: undefined;
                    maxFeePerGas?: bigint | undefined;
                    maxPriorityFeePerGas?: bigint | undefined;
                    sidecars?: undefined;
                } | {
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: import("viem").SignedAuthorizationList | undefined;
                    blobs?: undefined;
                    blobVersionedHashes?: undefined;
                    gasPrice?: undefined;
                    maxFeePerBlobGas?: undefined;
                    maxFeePerGas?: bigint | undefined;
                    maxPriorityFeePerGas?: bigint | undefined;
                    sidecars?: undefined;
                }) & {
                    authorizationList: import("viem").SignedAuthorizationList;
                } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)> extends "legacy" ? unknown : import("viem").GetTransactionType<request, (request extends {
                    accessList?: undefined;
                    authorizationList?: undefined;
                    blobs?: undefined;
                    blobVersionedHashes?: undefined;
                    gasPrice?: bigint | undefined;
                    sidecars?: undefined;
                } & import("viem").FeeValuesLegacy ? "legacy" : never) | (request extends {
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: undefined;
                    blobs?: undefined;
                    blobVersionedHashes?: undefined;
                    gasPrice?: undefined;
                    maxFeePerBlobGas?: undefined;
                    maxFeePerGas?: bigint | undefined;
                    maxPriorityFeePerGas?: bigint | undefined;
                    sidecars?: undefined;
                } & (import("viem").OneOf<{
                    maxFeePerGas: bigint;
                } | {
                    maxPriorityFeePerGas: bigint;
                }, import("viem").FeeValuesEIP1559> & {
                    accessList?: import("viem").AccessList | undefined;
                }) ? "eip1559" : never) | (request extends {
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: undefined;
                    blobs?: undefined;
                    blobVersionedHashes?: undefined;
                    gasPrice?: bigint | undefined;
                    sidecars?: undefined;
                    maxFeePerBlobGas?: undefined;
                    maxFeePerGas?: undefined;
                    maxPriorityFeePerGas?: undefined;
                } & {
                    accessList: import("viem").AccessList | undefined;
                } ? "eip2930" : never) | (request extends ({
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: undefined;
                    blobs?: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
                    blobVersionedHashes?: readonly `0x${string}`[] | undefined;
                    maxFeePerBlobGas?: bigint | undefined;
                    maxFeePerGas?: bigint | undefined;
                    maxPriorityFeePerGas?: bigint | undefined;
                    sidecars?: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
                } | {
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: undefined;
                    blobs?: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
                    blobVersionedHashes?: readonly `0x${string}`[] | undefined;
                    maxFeePerBlobGas?: bigint | undefined;
                    maxFeePerGas?: bigint | undefined;
                    maxPriorityFeePerGas?: bigint | undefined;
                    sidecars?: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
                }) & (import("viem").ExactPartial<import("viem").FeeValuesEIP4844> & import("viem").OneOf<{
                    blobs: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
                } | {
                    blobVersionedHashes: readonly `0x${string}`[] | undefined;
                } | {
                    sidecars: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
                }, import("viem").TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: import("viem").SignedAuthorizationList | undefined;
                    blobs?: undefined;
                    blobVersionedHashes?: undefined;
                    gasPrice?: undefined;
                    maxFeePerBlobGas?: undefined;
                    maxFeePerGas?: bigint | undefined;
                    maxPriorityFeePerGas?: bigint | undefined;
                    sidecars?: undefined;
                } | {
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: import("viem").SignedAuthorizationList | undefined;
                    blobs?: undefined;
                    blobVersionedHashes?: undefined;
                    gasPrice?: undefined;
                    maxFeePerBlobGas?: undefined;
                    maxFeePerGas?: bigint | undefined;
                    maxPriorityFeePerGas?: bigint | undefined;
                    sidecars?: undefined;
                }) & {
                    authorizationList: import("viem").SignedAuthorizationList;
                } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)>) extends infer T_53 ? T_53 extends (request["type"] extends string | undefined ? request["type"] : import("viem").GetTransactionType<request, (request extends {
                    accessList?: undefined;
                    authorizationList?: undefined;
                    blobs?: undefined;
                    blobVersionedHashes?: undefined;
                    gasPrice?: bigint | undefined;
                    sidecars?: undefined;
                } & import("viem").FeeValuesLegacy ? "legacy" : never) | (request extends {
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: undefined;
                    blobs?: undefined;
                    blobVersionedHashes?: undefined;
                    gasPrice?: undefined;
                    maxFeePerBlobGas?: undefined;
                    maxFeePerGas?: bigint | undefined;
                    maxPriorityFeePerGas?: bigint | undefined;
                    sidecars?: undefined;
                } & (import("viem").OneOf<{
                    maxFeePerGas: bigint;
                } | {
                    maxPriorityFeePerGas: bigint;
                }, import("viem").FeeValuesEIP1559> & {
                    accessList?: import("viem").AccessList | undefined;
                }) ? "eip1559" : never) | (request extends {
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: undefined;
                    blobs?: undefined;
                    blobVersionedHashes?: undefined;
                    gasPrice?: bigint | undefined;
                    sidecars?: undefined;
                    maxFeePerBlobGas?: undefined;
                    maxFeePerGas?: undefined;
                    maxPriorityFeePerGas?: undefined;
                } & {
                    accessList: import("viem").AccessList | undefined;
                } ? "eip2930" : never) | (request extends ({
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: undefined;
                    blobs?: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
                    blobVersionedHashes?: readonly `0x${string}`[] | undefined;
                    maxFeePerBlobGas?: bigint | undefined;
                    maxFeePerGas?: bigint | undefined;
                    maxPriorityFeePerGas?: bigint | undefined;
                    sidecars?: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
                } | {
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: undefined;
                    blobs?: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
                    blobVersionedHashes?: readonly `0x${string}`[] | undefined;
                    maxFeePerBlobGas?: bigint | undefined;
                    maxFeePerGas?: bigint | undefined;
                    maxPriorityFeePerGas?: bigint | undefined;
                    sidecars?: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
                }) & (import("viem").ExactPartial<import("viem").FeeValuesEIP4844> & import("viem").OneOf<{
                    blobs: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
                } | {
                    blobVersionedHashes: readonly `0x${string}`[] | undefined;
                } | {
                    sidecars: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
                }, import("viem").TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: import("viem").SignedAuthorizationList | undefined;
                    blobs?: undefined;
                    blobVersionedHashes?: undefined;
                    gasPrice?: undefined;
                    maxFeePerBlobGas?: undefined;
                    maxFeePerGas?: bigint | undefined;
                    maxPriorityFeePerGas?: bigint | undefined;
                    sidecars?: undefined;
                } | {
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: import("viem").SignedAuthorizationList | undefined;
                    blobs?: undefined;
                    blobVersionedHashes?: undefined;
                    gasPrice?: undefined;
                    maxFeePerBlobGas?: undefined;
                    maxFeePerGas?: bigint | undefined;
                    maxPriorityFeePerGas?: bigint | undefined;
                    sidecars?: undefined;
                }) & {
                    authorizationList: import("viem").SignedAuthorizationList;
                } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)> extends "legacy" ? unknown : import("viem").GetTransactionType<request, (request extends {
                    accessList?: undefined;
                    authorizationList?: undefined;
                    blobs?: undefined;
                    blobVersionedHashes?: undefined;
                    gasPrice?: bigint | undefined;
                    sidecars?: undefined;
                } & import("viem").FeeValuesLegacy ? "legacy" : never) | (request extends {
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: undefined;
                    blobs?: undefined;
                    blobVersionedHashes?: undefined;
                    gasPrice?: undefined;
                    maxFeePerBlobGas?: undefined;
                    maxFeePerGas?: bigint | undefined;
                    maxPriorityFeePerGas?: bigint | undefined;
                    sidecars?: undefined;
                } & (import("viem").OneOf<{
                    maxFeePerGas: bigint;
                } | {
                    maxPriorityFeePerGas: bigint;
                }, import("viem").FeeValuesEIP1559> & {
                    accessList?: import("viem").AccessList | undefined;
                }) ? "eip1559" : never) | (request extends {
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: undefined;
                    blobs?: undefined;
                    blobVersionedHashes?: undefined;
                    gasPrice?: bigint | undefined;
                    sidecars?: undefined;
                    maxFeePerBlobGas?: undefined;
                    maxFeePerGas?: undefined;
                    maxPriorityFeePerGas?: undefined;
                } & {
                    accessList: import("viem").AccessList | undefined;
                } ? "eip2930" : never) | (request extends ({
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: undefined;
                    blobs?: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
                    blobVersionedHashes?: readonly `0x${string}`[] | undefined;
                    maxFeePerBlobGas?: bigint | undefined;
                    maxFeePerGas?: bigint | undefined;
                    maxPriorityFeePerGas?: bigint | undefined;
                    sidecars?: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
                } | {
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: undefined;
                    blobs?: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
                    blobVersionedHashes?: readonly `0x${string}`[] | undefined;
                    maxFeePerBlobGas?: bigint | undefined;
                    maxFeePerGas?: bigint | undefined;
                    maxPriorityFeePerGas?: bigint | undefined;
                    sidecars?: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
                }) & (import("viem").ExactPartial<import("viem").FeeValuesEIP4844> & import("viem").OneOf<{
                    blobs: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
                } | {
                    blobVersionedHashes: readonly `0x${string}`[] | undefined;
                } | {
                    sidecars: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
                }, import("viem").TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: import("viem").SignedAuthorizationList | undefined;
                    blobs?: undefined;
                    blobVersionedHashes?: undefined;
                    gasPrice?: undefined;
                    maxFeePerBlobGas?: undefined;
                    maxFeePerGas?: bigint | undefined;
                    maxPriorityFeePerGas?: bigint | undefined;
                    sidecars?: undefined;
                } | {
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: import("viem").SignedAuthorizationList | undefined;
                    blobs?: undefined;
                    blobVersionedHashes?: undefined;
                    gasPrice?: undefined;
                    maxFeePerBlobGas?: undefined;
                    maxFeePerGas?: bigint | undefined;
                    maxPriorityFeePerGas?: bigint | undefined;
                    sidecars?: undefined;
                }) & {
                    authorizationList: import("viem").SignedAuthorizationList;
                } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)>) ? T_53 extends "eip1559" ? import("viem").TransactionRequestEIP1559 : never : never : never) | ((request["type"] extends string | undefined ? request["type"] : import("viem").GetTransactionType<request, (request extends {
                    accessList?: undefined;
                    authorizationList?: undefined;
                    blobs?: undefined;
                    blobVersionedHashes?: undefined;
                    gasPrice?: bigint | undefined;
                    sidecars?: undefined;
                } & import("viem").FeeValuesLegacy ? "legacy" : never) | (request extends {
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: undefined;
                    blobs?: undefined;
                    blobVersionedHashes?: undefined;
                    gasPrice?: undefined;
                    maxFeePerBlobGas?: undefined;
                    maxFeePerGas?: bigint | undefined;
                    maxPriorityFeePerGas?: bigint | undefined;
                    sidecars?: undefined;
                } & (import("viem").OneOf<{
                    maxFeePerGas: bigint;
                } | {
                    maxPriorityFeePerGas: bigint;
                }, import("viem").FeeValuesEIP1559> & {
                    accessList?: import("viem").AccessList | undefined;
                }) ? "eip1559" : never) | (request extends {
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: undefined;
                    blobs?: undefined;
                    blobVersionedHashes?: undefined;
                    gasPrice?: bigint | undefined;
                    sidecars?: undefined;
                    maxFeePerBlobGas?: undefined;
                    maxFeePerGas?: undefined;
                    maxPriorityFeePerGas?: undefined;
                } & {
                    accessList: import("viem").AccessList | undefined;
                } ? "eip2930" : never) | (request extends ({
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: undefined;
                    blobs?: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
                    blobVersionedHashes?: readonly `0x${string}`[] | undefined;
                    maxFeePerBlobGas?: bigint | undefined;
                    maxFeePerGas?: bigint | undefined;
                    maxPriorityFeePerGas?: bigint | undefined;
                    sidecars?: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
                } | {
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: undefined;
                    blobs?: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
                    blobVersionedHashes?: readonly `0x${string}`[] | undefined;
                    maxFeePerBlobGas?: bigint | undefined;
                    maxFeePerGas?: bigint | undefined;
                    maxPriorityFeePerGas?: bigint | undefined;
                    sidecars?: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
                }) & (import("viem").ExactPartial<import("viem").FeeValuesEIP4844> & import("viem").OneOf<{
                    blobs: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
                } | {
                    blobVersionedHashes: readonly `0x${string}`[] | undefined;
                } | {
                    sidecars: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
                }, import("viem").TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: import("viem").SignedAuthorizationList | undefined;
                    blobs?: undefined;
                    blobVersionedHashes?: undefined;
                    gasPrice?: undefined;
                    maxFeePerBlobGas?: undefined;
                    maxFeePerGas?: bigint | undefined;
                    maxPriorityFeePerGas?: bigint | undefined;
                    sidecars?: undefined;
                } | {
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: import("viem").SignedAuthorizationList | undefined;
                    blobs?: undefined;
                    blobVersionedHashes?: undefined;
                    gasPrice?: undefined;
                    maxFeePerBlobGas?: undefined;
                    maxFeePerGas?: bigint | undefined;
                    maxPriorityFeePerGas?: bigint | undefined;
                    sidecars?: undefined;
                }) & {
                    authorizationList: import("viem").SignedAuthorizationList;
                } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)> extends "legacy" ? unknown : import("viem").GetTransactionType<request, (request extends {
                    accessList?: undefined;
                    authorizationList?: undefined;
                    blobs?: undefined;
                    blobVersionedHashes?: undefined;
                    gasPrice?: bigint | undefined;
                    sidecars?: undefined;
                } & import("viem").FeeValuesLegacy ? "legacy" : never) | (request extends {
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: undefined;
                    blobs?: undefined;
                    blobVersionedHashes?: undefined;
                    gasPrice?: undefined;
                    maxFeePerBlobGas?: undefined;
                    maxFeePerGas?: bigint | undefined;
                    maxPriorityFeePerGas?: bigint | undefined;
                    sidecars?: undefined;
                } & (import("viem").OneOf<{
                    maxFeePerGas: bigint;
                } | {
                    maxPriorityFeePerGas: bigint;
                }, import("viem").FeeValuesEIP1559> & {
                    accessList?: import("viem").AccessList | undefined;
                }) ? "eip1559" : never) | (request extends {
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: undefined;
                    blobs?: undefined;
                    blobVersionedHashes?: undefined;
                    gasPrice?: bigint | undefined;
                    sidecars?: undefined;
                    maxFeePerBlobGas?: undefined;
                    maxFeePerGas?: undefined;
                    maxPriorityFeePerGas?: undefined;
                } & {
                    accessList: import("viem").AccessList | undefined;
                } ? "eip2930" : never) | (request extends ({
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: undefined;
                    blobs?: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
                    blobVersionedHashes?: readonly `0x${string}`[] | undefined;
                    maxFeePerBlobGas?: bigint | undefined;
                    maxFeePerGas?: bigint | undefined;
                    maxPriorityFeePerGas?: bigint | undefined;
                    sidecars?: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
                } | {
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: undefined;
                    blobs?: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
                    blobVersionedHashes?: readonly `0x${string}`[] | undefined;
                    maxFeePerBlobGas?: bigint | undefined;
                    maxFeePerGas?: bigint | undefined;
                    maxPriorityFeePerGas?: bigint | undefined;
                    sidecars?: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
                }) & (import("viem").ExactPartial<import("viem").FeeValuesEIP4844> & import("viem").OneOf<{
                    blobs: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
                } | {
                    blobVersionedHashes: readonly `0x${string}`[] | undefined;
                } | {
                    sidecars: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
                }, import("viem").TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: import("viem").SignedAuthorizationList | undefined;
                    blobs?: undefined;
                    blobVersionedHashes?: undefined;
                    gasPrice?: undefined;
                    maxFeePerBlobGas?: undefined;
                    maxFeePerGas?: bigint | undefined;
                    maxPriorityFeePerGas?: bigint | undefined;
                    sidecars?: undefined;
                } | {
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: import("viem").SignedAuthorizationList | undefined;
                    blobs?: undefined;
                    blobVersionedHashes?: undefined;
                    gasPrice?: undefined;
                    maxFeePerBlobGas?: undefined;
                    maxFeePerGas?: bigint | undefined;
                    maxPriorityFeePerGas?: bigint | undefined;
                    sidecars?: undefined;
                }) & {
                    authorizationList: import("viem").SignedAuthorizationList;
                } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)>) extends infer T_54 ? T_54 extends (request["type"] extends string | undefined ? request["type"] : import("viem").GetTransactionType<request, (request extends {
                    accessList?: undefined;
                    authorizationList?: undefined;
                    blobs?: undefined;
                    blobVersionedHashes?: undefined;
                    gasPrice?: bigint | undefined;
                    sidecars?: undefined;
                } & import("viem").FeeValuesLegacy ? "legacy" : never) | (request extends {
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: undefined;
                    blobs?: undefined;
                    blobVersionedHashes?: undefined;
                    gasPrice?: undefined;
                    maxFeePerBlobGas?: undefined;
                    maxFeePerGas?: bigint | undefined;
                    maxPriorityFeePerGas?: bigint | undefined;
                    sidecars?: undefined;
                } & (import("viem").OneOf<{
                    maxFeePerGas: bigint;
                } | {
                    maxPriorityFeePerGas: bigint;
                }, import("viem").FeeValuesEIP1559> & {
                    accessList?: import("viem").AccessList | undefined;
                }) ? "eip1559" : never) | (request extends {
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: undefined;
                    blobs?: undefined;
                    blobVersionedHashes?: undefined;
                    gasPrice?: bigint | undefined;
                    sidecars?: undefined;
                    maxFeePerBlobGas?: undefined;
                    maxFeePerGas?: undefined;
                    maxPriorityFeePerGas?: undefined;
                } & {
                    accessList: import("viem").AccessList | undefined;
                } ? "eip2930" : never) | (request extends ({
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: undefined;
                    blobs?: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
                    blobVersionedHashes?: readonly `0x${string}`[] | undefined;
                    maxFeePerBlobGas?: bigint | undefined;
                    maxFeePerGas?: bigint | undefined;
                    maxPriorityFeePerGas?: bigint | undefined;
                    sidecars?: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
                } | {
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: undefined;
                    blobs?: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
                    blobVersionedHashes?: readonly `0x${string}`[] | undefined;
                    maxFeePerBlobGas?: bigint | undefined;
                    maxFeePerGas?: bigint | undefined;
                    maxPriorityFeePerGas?: bigint | undefined;
                    sidecars?: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
                }) & (import("viem").ExactPartial<import("viem").FeeValuesEIP4844> & import("viem").OneOf<{
                    blobs: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
                } | {
                    blobVersionedHashes: readonly `0x${string}`[] | undefined;
                } | {
                    sidecars: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
                }, import("viem").TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: import("viem").SignedAuthorizationList | undefined;
                    blobs?: undefined;
                    blobVersionedHashes?: undefined;
                    gasPrice?: undefined;
                    maxFeePerBlobGas?: undefined;
                    maxFeePerGas?: bigint | undefined;
                    maxPriorityFeePerGas?: bigint | undefined;
                    sidecars?: undefined;
                } | {
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: import("viem").SignedAuthorizationList | undefined;
                    blobs?: undefined;
                    blobVersionedHashes?: undefined;
                    gasPrice?: undefined;
                    maxFeePerBlobGas?: undefined;
                    maxFeePerGas?: bigint | undefined;
                    maxPriorityFeePerGas?: bigint | undefined;
                    sidecars?: undefined;
                }) & {
                    authorizationList: import("viem").SignedAuthorizationList;
                } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)> extends "legacy" ? unknown : import("viem").GetTransactionType<request, (request extends {
                    accessList?: undefined;
                    authorizationList?: undefined;
                    blobs?: undefined;
                    blobVersionedHashes?: undefined;
                    gasPrice?: bigint | undefined;
                    sidecars?: undefined;
                } & import("viem").FeeValuesLegacy ? "legacy" : never) | (request extends {
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: undefined;
                    blobs?: undefined;
                    blobVersionedHashes?: undefined;
                    gasPrice?: undefined;
                    maxFeePerBlobGas?: undefined;
                    maxFeePerGas?: bigint | undefined;
                    maxPriorityFeePerGas?: bigint | undefined;
                    sidecars?: undefined;
                } & (import("viem").OneOf<{
                    maxFeePerGas: bigint;
                } | {
                    maxPriorityFeePerGas: bigint;
                }, import("viem").FeeValuesEIP1559> & {
                    accessList?: import("viem").AccessList | undefined;
                }) ? "eip1559" : never) | (request extends {
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: undefined;
                    blobs?: undefined;
                    blobVersionedHashes?: undefined;
                    gasPrice?: bigint | undefined;
                    sidecars?: undefined;
                    maxFeePerBlobGas?: undefined;
                    maxFeePerGas?: undefined;
                    maxPriorityFeePerGas?: undefined;
                } & {
                    accessList: import("viem").AccessList | undefined;
                } ? "eip2930" : never) | (request extends ({
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: undefined;
                    blobs?: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
                    blobVersionedHashes?: readonly `0x${string}`[] | undefined;
                    maxFeePerBlobGas?: bigint | undefined;
                    maxFeePerGas?: bigint | undefined;
                    maxPriorityFeePerGas?: bigint | undefined;
                    sidecars?: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
                } | {
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: undefined;
                    blobs?: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
                    blobVersionedHashes?: readonly `0x${string}`[] | undefined;
                    maxFeePerBlobGas?: bigint | undefined;
                    maxFeePerGas?: bigint | undefined;
                    maxPriorityFeePerGas?: bigint | undefined;
                    sidecars?: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
                }) & (import("viem").ExactPartial<import("viem").FeeValuesEIP4844> & import("viem").OneOf<{
                    blobs: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
                } | {
                    blobVersionedHashes: readonly `0x${string}`[] | undefined;
                } | {
                    sidecars: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
                }, import("viem").TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: import("viem").SignedAuthorizationList | undefined;
                    blobs?: undefined;
                    blobVersionedHashes?: undefined;
                    gasPrice?: undefined;
                    maxFeePerBlobGas?: undefined;
                    maxFeePerGas?: bigint | undefined;
                    maxPriorityFeePerGas?: bigint | undefined;
                    sidecars?: undefined;
                } | {
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: import("viem").SignedAuthorizationList | undefined;
                    blobs?: undefined;
                    blobVersionedHashes?: undefined;
                    gasPrice?: undefined;
                    maxFeePerBlobGas?: undefined;
                    maxFeePerGas?: bigint | undefined;
                    maxPriorityFeePerGas?: bigint | undefined;
                    sidecars?: undefined;
                }) & {
                    authorizationList: import("viem").SignedAuthorizationList;
                } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)>) ? T_54 extends "eip2930" ? import("viem").TransactionRequestEIP2930 : never : never : never) | ((request["type"] extends string | undefined ? request["type"] : import("viem").GetTransactionType<request, (request extends {
                    accessList?: undefined;
                    authorizationList?: undefined;
                    blobs?: undefined;
                    blobVersionedHashes?: undefined;
                    gasPrice?: bigint | undefined;
                    sidecars?: undefined;
                } & import("viem").FeeValuesLegacy ? "legacy" : never) | (request extends {
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: undefined;
                    blobs?: undefined;
                    blobVersionedHashes?: undefined;
                    gasPrice?: undefined;
                    maxFeePerBlobGas?: undefined;
                    maxFeePerGas?: bigint | undefined;
                    maxPriorityFeePerGas?: bigint | undefined;
                    sidecars?: undefined;
                } & (import("viem").OneOf<{
                    maxFeePerGas: bigint;
                } | {
                    maxPriorityFeePerGas: bigint;
                }, import("viem").FeeValuesEIP1559> & {
                    accessList?: import("viem").AccessList | undefined;
                }) ? "eip1559" : never) | (request extends {
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: undefined;
                    blobs?: undefined;
                    blobVersionedHashes?: undefined;
                    gasPrice?: bigint | undefined;
                    sidecars?: undefined;
                    maxFeePerBlobGas?: undefined;
                    maxFeePerGas?: undefined;
                    maxPriorityFeePerGas?: undefined;
                } & {
                    accessList: import("viem").AccessList | undefined;
                } ? "eip2930" : never) | (request extends ({
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: undefined;
                    blobs?: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
                    blobVersionedHashes?: readonly `0x${string}`[] | undefined;
                    maxFeePerBlobGas?: bigint | undefined;
                    maxFeePerGas?: bigint | undefined;
                    maxPriorityFeePerGas?: bigint | undefined;
                    sidecars?: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
                } | {
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: undefined;
                    blobs?: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
                    blobVersionedHashes?: readonly `0x${string}`[] | undefined;
                    maxFeePerBlobGas?: bigint | undefined;
                    maxFeePerGas?: bigint | undefined;
                    maxPriorityFeePerGas?: bigint | undefined;
                    sidecars?: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
                }) & (import("viem").ExactPartial<import("viem").FeeValuesEIP4844> & import("viem").OneOf<{
                    blobs: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
                } | {
                    blobVersionedHashes: readonly `0x${string}`[] | undefined;
                } | {
                    sidecars: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
                }, import("viem").TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: import("viem").SignedAuthorizationList | undefined;
                    blobs?: undefined;
                    blobVersionedHashes?: undefined;
                    gasPrice?: undefined;
                    maxFeePerBlobGas?: undefined;
                    maxFeePerGas?: bigint | undefined;
                    maxPriorityFeePerGas?: bigint | undefined;
                    sidecars?: undefined;
                } | {
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: import("viem").SignedAuthorizationList | undefined;
                    blobs?: undefined;
                    blobVersionedHashes?: undefined;
                    gasPrice?: undefined;
                    maxFeePerBlobGas?: undefined;
                    maxFeePerGas?: bigint | undefined;
                    maxPriorityFeePerGas?: bigint | undefined;
                    sidecars?: undefined;
                }) & {
                    authorizationList: import("viem").SignedAuthorizationList;
                } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)> extends "legacy" ? unknown : import("viem").GetTransactionType<request, (request extends {
                    accessList?: undefined;
                    authorizationList?: undefined;
                    blobs?: undefined;
                    blobVersionedHashes?: undefined;
                    gasPrice?: bigint | undefined;
                    sidecars?: undefined;
                } & import("viem").FeeValuesLegacy ? "legacy" : never) | (request extends {
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: undefined;
                    blobs?: undefined;
                    blobVersionedHashes?: undefined;
                    gasPrice?: undefined;
                    maxFeePerBlobGas?: undefined;
                    maxFeePerGas?: bigint | undefined;
                    maxPriorityFeePerGas?: bigint | undefined;
                    sidecars?: undefined;
                } & (import("viem").OneOf<{
                    maxFeePerGas: bigint;
                } | {
                    maxPriorityFeePerGas: bigint;
                }, import("viem").FeeValuesEIP1559> & {
                    accessList?: import("viem").AccessList | undefined;
                }) ? "eip1559" : never) | (request extends {
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: undefined;
                    blobs?: undefined;
                    blobVersionedHashes?: undefined;
                    gasPrice?: bigint | undefined;
                    sidecars?: undefined;
                    maxFeePerBlobGas?: undefined;
                    maxFeePerGas?: undefined;
                    maxPriorityFeePerGas?: undefined;
                } & {
                    accessList: import("viem").AccessList | undefined;
                } ? "eip2930" : never) | (request extends ({
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: undefined;
                    blobs?: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
                    blobVersionedHashes?: readonly `0x${string}`[] | undefined;
                    maxFeePerBlobGas?: bigint | undefined;
                    maxFeePerGas?: bigint | undefined;
                    maxPriorityFeePerGas?: bigint | undefined;
                    sidecars?: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
                } | {
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: undefined;
                    blobs?: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
                    blobVersionedHashes?: readonly `0x${string}`[] | undefined;
                    maxFeePerBlobGas?: bigint | undefined;
                    maxFeePerGas?: bigint | undefined;
                    maxPriorityFeePerGas?: bigint | undefined;
                    sidecars?: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
                }) & (import("viem").ExactPartial<import("viem").FeeValuesEIP4844> & import("viem").OneOf<{
                    blobs: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
                } | {
                    blobVersionedHashes: readonly `0x${string}`[] | undefined;
                } | {
                    sidecars: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
                }, import("viem").TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: import("viem").SignedAuthorizationList | undefined;
                    blobs?: undefined;
                    blobVersionedHashes?: undefined;
                    gasPrice?: undefined;
                    maxFeePerBlobGas?: undefined;
                    maxFeePerGas?: bigint | undefined;
                    maxPriorityFeePerGas?: bigint | undefined;
                    sidecars?: undefined;
                } | {
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: import("viem").SignedAuthorizationList | undefined;
                    blobs?: undefined;
                    blobVersionedHashes?: undefined;
                    gasPrice?: undefined;
                    maxFeePerBlobGas?: undefined;
                    maxFeePerGas?: bigint | undefined;
                    maxPriorityFeePerGas?: bigint | undefined;
                    sidecars?: undefined;
                }) & {
                    authorizationList: import("viem").SignedAuthorizationList;
                } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)>) extends infer T_55 ? T_55 extends (request["type"] extends string | undefined ? request["type"] : import("viem").GetTransactionType<request, (request extends {
                    accessList?: undefined;
                    authorizationList?: undefined;
                    blobs?: undefined;
                    blobVersionedHashes?: undefined;
                    gasPrice?: bigint | undefined;
                    sidecars?: undefined;
                } & import("viem").FeeValuesLegacy ? "legacy" : never) | (request extends {
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: undefined;
                    blobs?: undefined;
                    blobVersionedHashes?: undefined;
                    gasPrice?: undefined;
                    maxFeePerBlobGas?: undefined;
                    maxFeePerGas?: bigint | undefined;
                    maxPriorityFeePerGas?: bigint | undefined;
                    sidecars?: undefined;
                } & (import("viem").OneOf<{
                    maxFeePerGas: bigint;
                } | {
                    maxPriorityFeePerGas: bigint;
                }, import("viem").FeeValuesEIP1559> & {
                    accessList?: import("viem").AccessList | undefined;
                }) ? "eip1559" : never) | (request extends {
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: undefined;
                    blobs?: undefined;
                    blobVersionedHashes?: undefined;
                    gasPrice?: bigint | undefined;
                    sidecars?: undefined;
                    maxFeePerBlobGas?: undefined;
                    maxFeePerGas?: undefined;
                    maxPriorityFeePerGas?: undefined;
                } & {
                    accessList: import("viem").AccessList | undefined;
                } ? "eip2930" : never) | (request extends ({
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: undefined;
                    blobs?: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
                    blobVersionedHashes?: readonly `0x${string}`[] | undefined;
                    maxFeePerBlobGas?: bigint | undefined;
                    maxFeePerGas?: bigint | undefined;
                    maxPriorityFeePerGas?: bigint | undefined;
                    sidecars?: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
                } | {
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: undefined;
                    blobs?: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
                    blobVersionedHashes?: readonly `0x${string}`[] | undefined;
                    maxFeePerBlobGas?: bigint | undefined;
                    maxFeePerGas?: bigint | undefined;
                    maxPriorityFeePerGas?: bigint | undefined;
                    sidecars?: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
                }) & (import("viem").ExactPartial<import("viem").FeeValuesEIP4844> & import("viem").OneOf<{
                    blobs: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
                } | {
                    blobVersionedHashes: readonly `0x${string}`[] | undefined;
                } | {
                    sidecars: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
                }, import("viem").TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: import("viem").SignedAuthorizationList | undefined;
                    blobs?: undefined;
                    blobVersionedHashes?: undefined;
                    gasPrice?: undefined;
                    maxFeePerBlobGas?: undefined;
                    maxFeePerGas?: bigint | undefined;
                    maxPriorityFeePerGas?: bigint | undefined;
                    sidecars?: undefined;
                } | {
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: import("viem").SignedAuthorizationList | undefined;
                    blobs?: undefined;
                    blobVersionedHashes?: undefined;
                    gasPrice?: undefined;
                    maxFeePerBlobGas?: undefined;
                    maxFeePerGas?: bigint | undefined;
                    maxPriorityFeePerGas?: bigint | undefined;
                    sidecars?: undefined;
                }) & {
                    authorizationList: import("viem").SignedAuthorizationList;
                } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)> extends "legacy" ? unknown : import("viem").GetTransactionType<request, (request extends {
                    accessList?: undefined;
                    authorizationList?: undefined;
                    blobs?: undefined;
                    blobVersionedHashes?: undefined;
                    gasPrice?: bigint | undefined;
                    sidecars?: undefined;
                } & import("viem").FeeValuesLegacy ? "legacy" : never) | (request extends {
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: undefined;
                    blobs?: undefined;
                    blobVersionedHashes?: undefined;
                    gasPrice?: undefined;
                    maxFeePerBlobGas?: undefined;
                    maxFeePerGas?: bigint | undefined;
                    maxPriorityFeePerGas?: bigint | undefined;
                    sidecars?: undefined;
                } & (import("viem").OneOf<{
                    maxFeePerGas: bigint;
                } | {
                    maxPriorityFeePerGas: bigint;
                }, import("viem").FeeValuesEIP1559> & {
                    accessList?: import("viem").AccessList | undefined;
                }) ? "eip1559" : never) | (request extends {
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: undefined;
                    blobs?: undefined;
                    blobVersionedHashes?: undefined;
                    gasPrice?: bigint | undefined;
                    sidecars?: undefined;
                    maxFeePerBlobGas?: undefined;
                    maxFeePerGas?: undefined;
                    maxPriorityFeePerGas?: undefined;
                } & {
                    accessList: import("viem").AccessList | undefined;
                } ? "eip2930" : never) | (request extends ({
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: undefined;
                    blobs?: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
                    blobVersionedHashes?: readonly `0x${string}`[] | undefined;
                    maxFeePerBlobGas?: bigint | undefined;
                    maxFeePerGas?: bigint | undefined;
                    maxPriorityFeePerGas?: bigint | undefined;
                    sidecars?: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
                } | {
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: undefined;
                    blobs?: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
                    blobVersionedHashes?: readonly `0x${string}`[] | undefined;
                    maxFeePerBlobGas?: bigint | undefined;
                    maxFeePerGas?: bigint | undefined;
                    maxPriorityFeePerGas?: bigint | undefined;
                    sidecars?: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
                }) & (import("viem").ExactPartial<import("viem").FeeValuesEIP4844> & import("viem").OneOf<{
                    blobs: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
                } | {
                    blobVersionedHashes: readonly `0x${string}`[] | undefined;
                } | {
                    sidecars: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
                }, import("viem").TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: import("viem").SignedAuthorizationList | undefined;
                    blobs?: undefined;
                    blobVersionedHashes?: undefined;
                    gasPrice?: undefined;
                    maxFeePerBlobGas?: undefined;
                    maxFeePerGas?: bigint | undefined;
                    maxPriorityFeePerGas?: bigint | undefined;
                    sidecars?: undefined;
                } | {
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: import("viem").SignedAuthorizationList | undefined;
                    blobs?: undefined;
                    blobVersionedHashes?: undefined;
                    gasPrice?: undefined;
                    maxFeePerBlobGas?: undefined;
                    maxFeePerGas?: bigint | undefined;
                    maxPriorityFeePerGas?: bigint | undefined;
                    sidecars?: undefined;
                }) & {
                    authorizationList: import("viem").SignedAuthorizationList;
                } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)>) ? T_55 extends "eip4844" ? import("viem").TransactionRequestEIP4844 : never : never : never) | ((request["type"] extends string | undefined ? request["type"] : import("viem").GetTransactionType<request, (request extends {
                    accessList?: undefined;
                    authorizationList?: undefined;
                    blobs?: undefined;
                    blobVersionedHashes?: undefined;
                    gasPrice?: bigint | undefined;
                    sidecars?: undefined;
                } & import("viem").FeeValuesLegacy ? "legacy" : never) | (request extends {
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: undefined;
                    blobs?: undefined;
                    blobVersionedHashes?: undefined;
                    gasPrice?: undefined;
                    maxFeePerBlobGas?: undefined;
                    maxFeePerGas?: bigint | undefined;
                    maxPriorityFeePerGas?: bigint | undefined;
                    sidecars?: undefined;
                } & (import("viem").OneOf<{
                    maxFeePerGas: bigint;
                } | {
                    maxPriorityFeePerGas: bigint;
                }, import("viem").FeeValuesEIP1559> & {
                    accessList?: import("viem").AccessList | undefined;
                }) ? "eip1559" : never) | (request extends {
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: undefined;
                    blobs?: undefined;
                    blobVersionedHashes?: undefined;
                    gasPrice?: bigint | undefined;
                    sidecars?: undefined;
                    maxFeePerBlobGas?: undefined;
                    maxFeePerGas?: undefined;
                    maxPriorityFeePerGas?: undefined;
                } & {
                    accessList: import("viem").AccessList | undefined;
                } ? "eip2930" : never) | (request extends ({
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: undefined;
                    blobs?: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
                    blobVersionedHashes?: readonly `0x${string}`[] | undefined;
                    maxFeePerBlobGas?: bigint | undefined;
                    maxFeePerGas?: bigint | undefined;
                    maxPriorityFeePerGas?: bigint | undefined;
                    sidecars?: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
                } | {
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: undefined;
                    blobs?: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
                    blobVersionedHashes?: readonly `0x${string}`[] | undefined;
                    maxFeePerBlobGas?: bigint | undefined;
                    maxFeePerGas?: bigint | undefined;
                    maxPriorityFeePerGas?: bigint | undefined;
                    sidecars?: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
                }) & (import("viem").ExactPartial<import("viem").FeeValuesEIP4844> & import("viem").OneOf<{
                    blobs: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
                } | {
                    blobVersionedHashes: readonly `0x${string}`[] | undefined;
                } | {
                    sidecars: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
                }, import("viem").TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: import("viem").SignedAuthorizationList | undefined;
                    blobs?: undefined;
                    blobVersionedHashes?: undefined;
                    gasPrice?: undefined;
                    maxFeePerBlobGas?: undefined;
                    maxFeePerGas?: bigint | undefined;
                    maxPriorityFeePerGas?: bigint | undefined;
                    sidecars?: undefined;
                } | {
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: import("viem").SignedAuthorizationList | undefined;
                    blobs?: undefined;
                    blobVersionedHashes?: undefined;
                    gasPrice?: undefined;
                    maxFeePerBlobGas?: undefined;
                    maxFeePerGas?: bigint | undefined;
                    maxPriorityFeePerGas?: bigint | undefined;
                    sidecars?: undefined;
                }) & {
                    authorizationList: import("viem").SignedAuthorizationList;
                } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)> extends "legacy" ? unknown : import("viem").GetTransactionType<request, (request extends {
                    accessList?: undefined;
                    authorizationList?: undefined;
                    blobs?: undefined;
                    blobVersionedHashes?: undefined;
                    gasPrice?: bigint | undefined;
                    sidecars?: undefined;
                } & import("viem").FeeValuesLegacy ? "legacy" : never) | (request extends {
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: undefined;
                    blobs?: undefined;
                    blobVersionedHashes?: undefined;
                    gasPrice?: undefined;
                    maxFeePerBlobGas?: undefined;
                    maxFeePerGas?: bigint | undefined;
                    maxPriorityFeePerGas?: bigint | undefined;
                    sidecars?: undefined;
                } & (import("viem").OneOf<{
                    maxFeePerGas: bigint;
                } | {
                    maxPriorityFeePerGas: bigint;
                }, import("viem").FeeValuesEIP1559> & {
                    accessList?: import("viem").AccessList | undefined;
                }) ? "eip1559" : never) | (request extends {
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: undefined;
                    blobs?: undefined;
                    blobVersionedHashes?: undefined;
                    gasPrice?: bigint | undefined;
                    sidecars?: undefined;
                    maxFeePerBlobGas?: undefined;
                    maxFeePerGas?: undefined;
                    maxPriorityFeePerGas?: undefined;
                } & {
                    accessList: import("viem").AccessList | undefined;
                } ? "eip2930" : never) | (request extends ({
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: undefined;
                    blobs?: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
                    blobVersionedHashes?: readonly `0x${string}`[] | undefined;
                    maxFeePerBlobGas?: bigint | undefined;
                    maxFeePerGas?: bigint | undefined;
                    maxPriorityFeePerGas?: bigint | undefined;
                    sidecars?: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
                } | {
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: undefined;
                    blobs?: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
                    blobVersionedHashes?: readonly `0x${string}`[] | undefined;
                    maxFeePerBlobGas?: bigint | undefined;
                    maxFeePerGas?: bigint | undefined;
                    maxPriorityFeePerGas?: bigint | undefined;
                    sidecars?: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
                }) & (import("viem").ExactPartial<import("viem").FeeValuesEIP4844> & import("viem").OneOf<{
                    blobs: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
                } | {
                    blobVersionedHashes: readonly `0x${string}`[] | undefined;
                } | {
                    sidecars: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
                }, import("viem").TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: import("viem").SignedAuthorizationList | undefined;
                    blobs?: undefined;
                    blobVersionedHashes?: undefined;
                    gasPrice?: undefined;
                    maxFeePerBlobGas?: undefined;
                    maxFeePerGas?: bigint | undefined;
                    maxPriorityFeePerGas?: bigint | undefined;
                    sidecars?: undefined;
                } | {
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: import("viem").SignedAuthorizationList | undefined;
                    blobs?: undefined;
                    blobVersionedHashes?: undefined;
                    gasPrice?: undefined;
                    maxFeePerBlobGas?: undefined;
                    maxFeePerGas?: bigint | undefined;
                    maxPriorityFeePerGas?: bigint | undefined;
                    sidecars?: undefined;
                }) & {
                    authorizationList: import("viem").SignedAuthorizationList;
                } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)>) extends infer T_56 ? T_56 extends (request["type"] extends string | undefined ? request["type"] : import("viem").GetTransactionType<request, (request extends {
                    accessList?: undefined;
                    authorizationList?: undefined;
                    blobs?: undefined;
                    blobVersionedHashes?: undefined;
                    gasPrice?: bigint | undefined;
                    sidecars?: undefined;
                } & import("viem").FeeValuesLegacy ? "legacy" : never) | (request extends {
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: undefined;
                    blobs?: undefined;
                    blobVersionedHashes?: undefined;
                    gasPrice?: undefined;
                    maxFeePerBlobGas?: undefined;
                    maxFeePerGas?: bigint | undefined;
                    maxPriorityFeePerGas?: bigint | undefined;
                    sidecars?: undefined;
                } & (import("viem").OneOf<{
                    maxFeePerGas: bigint;
                } | {
                    maxPriorityFeePerGas: bigint;
                }, import("viem").FeeValuesEIP1559> & {
                    accessList?: import("viem").AccessList | undefined;
                }) ? "eip1559" : never) | (request extends {
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: undefined;
                    blobs?: undefined;
                    blobVersionedHashes?: undefined;
                    gasPrice?: bigint | undefined;
                    sidecars?: undefined;
                    maxFeePerBlobGas?: undefined;
                    maxFeePerGas?: undefined;
                    maxPriorityFeePerGas?: undefined;
                } & {
                    accessList: import("viem").AccessList | undefined;
                } ? "eip2930" : never) | (request extends ({
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: undefined;
                    blobs?: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
                    blobVersionedHashes?: readonly `0x${string}`[] | undefined;
                    maxFeePerBlobGas?: bigint | undefined;
                    maxFeePerGas?: bigint | undefined;
                    maxPriorityFeePerGas?: bigint | undefined;
                    sidecars?: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
                } | {
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: undefined;
                    blobs?: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
                    blobVersionedHashes?: readonly `0x${string}`[] | undefined;
                    maxFeePerBlobGas?: bigint | undefined;
                    maxFeePerGas?: bigint | undefined;
                    maxPriorityFeePerGas?: bigint | undefined;
                    sidecars?: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
                }) & (import("viem").ExactPartial<import("viem").FeeValuesEIP4844> & import("viem").OneOf<{
                    blobs: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
                } | {
                    blobVersionedHashes: readonly `0x${string}`[] | undefined;
                } | {
                    sidecars: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
                }, import("viem").TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: import("viem").SignedAuthorizationList | undefined;
                    blobs?: undefined;
                    blobVersionedHashes?: undefined;
                    gasPrice?: undefined;
                    maxFeePerBlobGas?: undefined;
                    maxFeePerGas?: bigint | undefined;
                    maxPriorityFeePerGas?: bigint | undefined;
                    sidecars?: undefined;
                } | {
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: import("viem").SignedAuthorizationList | undefined;
                    blobs?: undefined;
                    blobVersionedHashes?: undefined;
                    gasPrice?: undefined;
                    maxFeePerBlobGas?: undefined;
                    maxFeePerGas?: bigint | undefined;
                    maxPriorityFeePerGas?: bigint | undefined;
                    sidecars?: undefined;
                }) & {
                    authorizationList: import("viem").SignedAuthorizationList;
                } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)> extends "legacy" ? unknown : import("viem").GetTransactionType<request, (request extends {
                    accessList?: undefined;
                    authorizationList?: undefined;
                    blobs?: undefined;
                    blobVersionedHashes?: undefined;
                    gasPrice?: bigint | undefined;
                    sidecars?: undefined;
                } & import("viem").FeeValuesLegacy ? "legacy" : never) | (request extends {
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: undefined;
                    blobs?: undefined;
                    blobVersionedHashes?: undefined;
                    gasPrice?: undefined;
                    maxFeePerBlobGas?: undefined;
                    maxFeePerGas?: bigint | undefined;
                    maxPriorityFeePerGas?: bigint | undefined;
                    sidecars?: undefined;
                } & (import("viem").OneOf<{
                    maxFeePerGas: bigint;
                } | {
                    maxPriorityFeePerGas: bigint;
                }, import("viem").FeeValuesEIP1559> & {
                    accessList?: import("viem").AccessList | undefined;
                }) ? "eip1559" : never) | (request extends {
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: undefined;
                    blobs?: undefined;
                    blobVersionedHashes?: undefined;
                    gasPrice?: bigint | undefined;
                    sidecars?: undefined;
                    maxFeePerBlobGas?: undefined;
                    maxFeePerGas?: undefined;
                    maxPriorityFeePerGas?: undefined;
                } & {
                    accessList: import("viem").AccessList | undefined;
                } ? "eip2930" : never) | (request extends ({
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: undefined;
                    blobs?: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
                    blobVersionedHashes?: readonly `0x${string}`[] | undefined;
                    maxFeePerBlobGas?: bigint | undefined;
                    maxFeePerGas?: bigint | undefined;
                    maxPriorityFeePerGas?: bigint | undefined;
                    sidecars?: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
                } | {
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: undefined;
                    blobs?: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
                    blobVersionedHashes?: readonly `0x${string}`[] | undefined;
                    maxFeePerBlobGas?: bigint | undefined;
                    maxFeePerGas?: bigint | undefined;
                    maxPriorityFeePerGas?: bigint | undefined;
                    sidecars?: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
                }) & (import("viem").ExactPartial<import("viem").FeeValuesEIP4844> & import("viem").OneOf<{
                    blobs: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
                } | {
                    blobVersionedHashes: readonly `0x${string}`[] | undefined;
                } | {
                    sidecars: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
                }, import("viem").TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: import("viem").SignedAuthorizationList | undefined;
                    blobs?: undefined;
                    blobVersionedHashes?: undefined;
                    gasPrice?: undefined;
                    maxFeePerBlobGas?: undefined;
                    maxFeePerGas?: bigint | undefined;
                    maxPriorityFeePerGas?: bigint | undefined;
                    sidecars?: undefined;
                } | {
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: import("viem").SignedAuthorizationList | undefined;
                    blobs?: undefined;
                    blobVersionedHashes?: undefined;
                    gasPrice?: undefined;
                    maxFeePerBlobGas?: undefined;
                    maxFeePerGas?: bigint | undefined;
                    maxPriorityFeePerGas?: bigint | undefined;
                    sidecars?: undefined;
                }) & {
                    authorizationList: import("viem").SignedAuthorizationList;
                } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)>) ? T_56 extends "eip7702" ? import("viem").TransactionRequestEIP7702 : never : never : never)>> & {
                    chainId?: number | undefined;
                }, (request["parameters"] extends readonly import("viem").PrepareTransactionRequestParameterType[] ? request["parameters"][number] : "fees" | "gas" | "nonce" | "blobVersionedHashes" | "chainId" | "type") extends infer T_57 ? T_57 extends (request["parameters"] extends readonly import("viem").PrepareTransactionRequestParameterType[] ? request["parameters"][number] : "fees" | "gas" | "nonce" | "blobVersionedHashes" | "chainId" | "type") ? T_57 extends "fees" ? "gasPrice" | "maxFeePerGas" | "maxPriorityFeePerGas" : T_57 : never : never> & (unknown extends request["kzg"] ? {} : Pick<request, "kzg">) extends infer T_31 ? { [K_1 in keyof T_31]: (import("viem").UnionRequiredBy<Extract<import("viem").UnionOmit<import("viem").ExtractChainFormatterParameters<import("viem").DeriveChain<import("viem").Chain | undefined, chainOverride_2>, "transactionRequest", import("viem").TransactionRequest>, "from"> & (import("viem").DeriveChain<import("viem").Chain | undefined, chainOverride_2> extends infer T_32 ? T_32 extends import("viem").DeriveChain<import("viem").Chain | undefined, chainOverride_2> ? T_32 extends import("viem").Chain ? {
                    chain: T_32;
                } : {
                    chain?: undefined;
                } : never : never) & (import("viem").DeriveAccount<import("viem").Account | undefined, accountOverride> extends infer T_33 ? T_33 extends import("viem").DeriveAccount<import("viem").Account | undefined, accountOverride> ? T_33 extends import("viem").Account ? {
                    account: T_33;
                    from: `0x${string}`;
                } : {
                    account?: undefined;
                    from?: undefined;
                } : never : never), import("viem").IsNever<((request["type"] extends string | undefined ? request["type"] : import("viem").GetTransactionType<request, (request extends {
                    accessList?: undefined;
                    authorizationList?: undefined;
                    blobs?: undefined;
                    blobVersionedHashes?: undefined;
                    gasPrice?: bigint | undefined;
                    sidecars?: undefined;
                } & import("viem").FeeValuesLegacy ? "legacy" : never) | (request extends {
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: undefined;
                    blobs?: undefined;
                    blobVersionedHashes?: undefined;
                    gasPrice?: undefined;
                    maxFeePerBlobGas?: undefined;
                    maxFeePerGas?: bigint | undefined;
                    maxPriorityFeePerGas?: bigint | undefined;
                    sidecars?: undefined;
                } & (import("viem").OneOf<{
                    maxFeePerGas: bigint;
                } | {
                    maxPriorityFeePerGas: bigint;
                }, import("viem").FeeValuesEIP1559> & {
                    accessList?: import("viem").AccessList | undefined;
                }) ? "eip1559" : never) | (request extends {
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: undefined;
                    blobs?: undefined;
                    blobVersionedHashes?: undefined;
                    gasPrice?: bigint | undefined;
                    sidecars?: undefined;
                    maxFeePerBlobGas?: undefined;
                    maxFeePerGas?: undefined;
                    maxPriorityFeePerGas?: undefined;
                } & {
                    accessList: import("viem").AccessList | undefined;
                } ? "eip2930" : never) | (request extends ({
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: undefined;
                    blobs?: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
                    blobVersionedHashes?: readonly `0x${string}`[] | undefined;
                    maxFeePerBlobGas?: bigint | undefined;
                    maxFeePerGas?: bigint | undefined;
                    maxPriorityFeePerGas?: bigint | undefined;
                    sidecars?: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
                } | {
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: undefined;
                    blobs?: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
                    blobVersionedHashes?: readonly `0x${string}`[] | undefined;
                    maxFeePerBlobGas?: bigint | undefined;
                    maxFeePerGas?: bigint | undefined;
                    maxPriorityFeePerGas?: bigint | undefined;
                    sidecars?: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
                }) & (import("viem").ExactPartial<import("viem").FeeValuesEIP4844> & import("viem").OneOf<{
                    blobs: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
                } | {
                    blobVersionedHashes: readonly `0x${string}`[] | undefined;
                } | {
                    sidecars: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
                }, import("viem").TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: import("viem").SignedAuthorizationList | undefined;
                    blobs?: undefined;
                    blobVersionedHashes?: undefined;
                    gasPrice?: undefined;
                    maxFeePerBlobGas?: undefined;
                    maxFeePerGas?: bigint | undefined;
                    maxPriorityFeePerGas?: bigint | undefined;
                    sidecars?: undefined;
                } | {
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: import("viem").SignedAuthorizationList | undefined;
                    blobs?: undefined;
                    blobVersionedHashes?: undefined;
                    gasPrice?: undefined;
                    maxFeePerBlobGas?: undefined;
                    maxFeePerGas?: bigint | undefined;
                    maxPriorityFeePerGas?: bigint | undefined;
                    sidecars?: undefined;
                }) & {
                    authorizationList: import("viem").SignedAuthorizationList;
                } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)> extends "legacy" ? unknown : import("viem").GetTransactionType<request, (request extends {
                    accessList?: undefined;
                    authorizationList?: undefined;
                    blobs?: undefined;
                    blobVersionedHashes?: undefined;
                    gasPrice?: bigint | undefined;
                    sidecars?: undefined;
                } & import("viem").FeeValuesLegacy ? "legacy" : never) | (request extends {
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: undefined;
                    blobs?: undefined;
                    blobVersionedHashes?: undefined;
                    gasPrice?: undefined;
                    maxFeePerBlobGas?: undefined;
                    maxFeePerGas?: bigint | undefined;
                    maxPriorityFeePerGas?: bigint | undefined;
                    sidecars?: undefined;
                } & (import("viem").OneOf<{
                    maxFeePerGas: bigint;
                } | {
                    maxPriorityFeePerGas: bigint;
                }, import("viem").FeeValuesEIP1559> & {
                    accessList?: import("viem").AccessList | undefined;
                }) ? "eip1559" : never) | (request extends {
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: undefined;
                    blobs?: undefined;
                    blobVersionedHashes?: undefined;
                    gasPrice?: bigint | undefined;
                    sidecars?: undefined;
                    maxFeePerBlobGas?: undefined;
                    maxFeePerGas?: undefined;
                    maxPriorityFeePerGas?: undefined;
                } & {
                    accessList: import("viem").AccessList | undefined;
                } ? "eip2930" : never) | (request extends ({
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: undefined;
                    blobs?: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
                    blobVersionedHashes?: readonly `0x${string}`[] | undefined;
                    maxFeePerBlobGas?: bigint | undefined;
                    maxFeePerGas?: bigint | undefined;
                    maxPriorityFeePerGas?: bigint | undefined;
                    sidecars?: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
                } | {
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: undefined;
                    blobs?: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
                    blobVersionedHashes?: readonly `0x${string}`[] | undefined;
                    maxFeePerBlobGas?: bigint | undefined;
                    maxFeePerGas?: bigint | undefined;
                    maxPriorityFeePerGas?: bigint | undefined;
                    sidecars?: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
                }) & (import("viem").ExactPartial<import("viem").FeeValuesEIP4844> & import("viem").OneOf<{
                    blobs: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
                } | {
                    blobVersionedHashes: readonly `0x${string}`[] | undefined;
                } | {
                    sidecars: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
                }, import("viem").TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: import("viem").SignedAuthorizationList | undefined;
                    blobs?: undefined;
                    blobVersionedHashes?: undefined;
                    gasPrice?: undefined;
                    maxFeePerBlobGas?: undefined;
                    maxFeePerGas?: bigint | undefined;
                    maxPriorityFeePerGas?: bigint | undefined;
                    sidecars?: undefined;
                } | {
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: import("viem").SignedAuthorizationList | undefined;
                    blobs?: undefined;
                    blobVersionedHashes?: undefined;
                    gasPrice?: undefined;
                    maxFeePerBlobGas?: undefined;
                    maxFeePerGas?: bigint | undefined;
                    maxPriorityFeePerGas?: bigint | undefined;
                    sidecars?: undefined;
                }) & {
                    authorizationList: import("viem").SignedAuthorizationList;
                } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)>) extends infer T_34 ? T_34 extends (request["type"] extends string | undefined ? request["type"] : import("viem").GetTransactionType<request, (request extends {
                    accessList?: undefined;
                    authorizationList?: undefined;
                    blobs?: undefined;
                    blobVersionedHashes?: undefined;
                    gasPrice?: bigint | undefined;
                    sidecars?: undefined;
                } & import("viem").FeeValuesLegacy ? "legacy" : never) | (request extends {
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: undefined;
                    blobs?: undefined;
                    blobVersionedHashes?: undefined;
                    gasPrice?: undefined;
                    maxFeePerBlobGas?: undefined;
                    maxFeePerGas?: bigint | undefined;
                    maxPriorityFeePerGas?: bigint | undefined;
                    sidecars?: undefined;
                } & (import("viem").OneOf<{
                    maxFeePerGas: bigint;
                } | {
                    maxPriorityFeePerGas: bigint;
                }, import("viem").FeeValuesEIP1559> & {
                    accessList?: import("viem").AccessList | undefined;
                }) ? "eip1559" : never) | (request extends {
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: undefined;
                    blobs?: undefined;
                    blobVersionedHashes?: undefined;
                    gasPrice?: bigint | undefined;
                    sidecars?: undefined;
                    maxFeePerBlobGas?: undefined;
                    maxFeePerGas?: undefined;
                    maxPriorityFeePerGas?: undefined;
                } & {
                    accessList: import("viem").AccessList | undefined;
                } ? "eip2930" : never) | (request extends ({
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: undefined;
                    blobs?: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
                    blobVersionedHashes?: readonly `0x${string}`[] | undefined;
                    maxFeePerBlobGas?: bigint | undefined;
                    maxFeePerGas?: bigint | undefined;
                    maxPriorityFeePerGas?: bigint | undefined;
                    sidecars?: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
                } | {
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: undefined;
                    blobs?: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
                    blobVersionedHashes?: readonly `0x${string}`[] | undefined;
                    maxFeePerBlobGas?: bigint | undefined;
                    maxFeePerGas?: bigint | undefined;
                    maxPriorityFeePerGas?: bigint | undefined;
                    sidecars?: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
                }) & (import("viem").ExactPartial<import("viem").FeeValuesEIP4844> & import("viem").OneOf<{
                    blobs: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
                } | {
                    blobVersionedHashes: readonly `0x${string}`[] | undefined;
                } | {
                    sidecars: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
                }, import("viem").TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: import("viem").SignedAuthorizationList | undefined;
                    blobs?: undefined;
                    blobVersionedHashes?: undefined;
                    gasPrice?: undefined;
                    maxFeePerBlobGas?: undefined;
                    maxFeePerGas?: bigint | undefined;
                    maxPriorityFeePerGas?: bigint | undefined;
                    sidecars?: undefined;
                } | {
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: import("viem").SignedAuthorizationList | undefined;
                    blobs?: undefined;
                    blobVersionedHashes?: undefined;
                    gasPrice?: undefined;
                    maxFeePerBlobGas?: undefined;
                    maxFeePerGas?: bigint | undefined;
                    maxPriorityFeePerGas?: bigint | undefined;
                    sidecars?: undefined;
                }) & {
                    authorizationList: import("viem").SignedAuthorizationList;
                } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)> extends "legacy" ? unknown : import("viem").GetTransactionType<request, (request extends {
                    accessList?: undefined;
                    authorizationList?: undefined;
                    blobs?: undefined;
                    blobVersionedHashes?: undefined;
                    gasPrice?: bigint | undefined;
                    sidecars?: undefined;
                } & import("viem").FeeValuesLegacy ? "legacy" : never) | (request extends {
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: undefined;
                    blobs?: undefined;
                    blobVersionedHashes?: undefined;
                    gasPrice?: undefined;
                    maxFeePerBlobGas?: undefined;
                    maxFeePerGas?: bigint | undefined;
                    maxPriorityFeePerGas?: bigint | undefined;
                    sidecars?: undefined;
                } & (import("viem").OneOf<{
                    maxFeePerGas: bigint;
                } | {
                    maxPriorityFeePerGas: bigint;
                }, import("viem").FeeValuesEIP1559> & {
                    accessList?: import("viem").AccessList | undefined;
                }) ? "eip1559" : never) | (request extends {
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: undefined;
                    blobs?: undefined;
                    blobVersionedHashes?: undefined;
                    gasPrice?: bigint | undefined;
                    sidecars?: undefined;
                    maxFeePerBlobGas?: undefined;
                    maxFeePerGas?: undefined;
                    maxPriorityFeePerGas?: undefined;
                } & {
                    accessList: import("viem").AccessList | undefined;
                } ? "eip2930" : never) | (request extends ({
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: undefined;
                    blobs?: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
                    blobVersionedHashes?: readonly `0x${string}`[] | undefined;
                    maxFeePerBlobGas?: bigint | undefined;
                    maxFeePerGas?: bigint | undefined;
                    maxPriorityFeePerGas?: bigint | undefined;
                    sidecars?: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
                } | {
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: undefined;
                    blobs?: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
                    blobVersionedHashes?: readonly `0x${string}`[] | undefined;
                    maxFeePerBlobGas?: bigint | undefined;
                    maxFeePerGas?: bigint | undefined;
                    maxPriorityFeePerGas?: bigint | undefined;
                    sidecars?: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
                }) & (import("viem").ExactPartial<import("viem").FeeValuesEIP4844> & import("viem").OneOf<{
                    blobs: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
                } | {
                    blobVersionedHashes: readonly `0x${string}`[] | undefined;
                } | {
                    sidecars: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
                }, import("viem").TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: import("viem").SignedAuthorizationList | undefined;
                    blobs?: undefined;
                    blobVersionedHashes?: undefined;
                    gasPrice?: undefined;
                    maxFeePerBlobGas?: undefined;
                    maxFeePerGas?: bigint | undefined;
                    maxPriorityFeePerGas?: bigint | undefined;
                    sidecars?: undefined;
                } | {
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: import("viem").SignedAuthorizationList | undefined;
                    blobs?: undefined;
                    blobVersionedHashes?: undefined;
                    gasPrice?: undefined;
                    maxFeePerBlobGas?: undefined;
                    maxFeePerGas?: bigint | undefined;
                    maxPriorityFeePerGas?: bigint | undefined;
                    sidecars?: undefined;
                }) & {
                    authorizationList: import("viem").SignedAuthorizationList;
                } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)>) ? T_34 extends "legacy" ? import("viem").TransactionRequestLegacy : never : never : never) | ((request["type"] extends string | undefined ? request["type"] : import("viem").GetTransactionType<request, (request extends {
                    accessList?: undefined;
                    authorizationList?: undefined;
                    blobs?: undefined;
                    blobVersionedHashes?: undefined;
                    gasPrice?: bigint | undefined;
                    sidecars?: undefined;
                } & import("viem").FeeValuesLegacy ? "legacy" : never) | (request extends {
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: undefined;
                    blobs?: undefined;
                    blobVersionedHashes?: undefined;
                    gasPrice?: undefined;
                    maxFeePerBlobGas?: undefined;
                    maxFeePerGas?: bigint | undefined;
                    maxPriorityFeePerGas?: bigint | undefined;
                    sidecars?: undefined;
                } & (import("viem").OneOf<{
                    maxFeePerGas: bigint;
                } | {
                    maxPriorityFeePerGas: bigint;
                }, import("viem").FeeValuesEIP1559> & {
                    accessList?: import("viem").AccessList | undefined;
                }) ? "eip1559" : never) | (request extends {
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: undefined;
                    blobs?: undefined;
                    blobVersionedHashes?: undefined;
                    gasPrice?: bigint | undefined;
                    sidecars?: undefined;
                    maxFeePerBlobGas?: undefined;
                    maxFeePerGas?: undefined;
                    maxPriorityFeePerGas?: undefined;
                } & {
                    accessList: import("viem").AccessList | undefined;
                } ? "eip2930" : never) | (request extends ({
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: undefined;
                    blobs?: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
                    blobVersionedHashes?: readonly `0x${string}`[] | undefined;
                    maxFeePerBlobGas?: bigint | undefined;
                    maxFeePerGas?: bigint | undefined;
                    maxPriorityFeePerGas?: bigint | undefined;
                    sidecars?: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
                } | {
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: undefined;
                    blobs?: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
                    blobVersionedHashes?: readonly `0x${string}`[] | undefined;
                    maxFeePerBlobGas?: bigint | undefined;
                    maxFeePerGas?: bigint | undefined;
                    maxPriorityFeePerGas?: bigint | undefined;
                    sidecars?: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
                }) & (import("viem").ExactPartial<import("viem").FeeValuesEIP4844> & import("viem").OneOf<{
                    blobs: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
                } | {
                    blobVersionedHashes: readonly `0x${string}`[] | undefined;
                } | {
                    sidecars: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
                }, import("viem").TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: import("viem").SignedAuthorizationList | undefined;
                    blobs?: undefined;
                    blobVersionedHashes?: undefined;
                    gasPrice?: undefined;
                    maxFeePerBlobGas?: undefined;
                    maxFeePerGas?: bigint | undefined;
                    maxPriorityFeePerGas?: bigint | undefined;
                    sidecars?: undefined;
                } | {
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: import("viem").SignedAuthorizationList | undefined;
                    blobs?: undefined;
                    blobVersionedHashes?: undefined;
                    gasPrice?: undefined;
                    maxFeePerBlobGas?: undefined;
                    maxFeePerGas?: bigint | undefined;
                    maxPriorityFeePerGas?: bigint | undefined;
                    sidecars?: undefined;
                }) & {
                    authorizationList: import("viem").SignedAuthorizationList;
                } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)> extends "legacy" ? unknown : import("viem").GetTransactionType<request, (request extends {
                    accessList?: undefined;
                    authorizationList?: undefined;
                    blobs?: undefined;
                    blobVersionedHashes?: undefined;
                    gasPrice?: bigint | undefined;
                    sidecars?: undefined;
                } & import("viem").FeeValuesLegacy ? "legacy" : never) | (request extends {
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: undefined;
                    blobs?: undefined;
                    blobVersionedHashes?: undefined;
                    gasPrice?: undefined;
                    maxFeePerBlobGas?: undefined;
                    maxFeePerGas?: bigint | undefined;
                    maxPriorityFeePerGas?: bigint | undefined;
                    sidecars?: undefined;
                } & (import("viem").OneOf<{
                    maxFeePerGas: bigint;
                } | {
                    maxPriorityFeePerGas: bigint;
                }, import("viem").FeeValuesEIP1559> & {
                    accessList?: import("viem").AccessList | undefined;
                }) ? "eip1559" : never) | (request extends {
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: undefined;
                    blobs?: undefined;
                    blobVersionedHashes?: undefined;
                    gasPrice?: bigint | undefined;
                    sidecars?: undefined;
                    maxFeePerBlobGas?: undefined;
                    maxFeePerGas?: undefined;
                    maxPriorityFeePerGas?: undefined;
                } & {
                    accessList: import("viem").AccessList | undefined;
                } ? "eip2930" : never) | (request extends ({
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: undefined;
                    blobs?: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
                    blobVersionedHashes?: readonly `0x${string}`[] | undefined;
                    maxFeePerBlobGas?: bigint | undefined;
                    maxFeePerGas?: bigint | undefined;
                    maxPriorityFeePerGas?: bigint | undefined;
                    sidecars?: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
                } | {
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: undefined;
                    blobs?: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
                    blobVersionedHashes?: readonly `0x${string}`[] | undefined;
                    maxFeePerBlobGas?: bigint | undefined;
                    maxFeePerGas?: bigint | undefined;
                    maxPriorityFeePerGas?: bigint | undefined;
                    sidecars?: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
                }) & (import("viem").ExactPartial<import("viem").FeeValuesEIP4844> & import("viem").OneOf<{
                    blobs: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
                } | {
                    blobVersionedHashes: readonly `0x${string}`[] | undefined;
                } | {
                    sidecars: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
                }, import("viem").TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: import("viem").SignedAuthorizationList | undefined;
                    blobs?: undefined;
                    blobVersionedHashes?: undefined;
                    gasPrice?: undefined;
                    maxFeePerBlobGas?: undefined;
                    maxFeePerGas?: bigint | undefined;
                    maxPriorityFeePerGas?: bigint | undefined;
                    sidecars?: undefined;
                } | {
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: import("viem").SignedAuthorizationList | undefined;
                    blobs?: undefined;
                    blobVersionedHashes?: undefined;
                    gasPrice?: undefined;
                    maxFeePerBlobGas?: undefined;
                    maxFeePerGas?: bigint | undefined;
                    maxPriorityFeePerGas?: bigint | undefined;
                    sidecars?: undefined;
                }) & {
                    authorizationList: import("viem").SignedAuthorizationList;
                } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)>) extends infer T_35 ? T_35 extends (request["type"] extends string | undefined ? request["type"] : import("viem").GetTransactionType<request, (request extends {
                    accessList?: undefined;
                    authorizationList?: undefined;
                    blobs?: undefined;
                    blobVersionedHashes?: undefined;
                    gasPrice?: bigint | undefined;
                    sidecars?: undefined;
                } & import("viem").FeeValuesLegacy ? "legacy" : never) | (request extends {
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: undefined;
                    blobs?: undefined;
                    blobVersionedHashes?: undefined;
                    gasPrice?: undefined;
                    maxFeePerBlobGas?: undefined;
                    maxFeePerGas?: bigint | undefined;
                    maxPriorityFeePerGas?: bigint | undefined;
                    sidecars?: undefined;
                } & (import("viem").OneOf<{
                    maxFeePerGas: bigint;
                } | {
                    maxPriorityFeePerGas: bigint;
                }, import("viem").FeeValuesEIP1559> & {
                    accessList?: import("viem").AccessList | undefined;
                }) ? "eip1559" : never) | (request extends {
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: undefined;
                    blobs?: undefined;
                    blobVersionedHashes?: undefined;
                    gasPrice?: bigint | undefined;
                    sidecars?: undefined;
                    maxFeePerBlobGas?: undefined;
                    maxFeePerGas?: undefined;
                    maxPriorityFeePerGas?: undefined;
                } & {
                    accessList: import("viem").AccessList | undefined;
                } ? "eip2930" : never) | (request extends ({
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: undefined;
                    blobs?: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
                    blobVersionedHashes?: readonly `0x${string}`[] | undefined;
                    maxFeePerBlobGas?: bigint | undefined;
                    maxFeePerGas?: bigint | undefined;
                    maxPriorityFeePerGas?: bigint | undefined;
                    sidecars?: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
                } | {
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: undefined;
                    blobs?: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
                    blobVersionedHashes?: readonly `0x${string}`[] | undefined;
                    maxFeePerBlobGas?: bigint | undefined;
                    maxFeePerGas?: bigint | undefined;
                    maxPriorityFeePerGas?: bigint | undefined;
                    sidecars?: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
                }) & (import("viem").ExactPartial<import("viem").FeeValuesEIP4844> & import("viem").OneOf<{
                    blobs: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
                } | {
                    blobVersionedHashes: readonly `0x${string}`[] | undefined;
                } | {
                    sidecars: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
                }, import("viem").TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: import("viem").SignedAuthorizationList | undefined;
                    blobs?: undefined;
                    blobVersionedHashes?: undefined;
                    gasPrice?: undefined;
                    maxFeePerBlobGas?: undefined;
                    maxFeePerGas?: bigint | undefined;
                    maxPriorityFeePerGas?: bigint | undefined;
                    sidecars?: undefined;
                } | {
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: import("viem").SignedAuthorizationList | undefined;
                    blobs?: undefined;
                    blobVersionedHashes?: undefined;
                    gasPrice?: undefined;
                    maxFeePerBlobGas?: undefined;
                    maxFeePerGas?: bigint | undefined;
                    maxPriorityFeePerGas?: bigint | undefined;
                    sidecars?: undefined;
                }) & {
                    authorizationList: import("viem").SignedAuthorizationList;
                } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)> extends "legacy" ? unknown : import("viem").GetTransactionType<request, (request extends {
                    accessList?: undefined;
                    authorizationList?: undefined;
                    blobs?: undefined;
                    blobVersionedHashes?: undefined;
                    gasPrice?: bigint | undefined;
                    sidecars?: undefined;
                } & import("viem").FeeValuesLegacy ? "legacy" : never) | (request extends {
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: undefined;
                    blobs?: undefined;
                    blobVersionedHashes?: undefined;
                    gasPrice?: undefined;
                    maxFeePerBlobGas?: undefined;
                    maxFeePerGas?: bigint | undefined;
                    maxPriorityFeePerGas?: bigint | undefined;
                    sidecars?: undefined;
                } & (import("viem").OneOf<{
                    maxFeePerGas: bigint;
                } | {
                    maxPriorityFeePerGas: bigint;
                }, import("viem").FeeValuesEIP1559> & {
                    accessList?: import("viem").AccessList | undefined;
                }) ? "eip1559" : never) | (request extends {
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: undefined;
                    blobs?: undefined;
                    blobVersionedHashes?: undefined;
                    gasPrice?: bigint | undefined;
                    sidecars?: undefined;
                    maxFeePerBlobGas?: undefined;
                    maxFeePerGas?: undefined;
                    maxPriorityFeePerGas?: undefined;
                } & {
                    accessList: import("viem").AccessList | undefined;
                } ? "eip2930" : never) | (request extends ({
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: undefined;
                    blobs?: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
                    blobVersionedHashes?: readonly `0x${string}`[] | undefined;
                    maxFeePerBlobGas?: bigint | undefined;
                    maxFeePerGas?: bigint | undefined;
                    maxPriorityFeePerGas?: bigint | undefined;
                    sidecars?: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
                } | {
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: undefined;
                    blobs?: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
                    blobVersionedHashes?: readonly `0x${string}`[] | undefined;
                    maxFeePerBlobGas?: bigint | undefined;
                    maxFeePerGas?: bigint | undefined;
                    maxPriorityFeePerGas?: bigint | undefined;
                    sidecars?: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
                }) & (import("viem").ExactPartial<import("viem").FeeValuesEIP4844> & import("viem").OneOf<{
                    blobs: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
                } | {
                    blobVersionedHashes: readonly `0x${string}`[] | undefined;
                } | {
                    sidecars: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
                }, import("viem").TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: import("viem").SignedAuthorizationList | undefined;
                    blobs?: undefined;
                    blobVersionedHashes?: undefined;
                    gasPrice?: undefined;
                    maxFeePerBlobGas?: undefined;
                    maxFeePerGas?: bigint | undefined;
                    maxPriorityFeePerGas?: bigint | undefined;
                    sidecars?: undefined;
                } | {
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: import("viem").SignedAuthorizationList | undefined;
                    blobs?: undefined;
                    blobVersionedHashes?: undefined;
                    gasPrice?: undefined;
                    maxFeePerBlobGas?: undefined;
                    maxFeePerGas?: bigint | undefined;
                    maxPriorityFeePerGas?: bigint | undefined;
                    sidecars?: undefined;
                }) & {
                    authorizationList: import("viem").SignedAuthorizationList;
                } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)>) ? T_35 extends "eip1559" ? import("viem").TransactionRequestEIP1559 : never : never : never) | ((request["type"] extends string | undefined ? request["type"] : import("viem").GetTransactionType<request, (request extends {
                    accessList?: undefined;
                    authorizationList?: undefined;
                    blobs?: undefined;
                    blobVersionedHashes?: undefined;
                    gasPrice?: bigint | undefined;
                    sidecars?: undefined;
                } & import("viem").FeeValuesLegacy ? "legacy" : never) | (request extends {
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: undefined;
                    blobs?: undefined;
                    blobVersionedHashes?: undefined;
                    gasPrice?: undefined;
                    maxFeePerBlobGas?: undefined;
                    maxFeePerGas?: bigint | undefined;
                    maxPriorityFeePerGas?: bigint | undefined;
                    sidecars?: undefined;
                } & (import("viem").OneOf<{
                    maxFeePerGas: bigint;
                } | {
                    maxPriorityFeePerGas: bigint;
                }, import("viem").FeeValuesEIP1559> & {
                    accessList?: import("viem").AccessList | undefined;
                }) ? "eip1559" : never) | (request extends {
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: undefined;
                    blobs?: undefined;
                    blobVersionedHashes?: undefined;
                    gasPrice?: bigint | undefined;
                    sidecars?: undefined;
                    maxFeePerBlobGas?: undefined;
                    maxFeePerGas?: undefined;
                    maxPriorityFeePerGas?: undefined;
                } & {
                    accessList: import("viem").AccessList | undefined;
                } ? "eip2930" : never) | (request extends ({
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: undefined;
                    blobs?: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
                    blobVersionedHashes?: readonly `0x${string}`[] | undefined;
                    maxFeePerBlobGas?: bigint | undefined;
                    maxFeePerGas?: bigint | undefined;
                    maxPriorityFeePerGas?: bigint | undefined;
                    sidecars?: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
                } | {
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: undefined;
                    blobs?: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
                    blobVersionedHashes?: readonly `0x${string}`[] | undefined;
                    maxFeePerBlobGas?: bigint | undefined;
                    maxFeePerGas?: bigint | undefined;
                    maxPriorityFeePerGas?: bigint | undefined;
                    sidecars?: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
                }) & (import("viem").ExactPartial<import("viem").FeeValuesEIP4844> & import("viem").OneOf<{
                    blobs: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
                } | {
                    blobVersionedHashes: readonly `0x${string}`[] | undefined;
                } | {
                    sidecars: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
                }, import("viem").TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: import("viem").SignedAuthorizationList | undefined;
                    blobs?: undefined;
                    blobVersionedHashes?: undefined;
                    gasPrice?: undefined;
                    maxFeePerBlobGas?: undefined;
                    maxFeePerGas?: bigint | undefined;
                    maxPriorityFeePerGas?: bigint | undefined;
                    sidecars?: undefined;
                } | {
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: import("viem").SignedAuthorizationList | undefined;
                    blobs?: undefined;
                    blobVersionedHashes?: undefined;
                    gasPrice?: undefined;
                    maxFeePerBlobGas?: undefined;
                    maxFeePerGas?: bigint | undefined;
                    maxPriorityFeePerGas?: bigint | undefined;
                    sidecars?: undefined;
                }) & {
                    authorizationList: import("viem").SignedAuthorizationList;
                } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)> extends "legacy" ? unknown : import("viem").GetTransactionType<request, (request extends {
                    accessList?: undefined;
                    authorizationList?: undefined;
                    blobs?: undefined;
                    blobVersionedHashes?: undefined;
                    gasPrice?: bigint | undefined;
                    sidecars?: undefined;
                } & import("viem").FeeValuesLegacy ? "legacy" : never) | (request extends {
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: undefined;
                    blobs?: undefined;
                    blobVersionedHashes?: undefined;
                    gasPrice?: undefined;
                    maxFeePerBlobGas?: undefined;
                    maxFeePerGas?: bigint | undefined;
                    maxPriorityFeePerGas?: bigint | undefined;
                    sidecars?: undefined;
                } & (import("viem").OneOf<{
                    maxFeePerGas: bigint;
                } | {
                    maxPriorityFeePerGas: bigint;
                }, import("viem").FeeValuesEIP1559> & {
                    accessList?: import("viem").AccessList | undefined;
                }) ? "eip1559" : never) | (request extends {
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: undefined;
                    blobs?: undefined;
                    blobVersionedHashes?: undefined;
                    gasPrice?: bigint | undefined;
                    sidecars?: undefined;
                    maxFeePerBlobGas?: undefined;
                    maxFeePerGas?: undefined;
                    maxPriorityFeePerGas?: undefined;
                } & {
                    accessList: import("viem").AccessList | undefined;
                } ? "eip2930" : never) | (request extends ({
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: undefined;
                    blobs?: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
                    blobVersionedHashes?: readonly `0x${string}`[] | undefined;
                    maxFeePerBlobGas?: bigint | undefined;
                    maxFeePerGas?: bigint | undefined;
                    maxPriorityFeePerGas?: bigint | undefined;
                    sidecars?: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
                } | {
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: undefined;
                    blobs?: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
                    blobVersionedHashes?: readonly `0x${string}`[] | undefined;
                    maxFeePerBlobGas?: bigint | undefined;
                    maxFeePerGas?: bigint | undefined;
                    maxPriorityFeePerGas?: bigint | undefined;
                    sidecars?: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
                }) & (import("viem").ExactPartial<import("viem").FeeValuesEIP4844> & import("viem").OneOf<{
                    blobs: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
                } | {
                    blobVersionedHashes: readonly `0x${string}`[] | undefined;
                } | {
                    sidecars: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
                }, import("viem").TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: import("viem").SignedAuthorizationList | undefined;
                    blobs?: undefined;
                    blobVersionedHashes?: undefined;
                    gasPrice?: undefined;
                    maxFeePerBlobGas?: undefined;
                    maxFeePerGas?: bigint | undefined;
                    maxPriorityFeePerGas?: bigint | undefined;
                    sidecars?: undefined;
                } | {
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: import("viem").SignedAuthorizationList | undefined;
                    blobs?: undefined;
                    blobVersionedHashes?: undefined;
                    gasPrice?: undefined;
                    maxFeePerBlobGas?: undefined;
                    maxFeePerGas?: bigint | undefined;
                    maxPriorityFeePerGas?: bigint | undefined;
                    sidecars?: undefined;
                }) & {
                    authorizationList: import("viem").SignedAuthorizationList;
                } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)>) extends infer T_36 ? T_36 extends (request["type"] extends string | undefined ? request["type"] : import("viem").GetTransactionType<request, (request extends {
                    accessList?: undefined;
                    authorizationList?: undefined;
                    blobs?: undefined;
                    blobVersionedHashes?: undefined;
                    gasPrice?: bigint | undefined;
                    sidecars?: undefined;
                } & import("viem").FeeValuesLegacy ? "legacy" : never) | (request extends {
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: undefined;
                    blobs?: undefined;
                    blobVersionedHashes?: undefined;
                    gasPrice?: undefined;
                    maxFeePerBlobGas?: undefined;
                    maxFeePerGas?: bigint | undefined;
                    maxPriorityFeePerGas?: bigint | undefined;
                    sidecars?: undefined;
                } & (import("viem").OneOf<{
                    maxFeePerGas: bigint;
                } | {
                    maxPriorityFeePerGas: bigint;
                }, import("viem").FeeValuesEIP1559> & {
                    accessList?: import("viem").AccessList | undefined;
                }) ? "eip1559" : never) | (request extends {
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: undefined;
                    blobs?: undefined;
                    blobVersionedHashes?: undefined;
                    gasPrice?: bigint | undefined;
                    sidecars?: undefined;
                    maxFeePerBlobGas?: undefined;
                    maxFeePerGas?: undefined;
                    maxPriorityFeePerGas?: undefined;
                } & {
                    accessList: import("viem").AccessList | undefined;
                } ? "eip2930" : never) | (request extends ({
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: undefined;
                    blobs?: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
                    blobVersionedHashes?: readonly `0x${string}`[] | undefined;
                    maxFeePerBlobGas?: bigint | undefined;
                    maxFeePerGas?: bigint | undefined;
                    maxPriorityFeePerGas?: bigint | undefined;
                    sidecars?: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
                } | {
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: undefined;
                    blobs?: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
                    blobVersionedHashes?: readonly `0x${string}`[] | undefined;
                    maxFeePerBlobGas?: bigint | undefined;
                    maxFeePerGas?: bigint | undefined;
                    maxPriorityFeePerGas?: bigint | undefined;
                    sidecars?: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
                }) & (import("viem").ExactPartial<import("viem").FeeValuesEIP4844> & import("viem").OneOf<{
                    blobs: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
                } | {
                    blobVersionedHashes: readonly `0x${string}`[] | undefined;
                } | {
                    sidecars: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
                }, import("viem").TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: import("viem").SignedAuthorizationList | undefined;
                    blobs?: undefined;
                    blobVersionedHashes?: undefined;
                    gasPrice?: undefined;
                    maxFeePerBlobGas?: undefined;
                    maxFeePerGas?: bigint | undefined;
                    maxPriorityFeePerGas?: bigint | undefined;
                    sidecars?: undefined;
                } | {
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: import("viem").SignedAuthorizationList | undefined;
                    blobs?: undefined;
                    blobVersionedHashes?: undefined;
                    gasPrice?: undefined;
                    maxFeePerBlobGas?: undefined;
                    maxFeePerGas?: bigint | undefined;
                    maxPriorityFeePerGas?: bigint | undefined;
                    sidecars?: undefined;
                }) & {
                    authorizationList: import("viem").SignedAuthorizationList;
                } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)> extends "legacy" ? unknown : import("viem").GetTransactionType<request, (request extends {
                    accessList?: undefined;
                    authorizationList?: undefined;
                    blobs?: undefined;
                    blobVersionedHashes?: undefined;
                    gasPrice?: bigint | undefined;
                    sidecars?: undefined;
                } & import("viem").FeeValuesLegacy ? "legacy" : never) | (request extends {
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: undefined;
                    blobs?: undefined;
                    blobVersionedHashes?: undefined;
                    gasPrice?: undefined;
                    maxFeePerBlobGas?: undefined;
                    maxFeePerGas?: bigint | undefined;
                    maxPriorityFeePerGas?: bigint | undefined;
                    sidecars?: undefined;
                } & (import("viem").OneOf<{
                    maxFeePerGas: bigint;
                } | {
                    maxPriorityFeePerGas: bigint;
                }, import("viem").FeeValuesEIP1559> & {
                    accessList?: import("viem").AccessList | undefined;
                }) ? "eip1559" : never) | (request extends {
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: undefined;
                    blobs?: undefined;
                    blobVersionedHashes?: undefined;
                    gasPrice?: bigint | undefined;
                    sidecars?: undefined;
                    maxFeePerBlobGas?: undefined;
                    maxFeePerGas?: undefined;
                    maxPriorityFeePerGas?: undefined;
                } & {
                    accessList: import("viem").AccessList | undefined;
                } ? "eip2930" : never) | (request extends ({
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: undefined;
                    blobs?: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
                    blobVersionedHashes?: readonly `0x${string}`[] | undefined;
                    maxFeePerBlobGas?: bigint | undefined;
                    maxFeePerGas?: bigint | undefined;
                    maxPriorityFeePerGas?: bigint | undefined;
                    sidecars?: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
                } | {
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: undefined;
                    blobs?: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
                    blobVersionedHashes?: readonly `0x${string}`[] | undefined;
                    maxFeePerBlobGas?: bigint | undefined;
                    maxFeePerGas?: bigint | undefined;
                    maxPriorityFeePerGas?: bigint | undefined;
                    sidecars?: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
                }) & (import("viem").ExactPartial<import("viem").FeeValuesEIP4844> & import("viem").OneOf<{
                    blobs: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
                } | {
                    blobVersionedHashes: readonly `0x${string}`[] | undefined;
                } | {
                    sidecars: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
                }, import("viem").TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: import("viem").SignedAuthorizationList | undefined;
                    blobs?: undefined;
                    blobVersionedHashes?: undefined;
                    gasPrice?: undefined;
                    maxFeePerBlobGas?: undefined;
                    maxFeePerGas?: bigint | undefined;
                    maxPriorityFeePerGas?: bigint | undefined;
                    sidecars?: undefined;
                } | {
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: import("viem").SignedAuthorizationList | undefined;
                    blobs?: undefined;
                    blobVersionedHashes?: undefined;
                    gasPrice?: undefined;
                    maxFeePerBlobGas?: undefined;
                    maxFeePerGas?: bigint | undefined;
                    maxPriorityFeePerGas?: bigint | undefined;
                    sidecars?: undefined;
                }) & {
                    authorizationList: import("viem").SignedAuthorizationList;
                } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)>) ? T_36 extends "eip2930" ? import("viem").TransactionRequestEIP2930 : never : never : never) | ((request["type"] extends string | undefined ? request["type"] : import("viem").GetTransactionType<request, (request extends {
                    accessList?: undefined;
                    authorizationList?: undefined;
                    blobs?: undefined;
                    blobVersionedHashes?: undefined;
                    gasPrice?: bigint | undefined;
                    sidecars?: undefined;
                } & import("viem").FeeValuesLegacy ? "legacy" : never) | (request extends {
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: undefined;
                    blobs?: undefined;
                    blobVersionedHashes?: undefined;
                    gasPrice?: undefined;
                    maxFeePerBlobGas?: undefined;
                    maxFeePerGas?: bigint | undefined;
                    maxPriorityFeePerGas?: bigint | undefined;
                    sidecars?: undefined;
                } & (import("viem").OneOf<{
                    maxFeePerGas: bigint;
                } | {
                    maxPriorityFeePerGas: bigint;
                }, import("viem").FeeValuesEIP1559> & {
                    accessList?: import("viem").AccessList | undefined;
                }) ? "eip1559" : never) | (request extends {
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: undefined;
                    blobs?: undefined;
                    blobVersionedHashes?: undefined;
                    gasPrice?: bigint | undefined;
                    sidecars?: undefined;
                    maxFeePerBlobGas?: undefined;
                    maxFeePerGas?: undefined;
                    maxPriorityFeePerGas?: undefined;
                } & {
                    accessList: import("viem").AccessList | undefined;
                } ? "eip2930" : never) | (request extends ({
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: undefined;
                    blobs?: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
                    blobVersionedHashes?: readonly `0x${string}`[] | undefined;
                    maxFeePerBlobGas?: bigint | undefined;
                    maxFeePerGas?: bigint | undefined;
                    maxPriorityFeePerGas?: bigint | undefined;
                    sidecars?: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
                } | {
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: undefined;
                    blobs?: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
                    blobVersionedHashes?: readonly `0x${string}`[] | undefined;
                    maxFeePerBlobGas?: bigint | undefined;
                    maxFeePerGas?: bigint | undefined;
                    maxPriorityFeePerGas?: bigint | undefined;
                    sidecars?: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
                }) & (import("viem").ExactPartial<import("viem").FeeValuesEIP4844> & import("viem").OneOf<{
                    blobs: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
                } | {
                    blobVersionedHashes: readonly `0x${string}`[] | undefined;
                } | {
                    sidecars: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
                }, import("viem").TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: import("viem").SignedAuthorizationList | undefined;
                    blobs?: undefined;
                    blobVersionedHashes?: undefined;
                    gasPrice?: undefined;
                    maxFeePerBlobGas?: undefined;
                    maxFeePerGas?: bigint | undefined;
                    maxPriorityFeePerGas?: bigint | undefined;
                    sidecars?: undefined;
                } | {
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: import("viem").SignedAuthorizationList | undefined;
                    blobs?: undefined;
                    blobVersionedHashes?: undefined;
                    gasPrice?: undefined;
                    maxFeePerBlobGas?: undefined;
                    maxFeePerGas?: bigint | undefined;
                    maxPriorityFeePerGas?: bigint | undefined;
                    sidecars?: undefined;
                }) & {
                    authorizationList: import("viem").SignedAuthorizationList;
                } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)> extends "legacy" ? unknown : import("viem").GetTransactionType<request, (request extends {
                    accessList?: undefined;
                    authorizationList?: undefined;
                    blobs?: undefined;
                    blobVersionedHashes?: undefined;
                    gasPrice?: bigint | undefined;
                    sidecars?: undefined;
                } & import("viem").FeeValuesLegacy ? "legacy" : never) | (request extends {
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: undefined;
                    blobs?: undefined;
                    blobVersionedHashes?: undefined;
                    gasPrice?: undefined;
                    maxFeePerBlobGas?: undefined;
                    maxFeePerGas?: bigint | undefined;
                    maxPriorityFeePerGas?: bigint | undefined;
                    sidecars?: undefined;
                } & (import("viem").OneOf<{
                    maxFeePerGas: bigint;
                } | {
                    maxPriorityFeePerGas: bigint;
                }, import("viem").FeeValuesEIP1559> & {
                    accessList?: import("viem").AccessList | undefined;
                }) ? "eip1559" : never) | (request extends {
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: undefined;
                    blobs?: undefined;
                    blobVersionedHashes?: undefined;
                    gasPrice?: bigint | undefined;
                    sidecars?: undefined;
                    maxFeePerBlobGas?: undefined;
                    maxFeePerGas?: undefined;
                    maxPriorityFeePerGas?: undefined;
                } & {
                    accessList: import("viem").AccessList | undefined;
                } ? "eip2930" : never) | (request extends ({
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: undefined;
                    blobs?: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
                    blobVersionedHashes?: readonly `0x${string}`[] | undefined;
                    maxFeePerBlobGas?: bigint | undefined;
                    maxFeePerGas?: bigint | undefined;
                    maxPriorityFeePerGas?: bigint | undefined;
                    sidecars?: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
                } | {
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: undefined;
                    blobs?: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
                    blobVersionedHashes?: readonly `0x${string}`[] | undefined;
                    maxFeePerBlobGas?: bigint | undefined;
                    maxFeePerGas?: bigint | undefined;
                    maxPriorityFeePerGas?: bigint | undefined;
                    sidecars?: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
                }) & (import("viem").ExactPartial<import("viem").FeeValuesEIP4844> & import("viem").OneOf<{
                    blobs: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
                } | {
                    blobVersionedHashes: readonly `0x${string}`[] | undefined;
                } | {
                    sidecars: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
                }, import("viem").TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: import("viem").SignedAuthorizationList | undefined;
                    blobs?: undefined;
                    blobVersionedHashes?: undefined;
                    gasPrice?: undefined;
                    maxFeePerBlobGas?: undefined;
                    maxFeePerGas?: bigint | undefined;
                    maxPriorityFeePerGas?: bigint | undefined;
                    sidecars?: undefined;
                } | {
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: import("viem").SignedAuthorizationList | undefined;
                    blobs?: undefined;
                    blobVersionedHashes?: undefined;
                    gasPrice?: undefined;
                    maxFeePerBlobGas?: undefined;
                    maxFeePerGas?: bigint | undefined;
                    maxPriorityFeePerGas?: bigint | undefined;
                    sidecars?: undefined;
                }) & {
                    authorizationList: import("viem").SignedAuthorizationList;
                } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)>) extends infer T_37 ? T_37 extends (request["type"] extends string | undefined ? request["type"] : import("viem").GetTransactionType<request, (request extends {
                    accessList?: undefined;
                    authorizationList?: undefined;
                    blobs?: undefined;
                    blobVersionedHashes?: undefined;
                    gasPrice?: bigint | undefined;
                    sidecars?: undefined;
                } & import("viem").FeeValuesLegacy ? "legacy" : never) | (request extends {
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: undefined;
                    blobs?: undefined;
                    blobVersionedHashes?: undefined;
                    gasPrice?: undefined;
                    maxFeePerBlobGas?: undefined;
                    maxFeePerGas?: bigint | undefined;
                    maxPriorityFeePerGas?: bigint | undefined;
                    sidecars?: undefined;
                } & (import("viem").OneOf<{
                    maxFeePerGas: bigint;
                } | {
                    maxPriorityFeePerGas: bigint;
                }, import("viem").FeeValuesEIP1559> & {
                    accessList?: import("viem").AccessList | undefined;
                }) ? "eip1559" : never) | (request extends {
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: undefined;
                    blobs?: undefined;
                    blobVersionedHashes?: undefined;
                    gasPrice?: bigint | undefined;
                    sidecars?: undefined;
                    maxFeePerBlobGas?: undefined;
                    maxFeePerGas?: undefined;
                    maxPriorityFeePerGas?: undefined;
                } & {
                    accessList: import("viem").AccessList | undefined;
                } ? "eip2930" : never) | (request extends ({
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: undefined;
                    blobs?: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
                    blobVersionedHashes?: readonly `0x${string}`[] | undefined;
                    maxFeePerBlobGas?: bigint | undefined;
                    maxFeePerGas?: bigint | undefined;
                    maxPriorityFeePerGas?: bigint | undefined;
                    sidecars?: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
                } | {
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: undefined;
                    blobs?: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
                    blobVersionedHashes?: readonly `0x${string}`[] | undefined;
                    maxFeePerBlobGas?: bigint | undefined;
                    maxFeePerGas?: bigint | undefined;
                    maxPriorityFeePerGas?: bigint | undefined;
                    sidecars?: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
                }) & (import("viem").ExactPartial<import("viem").FeeValuesEIP4844> & import("viem").OneOf<{
                    blobs: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
                } | {
                    blobVersionedHashes: readonly `0x${string}`[] | undefined;
                } | {
                    sidecars: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
                }, import("viem").TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: import("viem").SignedAuthorizationList | undefined;
                    blobs?: undefined;
                    blobVersionedHashes?: undefined;
                    gasPrice?: undefined;
                    maxFeePerBlobGas?: undefined;
                    maxFeePerGas?: bigint | undefined;
                    maxPriorityFeePerGas?: bigint | undefined;
                    sidecars?: undefined;
                } | {
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: import("viem").SignedAuthorizationList | undefined;
                    blobs?: undefined;
                    blobVersionedHashes?: undefined;
                    gasPrice?: undefined;
                    maxFeePerBlobGas?: undefined;
                    maxFeePerGas?: bigint | undefined;
                    maxPriorityFeePerGas?: bigint | undefined;
                    sidecars?: undefined;
                }) & {
                    authorizationList: import("viem").SignedAuthorizationList;
                } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)> extends "legacy" ? unknown : import("viem").GetTransactionType<request, (request extends {
                    accessList?: undefined;
                    authorizationList?: undefined;
                    blobs?: undefined;
                    blobVersionedHashes?: undefined;
                    gasPrice?: bigint | undefined;
                    sidecars?: undefined;
                } & import("viem").FeeValuesLegacy ? "legacy" : never) | (request extends {
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: undefined;
                    blobs?: undefined;
                    blobVersionedHashes?: undefined;
                    gasPrice?: undefined;
                    maxFeePerBlobGas?: undefined;
                    maxFeePerGas?: bigint | undefined;
                    maxPriorityFeePerGas?: bigint | undefined;
                    sidecars?: undefined;
                } & (import("viem").OneOf<{
                    maxFeePerGas: bigint;
                } | {
                    maxPriorityFeePerGas: bigint;
                }, import("viem").FeeValuesEIP1559> & {
                    accessList?: import("viem").AccessList | undefined;
                }) ? "eip1559" : never) | (request extends {
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: undefined;
                    blobs?: undefined;
                    blobVersionedHashes?: undefined;
                    gasPrice?: bigint | undefined;
                    sidecars?: undefined;
                    maxFeePerBlobGas?: undefined;
                    maxFeePerGas?: undefined;
                    maxPriorityFeePerGas?: undefined;
                } & {
                    accessList: import("viem").AccessList | undefined;
                } ? "eip2930" : never) | (request extends ({
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: undefined;
                    blobs?: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
                    blobVersionedHashes?: readonly `0x${string}`[] | undefined;
                    maxFeePerBlobGas?: bigint | undefined;
                    maxFeePerGas?: bigint | undefined;
                    maxPriorityFeePerGas?: bigint | undefined;
                    sidecars?: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
                } | {
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: undefined;
                    blobs?: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
                    blobVersionedHashes?: readonly `0x${string}`[] | undefined;
                    maxFeePerBlobGas?: bigint | undefined;
                    maxFeePerGas?: bigint | undefined;
                    maxPriorityFeePerGas?: bigint | undefined;
                    sidecars?: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
                }) & (import("viem").ExactPartial<import("viem").FeeValuesEIP4844> & import("viem").OneOf<{
                    blobs: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
                } | {
                    blobVersionedHashes: readonly `0x${string}`[] | undefined;
                } | {
                    sidecars: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
                }, import("viem").TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: import("viem").SignedAuthorizationList | undefined;
                    blobs?: undefined;
                    blobVersionedHashes?: undefined;
                    gasPrice?: undefined;
                    maxFeePerBlobGas?: undefined;
                    maxFeePerGas?: bigint | undefined;
                    maxPriorityFeePerGas?: bigint | undefined;
                    sidecars?: undefined;
                } | {
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: import("viem").SignedAuthorizationList | undefined;
                    blobs?: undefined;
                    blobVersionedHashes?: undefined;
                    gasPrice?: undefined;
                    maxFeePerBlobGas?: undefined;
                    maxFeePerGas?: bigint | undefined;
                    maxPriorityFeePerGas?: bigint | undefined;
                    sidecars?: undefined;
                }) & {
                    authorizationList: import("viem").SignedAuthorizationList;
                } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)>) ? T_37 extends "eip4844" ? import("viem").TransactionRequestEIP4844 : never : never : never) | ((request["type"] extends string | undefined ? request["type"] : import("viem").GetTransactionType<request, (request extends {
                    accessList?: undefined;
                    authorizationList?: undefined;
                    blobs?: undefined;
                    blobVersionedHashes?: undefined;
                    gasPrice?: bigint | undefined;
                    sidecars?: undefined;
                } & import("viem").FeeValuesLegacy ? "legacy" : never) | (request extends {
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: undefined;
                    blobs?: undefined;
                    blobVersionedHashes?: undefined;
                    gasPrice?: undefined;
                    maxFeePerBlobGas?: undefined;
                    maxFeePerGas?: bigint | undefined;
                    maxPriorityFeePerGas?: bigint | undefined;
                    sidecars?: undefined;
                } & (import("viem").OneOf<{
                    maxFeePerGas: bigint;
                } | {
                    maxPriorityFeePerGas: bigint;
                }, import("viem").FeeValuesEIP1559> & {
                    accessList?: import("viem").AccessList | undefined;
                }) ? "eip1559" : never) | (request extends {
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: undefined;
                    blobs?: undefined;
                    blobVersionedHashes?: undefined;
                    gasPrice?: bigint | undefined;
                    sidecars?: undefined;
                    maxFeePerBlobGas?: undefined;
                    maxFeePerGas?: undefined;
                    maxPriorityFeePerGas?: undefined;
                } & {
                    accessList: import("viem").AccessList | undefined;
                } ? "eip2930" : never) | (request extends ({
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: undefined;
                    blobs?: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
                    blobVersionedHashes?: readonly `0x${string}`[] | undefined;
                    maxFeePerBlobGas?: bigint | undefined;
                    maxFeePerGas?: bigint | undefined;
                    maxPriorityFeePerGas?: bigint | undefined;
                    sidecars?: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
                } | {
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: undefined;
                    blobs?: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
                    blobVersionedHashes?: readonly `0x${string}`[] | undefined;
                    maxFeePerBlobGas?: bigint | undefined;
                    maxFeePerGas?: bigint | undefined;
                    maxPriorityFeePerGas?: bigint | undefined;
                    sidecars?: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
                }) & (import("viem").ExactPartial<import("viem").FeeValuesEIP4844> & import("viem").OneOf<{
                    blobs: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
                } | {
                    blobVersionedHashes: readonly `0x${string}`[] | undefined;
                } | {
                    sidecars: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
                }, import("viem").TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: import("viem").SignedAuthorizationList | undefined;
                    blobs?: undefined;
                    blobVersionedHashes?: undefined;
                    gasPrice?: undefined;
                    maxFeePerBlobGas?: undefined;
                    maxFeePerGas?: bigint | undefined;
                    maxPriorityFeePerGas?: bigint | undefined;
                    sidecars?: undefined;
                } | {
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: import("viem").SignedAuthorizationList | undefined;
                    blobs?: undefined;
                    blobVersionedHashes?: undefined;
                    gasPrice?: undefined;
                    maxFeePerBlobGas?: undefined;
                    maxFeePerGas?: bigint | undefined;
                    maxPriorityFeePerGas?: bigint | undefined;
                    sidecars?: undefined;
                }) & {
                    authorizationList: import("viem").SignedAuthorizationList;
                } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)> extends "legacy" ? unknown : import("viem").GetTransactionType<request, (request extends {
                    accessList?: undefined;
                    authorizationList?: undefined;
                    blobs?: undefined;
                    blobVersionedHashes?: undefined;
                    gasPrice?: bigint | undefined;
                    sidecars?: undefined;
                } & import("viem").FeeValuesLegacy ? "legacy" : never) | (request extends {
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: undefined;
                    blobs?: undefined;
                    blobVersionedHashes?: undefined;
                    gasPrice?: undefined;
                    maxFeePerBlobGas?: undefined;
                    maxFeePerGas?: bigint | undefined;
                    maxPriorityFeePerGas?: bigint | undefined;
                    sidecars?: undefined;
                } & (import("viem").OneOf<{
                    maxFeePerGas: bigint;
                } | {
                    maxPriorityFeePerGas: bigint;
                }, import("viem").FeeValuesEIP1559> & {
                    accessList?: import("viem").AccessList | undefined;
                }) ? "eip1559" : never) | (request extends {
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: undefined;
                    blobs?: undefined;
                    blobVersionedHashes?: undefined;
                    gasPrice?: bigint | undefined;
                    sidecars?: undefined;
                    maxFeePerBlobGas?: undefined;
                    maxFeePerGas?: undefined;
                    maxPriorityFeePerGas?: undefined;
                } & {
                    accessList: import("viem").AccessList | undefined;
                } ? "eip2930" : never) | (request extends ({
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: undefined;
                    blobs?: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
                    blobVersionedHashes?: readonly `0x${string}`[] | undefined;
                    maxFeePerBlobGas?: bigint | undefined;
                    maxFeePerGas?: bigint | undefined;
                    maxPriorityFeePerGas?: bigint | undefined;
                    sidecars?: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
                } | {
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: undefined;
                    blobs?: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
                    blobVersionedHashes?: readonly `0x${string}`[] | undefined;
                    maxFeePerBlobGas?: bigint | undefined;
                    maxFeePerGas?: bigint | undefined;
                    maxPriorityFeePerGas?: bigint | undefined;
                    sidecars?: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
                }) & (import("viem").ExactPartial<import("viem").FeeValuesEIP4844> & import("viem").OneOf<{
                    blobs: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
                } | {
                    blobVersionedHashes: readonly `0x${string}`[] | undefined;
                } | {
                    sidecars: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
                }, import("viem").TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: import("viem").SignedAuthorizationList | undefined;
                    blobs?: undefined;
                    blobVersionedHashes?: undefined;
                    gasPrice?: undefined;
                    maxFeePerBlobGas?: undefined;
                    maxFeePerGas?: bigint | undefined;
                    maxPriorityFeePerGas?: bigint | undefined;
                    sidecars?: undefined;
                } | {
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: import("viem").SignedAuthorizationList | undefined;
                    blobs?: undefined;
                    blobVersionedHashes?: undefined;
                    gasPrice?: undefined;
                    maxFeePerBlobGas?: undefined;
                    maxFeePerGas?: bigint | undefined;
                    maxPriorityFeePerGas?: bigint | undefined;
                    sidecars?: undefined;
                }) & {
                    authorizationList: import("viem").SignedAuthorizationList;
                } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)>) extends infer T_38 ? T_38 extends (request["type"] extends string | undefined ? request["type"] : import("viem").GetTransactionType<request, (request extends {
                    accessList?: undefined;
                    authorizationList?: undefined;
                    blobs?: undefined;
                    blobVersionedHashes?: undefined;
                    gasPrice?: bigint | undefined;
                    sidecars?: undefined;
                } & import("viem").FeeValuesLegacy ? "legacy" : never) | (request extends {
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: undefined;
                    blobs?: undefined;
                    blobVersionedHashes?: undefined;
                    gasPrice?: undefined;
                    maxFeePerBlobGas?: undefined;
                    maxFeePerGas?: bigint | undefined;
                    maxPriorityFeePerGas?: bigint | undefined;
                    sidecars?: undefined;
                } & (import("viem").OneOf<{
                    maxFeePerGas: bigint;
                } | {
                    maxPriorityFeePerGas: bigint;
                }, import("viem").FeeValuesEIP1559> & {
                    accessList?: import("viem").AccessList | undefined;
                }) ? "eip1559" : never) | (request extends {
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: undefined;
                    blobs?: undefined;
                    blobVersionedHashes?: undefined;
                    gasPrice?: bigint | undefined;
                    sidecars?: undefined;
                    maxFeePerBlobGas?: undefined;
                    maxFeePerGas?: undefined;
                    maxPriorityFeePerGas?: undefined;
                } & {
                    accessList: import("viem").AccessList | undefined;
                } ? "eip2930" : never) | (request extends ({
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: undefined;
                    blobs?: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
                    blobVersionedHashes?: readonly `0x${string}`[] | undefined;
                    maxFeePerBlobGas?: bigint | undefined;
                    maxFeePerGas?: bigint | undefined;
                    maxPriorityFeePerGas?: bigint | undefined;
                    sidecars?: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
                } | {
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: undefined;
                    blobs?: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
                    blobVersionedHashes?: readonly `0x${string}`[] | undefined;
                    maxFeePerBlobGas?: bigint | undefined;
                    maxFeePerGas?: bigint | undefined;
                    maxPriorityFeePerGas?: bigint | undefined;
                    sidecars?: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
                }) & (import("viem").ExactPartial<import("viem").FeeValuesEIP4844> & import("viem").OneOf<{
                    blobs: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
                } | {
                    blobVersionedHashes: readonly `0x${string}`[] | undefined;
                } | {
                    sidecars: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
                }, import("viem").TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: import("viem").SignedAuthorizationList | undefined;
                    blobs?: undefined;
                    blobVersionedHashes?: undefined;
                    gasPrice?: undefined;
                    maxFeePerBlobGas?: undefined;
                    maxFeePerGas?: bigint | undefined;
                    maxPriorityFeePerGas?: bigint | undefined;
                    sidecars?: undefined;
                } | {
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: import("viem").SignedAuthorizationList | undefined;
                    blobs?: undefined;
                    blobVersionedHashes?: undefined;
                    gasPrice?: undefined;
                    maxFeePerBlobGas?: undefined;
                    maxFeePerGas?: bigint | undefined;
                    maxPriorityFeePerGas?: bigint | undefined;
                    sidecars?: undefined;
                }) & {
                    authorizationList: import("viem").SignedAuthorizationList;
                } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)> extends "legacy" ? unknown : import("viem").GetTransactionType<request, (request extends {
                    accessList?: undefined;
                    authorizationList?: undefined;
                    blobs?: undefined;
                    blobVersionedHashes?: undefined;
                    gasPrice?: bigint | undefined;
                    sidecars?: undefined;
                } & import("viem").FeeValuesLegacy ? "legacy" : never) | (request extends {
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: undefined;
                    blobs?: undefined;
                    blobVersionedHashes?: undefined;
                    gasPrice?: undefined;
                    maxFeePerBlobGas?: undefined;
                    maxFeePerGas?: bigint | undefined;
                    maxPriorityFeePerGas?: bigint | undefined;
                    sidecars?: undefined;
                } & (import("viem").OneOf<{
                    maxFeePerGas: bigint;
                } | {
                    maxPriorityFeePerGas: bigint;
                }, import("viem").FeeValuesEIP1559> & {
                    accessList?: import("viem").AccessList | undefined;
                }) ? "eip1559" : never) | (request extends {
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: undefined;
                    blobs?: undefined;
                    blobVersionedHashes?: undefined;
                    gasPrice?: bigint | undefined;
                    sidecars?: undefined;
                    maxFeePerBlobGas?: undefined;
                    maxFeePerGas?: undefined;
                    maxPriorityFeePerGas?: undefined;
                } & {
                    accessList: import("viem").AccessList | undefined;
                } ? "eip2930" : never) | (request extends ({
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: undefined;
                    blobs?: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
                    blobVersionedHashes?: readonly `0x${string}`[] | undefined;
                    maxFeePerBlobGas?: bigint | undefined;
                    maxFeePerGas?: bigint | undefined;
                    maxPriorityFeePerGas?: bigint | undefined;
                    sidecars?: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
                } | {
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: undefined;
                    blobs?: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
                    blobVersionedHashes?: readonly `0x${string}`[] | undefined;
                    maxFeePerBlobGas?: bigint | undefined;
                    maxFeePerGas?: bigint | undefined;
                    maxPriorityFeePerGas?: bigint | undefined;
                    sidecars?: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
                }) & (import("viem").ExactPartial<import("viem").FeeValuesEIP4844> & import("viem").OneOf<{
                    blobs: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
                } | {
                    blobVersionedHashes: readonly `0x${string}`[] | undefined;
                } | {
                    sidecars: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
                }, import("viem").TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: import("viem").SignedAuthorizationList | undefined;
                    blobs?: undefined;
                    blobVersionedHashes?: undefined;
                    gasPrice?: undefined;
                    maxFeePerBlobGas?: undefined;
                    maxFeePerGas?: bigint | undefined;
                    maxPriorityFeePerGas?: bigint | undefined;
                    sidecars?: undefined;
                } | {
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: import("viem").SignedAuthorizationList | undefined;
                    blobs?: undefined;
                    blobVersionedHashes?: undefined;
                    gasPrice?: undefined;
                    maxFeePerBlobGas?: undefined;
                    maxFeePerGas?: bigint | undefined;
                    maxPriorityFeePerGas?: bigint | undefined;
                    sidecars?: undefined;
                }) & {
                    authorizationList: import("viem").SignedAuthorizationList;
                } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)>) ? T_38 extends "eip7702" ? import("viem").TransactionRequestEIP7702 : never : never : never)> extends true ? unknown : import("viem").ExactPartial<((request["type"] extends string | undefined ? request["type"] : import("viem").GetTransactionType<request, (request extends {
                    accessList?: undefined;
                    authorizationList?: undefined;
                    blobs?: undefined;
                    blobVersionedHashes?: undefined;
                    gasPrice?: bigint | undefined;
                    sidecars?: undefined;
                } & import("viem").FeeValuesLegacy ? "legacy" : never) | (request extends {
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: undefined;
                    blobs?: undefined;
                    blobVersionedHashes?: undefined;
                    gasPrice?: undefined;
                    maxFeePerBlobGas?: undefined;
                    maxFeePerGas?: bigint | undefined;
                    maxPriorityFeePerGas?: bigint | undefined;
                    sidecars?: undefined;
                } & (import("viem").OneOf<{
                    maxFeePerGas: bigint;
                } | {
                    maxPriorityFeePerGas: bigint;
                }, import("viem").FeeValuesEIP1559> & {
                    accessList?: import("viem").AccessList | undefined;
                }) ? "eip1559" : never) | (request extends {
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: undefined;
                    blobs?: undefined;
                    blobVersionedHashes?: undefined;
                    gasPrice?: bigint | undefined;
                    sidecars?: undefined;
                    maxFeePerBlobGas?: undefined;
                    maxFeePerGas?: undefined;
                    maxPriorityFeePerGas?: undefined;
                } & {
                    accessList: import("viem").AccessList | undefined;
                } ? "eip2930" : never) | (request extends ({
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: undefined;
                    blobs?: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
                    blobVersionedHashes?: readonly `0x${string}`[] | undefined;
                    maxFeePerBlobGas?: bigint | undefined;
                    maxFeePerGas?: bigint | undefined;
                    maxPriorityFeePerGas?: bigint | undefined;
                    sidecars?: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
                } | {
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: undefined;
                    blobs?: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
                    blobVersionedHashes?: readonly `0x${string}`[] | undefined;
                    maxFeePerBlobGas?: bigint | undefined;
                    maxFeePerGas?: bigint | undefined;
                    maxPriorityFeePerGas?: bigint | undefined;
                    sidecars?: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
                }) & (import("viem").ExactPartial<import("viem").FeeValuesEIP4844> & import("viem").OneOf<{
                    blobs: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
                } | {
                    blobVersionedHashes: readonly `0x${string}`[] | undefined;
                } | {
                    sidecars: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
                }, import("viem").TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: import("viem").SignedAuthorizationList | undefined;
                    blobs?: undefined;
                    blobVersionedHashes?: undefined;
                    gasPrice?: undefined;
                    maxFeePerBlobGas?: undefined;
                    maxFeePerGas?: bigint | undefined;
                    maxPriorityFeePerGas?: bigint | undefined;
                    sidecars?: undefined;
                } | {
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: import("viem").SignedAuthorizationList | undefined;
                    blobs?: undefined;
                    blobVersionedHashes?: undefined;
                    gasPrice?: undefined;
                    maxFeePerBlobGas?: undefined;
                    maxFeePerGas?: bigint | undefined;
                    maxPriorityFeePerGas?: bigint | undefined;
                    sidecars?: undefined;
                }) & {
                    authorizationList: import("viem").SignedAuthorizationList;
                } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)> extends "legacy" ? unknown : import("viem").GetTransactionType<request, (request extends {
                    accessList?: undefined;
                    authorizationList?: undefined;
                    blobs?: undefined;
                    blobVersionedHashes?: undefined;
                    gasPrice?: bigint | undefined;
                    sidecars?: undefined;
                } & import("viem").FeeValuesLegacy ? "legacy" : never) | (request extends {
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: undefined;
                    blobs?: undefined;
                    blobVersionedHashes?: undefined;
                    gasPrice?: undefined;
                    maxFeePerBlobGas?: undefined;
                    maxFeePerGas?: bigint | undefined;
                    maxPriorityFeePerGas?: bigint | undefined;
                    sidecars?: undefined;
                } & (import("viem").OneOf<{
                    maxFeePerGas: bigint;
                } | {
                    maxPriorityFeePerGas: bigint;
                }, import("viem").FeeValuesEIP1559> & {
                    accessList?: import("viem").AccessList | undefined;
                }) ? "eip1559" : never) | (request extends {
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: undefined;
                    blobs?: undefined;
                    blobVersionedHashes?: undefined;
                    gasPrice?: bigint | undefined;
                    sidecars?: undefined;
                    maxFeePerBlobGas?: undefined;
                    maxFeePerGas?: undefined;
                    maxPriorityFeePerGas?: undefined;
                } & {
                    accessList: import("viem").AccessList | undefined;
                } ? "eip2930" : never) | (request extends ({
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: undefined;
                    blobs?: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
                    blobVersionedHashes?: readonly `0x${string}`[] | undefined;
                    maxFeePerBlobGas?: bigint | undefined;
                    maxFeePerGas?: bigint | undefined;
                    maxPriorityFeePerGas?: bigint | undefined;
                    sidecars?: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
                } | {
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: undefined;
                    blobs?: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
                    blobVersionedHashes?: readonly `0x${string}`[] | undefined;
                    maxFeePerBlobGas?: bigint | undefined;
                    maxFeePerGas?: bigint | undefined;
                    maxPriorityFeePerGas?: bigint | undefined;
                    sidecars?: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
                }) & (import("viem").ExactPartial<import("viem").FeeValuesEIP4844> & import("viem").OneOf<{
                    blobs: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
                } | {
                    blobVersionedHashes: readonly `0x${string}`[] | undefined;
                } | {
                    sidecars: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
                }, import("viem").TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: import("viem").SignedAuthorizationList | undefined;
                    blobs?: undefined;
                    blobVersionedHashes?: undefined;
                    gasPrice?: undefined;
                    maxFeePerBlobGas?: undefined;
                    maxFeePerGas?: bigint | undefined;
                    maxPriorityFeePerGas?: bigint | undefined;
                    sidecars?: undefined;
                } | {
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: import("viem").SignedAuthorizationList | undefined;
                    blobs?: undefined;
                    blobVersionedHashes?: undefined;
                    gasPrice?: undefined;
                    maxFeePerBlobGas?: undefined;
                    maxFeePerGas?: bigint | undefined;
                    maxPriorityFeePerGas?: bigint | undefined;
                    sidecars?: undefined;
                }) & {
                    authorizationList: import("viem").SignedAuthorizationList;
                } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)>) extends infer T_39 ? T_39 extends (request["type"] extends string | undefined ? request["type"] : import("viem").GetTransactionType<request, (request extends {
                    accessList?: undefined;
                    authorizationList?: undefined;
                    blobs?: undefined;
                    blobVersionedHashes?: undefined;
                    gasPrice?: bigint | undefined;
                    sidecars?: undefined;
                } & import("viem").FeeValuesLegacy ? "legacy" : never) | (request extends {
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: undefined;
                    blobs?: undefined;
                    blobVersionedHashes?: undefined;
                    gasPrice?: undefined;
                    maxFeePerBlobGas?: undefined;
                    maxFeePerGas?: bigint | undefined;
                    maxPriorityFeePerGas?: bigint | undefined;
                    sidecars?: undefined;
                } & (import("viem").OneOf<{
                    maxFeePerGas: bigint;
                } | {
                    maxPriorityFeePerGas: bigint;
                }, import("viem").FeeValuesEIP1559> & {
                    accessList?: import("viem").AccessList | undefined;
                }) ? "eip1559" : never) | (request extends {
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: undefined;
                    blobs?: undefined;
                    blobVersionedHashes?: undefined;
                    gasPrice?: bigint | undefined;
                    sidecars?: undefined;
                    maxFeePerBlobGas?: undefined;
                    maxFeePerGas?: undefined;
                    maxPriorityFeePerGas?: undefined;
                } & {
                    accessList: import("viem").AccessList | undefined;
                } ? "eip2930" : never) | (request extends ({
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: undefined;
                    blobs?: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
                    blobVersionedHashes?: readonly `0x${string}`[] | undefined;
                    maxFeePerBlobGas?: bigint | undefined;
                    maxFeePerGas?: bigint | undefined;
                    maxPriorityFeePerGas?: bigint | undefined;
                    sidecars?: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
                } | {
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: undefined;
                    blobs?: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
                    blobVersionedHashes?: readonly `0x${string}`[] | undefined;
                    maxFeePerBlobGas?: bigint | undefined;
                    maxFeePerGas?: bigint | undefined;
                    maxPriorityFeePerGas?: bigint | undefined;
                    sidecars?: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
                }) & (import("viem").ExactPartial<import("viem").FeeValuesEIP4844> & import("viem").OneOf<{
                    blobs: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
                } | {
                    blobVersionedHashes: readonly `0x${string}`[] | undefined;
                } | {
                    sidecars: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
                }, import("viem").TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: import("viem").SignedAuthorizationList | undefined;
                    blobs?: undefined;
                    blobVersionedHashes?: undefined;
                    gasPrice?: undefined;
                    maxFeePerBlobGas?: undefined;
                    maxFeePerGas?: bigint | undefined;
                    maxPriorityFeePerGas?: bigint | undefined;
                    sidecars?: undefined;
                } | {
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: import("viem").SignedAuthorizationList | undefined;
                    blobs?: undefined;
                    blobVersionedHashes?: undefined;
                    gasPrice?: undefined;
                    maxFeePerBlobGas?: undefined;
                    maxFeePerGas?: bigint | undefined;
                    maxPriorityFeePerGas?: bigint | undefined;
                    sidecars?: undefined;
                }) & {
                    authorizationList: import("viem").SignedAuthorizationList;
                } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)> extends "legacy" ? unknown : import("viem").GetTransactionType<request, (request extends {
                    accessList?: undefined;
                    authorizationList?: undefined;
                    blobs?: undefined;
                    blobVersionedHashes?: undefined;
                    gasPrice?: bigint | undefined;
                    sidecars?: undefined;
                } & import("viem").FeeValuesLegacy ? "legacy" : never) | (request extends {
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: undefined;
                    blobs?: undefined;
                    blobVersionedHashes?: undefined;
                    gasPrice?: undefined;
                    maxFeePerBlobGas?: undefined;
                    maxFeePerGas?: bigint | undefined;
                    maxPriorityFeePerGas?: bigint | undefined;
                    sidecars?: undefined;
                } & (import("viem").OneOf<{
                    maxFeePerGas: bigint;
                } | {
                    maxPriorityFeePerGas: bigint;
                }, import("viem").FeeValuesEIP1559> & {
                    accessList?: import("viem").AccessList | undefined;
                }) ? "eip1559" : never) | (request extends {
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: undefined;
                    blobs?: undefined;
                    blobVersionedHashes?: undefined;
                    gasPrice?: bigint | undefined;
                    sidecars?: undefined;
                    maxFeePerBlobGas?: undefined;
                    maxFeePerGas?: undefined;
                    maxPriorityFeePerGas?: undefined;
                } & {
                    accessList: import("viem").AccessList | undefined;
                } ? "eip2930" : never) | (request extends ({
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: undefined;
                    blobs?: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
                    blobVersionedHashes?: readonly `0x${string}`[] | undefined;
                    maxFeePerBlobGas?: bigint | undefined;
                    maxFeePerGas?: bigint | undefined;
                    maxPriorityFeePerGas?: bigint | undefined;
                    sidecars?: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
                } | {
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: undefined;
                    blobs?: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
                    blobVersionedHashes?: readonly `0x${string}`[] | undefined;
                    maxFeePerBlobGas?: bigint | undefined;
                    maxFeePerGas?: bigint | undefined;
                    maxPriorityFeePerGas?: bigint | undefined;
                    sidecars?: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
                }) & (import("viem").ExactPartial<import("viem").FeeValuesEIP4844> & import("viem").OneOf<{
                    blobs: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
                } | {
                    blobVersionedHashes: readonly `0x${string}`[] | undefined;
                } | {
                    sidecars: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
                }, import("viem").TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: import("viem").SignedAuthorizationList | undefined;
                    blobs?: undefined;
                    blobVersionedHashes?: undefined;
                    gasPrice?: undefined;
                    maxFeePerBlobGas?: undefined;
                    maxFeePerGas?: bigint | undefined;
                    maxPriorityFeePerGas?: bigint | undefined;
                    sidecars?: undefined;
                } | {
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: import("viem").SignedAuthorizationList | undefined;
                    blobs?: undefined;
                    blobVersionedHashes?: undefined;
                    gasPrice?: undefined;
                    maxFeePerBlobGas?: undefined;
                    maxFeePerGas?: bigint | undefined;
                    maxPriorityFeePerGas?: bigint | undefined;
                    sidecars?: undefined;
                }) & {
                    authorizationList: import("viem").SignedAuthorizationList;
                } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)>) ? T_39 extends "legacy" ? import("viem").TransactionRequestLegacy : never : never : never) | ((request["type"] extends string | undefined ? request["type"] : import("viem").GetTransactionType<request, (request extends {
                    accessList?: undefined;
                    authorizationList?: undefined;
                    blobs?: undefined;
                    blobVersionedHashes?: undefined;
                    gasPrice?: bigint | undefined;
                    sidecars?: undefined;
                } & import("viem").FeeValuesLegacy ? "legacy" : never) | (request extends {
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: undefined;
                    blobs?: undefined;
                    blobVersionedHashes?: undefined;
                    gasPrice?: undefined;
                    maxFeePerBlobGas?: undefined;
                    maxFeePerGas?: bigint | undefined;
                    maxPriorityFeePerGas?: bigint | undefined;
                    sidecars?: undefined;
                } & (import("viem").OneOf<{
                    maxFeePerGas: bigint;
                } | {
                    maxPriorityFeePerGas: bigint;
                }, import("viem").FeeValuesEIP1559> & {
                    accessList?: import("viem").AccessList | undefined;
                }) ? "eip1559" : never) | (request extends {
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: undefined;
                    blobs?: undefined;
                    blobVersionedHashes?: undefined;
                    gasPrice?: bigint | undefined;
                    sidecars?: undefined;
                    maxFeePerBlobGas?: undefined;
                    maxFeePerGas?: undefined;
                    maxPriorityFeePerGas?: undefined;
                } & {
                    accessList: import("viem").AccessList | undefined;
                } ? "eip2930" : never) | (request extends ({
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: undefined;
                    blobs?: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
                    blobVersionedHashes?: readonly `0x${string}`[] | undefined;
                    maxFeePerBlobGas?: bigint | undefined;
                    maxFeePerGas?: bigint | undefined;
                    maxPriorityFeePerGas?: bigint | undefined;
                    sidecars?: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
                } | {
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: undefined;
                    blobs?: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
                    blobVersionedHashes?: readonly `0x${string}`[] | undefined;
                    maxFeePerBlobGas?: bigint | undefined;
                    maxFeePerGas?: bigint | undefined;
                    maxPriorityFeePerGas?: bigint | undefined;
                    sidecars?: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
                }) & (import("viem").ExactPartial<import("viem").FeeValuesEIP4844> & import("viem").OneOf<{
                    blobs: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
                } | {
                    blobVersionedHashes: readonly `0x${string}`[] | undefined;
                } | {
                    sidecars: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
                }, import("viem").TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: import("viem").SignedAuthorizationList | undefined;
                    blobs?: undefined;
                    blobVersionedHashes?: undefined;
                    gasPrice?: undefined;
                    maxFeePerBlobGas?: undefined;
                    maxFeePerGas?: bigint | undefined;
                    maxPriorityFeePerGas?: bigint | undefined;
                    sidecars?: undefined;
                } | {
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: import("viem").SignedAuthorizationList | undefined;
                    blobs?: undefined;
                    blobVersionedHashes?: undefined;
                    gasPrice?: undefined;
                    maxFeePerBlobGas?: undefined;
                    maxFeePerGas?: bigint | undefined;
                    maxPriorityFeePerGas?: bigint | undefined;
                    sidecars?: undefined;
                }) & {
                    authorizationList: import("viem").SignedAuthorizationList;
                } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)> extends "legacy" ? unknown : import("viem").GetTransactionType<request, (request extends {
                    accessList?: undefined;
                    authorizationList?: undefined;
                    blobs?: undefined;
                    blobVersionedHashes?: undefined;
                    gasPrice?: bigint | undefined;
                    sidecars?: undefined;
                } & import("viem").FeeValuesLegacy ? "legacy" : never) | (request extends {
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: undefined;
                    blobs?: undefined;
                    blobVersionedHashes?: undefined;
                    gasPrice?: undefined;
                    maxFeePerBlobGas?: undefined;
                    maxFeePerGas?: bigint | undefined;
                    maxPriorityFeePerGas?: bigint | undefined;
                    sidecars?: undefined;
                } & (import("viem").OneOf<{
                    maxFeePerGas: bigint;
                } | {
                    maxPriorityFeePerGas: bigint;
                }, import("viem").FeeValuesEIP1559> & {
                    accessList?: import("viem").AccessList | undefined;
                }) ? "eip1559" : never) | (request extends {
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: undefined;
                    blobs?: undefined;
                    blobVersionedHashes?: undefined;
                    gasPrice?: bigint | undefined;
                    sidecars?: undefined;
                    maxFeePerBlobGas?: undefined;
                    maxFeePerGas?: undefined;
                    maxPriorityFeePerGas?: undefined;
                } & {
                    accessList: import("viem").AccessList | undefined;
                } ? "eip2930" : never) | (request extends ({
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: undefined;
                    blobs?: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
                    blobVersionedHashes?: readonly `0x${string}`[] | undefined;
                    maxFeePerBlobGas?: bigint | undefined;
                    maxFeePerGas?: bigint | undefined;
                    maxPriorityFeePerGas?: bigint | undefined;
                    sidecars?: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
                } | {
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: undefined;
                    blobs?: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
                    blobVersionedHashes?: readonly `0x${string}`[] | undefined;
                    maxFeePerBlobGas?: bigint | undefined;
                    maxFeePerGas?: bigint | undefined;
                    maxPriorityFeePerGas?: bigint | undefined;
                    sidecars?: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
                }) & (import("viem").ExactPartial<import("viem").FeeValuesEIP4844> & import("viem").OneOf<{
                    blobs: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
                } | {
                    blobVersionedHashes: readonly `0x${string}`[] | undefined;
                } | {
                    sidecars: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
                }, import("viem").TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: import("viem").SignedAuthorizationList | undefined;
                    blobs?: undefined;
                    blobVersionedHashes?: undefined;
                    gasPrice?: undefined;
                    maxFeePerBlobGas?: undefined;
                    maxFeePerGas?: bigint | undefined;
                    maxPriorityFeePerGas?: bigint | undefined;
                    sidecars?: undefined;
                } | {
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: import("viem").SignedAuthorizationList | undefined;
                    blobs?: undefined;
                    blobVersionedHashes?: undefined;
                    gasPrice?: undefined;
                    maxFeePerBlobGas?: undefined;
                    maxFeePerGas?: bigint | undefined;
                    maxPriorityFeePerGas?: bigint | undefined;
                    sidecars?: undefined;
                }) & {
                    authorizationList: import("viem").SignedAuthorizationList;
                } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)>) extends infer T_40 ? T_40 extends (request["type"] extends string | undefined ? request["type"] : import("viem").GetTransactionType<request, (request extends {
                    accessList?: undefined;
                    authorizationList?: undefined;
                    blobs?: undefined;
                    blobVersionedHashes?: undefined;
                    gasPrice?: bigint | undefined;
                    sidecars?: undefined;
                } & import("viem").FeeValuesLegacy ? "legacy" : never) | (request extends {
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: undefined;
                    blobs?: undefined;
                    blobVersionedHashes?: undefined;
                    gasPrice?: undefined;
                    maxFeePerBlobGas?: undefined;
                    maxFeePerGas?: bigint | undefined;
                    maxPriorityFeePerGas?: bigint | undefined;
                    sidecars?: undefined;
                } & (import("viem").OneOf<{
                    maxFeePerGas: bigint;
                } | {
                    maxPriorityFeePerGas: bigint;
                }, import("viem").FeeValuesEIP1559> & {
                    accessList?: import("viem").AccessList | undefined;
                }) ? "eip1559" : never) | (request extends {
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: undefined;
                    blobs?: undefined;
                    blobVersionedHashes?: undefined;
                    gasPrice?: bigint | undefined;
                    sidecars?: undefined;
                    maxFeePerBlobGas?: undefined;
                    maxFeePerGas?: undefined;
                    maxPriorityFeePerGas?: undefined;
                } & {
                    accessList: import("viem").AccessList | undefined;
                } ? "eip2930" : never) | (request extends ({
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: undefined;
                    blobs?: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
                    blobVersionedHashes?: readonly `0x${string}`[] | undefined;
                    maxFeePerBlobGas?: bigint | undefined;
                    maxFeePerGas?: bigint | undefined;
                    maxPriorityFeePerGas?: bigint | undefined;
                    sidecars?: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
                } | {
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: undefined;
                    blobs?: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
                    blobVersionedHashes?: readonly `0x${string}`[] | undefined;
                    maxFeePerBlobGas?: bigint | undefined;
                    maxFeePerGas?: bigint | undefined;
                    maxPriorityFeePerGas?: bigint | undefined;
                    sidecars?: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
                }) & (import("viem").ExactPartial<import("viem").FeeValuesEIP4844> & import("viem").OneOf<{
                    blobs: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
                } | {
                    blobVersionedHashes: readonly `0x${string}`[] | undefined;
                } | {
                    sidecars: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
                }, import("viem").TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: import("viem").SignedAuthorizationList | undefined;
                    blobs?: undefined;
                    blobVersionedHashes?: undefined;
                    gasPrice?: undefined;
                    maxFeePerBlobGas?: undefined;
                    maxFeePerGas?: bigint | undefined;
                    maxPriorityFeePerGas?: bigint | undefined;
                    sidecars?: undefined;
                } | {
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: import("viem").SignedAuthorizationList | undefined;
                    blobs?: undefined;
                    blobVersionedHashes?: undefined;
                    gasPrice?: undefined;
                    maxFeePerBlobGas?: undefined;
                    maxFeePerGas?: bigint | undefined;
                    maxPriorityFeePerGas?: bigint | undefined;
                    sidecars?: undefined;
                }) & {
                    authorizationList: import("viem").SignedAuthorizationList;
                } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)> extends "legacy" ? unknown : import("viem").GetTransactionType<request, (request extends {
                    accessList?: undefined;
                    authorizationList?: undefined;
                    blobs?: undefined;
                    blobVersionedHashes?: undefined;
                    gasPrice?: bigint | undefined;
                    sidecars?: undefined;
                } & import("viem").FeeValuesLegacy ? "legacy" : never) | (request extends {
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: undefined;
                    blobs?: undefined;
                    blobVersionedHashes?: undefined;
                    gasPrice?: undefined;
                    maxFeePerBlobGas?: undefined;
                    maxFeePerGas?: bigint | undefined;
                    maxPriorityFeePerGas?: bigint | undefined;
                    sidecars?: undefined;
                } & (import("viem").OneOf<{
                    maxFeePerGas: bigint;
                } | {
                    maxPriorityFeePerGas: bigint;
                }, import("viem").FeeValuesEIP1559> & {
                    accessList?: import("viem").AccessList | undefined;
                }) ? "eip1559" : never) | (request extends {
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: undefined;
                    blobs?: undefined;
                    blobVersionedHashes?: undefined;
                    gasPrice?: bigint | undefined;
                    sidecars?: undefined;
                    maxFeePerBlobGas?: undefined;
                    maxFeePerGas?: undefined;
                    maxPriorityFeePerGas?: undefined;
                } & {
                    accessList: import("viem").AccessList | undefined;
                } ? "eip2930" : never) | (request extends ({
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: undefined;
                    blobs?: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
                    blobVersionedHashes?: readonly `0x${string}`[] | undefined;
                    maxFeePerBlobGas?: bigint | undefined;
                    maxFeePerGas?: bigint | undefined;
                    maxPriorityFeePerGas?: bigint | undefined;
                    sidecars?: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
                } | {
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: undefined;
                    blobs?: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
                    blobVersionedHashes?: readonly `0x${string}`[] | undefined;
                    maxFeePerBlobGas?: bigint | undefined;
                    maxFeePerGas?: bigint | undefined;
                    maxPriorityFeePerGas?: bigint | undefined;
                    sidecars?: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
                }) & (import("viem").ExactPartial<import("viem").FeeValuesEIP4844> & import("viem").OneOf<{
                    blobs: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
                } | {
                    blobVersionedHashes: readonly `0x${string}`[] | undefined;
                } | {
                    sidecars: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
                }, import("viem").TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: import("viem").SignedAuthorizationList | undefined;
                    blobs?: undefined;
                    blobVersionedHashes?: undefined;
                    gasPrice?: undefined;
                    maxFeePerBlobGas?: undefined;
                    maxFeePerGas?: bigint | undefined;
                    maxPriorityFeePerGas?: bigint | undefined;
                    sidecars?: undefined;
                } | {
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: import("viem").SignedAuthorizationList | undefined;
                    blobs?: undefined;
                    blobVersionedHashes?: undefined;
                    gasPrice?: undefined;
                    maxFeePerBlobGas?: undefined;
                    maxFeePerGas?: bigint | undefined;
                    maxPriorityFeePerGas?: bigint | undefined;
                    sidecars?: undefined;
                }) & {
                    authorizationList: import("viem").SignedAuthorizationList;
                } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)>) ? T_40 extends "eip1559" ? import("viem").TransactionRequestEIP1559 : never : never : never) | ((request["type"] extends string | undefined ? request["type"] : import("viem").GetTransactionType<request, (request extends {
                    accessList?: undefined;
                    authorizationList?: undefined;
                    blobs?: undefined;
                    blobVersionedHashes?: undefined;
                    gasPrice?: bigint | undefined;
                    sidecars?: undefined;
                } & import("viem").FeeValuesLegacy ? "legacy" : never) | (request extends {
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: undefined;
                    blobs?: undefined;
                    blobVersionedHashes?: undefined;
                    gasPrice?: undefined;
                    maxFeePerBlobGas?: undefined;
                    maxFeePerGas?: bigint | undefined;
                    maxPriorityFeePerGas?: bigint | undefined;
                    sidecars?: undefined;
                } & (import("viem").OneOf<{
                    maxFeePerGas: bigint;
                } | {
                    maxPriorityFeePerGas: bigint;
                }, import("viem").FeeValuesEIP1559> & {
                    accessList?: import("viem").AccessList | undefined;
                }) ? "eip1559" : never) | (request extends {
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: undefined;
                    blobs?: undefined;
                    blobVersionedHashes?: undefined;
                    gasPrice?: bigint | undefined;
                    sidecars?: undefined;
                    maxFeePerBlobGas?: undefined;
                    maxFeePerGas?: undefined;
                    maxPriorityFeePerGas?: undefined;
                } & {
                    accessList: import("viem").AccessList | undefined;
                } ? "eip2930" : never) | (request extends ({
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: undefined;
                    blobs?: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
                    blobVersionedHashes?: readonly `0x${string}`[] | undefined;
                    maxFeePerBlobGas?: bigint | undefined;
                    maxFeePerGas?: bigint | undefined;
                    maxPriorityFeePerGas?: bigint | undefined;
                    sidecars?: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
                } | {
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: undefined;
                    blobs?: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
                    blobVersionedHashes?: readonly `0x${string}`[] | undefined;
                    maxFeePerBlobGas?: bigint | undefined;
                    maxFeePerGas?: bigint | undefined;
                    maxPriorityFeePerGas?: bigint | undefined;
                    sidecars?: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
                }) & (import("viem").ExactPartial<import("viem").FeeValuesEIP4844> & import("viem").OneOf<{
                    blobs: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
                } | {
                    blobVersionedHashes: readonly `0x${string}`[] | undefined;
                } | {
                    sidecars: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
                }, import("viem").TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: import("viem").SignedAuthorizationList | undefined;
                    blobs?: undefined;
                    blobVersionedHashes?: undefined;
                    gasPrice?: undefined;
                    maxFeePerBlobGas?: undefined;
                    maxFeePerGas?: bigint | undefined;
                    maxPriorityFeePerGas?: bigint | undefined;
                    sidecars?: undefined;
                } | {
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: import("viem").SignedAuthorizationList | undefined;
                    blobs?: undefined;
                    blobVersionedHashes?: undefined;
                    gasPrice?: undefined;
                    maxFeePerBlobGas?: undefined;
                    maxFeePerGas?: bigint | undefined;
                    maxPriorityFeePerGas?: bigint | undefined;
                    sidecars?: undefined;
                }) & {
                    authorizationList: import("viem").SignedAuthorizationList;
                } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)> extends "legacy" ? unknown : import("viem").GetTransactionType<request, (request extends {
                    accessList?: undefined;
                    authorizationList?: undefined;
                    blobs?: undefined;
                    blobVersionedHashes?: undefined;
                    gasPrice?: bigint | undefined;
                    sidecars?: undefined;
                } & import("viem").FeeValuesLegacy ? "legacy" : never) | (request extends {
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: undefined;
                    blobs?: undefined;
                    blobVersionedHashes?: undefined;
                    gasPrice?: undefined;
                    maxFeePerBlobGas?: undefined;
                    maxFeePerGas?: bigint | undefined;
                    maxPriorityFeePerGas?: bigint | undefined;
                    sidecars?: undefined;
                } & (import("viem").OneOf<{
                    maxFeePerGas: bigint;
                } | {
                    maxPriorityFeePerGas: bigint;
                }, import("viem").FeeValuesEIP1559> & {
                    accessList?: import("viem").AccessList | undefined;
                }) ? "eip1559" : never) | (request extends {
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: undefined;
                    blobs?: undefined;
                    blobVersionedHashes?: undefined;
                    gasPrice?: bigint | undefined;
                    sidecars?: undefined;
                    maxFeePerBlobGas?: undefined;
                    maxFeePerGas?: undefined;
                    maxPriorityFeePerGas?: undefined;
                } & {
                    accessList: import("viem").AccessList | undefined;
                } ? "eip2930" : never) | (request extends ({
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: undefined;
                    blobs?: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
                    blobVersionedHashes?: readonly `0x${string}`[] | undefined;
                    maxFeePerBlobGas?: bigint | undefined;
                    maxFeePerGas?: bigint | undefined;
                    maxPriorityFeePerGas?: bigint | undefined;
                    sidecars?: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
                } | {
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: undefined;
                    blobs?: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
                    blobVersionedHashes?: readonly `0x${string}`[] | undefined;
                    maxFeePerBlobGas?: bigint | undefined;
                    maxFeePerGas?: bigint | undefined;
                    maxPriorityFeePerGas?: bigint | undefined;
                    sidecars?: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
                }) & (import("viem").ExactPartial<import("viem").FeeValuesEIP4844> & import("viem").OneOf<{
                    blobs: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
                } | {
                    blobVersionedHashes: readonly `0x${string}`[] | undefined;
                } | {
                    sidecars: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
                }, import("viem").TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: import("viem").SignedAuthorizationList | undefined;
                    blobs?: undefined;
                    blobVersionedHashes?: undefined;
                    gasPrice?: undefined;
                    maxFeePerBlobGas?: undefined;
                    maxFeePerGas?: bigint | undefined;
                    maxPriorityFeePerGas?: bigint | undefined;
                    sidecars?: undefined;
                } | {
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: import("viem").SignedAuthorizationList | undefined;
                    blobs?: undefined;
                    blobVersionedHashes?: undefined;
                    gasPrice?: undefined;
                    maxFeePerBlobGas?: undefined;
                    maxFeePerGas?: bigint | undefined;
                    maxPriorityFeePerGas?: bigint | undefined;
                    sidecars?: undefined;
                }) & {
                    authorizationList: import("viem").SignedAuthorizationList;
                } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)>) extends infer T_41 ? T_41 extends (request["type"] extends string | undefined ? request["type"] : import("viem").GetTransactionType<request, (request extends {
                    accessList?: undefined;
                    authorizationList?: undefined;
                    blobs?: undefined;
                    blobVersionedHashes?: undefined;
                    gasPrice?: bigint | undefined;
                    sidecars?: undefined;
                } & import("viem").FeeValuesLegacy ? "legacy" : never) | (request extends {
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: undefined;
                    blobs?: undefined;
                    blobVersionedHashes?: undefined;
                    gasPrice?: undefined;
                    maxFeePerBlobGas?: undefined;
                    maxFeePerGas?: bigint | undefined;
                    maxPriorityFeePerGas?: bigint | undefined;
                    sidecars?: undefined;
                } & (import("viem").OneOf<{
                    maxFeePerGas: bigint;
                } | {
                    maxPriorityFeePerGas: bigint;
                }, import("viem").FeeValuesEIP1559> & {
                    accessList?: import("viem").AccessList | undefined;
                }) ? "eip1559" : never) | (request extends {
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: undefined;
                    blobs?: undefined;
                    blobVersionedHashes?: undefined;
                    gasPrice?: bigint | undefined;
                    sidecars?: undefined;
                    maxFeePerBlobGas?: undefined;
                    maxFeePerGas?: undefined;
                    maxPriorityFeePerGas?: undefined;
                } & {
                    accessList: import("viem").AccessList | undefined;
                } ? "eip2930" : never) | (request extends ({
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: undefined;
                    blobs?: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
                    blobVersionedHashes?: readonly `0x${string}`[] | undefined;
                    maxFeePerBlobGas?: bigint | undefined;
                    maxFeePerGas?: bigint | undefined;
                    maxPriorityFeePerGas?: bigint | undefined;
                    sidecars?: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
                } | {
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: undefined;
                    blobs?: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
                    blobVersionedHashes?: readonly `0x${string}`[] | undefined;
                    maxFeePerBlobGas?: bigint | undefined;
                    maxFeePerGas?: bigint | undefined;
                    maxPriorityFeePerGas?: bigint | undefined;
                    sidecars?: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
                }) & (import("viem").ExactPartial<import("viem").FeeValuesEIP4844> & import("viem").OneOf<{
                    blobs: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
                } | {
                    blobVersionedHashes: readonly `0x${string}`[] | undefined;
                } | {
                    sidecars: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
                }, import("viem").TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: import("viem").SignedAuthorizationList | undefined;
                    blobs?: undefined;
                    blobVersionedHashes?: undefined;
                    gasPrice?: undefined;
                    maxFeePerBlobGas?: undefined;
                    maxFeePerGas?: bigint | undefined;
                    maxPriorityFeePerGas?: bigint | undefined;
                    sidecars?: undefined;
                } | {
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: import("viem").SignedAuthorizationList | undefined;
                    blobs?: undefined;
                    blobVersionedHashes?: undefined;
                    gasPrice?: undefined;
                    maxFeePerBlobGas?: undefined;
                    maxFeePerGas?: bigint | undefined;
                    maxPriorityFeePerGas?: bigint | undefined;
                    sidecars?: undefined;
                }) & {
                    authorizationList: import("viem").SignedAuthorizationList;
                } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)> extends "legacy" ? unknown : import("viem").GetTransactionType<request, (request extends {
                    accessList?: undefined;
                    authorizationList?: undefined;
                    blobs?: undefined;
                    blobVersionedHashes?: undefined;
                    gasPrice?: bigint | undefined;
                    sidecars?: undefined;
                } & import("viem").FeeValuesLegacy ? "legacy" : never) | (request extends {
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: undefined;
                    blobs?: undefined;
                    blobVersionedHashes?: undefined;
                    gasPrice?: undefined;
                    maxFeePerBlobGas?: undefined;
                    maxFeePerGas?: bigint | undefined;
                    maxPriorityFeePerGas?: bigint | undefined;
                    sidecars?: undefined;
                } & (import("viem").OneOf<{
                    maxFeePerGas: bigint;
                } | {
                    maxPriorityFeePerGas: bigint;
                }, import("viem").FeeValuesEIP1559> & {
                    accessList?: import("viem").AccessList | undefined;
                }) ? "eip1559" : never) | (request extends {
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: undefined;
                    blobs?: undefined;
                    blobVersionedHashes?: undefined;
                    gasPrice?: bigint | undefined;
                    sidecars?: undefined;
                    maxFeePerBlobGas?: undefined;
                    maxFeePerGas?: undefined;
                    maxPriorityFeePerGas?: undefined;
                } & {
                    accessList: import("viem").AccessList | undefined;
                } ? "eip2930" : never) | (request extends ({
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: undefined;
                    blobs?: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
                    blobVersionedHashes?: readonly `0x${string}`[] | undefined;
                    maxFeePerBlobGas?: bigint | undefined;
                    maxFeePerGas?: bigint | undefined;
                    maxPriorityFeePerGas?: bigint | undefined;
                    sidecars?: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
                } | {
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: undefined;
                    blobs?: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
                    blobVersionedHashes?: readonly `0x${string}`[] | undefined;
                    maxFeePerBlobGas?: bigint | undefined;
                    maxFeePerGas?: bigint | undefined;
                    maxPriorityFeePerGas?: bigint | undefined;
                    sidecars?: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
                }) & (import("viem").ExactPartial<import("viem").FeeValuesEIP4844> & import("viem").OneOf<{
                    blobs: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
                } | {
                    blobVersionedHashes: readonly `0x${string}`[] | undefined;
                } | {
                    sidecars: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
                }, import("viem").TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: import("viem").SignedAuthorizationList | undefined;
                    blobs?: undefined;
                    blobVersionedHashes?: undefined;
                    gasPrice?: undefined;
                    maxFeePerBlobGas?: undefined;
                    maxFeePerGas?: bigint | undefined;
                    maxPriorityFeePerGas?: bigint | undefined;
                    sidecars?: undefined;
                } | {
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: import("viem").SignedAuthorizationList | undefined;
                    blobs?: undefined;
                    blobVersionedHashes?: undefined;
                    gasPrice?: undefined;
                    maxFeePerBlobGas?: undefined;
                    maxFeePerGas?: bigint | undefined;
                    maxPriorityFeePerGas?: bigint | undefined;
                    sidecars?: undefined;
                }) & {
                    authorizationList: import("viem").SignedAuthorizationList;
                } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)>) ? T_41 extends "eip2930" ? import("viem").TransactionRequestEIP2930 : never : never : never) | ((request["type"] extends string | undefined ? request["type"] : import("viem").GetTransactionType<request, (request extends {
                    accessList?: undefined;
                    authorizationList?: undefined;
                    blobs?: undefined;
                    blobVersionedHashes?: undefined;
                    gasPrice?: bigint | undefined;
                    sidecars?: undefined;
                } & import("viem").FeeValuesLegacy ? "legacy" : never) | (request extends {
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: undefined;
                    blobs?: undefined;
                    blobVersionedHashes?: undefined;
                    gasPrice?: undefined;
                    maxFeePerBlobGas?: undefined;
                    maxFeePerGas?: bigint | undefined;
                    maxPriorityFeePerGas?: bigint | undefined;
                    sidecars?: undefined;
                } & (import("viem").OneOf<{
                    maxFeePerGas: bigint;
                } | {
                    maxPriorityFeePerGas: bigint;
                }, import("viem").FeeValuesEIP1559> & {
                    accessList?: import("viem").AccessList | undefined;
                }) ? "eip1559" : never) | (request extends {
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: undefined;
                    blobs?: undefined;
                    blobVersionedHashes?: undefined;
                    gasPrice?: bigint | undefined;
                    sidecars?: undefined;
                    maxFeePerBlobGas?: undefined;
                    maxFeePerGas?: undefined;
                    maxPriorityFeePerGas?: undefined;
                } & {
                    accessList: import("viem").AccessList | undefined;
                } ? "eip2930" : never) | (request extends ({
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: undefined;
                    blobs?: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
                    blobVersionedHashes?: readonly `0x${string}`[] | undefined;
                    maxFeePerBlobGas?: bigint | undefined;
                    maxFeePerGas?: bigint | undefined;
                    maxPriorityFeePerGas?: bigint | undefined;
                    sidecars?: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
                } | {
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: undefined;
                    blobs?: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
                    blobVersionedHashes?: readonly `0x${string}`[] | undefined;
                    maxFeePerBlobGas?: bigint | undefined;
                    maxFeePerGas?: bigint | undefined;
                    maxPriorityFeePerGas?: bigint | undefined;
                    sidecars?: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
                }) & (import("viem").ExactPartial<import("viem").FeeValuesEIP4844> & import("viem").OneOf<{
                    blobs: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
                } | {
                    blobVersionedHashes: readonly `0x${string}`[] | undefined;
                } | {
                    sidecars: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
                }, import("viem").TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: import("viem").SignedAuthorizationList | undefined;
                    blobs?: undefined;
                    blobVersionedHashes?: undefined;
                    gasPrice?: undefined;
                    maxFeePerBlobGas?: undefined;
                    maxFeePerGas?: bigint | undefined;
                    maxPriorityFeePerGas?: bigint | undefined;
                    sidecars?: undefined;
                } | {
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: import("viem").SignedAuthorizationList | undefined;
                    blobs?: undefined;
                    blobVersionedHashes?: undefined;
                    gasPrice?: undefined;
                    maxFeePerBlobGas?: undefined;
                    maxFeePerGas?: bigint | undefined;
                    maxPriorityFeePerGas?: bigint | undefined;
                    sidecars?: undefined;
                }) & {
                    authorizationList: import("viem").SignedAuthorizationList;
                } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)> extends "legacy" ? unknown : import("viem").GetTransactionType<request, (request extends {
                    accessList?: undefined;
                    authorizationList?: undefined;
                    blobs?: undefined;
                    blobVersionedHashes?: undefined;
                    gasPrice?: bigint | undefined;
                    sidecars?: undefined;
                } & import("viem").FeeValuesLegacy ? "legacy" : never) | (request extends {
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: undefined;
                    blobs?: undefined;
                    blobVersionedHashes?: undefined;
                    gasPrice?: undefined;
                    maxFeePerBlobGas?: undefined;
                    maxFeePerGas?: bigint | undefined;
                    maxPriorityFeePerGas?: bigint | undefined;
                    sidecars?: undefined;
                } & (import("viem").OneOf<{
                    maxFeePerGas: bigint;
                } | {
                    maxPriorityFeePerGas: bigint;
                }, import("viem").FeeValuesEIP1559> & {
                    accessList?: import("viem").AccessList | undefined;
                }) ? "eip1559" : never) | (request extends {
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: undefined;
                    blobs?: undefined;
                    blobVersionedHashes?: undefined;
                    gasPrice?: bigint | undefined;
                    sidecars?: undefined;
                    maxFeePerBlobGas?: undefined;
                    maxFeePerGas?: undefined;
                    maxPriorityFeePerGas?: undefined;
                } & {
                    accessList: import("viem").AccessList | undefined;
                } ? "eip2930" : never) | (request extends ({
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: undefined;
                    blobs?: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
                    blobVersionedHashes?: readonly `0x${string}`[] | undefined;
                    maxFeePerBlobGas?: bigint | undefined;
                    maxFeePerGas?: bigint | undefined;
                    maxPriorityFeePerGas?: bigint | undefined;
                    sidecars?: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
                } | {
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: undefined;
                    blobs?: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
                    blobVersionedHashes?: readonly `0x${string}`[] | undefined;
                    maxFeePerBlobGas?: bigint | undefined;
                    maxFeePerGas?: bigint | undefined;
                    maxPriorityFeePerGas?: bigint | undefined;
                    sidecars?: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
                }) & (import("viem").ExactPartial<import("viem").FeeValuesEIP4844> & import("viem").OneOf<{
                    blobs: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
                } | {
                    blobVersionedHashes: readonly `0x${string}`[] | undefined;
                } | {
                    sidecars: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
                }, import("viem").TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: import("viem").SignedAuthorizationList | undefined;
                    blobs?: undefined;
                    blobVersionedHashes?: undefined;
                    gasPrice?: undefined;
                    maxFeePerBlobGas?: undefined;
                    maxFeePerGas?: bigint | undefined;
                    maxPriorityFeePerGas?: bigint | undefined;
                    sidecars?: undefined;
                } | {
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: import("viem").SignedAuthorizationList | undefined;
                    blobs?: undefined;
                    blobVersionedHashes?: undefined;
                    gasPrice?: undefined;
                    maxFeePerBlobGas?: undefined;
                    maxFeePerGas?: bigint | undefined;
                    maxPriorityFeePerGas?: bigint | undefined;
                    sidecars?: undefined;
                }) & {
                    authorizationList: import("viem").SignedAuthorizationList;
                } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)>) extends infer T_42 ? T_42 extends (request["type"] extends string | undefined ? request["type"] : import("viem").GetTransactionType<request, (request extends {
                    accessList?: undefined;
                    authorizationList?: undefined;
                    blobs?: undefined;
                    blobVersionedHashes?: undefined;
                    gasPrice?: bigint | undefined;
                    sidecars?: undefined;
                } & import("viem").FeeValuesLegacy ? "legacy" : never) | (request extends {
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: undefined;
                    blobs?: undefined;
                    blobVersionedHashes?: undefined;
                    gasPrice?: undefined;
                    maxFeePerBlobGas?: undefined;
                    maxFeePerGas?: bigint | undefined;
                    maxPriorityFeePerGas?: bigint | undefined;
                    sidecars?: undefined;
                } & (import("viem").OneOf<{
                    maxFeePerGas: bigint;
                } | {
                    maxPriorityFeePerGas: bigint;
                }, import("viem").FeeValuesEIP1559> & {
                    accessList?: import("viem").AccessList | undefined;
                }) ? "eip1559" : never) | (request extends {
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: undefined;
                    blobs?: undefined;
                    blobVersionedHashes?: undefined;
                    gasPrice?: bigint | undefined;
                    sidecars?: undefined;
                    maxFeePerBlobGas?: undefined;
                    maxFeePerGas?: undefined;
                    maxPriorityFeePerGas?: undefined;
                } & {
                    accessList: import("viem").AccessList | undefined;
                } ? "eip2930" : never) | (request extends ({
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: undefined;
                    blobs?: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
                    blobVersionedHashes?: readonly `0x${string}`[] | undefined;
                    maxFeePerBlobGas?: bigint | undefined;
                    maxFeePerGas?: bigint | undefined;
                    maxPriorityFeePerGas?: bigint | undefined;
                    sidecars?: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
                } | {
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: undefined;
                    blobs?: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
                    blobVersionedHashes?: readonly `0x${string}`[] | undefined;
                    maxFeePerBlobGas?: bigint | undefined;
                    maxFeePerGas?: bigint | undefined;
                    maxPriorityFeePerGas?: bigint | undefined;
                    sidecars?: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
                }) & (import("viem").ExactPartial<import("viem").FeeValuesEIP4844> & import("viem").OneOf<{
                    blobs: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
                } | {
                    blobVersionedHashes: readonly `0x${string}`[] | undefined;
                } | {
                    sidecars: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
                }, import("viem").TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: import("viem").SignedAuthorizationList | undefined;
                    blobs?: undefined;
                    blobVersionedHashes?: undefined;
                    gasPrice?: undefined;
                    maxFeePerBlobGas?: undefined;
                    maxFeePerGas?: bigint | undefined;
                    maxPriorityFeePerGas?: bigint | undefined;
                    sidecars?: undefined;
                } | {
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: import("viem").SignedAuthorizationList | undefined;
                    blobs?: undefined;
                    blobVersionedHashes?: undefined;
                    gasPrice?: undefined;
                    maxFeePerBlobGas?: undefined;
                    maxFeePerGas?: bigint | undefined;
                    maxPriorityFeePerGas?: bigint | undefined;
                    sidecars?: undefined;
                }) & {
                    authorizationList: import("viem").SignedAuthorizationList;
                } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)> extends "legacy" ? unknown : import("viem").GetTransactionType<request, (request extends {
                    accessList?: undefined;
                    authorizationList?: undefined;
                    blobs?: undefined;
                    blobVersionedHashes?: undefined;
                    gasPrice?: bigint | undefined;
                    sidecars?: undefined;
                } & import("viem").FeeValuesLegacy ? "legacy" : never) | (request extends {
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: undefined;
                    blobs?: undefined;
                    blobVersionedHashes?: undefined;
                    gasPrice?: undefined;
                    maxFeePerBlobGas?: undefined;
                    maxFeePerGas?: bigint | undefined;
                    maxPriorityFeePerGas?: bigint | undefined;
                    sidecars?: undefined;
                } & (import("viem").OneOf<{
                    maxFeePerGas: bigint;
                } | {
                    maxPriorityFeePerGas: bigint;
                }, import("viem").FeeValuesEIP1559> & {
                    accessList?: import("viem").AccessList | undefined;
                }) ? "eip1559" : never) | (request extends {
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: undefined;
                    blobs?: undefined;
                    blobVersionedHashes?: undefined;
                    gasPrice?: bigint | undefined;
                    sidecars?: undefined;
                    maxFeePerBlobGas?: undefined;
                    maxFeePerGas?: undefined;
                    maxPriorityFeePerGas?: undefined;
                } & {
                    accessList: import("viem").AccessList | undefined;
                } ? "eip2930" : never) | (request extends ({
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: undefined;
                    blobs?: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
                    blobVersionedHashes?: readonly `0x${string}`[] | undefined;
                    maxFeePerBlobGas?: bigint | undefined;
                    maxFeePerGas?: bigint | undefined;
                    maxPriorityFeePerGas?: bigint | undefined;
                    sidecars?: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
                } | {
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: undefined;
                    blobs?: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
                    blobVersionedHashes?: readonly `0x${string}`[] | undefined;
                    maxFeePerBlobGas?: bigint | undefined;
                    maxFeePerGas?: bigint | undefined;
                    maxPriorityFeePerGas?: bigint | undefined;
                    sidecars?: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
                }) & (import("viem").ExactPartial<import("viem").FeeValuesEIP4844> & import("viem").OneOf<{
                    blobs: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
                } | {
                    blobVersionedHashes: readonly `0x${string}`[] | undefined;
                } | {
                    sidecars: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
                }, import("viem").TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: import("viem").SignedAuthorizationList | undefined;
                    blobs?: undefined;
                    blobVersionedHashes?: undefined;
                    gasPrice?: undefined;
                    maxFeePerBlobGas?: undefined;
                    maxFeePerGas?: bigint | undefined;
                    maxPriorityFeePerGas?: bigint | undefined;
                    sidecars?: undefined;
                } | {
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: import("viem").SignedAuthorizationList | undefined;
                    blobs?: undefined;
                    blobVersionedHashes?: undefined;
                    gasPrice?: undefined;
                    maxFeePerBlobGas?: undefined;
                    maxFeePerGas?: bigint | undefined;
                    maxPriorityFeePerGas?: bigint | undefined;
                    sidecars?: undefined;
                }) & {
                    authorizationList: import("viem").SignedAuthorizationList;
                } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)>) ? T_42 extends "eip4844" ? import("viem").TransactionRequestEIP4844 : never : never : never) | ((request["type"] extends string | undefined ? request["type"] : import("viem").GetTransactionType<request, (request extends {
                    accessList?: undefined;
                    authorizationList?: undefined;
                    blobs?: undefined;
                    blobVersionedHashes?: undefined;
                    gasPrice?: bigint | undefined;
                    sidecars?: undefined;
                } & import("viem").FeeValuesLegacy ? "legacy" : never) | (request extends {
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: undefined;
                    blobs?: undefined;
                    blobVersionedHashes?: undefined;
                    gasPrice?: undefined;
                    maxFeePerBlobGas?: undefined;
                    maxFeePerGas?: bigint | undefined;
                    maxPriorityFeePerGas?: bigint | undefined;
                    sidecars?: undefined;
                } & (import("viem").OneOf<{
                    maxFeePerGas: bigint;
                } | {
                    maxPriorityFeePerGas: bigint;
                }, import("viem").FeeValuesEIP1559> & {
                    accessList?: import("viem").AccessList | undefined;
                }) ? "eip1559" : never) | (request extends {
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: undefined;
                    blobs?: undefined;
                    blobVersionedHashes?: undefined;
                    gasPrice?: bigint | undefined;
                    sidecars?: undefined;
                    maxFeePerBlobGas?: undefined;
                    maxFeePerGas?: undefined;
                    maxPriorityFeePerGas?: undefined;
                } & {
                    accessList: import("viem").AccessList | undefined;
                } ? "eip2930" : never) | (request extends ({
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: undefined;
                    blobs?: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
                    blobVersionedHashes?: readonly `0x${string}`[] | undefined;
                    maxFeePerBlobGas?: bigint | undefined;
                    maxFeePerGas?: bigint | undefined;
                    maxPriorityFeePerGas?: bigint | undefined;
                    sidecars?: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
                } | {
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: undefined;
                    blobs?: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
                    blobVersionedHashes?: readonly `0x${string}`[] | undefined;
                    maxFeePerBlobGas?: bigint | undefined;
                    maxFeePerGas?: bigint | undefined;
                    maxPriorityFeePerGas?: bigint | undefined;
                    sidecars?: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
                }) & (import("viem").ExactPartial<import("viem").FeeValuesEIP4844> & import("viem").OneOf<{
                    blobs: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
                } | {
                    blobVersionedHashes: readonly `0x${string}`[] | undefined;
                } | {
                    sidecars: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
                }, import("viem").TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: import("viem").SignedAuthorizationList | undefined;
                    blobs?: undefined;
                    blobVersionedHashes?: undefined;
                    gasPrice?: undefined;
                    maxFeePerBlobGas?: undefined;
                    maxFeePerGas?: bigint | undefined;
                    maxPriorityFeePerGas?: bigint | undefined;
                    sidecars?: undefined;
                } | {
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: import("viem").SignedAuthorizationList | undefined;
                    blobs?: undefined;
                    blobVersionedHashes?: undefined;
                    gasPrice?: undefined;
                    maxFeePerBlobGas?: undefined;
                    maxFeePerGas?: bigint | undefined;
                    maxPriorityFeePerGas?: bigint | undefined;
                    sidecars?: undefined;
                }) & {
                    authorizationList: import("viem").SignedAuthorizationList;
                } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)> extends "legacy" ? unknown : import("viem").GetTransactionType<request, (request extends {
                    accessList?: undefined;
                    authorizationList?: undefined;
                    blobs?: undefined;
                    blobVersionedHashes?: undefined;
                    gasPrice?: bigint | undefined;
                    sidecars?: undefined;
                } & import("viem").FeeValuesLegacy ? "legacy" : never) | (request extends {
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: undefined;
                    blobs?: undefined;
                    blobVersionedHashes?: undefined;
                    gasPrice?: undefined;
                    maxFeePerBlobGas?: undefined;
                    maxFeePerGas?: bigint | undefined;
                    maxPriorityFeePerGas?: bigint | undefined;
                    sidecars?: undefined;
                } & (import("viem").OneOf<{
                    maxFeePerGas: bigint;
                } | {
                    maxPriorityFeePerGas: bigint;
                }, import("viem").FeeValuesEIP1559> & {
                    accessList?: import("viem").AccessList | undefined;
                }) ? "eip1559" : never) | (request extends {
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: undefined;
                    blobs?: undefined;
                    blobVersionedHashes?: undefined;
                    gasPrice?: bigint | undefined;
                    sidecars?: undefined;
                    maxFeePerBlobGas?: undefined;
                    maxFeePerGas?: undefined;
                    maxPriorityFeePerGas?: undefined;
                } & {
                    accessList: import("viem").AccessList | undefined;
                } ? "eip2930" : never) | (request extends ({
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: undefined;
                    blobs?: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
                    blobVersionedHashes?: readonly `0x${string}`[] | undefined;
                    maxFeePerBlobGas?: bigint | undefined;
                    maxFeePerGas?: bigint | undefined;
                    maxPriorityFeePerGas?: bigint | undefined;
                    sidecars?: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
                } | {
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: undefined;
                    blobs?: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
                    blobVersionedHashes?: readonly `0x${string}`[] | undefined;
                    maxFeePerBlobGas?: bigint | undefined;
                    maxFeePerGas?: bigint | undefined;
                    maxPriorityFeePerGas?: bigint | undefined;
                    sidecars?: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
                }) & (import("viem").ExactPartial<import("viem").FeeValuesEIP4844> & import("viem").OneOf<{
                    blobs: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
                } | {
                    blobVersionedHashes: readonly `0x${string}`[] | undefined;
                } | {
                    sidecars: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
                }, import("viem").TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: import("viem").SignedAuthorizationList | undefined;
                    blobs?: undefined;
                    blobVersionedHashes?: undefined;
                    gasPrice?: undefined;
                    maxFeePerBlobGas?: undefined;
                    maxFeePerGas?: bigint | undefined;
                    maxPriorityFeePerGas?: bigint | undefined;
                    sidecars?: undefined;
                } | {
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: import("viem").SignedAuthorizationList | undefined;
                    blobs?: undefined;
                    blobVersionedHashes?: undefined;
                    gasPrice?: undefined;
                    maxFeePerBlobGas?: undefined;
                    maxFeePerGas?: bigint | undefined;
                    maxPriorityFeePerGas?: bigint | undefined;
                    sidecars?: undefined;
                }) & {
                    authorizationList: import("viem").SignedAuthorizationList;
                } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)>) extends infer T_43 ? T_43 extends (request["type"] extends string | undefined ? request["type"] : import("viem").GetTransactionType<request, (request extends {
                    accessList?: undefined;
                    authorizationList?: undefined;
                    blobs?: undefined;
                    blobVersionedHashes?: undefined;
                    gasPrice?: bigint | undefined;
                    sidecars?: undefined;
                } & import("viem").FeeValuesLegacy ? "legacy" : never) | (request extends {
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: undefined;
                    blobs?: undefined;
                    blobVersionedHashes?: undefined;
                    gasPrice?: undefined;
                    maxFeePerBlobGas?: undefined;
                    maxFeePerGas?: bigint | undefined;
                    maxPriorityFeePerGas?: bigint | undefined;
                    sidecars?: undefined;
                } & (import("viem").OneOf<{
                    maxFeePerGas: bigint;
                } | {
                    maxPriorityFeePerGas: bigint;
                }, import("viem").FeeValuesEIP1559> & {
                    accessList?: import("viem").AccessList | undefined;
                }) ? "eip1559" : never) | (request extends {
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: undefined;
                    blobs?: undefined;
                    blobVersionedHashes?: undefined;
                    gasPrice?: bigint | undefined;
                    sidecars?: undefined;
                    maxFeePerBlobGas?: undefined;
                    maxFeePerGas?: undefined;
                    maxPriorityFeePerGas?: undefined;
                } & {
                    accessList: import("viem").AccessList | undefined;
                } ? "eip2930" : never) | (request extends ({
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: undefined;
                    blobs?: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
                    blobVersionedHashes?: readonly `0x${string}`[] | undefined;
                    maxFeePerBlobGas?: bigint | undefined;
                    maxFeePerGas?: bigint | undefined;
                    maxPriorityFeePerGas?: bigint | undefined;
                    sidecars?: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
                } | {
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: undefined;
                    blobs?: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
                    blobVersionedHashes?: readonly `0x${string}`[] | undefined;
                    maxFeePerBlobGas?: bigint | undefined;
                    maxFeePerGas?: bigint | undefined;
                    maxPriorityFeePerGas?: bigint | undefined;
                    sidecars?: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
                }) & (import("viem").ExactPartial<import("viem").FeeValuesEIP4844> & import("viem").OneOf<{
                    blobs: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
                } | {
                    blobVersionedHashes: readonly `0x${string}`[] | undefined;
                } | {
                    sidecars: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
                }, import("viem").TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: import("viem").SignedAuthorizationList | undefined;
                    blobs?: undefined;
                    blobVersionedHashes?: undefined;
                    gasPrice?: undefined;
                    maxFeePerBlobGas?: undefined;
                    maxFeePerGas?: bigint | undefined;
                    maxPriorityFeePerGas?: bigint | undefined;
                    sidecars?: undefined;
                } | {
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: import("viem").SignedAuthorizationList | undefined;
                    blobs?: undefined;
                    blobVersionedHashes?: undefined;
                    gasPrice?: undefined;
                    maxFeePerBlobGas?: undefined;
                    maxFeePerGas?: bigint | undefined;
                    maxPriorityFeePerGas?: bigint | undefined;
                    sidecars?: undefined;
                }) & {
                    authorizationList: import("viem").SignedAuthorizationList;
                } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)> extends "legacy" ? unknown : import("viem").GetTransactionType<request, (request extends {
                    accessList?: undefined;
                    authorizationList?: undefined;
                    blobs?: undefined;
                    blobVersionedHashes?: undefined;
                    gasPrice?: bigint | undefined;
                    sidecars?: undefined;
                } & import("viem").FeeValuesLegacy ? "legacy" : never) | (request extends {
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: undefined;
                    blobs?: undefined;
                    blobVersionedHashes?: undefined;
                    gasPrice?: undefined;
                    maxFeePerBlobGas?: undefined;
                    maxFeePerGas?: bigint | undefined;
                    maxPriorityFeePerGas?: bigint | undefined;
                    sidecars?: undefined;
                } & (import("viem").OneOf<{
                    maxFeePerGas: bigint;
                } | {
                    maxPriorityFeePerGas: bigint;
                }, import("viem").FeeValuesEIP1559> & {
                    accessList?: import("viem").AccessList | undefined;
                }) ? "eip1559" : never) | (request extends {
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: undefined;
                    blobs?: undefined;
                    blobVersionedHashes?: undefined;
                    gasPrice?: bigint | undefined;
                    sidecars?: undefined;
                    maxFeePerBlobGas?: undefined;
                    maxFeePerGas?: undefined;
                    maxPriorityFeePerGas?: undefined;
                } & {
                    accessList: import("viem").AccessList | undefined;
                } ? "eip2930" : never) | (request extends ({
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: undefined;
                    blobs?: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
                    blobVersionedHashes?: readonly `0x${string}`[] | undefined;
                    maxFeePerBlobGas?: bigint | undefined;
                    maxFeePerGas?: bigint | undefined;
                    maxPriorityFeePerGas?: bigint | undefined;
                    sidecars?: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
                } | {
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: undefined;
                    blobs?: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
                    blobVersionedHashes?: readonly `0x${string}`[] | undefined;
                    maxFeePerBlobGas?: bigint | undefined;
                    maxFeePerGas?: bigint | undefined;
                    maxPriorityFeePerGas?: bigint | undefined;
                    sidecars?: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
                }) & (import("viem").ExactPartial<import("viem").FeeValuesEIP4844> & import("viem").OneOf<{
                    blobs: readonly `0x${string}`[] | readonly Uint8Array[] | undefined;
                } | {
                    blobVersionedHashes: readonly `0x${string}`[] | undefined;
                } | {
                    sidecars: false | readonly import("viem").BlobSidecar<`0x${string}`>[] | undefined;
                }, import("viem").TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: import("viem").SignedAuthorizationList | undefined;
                    blobs?: undefined;
                    blobVersionedHashes?: undefined;
                    gasPrice?: undefined;
                    maxFeePerBlobGas?: undefined;
                    maxFeePerGas?: bigint | undefined;
                    maxPriorityFeePerGas?: bigint | undefined;
                    sidecars?: undefined;
                } | {
                    accessList?: import("viem").AccessList | undefined;
                    authorizationList?: import("viem").SignedAuthorizationList | undefined;
                    blobs?: undefined;
                    blobVersionedHashes?: undefined;
                    gasPrice?: undefined;
                    maxFeePerBlobGas?: undefined;
                    maxFeePerGas?: bigint | undefined;
                    maxPriorityFeePerGas?: bigint | undefined;
                    sidecars?: undefined;
                }) & {
                    authorizationList: import("viem").SignedAuthorizationList;
                } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)>) ? T_43 extends "eip7702" ? import("viem").TransactionRequestEIP7702 : never : never : never)>> & {
                    chainId?: number | undefined;
                }, (request["parameters"] extends readonly import("viem").PrepareTransactionRequestParameterType[] ? request["parameters"][number] : "fees" | "gas" | "nonce" | "blobVersionedHashes" | "chainId" | "type") extends infer T_44 ? T_44 extends (request["parameters"] extends readonly import("viem").PrepareTransactionRequestParameterType[] ? request["parameters"][number] : "fees" | "gas" | "nonce" | "blobVersionedHashes" | "chainId" | "type") ? T_44 extends "fees" ? "gasPrice" | "maxFeePerGas" | "maxPriorityFeePerGas" : T_44 : never : never> & (unknown extends request["kzg"] ? {} : Pick<request, "kzg">))[K_1]; } : never>;
                readContract: <const abi_5 extends import("viem").Abi | readonly unknown[], functionName_1 extends import("viem").ContractFunctionName<abi_5, "pure" | "view">, const args_2 extends import("viem").ContractFunctionArgs<abi_5, "pure" | "view", functionName_1>>(args: import("viem").ReadContractParameters<abi_5, functionName_1, args_2>) => Promise<import("viem").ReadContractReturnType<abi_5, functionName_1, args_2>>;
                sendRawTransaction: (args: import("viem").SendRawTransactionParameters) => Promise<`0x${string}`>;
                simulate: <const calls extends readonly unknown[]>(args: import("viem").SimulateBlocksParameters<calls>) => Promise<import("viem").SimulateBlocksReturnType<calls>>;
                simulateBlocks: <const calls_1 extends readonly unknown[]>(args: import("viem").SimulateBlocksParameters<calls_1>) => Promise<import("viem").SimulateBlocksReturnType<calls_1>>;
                simulateCalls: <const calls_2 extends readonly unknown[]>(args: import("viem").SimulateCallsParameters<calls_2>) => Promise<import("viem").SimulateCallsReturnType<calls_2>>;
                simulateContract: <const abi_6 extends import("viem").Abi | readonly unknown[], functionName_2 extends import("viem").ContractFunctionName<abi_6, "nonpayable" | "payable">, const args_3 extends import("viem").ContractFunctionArgs<abi_6, "nonpayable" | "payable", functionName_2>, chainOverride_3 extends import("viem").Chain | undefined, accountOverride_1 extends `0x${string}` | import("viem").Account | undefined = undefined>(args: import("viem").SimulateContractParameters<abi_6, functionName_2, args_3, import("viem").Chain | undefined, chainOverride_3, accountOverride_1>) => Promise<import("viem").SimulateContractReturnType<abi_6, functionName_2, args_3, import("viem").Chain | undefined, import("viem").Account | undefined, chainOverride_3, accountOverride_1>>;
                verifyMessage: (args: {
                    address: `0x${string}`;
                    blockNumber?: bigint | undefined;
                    blockTag?: import("viem").BlockTag | undefined;
                    factory?: `0x${string}` | undefined;
                    factoryData?: `0x${string}` | undefined;
                    signature: `0x${string}` | import("viem").Signature | Uint8Array;
                    universalSignatureVerifierAddress?: `0x${string}` | undefined;
                    message: import("viem").SignableMessage;
                }) => Promise<boolean>;
                verifySiweMessage: (args: {
                    blockNumber?: bigint | undefined;
                    blockTag?: import("viem").BlockTag | undefined;
                    address?: `0x${string}` | undefined;
                    nonce?: string | undefined;
                    domain?: string | undefined;
                    scheme?: string | undefined;
                    time?: Date | undefined;
                    message: string;
                    signature: `0x${string}`;
                }) => Promise<boolean>;
                verifyTypedData: (args: import("viem").VerifyTypedDataActionParameters) => Promise<boolean>;
                uninstallFilter: (args: import("viem").UninstallFilterParameters) => Promise<boolean>;
                waitForTransactionReceipt: (args: import("viem").WaitForTransactionReceiptParameters<import("viem").Chain | undefined>) => Promise<import("viem").TransactionReceipt>;
                watchBlockNumber: (args: import("viem").WatchBlockNumberParameters) => import("viem").WatchBlockNumberReturnType;
                watchBlocks: <includeTransactions_1 extends boolean = false, blockTag_2 extends import("viem").BlockTag = "latest">(args: import("viem").WatchBlocksParameters<import("viem").Transport, import("viem").Chain | undefined, includeTransactions_1, blockTag_2>) => import("viem").WatchBlocksReturnType;
                watchContractEvent: <const abi_7 extends import("viem").Abi | readonly unknown[], eventName_4 extends import("viem").ContractEventName<abi_7>, strict_6 extends boolean | undefined = undefined>(args: import("viem").WatchContractEventParameters<abi_7, eventName_4, strict_6, import("viem").Transport>) => import("viem").WatchContractEventReturnType;
                watchEvent: <const abiEvent_2 extends import("viem").AbiEvent | undefined = undefined, const abiEvents_2 extends readonly unknown[] | readonly import("viem").AbiEvent[] | undefined = abiEvent_2 extends import("viem").AbiEvent ? [abiEvent_2] : undefined, strict_7 extends boolean | undefined = undefined>(args: import("viem").WatchEventParameters<abiEvent_2, abiEvents_2, strict_7, import("viem").Transport>) => import("viem").WatchEventReturnType;
                watchPendingTransactions: (args: import("viem").WatchPendingTransactionsParameters<import("viem").Transport>) => import("viem").WatchPendingTransactionsReturnType;
                extend: <const client extends {
                    [x: string]: unknown;
                    account?: undefined;
                    batch?: undefined;
                    cacheTime?: undefined;
                    ccipRead?: undefined;
                    chain?: undefined;
                    key?: undefined;
                    name?: undefined;
                    pollingInterval?: undefined;
                    request?: undefined;
                    transport?: undefined;
                    type?: undefined;
                    uid?: undefined;
                } & import("viem").ExactPartial<Pick<import("viem").PublicActions<import("viem").Transport, import("viem").Chain | undefined, undefined>, "call" | "createContractEventFilter" | "createEventFilter" | "estimateContractGas" | "estimateGas" | "getBlock" | "getBlockNumber" | "getChainId" | "getContractEvents" | "getEnsText" | "getFilterChanges" | "getGasPrice" | "getLogs" | "getTransaction" | "getTransactionCount" | "getTransactionReceipt" | "prepareTransactionRequest" | "readContract" | "sendRawTransaction" | "simulateContract" | "uninstallFilter" | "watchBlockNumber" | "watchContractEvent"> & Pick<import("viem").WalletActions<import("viem").Chain | undefined, undefined>, "sendTransaction" | "writeContract">>>(fn: (client: import("viem").Client<import("viem").Transport, import("viem").Chain | undefined, undefined, import("viem").PublicRpcSchema, import("viem").PublicActions<import("viem").Transport, import("viem").Chain | undefined>>) => client) => import("viem").Client<import("viem").Transport, import("viem").Chain | undefined, undefined, import("viem").PublicRpcSchema, { [K_2 in keyof client]: client[K_2]; } & import("viem").PublicActions<import("viem").Transport, import("viem").Chain | undefined>>;
            };
            oracleClients: OracleClients;
            vaultAddress: `0x${string}`;
            address?: `0x${string}` | undefined;
            marketOracles?: import("../../constants").SupportedMarketMapping<{
                market: import("../..").SupportedMarket;
                marketAddress: `0x${string}`;
                oracleName: string;
                oracleFactoryAddress: `0x${string}`;
                oracleAddress: `0x${string}`;
                subOracleFactoryAddress: `0x${string}`;
                subOracleAddress: `0x${string}`;
                subOracleFactoryType: string;
                id: `0x${string}`;
                underlyingId: `0x${string}`;
                minValidTime: bigint;
                staleAfter: bigint;
                maxSettlementFee: bigint;
                commitmentGasOracle: `0x${string}`;
                settlementGasOracle: `0x${string}`;
            }> | undefined;
            vaultSnapshots?: {
                user: {
                    alpha?: import("./chain").VaultAccountSnapshot | undefined;
                    bravo?: import("./chain").VaultAccountSnapshot | undefined;
                } | undefined;
                vault: {
                    alpha?: VaultSnapshot | undefined;
                    bravo?: VaultSnapshot | undefined;
                };
                commitments: readonly `0x${string}`[];
                settles: readonly `0x${string}`[];
                updates: readonly `0x${string}`[];
            } | undefined;
        }> & OptionalAddress) => Promise<`0x${string}`>;
    };
}
export {};
//# sourceMappingURL=index.d.ts.map