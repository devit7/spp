const express = require("express")
const models = require("../models/index")
const petugas = models.petugas
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))

const auth = require("../auth")
const jwt = require("jsonwebtoken")
const SECRET_KEY = "bayarspp"

app.get("/",async(req,res) =>{
    petugas.findAll()
    .then(result =>{
        res.json(result)
    })
    .catch(error => {
        res.json({
            message:error.message
        })
    })
})

app.get("/:id_petugas",async(req,res)=>{
    let parameter={
        id_petugas:req.params.id_petugas
    }
    petugas.findOne({where: parameter})
    .then(result=>{
        res.json(result)
    })
    .catch(error=>{
        res.json({
            message:error.message
        })
    })
})

app.post("/",async(req,res) =>{
    let data = {
        username:req.body.username,
        password:md5(req.body.password),
        nama_petugas:req.body.nama_petugas,
        level: req.body.level
    }
    //eksekusi data
    petugas.create(data)
    .then(result=>{
        res.json({
            message:"data has been insert",
            data: result
        })
    })
    .catch(error =>{
        res.json({
            message: error.message
        })
    })
})

app.put("/",async(req,res)=>{
    let data={
        username:req.body.username,
        nama_petugas:req.body.nama_petugas,
        level: req.body.level
    }
    //parameter untuk id yang akan di ubah
    let parameter={
        id_petugas: req.body.id_petugas
    }

    // execute update data
    petugas.update(data,{where : parameter})
    .then(result => {
        res.json({
            message: "Data has been updated",
            data: result
        })
    })
    .catch(error => {
        res.json({
            message: error.message
        })
    })
})

app.delete("/:id_petugas",async(req,res)=>{
    let parameter={
        id_petugas:req.params.id_petugas
    }
    //eksekusi data
    petugas.destroy({where : parameter})
    .then(result=>{
        res.json({
            message:"data has been destroyed",
            data:result
        })
    })
    .catch(error =>{
        res.json({
            message:error.message
        })
    })
})

app.post("/auth", async (req,res) => {
    let params = {
        username: req.body.username,
        password: md5(req.body.password)
    }

    let result = await petugas.findOne({where: params})
    if(result){
        let payload = JSON.stringify(result)
        // generate token
        let token = jwt.sign(payload, SECRET_KEY)
        res.json({
            logged: true,
            data: result,
            token: token
        })
    }else{
        res.json({
            logged: false,
            message: "Invalid username or password"
        })
    }
})
module.exports=app