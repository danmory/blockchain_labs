// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC721/IERC721.sol";

contract RewardToken is ERC20 {
    constructor() ERC20("Reward Token", "RT") {
        _mint(msg.sender, 100000000 * 10**18);
    }
}

contract Staking {
    address[] public allowedNFTs;
    RewardToken immutable public rewardToken;
    address owner;

    // collection address -> (owner address -> []item id)
    mapping (address => mapping(address => uint[])) staked;
    mapping (address => mapping(address => uint)) startTime;

    constructor() {
        owner = msg.sender;
        rewardToken = new RewardToken();
    }

    function addAllowedNFT(address _collection) external {
        require(msg.sender == owner, "Not allowed");
        allowedNFTs.push(_collection);
    }

    function isCollectionAllowed(address _collection) private view returns (bool) {
        bool _allowed = false;
        for (uint i = 0; i < allowedNFTs.length; i++) {
            if (allowedNFTs[i] == _collection) {
                _allowed = true;
                break;
            }
        }
        return _allowed;
    }

    /* 
    Checks is any specified Item is already staked.
    */
    function stakedAlready(address _collection, uint[] memory _itemIDs) private view returns (bool) {
        uint[] memory alreadyStaked = staked[_collection][msg.sender]; 
        for (uint i = 0; i < _itemIDs.length; i++) {
            for (uint j = 0; j < alreadyStaked.length; j++) {
                if (_itemIDs[i] == alreadyStaked[j]) {
                    return true;
                }
            }
        }
        return false;
    }

    function concat(uint[] memory a, uint[] memory b) private pure returns (uint[] memory) {
        uint[] memory result = new uint[](a.length + b.length);
        for (uint i = 0; i < a.length; i++) {
            result[i] = a[i];
        }
        for (uint i = 0; i < b.length; i++) {
            result[a.length + i] = b[i];
        }
        return result;
    }

    /*
    Sends Reward Tokens to the user for specified staked collection.
    The formula: ((numStakedCollection * 10000 RT) + (numStakedSeparateItems * 100 RT)) * minutesFromLastReward
    */
    function rewardIfNeeded(address _to, address _collection) private {
        uint numOfItems = staked[_collection][_to].length;
        uint numOfCollections = numOfItems / 10;
        uint numOfSeparateItems = numOfItems % 10;
        uint startedAt = startTime[_collection][_to];
        uint minutesPassed = (block.timestamp - startedAt) / 60;
        rewardToken.transfer(_to, ((numOfCollections * 10000 * 10 ** 18) + (numOfSeparateItems * 100 * 10 ** 18)) * minutesPassed);
    }

    /* 
    Stake specified items from Collection.
    If you want to stake single item just pass it as [id].
    For each 1 staked token reward will be 100 RT.
    For each staked collection of 10 tokens reward will br 10000 RT.
    */
    function stake(address _collection, uint[] memory _itemIDs) external {
        require(isCollectionAllowed(_collection), "Not allowed collection");
        require(!stakedAlready(_collection, _itemIDs), "Already staked");
        for (uint i = 0; i < _itemIDs.length; i++) {
            require(IERC721(_collection).getApproved(_itemIDs[i]) == address(this),
                    "Approve transfer of tokens to this contract"
            );
        }
        for (uint i = 0; i < _itemIDs.length; i++) {
            IERC721(_collection).transferFrom(msg.sender, address(this), _itemIDs[i]);
        }
        rewardIfNeeded(msg.sender, _collection);
        staked[_collection][msg.sender] = concat(staked[_collection][msg.sender], _itemIDs);
        startTime[_collection][msg.sender] = block.timestamp;
    }

    /* 
    Sends reward for specified staked collection.
    */
    function getReward(address _collection) external {
        rewardIfNeeded(msg.sender, _collection);
        startTime[_collection][msg.sender] = block.timestamp;
    }
}
