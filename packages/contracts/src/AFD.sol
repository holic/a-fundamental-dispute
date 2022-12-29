// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import {NFT} from "./NFT.sol";

/// @author frolic.eth
/// @title  A Fundamental Dispute
contract AFundamentalDispute is NFT {
    uint256 public constant publicPrice = 0.1 ether;
    uint256 public constant holderPrice = 0.08 ether;

    // TODO: genlight address
    address public constant artist =
        address(0xC9C022FCFebE730710aE93CA9247c5Ec9d9236d0);
    address public constant developer =
        address(0xC9C022FCFebE730710aE93CA9247c5Ec9d9236d0);

    constructor() NFT("A Fundamental Dispute", "AFUNDAMENTALDISPUTE", 218) {
        // Mint ~9% of supply to creators in lieu of royalties
        _mintERC2309(artist, 14);
        _mintERC2309(developer, 6);
    }

    error MintLimitExceeded(uint256 limit);
    error WrongPayment(uint256 expectedPayment);

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
                            to,
                            gasleft()
                        )
                    )
                )
            );
    }
}
