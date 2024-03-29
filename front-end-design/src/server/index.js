const express = require("express");
const app = express();
const router = require("./router")
const bodyparser = require("body-parser")
const cors = require("cors")



app.use(cors());

app.use(bodyparser.urlencoded({
    extended: true
}))



app.use(bodyparser.json());

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});


// app.post('/api/register', (req, res) => {
//     console.log(req.body); // 打印 req.body 的值到控制台
//     res.send('Request received');
// });




app.use("/api", router)

app.listen(3300, () => {
    console.log("sever on 3300 port")
})