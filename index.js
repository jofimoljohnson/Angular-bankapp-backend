// server creation
const express = require('express')
const jwt = require('jsonwebtoken')
const cors = require('cors')




// app creation using express
const app = express()

// give command to share datas via cors
app.use(cors({origin:'http://localhost:4200'}))


// to parse json datas from req body
app.use(express.json())


// create port number
app.listen(3001,()=>{console.log("server started at port number 3001");})


// import dataservice file from service folder to use register function
const dataservice = require('./service/dataservice')


// register-post request
app.post('/register',(req,res)=>{
    console.log(req.body);
// its a response of asychronous request so we cant store output in a variable so we
// we use (then) to accesss and store the output
    dataservice.register(req.body.acno,req.body.username,req.body.password)
    .then(result=>{
      res.status(result.statusCode).json(result)


    })
})

// middleware creation
const jwtmiddleware=(req,res,next)=>{
  try{
    console.log("router specific middleware started.....");
    token = req.headers['token1']
   const data =  jwt.verify(token,'secretkey123')
   console.log(data);
  //  to take next request after the working of middleware
   next()
  }
   catch{
    res.status(422).json({
      statusCode:422,
      status:false,
      message:"plase login"
    })

   }

  }
 







// login-post request

app.post('/login',(req,res)=>{
  console.log(req.body);

 dataservice.login(req.body.acnum,req.body.psw).then(result=>{
  res.status(result.statusCode).json(result)

 })
})

// deposit-post request

app.post('/deposit',jwtmiddleware,(req,res)=>{
  
    console.log(req.body);

  dataservice.deposit(req.body.acnum,req.body.pswrd,req.body.amnt)
  .then(result=>{
    res.status(result.statusCode).json(result)

  })


 
 } )
     
    
  
  


// withdraw-post request

app.post('/withdraw',jwtmiddleware,(req,res)=>{
  console.log(req.body);

  dataservice.withdraw(req.body.acnum,req.body.pswrd,req.body.amnt).then(result=>{
    res.status(result.statusCode).json(result)

  })
})

// transactions-post request

app.post('/transaction',jwtmiddleware,(req,res)=>{
  console.log(req.body);

  dataservice.getTransaction(req.body.acno).then(result=>{
    res.status(result.statusCode).json(result)

  })
})


// delete -delete request
app.delete('/deleteacc/:acno',(req,res)=>{
  dataservice.deleteAcc(req.params.acno).then(result=>{
    res.status(result.statusCode).json(result)

  })
})

