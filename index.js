import express from "express";
import bodyParser from "body-parser";
import env from "dotenv";
import pg from "pg";

const app = express();
const port = 3000;
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
env.config();

const db = new pg.Client({
    user: process.env.PG_USER,
    host: process.env.PG_HOST,
    database: process.env.PG_DATABASE,
    password: process.env.PG_PASSWORD,
    port: process.env.PG_PORT
});
db.connect();

app.get("/",(req,res)=>
{
    res.render("index.ejs");
})

app.post("/submit",async (req,res)=>
{
    try
    {       
        const trWord = req.body.turkish;
        const engWord = req.body.english;
        console.log(trWord,engWord);
        db.query("INSERT INTO words (tr,eng) VALUES ($1,$2) RETURNING id",[trWord,engWord]);
        res.redirect("/")
    }
    catch(err)
    {
        console.error("Something bad happend:", err)
    }
});

app.listen(port, ()=>
{
    console.log(`Server running on port ${port}`);
})