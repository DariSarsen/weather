const express = require('express');
const router = express.Router();
const News = require('../models/news');

router.get('/', async (req, res) => {
    try {
        const news = await News.find();
        res.json(news);
    } catch (err) {
        console.log()
        res.status(500).json({ message: err.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const news = await News.findById(req.params.id);
        if (news) {
            res.json(news);
        } else {
            res.status(404).json({ message: 'Новость не найдена'});
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.post('/', async (req, res) => {
    const { title, author, date, description, imageUrls} = req.body;
    try {
        const newNews = new News({
            title: title,
            description: description,
            author: author,
            date: date,
            imageUrls: imageUrls,
        });
        const createdNews = await newNews.save();
        res.status(201).json(createdNews);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.patch('/:id', async (req, res) => {
    try {
        const updateNews = await News.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (updateNews) {
            res.json(updateNews);
        } else {
            res.status(404).json({ message: 'Not Found' });
        }
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const result = await News.findByIdAndDelete(req.params.id);
        if (result) {
            res.json({ message: 'News has been deleted' });
        } else {
            res.status(404).json({ message: 'Not Found' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
