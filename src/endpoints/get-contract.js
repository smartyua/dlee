const getContract = async (req, res) => {
  const { Contract } = req.app.get('models');

  // TODO: it can be migrated to some helper
  const {
    profile: {
      id: contractorId
    }
  } = req;

  const { id } = req.params;
  const contract = await Contract.findOne({ where: { id, ContractorId: contractorId } });

  if (!contract) {
    return res.status(404).end();
  }

  // FIXME: better to use some global response format/logging middleware of function
  return res.json(contract);
};

const getContracts = async (req, res) => {
  const { Contract } = req.app.get('models');

  // TODO: it can be migrated to some helper
  const {
    profile: {
      id: contractorId
    }
  } = req;

  const contracts = await Contract.findAll({ where: { ContractorId: contractorId } });

  if (!contracts) {
    return res.status(404).end();
  }

  // FIXME: better to use some global response format/logging middleware of function
  return res.json(contracts);
};

module.exports = {
  getContract,
  getContracts
};
