const express = require('express');
const Tutorial = require('../models/Tutorial');

const router = express.Router();

// 获取所有教程
router.get('/', async (req, res) => {
    try {
        const tutorials = await Tutorial.find();
        res.json(tutorials);
    } catch (error) {
        res.status(500).json({ message: '获取教程失败', error });
    }
});

// 创建新教程
router.post('/', async (req, res) => {
    const { title, content } = req.body;
    try {
        const newTutorial = new Tutorial({ title, content });
        await newTutorial.save();
        res.status(201).json({ message: '教程创建成功' });
    } catch (error) {
        res.status(500).json({ message: '创建教程失败', error });
    }
});

module.exports = router;