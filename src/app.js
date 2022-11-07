// require all the required modules
const express = require("express");
const path = require("path");
const hbs = require("hbs");
const session = require("express-session")
const cookie=  require("cookie-parser")
const bodyp = require("body-parser")
const alert = require("alert");
const app=express();

const port = process.env.PORT || 3000;


// app.use(bodyp.urlencoded({extended:false}))
// app.use(bodyp.json())
app.use(cookie('secret'))
app.use(session({cookie:{maxAge:null}}))
app.use((req,res,next)=>{
    res.locals.message= req.session.message
    delete req.session.message
    next()
})

// making connection to the database
require("./db/conn");

// imprting collection from datebase
const Formdata = require("./models/registers");
const sessiondata = require("./models/session");

app.use(express.json());
app.use(express.urlencoded({extended:false}));
const static_path = path.join(__dirname,"../public");
const views = path.join(__dirname,"../views")
const partials = path.join(__dirname,"../partials")

// setting up view engine
app.set("view engine","hbs");
app.set("views",views)
hbs.registerPartials(partials);
app.use(express.static(static_path));

// rendering different pages
app.get("/",(req,res)=>{
    res.render("index")
});
app.get("/index",(req,res)=>{
    res.render("index")
});

app.get("/register",(req,res)=>{
    res.render("register");
})

app.get("/login",(req,res)=>{
    res.render("login");
})

// mailer
app.get("/counsler",(req,res)=>{
    res.render("counsler");
    
})

app.get("/device",async(req,res)=>{

    const data=await sessiondata.find(); 
    let context={
        data:data
    }
    res.render("device",context);
    
})

// booking session by user
app.post("/device",async(req,res)=>{
    const repo=req.body.sessionbtn;
    try {
        var myquery={No:repo}
        const ac = await sessiondata.findOne({No:repo});
        acc=ac.book;
        
        var newdata={$set:{book:"Booked"}}
      const update= await sessiondata.updateOne(myquery,newdata,function(err,res){
        if(err) throw err;
        console.log("document updated")

      })
      
    } catch (error) {
       
    }
    const data=await sessiondata.find(); 
    let context={
        data:data
    }
    res.render("device",context);
   
})


// taking data from the registration form by user
app.post("/register",async(req,res)=>{
    try{
        const passward = req.body.passward;
        const cpassward = req.body.confirmpassward;
        
        if(passward ===cpassward){
            // making a new entry for collection Formdata
            const NewForm = new Formdata({
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                email: req.body.email,
                gender: req.body.gender,
                phone: req.body.phone,
                age: req.body.age,
                passward: req.body.passward,
                confirmpassward: req.body.confirmpassward
            
            })
            // inserting entry to collection
            const registed = await NewForm.save();
            res.status(201).render("index");
        }
        else{
            // res.send("passward are not matching");
            req.session.message={
                type:'danger',
                intro:'empty field! ',
                message:"passward are not matching"
               }
                res.redirect("/register");
        }
        

    }catch(error){
        // res.status(400).send(error);
        // res.send("already registered email");
        req.session.message={
            type:'danger',
            intro:'empty field! ',
            message:"already registered email"
           }
            res.redirect("/register");
    }
})

app.post("/login",async(req,res)=>{
    // sendEmail=req.body.email;

    
    try{
        
        const email = req.body.email;
        const passward = req.body.passward;
        // finding valid mail in our database which is entered by user
        const useremail = await Formdata.findOne({email:email});
        
        if(useremail.passward===passward){
            // res.status(201).render("login");
            res.redirect('/device');
        }
        else{
           req.session.message={
            type:'danger',
            intro:'empty field! ',
            message:"please enter a valid password"
           }
            res.redirect("/login");
            // res.send("password is not matching");
        }
    }
    catch(error){
        req.session.message={
            type:'danger',
            intro:'empty field! ',
            message:"please enter your registered email"
           }
            res.redirect("/login");
    }
})





app.listen(port,()=>{
    console.log(`${port}`)
})

