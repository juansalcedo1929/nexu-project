const express = require('express');
const { Op } = require('sequelize');
const app = express();

// Middleware para parsear JSON
app.use(express.json());


const Brand = require('./models/brand');

// Ruta para obtener todas las marcas
app.get('/brands', async (req, res) => {
  try {
    const brands = await Brand.findAll(); // Consulta todos los registros de la tabla Brand
    res.status(200).json(brands);
  } catch (error) {
    console.error('Error al obtener las marcas:', error);
    res.status(500).json({ message: 'Error interno del servidor', error: error.message });
  }
});
const Model = require('./models/model');

// Ruta para obtener todos los modelos
app.get('/models', async (req, res) => {
  try {
    const models = await Model.findAll(); // Consulta todos los registros de la tabla Model
    res.status(200).json(models); // Respuesta con los datos en formato JSON
  } catch (error) {
    console.error('Error al obtener los modelos:', error);
    res.status(500).json({ message: 'Error interno del servidor', error: error.message });
  }
});

app.get('/models', async (req, res) => {
  try {
    const { greater, lower } = req.query;

    const filter = {};

    if (greater) {
      filter.average_price = {
        [Op.gte]: parseFloat(greater)
      };
    }

    if (lower) {
      filter.average_price = {
        ...filter.average_price,
        [Op.lte]: parseFloat(lower)
      };
    }

    const models = await Model.findAll({
      where: filter
    });

    res.status(200).json(models);
  } catch (error) {
    console.error('Error al obtener los modelos:', error);
    res.status(500).json({ message: 'Error interno del servidor', error: error.message });
  }
});

// Ruta para obtener todos los modelos de una marca específica
app.get('/brands/:id/models', async (req, res) => {
  try {
    const { id } = req.params;

    // Obtener los modelos asociados a la marca
    const models = await Model.findAll({
      where: { brand_id: id }, // Filtra los modelos por brand_id
    });

    if (models.length > 0) {
      res.status(200).json(models);
    } else {
      res.status(404).json({ message: 'No se encontraron modelos para esta marca' });
    }
  } catch (error) {
    console.error('Error al obtener los modelos:', error);
    res.status(500).json({ message: 'Error interno del servidor', error: error.message });
  }
});

// Ruta para actualizar el precio promedio de un modelo
app.put('/models/:id', async (req, res) => {
  try {
    const { id } = req.params; // ID del modelo
    const { average_price } = req.body; // Nuevo precio promedio

    // Validar que el precio promedio esté presente y sea mayor a 100,000
    if (average_price === undefined || average_price <= 100000) {
      return res.status(400).json({
        message: 'El campo "average_price" es obligatorio y debe ser mayor a 100,000',
      });
    }

    // Buscar el modelo por ID
    const model = await Model.findByPk(id);
    if (!model) {
      return res.status(404).json({ message: 'Modelo no encontrado' });
    }

    // Actualizar el precio promedio
    model.average_price = average_price;
    await model.save();

    res.status(200).json({
      message: 'Precio promedio actualizado correctamente',
      model,
    });
  } catch (error) {
    console.error('Error al actualizar el modelo:', error);
    res.status(500).json({ message: 'Error interno del servidor', error: error.message });
  }
});


// Ruta para crear un nuevo modelo asociado a una marca
app.post('/brands/:id/models', async (req, res) => {
  try {
    const { id } = req.params; // ID de la marca
    const { name, average_price } = req.body; // Datos enviados en el cuerpo de la petición

    // Validar que el nombre del modelo esté presente
    if (!name) {
      return res.status(400).json({
        message: 'El campo "name" es obligatorio',
      });
    }

    // Validar que el precio promedio, si existe, sea mayor a 100,000
    if (average_price !== undefined && average_price <= 100000) {
      return res.status(400).json({
        message: 'El campo "average_price" debe ser mayor a 100,000 si se proporciona',
      });
    }

    // Verificar si la marca existe
    const brand = await Brand.findByPk(id);
    if (!brand) {
      return res.status(404).json({ message: 'Marca no encontrada' });
    }

    // Verificar si el nombre del modelo ya existe para esta marca
    const existingModel = await Model.findOne({
      where: {
        name,
        brand_id: id,
      },
    });

    if (existingModel) {
      return res.status(400).json({
        message: `El modelo "${name}" ya existe para la marca con ID ${id}`,
      });
    }

    // Crear el modelo asociado a la marca
    const newModel = await Model.create({
      name,
      average_price: average_price || null,
      brand_id: id,
    });

    res.status(201).json(newModel);
  } catch (error) {
    console.error('Error al crear el modelo:', error);
    res.status(500).json({ message: 'Error interno del servidor', error: error.message });
  }
});

// Middleware para manejar rutas no encontradas
app.use((req, res, next) => {
  res.status(404).json({ message: 'Ruta no encontrada' });
});

// Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
