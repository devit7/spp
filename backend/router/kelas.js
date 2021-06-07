const express = require("express")
const models = require("../models/index")
const kelas = models.kelas
const app = express()

app.get("/",async(req,res) =>{
    kelas.findAll()
    .then(result =>{
        res.json(result)
    })
    .catch(error => {
        res.json({
            message:error.message
        })
    })
})

app.post("/",async(req,res) =>{
    let data = {
        id_kelas: req.body.id_kelas,
        nama_kelas: req.body.nama_kelas,
        kompetensi_keahlian: req.body.kompetensi_keahlian
    }
    //eksekusi data
    kelas.create(data)
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
        nama_kelas: req.body.nama_kelas,
        kompetensi_keahlian: req.body.kompetensi_keahlian
    }
    //parameter untuk id yang akan di ubah
    let parameter={
        id_kelas: req.body.id_kelas
    }

    // execute update data
    kelas.update(data,{where : parameter})
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

app.delete("/:id_kelas",async(req,res)=>{
    let parameter={
        id_kelas:req.params.id_kelas
    }
    //eksekusi data
    kelas.destroy({where : parameter})
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