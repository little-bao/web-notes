//引入express创建路由器
const express = require("express");
//引入数据库连接池对象
const pool = require("../pool.js");

//创建路由器
const router = express.Router();

// //测试路由
// router.get("/test",(req,res)=>{
//     res.send("success");
//     pool.query('select * from xz_user',(err,result)=>{
//         if(err) throw err;
//         console.log(result);
//     });
// })

//用户注册路由
router.post("/register", (req, res) => {
    let data = req.body;
    let code = 400;
    //非空验证
    for (let key in data) {
        code++;
        if (!data[key]) {
            res.send({ "code": code, "msg": key + "required !" });
            return;
        }
    }
    //执行SQL语句,进行数据的插入
    pool.query("insert into xz_user set ?", [data], (err, result) => {
        if (err) throw err;
        if (result.affectedRows !== 0) {
            res.send({ "code": 200, "msg": "register success" });
        }
    });
});

//用户登录路由
router.post("/login", (req, res) => {
    let data = req.body;
    //非空验证
    let code = 400;
    for (let key in data) {
        code++;
        if (!data[key]) {
            res.send({ "code": code, "msg": key + " required" });
            return;
        }
    }
    //执行sql命令,进行数据的查询
    pool.query("select * from xz_user where uname=? and upwd=?", [data.uname, data.upwd], (err, result) => {
        if (err) throw err;
        if (result.length > 0) {
            res.send({ "code": 200, "msg": "login success" });
        } else {
            res.send({ "code": "301", "msg": "uname or pwd is wrong" });
        }
    })
});

//用户检索
router.get("/detail", (req, res) => {
    let data = req.query;

    //非空验证
    if (!data.uid) {
        res.send({ "code": "401", "msg": "uid required" });
        return;
    }

    //执行SQL命令,进行数据的查询
    pool.query("select * from xz_user where uid=?", [data.uid], (err, result) => {
        if (err) throw err;
        if (result.length > 0) {
            res.send(result);
        } else {
            res.send({ "code": 301, "msg": "this user does not exist" });
        }
    });


});

//删除用户路由
router.get("/delete", (req, res) => {
    let data = req.query;
    if (!data.uid) {
        res.send({ "code": 401, "msg": "uid required" });
        return;
    }

    pool.query("delete from xz_user where uid=?", [data.uid], (err, result) => {
        if (err) throw err;
        if (result.affectedRows > 0) {
            res.send({ "code": 200, "msg": "delete success" });
        } else {
            res.send({ "code": 301, "msg": "delete failure" });
        }
    });
});

// 修改用户信息
router.post("/update", (req, res) => {
    let data = req.body;
    let code = 400;
    for (var key in data) {
        if (!data[key]) {
            res.send({ "code": code, "msg": key + " required" });
            return;
        }
    }
    //将性别换成数字0 或 1
    if (data.gender === "man") {
        data.gender = 1;
    } else {
        data.gender = 0;
    }
    //执行SQL命令,进行数据的更新
    pool.query("update xz_user set ? where uid=?", [data, data.uid], (err, result) => {
        if (err) throw err;
        if (result.affectedRows > 0) {
            res.send({ "code": 200, "msg": "update success" });
        } else {
            res.send({ "code": 301, "msg": "update failure" });
        }
    });
})

//用户列表
router.get("/list", (req, res) => {
    let data = req.query;
    //进行非空处理
    if(!data.pno){
        data.pno = 1;
    }else{
        data.pno = parseInt(data.pno);
    }
    if(!data.pageSize){
        data.pageSize = 5;
    }else{
        data.pageSize = parseInt(data.pageSize);
    }

    pool.query("select * from xz_user limit ?,?", [data.pno, data.pageSize], (err, result) => {
        if (err) throw err;
        if (result.length > 0) {
            console.log(result);
            res.send("success");
        }else{
            res.send("error");
        }
    });
})

//导出路由器
module.exports = router;