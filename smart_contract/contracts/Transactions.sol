// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

contract Transactions {
    uint transactionsCount;

    event Transfer(
        address from,
        address receiver,
        uint amount,
        string message,
        uint timestamp,
        string keyword
    );

    struct TransferType {
        address from;
        address receiver;
        uint amount;
        string message;
        uint timestamp;
        string keyword;
    }

    TransferType[] transfers;

    function addToBlockChain(
        address payable receiver,
        uint amount,
        string memory message,
        uint timestamp,
        string memory keyword
    ) public {
        transactionsCount += 1;

        TransferType memory newTransfer = TransferType(
            msg.sender,
            receiver,
            amount,
            message,
            timestamp,
            keyword
        );

        transfers.push(newTransfer);

        emit Transfer(
            msg.sender,
            receiver,
            amount,
            message,
            timestamp,
            keyword
        );
    }

    function getAllTransactions() public view returns (TransferType[] memory) {
        return transfers;
    }

    function getTransactionsCount() public view returns (uint) {
        return transactionsCount;
    }
}
