const Item = require('./model');
const { ObjectId } = require('mongodb');
const path = require('path');

const getItem = (req, res) => {
    Item.find()
        .then(items => {
            // Format image paths for frontend
            const formattedItems = items.map(item => ({
                ...item._doc,
                image: item.image ? `http://localhost:8070/uploads/${path.basename(item.image)}` : null
            }));
            res.json(formattedItems);
        })
        .catch(error => res.status(500).json({ error }));
};

const addItem = (req, res) => {
    const item = new Item({
        teaType: req.body.teaType,
        description: req.body.description,
        price: req.body.price,
        image: req.file ? req.file.filename : null
    });

    item.save()
        .then(response => res.json({
            ...response._doc,
            image: response.image ? `http://localhost:8070/uploads/${response.image}` : null
        }))
        .catch(error => res.status(500).json({ error }));
};

const updateItem = (req, res) => {
    const { id } = req.params;
    const { teaType, description, price } = req.body;

    const updateData = {
        teaType,
        description,
        price
    };

    if (req.file) {
        updateData.image = req.file.filename;
    }

    Item.findByIdAndUpdate(id, updateData, { new: true })
        .then(updatedItem => {
            res.json({
                ...updatedItem._doc,
                image: updatedItem.image ? `http://localhost:8070/uploads/${updatedItem.image}` : null
            });
        })
        .catch(error => res.status(500).json({ error }));
};

const deleteItem = (req, res) => {
    const { id } = req.params;
    Item.deleteOne({ _id: new ObjectId(id) })
        .then(response => {
            if (response.deletedCount > 0) {
                res.json({ message: "Item deleted successfully" });
            } else {
                res.status(404).json({ error: "Item not found" });
            }
        })
        .catch(error => res.status(500).json({ error }));
};

exports.getItem = getItem;
exports.addItem = addItem;
exports.updateItem = updateItem;
exports.deleteItem = deleteItem;