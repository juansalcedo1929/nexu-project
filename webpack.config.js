const path = require('path');

module.exports = {
  entry: './src/app.js', // Punto de entrada de la aplicación
  output: {
    path: path.resolve(__dirname, 'dist'), // Carpeta donde se guardará el build
    filename: 'bundle.js', // Archivo compilado resultante
  },
  target: 'node', // Configuración para aplicaciones Node.js
  mode: 'production', // Modo para optimizar el código
  module: {
    rules: [
      {
        test: /\.js$/, // Archivos que terminan en .js
        exclude: /node_modules/, // Excluir dependencias externas
        use: {
          loader: 'babel-loader', // Usar Babel para transpilar el código
          options: {
            presets: ['@babel/preset-env'], // Compatibilidad con versiones antiguas de Node.js
          },
        },
      },
    ],
  },
  resolve: {
    extensions: ['.js'], // Resolver archivos con estas extensiones
  },
  externals: {
    // Evitar incluir dependencias de Node.js en el bundle
    express: 'commonjs express',
    sequelize: 'commonjs sequelize',
    mysql2: 'commonjs mysql2',
    dotenv: 'commonjs dotenv',
  },
};
