![Index page about Restaurant List](./public/image/restaurant.png)

### 使用方式

1. 請先確認有安裝 node.js 與 npm
2. 打開終端機，clone 此專案至本地

```bash
git clone https://github.com/coldwater121112/restaurant-list-final.git
```

3. 安裝相關軟體(詳見開發工具)

```bash
npm install
```

3. 安裝 nodemon

```bash
npm install nodemon
```

4. 參考 .env.example 設定環境變數

5. 在終端機輸入指令來執行本專案

```bash
npm run seed
npm run dev
```

7. 當終端機出現以下字樣，表示伺服器已成功啟動

```bash
Listening on http://localhost:3000
```

測試帳號

| Name  | Email             | Password |
| ----- | ----------------- | -------- |
| user1 | user1@example.com | 12345678 |
| user2 | user2@example.com | 12345678 |

---

### 開發工具

| Option             | Description |
| ------------------ | ----------- |
| Node.js            | @14.16.0    |
| express            | @4.16.4     |
| express-handlebars | @4.0.2      |
| express-session    | @1.17.1     |
| mongoose           | @5.9.13     |
| method-override    | @3.0.0      |
| dotenv             | @8.2.0      |
| bcryptjs           | @2.4.3      |
| connect-flash      | @0.1.1      |
| passport           | @0.4.1      |
| passport-facebook  | @3.0.0      |
| passport-local     | @1.0.0      |
