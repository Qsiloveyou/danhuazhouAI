const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const tutorialRoutes = require('./routes/tutorials');

const app = express();
const PORT = process.env.PORT || 5000;

// 连接到MongoDB
mongoose.connect('mongodb://localhost:27017/danhuazhouAI', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB连接成功'))
    .catch(err => console.error('MongoDB连接失败:', err));

// 中间件
app.use(cors());
app.use(bodyParser.json());
app.use('/api/auth', authRoutes);
app.use('/api/tutorials', tutorialRoutes);

// 启动服务器
app.listen(PORT, () => {
    console.log(`服务器正在运行在 http://localhost:${PORT}`);
});