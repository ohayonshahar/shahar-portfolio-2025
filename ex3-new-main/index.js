/* Ex. 3 
By: Lina Matta 
Maor Assulin 
Shahar Ohayon 
start working at 11/7/2023 */

// Importing and defining local variables and object //
const express = require('express');
const bodyParser = require("body-parser");  
const app=express(); 
let path=require('path');
const PORT=3000;
const fs=require('fs');
const fileUpload = require('express-fileupload');
const { render } = require('ejs');
const { error, Console } = require('console');
const { cookie } = require('request');
app.set('view engine','ejs');
app.use(express.static(path.join(__dirname,'public')));
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload({createParentPath: true}));
const cookieParser = require('cookie-parser');
const { readFile } = require('fs/promises');

// ************* global variables ************* //
let filepath = './public/list.json';
const correctUsername = 'shahar';
const correctPassword = '123';

// ************* Main page - log in page ************* //
app.get('/index',(req,res)=>{ // log in page
  res.header("Access-Control-Allow-Origin", "*");

    res.sendFile(path.join(__dirname,'public','index.html'));

   console.log("Login...")
})

app.post('/login',(req,res)=>{
  const { name, password } = req.body;
  if (name === correctUsername && password === correctPassword) {
    res.json({ success: true, message: 'Login successful' });
  } else {
    res.status(401).json({ success: false, message: 'Incorrect username or password' });
  }
})
  
// ************* To Do List  ************* //
app.get('/log',(req,res)=>{ // first log to the page 
  res.setHeader('Content-Type', 'application/json');
  fs.readFile(filepath, 'utf8', (err, data) => {
      res.end(JSON.stringify(data));})})

app.post('/todolist',(req,res)=>{
   itemsArr=req.body.items; //get the items array from the json object
  let newlist=JSON.stringify({'items':itemsArr});//stringfy the object 
  if (writeToFile(newlist,filepath)) res.send(itemsArr);// save the object in file 
  })

app.get('/logout',(req,res)=>{ // log out from the page 
  res.clearCookie('name');
  res.redirect('/index.html');
})

// ************* functions  ************* //
function writeToFile (data,filepath) // get a data, and save it to a file 
{fs.writeFile(filepath, data, (err) => {
  if (err) {
    console.error(err);
    res.status(500).send('Error saving JSON data');
  } else {
return true; // if writing data completed successfully
}})}

// ************* Listening to servert  ************* //
app.listen(PORT, function() {
      console.log(`App listening on port ${PORT}`);
    }); 