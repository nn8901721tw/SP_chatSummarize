# 使用 Node.js 作為基礎映像
FROM node:14

# 設置工作目錄為當前 Dockerfile 所在的目錄
WORKDIR /usr/src/app

# 安裝相依套件
COPY package.json package-lock.json ./
RUN npm install

# 複製應用程式碼
COPY . .

# 運行應用程式
CMD ["node", "server.js"]
