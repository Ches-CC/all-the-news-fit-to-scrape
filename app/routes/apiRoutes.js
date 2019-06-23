// Api Routes
var app = require("express");
var axios = require("axios");
var db = require("../models");
var cheerio = require("cheerio");

module.exports = function(app) {
  app.get("/scrape", function(req, res) {
    axios.get("https://getbusylivingblog.com/").then(function(response) {
      var $ = cheerio.load(response.data);

      $("article").each(function(i, element) {
        var result = {};

        result.title = $(this)
            .find(".entry-title-link")
            .text();

        result.summary = $(this)
          .find(".entry-content")
          .children("p")
          .text();

        result.link = $(this)
          .find("a")
          .attr("href");

        db.Article.create(result)
          .then(function(dbArticle) {
            console.log(dbArticle);
          })
          .catch(function(err) {
            console.log(err);
          });
      });
      res.send("Site Scraped!");
      console.log("Site done been scraped!");
    });
  });

  // Route for getting all Articles from the db
  app.get("/articles", function(req, res) {
    db.Article.find({})
      .then(function(dbArticle) {
        res.json(dbArticle);
      })
      .catch(function(err) {
        res.json(err);
      });
  });

  // TODO: Route for getting specific Article (by id) to populate its comment
  app.get("/articles/:id", function(req, res) {
    db.Article.findOne({ _id: req.params.id })
      .populate("comment")
      .then(function(dbArticle) {
        res.json(dbArticle);
      })
      .catch(function(err) {
        res.json(err);
      });
  });
  // TODO: Route for saving/updating an Article's associated Comment
  app.post("/articles/:id", function(req, res) {
    db.Comment.create(req.body)
      .then(function(dbComment) {
        return db.Article.findOneAndUpdate(
          { _id: req.params.id },
          { comment: dbComment._id },
          { new: true }
        );
      })
      .then(function(dbArticle) {
        res.json(dbArticle);
      })
      .catch(function(err) {
        res.json(err);
      });
  });
};
