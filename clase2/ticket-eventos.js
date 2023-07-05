class TicketManager{
 
    constructor(){
        this.eventos=[];
        this.id=1;
        this.precioBaseDeGanancia=2
       

    }

    getEventos(){
        console.log(this.eventos)
    }

    agregarEvento(nombre,lugar,precio,capacidad,fecha){
        const evento = {
            id: this.id++,
            nombre: nombre,
            lugar: lugar,
            precio: precio + precio * 0.15 + this.precioBaseDeGanancia,
            capacidad: capacidad,
            fecha: fecha,
            participantes:[],
        
          };
        this.eventos.push(evento)


    }

    agregarUsuario(idEvento,idUsuario){
        let verificarEvento=this.eventos.find((evento)=>evento.id==idEvento);
               
        if(verificarEvento){
            let validarUsuario=this.eventos.find((evento)=>evento.nombre===idUsuario)
            if(validarUsuario){
                verificarEvento.participantes.push(idUsuario)
                console.log(validarUsuario)

            }
        }else{
            console.log("no existe el evento")
        }
        
    }

    ponerEventoEnGira(idEvento,localidad,nuevaFecha){

        let eventoExistente= this.eventos.find((evento)=>evento.id===idEvento)
        
        if(eventoExistente){
            const eventoEnGira={
                id:this.id++,
                ...eventoExistente,
                lugar:localidad,
                fecha:nuevaFecha,
                participantes:[],

            }

            this.eventos.push(eventoEnGira)

        }

        


    }

}

const ticket1= new TicketManager();
ticket1.getEventos();
ticket1.agregarEvento("juan", "Bs As", 2000,50,"hoy")
ticket1.agregarEvento("raul","mardel",15000,60,"hoy")
ticket1.getEventos()
// debugger
ticket1.agregarUsuario(1,"juan")
ticket1.ponerEventoEnGira(1,"New York", 15000,50,"mañana")
