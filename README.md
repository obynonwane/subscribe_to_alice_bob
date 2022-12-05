<p align="center">
  <a href="https://res.cloudinary.com/dxec82vds/image/upload/v1668963303/Screenshot_2022-11-20_at_17.53.58_lncc2y.png" target="blank"><img src="https://res.cloudinary.com/dxec82vds/image/upload/v1668963303/Screenshot_2022-11-20_at_17.53.58_lncc2y.png" width="800" alt="Nest Logo" /></a>
</p>

  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Running the database migration

### create your postgress db and supply environment variables as specified in the env.development

```bash
# development
$ npm run typeorm:run-migrations
```

## Start Avail Network - Alice & Bob Node

```bash
# Start Alice Node as Boot node
$  ./target/release/data-avail --base-path /tmp/alice --chain misc/genesis/devnet.chain.spec.json --alice --port 30333 --rpc-methods Unsafe --ws-port 9945 --unsafe-ws-external --rpc-cors all --rpc-external  --rpc-port 9933 --node-key 0000000000000000000000000000000000000000000000000000000000000001 --validator

# Start Bob Node as Validator
$ ./target/release/data-avail --base-path /tmp/bob --chain misc/genesis/devnet.chain.spec.json --bob --port 30334 --rpc-methods Unsafe  --ws-port 9946 --unsafe-ws-external --rpc-cors all --rpc-external  --rpc-port 9934  --validator --bootnodes /ip4/127.0.0.1/tcp/30333/p2p/12D3KooWEyoppNCUx8Yx66oV9fJnriXwCcXwDDUA2kj6vnc6iDEp

```

## Purge Alice & Bob Nodes

```bash
# Purge Alice Node
$  ./target/release/data-avail  purge-chain --base-path /tmp/alice --chain misc/genesis/devnet.chain.spec.json


# Purge Bob node
$ ./target/release/data-avail  purge-chain --base-path /tmp/bob --chain misc/genesis/devnet.chain.spec.json

```

## Start Subscription Script for finalised blocks

### cd into avail Alice & Bob nodes - script path: /tests/js_api/src

```bash
# Run subscription script
$  ts-node sub.ts

```

### Finalised Block subscription script Links for both nodes Alice & Bob

- Alice - [Avail Network](https://github.com/obynonwane/alice_node_avail_engineering_test/blob/e0f2d0e13e5bd2ea1f45e286d6c89c3d9dd5f490/tests/js_api/src/sub.ts#L41)
- Bob - [Avail Network](https://github.com/obynonwane/bob_node_avail_engineering_test/blob/0d7f73f308fedafa4099557465cd27082ab924a5/tests/js_api/src/sub.ts#L48)

## Smart Contract

- Smart Contract Link - [Contract](https://github.com/obynonwane/subscribe_to_alice_bob/blob/cbd10cde10b93608fab5f843ab60d118401fe25c/sol_contracts/contracts/Blocks.sol#L4)
- Smart Contract ABI - [ABI](https://github.com/obynonwane/subscribe_to_alice_bob/blob/cbd10cde10b93608fab5f843ab60d118401fe25c/sol_contracts/build/contracts/Blocks.json#L2)

```bash
# Deploy Smart Contract to Ganache
$  truffle deploy

```

## License

Nest is [MIT licensed](LICENSE).
