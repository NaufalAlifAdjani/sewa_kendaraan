const express = require("express")
const moment = require("moment")
const db = require("./router")

const router = express.Router()
// end-point menambahkan data sewa siswa 
router.post("/penyewa", (req,res) => {
    // prepare data to sewa
    let data = {
        id_admin: req.body.id_admin,
        id_user: req.body.id_user,
        tgl_kembali : req.body.tgl_kembali,
        tgl_sewa: moment().format('YYYY-MM-DD HH:mm:ss')
    }

    let kendaraan = JSON.parse(req.body.kendaraan)

    let sql = "insert into penyewa set ?"


    // run query
    db.query(sql, data, (error, result) => {
        let response = null
        
        if (error) {
            res.json({message: error.message})
        } else {
            
            // get last inserted id_sewa
            let lastID = result.insertId


            // prepare data to detail_sewa
            let data = []
            for (let index = 0; index < kendaraan.length; index++) {
                data.push([
                    lastID, kendaraan[index].id_kendaraan
                ])                
            }


            let sql = "insert into detail_sewa values ?"

            db.query(sql, [data], (error, result) => {
                if(error){
                    res.json({message: error.message})
                }else{
                    res.json({message: "Data has been inserted"})
                }
            })
        }
    })
})

/// end-point menampilkan data sewa
router.get("/sewa", (req,res) => {
    // create sql query
    let sql = "select p.id_penyewa, p.id_user,p.tgl_sewa, p.tgl_kembali, s.nama_user, p.id_admin, u.nama_admin " +
    "from penyewa p join user s on p.id_user = s.id_user " +
    "join admin u on p.id_admin = u.id_admin"


    // run query
    db.query(sql, (error, result) => {
        if (error) {
            res.json({ message: error.message})   
        }else{
            res.json({
                count: result.length,
                sewa: result
            })
        }
    })
})

// end-point akses data user berdasarkan id_penyewa tertentu
router.get("/penyewa/:id_penyewa", (req, res) => {
    let data = {
        id_penyewa: req.params.id_penyewa
    }
    // create sql query
    let sql = "select * from penyewa where ?"

    // run query
    db.query(sql, data, (error, result) => {
        let response = null
        if (error) {
            response = {
                message: error.message // pesan error
            }            
        } else {
            response = {
                count: result.length, // jumlah data
                penyewa: result // isi data
            }            
        }
        res.json(response) // send response
    })
})

    // end-point untuk menghapus data penyewa
    router.delete("/penyewa/:id_penyewa", (req, res) => {
        let param = { id_penyewa: req.params.id_penyewa}


        // create sql query delete detail_pelanggaran
        let sql = "delete from detail_sewa where ?"


        db.query(sql, param, (error, result) => {
            if (error) {
                res.json({ message: error.message})
            } else {
                let param = { id_penyewa: req.params.id_penyewa}
                // create sql query delete penyewa
                let sql = "delete from penyewa where ?"


                db.query(sql, param, (error, result) => {
                    if (error) {
                        res.json({ message: error.message})
                    } else {
                        res.json({message: "Data has been deleted"})
                    }
                })
            }
        })


    })




module.exports = router