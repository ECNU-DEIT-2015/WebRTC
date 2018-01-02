import { connect } from 'tls';

//连接数据库
var mysql = require('mysql');
// var connection = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: 'root',
//     database:'university'
// });
var connection = mysql.createConnection({
    host: 'www.muedu.org',
    user: 'deit-2015',
    password: 'deit@2015!',
    database:'project_2015_5'
});


connection.connect();
//查询
// var querysql = "select password from user where email='nongxiaolang@foxmail.com'";
// var querysql = 'SELECT * from student';
// var querysql = "select * from personal_file where email='nongxiaolang@foxmail.com'";
// connection.query(querysql, function(err, rows, fields) {
// // connection.query('SELECT 1 + 1 AS solution', function(err, rows, fields) {    
//     if (err) throw err;
//     console.log(rows.length);
//     console.log('The solution is: ', rows[0].solution);
//     // for(var row in rows){
//     //     console.log(rows[row]);
//     // }
//     // console.log('fields',fields);
//     // console.log('rows',rows);
//     // console.log('查询结果为: ', rows);

//     for(var i=0; i<rows.length; i++){
//         console.log(rows[i].toString());
//     }
// });
var headline = row['headline'];
            var introduction = row['introduction'];
            var labels = row['labels'];
            bin_file_id = row['personal_file_id'];

var querysql = "insert into bin_file(bin_file_id,email,image,headline,introduction,labels) value(?,?,?,?,?,?)";
connection.query(querysql,[bin_file_id,email,image,headline,introduction,labels], function(err, result){
    if(err){
        console.log("insert failed");
    }else{
        console.log("success");
    }
});
//关闭连接
connection.end();