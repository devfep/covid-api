const axios = require("axios");
const cheerio = require("cheerio");
const express = require("express");

const app = express();

const PORT = 8000;

// server setup
app.listen(PORT, () => console.log(`server running on port: ${PORT}`));
