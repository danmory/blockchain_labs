// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.0;

import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/finance/VestingWallet.sol";

contract VestingG {
    address public manager;
    mapping(address => address) employeeWallet;
    address[] employees;

    constructor() {
        manager = msg.sender;
    }

    modifier onlyManager() {
        require(msg.sender == manager, "Not permitted");
        _;
    }

    // Manager creates wallet for employee if it does not already exist.
    // The address of the wallet is returned.
    function createWallet(address employee) external onlyManager returns (address){
        require(employeeWallet[employee] == address(0), "Wallet already exists");
        VestingWallet w = new VestingWallet(employee, uint64(block.timestamp), uint64(2**32));
        employeeWallet[employee] = address(w);
        employees.push(employee);
        return address(w);
    }

    // Employee can release their ether
    function releaseByEmployee() external {
        require(employeeWallet[msg.sender] != address(0), "Your wallet does not exist");
        VestingWallet(payable(employeeWallet[msg.sender])).release();
    }

    // Employee can release their tokens
    function releaseByEmployee(address token) external {
        require(employeeWallet[msg.sender] != address(0), "Your wallet does not exist");
        VestingWallet(payable(employeeWallet[msg.sender])).release(token);
    }

    // Manager can retrieve all wallets
    function existingWallets() external view onlyManager returns (address[] memory) {
        address[] memory wallets = new address[](employees.length);
        for (uint i = 0; i < employees.length; i++) {
            wallets[i] = employeeWallet[employees[i]];
        }
        return wallets;
    }

    // Manager can withdraw all remaining ether to employees
    function withdrawAll() external onlyManager {
        for (uint i = 0; i < employees.length; i++) {
            VestingWallet(payable(employeeWallet[employees[i]])).release();
        }
    }

    // Manager can withdraw all remaining token to employees
    function withdrawAll(address token) external onlyManager {
        for (uint i = 0; i < employees.length; i++) {
            VestingWallet(payable(employeeWallet[employees[i]])).release(token);
        }
    }
}