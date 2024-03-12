const express = require("express");
const router = express.Router();
const validator = require('validator')
const isEmpty = require("lodash/isEmpty")
const sqlFn = require("./config")


const validatorInput = (data) => {
    let errors = {}
    if (validator.isEmpty(data.username)) {
        errors.username = "Username can not be empty"
    }
    if (!validator.isEmail(data.email)) {
        errors.email = "This is not a valid email"
    }

    if (validator.isEmpty(data.password)) {
        errors.password = "Password can not be empty"

    }

    if (!validator.equals(data.password, data.passwordConfirmation)) {
        errors.passwordConfirmation = "Password does not match"

    }

    return {
        isValid: !isEmpty(errors),
        errors
    }

}

router.post("/register", (req, res) => {
    const { isValid, errors } = validatorInput(req.body);
    if (isValid) {
        res.send(errors)
    } else {

        //success
        const { username, email, password, passwordConfirmation } = req.body
        const sql = "insert into user values(null,?,?,?)";
        const arr = [username, password, email]
        sqlFn(sql, arr, result => {
            console.log(result)
        })
        res.send({ msg: "success" })

    }
});


module.exports = router;