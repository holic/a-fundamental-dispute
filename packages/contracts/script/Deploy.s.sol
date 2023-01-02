// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "forge-std/Script.sol";
import {IERC721} from "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import {IFileStore} from "ethfs/IFileStore.sol";
import {NFT} from "../src/NFT.sol";
import {AFundamentalDispute} from "../src/AFD.sol";
import {AFDRenderer} from "../src/AFDRenderer.sol";

contract Deploy is Script {
    using stdJson for string;

    function run() public {
        vm.startBroadcast();

        IERC721 foldedFaces = IERC721(
            0xf01DfAC37DD149Cb686E05d06cd21930B011F10F
        );
        // TODO: genlight address
        address artist = address(0xC9C022FCFebE730710aE93CA9247c5Ec9d9236d0);
        address developer = address(0xC9C022FCFebE730710aE93CA9247c5Ec9d9236d0);

        AFundamentalDispute token = new AFundamentalDispute(
            foldedFaces,
            artist,
            developer
        );
        AFDRenderer renderer = new AFDRenderer(
            NFT(token),
            IFileStore(fileStore())
        );
        token.setRenderer(renderer);

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
