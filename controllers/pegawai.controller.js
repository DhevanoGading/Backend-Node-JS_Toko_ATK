'use strict'

const db = require('../db')

module.exports = {
    index: (req, res) => {
        const sql = 'select * from pegawai'

        db.query(sql, (error, results) => {
            if (error) throw (error)
            res.json({
                message: "berhasil menampilkan data",
                results: results
            })
        })
    },
    getId: (req, res) => {
        const id = req.params.id;
        db.query(`select * from pegawai where idPegawai = '${id}'`, (err, results) => {
            if (err) throw err;
            res.json({
                message: "Berhasil Menampilkan Data",
                data: results,
            });
        });
    },
    tambah: (req, res) => {

        let namaPegawai = req.body.namaPegawai
        let alamatPegawai = req.body.alamatPegawai

        if (!namaPegawai || !alamatPegawai) {
            res.status(402).json({
                message: 'Data harus diisi!'
            })
        } else {
            return db.query(`INSERT INTO pegawai SET ?`, { namaPegawai, alamatPegawai }, (err, results) => {
                if (err) {
                    return res.status(500).json({ err })
                } else {
                    return res.json({
                        message: "Berhasil menambahkan pegawai",
                        namaPegawai: namaPegawai,
                        alamatPegawai: alamatPegawai
                    })
                }
            })
        }
    },
    hapus: (req, res) => {
        const idPegawai = req.params.idPegawai

        db.query(`DELETE FROM pegawai WHERE idPegawai = ?`, idPegawai, (error, results) => {
            if (error) throw (error)
            res.json({
                message: "berhasil menghapus data",
                results: results
            })
        })
    },
    ubah: (req, res) => {
        const idPegawai = req.params.idPegawai
        const { namaPegawai, alamatPegawai } = req.body

        db.query(`UPDATE pegawai SET ? WHERE idPegawai = '${idPegawai}'`, { namaPegawai, alamatPegawai }, (error, results) => {
            if (error) throw (error)
            res.json({
                message: "berhasil update data",
                results: results
            })
        })
    },
}