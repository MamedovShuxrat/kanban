import React from "react";
import Task from "../Task/Task";

const TasksList = ({ title, tasks, children }) => {
    console.log(tasks.id, 'id');
    console.log(tasks, 'tasks');
    return (
        <div className="tasks__list">
            <h3 className='title'>{title || 'Идет Загрузка'}</h3>
            <ul className="tasks__wrapper">
                {tasks.map(task => (
                    <li key={task.id}>
                        {task && task.title && <Task title={task.title} />}
                        {console.log(tasks.id, 'id')}
                    </li>
                ))}
            </ul>
            {children}
        </div>
    );
}

export default TasksList;
