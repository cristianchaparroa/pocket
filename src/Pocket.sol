// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

// Pocket contract will allow parents to manage funds for their kids
contract Pocket {
    // Define a Kid struct with parent address, identifier, names, phone number, and allocated funds
    struct Kid {
        address parent;
        string identifier;
        string names;
        string phoneNumber;
        uint256 allocatedFunds;
    }

    // Mapping from phone number to parent address
    mapping(string => address) public phoneToParent;

    // Mapping from parent address to the funds available
    mapping(address => uint256) public funds;

    // kids is the list of kids associated with a parent
    mapping(address => Kid[]) private kids;

    // Event actions events
    event Deposited(address indexed parent, uint256 amount);
    event Withdrawn(address indexed parent, uint256 amount);
    event KidAdded(address indexed parent, string kidIdentifier);
    event KidRemoved(address indexed parent, string kidIdentifier);
    event TransferBetweenKids(address indexed fromParent, address indexed toParent, uint256 amount);

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

    // Function to add a Kid to the parent's list with allocated funds
    function addKid(
        string memory identifier,
        string memory names,
        string memory phoneNumber,
        uint256 allocatedFunds
    ) public {
        require(bytes(identifier).length > 0, "Invalid kid identifier");
        require(funds[msg.sender] >= allocatedFunds, "Insufficient funds for new kid");

        Kid memory newKid = Kid({
            parent: msg.sender,
            identifier: identifier,
            names: names,
            phoneNumber: phoneNumber,
            allocatedFunds: allocatedFunds
        });
        kids[msg.sender].push(newKid);
        phoneToParent[phoneNumber] = msg.sender;
        funds[msg.sender] -= allocatedFunds; // Deduct allocated funds from parent's balance

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
                // Add back the allocated funds to the parent's balance
                funds[msg.sender] += myKids[i].allocatedFunds;
                delete phoneToParent[myKids[i].phoneNumber];
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

    function getParentAddress(string memory phoneNumber) public view returns (address) {
        address parentAddress = phoneToParent[phoneNumber];
        require(parentAddress != address(0), "Doesnt exist phone number");
        return parentAddress;
    }

    function getKidByPhoneNumber(address parentAddress, string memory phoneNumber) public view returns (Kid memory) {
        require(funds[parentAddress] > 0, "Parent address does not exist"); // Validate parent exists

        Kid[] storage kids = kids[parentAddress];
        for (uint i = 0; i < kids.length; i++) {
            if (keccak256(bytes(kids[i].phoneNumber)) == keccak256(bytes(phoneNumber))) {
                return kids[i];
            }
        }
        // If no kid found, emit an error
        revert("Kid with provided phone number not found");
    }

    // Function to transfer funds between kids using their phone numbers, with additional validations
    function transferBetweenKids(
        string memory fromPhoneNumber,
        string memory toPhoneNumber,
        uint256 amount
    ) public {
        address fromParent = phoneToParent[fromPhoneNumber];
        address toParent = phoneToParent[toPhoneNumber];
        require(fromParent != address(0), "Invalid from phone number");
        require(toParent != address(0), "Invalid to phone number");

        // Only allow transfer between same parent if phone numbers differ
        require(fromParent == toParent || keccak256(bytes(fromPhoneNumber)) != keccak256(bytes(toPhoneNumber)),
            "Transfer between same parent only allowed for different phone numbers");


        Kid[] storage fromKids = kids[fromParent];
        Kid[] storage toKids = kids[toParent];

        int fromKidIndex = -1;
        int toKidIndex = -1;

        // Find indexes of the kids
        for (uint i = 0; i < fromKids.length; i++) {
            if (keccak256(bytes(fromKids[i].phoneNumber)) == keccak256(bytes(fromPhoneNumber))) {
                fromKidIndex = int(i);
            }
            if (keccak256(bytes(toKids[i].phoneNumber)) == keccak256(bytes(toPhoneNumber))) {
                toKidIndex = int(i);
            }
        }

        require(fromKidIndex != -1 && toKidIndex != -1, "Kid not found");
        require(fromKids[uint(fromKidIndex)].allocatedFunds >= amount, "Insufficient funds in from kid's account");

        // Update the allocated funds for both kids
        fromKids[uint(fromKidIndex)].allocatedFunds -= amount;
        toKids[uint(toKidIndex)].allocatedFunds += amount;

        if (fromParent != toParent) {
            funds[fromParent] -= amount;
            funds[toParent] += amount;
        }

        emit TransferBetweenKids(fromParent, toParent, amount);
    }
}
