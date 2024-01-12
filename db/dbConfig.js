const mysql2 = require("mysql2");
require("dotenv").config();
const dbConnection = mysql2.createPool({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    connectionLimit: 10,
});
//console.log(process.env.USER);
//console.log(process.env.PASSWORD);
//console.log(process.env.DATABASE);
//console.log(process.env.JWT_SECRET);

// dbConnection.execute("SELECT  'Henok' ", (err, results) => {
//     if (err) {
//         console.error(err.message);
//     } else {
//         console.log(results);
//     }
// });

module.exports = dbConnection.promise();
