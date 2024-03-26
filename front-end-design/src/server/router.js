const express = require("express");
const router = express.Router();
const validator = require('validator');
const isEmpty = require("lodash/isEmpty");
const sqlFn = require("./config");
const url = require("url");
const jwt = require("jsonwebtoken");
const key = require("./secretkey")


// encrypt password
const encryptPassword = (password) => {
    return Buffer.from(password).toString('base64');

};


const validatorInput = (data) => {
    let errors = {};
    if (validator.isEmpty(data.username)) {
        errors.username = "Username can not be empty";
    }
    if (!validator.isEmail(data.email)) {
        errors.email = "This is not a valid email";
    }

    if (validator.isEmpty(data.password)) {
        errors.password = "Password can not be empty";
    }

    if (!validator.equals(data.password, data.passwordConfirmation)) {
        errors.passwordConfirmation = "Password does not match";
    }

    return {
        isValid: isEmpty(errors),
        errors
    };
};


router.post("/register", (req, res) => {
    const { isValid, errors } = validatorInput(req.body);

    console.log(isValid);
    console.log(req.body);

    if (!isValid) {
        res.send(errors)

    } else {

        //success 

        const { firstname, lastname, phonenum, address, city, province, postalCode, country, username, email, password, passwordConfirmation } = req.body;
        //console.log(req.body);

        const encryptedPassword = encryptPassword(password);

        const sql = "insert into user values(null,?,?,?,?,?,?,?,?,?,?,?)";
        const arr = [firstname, lastname, phonenum, address, city, province, postalCode, country, username, email, encryptedPassword]; // Use encrypted password
        console.log(arr);
        sqlFn(sql, arr, result => {
            console.log(result);
            if (result.affectedRows > 0) {
                res.send({ msg: "success" })
            } else {
                res.send({ msg: "Register fail" })
            }

        });

    }
});


// dealwith repeated username

router.get("/repeat/username", (req, res) => {
    const username = url.parse(req.url, true).query.username;
    const sql = "select * from user where username=?";
    const arr = [username]

    sqlFn(sql, arr, result => {
        if (result.length) {
            res.send({
                status: 200,
                msg: "username repeated",
                flag: false
            })
        } else {
            res.send({
                status: 200,
                msg: "not repeated",
                flag: true
            })
        }
    })

})


router.post("/login", (req, res) => {
    const username = req.body.username;
    const encryptedPassword = encryptPassword(req.body.password);

    const sql = "select * from user where username=? and password=?";
    const arr = [username, encryptedPassword];
    sqlFn(sql, arr, result => {
        if (result.length > 0) {
            const token = jwt.sign({
                uid: result[0].id,
                username: result[0].username
            }, key.secretkey)
            res.send({
                result,
                token,
                nick: result[0].username,
                status: 200,
                customerid: result[0].id,
                address: result[0].address,
                email: result[0].email,
                firstname: result[0].firstname,
                lastname: result[0].lastname,
                phonenumber: result[0].phonenumber,
                lastname: result[0].lastname,
                postalCode: result[0].postalCode,
                province: result[0].province,
                country: result[0].country,
                city: result[0].city

            })



            // res.send({
            //     result,
            //     status: 200
            // })
        } else {
            res.send({
                status: 400,
                msg: "username and password does not"
            })
        }

    })
})




module.exports = router;
