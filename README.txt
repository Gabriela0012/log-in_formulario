
Ruta http://localhost:8080    se muestra el formulario para poder registrarse
Ruta http://localhost:8080/api/registerUser    muestra todos los usuarios registrados


Ruta http://localhost:8080/login   se muestra la vista para el ingreso del usuario
registrado, haciendo clic en el boton "ingresar" lo manda a la ruta:
http://localhost:8080/api/current   por defecto le pide que acceda primero pero si refresca 
la pagina y si ingreso bien los datos le da la bienvenida con su email.

Haciendo click en el link de "cerrar sesion" lo manda a la ruta: 
http://localhost:8080/api/logout   que muestra que esta desconectado, y se destruye la 
sesion que se guardo en mongoAtlas.


 
