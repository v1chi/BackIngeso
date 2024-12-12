# Utilizar la imagen base de Node.js
FROM node:18

# Instalar netcat
RUN apt-get update && apt-get install -y netcat-openbsd
# Crear y establecer el directorio de trabajo en el contenedor
WORKDIR /app

# Copiar los archivos necesarios para instalar las dependencias
COPY package*.json ./

# Instalar las dependencias del backend
RUN npm install

# Copiar el resto del código del backend al contenedor
COPY . .

# Exponer el puerto en el que el backend escucha
EXPOSE 3001

# Comando para iniciar la aplicación
CMD ["npm", "run", "start"]