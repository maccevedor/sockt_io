Procedimiento almacenado por consola;

DELIMITER //

CREATE PROCEDURE `sp_getall`()
BEGIN
    SELECT id, name, location FROM employees;
END;
//