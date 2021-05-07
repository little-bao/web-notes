//引入mysql模块
const mysql = require("mysql");
//创建连接池对象
const pool = mysql.createPool({
    host: "127.0.0.1",
    post: "3306",
    user: "root",
    password: "",
    database: "xz",
    connectionLimit: "20"
});

module.exports = pool;