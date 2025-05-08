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

app.get('/getItem',(req,res) =>{

    var resObj = [];
    controller.getItem((req,res) =>{
        res.send();
    });
});

app.post('/addItem',(req,res)=>{
    controller.addItem(req.body)
    .then(users => res.json(users))
    .catch(err => res.json(err))
});

app.put('/updateItem/:id',(req,res) =>{
    controller.updateItem(req.body,(callback) =>{
        res.send(callback)
    });
});

app.delete('/deleteItem/:id',(req,res) =>{
    controller.deleteItem(req.body,(callback =>{
        res.send(callback)
    }));
})

module.exports = app;

