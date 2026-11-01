const Categoria = require("../modelos/categoriaModelo");

exports.crearCategoria = async (req, res) => {
  try {
    const { nombre, descripcion = "", icono = "tag" } = req.body || {};

    if (!nombre || !String(nombre).trim()) {
      return res.status(400).json({ mensaje: "El nombre de la categoría es obligatorio" });
    }

    const categoriaExistente = await Categoria.findOne({ nombre: new RegExp(`^${nombre.trim()}$`, "i") });
    if (categoriaExistente) {
      return res.status(409).json({ mensaje: "La categoría ya existe" });
    }

    const nuevaCategoria = await Categoria.create({
      nombre: nombre.trim(),
      descripcion: descripcion.trim(),
      icono: icono || "tag",
    });

    return res.status(201).json(nuevaCategoria);
  } catch (error) {
    return res.status(400).json({ mensaje: error.message || "Error al crear la categoría" });
  }
};

exports.obtenerCategorias = async (_req, res) => {
  try {
    const categorias = await Categoria.find().sort({ fechaCreacion: -1 });
    return res.status(200).json(categorias);
  } catch (error) {
    return res.status(500).json({ mensaje: error.message || "Error al obtener las categorías" });
  }
};

exports.actualizarCategoria = async (req, res) => {
  try {
    const { nombre, descripcion, icono } = req.body || {};
    const categoria = await Categoria.findById(req.params.id);

    if (!categoria) {
      return res.status(404).json({ mensaje: "Categoría no encontrada" });
    }

    if (nombre !== undefined && (!String(nombre).trim())) {
      return res.status(400).json({ mensaje: "El nombre de la categoría es obligatorio" });
    }

    if (nombre !== undefined) {
      const nombreTrim = String(nombre).trim();
      const categoriaExistente = await Categoria.findOne({
        _id: { $ne: categoria._id },
        nombre: new RegExp(`^${nombreTrim}$`, "i"),
      });

      if (categoriaExistente) {
        return res.status(409).json({ mensaje: "Ya existe otra categoría con ese nombre" });
      }

      categoria.nombre = nombreTrim;
    }

    if (descripcion !== undefined) categoria.descripcion = descripcion || "";
    if (icono !== undefined) categoria.icono = icono || "tag";

    const categoriaActualizada = await categoria.save();
    return res.status(200).json(categoriaActualizada);
  } catch (error) {
    return res.status(400).json({ mensaje: error.message || "Error al actualizar la categoría" });
  }
};

exports.eliminarCategoria = async (req, res) => {
  try {
    const categoria = await Categoria.findById(req.params.id);

    if (!categoria) {
      return res.status(404).json({ mensaje: "Categoría no encontrada" });
    }

    await Categoria.findByIdAndDelete(req.params.id);
    return res.status(200).json({ mensaje: "Categoría eliminada correctamente" });
  } catch (error) {
    return res.status(500).json({ mensaje: error.message || "Error al eliminar la categoría" });
  }
};
