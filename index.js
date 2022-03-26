let express = require("express");
let bodyParser = require("body-parser");
let jwt = require("jsonwebtoken");
let cors = require("cors");

const {
  retornaUsuario,
  creaUsuario,
  logIn,
} = require("./servers/controllers/usuarios");
const {
  selectProducts,
  insertProduct,
  updateProduct,
  deleteProduct,
} = require("./servers/controllers/productos");
const {
  getAllOrders,
  newOrder,
  updateOrder,
  deleteOrder,
} = require("./servers/controllers/pedidos");
const { defineRol, validaRol } = require("./servers/middlewares/autorizacion");

let app = express();

app.use(cors());

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());

//Login
app.post("/login", logIn);

//Rutas de Usuarios
app.get("/usuarios", defineRol, validaRol, retornaUsuario);
app.post("/usuarios", creaUsuario);

//Rutas de Pedidos
app.get("/pedidos", defineRol, validaRol, getAllOrders);
app.post("/pedidos", defineRol, validaRol, newOrder);
app.put("/pedidos/:id", defineRol, validaRol, updateOrder);
app.delete("/pedidos/:id", defineRol, validaRol, deleteOrder);

//Rutas de Productos
app.get("/productos", selectProducts);
app.post("/productos", defineRol, validaRol, insertProduct);
app.put("/productos/:id", defineRol, validaRol, updateProduct);
app.delete("/productos/:id", defineRol, validaRol, deleteProduct);

app.listen(3000, function () {
  console.log("El servidor está funcionando correctamente en puerto 3000");
});
