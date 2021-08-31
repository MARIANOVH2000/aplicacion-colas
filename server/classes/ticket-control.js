const fs = require('fs');

class Ticket {
    constructor(numero, escritorio) {
        this.numero = numero;
        this.escritorio = escritorio;
    }
}


class TicketControl {
    constructor() {
        this.ultimo = 0;
        this.hoy = new Date().getDate();
        //el arreglo para la cola de tickets
        this.tickets = [];

        this.ultimos4 = [];
        let data = require('../data/data.json');
        // console.log(data);




        if (data.hoy === this.hoy) {
            this.ultimo = data.ultimo;
            this.tickets = data.tickets;
            this.ultimos4 = data.ultimos4;
        } else {
            this.reiniciarConteo();
        }
    }
    siguiente() {
        this.ultimo += 1;

        let ticket = new Ticket(this.ultimo, null);
        this.tickets.push(ticket);
        this.grabarArchivo();
        return `Ticket ${this.ultimo}`;
    }
    getUltimoTicket() {
        return `Ticket ${this.ultimo}`;
    }
    getUltimos4() {
        return this.ultimos4;
    }
    atenderTicket(escritorio) {
        //verificar si hay tickets pendientes para atender
        if (this.tickets.length === 0) {
            return 'NO hay TICKETS';
        }
        let numeroTicket = this.tickets[0].numero;
        //elimino la primera posicions del arreglo
        this.tickets.shift();
        //creo un  nuevo ticket con el escritorio al que va a ser atendido
        let atenderTicket = new Ticket(numeroTicket, escritorio);
        //agregar al inicio de arreglo
        this.ultimos4.unshift(atenderTicket);
        //verificar que hayan solo 4 tickets en el arreeglo
        if (this.ultimos4.length > 4) {
            this.ultimos4.splice(-1, 1) //borrar el ultimo elemento
        }
        console.log('Ultimos 4');
        console.log(this.ultimos4);
        this.grabarArchivo();
        return atenderTicket;
    }

    reiniciarConteo() {
        this.ultimo = 0;
        //reiniciar el conteo de tickets
        this.tickets = [];
        this.ultimos4 = [];

        console.log('se a inicializado el sistema');
        this.grabarArchivo();
    }
    grabarArchivo() {
        let jsonData = {
            ultimo: this.ultimo,
            hoy: this.hoy,
            //grabar tickets pendientes
            tickets: this.tickets,
            ultimos4: this.ultimos4
        }
        let jsonDataString = JSON.stringify(jsonData);
        fs.writeFileSync('./server/data/data.json', jsonDataString);
        // console.log('se a inicializado el sistema');
    }


}



module.exports = {
    TicketControl
}