/**
 * CourseController
 *
 * @description :: Server-side logic for managing Courses
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

    // Suscribirse no necesariamente implica que el Alumno quiero pasar a estar conectado en el juego.
    // Solo se pasara a Conectado si si se recibe el ID del alumno

    misCursos: function (req, res) {
hh


    }



        subscribirse_a_mapa_instancia: function (req, res) {

        var id_mapa_instancia       = req.param('id_mapa_instancia');
        var id_alumno         = req.param('id_alumno');

        //Registramos al alumno como conectado
        if(id_alumno){ // Si recibimos el ID del cliente, es porque el mismo desea pasar su estado a 'Conectado'

            Jugador_en_vivo.findOne({alumno:id_alumno, mapa_instancia: id_mapa_instancia}). // encontramos el ID de jugador Online que se corresponde al estudiante que envia la solicitud
                exec(function update(err,jugador_en_vivo_encontrado){

                    Jugador_en_vivo.update(    {id:jugador_en_vivo_encontrado.id}, //Jugador a actualizar
                        {conectado:'true'}).exec(function publish(err,updated){

                            Jugador_en_vivo.publishUpdate(updated[0].id,{ conectado:updated[0].conectado }); //Publicamos actualizacion a todos los sockets suscriptos a mi jugador
                        })
                });
        }

        // Suscribimos al alumno al mapa_instancia, o sea, a todos los juegadores online que formen parte del mismo (esten o no conectados)
        Jugador_en_vivo.find({mapa_instancia:id_mapa_instancia}).exec(
            function(err, lista_jugadores_mapa_instancia) {
                Jugador_en_vivo.subscribe(req.socket, lista_jugadores_mapa_instancia,['update']);
                return res.send(lista_jugadores_mapa_instancia);
            }
        );
    },

    desuscribirse_de_mapa_instancia: function (req, res) {

        var id_mapa_instancia = req.param('id_mapa_instancia');

        Jugador_en_vivo.find({mapa_instancia:'id_mapa_instancia'}).exec(

            function(err, lista_jugadores_mapa_instancia) {
                Jugador_en_vivo.unsubscribe(req.socket, lista_jugadores_mapa_instancia);
                return res.send(lista_jugadores_mapa_instancia);
            }
        );
    }


};

