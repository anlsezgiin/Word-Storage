import express from "express";
import bodyParser from "body-parser";
import env from "dotenv";
import pg from "pg";

const app = express();
const port = 3000;
env.config();

const db = new pg.Client({
    user: process.env.PG_USER,
    host: process.env.PG_HOST,
    database: process.env.PG_DATABASE,
    password: process.env.PG_PASSWORD,
    port: process.env.PG_PORT
});
db.connect();


app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));



app.get("/",(req,res)=>
{
    res.render("index.ejs");
})

app.listen(port, ()=>
{
    console.log(`Server running on port ${port}`);
})