const express=require('express');
const app=express();
const cors=require('cors');
const controller=require('./controller');


app.use(cors());

app.use(
    express.urlencoded({
        extended:true,
    })
);

app.use(express.json());

app.get('/getusers',(req,res)=>{
    var resObj=[];
    controller.getUsers((req,res,next)=>{
        res.send();
    });
});


app.get("/home", (req, res)=>{
    controller.verifyUser(req.body, (callback) =>{
      res.send(callback);
     
    })
  })

app.post('/registerUser',(req,res)=>{
    
    controller.registerUsers(req.body)
    .then(users=>res.json(users))
    .catch(err=>res.json(err))
})

app.post('/login', (req, res) => { // Ensure this matches the client's request
    controller.loginUsers(req.body)
        .then(users => res.json(users))
        .catch(err => res.json(err));
})

app.post('/updateUser',(req,res)=>{
    controller.updateUser(req.body,(callback)=>{
        res.send(callback)
    });
});

module.exports=app;