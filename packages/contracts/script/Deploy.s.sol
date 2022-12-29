// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "forge-std/Script.sol";
import {IFileStore} from "ethfs/IFileStore.sol";
import {NFT} from "../src/NFT.sol";
import {AFundamentalDispute} from "../src/AFD.sol";
import {AFDRenderer} from "../src/AFDRenderer.sol";

contract Deploy is Script {
    using stdJson for string;

    function run() public {
        vm.startBroadcast();

        AFundamentalDispute token = new AFundamentalDispute();
        AFDRenderer renderer = new AFDRenderer(
            NFT(token),
            IFileStore(fileStore())
        );
        token.setRenderer(renderer);
        // TODO: figure out price

        // (bool success, bytes memory data) = address(token).call{
        //     value: 0.1 ether
        // }(abi.encodeWithSignature("mint(uint256)", 1));

        vm.stopBroadcast();

        // Foundry's JSON serializing API is weeeiirdd

        string memory afdToken = "aftToken";
        afdToken.serialize("contractAddress", address(token));
        afdToken.serialize("deployer", msg.sender);
        afdToken = afdToken.serialize("blockNumber", block.number);
        // TODO: find a way to get tx hash

        string memory afdRenderer = "afdRenderer";
        afdRenderer.serialize("contractAddress", address(renderer));
        afdRenderer.serialize("deployer", msg.sender);
        afdRenderer = afdRenderer.serialize("blockNumber", block.number);
        // TODO: find a way to get tx hash

        string memory deploy = "deploy";
        deploy.serialize("AFundamentalDispute", afdToken);
        deploy = deploy.serialize("AFDRenderer", afdRenderer);
        deploy.write(
            string.concat("packages/contracts/deploys/", chainName(), ".json")
        );
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
