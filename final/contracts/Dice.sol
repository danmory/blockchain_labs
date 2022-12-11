// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/IERC20.sol";

contract Dice {
    uint256 constant NOT_CREATED = 0; // no data in room
    uint256 constant PENDING = 1; // 1 player registered
    uint256 constant READY = 2; // 2 players registered
    uint256 constant FINISHED = 3; // finished game, data not erased
    uint256 constant EMPTY_ID = 0; // 0 id room should not exist

    struct Room {
        uint256 status;
        uint256 id;
        address player1;
        address player2;
        uint256 prize;
        address token;
    }

    mapping(uint256 => Room) public roomAt;

    uint256[] public existingRooms;

    function canConnect(uint256 roomID) public view returns (bool) {
        uint256 status = roomAt[roomID].status;
        return
            (status == NOT_CREATED ||
                status == PENDING ||
                status == FINISHED) && roomID != EMPTY_ID;
    }

    function getRooms() external view returns (Room[] memory) {
        Room[] memory rooms = new Room[](existingRooms.length);
        for (uint256 i = 0; i < existingRooms.length; i++) {
            rooms[i] = roomAt[existingRooms[i]];
        }
        return rooms;
    }

    function enter(
        uint256 roomID,
        address token,
        uint256 bet
    ) external {
        require(canConnect(roomID), "Room is closed");
        require(bet > 0, "Not enough tokens");
        Room memory r = roomAt[roomID];
        if (r.status == PENDING) {
            require(msg.sender != r.player1, "Cannot play with yourself");
            /* 
            should pay the same token and the same amount,
            arguments ignored
            */
            require(
                IERC20(r.token).transferFrom(
                    msg.sender,
                    address(this),
                    r.prize
                ),
                "Cannot transfer token"
            );
            r.status = READY;
            r.player2 = msg.sender;
            r.prize += r.prize;
        }
        if (r.status == FINISHED || r.status == NOT_CREATED) {
            require(
                IERC20(token).transferFrom(msg.sender, address(this), bet),
                "Cannot transfer token"
            );
            r.status = PENDING;
            r.id = roomID;
            r.player1 = msg.sender;
            r.player2 = address(0);
            r.prize = bet;
            r.token = token;
        }
        appendRoom(roomID);
        roomAt[roomID] = r;
    }

    function runGame(uint256 roomID) external returns (uint256, uint256) {
        Room storage r = roomAt[roomID];
        require(r.status == READY, "Room is not ready");
        require(msg.sender == r.player1 || msg.sender == r.player2, "Not allowed");
        (uint256 dice1, uint256 dice2) = throwDice();
        r.status = FINISHED;
        if (dice1 == dice2) {
            assert(IERC20(r.token).transfer(r.player1, r.prize / 2));
            assert(IERC20(r.token).transfer(r.player2, r.prize / 2));
            return (dice1, dice2);
        }
        address winner = dice1 > dice2 ? r.player1 : r.player2;
        assert(IERC20(r.token).transfer(winner, r.prize));
        return (dice1, dice2);
    }

    function appendRoom(uint256 roomID) private {
        if (roomAt[roomID].id == EMPTY_ID) {
            existingRooms.push(roomID);
        }
    }

    function cut(bytes32 sha)
        private
        pure
        returns (bytes16 half1, bytes16 half2)
    {
        assembly {
            let freemem_pointer := mload(0x40)
            mstore(add(freemem_pointer, 0x00), sha)
            half1 := mload(add(freemem_pointer, 0x00))
            half2 := mload(add(freemem_pointer, 0x10))
        }
    }

    function vrf() private view returns (bytes32 result) {
        uint256[1] memory bn;
        bn[0] = block.number;
        assembly {
            let memPtr := mload(0x40)
            if iszero(staticcall(not(0), 0xff, bn, 0x20, memPtr, 0x20)) {
                invalid()
            }
            result := mload(memPtr)
        }
    }

    function throwDice() private view returns (uint256, uint256) {
        (bytes16 b1, bytes16 b2) = cut(vrf());
        uint256 d1 = (uint256(bytes32(b1)) % 6) + 1;
        uint256 d2 = (uint256(bytes32(b2)) % 6) + 1;
        return (d1, d2);
    }
}
