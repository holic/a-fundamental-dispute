// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import {NFT} from "./NFT.sol";

/// @author frolic.eth
/// @title  Example NFT
contract AFundamentalDispute is NFT {
    // TODO: finalize collection size
    constructor() NFT("A Fundamental Dispute", "AFUNDAMENTALDISPUTE", 500) {}
}
