// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

// TODO: convert to using DynamicBuffer instead of string.concat

library Strings {
    function urlEncode(string memory str) public pure returns (string memory) {
        bytes memory b = bytes(str);
        string memory encoded = "";

        for (uint256 i = 0; i < b.length; i++) {
            if (isAlpha(b[i]) || isNumeric(b[i])) {
                encoded = string.concat(encoded, toString(uint8(b[i])));
            } else {
                encoded = string.concat(
                    encoded,
                    "%",
                    toString(uint8(toHex(uint8(b[i]) / 16))),
                    toString(uint8(toHex(uint8(b[i]) % 16)))
                );
            }
        }

        return encoded;
    }

    function isAlpha(bytes1 b) public pure returns (bool) {
        return (b >= 0x41 && b <= 0x5a) || (b >= 0x61 && b <= 0x7a);
    }

    function isNumeric(bytes1 b) public pure returns (bool) {
        return (b >= 0x30 && b <= 0x39);
    }

    function toHex(uint8 i) public pure returns (bytes1) {
        if (i < 10) {
            return bytes1(0x30 + i);
        } else {
            return bytes1(0x41 + i - 10);
        }
    }

    function toString(uint256 value) public pure returns (string memory str) {
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
