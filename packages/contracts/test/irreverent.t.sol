// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "forge-std/Test.sol";
import {AFundamentalDispute} from "../src/AFD.sol";
import {NFT} from "../src/NFT.sol";
import {IERC721} from "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import {ERC721} from "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import {ERC721A} from "erc721a/contracts/ERC721A.sol";
import {IERC721A} from "erc721a/contracts/IERC721A.sol";

contract Mock721 is ERC721 {
    constructor() ERC721("Mock 721 Collection", "M721") {}

    function airdrop(address _recipient, uint256 _tokenId) public {
        _mint(_recipient, _tokenId);
    }
}

contract IrreverentTest is Test {
    AFundamentalDispute private nftContract;
    Mock721 private mock721 = new Mock721();

    address private artist = makeAddr("artist");
    address private developer = makeAddr("developer");
    address private alice = makeAddr("alice");
    address private bob = makeAddr("bob");

    mapping(uint24 => bool) seedUsed;

    function setUp() public {
        nftContract =
            new AFundamentalDispute(IERC721(mock721), artist, developer);
        nftContract.setSharedSigner(nftContract.signatureNotRequired());
    }

    /// Test that the contract was initialized correctly with the correct
    /// initial allocation to the artist and developer
    function testIrreverentSetup() public {
        // tokenId starts at 1 not 0
        vm.expectRevert(IERC721A.OwnerQueryForNonexistentToken.selector);
        assertEq(nftContract.ownerOf(0), address(0));

        assertEq(nftContract.balanceOf(artist), 21);
        assertEq(nftContract.ownerOf(1), artist);
        assertEq(nftContract.ownerOf(21), artist);

        assertEq(nftContract.balanceOf(developer), 21);
        assertEq(nftContract.ownerOf(22), developer);
        assertEq(nftContract.ownerOf(42), developer);

        assertEq(nftContract.totalMinted(), 42);
    }

    /// Test minting a single NFT with the correct payment
    function testIrreverentMint1() public {
        assertEq(nftContract.balanceOf(alice), 0);

        startHoax(alice);
        nftContract.mint{value: 0.12 ether}(new bytes(0));

        assertEq(nftContract.ownerOf(43), alice);
        assertEq(nftContract.balanceOf(alice), 1);
        assertEq(nftContract.totalMinted(), 43);
    }

    /// Test minting 3x which should fail after the second
    function testIrreverentMint3() public {
        assertEq(nftContract.balanceOf(alice), 0);
        assertEq(nftContract.totalMinted(), 42);

        startHoax(alice);
        nftContract.mint{value: 0.12 ether}(new bytes(0));
        nftContract.mint{value: 0.12 ether}(new bytes(0));

        vm.expectRevert(
            abi.encodeWithSelector(NFT.MintLimitExceeded.selector, 0)
        );
        nftContract.mint{value: 0.12 ether}(new bytes(0));

        assertEq(nftContract.ownerOf(44), alice);

        vm.expectRevert(IERC721A.OwnerQueryForNonexistentToken.selector);
        assertEq(nftContract.ownerOf(45), address(0));

        assertEq(nftContract.balanceOf(alice), 2);
        assertEq(nftContract.totalMinted(), 44);
    }

    /// Test minting 3x which should fail after the second
    function testIrreverentMintWrongPayment() public {
        startHoax(alice);

        vm.expectRevert(
            abi.encodeWithSelector(NFT.WrongPayment.selector, 0.12 ether)
        );
        nftContract.mint{value: 0.08 ether}(new bytes(0));

        vm.expectRevert(
            abi.encodeWithSelector(NFT.WrongPayment.selector, 0.12 ether)
        );
        nftContract.mint(new bytes(0));

        vm.expectRevert(
            abi.encodeWithSelector(NFT.WrongPayment.selector, 0.12 ether)
        );
        nftContract.mint{value: 12 ether}(new bytes(0));

        assertEq(nftContract.balanceOf(alice), 0);
        assertEq(nftContract.totalMinted(), 42);
    }

    /// Test minting using a single folded faces discount
    function testIrreverentFF1Discount() public {
        mock721.airdrop(alice, 0);

        uint256[] memory mockTokenIds = new uint256[](1);
        mockTokenIds[0] = 0;

        startHoax(alice);
        nftContract.foldedFacesMint{value: 0.08 ether}(
            mockTokenIds, new bytes(0)
        );

        assertEq(nftContract.ownerOf(43), alice);

        assertEq(nftContract.balanceOf(alice), 1);
        assertEq(nftContract.totalMinted(), 43);
    }

    /// Test minting using three folded faces discount
    function testIrreverentFFTooMany() public {
        mock721.airdrop(alice, 0);
        mock721.airdrop(alice, 1);
        mock721.airdrop(alice, 2);

        uint256[] memory mockTokenIds = new uint256[](3);
        mockTokenIds[0] = 0;
        mockTokenIds[1] = 1;
        mockTokenIds[2] = 2;

        startHoax(alice);
        nftContract.foldedFacesMint{value: 0.08 ether}(
            mockTokenIds, new bytes(0)
        );
        nftContract.foldedFacesMint{value: 0.08 ether}(
            mockTokenIds, new bytes(0)
        );

        vm.expectRevert(
            abi.encodeWithSelector(NFT.MintLimitExceeded.selector, 0)
        );
        nftContract.foldedFacesMint{value: 0.08 ether}(
            mockTokenIds, new bytes(0)
        );

        assertEq(nftContract.ownerOf(43), alice);
        assertEq(nftContract.ownerOf(44), alice);

        assertEq(nftContract.balanceOf(alice), 2);
        assertEq(nftContract.totalMinted(), 44);
    }

    /// Test minting using two folded faces discount
    function testIrreverentFF2Discount() public {
        mock721.airdrop(alice, 0);
        mock721.airdrop(alice, 1);

        uint256[] memory mockTokenIds = new uint256[](2);
        mockTokenIds[0] = 0;
        mockTokenIds[1] = 1;

        startHoax(alice);
        nftContract.foldedFacesMint{value: 0.08 ether}(
            mockTokenIds, new bytes(0)
        );
        nftContract.foldedFacesMint{value: 0.08 ether}(
            mockTokenIds, new bytes(0)
        );

        assertEq(nftContract.ownerOf(43), alice);
        assertEq(nftContract.ownerOf(44), alice);

        assertEq(nftContract.balanceOf(alice), 2);
        assertEq(nftContract.totalMinted(), 44);
    }

    /// Test minting using someone elses's folded faces discount
    function testIrreverentFFNonOwner() public {
        mock721.airdrop(alice, 0);
        mock721.airdrop(bob, 1);

        uint256[] memory mockTokenIds = new uint256[](2);
        mockTokenIds[0] = 0;
        mockTokenIds[1] = 1;

        startHoax(alice);
        nftContract.foldedFacesMint{value: 0.08 ether}(
            mockTokenIds, new bytes(0)
        );

        // revert because token 1 is owned by bob
        vm.expectRevert(
            abi.encodeWithSelector(
                AFundamentalDispute.NoValidTokenDiscount.selector,
                address(mock721),
                mockTokenIds
            )
        );
        nftContract.foldedFacesMint{value: 0.08 ether}(
            mockTokenIds, new bytes(0)
        );

        assertEq(nftContract.ownerOf(43), alice);

        assertEq(nftContract.balanceOf(alice), 1);
        assertEq(nftContract.totalMinted(), 43);
    }

    /// Test minting mixing normal and folded faces discount mints
    function testIrreverentMixedMint1() public {
        mock721.airdrop(alice, 0);
        mock721.airdrop(alice, 1);

        startHoax(alice);
        nftContract.mint{value: 0.12 ether}(new bytes(0));

        uint256[] memory mockTokenIds = new uint256[](2);
        mockTokenIds[0] = 0;
        mockTokenIds[1] = 1;

        nftContract.foldedFacesMint{value: 0.08 ether}(
            mockTokenIds, new bytes(0)
        );

        vm.expectRevert(
            abi.encodeWithSelector(NFT.MintLimitExceeded.selector, 0)
        );
        nftContract.foldedFacesMint{value: 0.08 ether}(
            mockTokenIds, new bytes(0)
        );

        assertEq(nftContract.ownerOf(43), alice);
        assertEq(nftContract.ownerOf(44), alice);

        assertEq(nftContract.balanceOf(alice), 2);
        assertEq(nftContract.totalMinted(), 44);
    }

    /// Test minting mixing folded faces discount and normal mints
    function testIrreverentMixedMint2() public {
        mock721.airdrop(alice, 0);
        mock721.airdrop(alice, 1);

        startHoax(alice);
        uint256[] memory mockTokenIds = new uint256[](2);
        mockTokenIds[0] = 0;
        mockTokenIds[1] = 1;

        nftContract.foldedFacesMint{value: 0.08 ether}(
            mockTokenIds, new bytes(0)
        );
        nftContract.foldedFacesMint{value: 0.08 ether}(
            mockTokenIds, new bytes(0)
        );

        vm.expectRevert(
            abi.encodeWithSelector(NFT.MintLimitExceeded.selector, 0)
        );
        nftContract.mint{value: 0.12 ether}(new bytes(0));

        assertEq(nftContract.ownerOf(43), alice);
        assertEq(nftContract.ownerOf(44), alice);

        assertEq(nftContract.balanceOf(alice), 2);
        assertEq(nftContract.totalMinted(), 44);
    }

    /// Test minting with discount after it has been used by someone else
    function testIrreverentReuseDiscount() public {
        mock721.airdrop(alice, 0);
        uint256[] memory mockTokenIds = new uint256[](1);
        mockTokenIds[0] = 0;

        startHoax(alice);
        nftContract.foldedFacesMint{value: 0.08 ether}(
            mockTokenIds, new bytes(0)
        );
        mock721.transferFrom(alice, bob, 0);
        vm.stopPrank();

        startHoax(bob);
        vm.expectRevert(
            abi.encodeWithSelector(
                AFundamentalDispute.NoValidTokenDiscount.selector,
                address(mock721),
                mockTokenIds
            )
        );
        nftContract.foldedFacesMint{value: 0.08 ether}(
            mockTokenIds, new bytes(0)
        );

        assertEq(nftContract.ownerOf(43), alice);

        assertEq(nftContract.balanceOf(alice), 1);
        assertEq(nftContract.balanceOf(bob), 0);
        assertEq(nftContract.totalMinted(), 43);
    }

    /// Test minting with wrong payment for FF discount
    function testIrreverentFFWrongPayment() public {
        mock721.airdrop(alice, 0);

        uint256[] memory mockTokenIds = new uint256[](1);
        mockTokenIds[0] = 0;

        startHoax(alice);
        vm.expectRevert(
            abi.encodeWithSelector(NFT.WrongPayment.selector, 0.08 ether)
        );
        nftContract.foldedFacesMint{value: 0.01 ether}(
            mockTokenIds, new bytes(0)
        );
        vm.expectRevert(
            abi.encodeWithSelector(NFT.WrongPayment.selector, 0.08 ether)
        );
        nftContract.foldedFacesMint{value: 0.12 ether}(
            mockTokenIds, new bytes(0)
        );
        vm.expectRevert(
            abi.encodeWithSelector(NFT.WrongPayment.selector, 0.08 ether)
        );
        nftContract.foldedFacesMint{value: 0.01 ether}(
            mockTokenIds, new bytes(0)
        );
        nftContract.foldedFacesMint{value: 0.08 ether}(
            mockTokenIds, new bytes(0)
        );

        assertEq(nftContract.ownerOf(43), alice);

        assertEq(nftContract.balanceOf(alice), 1);
        assertEq(nftContract.totalMinted(), 43);
    }

    /// Test minting beyond max supply
    function testIrreverentBeyondMaxSupply() public {
        for (uint256 i = 0; i < 393; i++) {
            hoax(address(uint160(i + 12345)));
            nftContract.mint{value: 0.12 ether}(new bytes(0));
        }

        startHoax(alice);
        nftContract.mint{value: 0.12 ether}(new bytes(0));

        vm.expectRevert(
            abi.encodeWithSelector(NFT.MaxSupplyExceeded.selector, 0)
        );
        nftContract.mint{value: 0.12 ether}(new bytes(0));

        assertEq(nftContract.ownerOf(436), alice);
        assertEq(nftContract.balanceOf(alice), 1);
        assertEq(nftContract.totalMinted(), 436);
    }

    /// Test dispute
    function testIrreverentDispute() public {
        startHoax(alice);
        nftContract.mint{value: 0.12 ether}(new bytes(0));

        uint24 seed = nftContract.tokenSeed(43);
        vm.roll(block.number + 2180);
        nftContract.dispute(43, new bytes(0));
        uint24 newSeed = nftContract.tokenSeed(43);
        assert(newSeed != seed);
    }

    /// Test dispute before time
    function testIrreverentDisputeNotYet() public {
        startHoax(alice);
        nftContract.mint{value: 0.12 ether}(new bytes(0));

        vm.expectRevert("Now is not the time");
        nftContract.dispute(43, new bytes(0));
    }

    /// Test disputing someone elses' token
    function testIrreverentDisputeNotOwner() public {
        hoax(alice);
        nftContract.mint{value: 0.12 ether}(new bytes(0));

        vm.roll(block.number + 2180);
        vm.prank(bob);
        vm.expectRevert("We are in agreement");
        nftContract.dispute(43, new bytes(0));
    }

    /// Test disputing multiple times
    function testIrreverentDisputeFiveTimes() public {
        startHoax(alice);
        nftContract.mint{value: 0.12 ether}(new bytes(0));

        for (uint256 i = 0; i < 5; i++) {
            uint24 seed = nftContract.tokenSeed(43);
            vm.roll(block.number + 2180);
            nftContract.dispute(43, new bytes(0));
            uint24 newSeed = nftContract.tokenSeed(43);
            assert(newSeed != seed);
        }
    }

    /// Test disputing too many times
    function testIrreverentDisputeBeyondMax() public {
        startHoax(alice);
        nftContract.mint{value: 0.12 ether}(new bytes(0));

        for (uint256 i = 0; i < 218; i++) {
            uint24 seed = nftContract.tokenSeed(43);
            vm.roll(block.number + 2180);
            nftContract.dispute(43, new bytes(0));
            uint24 newSeed = nftContract.tokenSeed(43);
            assert(newSeed != seed);
        }
        vm.roll(block.number + 2180);
        vm.expectRevert("It's time to listen");
        nftContract.dispute(43, new bytes(0));
    }

    /// Test disputing too many times
    function testIrreverentDisputeInvalidToken() public {
        startHoax(alice);

        vm.roll(block.number + 2180);
        vm.expectRevert("There is nothing to dispute");
        nftContract.dispute(43, new bytes(0));
    }

    /// Test withdraw
    function testIrreverentWithdrawToBob() public {
        uint256 balance = address(bob).balance;
        hoax(alice);
        nftContract.mint{value: 0.12 ether}(new bytes(0));

        nftContract.withdrawAll(bob);
        assertEq(address(bob).balance, 0.12 ether + balance);
    }

    /// Test withdraw with non owner
    function testIrreverentWithdrawNonOwner() public {
        startHoax(alice);
        nftContract.mint{value: 0.12 ether}(new bytes(0));

        vm.expectRevert("Ownable: caller is not the owner");
        nftContract.withdrawAll(bob);
    }

    /// Test seed stability between transfer
    function testIrreverentSeedStability() public {
        startHoax(alice);
        nftContract.mint{value: 0.12 ether}(new bytes(0));

        uint24 seed = nftContract.tokenSeed(43);
        nftContract.transferFrom(alice, bob, 43);
        uint24 newSeed = nftContract.tokenSeed(43);

        assertEq(seed, newSeed);
    }

    /// Test if all seeds are unique
    function testIrreverentSeedUniqueness() public {
        for (uint256 i = 0; i < 394; i++) {
            hoax(address(uint160(i + 12345)));
            nftContract.mint{value: 0.12 ether}(new bytes(0));
        }

        for (uint256 i = 1; i <= 396; i++) {
            uint24 seed = nftContract.tokenSeed(i);
            assert(seedUsed[seed] == false);
            seedUsed[seed] = true;
        }
    }
}
