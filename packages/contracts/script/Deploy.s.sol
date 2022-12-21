// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "forge-std/Script.sol";
import {IFileStore} from "ethfs/IFileStore.sol";
import {IERC721A} from "erc721a/contracts/IERC721A.sol";
import {AFundamentalDispute} from "../src/AFD.sol";
import {AFDPublicMint} from "../src/AFDPublicMint.sol";
import {AFDRenderer} from "../src/AFDRenderer.sol";

contract Deploy is Script {
    using stdJson for string;

    function run() public {
        vm.startBroadcast();

        AFundamentalDispute token = new AFundamentalDispute();
        AFDRenderer renderer = new AFDRenderer(
            IERC721A(token),
            IFileStore(fileStore())
        );
        token.setRenderer(renderer);
        // TODO: figure out price
        AFDPublicMint minter = new AFDPublicMint(token, 0.001 ether);
        token.setMinter(address(minter));

        (bool success, bytes memory data) = address(minter).call{
            value: 0.002 ether
        }(abi.encodeWithSignature("mint(uint256)", 2));

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

        string memory afdMinter = "afdMinter";
        afdMinter.serialize("contractAddress", address(minter));
        afdMinter.serialize("deployer", msg.sender);
        afdMinter = afdMinter.serialize("blockNumber", block.number);
        // TODO: find a way to get tx hash

        string memory deploy = "deploy";
        deploy.serialize("AFundamentalDispute", afdToken);
        deploy.serialize("AFDRenderer", afdRenderer);
        deploy = deploy.serialize("AFDPublicMint", afdMinter);
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
