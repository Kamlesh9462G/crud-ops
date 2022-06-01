const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Todos = require('../models/todo');

const crudRouter = express.Router();

crudRouter.use(bodyParser.json());

crudRouter.route('/')
.get((req,res,next)=>{
    Todos.find({})
    .then((Todos) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(Todos);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post((req,res,next)=>{
    Todos.create(req.body)
    .then((Todo) => {
        console.log('Todo Created ', Todo);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(Todo);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.put((req,res,next)=>{
    res.statusCode = 403;
    res.end('PUT operation not supported on /Todos');
})
.delete((req,res,next)=>{
    Todos.remove({})
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));    
})


crudRouter.route('/:ItemId')
.get((req,res,next) => {
    Todos.findById(req.params.ItemId)
    .then((Todo) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(Todo);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post((req, res, next) => {
    res.statusCode = 403;
    res.end('POST operation not supported on /Todos/'+ req.params.ItemId);
})
.put((req, res, next) => {
    Todos.findByIdAndUpdate(req.params.ItemId, {
        $set: req.body
    }, { new: true })
    .then((Todo) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(Todo);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.delete((req, res, next) => {
    Todos.findByIdAndRemove(req.params.ItemId)
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));
});

module.exports = crudRouter;