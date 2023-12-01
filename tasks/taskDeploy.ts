import { task } from "hardhat/config";
import type { TaskArguments } from "hardhat/types";

task("task:deployTestSha2").setAction(async function (taskArguments: TaskArguments, { ethers }) {
  const signers = await ethers.getSigners();
  const testSha2Factory = await ethers.getContractFactory("TestSha2");
  const testSha2 = await testSha2Factory.connect(signers[0]).deploy(taskArguments.greeting);
  await testSha2.waitForDeployment();
  console.log("TestSha2 deployed to: ", await testSha2.getAddress());
});
