

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
        to: "sourabh19052003@gmail.com", // list of receivers
        subject: "Hello ✔", // Subject line
        text: "Hello", // plain text body
        html: "<b>Hello world?</b>", // html body
      });

      console.log("Message sent: %s");
};

mail().catch((e)=>console.log(`error is ${e}`));