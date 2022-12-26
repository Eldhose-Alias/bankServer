
// importing jsonwebtoken

const jwt = require('jsonwebtoken')


userDetails={
    1000:{acnumber:1000,username:"Anna",password:123,balance:0,transaction:[]},
    1001:{acnumber:1001,username:"Anu",password:1234,balance:0,transaction:[]},
    1002:{acnumber:1002,username:"Manu",password:1235,balance:0,transaction:[]},
    1003:{acnumber:1003,username:"Arun",password:1236,balance:0,transaction:[]}
  }

// register function

register=(acno,uname,psw)=>{

    if(acno in userDetails){
      return {
        statusCode:401,
        status:false,
        message:"User Already Exist"
      }
    }
    else{
      userDetails[acno] = {acno,username:uname,password:psw,balance:0,transaction:[]}
      console.log(userDetails);
      return {
        statusCode:200,
        status:true,
        message:"Registration Success"
      }
    }
    
  }

  // login function

  
  login = (acno,psw)=> {

     if(acno in userDetails ){
  
       if(psw == userDetails[acno]["password"]){

        const token =jwt.sign({currentAcno:acno},'secretkey123' )

        return {
          statusCode:200,
          status:true,
          message:"Login Success" ,
          token
        }

       }
       else{
        return {
          statusCode:401,
          status:false,
          message:"Incorrect Password"
        }
     }
    }
    else{
      return{
        statusCode:401,
        status:false,
        message:"Incorrect Account no:"
      }
    }
  }

// deposit function

deposit = (acno,password,amount)=> {
  var amnt=parseInt(amount)
  if(acno  in userDetails){
    if(password==userDetails[acno]["password"]){
      userDetails[acno]["balance"]+=amnt

      userDetails[acno]["transaction"].push({type:'CREDIT',amount:amnt})

      return {
        statusCode:200,
        status:true,
        message: userDetails[acno]["balance"]
      }
    }
    else{
      return {
        statusCode:401,
        status:false,
        message:"Incorrect password"
    }
  }
}
  else{
    return {
      statusCode:401,
      status:false,
      message: "Incorrect acno"
  }
    
  }
}

// withdraw function
withdraw = (acno,password,amount)=> {
  var amnt=parseInt(amount)
  if(acno in userDetails){
    if(password==userDetails[acno]["password"]){
      if(amnt<=userDetails[acno]["balance"]){
        userDetails[acno]["balance"]-=amnt

        userDetails[acno]["transaction"].push({type:'DEBIT',amount:amnt})
        return {
        statusCode:200,
        status:true,
        message: userDetails[acno]["balance"]
        }

      }
      else{
        return {
          statusCode:401,
          status:false,
          message:"insufficient balance"
        }
      }
    }
    else{
      return{
        statusCode:401,
        status:false,
        message:'incorrect password'
      }
    }
  }
  else{
    return{
      statusCode:401,
      status:false,
      message:'incorrect acno'
    }
  }
}

  // trasaction histroy
  gettransaction = (acno)=> {
    if(acno in userDetails){
      return{
        statusCode:200,
        status:true,
        message: userDetails[acno]["transaction"]
      }
    }
    else{
      return{
      statusCode:401,
      status:false,
      message:'incorrect acno'
      }
    }
  }

  // exporting contents

  module.exports = {
    register ,
    login ,
    deposit ,
    withdraw ,
    gettransaction
  }