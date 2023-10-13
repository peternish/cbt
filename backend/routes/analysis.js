var express = require('express');
var con= require('../dbconnection');

module.exports.general = async function(req, res) {
    const response = {};
    try {
        const data = await new Promise((resolve, reject) => {
            con.query("SELECT DISTINCT sclass FROM student", function(err, data) {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
            });
        });

        for (const i in data) {
            response[data[i].sclass] = {}
            const sql2 = `SELECT DISTINCT testname FROM test`;
            const testname = await new Promise((resolve, reject) => {
                con.query(sql2, function(err, testname) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(testname);
                    }
                });
            });

            for (const subject in testname) {
                response[data[i].sclass][testname[subject].testname] = {}
                const sql3 = `SELECT testid FROM test WHERE testname = '${testname[subject]['testname']}'`;
                const testid = await new Promise((resolve, reject) => {
                    con.query(sql3, function(err, testid) {
                        if (err) {
                            reject(err);
                        } else {
                            resolve(testid);
                        }
                    });
                });
                
                for (const id in testid) {
                    const sql4 = `SELECT AVG(mark) AS mark FROM result WHERE testid = '${testid[id]['testid']}' AND srollno LIKE "%${data[i].sclass}%"`;
                    const mark = await new Promise((resolve, reject) => {
                        con.query(sql4, function(err, testid) {
                            if (err) {
                                reject(err);
                            } else {
                                resolve(testid);
                            }
                        });
                    });
                    response[data[i].sclass][testname[subject].testname][testid[id].testid] = mark[0].mark;
                }
            }
        };

        const sql_id = `SELECT testid FROM test`

        const testidlist = await new Promise((resolve, reject) => {
            con.query(sql_id, function(err, testidlist) {
                if (err) {
                    reject(err);
                } else {
                    resolve(testidlist);
                }
            });
        });
        res.send({res:response, testid:testidlist});
    } catch (err) {
      console.log(err);
    }
  };

module.exports.select = async function(req, res) {
    try {
        var classname = req.body.classname;
        var sql = `SELECT sname FROM student WHERE sclass = '${classname}'`;
        const students = await new Promise((resolve, reject) => {
            con.query(sql, function(err, students) {
                if (err) {
                    reject(err);
                } else {
                    resolve(students);
                }
            });
        });
        res.send(students);
    } catch(err) {
        console.log(err);
    }
}

module.exports.individual = async function(req, res) {
    try {
        var student = req.body.student;

        const srollno = await new Promise((resolve, reject) => {
            con.query(`SELECT srollno FROM student WHERE sname = '${student}'`, function(err, srollno) {
                if (err) {
                    reject(err);
                } else {
                    resolve(srollno);
                }
            });
        });
        var sql = `SELECT mark, testid FROM result WHERE srollno = '${srollno[0]['srollno']}'`;
        const marks = await new Promise((resolve, reject) => {
            con.query(sql, function(err, marks) {
                if (err) {
                    reject(err);
                } else {
                    resolve(marks);
                }
            });
        });
        var sql1 = `SELECT testid, testname FROM test`;
        const tests = await new Promise((resolve, reject) => {
            con.query(sql1, function(err, tests) {
                if (err) {
                    reject(err);
                } else {
                    resolve(tests);
                }
            });
        });
        res.json({marks:marks, tests:tests});
    } catch(err) {
        console.log(err);
    }
}