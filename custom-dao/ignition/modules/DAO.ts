import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const DAOModule = buildModule("DAOModule", (m) => {

  const daotoken = m.contract("DAOToken", [], {
  });

  const dao = m.contract("DAOGovernor", [daotoken], {
  });

  return { daotoken };
});

export default DAOModule;
