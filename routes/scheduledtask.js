const express = require('express');
const router = express.Router();
const Controller = require('../app/api/controllers/scheduledtask');

router.get('/scheduledmaintenace/:Id', Controller.getAll);
router.post('/', Controller.create);
 router.get('/:Id', Controller.getById);
 router.put('/:Id', Controller.updateById);
 router.delete('/:Id', Controller.deleteById);

module.exports = router;