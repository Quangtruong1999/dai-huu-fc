class TeamController{

    index(req, res){
        res.render('playergrid-v1')
    }
}


module.exports = new TeamController;