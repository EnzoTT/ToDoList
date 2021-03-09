import React, { useEffect, useState } from 'react';
import axios from 'axios';


class ToDoList extends React.Component {
    state = {
        task: "",
        taskList: [],
        check: 1,
        date: new Date(),
    }

    getTaskList = () => {
        axios.get('http://localhost:8081/tasks').
        then((response) => response.data).
        then(response => {this.setState({ taskList: response })
    });
    }

    componentDidMount(){
        this.getTaskList();
    }


    onDeleteHandle = (taskid) => {
       axios.delete(`http://localhost:8081/deleteTask/${taskid}`)
       this.getTaskList();
    }

    onSubmitHandle = () => {
        axios.post('http://localhost:8081/addTask', {
            task: this.state.task,
            date: this.state.date,
        })
        this.getTaskList();
    }

    render() {
        return (
            <div>
                <h1>To Do List</h1>
                <div className="ui input">

                    <input value={this.state.task} onChange={e => {
                        this.setState({
                            task: e.target.value
                        })
                    }} placeholder="Sua tarefa" />
                    <input type="date" value={this.state.date} onChange={e => {
                        this.setState({
                            date: e.target.value
                        })
                    }} />

                </div>


                <button className="ui primary button basic" onClick={
                    () => this.onSubmitHandle()
                }>Submit</button>
                <hr />

                <div className="ui cards">
                    {this.state.taskList.map((task) => (
                        <div className="card">
                            <div className="content"></div>
                            <div className="description">
                                {task.task}
                            </div>
                            <div className="meta"> {task.date}</div>
                            <div className="extra content">
                                <div className="ui two buttons">
                                    <div className="ui basic green button">Concluido</div>
                                    <div className="ui basic red button" onClick={
                                        () => this.onDeleteHandle(task.taskid)
                                    }>Deletar</div>
                                </div>
                            </div>
                        </div>
                    ))}
                    </div>
            </div>
        )
    }
}



// function ToDoList() {
//     const [date, setDate] = useState(new Date)
//     const [task, setTask] = useState("")
//     const [taskList, setTaskList] = useState([])
//    const getTaskList = () => {
//         axios.get('http://localhost:8081/tasks').
//             then((response) => response.data).
//             then(response => {
//                 setTaskList( response )
//             });
//     }
//     getTaskList();

//     useEffect(() => {
//         getTaskList();
//         console.log(taskList)
//     }, []);


//     const onDeleteHandle = (taskid) => {
//         axios.delete(`http://localhost:8081/deleteTask/${taskid}`)
//     }

//     const onSubmitHandle = () => {
//         axios.post('http://localhost:8081/addTask', {
//             task: task,
//             date: date,
//         })
//     }


//     const [cards, setCards] = useState(
//         <div className="ui cards">
//         {taskList.map((task) => (
//         <div className="card">
//             <div className="content"></div>
//             <div className="description">
//                {task.task}
//             </div>
//             <div className="meta">
//                {task.date}
//             </div>
//             <div className="extra content">
//                 <div className="ui two buttons">
//                     <div className="ui basic green button">Concluido</div>
//                     <div className="ui basic red button" onClick={onDeleteHandle(task.taskid)}>Deletar</div>
//                 </div>
//             </div>
//         </div>
//         ))} 
//     </div>
//     )

//     return (
//         <div>
//             <h1>To Do List</h1>
//             <div className="ui input">

//                 <input value={task} onChange={e => {
//                     setTask(e.target.value)
//                 }} placeholder="Sua tarefa" />
//                 <input type="date" value={date} onChange={e => {
//                     setDate(e.target.value)
//                 }} />
//             </div>

//             <button className="ui primary button basic" onClick={onSubmitHandle}>Submit</button>
//             <hr />

//            {cards}
//         </div>
//     )
// }
export default ToDoList