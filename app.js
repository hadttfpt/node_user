const mysql = require('mysql');
const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "tesst"
});
con.connect();

const express = require('express');
const app = express();

//de su dung req.body
const bodyParser = require('body-parser');
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
// create application/json parser
var jsonParser = bodyParser.json()

app.set('views', './views');
app.set('view engine', 'ejs');

app.get('/list', function(req,res){
    con.query('select * from user', function(error,results){
        if (error) throw error;
        return res.render('indx',{users:results});
    });
});

//post để lấy data từ form
app.post('/create',jsonParser, function(req,res){
    //Tại file login với input tên, địa chỉ, điện thoại có thuộc tính name
    //Để lấy các giá trị input này, ta sử dụng req.body.<input_name> tương ứng
    //Sử dụng req.body.name ; req.body.address

    // const nam = req.body.name;
    
    //Tương ứng với const name = req.body.name ;...
    
    // const user = req.body
    // const name = JSON.stringify(user.name);
    // const address = JSON.stringify(user.address);
    // const phone = JSON.stringify(user.phone);
    const q = "Insert into user (name,address,phone) values ('" + req.body.name + "', '" + req.body.address + "','" + req.body.phone +"')";
    con.query(q,function(error){
        if (error) throw error;
        return res.redirect('/list');
    });
});

//Xoa
app.get('/delete/:id',function(req,res){
    const q = "Delete from user where id = "+req.params.id+"";
    con.query(q,function(error){
        if(error) throw error;
        console.log(req.body.id);
        return res.redirect('/list');
    });
});
//Trang hien thi form sua
app.get('/edit/(:id)',function(req,res){
    const q = 'select * from user where id = '+req.params.id;
    con.query(q, function(error,results){
        if (error) throw error;
        console.log(results);
        return res.render('edit',{
            id:results[0].id,
            name: results[0].name,
            address: results[0].address,
            phone: results[0].phone
        });
    });
});
//Sua
app.post('/edit/:id',function(req,res){
    const q = "Update user set name = '"+req.body.name+"',address='"+req.body.address +"',phone='"+req.body.phone +"' where id = "+req.body.id;
    con.query(q,function(error){
        if(error) throw error;
        return res.redirect('/list');
    });
});
app.listen(89)
// show tên username bằng params 
// router.get('/user/:username',function(req,res,next){
//     const username = req.params.username;
//     res.send(username);
// });
