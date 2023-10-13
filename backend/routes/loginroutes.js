var bcrypt = require ('bcrypt');
const saltRounds=10;
var con= require('./../dbconnection');
const config=require('config');
const jwt=require('jsonwebtoken');

//student register
module.exports.register = async function(req,res){
    const password = req.body.spassword;
    const password1 = req.body.spassword1;
    if(password===password1)
    {
      const encryptedPassword = await bcrypt.hash(password, saltRounds)
      const encryptedPassword1 = await bcrypt.hash(password1, saltRounds)
      var users={
         "sname":req.body.sname,
         "srollno":req.body.srollno,
         "sclass":req.body.sclass,
         "spassword":encryptedPassword,
         "spassword1":encryptedPassword1
       }
      con.query("SELECT COUNT(*) AS cnt FROM student WHERE srollno = ? " , users.srollno , function(err , data){
         if(err){
             console.log(err); 
         }
         else{
             if(data[0].cnt > 0){  
              return res.status(400).json({resType:0});
             }else{
              var sql = "INSERT INTO `student`(`sname`,`srollno`, `sclass`, `spassword`) VALUES ('" + users.sname + "','" + users.srollno + "','" + users.sclass + "','" +users.spassword +"')";
              con.query(sql, function(err, result) {  
                if (err) {
                  console.log(err)
                  res.send({
                    "code":400,
                    "failed":"error ocurred"
                  })
                } else {
                  res.send({
                    "code":200,
                    "success":"user registered sucessfully"
                      });
                  }
              });  
            }       
             }
      })
      
    }
    else
    {
    console.log("PASSWORDS DO NOT MATCH");
    }
  }

  //teacher register
  module.exports.tregister = async function(req,res){
    const tpassword = req.body.tpassword;
    const tpassword1 = req.body.tpassword1;
    if(tpassword===tpassword1)
    {
      const tencryptedPassword = await bcrypt.hash(tpassword, saltRounds)
      const tencryptedPassword1 = await bcrypt.hash(tpassword1, saltRounds)
      var users={
         "tname":req.body.tname,
         "tid":req.body.tid,
         "temail":req.body.temail,
         "tphone":req.body.tphone,
         "tpassword":tencryptedPassword,
         "tpassword1":tencryptedPassword1
       }
      con.query("SELECT COUNT(*) AS cnt FROM teacher WHERE tid = ? " , users.tid , function(err , data){
         if(err){
             console.log(err); 
         }   
         else{
             if(data[0].cnt > 0){  
               return res.status(400).json({resType:0});
             }else{
              var sql = "INSERT INTO `teacher`(`tname`,`tid`,`temail`,`tphone`, `tpassword`) VALUES ('" + users.tname + "','" + users.tid + "','" + users.temail + "','" + users.tphone + "','" +users.tpassword +"')";
              con.query(sql, function(err, result) {  
                if (err) {
                  console.log(err)
                  res.send({ 
                    "code":400,
                    "failed":"error ocurred"
                  })
                } else {
                  res.send({
                    "code":200,
                    "success":"teacher registered sucessfully",
                      });
                  }
              });  
            }       
             }
      })
      
    }
    else
    {
    console.log("PASSWORDS DO NOT MATCH");
    }
  }

//student login
  module.exports.login = async function(req,res){
    var srollno= req.body.srollno;
    var spassword = req.body.spassword;
    con.query('SELECT * FROM student WHERE srollno = ?',srollno, async function (err, results, fields) {
      if (err) {
        console.log(err)
        res.send({
          "code":400,
          "failed":"error ocurred"
        })
      }else{
        if(results.length >0){
          console.log(results[0].spassword);
          console.log(spassword);        
          let comparision = await bcrypt.compare(spassword, results[0].spassword)
          console.log(comparision);
          if(comparision){
            const token = jwt.sign(
              {id:results[0].srollno},    //payload
              config.get('jwtSecret'),
              {expiresIn:3600}
              );
              res.send({
                "code":200,
                "success":"login sucessfull",
                token,
                user:{id:results[0].srollno,name:results[0].sname,type:"student"}
              })
          }
          else{
            res.send({
                 "code":204,
                 "success":"Roll number and password do not match"
            })
          }
        }
        else{
          res.send({
            "code":206,
            "success":"Roll number does not exits"
              });
        }
      }
      });
    }

  module.exports.tlogin = async function(req,res){
    var tid= req.body.tid;
    var tpassword = req.body.tpassword;
    con.query('SELECT * FROM teacher WHERE tid = ?',tid, async function (error, results, fields) {
      if (error) {
        res.send({
          "code":400,
          "failed":"error ocurred"
        })
      }else{
        if(results.length >0){    
          let comparision = await bcrypt.compare(tpassword, results[0].tpassword)

          if(comparision){
            const token = jwt.sign(
              {id:results[0].tid},    //payload
              config.get('jwtSecret'),
              {expiresIn:3600}
              );
              res.send({
                "code":200,
                "success":"login sucessfull",
                token,
                user:{id:results[0].tid,name:results[0].tname,type:"teacher",tid:results[0].tid}
              })
          }
          else{
            res.send({
                  "code":204,
                  "success":"id and password does not match"
            })
          }
        }
        else{
          res.send({
            "code":206,
            "success":"id does not exits"
              });
        }
      }
      });
    }