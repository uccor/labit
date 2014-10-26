/**
 * Created by martin on 24/10/14.
 */


module.exports = function filterByUser(req, res, next) {


    var userID = req.session.passport.user;

    if(!userID){
        console.log('No existe un usuario Logueado');
        res.send('No existe un usuario Logueado');
        return;
    }

    if(req.method != "GET") {

        User.findOne({id:userID}).exec(function findCB(err,user) {
            //Si es un profesor, authorizar request
            if(user.role == "student"){
                console.log('No tiene permisos para realizar esta accion');
                res.send('No tiene permisos para realizar esta accion');

                return res.redirect('/notAllowed');
            }
            else{
                return next();
            }
        })
    }
    else{
        return next();
    }




}