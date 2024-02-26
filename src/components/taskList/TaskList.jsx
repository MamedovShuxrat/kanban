import React from 'react';
import { useDrop } from 'react-dnd';

import './taskList.scss'

function TaskList({ title, tasks, onTaskDrop, children }) {
    const [, drop] = useDrop({
        accept: 'TASK',
        drop(item, monitor) {
            onTaskDrop(item.id, title);
        },
    });

    return (
        <div ref={drop} className="tasks__list">
            <h3 className='title' >{title}</h3>
            {title === 'Backlog' && children}
            {tasks.map(task => (
                <div key={task.id}>{task.title}</div>
            ))}
        </div>
    );
}

export default TaskList;
