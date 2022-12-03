// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

/// @author frolic.eth
/// @title  Upgradeable minter interface
/// @notice This leaves room for us to change how mint mechanics work.
interface IDelegatedMint {
    function maxSupply() external view returns (uint256);

    function totalMinted() external view returns (uint256);

    function numberMinted(address owner) external view returns (uint256);

    function mint(address to, uint256 quantity) external;

    function safeMint(address to, uint256 quantity) external;

    function safeMint(
        address to,
        uint256 quantity,
        bytes memory _data
    ) external;
}
