//const { io } = require("../../server/server");

//comando para establecer la conexion
var socket = io();
socket.on('connect', function() {
    console.log('Conectado al Servidor');
});
socket.on('disconnect', function() {
    console.log('Desconectado del servidor');
});
var searchParams = new URLSearchParams(window.location.search);
//sino viene en la url la palabara escritorio con el numero 
if (!searchParams.has('escritorio')) {
    //regresar al index
    window.location = 'index.html';
    throw new Error('El escritorio es necesario');
};
var label = $('small');
var escritorio = searchParams.get('escritorio');
console.log(escritorio);
$('h1').text('Escritorio ' + escritorio);
$('button').on('click', function() {
    socket.emit('atenderTicket', { escritorio: escritorio },
        function(resp) {
            console.log(resp);
            if (resp.numero === undefined) {
                label.text('NO hay Tickets');
            } else {
                label.text(`Atendiendo a TICKET ${resp.numero}`);
            }

        });

});