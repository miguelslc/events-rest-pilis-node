exports.validNewEventsTest = [{
    title: "Evento Destacado para prueba",
    description: "Esto es un evento destacado para la prueba de integracios",
    eventDate: "2022-12-12",
    place: "En plena avenida Rivadavia",
    featured: "SI",
    imageEvent: "http://unaImagen/Con-un-evento-no-destacado",
    author: "6109ab76a321ee220050f98c",
    url: "Http://unaWebQueNoSeQueMasPoner.com",
}];

/** Arreglo de objetos con datos inválidos o faltantes*/
exports.invalidNewEventsTest = [
    {
        title: " ",
        description: "Esto es un evento destacado para la prueba de integracios",
        place: "En plena avenida Rivadavia",
        featured: "SI",
        author: "",
        url: "Http://unaWebQueNoSeQueMasPoner.com",
    }
];

/** Arreglo de objetos con datos inválidos o faltantes*/
exports.invalidLoginTest = [
    {
        email: " ",
        password: " ",
    }, {
        email: " ",
        password: "123123",
    },
    , {
        email: "asdasdasd@asjdasd",
        password: "123456",
    },
    , {
        email: "unmailprueba2@gmail.com",
        password: "123",
    },
];

/** Arreglo de objetos con datos inválidos o faltantes*/
exports.validLoginTest = [
    {
        email: "unmailprueba2@gmail.com",
        password: "123456",
    }
];