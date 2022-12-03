// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import {IERC721} from "@openzeppelin/contracts/interfaces/IERC721.sol";
import {IRenderer} from "./IRenderer.sol";

/// @author frolic.eth
/// @title  Example NFT
contract ExampleNFTRenderer is IRenderer {
    IERC721 public immutable nft;

    constructor(IERC721 _nft) {
        nft = _nft;
    }

    function tokenURI(uint256 tokenId)
        external
        pure
        override
        returns (string memory)
    {
        return "https://example.com";
    }
}
