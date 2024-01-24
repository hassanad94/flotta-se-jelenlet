import mysql from "mysql2";


export const pool = mysql
  .createPool({
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || "23306"),
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
  })

export const testconnection = mysql.createConnection({
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || "23306"),
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
  });


export const db = pool.promise();
 



