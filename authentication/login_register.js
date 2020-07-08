const bcrypt = require("bcrypt");
const router = require('express').Router();

const {createToken} = require('../JWT/jwt')

const {User} = require("../DataBase/db");


router.post('/register', async(req,res)=>{
    const db = new User;
    db.email = req.body.email;
    db.name = req.body.name;
    db.password = await bcrypt.hash(req.body.password,10);
    try{
        const data = await db.save();
        console.log(data);
        const token = await createToken(data);
        res.status(200).json(token);
    }catch(err){
        console.log(err);
        res.status(400).json(err);
    }
});

router.post("/login", async(req,res)=>{
    try{
        const email = req.body.email;
        const password = req.body.password;
        const data = await User.findOne({email:email});
        console.log(data);
        if(data === null || data === undefined){
            res.status(400).json("no one found");
        }
        else{
            const comp = await bcrypt.compare(password, data.password);
            if(comp){
                const token = await createToken(data);
                res.status(200).json(token);
            }
            else{
                console.log("did not match");
                res.status(400).json("password did not match");
            }
        }
    }catch(err){
        console.log(err);
        res.status(400).json(err);
    }
});


module.exports={
    logReg:router
}