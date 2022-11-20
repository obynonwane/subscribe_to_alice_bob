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

## Start Avail Network - Alice & Bob Node

```bash
# Start Alice Node as Boot node
$  ./target/release/data-avail --base-path /tmp/alice --chain misc/genesis/devnet.chain.spec.json --alice --port 30333 --rpc-methods Unsafe --ws-port 9945 --unsafe-ws-external --rpc-cors all --rpc-external  --rpc-port 9933 --node-key 0000000000000000000000000000000000000000000000000000000000000001 --validator

# Start Bob Node as Validator
$ ./target/release/data-avail --base-path /tmp/bob --chain misc/genesis/devnet.chain.spec.json --bob --port 30334 --rpc-methods Unsafe  --ws-port 9946 --unsafe-ws-external --rpc-cors all --rpc-external  --rpc-port 9934  --validator --bootnodes /ip4/127.0.0.1/tcp/30333/p2p/12D3KooWEyoppNCUx8Yx66oV9fJnriXwCcXwDDUA2kj6vnc6iDEp

```

## Start Subscription Script

# cd into avail Alice & Bob nodes: /tests/js_api/src

$ run ts-node sub.ts

## Subscription Code Link

- Alice - [Avail Network](<https://github.com/obynonwane/bob_node_avail_engineering_test/blob/main/tests/js_api/src/sub.ts#:~:text=async%20function%20retrieveSubscription(lastHeader%3A%20any)%20%7B>)
- Bob - [Avail Network](<https://github.com/obynonwane/bob_node_avail_engineering_test/blob/main/tests/js_api/src/sub.ts#:~:text=async%20function%20retrieveSubscription(lastHeader%3A%20any)%20%7B>)

## License

Nest is [MIT licensed](LICENSE).
