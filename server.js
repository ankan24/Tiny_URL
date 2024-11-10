const express=require("express");
const app=express();
const fs=require('fs');
const path=require("path");
app.use(express.json());


const { v4: uuidv4 } = require('uuid');
const fullUUID = uuidv4();
const shortUUID = fullUUID.split('-')[0];
//console.log(shortUUID);  



let arr=[];
let data=fs.readFileSync("./url.json","utf-8");
let allUrl=JSON.parse(data);
app.get("/",(req,res)=>{
    res.sendFile(path.join(__dirname,"/index.html"))
})
app.post("/short-url",(req,res)=>{
    console.log(req.body)
    let obj={
        id:shortUUID,
        url:req.body.url
    }
    console.log(obj);
    allUrl.forEach(ele => {
        arr.push(ele);
    });
    arr.push(obj);
    let add=JSON.stringify(arr)
    fs.writeFileSync("./url.json",add);
    res.send(shortUUID);
})
app.get("/short-url/:id",(req,res)=>{
    console.log(req.params.id)
    //console.log(allUrl)
    let myLink=allUrl.filter((ele)=>{
        if(ele.id==req.params.id)
            return true;
    })
    console.log(myLink)
    res.redirect(myLink[0].url)
})
app.listen(8080,()=>{
    console.log("server 8080")
})