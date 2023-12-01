import { DeployFunction } from "hardhat-deploy/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployer } = await hre.getNamedAccounts();
  const { deploy } = hre.deployments;

  const test_sha2 = await deploy("TestSha2Ext", {
    from: deployer,
    args: [],
    log: true,
  });

  console.log(`Test SHA2 contract: `, test_sha2.address);
};
export default func;
func.id = "deploy_test_sha2"; // id required to prevent re-execution
func.tags = ["test_sha2"];
