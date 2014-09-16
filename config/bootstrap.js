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

	var pdfs = [{id:'abc123',nombre:'pdf1_example',ruta:'../assets/pdf/pdf1'}];
	
	// This callback is run after all of our Users are created.
	// It takes the returned User and stores it in our storeUsers array for later.
	var afterPdf = function(err,newUsers){
	  return cb()
	};
	
	Pdf.create(pdfs).exec(afterPdf);

  sails.services.passport.loadStrategies();


};
