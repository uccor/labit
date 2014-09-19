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
	var afterPdf = function(err,newUsers){
	  return 1
	};

	Pdf.create([{id:'AB344',nombre:'pdf1_example',ruta:'../assets/pdf/pdf1'}]).exec(afterPdf);
    Pdf.create([{id:'DKH73',nombre:'pdf2_example',ruta:'../assets/pdf/pdf2'}]).exec(afterPdf);
    Pdf.create([{id:'WSDH8',nombre:'pdf2_example',ruta:'../assets/pdf/pdf3'}]).exec(afterPdf);
    Pdf.create([{id:'K3883',nombre:'pdf3_example',ruta:'../assets/pdf/pdf4'}]).exec(afterPdf);
    Pdf.create([{id:'ADKGK',nombre:'pdf4_example',ruta:'../assets/pdf/pdf5'}]).exec(afterPdf);

    sails.services.passport.loadStrategies();

   cb();
};
