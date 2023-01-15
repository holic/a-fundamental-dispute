// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import {NFT} from "./NFT.sol";
import {IERC721} from "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import {BitMaps} from "@openzeppelin/contracts/utils/structs/BitMaps.sol";

/// @author frolic.eth
/// @title  A Fundamental Dispute
contract AFundamentalDispute is NFT {
    using BitMaps for BitMaps.BitMap;

    uint256 public constant publicPrice = 0.12 ether;
    uint256 public constant holderPrice = 0.08 ether;

    IERC721 public immutable foldedFaces;
    BitMaps.BitMap internal foldedFacesUsed;

    event TokenDiscountUsed(address token, uint256 tokenId);

    // ****************** //
    // *** INITIALIZE *** //
    // ****************** //

    constructor(IERC721 _foldedFaces, address artist, address developer)
        NFT("A Fundamental Dispute", "AFUNDAMENTALDISPUTE", 436)
    {
        foldedFaces = _foldedFaces;

        // Mint ~10% of supply to creators in lieu of royalties
        _mintERC2309(artist, 21);
        _mintERC2309(developer, 21);
    }

    // ******************* //
    // *** PUBLIC MINT *** //
    // ******************* //

    function mint()
        external
        payable
        hasExactPayment(publicPrice)
        withinMaxSupply
        withinMintLimit(2)
    {
        _mint(msg.sender, 1);
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
        withinMaxSupply
        withinMintLimit(2)
    {
        uint256 tokenId;
        for (uint256 i = 0; i < tokenIds.length; i++) {
            tokenId = tokenIds[i];
            if (foldedFacesUsed.get(tokenId)) continue;
            if (foldedFaces.ownerOf(tokenId) != msg.sender) continue;

            foldedFacesUsed.set(tokenId);
            emit TokenDiscountUsed(address(foldedFaces), tokenId);
            _mint(msg.sender, 1);
            return;
        }

        revert NoValidTokenDiscount(address(foldedFaces), tokenIds);
    }

    // **************** //
    // *** INTERNAL *** //
    // **************** //

    function tokenSeed(uint256 tokenId) public view returns (uint24) {
        return uint24(
            uint256(
                keccak256(
                    abi.encode(tokenId, explicitOwnershipOf(tokenId).extraData)
                )
            )
        );
    }

    function generateSeed(bytes memory entropy) public view returns (uint24) {
        return uint24(
            uint256(
                keccak256(
                    abi.encode(
                        block.difficulty,
                        blockhash(block.number - 1),
                        msg.sender,
                        entropy
                    )
                )
            )
        );
    }

    function _extraData(address from, address to, uint24 previousExtraData)
        internal
        view
        override
        returns (uint24)
    {
        if (previousExtraData != 0) {
            return previousExtraData;
        }
        return generateSeed(abi.encode(from, to));
    }

    uint256 public lastDispute = block.number;
    uint256 public disputes = 218;

    function dispute(uint256 tokenId) external {
        require(disputes > 0, "It's time to listen");
        require(block.number - lastDispute >= 2180, "Now is not the time");
        require(_exists(tokenId), "There is nothing to dispute");
        require(msg.sender == ownerOf(tokenId), "We are in agreement");

        if (_ownershipAt(tokenId).extraData == 0) {
            _initializeOwnershipAt(tokenId);
        }
        if (
            tokenId + 1 < _nextTokenId()
                && _ownershipAt(tokenId + 1).extraData == 0
        ) {
            _initializeOwnershipAt(tokenId + 1);
        }

        disputes -= 1;
        lastDispute = block.number;
        _setExtraDataAt(tokenId, generateSeed(abi.encode(tokenId, disputes)));
        emit MetadataUpdate(tokenId);
    }
}
