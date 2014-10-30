/**
 * Bootstrap
 * (sails.config.bootstrap)
 *
 * An asynchronous bootstrap function that runs before your Sails app gets lifted.
 * This gives you an opportunity to set up your data model, run jobs, or perform some special logic.
 *
 * For more information on bootstrapping your app, check out:
 * http://sailsjs.org/#/documentation/reference/sails.config/sails.config.bootstrap.html
 */

module.exports.bootstrap = function (cb) {

    // This callback is run after all of our Users are created.
    // It takes the returned User and stores it in our storeUsers array for later.
    var afterPdf = function (err, newUsers) {
        return 1;
    };


    sails.services.passport.loadStrategies();

    Pdf.find({id: 'PDF1'}).exec(function (err, pdf) {
        if (pdf.length > 0) {
            return
        }
        Pdf.create([

            {id: 'PDF1', nombre: 'pdf1_example', ruta: '/pdf/pdf1.pdf'},
            {id: 'PDF2', nombre: 'pdf2_example', ruta: '/pdf/pdf2.pdf'},
            {id: 'PDF3', nombre: 'pdf3_example', ruta: '/pdf/pdf3.pdf'},
            {id: '4', nombre: 'DerechoPenal', ruta: '/pdf/DerechoPenal.pdf'},
            {id: '5', nombre: 'Scrum', ruta: '/pdf/Scrum.pdf'}
        ]).exec(afterPdf);


        Live_class_student.create([
            {  id: 'CLASS1', pdf_sharing: 'false',
                pdf_synchronize: false,
                pdf_allowNavigation: false,
                pdf_url: '',
                pdf_studentPageNumber: 0,
                pdf_screenPageNumber: 0
            },
            {  id: 'CLASS2', pdf_sharing: 'false',
                pdf_synchronize: false,
                pdf_allowNavigation: false,
                pdf_url: '',
                pdf_studentPageNumber: 0,
                pdf_screenPageNumber: 0
            }
        ]).exec(afterPdf);
    });
    Course.create([{name: 'Biologia'},{name: 'Derecho Penal'}]).exec(function (){});
    cb();
};
