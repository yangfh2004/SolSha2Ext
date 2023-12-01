// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.15;

import { Sha2Ext } from "./lib/Sha2Ext.sol";
import { LibBytes } from "./lib/LibBytes.sol";

contract TestSha2 {
    // modify the storage of the contract so that the gas cost of the test is measured.
    bool public success;

    function sha384External(bytes calldata _data) public pure returns (bytes32, bytes16) {
        return Sha2Ext.sha384(_data);
    }

    function sha512External(bytes calldata _data) public pure returns (bytes32, bytes32) {
        return Sha2Ext.sha512(_data);
    }

    function sha256Gas(bytes calldata _data) external returns (bytes32) {
        bytes32 b1;
        b1 = sha256(_data);
        success = true;
        return (b1);
    }

    function sha384Gas(bytes calldata _data) external returns (bytes32, bytes16) {
        bytes32 b1;
        bytes16 b2;
        (b1, b2) = Sha2Ext.sha384(_data);
        success = true;
        return (b1, b2);
    }

    function sha512Gas(bytes calldata _data) external returns (bytes32, bytes32) {
        bytes32 b1;
        bytes32 b2;
        (b1, b2) = Sha2Ext.sha512(_data);
        success = true;
        return (b1, b2);
    }
}
