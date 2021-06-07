const express = require("express")
const models = require("../models/index")
const spp = models.spp
const app = express()



app.get("/",async(req,res) =>{
    spp.findAll()
    .then(result =>{
        res.json(result)
    })
    .catch(error => {
        res.json({
            message:error.message
        })
    })
})

app.get("/:id_spp",async(req,res)=>{
    let parameter={
        id_spp:req.params.id_spp
    }
    spp.findOne({where: parameter})
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
        id_spp: req.body.id_spp,
        tahun: req.body.tahun,
        nominal: req.body.nominal
    }
    //eksekusi data
    spp.create(data)
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
        tahun: req.body.tahun,
        nominal: req.body.nominal
    }
    //parameter untuk id yang akan di ubah
    let parameter={
        id_spp: req.body.id_spp
    }

    // execute update data
    spp.update(data,{where : parameter})
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

app.delete("/:id_spp",async(req,res)=>{
    let parameter={
        id_spp:req.params.id_spp
    }
    //eksekusi data
    spp.destroy({where : parameter})
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

module.exports=app