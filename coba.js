// const express = require("express")
// const multer = require("multer") // untuk upload file
// const path = require("path") // untuk memanggil path direktori
// const fs = require("fs") // untuk manajemen file
// const cors = require("cors")
// const bodyParser = require("body-parser")
// const db = require("./router")

// const app = express()

// // end-point akses data penyewa (menampilkan seluruh penyewa)
// app.get("/penyewa", (req, res) => {
//     // create sql query
//     let sql = "select * from penyewa"

//     // run query
//     db.query(sql, (error, result) => {
//         let response = null
//         if (error) {
//             response = {
//                 message: error.message // pesan error
//             }            
//         } else {
//             response = {
//                 count: result.length, // jumlah data
//                 penyewa: result // isi data
//             }            
//         }
//         res.json(response) // send response
//     })
// })

// // end-point akses data penyewa berdasarkan id_penyewa tertentu
// app.get("/penyewa/:id", (req, res) => {
//     let data = {
//         id_penyewa: req.params.id
//     }
//     // create sql query
//     let sql = "select * from penyewa where ?"

//     // run query
//     db.query(sql, data, (error, result) => {
//         let response = null
//         if (error) {
//             response = {
//                 message: error.message // pesan error
//             }            
//         } else {
//             response = {
//                 count: result.length, // jumlah data
//                 penyewa: result // isi data
//             }            
//         }
//         res.json(response) // send response
//     })
// })

// // end-point menyimpan data penyewa
// app.post("/penyewa", (req,res) => {

//     // prepare data
//     let data = {
//         nama_penyewa: req.body.nama_penyewa,
//         alamat: req.body.alamat,
//         password: md5(req.body.password)
//     }

//     // create sql query insert
//     let sql = "insert into penyewa set ?" //tanda tanya memasukkan value ke tabel penyewa

//     // run query
//     db.query(sql, data, (error, result) => {
//         let response = null
//         if (error) {
//             response = {
//                 message: error.message
//             }
//         } else {
//             response = {
//                 message: result.affectedRows + " data inserted"
//             }
//         }
//         res.json(response) // send response
//     })
// })

// // end-point mengubah data penyewa
// app.put("/penyewa", (req,res) => {

//     // prepare data
//     let data = [
//         // data
//         {
//             nama_penyewa: req.body.nama_penyewa,
//             alamat: req.body.alamat,
//             password: md5(req.body.password)
//         },

//         // parameter (primary key)
//         {
//             id_penyewa: req.body.id_penyewa
//         }
//     ]

//     // create sql query update
//     let sql = "update penyewa set ? where ?"

//     // run query
//     db.query(sql, data, (error, result) => {
//         let response = null
//         if (error) {
//             response = {
//                 message: error.message
//             }
//         } else {
//             response = {
//                 message: result.affectedRows + " data updated"
//             }
//         }
//         res.json(response) // send response
//     })
// })

// // end-point menghapus data penyewa berdasarkan id_penyewa
// app.delete("/penyewa/:id", (req,res) => {
//     // prepare data
//     let data = {
//         id_penyewa: req.params.id
//     }

//     // create query sql delete
//     let sql = "delete from penyewa where ?"

//     // run query
//     db.query(sql, data, (error, result) => {
//         let response = null
//         if (error) {
//             response = {
//                 message: error.message
//             }
//         } else {
//             response = {
//                 message: result.affectedRows + " data deleted"
//             }
//         }
//         res.json(response) // send response
//     })
// })
// module.exports = app