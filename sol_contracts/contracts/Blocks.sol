// SPDX-License-Identifier: MIT
pragma solidity >= 0.4.0 < 0.9.0;

contract Blocks{

    uint public blockCount = 0;

    //address of the contract owner - where the contract will be deployed
    address public contractOwner;

    //constructor
    constructor() {
        contractOwner = msg.sender;
    }

    //declaring a modifier
    modifier onlyContractOwner(address _contractOwner){
        require(contractOwner == _contractOwner, "Only the  contract owner has access to this function");
        _;
    }

    struct BlockDetails {
        string parentHash;
        uint256 blockNumber;
        string stateRoot;
        string extrinsicsRoot;
    }

  
    //events from afunctions - stored ad transaction logs accessible through the adress of the contract
    event blockDetailRecorded(uint256 _blockNumber, string  _parentHash, string _stateRoot, string _extrinsicsRoot);


    //mapping to hold block details
    mapping(uint => BlockDetails) public blocks;

  
    function addBlockDetails(string memory _parentHash, uint256 _blockNumber, string memory _stateRoot, string memory _extrinsicsRoot) public onlyContractOwner(msg.sender) {
        //pushing new struct item into new mapping list
        BlockDetails storage blockObj = blocks[blockCount];
        blockObj.blockNumber = _blockNumber;
        blockObj.parentHash = _parentHash;
        blockObj.stateRoot = _stateRoot;
        blockObj.extrinsicsRoot = _extrinsicsRoot;
        emit blockDetailRecorded(_blockNumber, _parentHash, _stateRoot, _extrinsicsRoot);
        blockCount++;
    }

    function returnMappingData(uint _begin, uint _end) external view returns(BlockDetails[100] memory){
        BlockDetails[100] memory myArray;
        for(uint i = _begin; i < _end; i++){
            myArray[i] = blocks[i];
        }
        return myArray;
    }

}