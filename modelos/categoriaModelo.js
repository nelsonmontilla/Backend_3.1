const mongoose = require("mongoose");

const categoriaEsquema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    descripcion: {
      type: String,
      default: "",
      trim: true,
    },
    icono: {
      type: String,
      default: "tag",
      trim: true,
    },
    fechaCreacion: {
      type: Date,
      default: Date.now,
    },
  },
  { collection: "categorias" }
);

const Categoria = mongoose.model("Categoria", categoriaEsquema);

module.exports = Categoria;
