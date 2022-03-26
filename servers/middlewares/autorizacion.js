let connection = require("../connection");
let jwt = require("jsonwebtoken");
let firma = "Arcoiris3";

let validateToken = (token) => {
  try {
    const decoded = jwt.verify(token, firma);
    return decoded;
  } catch {
    return false;
  }
};

let defineRol = (req, res, next) => {
  const token = req.headers["authorization"].replace("Bearer ", "");
  let decodedUser = validateToken(token);

  if (decodedUser) {
    req.params.user = decodedUser;
    next();
  } else {
    res.json({
      mensaje: "El Token es erroneo o falta",
    });
  }
};

let validaRol = (req, res, next) => {
  let info = req.params.user;
  let sql = `SELECT is_admin, id FROM delilahrestoConrado.usuarios WHERE usuarios.username = '${info.username}'`;

  connection.query(sql, (err, rol) => {
    if (err) {
      console.log(err);
    } else {
      req.params.rol = rol[0];
      next();
    }
  });
};

module.exports = {
  defineRol,
  validaRol,
};
