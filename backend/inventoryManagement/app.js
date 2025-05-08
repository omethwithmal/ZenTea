const express = require('express');
const app = express();
const cors = require('cors');
const controller = require('./controller');

app.use(cors());

app.use(
    express.urlencoded({
        extended:true,
    })
);

app.use(express.json());

app.get('/getInventory',(req,res) =>{

    var resObj = [];
    controller.getInventory((req,res) =>{
        res.send();
    });
});

app.post('/addInventory',(req,res)=>{
    controller.addInventory(req.body)
    .then(users => res.json(users))
    .catch(err => res.json(err))
});

app.put('/updateInventory/:id',(req,res) =>{
    controller.updateInventory(req.body,(callback) =>{
        res.send(callback)
    });
});

app.delete('/deleteInventory/:id',(req,res) =>{
    controller.deleteInventory(req.body,(callback =>{
        res.send(callback)
    }));
})

module.exports = app;

