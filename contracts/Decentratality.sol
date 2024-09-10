// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;
import "./Restaurant.sol";
contract Decentratality{
    string public name = 'Decentratality'; // Name of the token
    string public symbol = "DHPT"; // Symbol of the token
    uint256 public decimals = 18; // Number of decimals the token uses
    uint256 public totalSupply = 1000000000000000000000000;
    address public deployer; // Total supply of the token
    uint256 public nextRestaurantId;

    mapping(address => uint256) public balanceOf; // Mapping to track balances of addresses
    mapping(address => mapping(address => uint256)) public allowance; // Mapping to track allowances
    mapping(Restaurant => uint256) public restaurants;

    // Event to emit on transfers
    event Transfer(
        address indexed from,
        address indexed to,
        uint256 value
    );

    // Event to emit on approvals
    event Approval(
        address indexed owner,
        address indexed spender,
        uint256 value
    );
    event RestaurantCreated(
        address restaurant, 
        uint256 id
    );
    
    // Constructor to initialize the token with a name, symbol, and total supply
    constructor(
        
    ) {
        balanceOf[msg.sender] = totalSupply;
        deployer = msg.sender;
    }
    receive() external payable {
        
    }

    // Function to transfer tokens
    function transfer(address _to, uint256 _value)
        public
        returns (bool success)
    {
        // Ensure the sender has enough balance
        require(balanceOf[msg.sender] >= _value);

        // Call internal transfer function
        _transfer(msg.sender, _to, _value);

        return true;
    }

    // Internal function to handle transfers
    function _transfer(
        address _from,
        address _to,
        uint256 _value
    ) internal {
        // Prevent transfer to 0x0 address
        require(_to != address(0));

        // Deduct from sender's balance
        balanceOf[_from] = balanceOf[_from] - _value;
        // Add to recipient's balance
        balanceOf[_to] = balanceOf[_to] + _value;

        // Emit transfer event
        emit Transfer(_from, _to, _value);
    }

    // Function to approve tokens for spending by another address
    function approve(address _spender, uint256 _value)
        public
        returns(bool success)
    {
        // Prevent approval for 0x0 address
        require(_spender != address(0));

        // Set allowance
        allowance[msg.sender][_spender] = _value;

        // Emit approval event
        emit Approval(msg.sender, _spender, _value);
        return true;
    }

    // Function to transfer tokens from one address to another using allowance
    function transferFrom(
        address _from,
        address _to,
        uint256 _value
    )
        public
        returns (bool success)
    {
        // Ensure the sender has enough balance and allowance
        require(_value <= balanceOf[_from]);
        require(_value <= allowance[_from][msg.sender]);

        // Deduct from allowance
        allowance[_from][msg.sender] = allowance[_from][msg.sender] - _value;

        // Call internal transfer function
        _transfer(_from, _to, _value);

        return true;
    }
    function createRestaurant(
        string memory _name
    ) public returns(Restaurant restaurant){
        
    // Create the new Restaurant contract
    restaurant = new Restaurant(_name);

    // Check if the restaurant with the same contract address already exists
    require(restaurants[restaurant] == 0, "Restaurant already exists");

    // Increment the nextRestaurantId for the newly created restaurant
    nextRestaurantId++;

    // Map the newly created restaurant contract to the nextRestaurantId
    restaurants[restaurant] = nextRestaurantId;

    // Emit an event with the address and the ID of the new restaurant
    emit RestaurantCreated(address(restaurant), nextRestaurantId);

    // Return the newly created restaurant contract
    return restaurant;
    }
}