const express = require("express");
const app = express();
const fs = require("fs");

const data = new Date();
let hours = data.getHours();
let minutes = data.getMinutes();
let seconds = data.getSeconds();
let session = "AM";
if (hours >= 12) {
  hours = hours - 12;
  session = "PM";
}
//Ternary operator condition ? true : false
hours = hours < 10 ? "0" + hours : hours;
minutes = minutes < 10 ? "0" + minutes : minutes;
seconds = seconds < 10 ? "0" + seconds : seconds;
let timeIs = hours + ":" + minutes + ":" + seconds + session;

app.get("/create", (req, res) => {
  fs.writeFile(`./Files/${timeIs}.txt`, `${timeIs}`, (err) => {
    if (err) {
      console.log("err");
    }
    console.log("======== File is created ============ ");
  });
  res.send("Its working");
});

app.get("/data", (req, res) => {
  fs.readdir("Files", (err, files) => {
    // console.log(files);
    console.log("=========== All the File Names =========");
    if (err) {
      console.log(err);
    }
    files.forEach((file) => {
      fs.readFile(`Files/${file}`, "utf-8", (err, data) => {
        if (err) {
          console.log(err);
        }
        console.log("File Name: ", data + ".txt");
      });
    });
  });
});

app.listen(4000, () => console.log("server is on 4000"));
