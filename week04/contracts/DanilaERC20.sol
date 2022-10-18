// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

import "./IERC20.sol";

contract DanilaERC20 is IERC20 {
    address owner;

    uint public totalSupply = 10000000 * 10 ** 18;
    mapping(address => uint) public balanceOf;
    mapping(address => mapping(address => uint)) public allowance;
    
    string public name = "d.moriakov";
    string public symbol = "DANILA";
    uint8 public decimals = 18;

    uint8 public reward = 50;
    address public rewardReciever = 0xD8C7978Be2A06F5752cB727fB3B7831B70bF394d;

    address[] public holders = [rewardReciever];

    modifier restricted() {
        require(msg.sender == owner);
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    function getHolders() external view returns (address[] memory) {
        return holders;
    }

    function transfer(address recipient, uint amount) external returns (bool) {
        require(amount <= balanceOf[msg.sender], "Not enough tokens");
        balanceOf[msg.sender] -= amount;
        balanceOf[recipient] += amount;
        sendReward();
        updateHolders(recipient);
        emit Transfer(msg.sender, recipient, amount);
        return true;
    }

    function approve(address spender, uint amount) external returns (bool) {
        allowance[msg.sender][spender] = amount;
        emit Approval(msg.sender, spender, amount);
        return true;
    }

    function transferFrom(
        address sender,
        address recipient,
        uint amount
    ) external returns (bool) {
        require(amount <= balanceOf[sender], "Not enough tokens");
        require(amount <= allowance[sender][recipient], "Not allowed to transfer");
        allowance[sender][recipient] -= amount;
        balanceOf[sender] -= amount;
        balanceOf[recipient] += amount;
        sendReward();
        updateHolders(recipient);
        emit Transfer(sender, recipient, amount);
        return true;
    }

    function sendReward() private {
        if (totalSupply - reward >= 0) {
            balanceOf[rewardReciever] += reward;
            emit Transfer(msg.sender, rewardReciever, reward);
        }
        // Otherwise reward not sent
    }

    function mint(address to, uint amount) restricted external {
        require(totalSupply - amount >= 0, "Not enough free tokens left");
        updateHolders(to);
        balanceOf[to] += amount;
        totalSupply -= amount;
        emit Transfer(address(this), to, amount);
    }

    function updateHolders(address holder) private {
        bool exists = false;
        for (uint i = 0; i < holders.length; i++) {
            if (holders[i] == holder) {
                exists = true;
                break;
            }
        }
        if (!exists) {
            holders.push(holder);
        }
    }
}
