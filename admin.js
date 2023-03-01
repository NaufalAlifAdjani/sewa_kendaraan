const express = require("express")
const db = require("./router")
const md5 = require ("md5")
const router = express.Router()

// end-point menyimpan data admin
router.post("/admin", (req,res) => {

    // prepare data
    let data = {
        nama_admin: req.body.nama_admin,
        status_admin: req.body.status_admin,
        password: md5(req.body.password)
    }

    // create sql query insert
    let sql = "insert into admin set ?" //tanda tanya memasukkan value ke tabel admin

    // run query
    db.query(sql, data, (error, result) => {
        let response = null
        if (error) {
            response = {
                message: error.message
            }
        } else {
            response = {
                message: result.affectedRows + " data admin masuk"
            }
        }
        res.json(response) // send response
    })
})

// end-point akses data admin (menampilkan seluruh admin)
router.get("/admin", (req, res) => {
    // create sql query
    let sql = "select * from admin"

    // run query
    db.query(sql, (error, result) => {
        let response = null
        if (error) {
            response = {
                message: error.message // pesan error
            }            
        } else {
            response = {
                count: result.length, // jumlah data
                admin: result // isi data
            }            
        }
        res.json(response) // send response
    })
})

// end-point akses data admin berdasarkan id_admin tertentu
router.get("/admin/:id", (req, res) => {
    let data = {
        id_admin: req.params.id
    }
    // create sql query
    let sql = "select * from admin where ?"

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
                admin: result // isi data
            }            
        }
        res.json(response) // send response
    })
})

// end-point mengubah data admin
router.put("/admin", (req,res) => {

    // prepare data
    let data = [
        // data
        {
            nama_admin: req.body.nama_admin,
            status_admin: req.body.status_admin,
            password: md5(req.body.password)
        },

        // parameter (primary key)
        {
            id_admin: req.body.id_admin
        }
    ]

    // create sql query update
    let sql = "update admin set ? where ?"

    // run query
    db.query(sql, data, (error, result) => {
        let response = null
        if (error) {
            response = {
                message: error.message
            }
        } else {
            response = {
                message: result.affectedRows + " data updated"
            }
        }
        res.json(response) // send response
    })
})

// end-point menghapus data admin berdasarkan id_admin
router.delete("/admin/:id", (req,res) => {
    // prepare data
    let data = {
        id_admin: req.params.id
    }

    // create query sql delete
    let sql = "delete from admin where ?"

    // run query
    db.query(sql, data, (error, result) => {
        let response = null
        if (error) {
            response = {
                message: error.message
            }
        } else {
            response = {
                message: result.affectedRows + " data deleted"
            }
        }
        res.json(response) // send response
    })
})

module.exports = router
