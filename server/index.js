const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db"); // с помощью этого мы можем делать запросы к постгресу
//middleware
app.use(cors())
app.use(express.json()) //req.body

//ROUTES//

//create a result
app.post("/results", async (req,res) => {
    try {
        const {result_value} = req.body; // the ai answer is getting here
        const newResult = await pool.query(
            "INSERT INTO results (result_value) VALUES($1) RETURNING *",
            [result_value]
        );

        res.json(newResult.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
})
//get all results
app.get("/results", async(req,res) =>{
    try {
        const allResults = await pool.query("SELECT * FROM results");
        res.json(allResults.rows);
    } catch (err) {
        console.error(err.message)
    }
})
//get a result
app.get("/results/:id", async(req,res) =>{ // :id - variable that we can get from url
    try {
        const {id} = req.params;
        const result = await pool.query("SELECT * FROM results WHERE result_id = $1", [id]);
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err.message)
    }
})

//delete a result
app.delete("/results/:id", async(req,res) =>{ // :id - variable that we can get from url
    try {
        const {id} = req.params;
        const deleteResult = await pool.query("DELETE FROM results WHERE result_id = $1", [id]);
        res.json(`Result id:${id} was deleted`);
    } catch (err) {
        console.error(err.message)
    }
})
app.listen(5000, 'localhost',(error)=>{
    error ? console.log(error) : console.log("started on port 5000");
})