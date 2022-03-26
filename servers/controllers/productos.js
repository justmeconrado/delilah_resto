let connection = require("../connection");

function selectProducts(req, res) {
  let sql = "SELECT * FROM delilahrestoConrado.productos";

  connection.query(sql, function (err, products) {
    if (err) {
      console.log(err);
      res.status(500).json({
        error: "Error interno",
      });
    } else {
      res.send(products);
    }
  });
}

function insertProduct(req, res) {
  let newProduct = req.body;
  let sql;
  let userRol = req.params.rol.is_admin;

  if (userRol == 1) {
    sql = `INSERT INTO delilahrestoConrado.productos(product_name, price, stock, img_url, category)
        VALUES ('${newProduct.product_name}', '${newProduct.price}', '${newProduct.stock}', '${newProduct.img_url}', '${newProduct.category}');`;
  } else {
    res.status(403).json({
      message: "Solo un administrador puede crear nuevos productos",
    });
    return;
  }

  connection.query(sql, function (err, products) {
    if (err) {
      console.log(err);
      res.status(500).json({
        error: "Debe ingresar todos los datos requeridos",
      });
    } else {
      res.status(201).json({
        message: "Producto creado",
        productId: products.insertId,
      });
    }
  });
}

function updateProduct(req, res) {
  let update = req.body;
  let productId = req.params.id;
  let sql;
  let userRol = req.params.rol.is_admin;

  if (userRol == 1) {
    sql = `UPDATE delilahrestoConrado.productos
        SET price = '${update.price}',
        product_name = '${update.product_name}',
        stock = ${update.stock},
        img_url= '${update.img_url}',
        category = '${update.category}'
        WHERE id = ${productId}`;
  } else {
    res.status(403).json({
      message: "Solo un administrador puede modificar productos",
    });
    return;
  }

  connection.query(sql, function (err, product) {
    if (err) {
      console.log(err);
      res.status(500).json({
        error: "Debe ingresar todos los datos para modificar",
      });
    } else {
      res.status(200).json({
        message: "producto modificado",
        product,
      });
    }
  });
}

function deleteProduct(req, res) {
  let productId = req.params.id;
  let sql;
  let userRol = req.params.rol.is_admin;

  if (userRol == 1) {
    sql = `DELETE FROM productos WHERE id = ${productId}`;
  } else {
    res.status(403).json({
      message: "Solo un administrador puede eliminar productos",
    });
    return;
  }

  connection.query(sql, function (err, product) {
    if (err) {
      console.log(err);
      res.status(500).json({
        error: "Error Interno",
      });
    } else {
      res.status(200).json({
        message: "Producto eliminado",
        product,
      });
    }
  });
}

module.exports = {
  selectProducts,
  insertProduct,
  updateProduct,
  deleteProduct,
};
