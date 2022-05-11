'use strict'

const db = require('../db')

module.exports = {
    index: (req, res) => {
        const sql = 'select * from produk'

        db.query(sql, (error, results) => {
            if (error) throw (error)
            res.json({
                message: "berhasil menampilkan data",
                produk: results
            })
        })
    },
    getId: (req, res) => {
        const id = req.params.id;
        db.query(`select * from produk where idProduk = '${id}'`, (err, results) => {
            if (err) throw err;
            res.json({
                message: "Berhasil Menampilkan Data",
                data: results,
            });
        });
    },
    getImg: (req, res) => {
        const id = req.params.id;
        db.query(`select fotoProduk from produk where idProduk = '${id}'`, (err, results) => {
            if (err) throw err;
            res.json({
                message: "Berhasil Menampilkan Data",
                data: results,
            });
        });
    },
    post: (req, res) => {
        let find = req.body.find
        let sql = "select * from produk where idProduk like '%" + find + "%' or namaProduk like '%" + find + "%' or deskripsiProduk like '%" + find + "%'"
        db.query(sql, (err, results) => {
            if (err) {
                throw err
            } else {
                let response = {
                    count: results.length,
                    produk: results
                }

                res.setHeader("Content-Type", "application/json")
                res.send(JSON.stringify(response))
            }
        })
    },
    tambah: (req, res) => {

        let namaProduk = req.body.namaProduk
        let deskripsiProduk = req.body.deskripsiProduk
        let hargaProduk = req.body.hargaProduk
        let fotoProduk = req.file.filename

        if (!namaProduk, !deskripsiProduk, !hargaProduk || !fotoProduk) {
            res.status(402).json({
                message: 'Data harus diisi!'
            })
        } else {
            return db.query(`INSERT INTO produk SET?`, { namaProduk, deskripsiProduk, hargaProduk, fotoProduk }, (error, result) => {
                if (error) throw (error)
                res.json({
                    message: "berhasil menambahkan data",
                    data: result
                })
            })
        }
    },
    hapus: (req, res) => {
        const idProduk = req.params.idProduk

        db.query(`DELETE FROM produk WHERE idProduk = ?`, idProduk, (error, results) => {
            if (error) throw (error)
            res.json({
                message: "berhasil menghapus data",
                results: results
            })
        })
    },
    update: (req, res) => {
        let id = req.params.id;
        let data = {
            namaProduk: req.body.namaProduk,
            deskripsiProduk: req.body.deskripsiProduk,
            hargaProduk: req.body.hargaProduk,

        };
        if (req.file) {
            data.fotoProduk = req.file.filename;
            db.query(`update produk set ? where idProduk = ${id}`, data, (err, result) => {
                if (err) throw err;
                res.json({
                    message: "Success updated data",
                });
            }
            );
        } else {
            db.query(`update produk set ? where idProduk = ${id}`, data, (err, result) => {
                if (err) {
                    throw error;
                } else {
                    res.json({
                        message: "data has been updated",
                    });
                }
            }
            );
        }
    }
}