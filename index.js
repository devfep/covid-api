const axios = require("axios");
const cheerio = require("cheerio");
const express = require("express");

const app = express();
let newsSources = [];

newsSources = [
  {
    name: "NYT - The New York Times",
    address: "https://www.nytimes.com/news-event/coronavirus",
    base: "https://www.nytimes.com",
  },
  {
    name: "Associated Press - AP News",
    address: "https://apnews.com/hub/coronavirus-pandemic",
    base: "https://apnews.com",
  },
  {
    name: "Reuters",
    address: "https://www.reuters.com/news/archive/coronavirus-full-coverage",
    base: "https://www.reuters.com",
  },
];

newsSources.forEach((newsSource) => {
  axios.get(newsSource.address).then((response) => {
    const html = response.data;
    const $ = cheerio.load(html);

    for (let i = 0; i < 20; i++) {
      $('a:contains("coronavirus")', html).each(function () {
        const title = $(this).text();
        const url = $(this).attr("href");

        articles.push({
          source: newsSource.name,
          title,
          url: newsSource.base + url,
        });
      });
    }
  });
});

const PORT = 8000;

// server setup
app.listen(PORT, () => console.log(`server running on port: ${PORT}`));

const articles = [];

app.get("/", (req, res) => res.send("Welcome to my COVID-19 News API"));

app.get("/news", (req, res) => res.json(articles));
