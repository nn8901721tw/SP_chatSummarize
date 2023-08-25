
# 使用 Node.js 作為基礎映像
FROM node:14
# 設置工作目錄為當前 Dockerfile 所在的目錄
WORKDIR /usr/src/app

# 安裝依賴
COPY package*.json ./
RUN npm install

# 複製前端代碼
COPY . .

# 啟動前端應用
CMD ["npm", "start"]
