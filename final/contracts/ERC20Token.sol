// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/IERC20.sol";

contract ERC20Token is IERC20 {
    address owner;

    uint256 public override totalSupply = 10000000;
    mapping(address => uint256) public override balanceOf;
    mapping(address => mapping(address => uint256)) public override allowance;

    string public name = "someToken";
    string public symbol = "ST";
    uint8 public decimals = 0;

    modifier restricted() {
        require(msg.sender == owner);
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    function transfer(address recipient, uint256 amount)
        external
        override
        returns (bool)
    {
        require(amount <= balanceOf[msg.sender], "Not enough tokens");
        balanceOf[msg.sender] -= amount;
        balanceOf[recipient] += amount;
        emit Transfer(msg.sender, recipient, amount);
        return true;
    }

    function approve(address spender, uint256 amount)
        external
        override
        returns (bool)
    {
        allowance[msg.sender][spender] = amount;
        emit Approval(msg.sender, spender, amount);
        return true;
    }

    function transferFrom(
        address sender,
        address recipient,
        uint256 amount
    ) external override returns (bool) {
        require(amount <= balanceOf[sender], "Not enough tokens");
        require(
            amount <= allowance[sender][recipient],
            "Not allowed to transfer"
        );
        allowance[sender][recipient] -= amount;
        balanceOf[sender] -= amount;
        balanceOf[recipient] += amount;
        emit Transfer(sender, recipient, amount);
        return true;
    }

    function mint(address to, uint256 amount) external restricted {
        require(totalSupply - amount >= 0, "Not enough free tokens left");
        balanceOf[to] += amount;
        totalSupply -= amount;
        emit Transfer(address(this), to, amount);
    }
}
