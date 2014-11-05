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

    if(req.method == 'GET'){
        return next();
    }

    if (req.options.action == 'create') {
        /*
        User.findOne({id:userID}).populate('courses').exec(function findCB(err,user) {
            //Si es un profesor, continuar
            if(user.role == "student"){
                console.log('No tiene permisos para realizar esta acción');
                return res.redirect('/notAllowed');
            }
            else{
                req.body.users =  [
                    {id: userID}
                ];
                return next();
            }
        })
        */
        req.body.users =  [
            {id: userID}
        ];
        return next();
    }

    if(req.options.action == 'destroy' || req.options.action == 'update') {
        var courseID = req.param('id');

        User.findOne({id:userID}).populate('courses').exec(function findCB(err,user) {
            //Si es un profesor, continuar
            if(user.role == "student"){
                console.log('No tiene permisos para realizar esta acción');
                return res.redirect('/notAllowed');
            }

            //Si el curso pertenece a este profesor, authorizar request
            while (user.courses.length) {
                if(user.courses.pop().id == courseID){
                    return next();
                }
            }
            console.log('No tiene permisos para realizar esta acción');
            return res.redirect('/notAllowed');
        })
    }
    else{
        return res.redirect('/notAllowed');
    }
}