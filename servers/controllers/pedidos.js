let connection = require("../connection");

function getAllOrders(req, res) {
  let sql;
  let userRol = req.params.rol.is_admin;
  let userId = req.params.rol.id;

  if (userRol == 1) {
    sql = `SELECT * FROM info_pedidos
        INNER JOIN pedidos ON info_pedidos.order_id = pedidos.id
        INNER JOIN productos ON info_pedidos.product_id = productos.id
        INNER JOIN usuarios ON pedidos.user_id = usuarios.id`;
  } else {
    sql = `SELECT * FROM info_pedidos 
        INNER JOIN pedidos ON info_pedidos.order_id = pedidos.id
        INNER JOIN productos ON info_pedidos.product_id = productos.id
        INNER JOIN usuarios ON pedidos.user_id = usuarios.id
        WHERE user_id = ${userId}`;
  }
  connection.query(sql, (err, orders) => {
    if (err) {
      console.log(err);
      res.status(500).json({
        message: "Error interno de Rol/pedidos",
      });
    } else {
      res.send(orders);
    }
  });
}

function newOrder(req, res) {
  function addZero(i) {
    if (i < 10) {
      i = "0" + i;
    }
    return i;
  }
  let d = new Date();
  let h = addZero(d.getHours());
  let m = addZero(d.getMinutes());
  let orderTime = h + ":" + m;
  let userId = req.params.rol.id;

  let order = req.body;

  let sql = `INSERT INTO delilahrestoConrado.pedidos(user_id, status, payment_method, update_time)
    VALUES (${userId}, 'nuevo', '${order.payment_method}', '${orderTime}')`;

  connection.query(sql, (err, orders) => {
    if (err) {
      console.log(err);
      res.status(500).json({
        message: "Error Interno",
      });
    } else {
      order.products.forEach((element) => {
        let orderUnity = `INSERT INTO delilahrestoConrado.info_pedidos(order_id, product_id, quantity)
                VALUES (${orders.insertId}, ${element.product_id}, '${element.quantity}')`;

        connection.query(orderUnity, (err, order) => {
          if (err) {
            res.status(500).json({
              message: "Error interno",
            });
          }
        });
      });
      res.status(201).json({
        message: "Pedido creado",
      });
    }
  });
}

function updateOrder(req, res) {
  let update = req.body;
  let orderId = req.params.id;

  let sql;
  let userRol = req.params.rol.is_admin;

  if (userRol == 1) {
    sql = `UPDATE delilahrestoConrado.pedidos
        SET status = '${update.status}'
        WHERE id = ${orderId}`;
  } else {
    res.status(403).json({
      message: "Solo un administrador puede modificar el estado del pedido",
    });
    return;
  }

  connection.query(sql, (err, order) => {
    if (err) {
      console.log(err);
      res.status(500).json({
        message: "Error interno modificar pedidos",
      });
    } else {
      res.status(200).json({
        message: "Estado del pedido modificado",
        order,
      });
    }
  });
}

function deleteOrder(req, res) {
  let orderId = req.params.id;

  let sql;
  let userRol = req.params.rol.is_admin;

  if (userRol == 1) {
    sql = `DELETE FROM pedidos WHERE id = ${orderId}`;
  } else {
    res.status(403).json({
      message: "Solo un administrador puede eliminar un pedido",
    });
    return;
  }

  connection.query(sql, function (err, order) {
    if (err) {
      console.log(err);
      res.status(500).json({
        error: "Error interno al eliminar pedido",
      });
    } else {
      //Eliminar pedido en info_pedidos
      let sqlOrderProducts = `DELETE FROM info_pedidos WHERE info_pedidos.order_id = ${orderId}`;
      connection.query(sqlOrderProducts, function (err, newOrder) {
        if (err) {
          console.log(err);
        }
      });

      res.status(200).json({
        message: "Pedido eliminado",
        order,
      });
    }
  });
}

module.exports = {
  getAllOrders,
  newOrder,
  updateOrder,
  deleteOrder,
};
