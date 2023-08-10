FROM node:18

# Establecer el directorio de trabajo
WORKDIR /app

# Instalar las dependencias requeridas
RUN apt update && apt install -y \
    chromium \
    libatk-bridge2.0-0 \
    libcairo2 \
    libgbm1 \
    python3 \
    python3-pip \
    gconf-service \
    libgbm-dev \ 
    libasound2 \ 
    libatk1.0-0 \ 
    libc6 \ 
    libcairo2 \
    libcups2 \
    libdbus-1-3 \
    libexpat1 \
    libfontconfig1 \
    libgcc1 \ 
    libgconf-2-4 \ 
    libgdk-pixbuf2.0-0 \ 
    libglib2.0-0 \
    libgtk-3-0 \
    libnspr4 \
    libpango-1.0-0 \
    libpangocairo-1.0-0 \
    libstdc++6 \
    libx11-6 \
    libx11-xcb1 \
    libxcb1 \
    libxcomposite1 \
    libxcursor1 \
    libxdamage1 \
    libxext6 \
    libxfixes3 \
    libxi6 \
    libxrandr2 \
    libxrender1 \
    libxss1 \
    libxtst6 \
    ca-certificates \
    fonts-liberation \
    libappindicator1 \
    libnss3 \
    lsb-release \
    xdg-utils \
    wget

    

# Copiar los archivos de la aplicación
COPY . .


# Instalar las dependencias de Node.js
RUN npm install

# Ejecutar la aplicación
CMD ["npm", "start"]
