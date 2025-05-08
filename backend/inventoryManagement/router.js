const express = require('express');
const router = express.Router();
const controller = require("./controller");
const {routes} = require('./app');


router.post('/addInventory',controller.addInventory);
router.get('/getInventory',controller.getInventory);
router.put('/updateInventory/:id',controller.updateInventory);
router.delete('/deleteInventory/:id',controller.deleteInventory);

module.exports = router