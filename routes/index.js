const router = require('express').Router();
const notesRoutes = require('./notes');
const homeRoutes = require('./home');

router.use('/notes', notesRoutes);
router.use('/', homeRoutes);

module.exports = router;