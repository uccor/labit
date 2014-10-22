/**
 * CourseController
 *
 * @description :: Server-side logic for managing Courses
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */
/*
    Routes:
        'post /api/newCourse':  'CourseController.create_course',
        'get  /api/myCourses':  'CourseController.get_my_courses',
        'put  /api/editCourse': 'CourseController.set_my_course'
*/


module.exports = {

    create_course : function (req, res) {

        var courseName  =   req.param('name');
        var userID      =   req.session.passport.user;

        if(!userID){
            console.log('No existe un usuario Logueado');
            res.send('No existe un usuario Logueado');
            return;
        }

        User.findOne({id:userID, role:'professor'}).populate('courses',{name:courseName}).exec(function findCB(err,found){
            if(err){
                res.send(err);
                return;
            }
            if(found.courses[0]){
                console.log('La clase ya existe, o bien no tiene permisos para crearla');
                res.send('La clase ya existe, o bien no tiene permisos para crearla');
                return;
            }

            Course.create({name:courseName}).exec(function afterCreated(err,createdCourse){
                if(err){
                    res.send(err);
                    return;
                }

                // Asocio la clase nueva al usuario que lo solicito
                createdCourse.users.add(userID);
                createdCourse.save();
                res.send('Nueva clase creada correctamente');
            });
        });
    },

    get_my_courses : function (req, res) {

        var userID      =   req.session.passport.user;

        if(!userID){
            console.log('No existe un usuario Logueado');
            res.send('No existe un usuario Logueado');
            return;
        }


        User.findOne({id:userID}).populate('courses').exec(function findCB(err,found) {

            var userCourses = [];

            while (found.courses.length){
                userCourses.push(found.courses.pop());
            }

            //console.log(userCourses);
            res.send(userCourses);
        });
    },



    set_my_course : function (req, res) {
    /*

        var userID = req.session.passport.user;

        if (!userID) {
            console.log('No existe un usuario Logueado');
            res.send('No existe un usuario Logueado');
            return;
        }


        Co.update({name: 'Walter Jr'}, {name: 'Flynn'}).exec(function afterwards(err, updated) {

            if (err) {
                // handle error here- e.g. `res.serverError(err);`
                return;
            }

            console.log('Updated user to have name ' + updated[0].name);

        });*/
    }


};

