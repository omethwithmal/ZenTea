const express = require ("express");
const router = express.Router();
const Order = require ("../Model/OrderModel");

const OrderController = require ("../Controllers/OrderControllers");

router.get("/",OrderController.getAllOrders);
router.post("/add",OrderController.addOrders);
router.get("/:id",OrderController.getById);
router.put("/updateOrder/:id",OrderController.updateOrder);
router.delete("/deleteOrder/:id",OrderController.deleteOrder);


module.exports = router;