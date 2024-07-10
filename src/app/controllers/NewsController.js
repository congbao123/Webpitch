

class NewsController {
    //GET
    new(req, res) {
        res.render('news');
    }

    //GET
    show(req, res){
          res.send("BAO DAI CA");
    }
}
module.exports = new NewsController;