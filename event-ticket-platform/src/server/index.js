const express = require("express");
const app = express();
const router = require("./router")
const bodyparser = require("body-parser")

app.use(bodyparser.urlencoded({
    extended: true
}))

app.use(bodyparser.json());

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});


app.use("/api", router)

app.listen(3300, () => {
    console.log("sever on 3300 port")
})