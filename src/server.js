import dotenv from 'dotenv';

import app from './app.js';
import { connectDatabase } from './Config/db/connectDB.js';

// import './Config/passport/passport.js';

dotenv.config();
const PORT = process.env.PORT || 5000;

// Kết nối MongoDB
connectDatabase();




// Khởi chạy server
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
