// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {IDelegatedMint} from "./IDelegatedMint.sol";

/// @author frolic.eth
/// @title NFT minting logic
contract ExampleNFTMinter is Ownable {
    IDelegatedMint public nft;
    uint256 public immutable price;

    event Initialized();

    // ****************** //
    // *** INITIALIZE *** //
    // ****************** //

    constructor(uint256 _price) {
        price = _price;
        emit Initialized();
    }

    // ****************** //
    // *** CONDITIONS *** //
    // ****************** //

    error MintLimitExceeded(uint256 limit);
    error MintSupplyExceeded(uint256 supply);
    error WrongPayment();

    modifier withinMintLimit(uint256 limit, uint256 numToBeMinted) {
        if (nft.numberMinted(msg.sender) + numToBeMinted > limit) {
            revert MintLimitExceeded(limit);
        }
        _;
    }

    modifier hasExactPayment(uint256 numToBeMinted) {
        if (msg.value != price * numToBeMinted) {
            revert WrongPayment();
        }
        _;
    }

    // ************ //
    // *** MINT *** //
    // ************ //

    function mint(uint256 numToBeMinted)
        external
        payable
        hasExactPayment(numToBeMinted)
        withinMintLimit(4, numToBeMinted)
    {
        // TODO: mint in batches for ownership data?
        nft.safeMint(msg.sender, numToBeMinted);
    }

    // ************* //
    // *** ADMIN *** //
    // ************* //

    function withdrawAll() external onlyOwner {
        require(address(this).balance > 0, "Zero balance");
        (bool sent, ) = owner().call{value: address(this).balance}("");
        require(sent, "Failed to withdraw");
    }

    function withdrawAllERC20(IERC20 token) external onlyOwner {
        token.transfer(owner(), token.balanceOf(address(this)));
    }
}
