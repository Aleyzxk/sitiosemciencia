const backgroundimage = [
    './img/img-fondo/img-fondo6.jpg',
    './img/img-fondo/img-fondo5.jpg',
    './img/img-fondo/img-fondo4.jpg',
    './img/img-fondo/img-fondo3.jpg',
    './img/img-fondo/img-fondo2.jpg',
    './img/img-fondo/img-fondo1.jpg',
];

let indice = 0;

function cambiarfondo(){
    document.body.style.backgroundImage = `url('${backgroundimage[indice]}')`;
    indice = (indice + 1)%backgroundimage.length;
}

cambiarfondo();
setInterval(cambiarfondo, 5000);