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

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).
