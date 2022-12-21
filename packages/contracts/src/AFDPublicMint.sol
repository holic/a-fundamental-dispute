// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {IDelegatedMint} from "./IDelegatedMint.sol";
import {OwnablePayable} from "./OwnablePayable.sol";

/// @author frolic.eth
/// @title A Fundamental Dispute minting logic
contract AFDPublicMint is OwnablePayable {
    IDelegatedMint public token;
    uint256 public immutable price;

    event Initialized();

    constructor(IDelegatedMint _token, uint256 _price) {
        token = _token;
        price = _price;
        emit Initialized();
    }

    error MintLimitExceeded(uint256 limit);
    error WrongPayment();

    function mint(uint256 numToBeMinted) external payable {
        if (msg.value != price * numToBeMinted) {
            revert WrongPayment();
        }
        if (token.numberMinted(msg.sender) + numToBeMinted > 4) {
            revert MintLimitExceeded(4);
        }

        token.safeMint(msg.sender, numToBeMinted);
    }
}
