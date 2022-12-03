// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import {NFT} from "./NFT.sol";

/// @author frolic.eth
/// @title  Example NFT
contract ExampleNFT is NFT {
    constructor() NFT("Example NFT", "EXAMPLE", 10_000) {}
}
