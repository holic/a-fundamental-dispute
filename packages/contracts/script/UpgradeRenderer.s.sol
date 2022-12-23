// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "forge-std/Script.sol";
import {IFileStore} from "ethfs/IFileStore.sol";
import {IERC721A} from "erc721a/contracts/IERC721A.sol";
import {AFundamentalDispute} from "../src/AFD.sol";
import {AFDRenderer} from "../src/AFDRenderer.sol";

contract UpgradeRenderer is Script {
    using stdJson for string;

    function run() public {
        vm.startBroadcast();

        AFundamentalDispute token = AFundamentalDispute(
            0xAA6840427974FD3920071649D8766CbCbC6F4eB4
        );
        AFDRenderer renderer = new AFDRenderer(
            IERC721A(token),
            IFileStore(fileStore())
        );
        token.setRenderer(renderer);

        vm.stopBroadcast();
    }

    function fileStore() public view returns (address) {
        if (chainId() == 5) {
            return 0x5E348d0975A920E9611F8140f84458998A53af94;
        }
        revert("Unsupported chain");
    }

    function chainName() public view returns (string memory) {
        if (chainId() == 5) {
            return "goerli";
        }
        revert("Unsupported chain");
    }

    function chainId() public view returns (uint256) {
        uint256 id;
        assembly {
            id := chainid()
        }
        return id;
    }
}
