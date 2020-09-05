const { Contract, Profile } = require('../models');

const getContracts = async (req, res) => {
  const {
    profile: {
      id: contractorId
    }
  } = req;

  const contracts = await Contract.findAll({
    where: {
      ContractorId: contractorId
    },
    // profile can be included thru models
    include: [
      {
        model: Profile,
        as: 'Contractor'
      }
    ]
  });

  if (!contracts) {
    return res.status(404).end();
  }

  // or can be received on each item with method
  const oneContract = contracts[0];
  const test = await oneContract.findContractor();
  console.log(test);

  // FIXME: better to use some global response format/logging middleware of function
  return res.json(contracts);
};

module.exports = {
  getContracts
};
