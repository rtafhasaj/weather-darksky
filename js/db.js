/*
* WEB LOCAL STORAGE
* database name : weather_db
* table name: City_TB
*/


var dbname = "weather_db";
var db;

function CityStore(id, city) {
    try {
        db = window.openDatabase(dbname, "1.0", "weather_db", 1000); // open database connection
        db.transaction(function (tx) {
            populateCity(tx, id, city); // call the populateCity function , to store or create the table if doesn't exist
        }, errorCB, successCB);
    }
    catch (err) {
        alert("Error processing SQL: " + err);
    }
}

function populateCity(tx, id, city) {
     if (id == 1) {
        tx.executeSql('DROP TABLE IF EXISTS City_TB'); // drop table if exist
        tx.executeSql('CREATE TABLE IF NOT EXISTS City_TB (city)'); // create table City_TB if doesn't exist
     }
    tx.executeSql('INSERT INTO City_TB (city) VALUES ("' + city +'")'); // if table exist, store city
}

function errorCB(error) {   // an error occurred while opening the database connection or store the data to the db
    alert("error populating db" + error.message);
}

function successCB() { // opening database and storing the data successfully

}

function CityDelete(city) {
    try {
        db = window.openDatabase(dbname, "1.0", "weather_db", 1000); // open database connection
        db.transaction(function (tx) {
            deleteCity(tx, city); // call the deleteCity function , to delete city
        }, errorCB, successCB);
    }
    catch (err) {
        alert("Error processing SQL: " + err);
    }
}

function deleteCity(tx, city) {
    tx.executeSql("DELETE FROM City_TB WHERE city= ?", [city]); // if table exist, delete city
    $('#'+city).remove();
    swal("Good job!", "City Deleted!", "success");
}