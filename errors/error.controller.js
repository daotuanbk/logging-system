const express = require('express');
const router = express.Router();
const errorService = require('./error.service');

// routes
router.post('/create', create);
router.get('/search', search);
router.get('/:id', getById);
router.put('/:id', update);
router.delete('/:id', _delete);

module.exports = router;

function create(req, res, next) {
    errorService.create(req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function search(req, res, next) {
    errorService.search(req.query)
        .then(errors => res.json(errors))
        .catch(err => next(err));
}

function getById(req, res, next) {
    errorService.getById(req.params.id)
        .then(error => error ? res.json(error) : res.sendStatus(404))
        .catch(err => next(err));
}

function update(req, res, next) {
    errorService.update(req.params.id, req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function _delete(req, res, next) {
    errorService.delete(req.params.id)
        .then(() => res.json({}))
        .catch(err => next(err));
}