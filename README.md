# Solidity SHA2 Extension [![Hardhat][hardhat-badge]][hardhat] [![License: MIT][license-badge]][license]

[hardhat]: https://hardhat.org/
[hardhat-badge]: https://img.shields.io/badge/Built%20with-Hardhat-FFDB1C.svg
[license]: https://opensource.org/licenses/MIT
[license-badge]: https://img.shields.io/badge/License-MIT-blue.svg

This solidity library provides implementations of SHA384 and SHA512 as an extension of SHA2 on Solidity.

The `sha256` is a pre-compiled contract which is very gas-efficient. However, the methods `sha384` and `sha512` in this
library will consume significant amounts of gas as measured in the below charts. I recommend that use it only if you
have to and deploy it on low-cost layer-2 networks or side-chains rather the Ethereum layer 1 (e.g. the same contract,
which cost more than $200 gas on Eth Layer 1, only cost 10 cents on Polygon and 60 cents on Optimism).

You are also welcome to submit PR and issues to optimize the solidity code and save gas!

### VSCode Integration

This project is IDE agnostic, but for the best user experience, you may want to use it in VSCode alongside Nomic
Foundation's [Solidity extension](https://marketplace.visualstudio.com/items?itemName=NomicFoundation.hardhat-solidity).

### GitHub Actions

This project comes with GitHub Actions pre-configured. Your contracts will be linted and tested on every push and pull
request made to the `main` branch.

Note though that to make this work, you must use your `INFURA_API_KEY` and your `MNEMONIC` as GitHub secrets.

You can edit the CI script in [.github/workflows/ci.yml](./.github/workflows/ci.yml).

## Usage

### Pre Requisites

Before being able to run any command, you need to create a `.env` file and set a BIP-39 compatible mnemonic as an
environment variable. You can follow the example in `.env.example`. If you don't already have a mnemonic, you can use
this [website](https://iancoleman.io/bip39/) to generate one.

Then, proceed with installing dependencies:

```sh
$ pnpm install
```

### Compile

Compile the smart contracts with Hardhat:

```sh
$ pnpm compile
```

### TypeChain

Compile the smart contracts and generate TypeChain bindings:

```sh
$ pnpm typechain
```

### Test

Run the tests with Hardhat:

```sh
$ pnpm test
```

The tests will compare the results of the solidity library with the `crypto` library of JavaScript.

The gas consumption is measured for each test and SHA256 gas consumption is measured as a baseline.

```
--------------------------|---------------------------|---------------|-----------------------------·
|   Solc version: 0.8.15   ·  Optimizer enabled: true  ·  Runs: 10000  ·  Block limit: 30000000 gas  │
···························|···························|···············|······························
|  Methods                 ·                35 gwei/gas                ·       2098.87 usd/eth       │
·············|·············|·············|·············|···············|···············|··············
|  Contract  ·  Method     ·  Min        ·  Max        ·  Avg          ·  # calls      ·  usd (avg)  │
·············|·············|·············|·············|···············|···············|··············
|  TestSha2  ·  sha256Gas  ·      44115  ·      77948  ·        61032  ·            2  ·       4.48  │
·············|·············|·············|·············|···············|···············|··············
|  TestSha2  ·  sha384Gas  ·     212575  ·    2843972  ·      1528274  ·            2  ·     112.27  │
·············|·············|·············|·············|···············|···············|··············
|  TestSha2  ·  sha512Gas  ·     212624  ·    2844021  ·      1528323  ·            2  ·     112.27  │
·············|·············|·············|·············|···············|···············|··············
|  Deployments             ·                                           ·  % of limit   ·             │
···························|·············|·············|···············|···············|··············
|  TestSha2                ·          -  ·          -  ·      1386697  ·        4.6 %  ·     101.87  │
·--------------------------|-------------|-------------|---------------|---------------|-------------·
```

### Lint Solidity

Lint the Solidity code:

```sh
$ pnpm lint:sol
```

### Lint TypeScript

Lint the TypeScript code:

```sh
$ pnpm lint:ts
```

### Coverage

Generate the code coverage report:

```sh
$ pnpm coverage
```

### Report Gas

See the gas usage per unit test and average gas per method call:

```sh
$ REPORT_GAS=true pnpm test
```

### Clean

Delete the smart contract artifacts, the coverage reports and the Hardhat cache:

```sh
$ pnpm clean
```

### Deploy

Deploy the contracts to Hardhat Network:

```sh
$ pnpm deploy:contracts
```

### Tasks

#### Deploy Test Contract

Deploy a new instance of the TestSha2 contract via a task:

```sh
$ pnpm task:deployTestSha2 --network ganache"
```

## Tips

### Syntax Highlighting

If you use VSCode, you can get Solidity syntax highlighting with the
[hardhat-solidity](https://marketplace.visualstudio.com/items?itemName=NomicFoundation.hardhat-solidity) extension.

## Using GitPod

[GitPod](https://www.gitpod.io/) is an open-source developer platform for remote development.

To view the coverage report generated by `pnpm coverage`, just click `Go Live` from the status bar to turn the server
on/off.

## Local development with Ganache

### Install Ganache

```sh
$ npm i -g ganache
```

### Run a Development Blockchain

```sh
$ ganache -s test
```

> The `-s test` passes a seed to the local chain and makes it deterministic

Make sure to set the mnemonic in your `.env` file to that of the instance running with Ganache.

## License

This project is licensed under MIT.
