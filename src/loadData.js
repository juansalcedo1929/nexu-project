const fs = require('fs');
const path = require('path');
const Brand = require('./models/brand');
const Model = require('./models/model');
const sequelize = require('./config/database');

(async () => {
  try {
    const jsonPath = path.join(__dirname, 'data/models.json');
    const rawData = fs.readFileSync(jsonPath, 'utf8');
    const items = JSON.parse(rawData);

    // Sincronizar los modelos
    await sequelize.sync({ force: true });
    console.log('Tablas creadas.');
    const brandMap = new Map();
    // Cargar datos
    for (const item of items) {
      // Buscar o crear la marca
      let brand = brandMap.get(item.brand_name);
      if (!brand) {
        const [brandInstance] = await Brand.findOrCreate({
          where: { name: item.brand_name },
        });
        brand = brandInstance;
        brandMap.set(item.brand_name, brand);
      }
      // Crear el modelo
      await Model.create({
        id: item.id,
        name: item.name,
        average_price: item.average_price,
        brand_id: brand.id,
      });
    }
    console.log('Datos cargados exitosamente.');
  } catch (error) {
    console.error('Error cargando datos:', error);
  } finally {
    await sequelize.close();
  }
})();
