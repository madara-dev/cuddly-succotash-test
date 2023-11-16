const express = require('express')
const app = express()
const port = 5000;
const { globalModel,globaldatareturner } = require('./mongoose/mongo')
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser')
const urlencodedParser = bodyParser.urlencoded({ extended: false })
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
const io = require('socket.io')(3001,{
  cors: {
  origin: [
    'http://localhost:3000',
    'https://4ffd-103-218-237-16.ngrok-free.app',
    'https://kit.fontawesome.com/6395210d76.js',
    "mystic.ap-1.evennode.com",
"103.252.165.84"
  ],
  methods: ["GET", "POST"],
  credentials: true
}
})
const cors = require('cors');

io.on('connection',async socket=>{
  socket.on('clicked', async (arg)=>{
    let globaldata = await globalModel.findById('644129b8be2fb73873901ef6').exec()
    await globalModel.updateOne({_id:"644129b8be2fb73873901ef6"}, {clicks:globaldata.clicks + arg.globolclicks  })
  } )
  

  // console.log(await totalclickssaver());

  while (true) {
    await sleep(1000)
    io.emit('send-message',await globaldatareturner())
    
    await sleep(6000)

    io.emit('send-message',await globaldatareturner())
   
  }


})











app.set("trust proxy", 1);



const routes = require('./rts');
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', req.headers.origin);
  // res.render("Access-Control-Allow-Private-Network", "true");
  // res.render('Access-Control-Allow-Credentials', 'true')
  res.header("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept");

  next();
});

app.use(
  cors({
    origin: [
      'http://localhost:3000',
      "https://4ffd-103-218-237-16.ngrok-free.app",
      'http://localhost:3001',
      'mystic.ap-1.evennode.com',
"103.252.165.84:3000",
"103.252.165.84"

    ],
    credentials: true
  }));




app.use(urlencodedParser)
app.use(cookieParser());

























  // io.on("clicked", async (arg) => {
  //   // let userdata = await globalModel.findById('644129b8be2fb73873901ef6').exec()
  //   await globalModel.updateOne({ _id: '644129b8be2fb73873901ef6' }, { clicks: arg })
  // })











app.use(routes)
app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})