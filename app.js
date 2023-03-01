const { MONGOURI } = require("./config/keys");
const path = require("path");
const arr = [];
const mongoose = require("mongoose");
mongoose
  .connect(MONGOURI)
  .then((resp) => console.log(" connections successful"))
  .catch((err) => console.log("connection failed "));
//  last is the database name and below I have mentioned colection name which is cart

// mongoose
//   .connect("https://emart-mks0.onrender.com")
//   .then((resp) => console.log(" connections successful"))
//   .catch((err) => console.log("connection failed "));

// ls8IAzyvrl2OHSvb
// mongoose.connect("mongodb://0.0.0.0:27017/cartDB");
const cartSchema = new mongoose.Schema({ mail: String, password: String });
const Cart = mongoose.model("Cart", cartSchema);
// const cors = require("cors");

const express = require("express");
const app = express();
// const body-parser = require("body-parser") ;
const bodyParser = require("body-parser");
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
const port = process.env.PORT || 5000;

// app.post("/login", (res, res) => {
//   console.log("hi");
// });
// app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "./client/build")));

// if (process.env.NODE_ENV == "production") {

console.log(path.join(__dirname, "./client/index.html"));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
});
// }

app.post("/login", (req, res) => {
  const mail = req.body.mail;
  const pswd = req.body.password;
  console.log(mail, pswd);
  Cart.findOne({ mail: mail, password: pswd }).then((resp) => {
    if (resp) {
      console.log("user exist");
      res.status(200).send({ key: 1 });
      return;
    } else {
      console.log("user not exist");
      res.send({ key: 0 });
      return;
    }
  });
  // Cart.findOne({ mail: mail, password: pswd }, function (req, resp) {
  //   if (resp) {
  //     console.log("user exist");
  //     res.status(200).send({ key: 1 });
  //     return;
  //   } else {
  //     console.log("user not exist");
  //     res.send({ key: 0 });
  //     return;
  //   }
  // });
});
app.post("/signup", function (req, res) {
  console.log(" server side ");
  const mail = req.body.mail;
  console.log(mail);
  const password = req.body.password;
  // const result = Cart.findOne({ mail: mail });
  console.log(" in signup ", mail, password);

  Cart.findOne({ mail: mail }).then((resp) => {
    if (resp) {
      console.log(resp);
      res.send({ key: 1 });
      return;
    } else {
      const entry = new Cart({ mail: mail, password: password });
      entry.save();
      res.send({ key: 0 });
      console.log("The cart is", Cart);
      return;
    }
  });

  // Cart.findOne({ mail: mail }, function (reqst, resp) {
  //   if (resp) {
  //     console.log(resp);
  //     res.send({ key: 1 });
  //     return;
  //   } else {
  //     const entry = new Cart({ mail: mail, password: password });
  //     entry.save();
  //     res.send({ key: 0 });
  //     console.log("The cart is", Cart);
  //     return;
  //   }
  // });

  // console.log("The result of searching is ", result);
  // if (result) {
  //   res.status(404).send("User already exist");
  //   return;
  // } else {
  //   const entry = new Cart({ mail: mail, password: password });
  //   entry.save();
  //   res.status(200).send("new entry made ");
  //   console.log("The cart is", Cart);
  //   return;
  // }
  // Cart.findOne({ mail: mail }, function (req, response) {
  //   if (response) {
  //     res.status(404).send("User already exist");
  //     return;
  //   }
  // });
  // res.send(Cart);
  // const mail = req.body.mail;
  // const pswd = req.body.password;
  // console.log(mail + "-" + pswd);
  // Cart.findOne({ mail: mail }, function (req, response) {
  //   if (response) {
  //     res.status(404).send("User already exist");
  //   } else {
  //     const entry = new Cart({ mail: mail, password: passsword });
  //     entry.save();
  //     res.status(200).send("success");

  //     // Cart.insert(
  //     //   {
  //     //     mail: mail,
  //     //     password: pswd,
  //     //   },
  //     //   function (req, response) {
  //     //     if (response) {
  //     //       res.status(200).send("User successful signUp ");
  //     //     } else {
  //     //       res.status(422).send("Technical Error ");
  //     //     }
  //     //   }
  //     // );
  //   }
  // });
});

app.listen(port, () => console.log(" server started on port ", port));
