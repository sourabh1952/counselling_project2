const express = require("express");
const path = require("path");
const nodemailer = require("nodemailer");
const app=express();
const port = process.env.PORT || 3000;

let sendEmail="";

require("./db/conn");

const Formdata = require("./models/registers");

app.use(express.json());
app.use(express.urlencoded({extended:false}));

const static_path = path.join(__dirname,"../public");
const views = path.join(__dirname,"../views")

app.set("view engine","hbs");
app.set("views",views)
app.use(express.static(static_path));

app.get("/",(req,res)=>{
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

app.get("/counsle",(req,res)=>{
    

const mail = async()=>{
    let testaccount =  await nodemailer.createTestAccount();

    const config = nodemailer.createTransport({
        host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: "notatworth@gmail.com", // generated ethereal user
      pass: "dgntcxpimzmxhuiw", 
    },
    });

    const sendmailnow = await config.sendMail({
        from: "notatworth@gmail.com", // sender address
        to: sendEmail, // list of receivers
        subject: "Hello ✔", // Subject line
        text: "Hello", // plain text body
        html: "<b>Hello world? my name is sourabh</b>", // html body
      });

      console.log("Message sent: %s");
};

mail().catch((e)=>console.log(`error is ${e}`));
    
})

app.post("/register",async(req,res)=>{
    try{
        const passward = req.body.passward;
        const cpassward = req.body.confirmpassward;
        if(passward ===cpassward){
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
            const registed = await NewForm.save();
            res.status(201).render("index");
        }
        else{
            res.send("passward are not matching");
        }
        

    }catch(error){
        res.status(400).send(error);
    }
})

app.post("/login",async(req,res)=>{
    sendEmail=req.body.email;
    
    try{
        const email = req.body.email;
        const passward = req.body.passward;

        const useremail = await Formdata.findOne({email:email});
        
        if(useremail.passward===passward){
            res.status(201).render("counsler");
        }
        else{
            res.send("password is not matching");
        }
    }
    catch(error){
        res.status(400).send(`${error}`);
    }
})

app.listen(port,()=>{
    console.log(`${port}`)
})