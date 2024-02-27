import React from 'react';
import { useDrop } from 'react-dnd';

function TaskList({ title, onTaskDrop, children }) {
    const [, drop] = useDrop({
        accept: "TASK",
        drop(item, monitor) {
            onTaskDrop(item.id, title);
        },
    });

    return (
        <div ref={drop} className="tasks__list">
            <h3 className='title' >{title}</h3>
            {title === 'Backlog' && children}

        </div>
    );
}

export default TaskList;
