import type { SignerWithAddress } from "@nomicfoundation/hardhat-ethers/dist/src/signer-with-address";

import type { TestSha2 } from "../types/TestSha2";

type Fixture<T> = () => Promise<T>;

declare module "mocha" {
  export interface Context {
    sha2: TestSha2;
    loadFixture: <T>(fixture: Fixture<T>) => Promise<T>;
    signers: Signers;
  }
}

export interface Signers {
  admin: SignerWithAddress;
}
