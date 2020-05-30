// init modules
const express = require("express");
const fetch = require("node-fetch");
require("dotenv").config();
// console.log(process.env);
const app = express();
app.use(express.static("public"));
app.use(express.json());
app.post("/api", async (req, res) => {
  //   console.log(req.body);
  let data = req.body;
  let apiKey = process.env.API_KEY;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${data.place}&units=Metric&appid=${apiKey}`;
  //   const url = `https://api.openweathermap.org/data/2.5/weather?lat=${data.lat}&lon=${data.log}&units=Metric&appid=`;
  const response = await fetch(url);
  const urlData = await response.json();
  res.json(urlData);
});
const PORT = process.env.PORT || 3000;
// listening port
app.listen(PORT, () => console.log(`listening to port ${PORT}`));
