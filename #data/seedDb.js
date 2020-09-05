const { Job } = require('./model');

const seed = async () => {
  // create tables
  // await Profile.sync({ force: true });
  // await Contract.sync({ force: true });
  await Job.sync({ force: true });

  // insert data
  await Promise.all([
    Job.create({
      description: 'work',
      price: 200,
      ContractId: 1
    }),
    Job.create({
      description: 'work',
      price: 201,
      ContractId: 2
    }),
    Job.create({
      description: 'work',
      price: 202,
      ContractId: 3
    }),
    Job.create({
      description: 'work',
      price: 200,
      ContractId: 4
    }),
    Job.create({
      description: 'work',
      price: 200,
      ContractId: 7
    }),
    Job.create({
      description: 'work',
      price: 2020,
      paid: true,
      paymentDate: '2020-08-15T19:11:26.737Z',
      ContractId: 7
    }),
    Job.create({
      description: 'work',
      price: 200,
      paid: true,
      paymentDate: '2020-08-15T19:11:26.737Z',
      ContractId: 2
    }),
    Job.create({
      description: 'work',
      price: 200,
      paid: true,
      paymentDate: '2020-08-16T19:11:26.737Z',
      ContractId: 3
    }),
    Job.create({
      description: 'work',
      price: 200,
      paid: true,
      paymentDate: '2020-08-17T19:11:26.737Z',
      ContractId: 1
    }),
    Job.create({
      description: 'work',
      price: 200,
      paid: true,
      paymentDate: '2020-08-17T19:11:26.737Z',
      ContractId: 5
    }),
    Job.create({
      description: 'work',
      price: 21,
      paid: true,
      paymentDate: '2020-08-10T19:11:26.737Z',
      ContractId: 1
    }),
    Job.create({
      description: 'work',
      price: 21,
      paid: true,
      paymentDate: '2020-08-15T19:11:26.737Z',
      ContractId: 2
    }),
    Job.create({
      description: 'work',
      price: 121,
      paid: true,
      paymentDate: '2020-08-15T19:11:26.737Z',
      ContractId: 3
    }),
    Job.create({
      description: 'work',
      price: 121,
      paid: true,
      paymentDate: '2020-08-14T23:11:26.737Z',
      ContractId: 3
    })
  ]);
};

/* WARNING THIS WILL DROP THE CURRENT DATABASE */
seed();
