const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();

const todoJsonFilePath = path.join(__dirname, './../fakedata/data.json');

const dataString = fs.readFileSync(todoJsonFilePath);
const allData = JSON.parse(dataString);

router.get('/', (req, res) => {
    res.sendFile('index.html');
});

router.get('/api/todos', (req, res) => {
    res.json({
        'message': 'ToDo list',
        'data': allData.todos
    });
});

router.post('/api/todos', (req, res) => {
    const submitData = req.body;
    const id = allData.todos_pk + 1;
    const newTask = { ...submitData, id };
    allData.todos.push(newTask);
    allData.todos_pk = id;
    const dataString = JSON.stringify(allData);
    fs.writeFileSync(todoJsonFilePath, dataString);
    res.json({
        'message': 'ToDo is successfully created',
        'data': newTask
    });
});

router.delete('/api/todos/:id', (req, res) => {
    const removeId = parseInt(req.params.id);
    const todos = allData.todos.filter(task => task.id !== removeId);
    allData.todos = todos;
    const dataString = JSON.stringify(allData);
    fs.writeFileSync(todoJsonFilePath, dataString);
    res.json({
        'message': 'ToDo is successfully removed',
        'data': removeId
    });
});

module.exports = router;