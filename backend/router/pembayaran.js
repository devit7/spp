const express = require("express")
const models = require("../models/index")
const pembayaran = models.pembayaran
const app = express()



app.get("/",async(req,res) =>{
    pembayaran.findAll()
    .then(result =>{
        res.json(result)
    })
    .catch(error => {
        res.json({
            message:error.message
        })
    })
})

app.get("/:id_pembayaran",async(req,res)=>{
    let parameter={
        id_pembayaran:req.params.id_pembayaran
    }
    pembayaran.findOne({where: parameter})
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
        id_pembayaran: req.body.id_pembayaran,
        id_petugas: req.body.id_petugas,
        nisn: req.body.nisn,
        tgl_bayar: new Date().toISOString().split('T')[0],
        id_spp: req.body.id_spp,
        jumlah_bayar: req.body.jumlah_bayar
    }
    //eksekusi data
    pembayaran.create(data)
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
        nisn: req.body.nisn,
        tgl_bayar: req.body.tgl_bayar,
        id_spp: req.body.id_spp,
        jumlah_bayar: req.body.jumlah_bayar
    }
    //parameter untuk id yang akan di ubah
    let parameter={
        id_pembayaran: req.body.id_pembayaran
    }

    // execute update data
    pembayaran.update(data,{where : parameter})
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

app.delete("/:id_pembayaran",async(req,res)=>{
    let parameter={
        id_pembayaran:req.params.id_pembayaran
    }
    //eksekusi data
    pembayaran.destroy({where : parameter})
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