/**
 * CourseController
 *
 * @description :: Server-side logic for managing Courses
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */
/*
 //Routes last sprint
     'put  /api/course/create':      'CourseController.create',
     'get  /api/course':             'CourseController.get_my_courses',
     'put  /api/course/update':      'CourseController.update',
     'delete  /api/course/destroy':  'CourseController.update'
*/


module.exports = {
/*
    create : function (req, res) {

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

            Course.create({name:courseName}).exec(function afterCreated(err,course){
                if(err){
                    res.send(err);
                    return;
                }

                // Asocio la clase nueva al usuario que lo solicito
                course.users.add(userID);
                course.save();
                res.send('Nueva clase creada correctamente');

                if (req.isSocket){
                    Course.publishCreate({id:course.id,name:course.name});
                }
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



    update : function (req, res) {

        var userID          =   req.session.passport.user;
        var courseID        =   req.param('id');
        var newCourseName   =   req.param('name');

        console.log(userID  );
        console.log(courseID );
        console.log(newCourseName);

        if(!userID){
            console.log('No existe un usuario Logueado');
            res.send('No existe un usuario Logueado');
            return;
        }

        User.findOne({id:userID, role:'professor'}).populate('courses').exec(function findCB(err,found) {
            if (err) {
                res.send(err);
                return;
            }

            if (!found.courses[0]) {
                console.log(found);
                console.log('La clase no existe, o bien no tiene permisos para modificarla');
                res.send('La clase no existe, o bien no tiene permisos para modificarla');
                return;
            }

            Course.update({id:courseID},{name:newCourseName}).exec(function afterUpdate(err,course){
                if(err){
                    res.send(err);
                    return;
                }
                res.send('Nueva clase actualizada correctamente');
                /*
                if (req.isSocket){
                    Course.publishUpdate(course.id,{name:course.name});
                }
                * /
            });



        });


    },

    delete : function (req, res) {

        var userID      =   req.session.passport.user;
        var courseID    =   req.param('id');

        if(!userID){
            console.log('No existe un usuario Logueado');
            res.send('No existe un usuario Logueado');
            return;
        }


        User.findOne({id:userID, role:'professor'}).populate('courses',{id:courseID}).exec(function findCB(err,user) {
            console.log(user);

            if(!user.courses[0]){
                console.log('No existe el archivo. Probablemente ya haya sido eliminado');
                res.send('No existe el archivo. Probablemente ya haya sido eliminado');
                return;
            }

            Course.destroy({id:courseID}).exec(function deleteCB(err){
                console.log('Curso Eliminado');
                res.send('Curso Eliminado');
            });


            if (req.isSocket){
                Course.publishDestroy({id:courseID});
            }

        });


    }

*/

};

