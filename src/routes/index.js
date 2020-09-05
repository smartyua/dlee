// routes

const express = require('express');

const router = express.Router({ strict: true });

const { getProfile } = require('../middleware/getProfile');
const { getContracts } = require('../endpoints/get-contract');

// router.get('/contract/:id([0-9]+)', getProfile, getContract);
router.get('/contracts', getProfile, getContracts);

module.exports = router;
