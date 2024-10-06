const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();

// 用户注册
router.post('/register', async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ username, email, password: hashedPassword });
        await newUser.save();
        res.status(201).json({ message: '用户注册成功' });
    } catch (error) {
        res.status(500).json({ message: '注册失败', error });
    }
});

// 用户登录
router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username });
        if (!user) return res.status(404).json({ message: '用户不存在' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: '密码错误' });

        const token = jwt.sign({ id: user._id }, 'secret', { expiresIn: '1h' });
        res.json({ token });
    } catch (error) {
        res.status(500).json({ message: '登录失败', error });
    }
});

module.exports = router;