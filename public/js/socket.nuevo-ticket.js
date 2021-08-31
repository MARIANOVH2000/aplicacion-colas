//const { io } = require("../../server/server");
var label = $('#lblNuevoTicket');
//comando para establecer la conexion
var socket = io();
socket.on('connect', function() {
    console.log('Conectado al Servidor');
});
socket.on('disconnect', function() {
    console.log('Desconectado del servidor');
});
socket.on('estadoActual', function(resp) {
    console.log(resp);
    label.text(resp.actual);

});
$('button').on('click', function() {
    socket.emit('siguienteTicket', null, function(siguienteTicket) {
        label.text(siguienteTicket);
    });
});