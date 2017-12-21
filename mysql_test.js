//连接数据库
var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database:'university'
});

connection.connect();
//查询
connection.query('SELECT * from student', function(err, rows, fields) {
    if (err) throw err;
    // console.log('The solution is: ', rows[0].solution);
    for(var row in rows){
        console.log(rows[row]);
    }
    // console.log('查询结果为: ', rows);
});
//关闭连接
connection.end();