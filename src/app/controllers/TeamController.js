class TeamController{

    index(req, res){
        res.render('playergrid-v2')
    }
}


module.exports = new TeamController;