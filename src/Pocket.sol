// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

// Pocket contract will allow to each parent manage funds for their kids
contract Pocket {
    // Define a Kid struct with parent address and identifier
    struct Kid {
        address parent; // pointer to the parent
        string identifier; // individual kid identifier
    }

    // Mapping from parent address to the funds available
    mapping(address => uint256) public funds;

    // kids is the list of kids associated with a parent
    mapping(address => Kid[]) private kids;

    // Event actions events
    event Deposited(address indexed parent, uint256 amount);
    event Withdrawn(address indexed parent, uint256 amount);
    event KidAdded(address indexed parent, string kidIdentifier);
    event KidRemoved(address indexed parent, string kidIdentifier);

    // Deposit function allows each parent to add funds
    function deposit() public payable {
        funds[msg.sender] += msg.value;
        emit Deposited(msg.sender, msg.value);
    }

    // Withdraw function allows each parent to withdraw their funds
    function withdraw(uint256 amount) public {
        require(funds[msg.sender] >= amount, "Insufficient funds");
        funds[msg.sender] -= amount;
        payable(msg.sender).transfer(amount);
        emit Withdrawn(msg.sender, amount);
    }

    // Function to add a Kid to the parent's list
    function addKid(string memory identifier) public {
        require(bytes(identifier).length > 0, "Invalid kid identifier");
        Kid memory newKid = Kid({
            parent: msg.sender,
            identifier: identifier
        });
        kids[msg.sender].push(newKid);
        emit KidAdded(msg.sender, identifier);
    }

    // Function to remove a Kid from the parent's list by identifier
    function removeKid(string memory identifier) public {
        Kid[] storage myKids = kids[msg.sender];
        for (uint i = 0; i < myKids.length; i++) {
            if (keccak256(bytes(myKids[i].identifier)) == keccak256(bytes(identifier))) {
                myKids[i] = myKids[myKids.length - 1];
                myKids.pop();
                emit KidRemoved(msg.sender, identifier);
                break;
            }
        }
    }

    // Function to get the list of Kids for a parent
    function getKids(address parent) public view returns (Kid[] memory) {
        return kids[parent];
    }

    // GetBalance function to view the total funds of a parent
    function getBalance(address addr) public view returns (uint256) {
        return funds[addr];
    }
}
