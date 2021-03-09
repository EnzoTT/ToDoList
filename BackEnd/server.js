const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const connection = require('./db')

const app = express();


app.use(bodyParser.json())
app.use(cors());

app.get('/tasks',(req,res)=>{
    const TASK_QUERY = "select * from todolistmanager.tasks"
    connection.query(TASK_QUERY,(err, response)=>{
        if(err) console.log(err)
        else res.send(response)
    })
})

app.post('/addTask',(req,res)=>{
    const ADD_QUERY =`insert into todolistmanager.tasks (task, date) values('${req.body.task}', '${req.body.date}')`
    connection.query(ADD_QUERY,(err)=>{
        if(err) console.log(err)
        else res.send('Tarefa foi adicionada')
    })
})

app.delete('/deleteTask/:taskid',(req,res)=>{
    console.log(req.params.taskid)
    const DELETE_QUERY = `delete from todolistmanager.tasks where (taskid = ${req.params.taskid})`
    connection.query(DELETE_QUERY,(err)=>{
        if(err) console.log(err)
    })
})

app.listen(8081, ()=>{
    console.log('running on port 8081')
})