SET CHARSET UTF8MB4 ;
DROP DATABASE IF EXISTS dbeldorado;
CREATE DATABASE dbeldorado DEFAULT CHARACTER SET UTF8MB4 ;

use dbeldorado;

SET CHARACTER_SET_CLIENT = UTF8MB4 ;
SET CHARACTER_SET_CONNECTION = UTF8MB4 ;

DROP TABLE IF EXISTS todolist;
CREATE TABLE todolist(
id INT AUTO_INCREMENT PRIMARY KEY,
title VARCHAR(255),
done BOOLEAN
);

INSERT INTO todolist VALUES (1, "Preparar o ambiente de desenvolvimento", true);
INSERT INTO todolist VALUES (2, "Instalar o docker no wsl2", true);
INSERT INTO todolist VALUES (3, "Preparar o docker-compose.yml (mysql, phpMyAdmin, script init.sql)", true);
INSERT INTO todolist VALUES (4, "Desenvolver o backend APP Python", true);
INSERT INTO todolist VALUES (5, "Desenvolver o frontend APP React", true);
INSERT INTO todolist VALUES (6, "Implementar Tests", true);

GRANT ALL ON dbeldorado TO 'root'@'%';
