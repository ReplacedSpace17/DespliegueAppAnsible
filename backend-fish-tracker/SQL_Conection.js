const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Javier1234567890$',
    database: 'dinamic_poblational_fish'
});

connection.connect((error) => {
    if (error) {
        console.error('Error al conectar a la base de datos:', error);
    } else {
        console.log('Conexión exitosa a la base de datos');
    }
});

module.exports = connection;

/*
  host: '127.0.0.1',
    user: 'root',
    password: 'Javier1234567890$',
    database: 'ejemplo'
    */


/*
CREATE DATABASE dinamic_poblational_fish;

USE dinamic_poblational_fish;

CREATE TABLE `RegistrosSimulaciones` (
 `ID` INT NOT NULL AUTO_INCREMENT,
 `Especie` VARCHAR(50),
 `Generacion` INT,
 `Poblacion` INT,
 `Media` DOUBLE,
 `DesvEst` DOUBLE,
 `Mediana` DOUBLE,
 `PoblacionMinima` DOUBLE,
 `PoblacionMaxima` DOUBLE,
 PRIMARY KEY (`ID`)
);

CREATE TABLE `Usuarios` (
	`ID` INT NOT NULL AUTO_INCREMENT,
	`Usuario` VARCHAR(100),
	`Clave` VARCHAR(100),
	PRIMARY KEY (`ID`)
);

INSERT INTO Usuarios (Usuario, Clave) VALUES ('Javier', 'admin');


*/