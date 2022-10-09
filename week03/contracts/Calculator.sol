// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

contract Calculator {

    error IncorrectOperation(string);

    function calculate(string memory operation, int256 x, int256 y) public pure returns (int256){
        if (stringsEqual(operation, "+")) {
            return add(x, y);
        }
        if (stringsEqual(operation, "-")) {
            return sub(x, y);
        }
        if (stringsEqual(operation, "*")) {
            return mul(x, y);
        }
        if (stringsEqual(operation, "/")) {
            return div(x, y);
        }
        revert IncorrectOperation(operation);
    }   

    function add(int256 x, int256 y) private pure returns (int256){
        return x + y;
    }

    function sub(int256 x , int256 y) private pure returns (int256){
        return x - y;
    }

    function mul(int256 x, int256 y) private pure returns (int256){
        return x * y;
    }

    function div(int256 x, int256 y) private pure returns (int256){
        require(y != 0, "Division by zero");
        return x / y;
    }

    function stringsEqual(string memory a, string memory b) private pure returns (bool) {
        return (keccak256(abi.encodePacked((a))) == keccak256(abi.encodePacked((b))));
    }
}
