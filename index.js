const express= require('express');
const bodyParser= require('body-parser');
const ejs= require('ejs');
const http= require('http');
const container= require('./container');
const cookeParser= require('cookie-parser');
const validator= require('express-validator');
const session =require('express-session');
const MongoStore= require('connect-mongo')(session);
const mongoose=require('mongoose');
const flash=require('connect-flash');
const passport = require('passport');

container.resolve(function(users){
    mongoose.Promise=global.Promise;
    mongoose.connect("mongodb://localhost:27017/chatapplication", { useNewUrlParser: true,useUnifiedTopology: true });
    mongoose.set('useCreateIndex', true);
    const app= SetUpExpress();

    function SetUpExpress(){
        const app= express();
        const server= http.createServer(app);
        server.listen(3000,function(){
            console.log("Listening port 3000");
        });
        ConfigureExpress(app);
         // set up Router
     const router= require('express-promise-router')();
    users.SetRouting(router);
    app.use(router);
    }
    function ConfigureExpress(app){
      require('./passport/passport-local');

        app.use(express.static('public'));
        app.use(cookeParser());
        app.set("view engine",'ejs');
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({extended:true}));
        // app.use(validator());
        app.use(session({
            secret:'thisisascreatkey',
            resave:true,
            saveInitialized:true,
            saveUninitialized: true,
            store:new MongoStore({mongooseConnection:mongoose.connection})
         }));
         app.use(flash());
         app.use(passport.initialize());
         app.use(passport.session());
    }
});