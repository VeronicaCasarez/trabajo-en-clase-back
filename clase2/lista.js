const objetos = [

    {
  
      manzanas: 3,
  
      peras: 2,
  
      carne: 1,
  
      jugos: 5,
  
      dulces: 2,
  
    },
  
    {
  
      manzanas: 1,
  
      sandias: 1,
  
      huevos: 6,
  
      jugos: 1,
  
      panes: 4,
  
    },
  
  ];

  const listaProductos = [];

objetos.forEach((objeto) => {
  Object.keys(objeto).forEach((producto) => {
    if (!listaProductos.includes(producto)) {
      listaProductos.push(producto);
    }
  });
});

//Mostrar la nueva lista por consola
console.log(listaProductos);
  

//total con reduce

let totalR = objetos.reduce((accumulator, objeto) =>
  accumulator + Object.values(objeto).reduce((acc, value) => acc + value, 0), 0);

console.log(totalR);
 


//total con forEach
let total=0;
objetos.forEach((dato) => {
  let tempotalArray = Object.values(dato);
  let temporalTotal = tempotalArray.reduce((valorActual, Acumulado) => valorActual + Acumulado);
  total = total + temporalTotal;
});

console.log(total);