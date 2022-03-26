let connection = require("../connection");
let jwt = require("jsonwebtoken");

let firma = "Arcoiris3";

function creaUsuario(req, res) {
  let user = req.body;
  let token = jwt.sign(user.password, firma);
  let validator = "SELECT email, username FROM delilahrestoConrado.usuarios";

  connection.query(validator, function (err, info) {
    let resultEmail = info.find((elem) => elem.email === user.email);
    let resultUsername = info.find((elem) => elem.username === user.username);

    if (resultEmail || resultUsername) {
      res.status(409).json({
        message:
          "Este usuario ya está en uso, por favor modifique su nombre de usuario",
      });
      return;
    }

    let sql = `INSERT INTO delilahrestoConrado.usuarios(username, fullname, email, phone, address, password, is_admin)
        VALUES ('${user.username}', '${user.fullname}', '${user.email}', '${user.phone}', '${user.address}', '${token}', 'false');`;

    connection.query(sql, function (err, user) {
      if (err) {
        console.log(err);
        res.status(500).json({
          error: "Debe ingresar todos los datos solicitados",
        });
      } else {
        res.status(201).json({
          message: "usuario creado",
        });
      }
    });
  });
}

function logIn(req, res) {
  let user = req.body;
  let token = jwt.sign(user.password, firma);
  let sql = `SELECT password FROM delilahrestoConrado.usuarios WHERE usuarios.password = '${token}' AND usuarios.username = '${user.username}'`;

  connection.query(sql, function (err, passwords) {
    if (err || passwords.length == 0) {
      res.status(500).json({
        message: "El usuario y/o el password no corresponden",
      });
      return;
    } else {
      let userLogged = jwt.sign(user, firma);

      res.json({
        mensaje: "Usuario correctamente logueado",
        jwt: userLogged,
      });
    }
  });
}

function retornaUsuario(req, res) {
  let sql;
  let userRol = req.params.rol.is_admin;
  let userId = req.params.rol.id;

  if (userRol == 1) {
    console.log(`Cuenta de Administrador`);
    sql = "SELECT * FROM delilahrestoConrado.usuarios";
  } else {
    console.log(`Cuenta de Usuario`);
    sql = `SELECT * FROM delilahrestoConrado.usuarios WHERE id = ${userId}`;
  }

  connection.query(sql, function (err, users) {
    if (err) {
      res.send(err);
    } else {
      res.send(users);
    }
  });
}

module.exports = {
  creaUsuario,
  retornaUsuario,
  logIn,
};
