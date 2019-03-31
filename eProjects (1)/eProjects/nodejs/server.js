var express = require("express");
var app = express();

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

//lets require/import the mongodb native drivers.
var mongodb = require('mongodb');

//We need to work with "MongoClient" interface in order to connect to a mongodb server.
var MongoClient = mongodb.MongoClient;

// Connection URL. This is where your mongodb server is running.
var url = "mongodb+srv://nhom2:ngaunhien@testcluster-fcaqe.mongodb.net/awesome_bridge"

MongoClient.connect(url, { useNewUrlParser: true }, function (err, db) {
    if (err) {
        console.log('Unable to connect to the mongoDB server. Error:', err);
    } else {
        //HURRAY!! We are connected. 🙂
        console.log('Connected...');
        var database = db.db();
        var collection = database.collection("bridges");

        app.get("/bridges", function (req, res) {
            var objectParam = {};
            var id = parseInt(req.query.id);
            var ten = req.query.ten;
            var vitri = req.query.vitri;
            var anhbia = req.query.anhbia;

            if (id) {
                objectParam.ID = id;
            }
            if (ten) {
                objectParam.ten = ten;
            }
            if (vitri) {
                objectParam.vitri = vitri;
            }
            if (anhbia) {
                objectParam.anhbia = anhbia;
            }

            console.log(id);
            collection.find(objectParam).toArray(function (err, result) {
                if (err) {
                    res.send({
                        status: "error"
                    });
                } else if (result.length) {
                    res.send(result);
                } else {
                    res.send([]);
                }
            });
        })



        // do some work here with the database.
        /*
        collection.find({}).toArray(function(err, result ) {
            if(err) {
                console.log("failed")
            } else if (result.length) {
                console.log('Found:', result);
            } else {
                console.log('No document(s) found with defined "find" criteria!');
            }
        });*/
        //Close connection
        //db.close();
    }
});

app.listen("3000", function () {
    console.log("server is running");
})
