# NFT and Vesting Wallet Generators

## Vesting Wallet Generator

The contract is based on OpenZeppelin VestingWallet contract.

The generator has a manager who can perfrom most of work:

1. Create wallets for employees
2. See created wallets
3. Withdraw tokens to these wallets

The employee itself can release their tokens.

## NFT Generator

There are two contracts:

1. NFT(ERC721) contract based on OpenZeppelin ERC721 contract.

2. NFT Generator contract

Anyone can create only 1 NFT collection through NFT Generator.

Anyone can view existing NFT collection.

The owner(and only) of NFT collection can mint tokens to any user.
