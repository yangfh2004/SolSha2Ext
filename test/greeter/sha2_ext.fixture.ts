import { ethers } from "hardhat";

import type { TestSha2 } from "../../types/TestSha2";
import type { TestSha2__factory } from "../../types/factories/TestSha2__factory";

export async function deployTestSha2Fixture(): Promise<{ tester: TestSha2 }> {
  const signers = await ethers.getSigners();
  const admin = signers[0];

  const testerFactory = await ethers.getContractFactory("TestSha2");
  const tester = await testerFactory.connect(admin).deploy();
  await tester.waitForDeployment();

  return { tester: tester };
}
