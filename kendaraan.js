const express = require("express")
const multer = require("multer") // untuk upload file
const path = require("path") // untuk memanggil path direktori
const db = require("./router")

const router = express.Router()

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // set file storage
        cb(null, './image');
    },
    filename: (req, file, cb) => {
        // generate file name 
        cb(null, "image-"+ Date.now() + path.extname(file.originalname))
    }   
})

let upload = multer({storage: storage})
router.post("/kendaraan", upload.single("image"), (req, res) => {
    // prepare data
    let data = {
        nopol: req.body.nopol,
        warna: req.body.warna,
        kondisi_kendaraan: req.body.kondisi_kendaraan,
        image: req.file.filename
    }

    if (!req.file) {
        // jika tidak ada file yang diupload
        res.json({
            message: "Tidak ada file yang dikirim"
        })
    } else {
        // create sql insert
        let sql = "insert into kendaraan set ?"

        // run query
        db.query(sql, data, (error, result) => {
            if(error) throw error
            res.json({
                message: result.affectedRows + " data berhasil disimpan"
            })
        })
    }
})

// read kendaraan
router.get("/kendaraan", (req, res) => {
    //create sql query
    let sql = "select * from kendaraan"

    // run query
    db.query(sql, (error,result) => {
        let response = null
        if (error) {
            response = {
                message: error.message //pesan error
            }
        } else {
            response = {
                count: result.length, //jumlah data
                kendaraan: result //isi data
            }
        }
        res.json(response) //kirim response
    })
})

// read kendaraan by search id
router.get("/kendaraan/:id", (req, res) => {
    let data = {
        id_kendaraan: req.params.id
    }
    // create sql query
    let sql = "select * from kendaraan where ?"

    // run query
    db.query(sql, data, (error,result) => {
        if(error){
            response = {
                message: error.message// pesan error
            }
        }else {
            response = {
                count: result.length,// jumlah data
                kendaraan: result //isi data
            }
        }
        res.json(response)
    })
})

// update
router.put("/kendaraan", upload.single("image"), (req,res) => {
    let data = null, sql = null

    let param = { id_kendaraan: req.body.id_kendaraan }

    if (!req.file) {
        data = {
            nopol: req.body.nopol,
            warna: req.body.warna,
            kondisi_kendaraan: req.body.kondisi_kendaraan
        }
    } else {
        data = {
            nopol: req.body.nopol,
            warna: req.body.warna,
            kondisi_kendaraan: req.body.kondisi_kendaraan,
            image: req.file.filename
        }

        sql = "select * from kendaraan where ?"
        db.query(sql, param, (err, result) => {
            if (err) throw err
            let fileName = result[0].image

            let dir = path.join(__dirname,"image",fileName)
            fs.unlink(dir, (error) => {})
        })
    }

    sql = "update kendaraan set ? where ?"

    db.query(sql, [data,param], (error, result) => {
        if (error) {
            res.json({
                message: error.message
            })
        } else {
            res.json({
                message: result.affectedRows + " data berhasil diubah"
            })
        }
    })
})
// delete
router.delete("/kendaraan/:id", (req,res) => {
    // prepare data
    let data = {
        id_kendaraan: req.params.id
    }

    // create query sql delete
    let sql = "delete from kendaraan where ?"

    // run query
    db.query(sql, data, (error, result) => {
        let response =null
        if (error) {
            response = {
                message: error.message
            }
        } else {
            response = {
                message: result.affectedRows + "data deleted"
            }
        }
        res.json(response)
    })
})


module.exports = router