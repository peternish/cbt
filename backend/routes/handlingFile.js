var express = require('express');
const router=require('express').Router();
var app = express()
var con= require('./../dbconnection');
var testId;
var testName="";
var teachId="";

module.exports.checkTestId=async function(req,res,next){
    con.query("SELECT COUNT(*) AS cnt from test WHERE testid = ?",req.body.testid,function(err,data){
        
        if(err)
        console.log(err);
        else
        {
            if(data[0].cnt > 0)
            return res.json({resType:0});
            else
            {
                testId=req.body.testid;
                testName=req.body.testname;
                return res.json({resType:1});
            }
        }
    })
}

module.exports.handleFile = async function(req,res,next){
    var temp=req.body;
    console.log(testId);
    console.log(testName);
    var link="";
    temp.map((t,index)=>{
        
        var sql = "INSERT INTO `mcq`(`sno`,`testid`, `testname`, `question`,`option1`, `option2`, `option3`,`option4`,`answer`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
        var values = [(parseInt(index) + 1), testId, testName, t[0], t[1], t[2], t[3], t[4], t[5]];
        con.query(sql, values, function(err, result) {
            if (err) {
              console.log("**" + err + "**");
            } else {
              console.log(result);
            }
          });
    })
    var d=new Date().toISOString().slice(0, 19).replace('T',' ');
    
                con.query("SELECT tid FROM teacher WHERE tid=?",req.query.tid,function(err,data){
                if(err)
                console.log(err);
                else{
                    teachId=data[0].tid;
                    link='http://localhost:3001/testlogin?name='+testName+'&id='+testId;
            var sql = "INSERT INTO `test`(`tid`,`testid`,`testName`,`Date`,`url`) VALUES('"+ req.query.tid+"','"+ testId+"','"+ testName +"','"+ d+"','"+link+"') ";
            con.query(sql,function(err,result){
                if(err)
                console.log(err);
                console.log('test table updated');
                console.log(link)
                res.send({ln:link});
            })
        }
        })
}

module.exports.submitAns=async function(req,res,next)
{   
    let mark;

    var srollno=req.body.srollno;
    var testid=req.body.testid;
    var arr=req.body.ans;
    var arr_obj = JSON.parse(arr);

    var query1 = `SELECT COUNT(*) AS count FROM result WHERE testid = '${testid}' AND srollno = '${srollno}'`;
    var query2 = `SELECT answer FROM mcq WHERE testid = '${testid}'`;

    
    con.query(query2, (err, results) => {
        if(err) {
            console.log(err);
        }
        else {
            var correct_ans = 0;
            for (let i = 0; i < results.length; i++) {
                if (results[i]['answer'] == arr_obj[i]) {
                    correct_ans = correct_ans + 1;
                }
              }
            console.log(correct_ans);
            mark = ((correct_ans / results.length) * 10).toFixed(2); 
        }
    })

    // Execute the query
    con.query(query1, (error, results) => {
    if (error) {
        console.error('Error executing query:', error);
        return;
    }

    // Get the count from the query results
    const count = results[0].count;

    if (count > 0) {
        console.log('Record exists in the database');
        return res.json({resType:0});
        // Perform the necessary actions if the record exists
    } else {
        var sql1 = "INSERT INTO `result`(`srollno`,`testid`,`answers`, `mark`) VALUES ('" + srollno + "','" + testid + "','" +arr + "','"+mark+"')";
        con.query(sql1,[arr,srollno,testid],function(err,data){
            if(err)
            console.log(err);
            else
            {
                console.log("RESULT ARRAY INSERTED!!");
                return res.json({resType:1 , mark:mark});
            }
        })
        }
    });
}