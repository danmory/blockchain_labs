// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.0;

import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC721/ERC721.sol";

contract Logo is ERC721{
    uint16 itemsCount = 0;
    uint16 itemsMax = 1000;

    // id => [title, image]
    mapping(uint256 => string[2]) tokenInfo;

    constructor() ERC721("LogoNFT", "LOGO") {}

    function mint(uint16 tokenId, string memory title, string memory image) payable external {
        require(itemsCount < itemsMax, "No free NFTs");
        require(!_exists(tokenId));
        require(msg.value >= .001 ether, "Not enough ether to mint");
        _safeMint(msg.sender, tokenId);
        tokenInfo[tokenId] = [title, image];
        itemsCount += 1;
    }

    function modifyItem(uint256 tokenId , string memory newTitle, string memory newImage) external {
        require(ownerOf(tokenId) == msg.sender, "You are not owner");
        tokenInfo[tokenId] = [newTitle, newImage];
    }

    function tokenURI(uint256 tokenId) public view override returns (string memory) {
        _requireMinted(tokenId);
        return tokenInfo[tokenId][1];
    }
}
