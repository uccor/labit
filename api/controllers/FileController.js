/**
 * FileController
 *
 * @description :: Server-side logic for managing files
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

    upload: function (req, res) {
        if (req.method === 'GET')
            return res.json({'status': 'GET not allowed'});                       // Call to /upload via GET is error

        var uploadFile = req.file('uploadFile');
        //console.log(uploadFile);

        uploadFile.upload({

            dirname: '../../assets/pdf'
            //adapter: require('skipper-gridfs'),                                       //Para subir a una base de datos necesita configuracion adicional
            //uri: 'mongodb://[username:password@]host1[:port1][/[database[.bucket]]'
            //e.g. mongodb://jimmy@j1mtr0n1xx@mongo.jimmy.com:27017/coolapp.avatar_uploads
        }, function onUploadComplete(err, files) {                // Files will be uploaded to .tmp/uploads
            console.log(err);

            if (err) return res.serverError(err);                              // IF ERROR Return and send 500 error with error
            var name = files[0].fd.split('\\');
            //console.log(name[name.length-1]);
            //console.log(req.body);
            Pdf.create({id: name[name.length-1].toLowerCase().replace(".pdf",""), nombre: req.body.nombreArchivo, ruta: '/pdf/' + name[name.length - 1], course: req.body.courseId}).exec(function (err, ans) {

            });
            //console.log(files);
           //res.json({status: 200, file: files});
            res.redirect('/professorManager#/fileShare');
        });
    }
};

