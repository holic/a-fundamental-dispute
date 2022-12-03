// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import {ERC721A} from "erc721a/contracts/ERC721A.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {IERC2981, IERC165} from "@openzeppelin/contracts/interfaces/IERC2981.sol";
import {IRenderer} from "./IRenderer.sol";
import {IDelegatedMint} from "./IDelegatedMint.sol";

/// @author frolic.eth
/// @title  ERC721 base contract
/// @notice ERC721-specific functionality to keep the actual NFT contract more
///         readable and focused on the mint/project mechanics.
abstract contract NFT is ERC721A, Ownable, IERC2981, IRenderer, IDelegatedMint {
    uint256 public immutable maxSupply;
    // TODO: customizable royalty? future proof royalty implementation?
    uint256 public immutable royaltyBasisPoints = 500;

    address public minter;
    IRenderer public renderer;
    string public baseTokenURI;

    event Initialized();
    event MinterUpdated(address previousMinter, address newMinter);
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

    // ********************** //
    // *** DELEGATED MINT *** //
    // ********************** //

    error NotDelegatedMinter();
    error MaxSupplyExceeded(uint256 supply);

    modifier onlyDelegatedMinter() {
        if (msg.sender != minter) {
            revert NotDelegatedMinter();
        }
        _;
    }

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

    function mint(address to, uint256 quantity)
        external
        onlyDelegatedMinter
        withinMaxSupply(quantity)
    {
        _mint(to, quantity);
    }

    function safeMint(address to, uint256 quantity)
        external
        onlyDelegatedMinter
        withinMaxSupply(quantity)
    {
        _safeMint(to, quantity);
    }

    function safeMint(
        address to,
        uint256 quantity,
        bytes memory data
    ) external onlyDelegatedMinter withinMaxSupply(quantity) {
        _safeMint(to, quantity, data);
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
        override(ERC721A, IRenderer)
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

    function supportsInterface(bytes4 _interfaceId)
        public
        view
        override(ERC721A, IERC165)
        returns (bool)
    {
        return
            _interfaceId == type(IERC2981).interfaceId ||
            super.supportsInterface(_interfaceId);
    }

    function royaltyInfo(uint256, uint256 salePrice)
        external
        view
        returns (address, uint256)
    {
        return (address(this), (salePrice * royaltyBasisPoints) / 10000);
    }

    // ************* //
    // *** ADMIN *** //
    // ************* //

    function setMinter(address _minter) external onlyOwner {
        emit MinterUpdated(minter, _minter);
        minter = _minter;
    }

    function setRenderer(IRenderer _renderer) external onlyOwner {
        emit RendererUpdated(renderer, _renderer);
        renderer = _renderer;
    }

    function setBaseTokenURI(string calldata _baseTokenURI) external onlyOwner {
        emit BaseTokenURIUpdated(baseTokenURI, _baseTokenURI);
        baseTokenURI = _baseTokenURI;
    }

    function withdrawAll() external onlyOwner {
        require(address(this).balance > 0, "Zero balance");
        (bool sent, ) = owner().call{value: address(this).balance}("");
        require(sent, "Failed to withdraw");
    }

    function withdrawAllERC20(IERC20 token) external onlyOwner {
        token.transfer(owner(), token.balanceOf(address(this)));
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
