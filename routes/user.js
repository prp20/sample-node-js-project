const express = require('express');
const mysql = require('mysql');
const router = express.Router()

function get_connection() {
    return mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'userdetail'
    });
}

router.post('/user_create', (req, res) =>{
    console.log("trying to create a new user");
    const vehicleNum = req.body.create_vehicle_num;
    const driverName = req.body.create_driver_name;
    const id = req.body.create_id;
    const pin = req.body.create_pin;
    const connection = get_connection();
    const querystring = "INSERT INTO userdet (vehiclenum, drivername, id, pin) VALUES (?, ?, ?, ?) ";
    connection.query(querystring, [vehicleNum, driverName, id, pin], (err, results, fields) => {
        if(err) {
            console.log(" failed to inser data into database");
            res.sendStatus(500);
            return;
        }
        console.log("inserted a new user with id " + id);
        res.end();
    });
});
router.get("/",(req, res) => {
    console.log("hello from root");
    res.send("hello tere");
});

router.get('/user/:id', (req, res) => {
    console.log("Fetching user with user id" + req.params.id);
    const connection = get_connection();
    const userid = req.params.id;
    const querystring = "SELECT * FROM userdet where id = ?";
    connection.query(querystring, [userid], (err, rows, fields) => {
        if (err)  {
            console.log(" Failed to load  query for users" + err);
            res.sendStatus(500);
            return;
        }
        res.json(rows);
    });
});
router.get("/users",(req, res) => {
    const connection = get_connection();
    const userid = req.params.id;
    const querystring = "SELECT * FROM userdet";
    connection.query(querystring, (err, rows, fields) => {
        if (err)  {
            console.log(" Failed to load  query for users" + err);
            res.sendStatus(500);
            return;
        }
        res.json(rows);
    });
});

module.exports = router