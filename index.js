// import dataService folder
const dataService = require('./service/dataService')

// import json web token
const jwt = require('jsonwebtoken')

// impoting express
const express = require('express')
const { json } = require('express')

// create app
const app = express()

// to covert jsons datas
app.use(express.json())

// creating middlewares for verify token
const jwtmiddleware = (req , res , next)=> {
  console.log("....router specefic middleware....");
  // runtym error checking 
  try{
    const token = req.headers['access-token']
    const data = jwt.verify(token , "secretkey123")
    console.log(data);
    next()
  }
  catch{
    res.status(422).json({
      statusCode :422 ,
      staus :false ,
      message :"please login first"
    })
  }
}

// 2.POST    register         request   responce
app.post('/register' , (req , res)=>{

  const result = dataService.register(req.body.acno , req.body.uname , req.body.psw)
   
    res.status(result.statusCode).json(result)
   })

//    login

app.post('/login' , (req , res)=>{

    const result = dataService.login(req.body.acno , req.body.psw)
     
      res.status(result.statusCode).json(result)
     })
  

    //  deposit           calling middleware 
    app.post('/deposit' , jwtmiddleware , (req , res)=>{

        const result = dataService.deposit(req.body.acno , req.body.password , req.body.amount)
         
          res.status(result.statusCode).json(result)
         })

        //  withdraw
    app.post('/withdraw' ,jwtmiddleware , (req , res)=>{

         const result = dataService.withdraw(req.body.acno , req.body.password , req.body.amount)
             
          res.status(result.statusCode).json(result)
             })

            //  transaction histroy
    app.post('/gettransaction' ,jwtmiddleware , (req , res)=>{

         const result = dataService.gettransaction(req.body.acno)
                    
          res.status(result.statusCode).json(result)
              })
       

// request 
    // login
    // register
    // deposit
    // withdraw
    // transaction history
    // delete  

// 1.GET request
//  app.get('/' , (req , res)=>{
//     res.send('GET METHOD CHECKING')
//  })

// 
// // 3.PUT
// app.put('/' , (req , res)=>{
//     res.send('PUT METHOD CHECKING')
//  })
// 4.PATCH
// app.patch('/' , (req , res)=>{
//     res.send('PATCH METHOD CHECKING')
//  })
// 5.DELETE
// app.delete('/' , (req , res)=>{
//     res.send('DELETE METHOD CHECKING')
//  })


// set port
app.listen(3000,()=>{
    console.log("server started at port number 3000");
})