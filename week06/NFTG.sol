// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.0;

import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC721/ERC721.sol";

contract NFTCollection is ERC721 {
    address owner;

    constructor(
        string memory name,
        string memory symbol,
        address creator
    ) ERC721(name, symbol) {
        owner = creator;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Not permitted");
        _;
    }

    // Only owner of NFT collection can mint tokens
    function mint(address to, uint256 tokenId) external onlyOwner {
        _safeMint(to, tokenId);
    }
}

contract NFTG {
    struct Collection {
        string name;
        string symbol;
        address collection;
        address owner;
    }
    Collection[] collections;

    // account address => collection address
    mapping(address => address) collectionOf;

    constructor() {}

    // User can create only one NFT collection
    function createCollection(string memory name, string memory symbol)
        external
        returns (address)
    {
        require(
            collectionOf[msg.sender] == address(0),
            "Already has collection"
        );
        NFTCollection c = new NFTCollection(name, symbol, msg.sender);
        collections.push(Collection(name, symbol, address(c), msg.sender));
        collectionOf[msg.sender] = address(c);
        return address(c);
    }

    // Returns all created NFT collections
    function getAllCollections() external view returns (Collection[] memory) {
        return collections;
    }
}
