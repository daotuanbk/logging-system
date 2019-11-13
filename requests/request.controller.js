const express = require('express');
const router = express.Router();
const requestService = require('./request.service');

// routes
router.post('/create', create);
router.get('/search', search);
router.get('/:id', getById);
router.put('/:id', update);
router.delete('/:id', _delete);

module.exports = router;

function create(req, res, next) {
    requestService.create(req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function search(req, res, next) {
    requestService.search(req.query)
        .then(requests => res.json(requests))
        .catch(err => next(err));
}

function getById(req, res, next) {
    requestService.getById(req.params.id)
        .then(request => request ? res.json(request) : res.sendStatus(404))
        .catch(err => next(err));
}

function update(req, res, next) {
    requestService.update(req.params.id, req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function _delete(req, res, next) {
    requestService.delete(req.params.id)
        .then(() => res.json({}))
        .catch(err => next(err));
}