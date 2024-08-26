import express from "express";
import { readFile } from "../data/index.js";

const app = express()

app.get("/possession",(async(request, response)=>{
    response.send(await readFile("../UI/public/data.json"))
}))


app.listen(3000, () =>{
    console.log("je teste")
})