const express = require("express");
const cors = require("cors");
const app = express();
const studentRouter = require("./controllers/student");

const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(studentRouter);

app.listen(port, (err) => {
    if (err) {
        return console.log(err);
    }

    console.log(`listening on port ${port}`);
});
