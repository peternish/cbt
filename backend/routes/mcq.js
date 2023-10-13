var express = require('express');
var con= require('../dbconnection');

module.exports.mcq = async function(req, res) {
    console.log("++" + req.query.testid + "+++");
    con.query("SELECT * FROM mcq WHERE testid = ? && testname = ?", [req.query.testid, req.query.testname], function(err, result) {
        if (err)
            console.log(err);
        res.send(result);
    });
};