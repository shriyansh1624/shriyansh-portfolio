const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('index', { title: 'Shriyansh Portfolio' });
});

router.get('/about', (req, res) => {
  res.render('about', { title: 'About Me' });
});

router.get('/skills', (req, res) => {
  res.render('skills', { title: 'Skills' });
});

router.get('/projects', (req, res) => {
  res.render('projects', { title: 'Projects' });
});

router.get('/experience', (req, res) => {
  res.render('experience', { title: 'Experience' });
});

router.get('/achievements', (req, res) => {
  res.render('achievements', { title: 'Achievements' });
});

router.get('/resume', (req, res) => {
  res.render('resume', { title: 'Resume' });
});

router.get('/contact', (req, res) => {
  res.render('contact', { title: 'Contact' });
});

module.exports = router;