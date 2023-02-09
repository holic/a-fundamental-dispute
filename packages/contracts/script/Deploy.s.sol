// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "forge-std/Script.sol";
import {IERC721} from "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import {IFileStore} from "ethfs/IFileStore.sol";
import {AFundamentalDispute} from "../src/AFD.sol";
import {AFDRenderer} from "../src/AFDRenderer.sol";

contract Deploy is Script {
    using stdJson for string;

    function run() public {
        vm.startBroadcast();

        address artist = address(0x879fa72912012b3906c5FE41E83A72E140300203);
        address developer = address(0xC9C022FCFebE730710aE93CA9247c5Ec9d9236d0);

        AFundamentalDispute token = new AFundamentalDispute(
            IERC721(foldedFaces()),
            artist,
            developer
        );
        token.setSharedSigner(vm.envAddress("SHARED_SIGNER"));
        AFDRenderer renderer = new AFDRenderer(
            token,
            IFileStore(fileStore())
        );
        token.setRenderer(renderer);

        vm.stopBroadcast();

        // Foundry's JSON serializing API is weeeiirdd
        // TODO: only write this when we're broadcasting?

        string memory afdToken = "aftToken";
        afdToken.serialize("contractAddress", address(token));
        afdToken.serialize("deployer", msg.sender);
        afdToken = afdToken.serialize("blockNumber", block.number);
        // TODO: find a way to get tx hash and actual block number

        string memory afdRenderer = "afdRenderer";
        afdRenderer.serialize("contractAddress", address(renderer));
        afdRenderer.serialize("deployer", msg.sender);
        afdRenderer = afdRenderer.serialize("blockNumber", block.number);
        // TODO: find a way to get tx hash and actual block number

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

    function foldedFaces() public view returns (address) {
        if (chainId() == 1) {
            return 0xf01DfAC37DD149Cb686E05d06cd21930B011F10F;
        }
        if (chainId() == 5) {
            // Arbitrary ERC721 address on Goerli
            return 0xec8cCFf076F3FDa20d8Bf3Ed296A2586c21598fC;
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
