const db = require("../.././models");
const router = require("express").Router();
const NewsAPI = require('newsapi');
const newsapi = new NewsAPI('bbbe5e03f1b34fdfbe7823f7a7e6e3df');

router.get("/api/sources", (req, res) => {

    newsapi.v2.sources({
        language: 'en',
        country: ''
    }).then(response => {


        var result = {};

        for (var i = 0; i < response.sources.length; i++) {

            result = {}
            result.sourceid = response.sources[i].id
            result.name = response.sources[i].name
            result.description = response.sources[i].description
            result.url = response.sources[i].url
            result.category = response.sources[i].category
            result.language = response.sources[i].language
            result.country = response.sources[i].country
            result.credtotal = 0;
            result.inttotal = 0;
            result.acctotal = 0;
            result.totalusers = 0;
            db.Source.create(result)
                .then(function (dbSource) {
                })
                .catch(function (err) {
                    return res.json(err);
                });
        }
        res.json(response)

    }).catch(function (err) {
        return res.json(err);
    });
});

router.post("/api/srating/", (req, res) => {
    console.log("req:"+req);
    db.Source.find({ sourceid: req.body.sourceid }).then(dbsource => {
        var source = []
        console.log("dbsource: "+dbsource.length);
        if (dbsource.length !== 0) {
           
            source.credtotal = dbsource.credtotal + parseInt(req.body.credtotal);
            console.log("source credtotal: "+source.credtotal)
        
            source.inttotal = dbsource.inttotal + req.body.inttotal;
            source.acctotal = dbsource.acctotal + req.body.acctotal;
            source.totalusers = parseInt(dbsource.totalusers + 1);
            console.log(source)
        }
        db.Source.findByIdAndUpdate(dbsource._id, source).then(result => {
            res.json("Source Rating Updated");
        }).catch(err => {
            res.json(err);
        })

    })


});

module.exports = router;