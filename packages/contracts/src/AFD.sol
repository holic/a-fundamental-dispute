// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import {NFT} from "./NFT.sol";
import {IERC721} from "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import {BitMaps} from "@openzeppelin/contracts/utils/structs/BitMaps.sol";

/// @author frolic.eth
/// @title  A Fundamental Dispute
contract AFundamentalDispute is NFT {
    using BitMaps for BitMaps.BitMap;

    uint256 public constant publicPrice = 0.1 ether;
    uint256 public constant holderPrice = 0.08 ether;

    IERC721 public immutable foldedFaces;
    BitMaps.BitMap internal foldedFacesUsed;

    event TokenDiscountUsed(address token, uint256 tokenId);

    // ****************** //
    // *** INITIALIZE *** //
    // ****************** //

    constructor(IERC721 _foldedFaces, address artist, address developer)
        NFT("A Fundamental Dispute", "AFUNDAMENTALDISPUTE", 218)
    {
        foldedFaces = _foldedFaces;

        // Mint ~9% of supply to creators in lieu of royalties
        _mintERC2309(artist, 10);
        _mintERC2309(developer, 10);
    }

    // ******************* //
    // *** PUBLIC MINT *** //
    // ******************* //

    function mint()
        external
        payable
        hasExactPayment(publicPrice)
        withinMaxSupply(1)
        withinMintLimit(1, 1)
    {
        _safeMint(msg.sender, 1);
    }

    // ******************* //
    // *** HOLDER MINT *** //
    // ******************* //

    error NoValidTokenDiscount(address token, uint256[] tokenIds);

    function hasUsedFoldedFaces(uint256 tokenId) public view returns (bool) {
        return foldedFacesUsed.get(tokenId);
    }

    function foldedFacesMint(uint256[] calldata tokenIds)
        external
        payable
        hasExactPayment(holderPrice)
        withinMaxSupply(1)
        withinMintLimit(1, 1)
    {
        uint256 tokenId;
        for (uint256 i = 0; i < tokenIds.length; i++) {
            tokenId = tokenIds[i];
            if (foldedFacesUsed.get(tokenId)) continue;
            if (foldedFaces.ownerOf(tokenId) != msg.sender) continue;

            foldedFacesUsed.set(tokenId);
            emit TokenDiscountUsed(address(foldedFaces), tokenId);
            _safeMint(msg.sender, 1);
            return;
        }

        revert NoValidTokenDiscount(address(foldedFaces), tokenIds);
    }

    // ******************* //
    // *** AFTER MINT *** //
    // ******************* //

    function _extraData(address from, address to, uint24 previousExtraData)
        internal
        view
        override
        returns (uint24)
    {
        if (previousExtraData != 0) {
            return previousExtraData;
        }
        return uint24(
            uint256(
                keccak256(
                    abi.encode(
                        block.difficulty, blockhash(block.number - 1), from, to
                    )
                )
            )
        );
    }
}
