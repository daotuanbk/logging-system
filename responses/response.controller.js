const express = require('express');
const router = express.Router();
const responseService = require('./response.service');

// routes
router.post('/create', create);
router.get('/search', search);
router.get('/:id', getById);
router.put('/:id', update);
router.delete('/:id', _delete);

module.exports = router;

function create(req, res, next) {
    responseService.create(req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function search(req, res, next) {
    responseService.search(req.query)
        .then(responses => res.json(responses))
        .catch(err => next(err));
}

function getById(req, res, next) {
    responseService.getById(req.params.id)
        .then(response => response ? res.json(response) : res.sendStatus(404))
        .catch(err => next(err));
}

function update(req, res, next) {
    responseService.update(req.params.id, req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function _delete(req, res, next) {
    responseService.delete(req.params.id)
        .then(() => res.json({}))
        .catch(err => next(err));
}