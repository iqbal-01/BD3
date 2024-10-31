const express = require('express');
const { resolve } = require('path');
const cors = require('cors');

const app = express();
const port = 3010;

app.use(cors());

app.use(express.static('static'));

let tasks = [
  { taskId: 1, text: 'Fix bug #101', priority: 2 },
  { taskId: 2, text: 'Implement feature #202', priority: 1 },
  { taskId: 3, text: 'Write documentation', priority: 3 },
];

//Endpoint 1. Add a Task to the Task List
// http://localhost:3000/tasks/add?taskId=4&text=Review%20code&priority=1
app.get('/tasks/add', (req, res) => {
  let taskId = req.query.taskId;
  let text = req.query.text;
  let priority = req.query.priority;
  let newTask = { taskId, text, priority };
  tasks = [...tasks, newTask];
  res.json({ tasks });
});
//Endpoint 2. Read All Tasks in the Task List
//<http://localhost:3000/tasks>
app.get('/tasks', (req, res) => {
  res.json({ tasks });
});

//Endpoint 3. Sort Tasks by Priority
//<http://localhost:3000/tasks/sort-by-priority>
app.get('/tasks/sort-by-priority', (req, res) => {
  let newTasks = tasks.slice();
  newTasks = newTasks.sort((a, b) => a.priority - b.priority);
  res.json({ tasks: newTasks });
});
//Endpoint 4. Edit Task Priority
// <http://localhost:3000/tasks/edit-priority?taskId=1&priority=1>
app.get('/tasks/edit-priority', (req, res) => {
  let taskId = parseInt(req.query.taskId);
  let newPriority = parseInt(req.query.priority);
  tasks.map((task) => {
    if (task.taskId === taskId) {
      task.priority = newPriority;
    }
  });
  res.json({ tasks });
});

//Endpoint 5. Edit/Update Task Text
// <http://localhost:3000/tasks/edit-text?taskId=3&text=Update%20documentation>
app.get('/tasks/edit-text', (req, res) => {
  let taskId = parseInt(req.query.taskId);
  let newText = req.query.text;
  tasks.map((task) => {
    if (task.taskId === taskId) {
      task.text = newText;
    }
  });
  res.json({ tasks });
});

//Endpoint 6. Delete a Task from the Task List
// <http://localhost:3000/tasks/delete?taskId=2>

app.get('/tasks/delete', (req, res) => {
  let taskId = parseInt(req.query.taskId);
  tasks = tasks.filter((task) => {
    return task.taskId !== taskId;
  });
  res.json({ tasks });
});

// Endpoint 7. Filter Tasks by Priority
// <http://localhost:3000/tasks/filter-by-priority?priority=1>
app.get('/tasks/filter-by-priority', (req, res) => {
  let priority = parseInt(req.query.priority);
  tasks = tasks.filter((task) => {
    return task.priority === priority;
  });
  res.json({ tasks });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
