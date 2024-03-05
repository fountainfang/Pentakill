const express = require("express");
const router = express.Router();
const validator = require('validator')
const isEmpty = require("lodash/isEmpty")


const validatorInput = (data) => {
    let errors = {}
    if (validator.isEmpty(data.username)) {
        errors.username = "Username can not be empty"
    }
    if (!validator.isEmail(data.email)) {
        errors.email = "This is not a valid email"
    }
    console.log(1)
    if (validator.isEmpty(data.password)) {
        errors.password = "Password can not be empty"
    }
    console.log(2)
    if (validator.equals(data.password, data.passwordConfirmation)) {
        errors.password = "Password does not match"
    }

    return {

        isValid: !isEmpty(errors),
        errors


    }

}

router.post("/register", (req, res) => {
    const { isValid, errors } = validatorInput(req.body);

    if (isValid) {

        res.json({ msg: "success" });
    } else {

        res.status(400).json(errors);
    }
});


module.exports = router;