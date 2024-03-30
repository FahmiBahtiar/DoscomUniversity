const express = require("express");
const app = express();
const port = 3000;
const router = express.Router()
// const morgan = require("morgan")
// // app.use(morgan('dev'));

// const logger = (req,res,next)=>{
//     const currentTime = new Date().toLocaleString(); // Mengambil waktu saat ini
//     console.log(`[${currentTime}] endpoint: ${req.method} ${req.url}`);
//     next();
// }
// app.use(logger);
const logger = (req, res, next) => {
    const currentTime = new Date().toLocaleString();
    console.log(`[${currentTime}] endpoint: ${req.method} ${req.url}`);
    
    // Mencetak IP Address pengguna
    console.log(`[${currentTime}] IP Address: ${req.ip}`);

    res.on('finish', () => {
        console.log(`[${currentTime}] Respons: ${res.statusCode}`);
    });

    next();
}

app.use(logger);

router.get('/', (req,res,next)=>{
    console.log('Time: ', Date.now())
    next();
})

router.get("/bird", (req, res) => {
    res.send("Hello bird");
  });
router.get("/orders", (req, res) => {
    res.json([
      {
        id: 1,
        paid: false,
        username:"black",
        user_id: 1,
      },
      {
        id: 2,
        paid: false,
        user_id: 1,
      },
    ]);
})

app.use('/', router);
app.listen(port, () => {
  console.log("Server nyala di port " + port);
});
