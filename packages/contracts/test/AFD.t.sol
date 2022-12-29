// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "forge-std/Test.sol";
import {ContentStore} from "ethfs/ContentStore.sol";
import {FileStore} from "ethfs/FileStore.sol";
import {IFileStore} from "ethfs/IFileStore.sol";
import {AFundamentalDispute} from "../src/AFD.sol";
import {AFDRenderer} from "../src/AFDRenderer.sol";

contract AFDTest is Test {
    AFundamentalDispute private token;

    ContentStore private contentStore = new ContentStore();
    FileStore private fileStore = new FileStore(contentStore);

    address private owner = makeAddr("owner");
    address private minter = makeAddr("minter");

    function setUp() public {
        vm.deal(owner, 10 ether);
        vm.deal(minter, 10 ether);

        vm.startPrank(owner);
        token = new AFundamentalDispute();
        AFDRenderer renderer = new AFDRenderer(token, IFileStore(fileStore));
        token.setRenderer(renderer);
        vm.stopPrank();
    }

    function testMint() public {
        assertEq(token.balanceOf(minter), 0);

        vm.expectRevert(
            abi.encodeWithSelector(
                AFundamentalDispute.WrongPayment.selector,
                0.1 ether
            )
        );
        token.mint{value: 1 ether}();

        vm.prank(minter);
        token.mint{value: 0.1 ether}();
        assertEq(token.balanceOf(minter), 1);
        uint256 tokenId = token.totalMinted();
        assertEq(tokenId, 21);
        assertEq(token.ownerOf(tokenId), minter);
        assertEq(token.ownershipOf(tokenId).extraData, 2217073);

        vm.prank(minter);
        vm.expectRevert(
            abi.encodeWithSelector(
                AFundamentalDispute.MintLimitExceeded.selector,
                1
            )
        );
        token.mint{value: 0.1 ether}();
    }
}
