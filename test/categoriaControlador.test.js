const test = require('node:test');
const assert = require('node:assert/strict');

const {
  crearCategoria,
  obtenerCategorias,
  actualizarCategoria,
  eliminarCategoria,
} = require('../controladores/categoriaControlador');

test('categoriaController expone CRUD para categorías', () => {
  assert.equal(typeof crearCategoria, 'function');
  assert.equal(typeof obtenerCategorias, 'function');
  assert.equal(typeof actualizarCategoria, 'function');
  assert.equal(typeof eliminarCategoria, 'function');
});
