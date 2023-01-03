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

    constructor(
        IERC721 _foldedFaces,
        address artist,
        address developer
    ) NFT("A Fundamental Dispute", "AFUNDAMENTALDISPUTE", 218) {
        foldedFaces = _foldedFaces;

        // Mint ~9% of supply to creators in lieu of royalties
        _mintERC2309(artist, 10);
        _mintERC2309(developer, 10);
    }

    error MintLimitExceeded(uint256 limit);
    error WrongPayment(uint256 expectedPayment);
    error NotTokenOwner(address token, uint256 tokenId);
    error TokenDiscountAlreadyUsed(address token, uint256 tokenId);

    function mint() external payable withinMaxSupply(1) {
        // TODO: discount for holders

        if (msg.value != publicPrice) {
            revert WrongPayment(publicPrice);
        }
        if (_numberMinted(msg.sender) > 0) {
            revert MintLimitExceeded(1);
        }

        _safeMint(msg.sender, 1);
    }

    function hasUsedFoldedFaces(uint256 tokenId) public view returns (bool) {
        return foldedFacesUsed.get(tokenId);
    }

    function foldedFacesMint(uint256 tokenId)
        external
        payable
        withinMaxSupply(1)
    {
        if (msg.value != holderPrice) {
            revert WrongPayment(holderPrice);
        }
        if (_numberMinted(msg.sender) > 0) {
            revert MintLimitExceeded(1);
        }
        if (foldedFaces.ownerOf(tokenId) != msg.sender) {
            revert NotTokenOwner(address(foldedFaces), tokenId);
        }
        if (hasUsedFoldedFaces(tokenId)) {
            revert TokenDiscountAlreadyUsed(address(foldedFaces), tokenId);
        }
        foldedFacesUsed.set(tokenId);
        emit TokenDiscountUsed(address(foldedFaces), tokenId);

        _safeMint(msg.sender, 1);
    }

    // Token seed
    function _extraData(
        address from,
        address to,
        uint24 previousExtraData
    ) internal view override returns (uint24) {
        if (previousExtraData != 0) {
            return previousExtraData;
        }
        return
            uint24(
                uint256(
                    keccak256(
                        abi.encode(
                            block.difficulty,
                            blockhash(block.number - 1),
                            from,
                            to
                        )
                    )
                )
            );
    }
}
