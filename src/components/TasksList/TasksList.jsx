import React from "react"
import Task from "../Task/Task"
const TasksList = ({ title, tasks, children }) => {
    return (
        <div className="tasks__list">
            <h3 className='title'>{title || 'Идет Загрузка'}</h3>
            <ul className="tasks__wrapper">
                {tasks.map((task, index) => (
                    <li key={index}>
                        {task && task.title && <Task task={task} />}
                    </li>
                ))}
            </ul>
            {children}
        </div>
    )
}

export default TasksList  
