const express = require("express");
const {
  crearCategoria,
  obtenerCategorias,
  actualizarCategoria,
  eliminarCategoria,
} = require("../controladores/categoriaControlador");
const { proteger, soloAdmin } = require("../middlewares/authMiddleware");

const router = express.Router();

router.get("/categorias", obtenerCategorias);
router.post("/categorias", proteger, soloAdmin, crearCategoria);
router.put("/categorias/:id", proteger, soloAdmin, actualizarCategoria);
router.delete("/categorias/:id", proteger, soloAdmin, eliminarCategoria);

module.exports = router;
