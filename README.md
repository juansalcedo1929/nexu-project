
# Documentación del Proyecto

## Servicios y Configuraciones del Servicio en la Nube

### Proyecto en Render
- **Nombre del Entorno:** nexu
- **URL del Entorno:** [https://nexu-project.onrender.com/](https://nexu-project.onrender.com/)

## Tecnologías Utilizadas

Este proyecto fue desarrollado utilizando las siguientes tecnologías:

- **Node.js**
- **Express.js**
- **Sequelize**
- **MySQL**
- **RDS**
- **Swagger**
- **Webpack**
- **dotenv**

### Base de Datos
- **Tipo:** MySQL
- **Nombre de la Base de Datos:** nexu
- **Host AWS RDS:** nexu.cnoikeao21oi.us-east-2.rds.amazonaws.com
- **Nombre de las Tablas:** Brands, Models 

### Variables de Entorno
Configurar las siguientes variables en tu archivo `.env`:
- `DB_NAME=your_db_name`
- `DB_USER=your_db_user`
- `DB_PASSWORD=your_db_password`
- `DB_HOST=your_db_host`
- `DB_PORT=your_db_port`

## Servicios de la API

### Obtener todas las marcas
- **Método:** GET
- **Endpoint:** `/brands`
- **Descripción:** Obtiene todas las marcas registradas.
- **Ejemplo de Solicitud:**
  GET [https://nexu-project.onrender.com/brands](https://nexu-project.onrender.com/brands)

---

### Obtener los modelos de una marca por ID
- **Método:** GET
- **Endpoint:** `/brands/:id/models`
- **Descripción:** Obtiene todos los modelos asociados a una marca específica.
- **Ejemplo de Solicitud:**
  GET [https://nexu-project.onrender.com/brands/1/models](https://nexu-project.onrender.com/brands/1/models)

---

### Crear un nuevo modelo para una marca
- **Método:** POST
- **Endpoint:** `/brands/:id/models`
- **Descripción:** Crea un modelo para una marca específica. El nombre del modelo debe ser único dentro de la marca. El precio promedio es opcional, pero debe ser mayor a 100,000.
- **Cuerpo de la Solicitud (Body) en formato JSON:**
  ```json
  {
    "name": "Nuevo Modelo",
    "average_price": 150000
  }
  ```
- **Ejemplo de Solicitud:**
  POST [https://nexu-project.onrender.com/brands/1/models](https://nexu-project.onrender.com/brands/1/models)

---

### Actualizar el precio promedio de un modelo
- **Método:** PUT
- **Endpoint:** `/models/:id`
- **Descripción:** Actualiza el precio promedio de un modelo específico.
- **Cuerpo de la Solicitud (Body) en formato JSON:**
  ```json
  {
    "average_price": 200000
  }
  ```
- **Ejemplo de Solicitud:**
  PUT [https://nexu-project.onrender.com/models/1](https://nexu-project.onrender.com/models/1)

---

### Obtener modelos filtrados por precio
- **Método:** GET
- **Endpoint:** `/models?greater=&lower=`
- **Descripción:** Obtiene modelos filtrados por precio promedio. 
  - `greater`: Filtra por modelos con precio promedio mayor al valor especificado.
  - `lower`: Filtra por modelos con precio promedio menor al valor especificado.
- **Ejemplo de Solicitud:**
  GET [https://nexu-project.onrender.com/models?greater=380000&lower=400000](https://nexu-project.onrender.com/models?greater=380000&lower=400000)

## Pasos para la Ejecución del Servicio

1. **Clona el Repositorio:**
   ```bash
   git clone https://github.com/juansalcedo1929/nexu-project.git
   cd nexu-project
   ```

2. **Instala las dependencias:**
   ```bash
   npm install
   ```

3. **Configura las Variables de Entorno:**
   Crea un archivo `.env` en la raíz del proyecto con las siguientes variables:
   ```env
   DB_NAME=your_db_name
   DB_USER=your_db_user
   DB_PASSWORD=your_db_password
   DB_HOST=your_db_host
   DB_PORT=your_db_port

   ```

4. **Carga los datos iniciales:**
   Ejecuta el script para cargar datos desde el archivo `models.json`:
   ```bash
   node src/loadData.js
   ```

5. **Inicia el Servidor en Modo Desarrollo:**
   ```bash
   npm run dev
   ```

6. **Construye y Despliega el Proyecto (Opcional):**
   ```bash
   npm run build
   ```

7. **Prueba los Servicios con su Frontend, Postman o alguna otra herramienta de prueba de Apis :**
   - GET: [https://nexu-project.onrender.com/brands](https://nexu-project.onrender.com/brands)
   - POST: [https://nexu-project.onrender.com/brands/1/models](https://nexu-project.onrender.com/brands/1/models)
     - Body en formato JSON:
       ```json
       {
         "name": "Nuevo Modelo",
         "average_price": 150000
       }
       ```

---
## Conclusión

El proyecto me pareció muy divertido y práctico porque permite al desarrollador mostrar sus habilidades en un entorno más real. 
Esto despierta el deseo de continuar ampliándolo, explorando nuevas funcionalidades y retos. 

Con un poco más de tiempo, me habría gustado desarrollar el Frontend para ofrecer una experiencia visual más completa, 
posiblemente utilizando tecnologías como React.js. 

Quedo atento a cualquier duda que pueda surgir respecto al levantamiento del proyecto, instalación o cualquier otro aspecto. 

¡Saludos!
