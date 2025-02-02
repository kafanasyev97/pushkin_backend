# Используем официальный образ Node.js
FROM node:19.9.0

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем package.json и package-lock.json
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем исходный код
COPY . .

# Указываем порт, который будет использовать приложение
EXPOSE 3000

# Запускаем приложение
CMD ["node", "app.js"]