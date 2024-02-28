
import React from 'react';

function TaskList({ title, children }) {


    return (
        <div className="tasks__list">
            <h3 className='title' >{title}</h3>
            {title === 'Backlog' && children}
        </div>
    );
}

export default TaskList;
