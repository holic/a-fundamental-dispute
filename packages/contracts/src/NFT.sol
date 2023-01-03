// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import {IERC721A} from "erc721a/contracts/IERC721A.sol";
import {ERC721A} from "erc721a/contracts/ERC721A.sol";
import {ERC721AQueryable} from "erc721a/contracts/extensions/ERC721AQueryable.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {IERC2981, IERC165} from "@openzeppelin/contracts/interfaces/IERC2981.sol";
import {ERC2981} from "@openzeppelin/contracts/token/common/ERC2981.sol";
import {IRenderer} from "./IRenderer.sol";
import {OwnablePayable} from "./OwnablePayable.sol";

/// @author frolic.eth
/// @title  ERC721 base contract
/// @notice ERC721-specific functionality to keep the actual NFT contract more
///         readable and focused on the mint/project mechanics.
abstract contract NFT is ERC721A, ERC721AQueryable, OwnablePayable, ERC2981 {
    uint256 public immutable maxSupply;
    // TODO: upgradeable transfer hooks?

    IERC2981 public royaltyProvider;
    IRenderer public renderer;
    string public baseTokenURI;

    event Initialized();
    event RendererUpdated(IRenderer previousRenderer, IRenderer newRenderer);
    event BaseTokenURIUpdated(
        string previousBaseTokenURI,
        string newBaseTokenURI
    );

    // ****************** //
    // *** INITIALIZE *** //
    // ****************** //

    constructor(
        string memory name,
        string memory symbol,
        uint256 _maxSupply
    ) ERC721A(name, symbol) {
        maxSupply = _maxSupply;
        emit Initialized();
    }

    function _startTokenId() internal pure override returns (uint256) {
        return 1;
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721A, IERC721A, ERC2981)
        returns (bool)
    {
        return
            ERC721A.supportsInterface(interfaceId) ||
            ERC2981.supportsInterface(interfaceId);
    }

    // ************ //
    // *** MINT *** //
    // ************ //

    error MaxSupplyExceeded(uint256 supply);

    modifier withinMaxSupply(uint256 numToBeMinted) {
        if (totalMinted() + numToBeMinted > maxSupply) {
            revert MaxSupplyExceeded(maxSupply);
        }
        _;
    }

    function totalMinted() public view returns (uint256) {
        return _totalMinted();
    }

    function numberMinted(address owner) public view returns (uint256) {
        return _numberMinted(owner);
    }

    // ****************** //
    // *** AFTER MINT *** //
    // ****************** //

    function _baseURI() internal view override returns (string memory) {
        return baseTokenURI;
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721A, IERC721A)
        returns (string memory)
    {
        if (address(renderer) != address(0)) {
            return renderer.tokenURI(tokenId);
        }
        return super.tokenURI(tokenId);
    }

    // ***************** //
    // *** ROYALTIES *** //
    // ***************** //

    function royaltyInfo(uint256 tokenId, uint256 salePrice)
        public
        view
        override
        returns (address, uint256)
    {
        if (address(royaltyProvider) != address(0)) {
            return royaltyProvider.royaltyInfo(tokenId, salePrice);
        }
        return super.royaltyInfo(tokenId, salePrice);
    }

    // ************* //
    // *** ADMIN *** //
    // ************* //

    function setRoyaltyProvider(IERC2981 _royaltyProvider) external onlyOwner {
        royaltyProvider = _royaltyProvider;
    }

    function setDefaultRoyalty(uint96 _royaltyBasisPoints) external onlyOwner {
        _setDefaultRoyalty(address(this), _royaltyBasisPoints);
    }

    function setRenderer(IRenderer _renderer) external onlyOwner {
        emit RendererUpdated(renderer, _renderer);
        renderer = _renderer;
    }

    function setBaseTokenURI(string calldata _baseTokenURI) external onlyOwner {
        emit BaseTokenURIUpdated(baseTokenURI, _baseTokenURI);
        baseTokenURI = _baseTokenURI;
    }

    // Can be run any time after mint to optimize gas for future transfers
    function normalizeOwnership(uint256 startTokenId, uint256 quantity)
        external
    {
        for (uint256 i = 0; i < quantity; i++) {
            _initializeOwnershipAt(startTokenId + i);
        }
    }
}
