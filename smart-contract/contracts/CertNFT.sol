// SPDX-LICENSE-IDENTIFIER: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract CertNFT is ERC721 {
  string public baseURI;
  uint public currentTokenId;
  address public owner;

  constructor (string memory name, string memory symbol) ERC721(name, symbol) {
    owner = msg.sender;
  }

  function mint() external {
    currentTokenId += 1;
    uint newTokenId = currentTokenId;
    _safeMint(msg.sender, newTokenId);
  }

  function setBaseURI(string memory newBaseURI) external onlyOwner {
    baseURI = newBaseURI;
  }

  function _baseURI() internal override view returns (string memory) {
    return baseURI;
  }

  modifier onlyOwner() {
    require(msg.sender == owner, "You can't perform this operation");
    _;
  }
}