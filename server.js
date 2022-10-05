const express = require('express')
const { spawn } = require('child_process');
const  {PythonShell} = require("python-shell")
const app = express()
const cors = require('cors')
const port = 3000


app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/', async (req, res) => {
  
  let options={
    args:[req.query.link]
  }

  PythonShell.run("scanner.py",options,(err,result)=>{
    if(err){
      console.log(err)
    }
    console.log(result)
    res.send(result);
  })


  /*console.log(req.query.link)
  var dataToSend;
  const python = await spawn('python3', ["scanner.py",req.query.link.toString()]);
  
  python.stdout.on('data',async data=> {
    dataToSend  =await data.toString();
  });

  python.stderr.on('data', data => {
    console.log('stderr: ' + data.toString());
});


  console.log("Data is =");
  console.log(dataToSend)
  console.log("data retrived");

  python.on('close', (code) => {
    console.log(`child process close all stdio with code ${code}`);
    res.send(dataToSend)
  });*/

})
app.listen(port, () => console.log(`Example app listening on port ${port}!`))