/**
* Pdf.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
  	
  	id: {
		  type: 'string',
		  required: true,
		  unique: true,
		  primaryKey : true
    },
    
    nombre: {
	      type: 'string',
	      required: true
    },
    
    
    ruta: {
	      type: 'string',
	      required: true
    },

      //Atributos ultimo sprint
    live_class_student: {
          model:'live_class_student'
    },

    course: {
        model: 'course'
    }


  }
};

