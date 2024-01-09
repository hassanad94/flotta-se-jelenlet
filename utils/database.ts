import mysql from "mysql2";

export const db = mysql
  .createPool({
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || "23306"),
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
  })
  .promise();
