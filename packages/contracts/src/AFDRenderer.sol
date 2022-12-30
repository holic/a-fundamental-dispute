// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import {IFileStore} from "ethfs/IFileStore.sol";
import {File} from "ethfs/File.sol";
import {NFT} from "./NFT.sol";
import {IRenderer} from "./IRenderer.sol";

/// @author frolic.eth
/// @title  A Fundamental Dispute renderer
contract AFDRenderer is IRenderer {
    NFT public immutable token;
    IFileStore public immutable fileStore;

    event Initialized();

    constructor(NFT _token, IFileStore _fileStore) {
        token = _token;
        fileStore = _fileStore;
        emit Initialized();
    }

    function tokenURI(uint256 tokenId)
        external
        view
        override
        returns (string memory)
    {
        string memory tokenIdString = toString(tokenId);
        string memory seedString = toString(seedOf(tokenId));

        return
            string.concat(
                "data:application/json,",
                "%7B%22name%22%3A%22A%20Fundamental%20Dispute%20",
                tokenIdString,
                "%2F218%22%2C%22description%22%3A%22A%20long-form%20generative%20art%20collection%20using%20p5.js%2C%20made%20fully%20on-chain%20with%20EthFS.%5Cn%5Cn%20%20Art%20by%20%40genlight%2C%20smart%20contracts%20by%20%40frolic%22%2C%22external_url%22%3A%22https%3A%2F%2Fafundamentaldispute.com%2Fart%2F",
                tokenIdString,
                "%22%2C%22image%22%3A%22https%3A%2F%2Fafundamentaldispute.com%2Fapi%2Fart-placeholder%2F",
                tokenIdString,
                "%22%2C%22animation_url%22%3A%22data%3Atext%2Fhtml%2C%250A%2520%2520%253Cmeta%2520charset%253D%2522UTF-8%2522%253E%250A%2520%2520%253Cmeta%2520name%253D%2522viewport%2522%2520content%253D%2522width%253Ddevice-width%252C%2520initial-scale%253D1.0%2522%253E%250A%2520%2520%253Ctitle%253EA%2520Fundamental%2520Dispute%253C%252Ftitle%253E%250A%250A%2520%2520%253Cstyle%253E%250A%2520%2520%2520%2520body%2520%257B%250A%2520%2520%2520%2520%2520%2520margin%253A%25200%253B%250A%2520%2520%2520%2520%2520%2520padding%253A%252010px%253B%250A%2520%2520%2520%2520%2520%2520width%253A%2520100vw%253B%250A%2520%2520%2520%2520%2520%2520height%253A%2520100vh%253B%250A%2520%2520%2520%2520%2520%2520display%253A%2520flex%253B%250A%2520%2520%2520%2520%2520%2520align-items%253A%2520center%253B%250A%2520%2520%2520%2520%2520%2520justify-content%253A%2520center%253B%250A%2520%2520%2520%2520%2520%2520background%253A%2520%2523111%253B%250A%2520%2520%2520%2520%257D%250A%2520%2520%2520%2520canvas%2520%257B%250A%2520%2520%2520%2520%2520%2520max-width%253A%2520100%2525%253B%250A%2520%2520%2520%2520%2520%2520max-height%253A%2520100%2525%253B%250A%2520%2520%2520%2520%2520%2520object-fit%253A%2520contain%253B%250A%2520%2520%2520%2520%2520%2520zoom%253A%25202.5%253B%250A%2520%2520%2520%2520%257D%250A%2520%2520%253C%252Fstyle%253E%250A%250A%2520%2520%253Cscript%253E%250A%2520%2520%2520%2520const%2520seed%2520%253D%2520",
                seedString,
                "%253B%250A%2520%2520%253C%252Fscript%253E%250A%2520%2520%253Cscript%2520type%253D%2522text%252Fjavascript%252Bgzip%2522%2520src%253D%2522data%253Atext%252Fjavascript%253Bbase64%252C",
                fileStore.getFile("p5-1.5.0.js.gz").read(),
                "%2522%253E%253C%252Fscript%253E%250A%2520%2520%253Cscript%2520type%253D%2522text%252Fjavascript%252Bgzip%2522%2520src%253D%2522data%253Atext%252Fjavascript%253Bbase64%252C",
                fileStore.getFile("afd-p5.min.js.gz").read(),
                "%2522%253E%253C%252Fscript%253E%250A%2520%2520%253Cscript%2520src%253D%2522data%253Atext%252Fjavascript%253Bbase64%252C",
                fileStore.getFile("gunzipScripts-0.0.1.js").read(),
                "%2522%253E%253C%252Fscript%253E%250A%22%7D"
            );
    }

    function seedOf(uint256 tokenId) public view returns (uint32) {
        return
            uint32(
                uint256(
                    keccak256(
                        abi.encode(
                            tokenId,
                            token.ownershipOf(tokenId).extraData
                        )
                    )
                )
            );
    }

    function toString(uint256 value) internal pure returns (string memory str) {
        assembly {
            // The maximum value of a uint256 contains 78 digits (1 byte per digit), but
            // we allocate 0xa0 bytes to keep the free memory pointer 32-byte word aligned.
            // We will need 1 word for the trailing zeros padding, 1 word for the length,
            // and 3 words for a maximum of 78 digits. Total: 5 * 0x20 = 0xa0.
            let m := add(mload(0x40), 0xa0)
            // Update the free memory pointer to allocate.
            mstore(0x40, m)
            // Assign the `str` to the end.
            str := sub(m, 0x20)
            // Zeroize the slot after the string.
            mstore(str, 0)

            // Cache the end of the memory to calculate the length later.
            let end := str

            // We write the string from rightmost digit to leftmost digit.
            // The following is essentially a do-while loop that also handles the zero case.
            // prettier-ignore
            for { let temp := value } 1 {} {
                str := sub(str, 1)
                // Write the character to the pointer.
                // The ASCII index of the '0' character is 48.
                mstore8(str, add(48, mod(temp, 10)))
                // Keep dividing `temp` until zero.
                temp := div(temp, 10)
                // prettier-ignore
                if iszero(temp) { break }
            }

            let length := sub(end, str)
            // Move the pointer 32 bytes leftwards to make room for the length.
            str := sub(str, 0x20)
            // Store the length.
            mstore(str, length)
        }
    }
}
