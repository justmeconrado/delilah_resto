# Delilah Restó 🍕

Este proyecto planteó la creación de un sistema de pedidos online para un restaurante poniendo en funcionamiento las partes necesarias para montar una REST API que permita realizar operaciones CRUD sobre una estructura de datos.

## Construido con 🛠️

- Node JS
- Express js
- Sequelize
- MySQL
- JWT
- Postman
- Swagger

## Documentación 📗

Archivo `spec.yaml` Para verlo mejor, puede copiarlo y abrirlo con [Swagger](https://editor.swagger.io/)

## Instalación ⚙

Clonar el repositorio de [GitHub](https://github.com/justmeconrado/delilah_resto.git)

```
git clone https://github.com/justmeconrado/delilah_resto.git
```

## Dependencias 🟢

Instalar las dependencias requeridas para el correcto funcionamiento de la aplicación

```
npm install express
npm install sequelize
npm install mysql2
npm install body-parcer
npm install jsonwebtoken
npm install cors
npm install nodemon
```

## Base de datos SQL 🐬

Documento `delilarestoconrado.sql`

1. Instalar [Xamp](https://www.apachefriends.org/es/index.html) y abrir el panel de control, iniciando MySQL y Apache.
2. Abrir el navegador con localhost, phpmyadmin y en sql crear el schema "delilahrestoconrado".
3. Replicar las tablas del documento.

## Inicio del servidor 🔩

En la terminal:

```
nodemom index.js
```

Recibirá el mensaje:

```
El servidor está funcionando correctamente en puerto 3000
```

Probar la API con [Postman](https://www.postman.com/)

1.  ### **Usuarios** 🙍🏽‍♂️

    ```
    http://localhost:3000/usuarios
    ```

    #### a. Método POST

    Crear un nuevo usuario con el siguiente formato de body en raw, json:

    ```
    {
    "username": "justmeconrado",
    "fullname": "Conrado Vargas",
    "email": "conradovargas93@gmail.com",
    "phone": "38856498",
    "address": "Los Alisos",
    "password": "MiclavePersonal",
    "is_admin": false
    }
    ```

    El campo "is_admin" está seteado para que al poner "false" o "true"; "0" o "1"; siempre se cargue false. Es decir usuario no administrador.
    El administrador está ya cargado previamente, con el sign 5

    ```
    "username": "Emilio",
    "password": "28Agosto"
    ```

    #### b. Login:

    "http://localhost:3000/login"
    Método POST
    BODY: raw, jason

    ```
    {
    "username": "Emilio",
    "password": "28Agosto"
    }
    ```

    para el caso de querer loguear el administrador; en caso de querer loguear otro usuario existente o el creado recientemente, reemplazar los datos del username y del password, por los correspondientes.
    Se recibe el Token que utilizará para las operaciones CRUD de las 3 tablas.

    #### c. Método GET:

    ( Se debe loguear previamente) "http://localhost:3000/usuarios"
    Autorización BEARER TOKEN y copiar el Token recibido en el login

    a) Si el usuario logueado es un usuario común, podrá ver sus datos.

    b) Si quien está logueado es el Administrador, verá los datos de todos los usuarios.

2.  ### **Productos** 🍛

    ```
    http://localhost:3000/productos
    ```

    #### a. Método GET

    Todos los usuarios pueden ver los productos existentes ( Colocando su token de Login en Autorización, Bearer Token)

    #### b. Método POST

    (Solo admnistrador puede cargar nuevos productos)
    formato:

    ```
    {
    "product_name": "Pechuguitas rellenas",
    "price": 350,
    "stock": 1, (ó 0)
    "img_url": "dirección de la imagen del producto",
    "category": "carnes"
    }
    ```

    #### c. Método PUT

    (Solo admnistrador puede modificar productos)
    formato:

    ```
    {
    "product_name": "Pechuguitas de Pollo rellenas de jamón y queso",
    "price": 350,
    "stock": 1,
    "img_url": "dirección de la imagen del producto",
    "category": "carnes"
    }
    ```

    #### d. Eliminar prodcuto

    ```
    http://localhost:3000/productos/:id
    ```

    Se debe colocar como parámetro el ID del producto a eliminar
    Método DELETE (Solo administrador puede eliminar productos)

3.  ### **Pedidos** 📝

    #### a. Crear pedido

    Método POST
    formato:

    ```
    {
    "products": [
    {
    "product_id": 2,
    "quantity": 3
    }, {
    "product_id": 7,
    "quantity": 2
    }
    ],
    "payment_method": "Efectivo"
    }
    ```

    #### b. Ver pedido

    Método GET
    *El usuario común verá la información de su pedido
    *El usuario con rol de administrador, verá todos los pedidos, y podrá cruzar la información con los datos de la tabla "info_pedidos"

    #### c. Modificar el estdo del pedido

    ( Solo el administrador)

    ```
    http://localhost:3000/pedidos/:id
    ```

    ( reemplazar :id por el id del pedido a modificar)
    Método PUT
    formato del body, raw, jason:

    ```
    {
    "status": "Enviado"
    }
    ```

    #### d. Eliminar pedido

    ( solo el administrador)

    ```
    http://localhost:3000/pedidos/:id
    ```

    (reemplazar :id por el id del pedido a eliminar)
    Método DELETE

## Autores ✒️

- **Conrado Vargas** - _Desarrolo web_ - [justmeconrado](https://github.com/justmeconrado)
- **Acámica** - _Rercursos_ - [Acámica](https://github.com/acamica)

## Repositorio 📚

- [GitHub](https://github.com/justmeconrado/delilah_resto.git)
