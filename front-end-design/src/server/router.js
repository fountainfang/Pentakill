const express = require("express");
const router = express.Router();
const validator = require('validator');
const isEmpty = require("lodash/isEmpty");
const sqlFn = require("./config");
const url = require("url");
const jwt = require("jsonwebtoken");
const key = require("./secretkey");


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

        const { firstname, lastname, phonenum, address, city, province, postalCode, country, username, email, password, usertype, passwordConfirmation } = req.body;
        //console.log(req.body);

        const encryptedPassword = encryptPassword(password);

        const sql = "insert into user values(null,?,?,?,?,?,?,?,?,?,?,?,?)";
        const arr = [firstname, lastname, phonenum, address, city, province, postalCode, country, username, email, encryptedPassword, usertype]; // Use encrypted password
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


// login
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
                city: result[0].city,
                usertype: result[0].usertype,

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
router.post("/createEvent", (req, res) => {
    const { userId, eventName, eventCategory, eventDesc, eventDate, startTime, endTime, address, totalTicket, ticketPrice, profileImage, bannerImage, rating, approvalStatus } = req.body;
    console.log(userId)
    const sql = "INSERT INTO event (userId, eventName, eventCategory, eventDesc, eventDate, startTime, endTime, address, totalTicket, ticketPrice, profileImage, bannerImage, rating, approvalStatus) VALUES ( ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    const arr = [ userId, eventName, eventCategory, eventDesc, eventDate, startTime, endTime, address, totalTicket, ticketPrice, profileImage, bannerImage, 0, "pending"];
    console.log(req.body)
    sqlFn(sql, arr, result => {
        console.log(result)

        console.log(result.affectedRows)
        if (result.affectedRows > 0) {
            res.status(200).send({ msg: "success" });
            console.log("success")
        } else {
            // Assuming failure here means no rows were affected
            res.status(400).send({ msg: "fail" });
            console.log("fail")
        }
    });
});

router.put("/updateUser", (req, res) => {
    // 解析来自前端的编辑信息
    const { firstName, lastName, email, phonenumber, address, city, state, country, postalCode, username } = req.body;
    console.log(req.body)

    // 更新数据库中相应用户的信息
    // 例如使用 SQL UPDATE 语句
    const sql = "UPDATE user SET firstname=?, lastname=?, email=?, phonenumber=?, address=?, city=?, province=?, country=?, postalCode=? WHERE username=?";
    const values = [firstName, lastName, email, phonenumber, address, city, state, country, postalCode, username];
    sqlFn(sql, values, result => {
        if (result.affectedRows > 0) {
            // 更新成功
            res.status(200).json({ success: true, message: "User information updated successfully" });
        } else {
            // 更新失败
            res.status(400).json({ success: false, message: "Failed to update user information" });
        }
    });
});

router.post("/updateStatus", (req, res) => {
    const { eventId, approvalStatus } = req.body; // Destructure eventId and approvalStatus from the request body

    // Validation (optional, but recommended)
    if (!eventId || validator.isEmpty(approvalStatus)) {
        return res.status(400).send({ msg: "Missing eventId or approvalStatus" });
    }

    const sql = "UPDATE event SET approvalStatus = ? WHERE eventId = ?";
    const arr = [approvalStatus, eventId];

    sqlFn(sql, arr, (result) => {


        if (result.affectedRows > 0) {
            res.status(200).send({ msg: "Event status updated successfully" });
        } else {
            res.status(404).send({ msg: "Event not found" });
        }
    });
});

router.get("/getEvents", (req, res) => {
    const sql = "SELECT * FROM event"; // Fetch all events
    sqlFn(sql, [], result => {

        res.json(result); // Send the list of all events as JSON
    });
});

router.get("/getUserEvents", (req, res) => {
    const {userId}= req.query;
    console.log(req.query);
    const sql = "SELECT * FROM event WHERE userId = ?";
    const arr = [userId];
    sqlFn(sql, arr, result => {
        console.log(result)
        res.json(result);
    });
});

router.post("/createOrder", (req, res) => {
    const { eventId, orderDate, ticketPrice, customerId } = req.body;
    console.log(customerId)
    const sql = "INSERT INTO `order` (eventId, orderDate, ticketPrice, customerId) VALUES (?, ?, ?, ?)";
    const arr = [eventId, orderDate, ticketPrice, customerId];
    console.log(req.body)
    sqlFn(sql, arr, result => {
        console.log(result)

        console.log(result.affectedRows)
        if (result.affectedRows > 0) {
            res.status(200).send({ msg: "success" });
            console.log("success")
        } else {
            // Assuming failure here means no rows were affected
            res.status(400).send({ msg: "fail" });
            console.log("fail")
        }
    });
});

router.get("/getOrder", (req, res) => {

    const { customerId } = req.query;

    const sql = "SELECT * FROM `order` WHERE customerId = ?  ";
    const arr = [customerId]

    sqlFn(sql, arr, result => {


        res.json(result); // Send the list of all events as JSON
    });
});


module.exports = router;
