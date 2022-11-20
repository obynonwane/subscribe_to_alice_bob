const Blocks = artifacts.require('../contracts/Blocks.sol');

module.exports = function (deployer) {
  //ndex of the account "from Ganache" we want to deploy our contract to
  let n = 0;
  deployer.deploy(Blocks, { from: arguments[2][n] });
};
