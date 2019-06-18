// Api Routes
var app = require("express");
var axios = require("axios");
var db = require("../models");
var cheerio = require("cheerio");

module.exports = function(app){
    app.get("/scrape", function(req, res){
        axios.get("https://www.clickhole.com/").then(function(response){
            var $ = cheerio.load(response.data);

            $(".eTpFaP").each(function(i, element){
                var result = {};

                result.title = $(this).text();
                result.link = $(this)
                    .parent("a")
                    .attr("href");

                db.Article.create(result)
                .then(function(dbArticle){
                    console.log(dbArticle);
                })
                .catch(function(err){
                    console.log(err);
                })
            });
            res.send("Site Scraped!")
        });
    });

    app.get("/articles", function(req, res){
        db.Article.find({})
            .then(function(dbArticle) {
                res.json(dbArticle)
            })
            .catch(function(err){
                res.json(err);
            });
    })

    // TODO: Route for getting specific Article (by id) to populate its comment
    // Route for getting all Articles from the db
    // app.get("/articles", function(req, res){
    //     db.Article.find({})
    //     .then(function(dbArticle){
    //         res.json(dbArticle);
    //     })
    //     .catch(function(err){
    //         console.log(err);
    //     });
    // });
    // TODO: Route for saving/updating an Article's associated Comment
}