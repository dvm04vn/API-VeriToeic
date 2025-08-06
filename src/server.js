const express = require("express");
const cors = require('cors');
const cookieParser = require('cookie-parser');

const Connect = require('./Config/db/connectDB'); // file này nên export hàm connectDB
const routes = require('./routes/index');

require('dotenv').config();
require('./Config/passport.js/passport');

const app = express();
const PORT = process.env.PORT || 5000;

// Kết nối MongoDB
Connect(); // Gọi đúng hàm connectDB đã export

app.use(express.urlencoded({extended:true}))
app.use(express.json());


app.use(cors({
    origin: process.env.URL_CLIENT,
    credentials: true
}));
app.use(cookieParser());


routes(app);

// Khởi chạy server
app.listen(PORT, () => {
    console.log(`✅ Server is running on http://localhost:${PORT}`);
});
