const {response, resource, use}=require('./app');
const User=require('./model');
const  bcrypt =require('bcrypt');
const jwt = require('jsonwebtoken');




 /////////////////////////////////////////////////////////////////////
 const registerUsers=(req,res,next)=>{

    const{name,email,gender,password,userType}=req.body;
    bcrypt.hash(password, 10)
        .then(hash=>{
           
           const user=new User({name,email,gender,password:hash,userType})

           user.save()

            .then(response=>{
                res.json({response})
            })
        
            .catch(error=>{
                res.json({error})
            }).catch(error=>console.log(error.message))
            
           
        })
   
  

}
//////////////////////////////////////////////////////////////////////
const loginUsers=(req,res)=>{
    const {email, password}=req.body;

    User.findOne({email})
    .then(user=>{

        if (!user) {
            return res.status(404).json({ message: "Incorrect email or password" });
        }
        bcrypt.compare(password, user.password, (error,response)=>{

            if(user){
               
                if(response){
                    const token = jwt.sign({ email: user.email,userType: user.userType,name: user.name,gender:user.gender}, "jwt-secret-key", { expiresIn: "1d" });
                    res.cookie("token", token, {
                        httpOnly: true,
                        secure: false, 
                        sameSite: 'Lax',
                    });
                   
                   return  res.json({message: "Success!!!", userType: user.userType,name: user.name,email:user.email,gender:user.gender})
                }else{
                    return res.status(400).json({ message: "Password is incorrect" });
                }

            }else{
                res.json("No record existed")
            }
           
        })
        
    })
   
}

///////////////////////////////////////////////////////////////////
const verifyUser=(req,res,next)=>{
    const token=req.cookies.token;

    if(!token){
        return res.json("Token was not available")
    }else{
        jwt.verify(token,"jwt-secret-key",(error,decoded)=>{
            if(error) return res.json("Token is wrong")
                next();
        })
    }

    return res.json("Success!!!")
}

//////////////////////////////////////////////////////////////////////////////////////////////
const updateUser=(req,res,next)=>{
    const {name,email,gender,password}=req.body;
    User.updateOne({$set:{name:name,email:email,gender:gender,password:password}})

        .then(response=>{
            res.json({response})
        })
        .catch(error=>{
            res.json({error})
        })
}
////////////////////////////////////////////////////////

const getUsers=(req,res,next)=>{
    User.find()
     .then(response=>{
         res.json({response})
     })
 
     .catch(error=>{
         res.json({error})
     })
 };


 exports.verifyUser=verifyUser;
 exports.registerUsers=registerUsers;
 exports.loginUsers=loginUsers;
 exports.updateUser=updateUser;
 exports.getUsers=getUsers;