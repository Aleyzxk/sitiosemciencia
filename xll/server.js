const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const PDFDocument = require('pdfkit');

const app = express();
const PORT = 3000;
const USERS_FILE = path.join(__dirname, 'usuarios.json');

//middleware permite que se comuniquen entre si las aplicaciones
app.use(bodyParser.urlencoded({ extended: true}));
app.use(express.static(__dirname,));

//ruta para recibir formulario que recibe la solicitud y la respuesta
app.post('/registrar', (req, res) => {
    const {nombre, email, actividad, carrera} = req.body;
    const nuevoUsuario = {nombre, email, actividad, carrera};

    //leer los archivos existentes
    let usuarios = [];
    if(fs.existsSync(USERS_FILE)){
        usuarios = JSON.parse(fs.readFileSync(USERS_FILE));
    }

    //guardar nuevo usuario
    usuarios.push(nuevoUsuario);
    fs.writeFileSync(USERS_FILE, JSON.stringify(usuarios, null, 2));


    //crea el pdf
    const doc = new PDFDocument();

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'inline; filename=constancia.pdf');
    //imprime en el documentos pdf res
    doc.pipe(res);
    //imprime los datos obtenidos del formulario dentro del pdf como forma de constancia
    doc.text(`UNIVERSIDAD AUTONOMA DE BAJA CALIFORNIA`);
    doc.fontSize(20).text('Constancia Semana De Las Ciencias', {align: 'center'});
    doc.moveDown();
    doc.fontSize(14).text(`nombre: ${nombre}`);
    doc.text(`Email: ${email}`);
    doc.text(`carrera: ${carrera}`);
    doc.text(`fecha: ${new Date().toLocaleDateString()}`);
    doc.end();


    console.log('usuario registrado correctamente');

});

//iniciar servidor
app.listen(PORT, () =>{
    console.log(`servidor iniciado en http://localhost:${PORT}/index.html`);
});