const express = require("express")
const app = express()
const jwt = require("jsonwebtoken") // npm install jsonwebtoken
const md5 = require("md5")

// model petugas dan siswa
const petugas = require("../models/index").petugas
const siswa = require("../models/index").siswa
app.use(express.urlencoded({extended: true}))

// auth petugas
app.post("/loginpetugas", async (req, res) => {
    let parameter = {
        username: req.body.username,
        password: md5(req.body.password)
    }

    let result = await petugas.findOne({where: parameter})
    if(result === null){
        // invalid username or password
        res.json({
            message: "Invalid Username or Password"
        })
    }else{
        // login success
        // generate token using jwt
        // jwt->header, payload, secretKey
        let jwtHeader = {
            algorithm: "HS256",
            expiresIn: "1h"
        }

        let payload = {data: result}
        let secretKey = "LoginPetugas"

        let token = jwt.sign(payload, secretKey, jwtHeader)
        res.json({
            data: result,
            token: token
        })
    }
}) 

// auth siswa
app.post("/loginsiswa", async (req, res) => {
    let parameter = {
        nama: req.body.nama,
        nis: req.body.nis
    }

    let result = await siswa.findOne({where: parameter})
    if(result === null){
        // invalid username or password
        res.json({
            message: "Siswa not Found"
        })
    }else{
        // login success
        // generate token using jwt
        // jwt->header, payload, secretKey
        let jwtHeader = {
            algorithm: "HS256",
            expiresIn: "1h"
        }

        let payload = {data: result}
        let secretKey = "LoginSiswa"

        let token = jwt.sign(payload, secretKey, jwtHeader)
        res.json({
            data: result,
            token: token
        })
    }
})

module.exports = app