import React from 'react'
const AddSelectTask = ({ tasks, onMoveItem }) => {
    const handleSelectTask = (taskId) => {
        onMoveItem(taskId);
    };

    const handleChange = (event) => {
        const selectedTaskId = event.target.value;
        handleSelectTask(selectedTaskId);
    };

    return (
        <div className='select__wrapper' >
            <select className="task" onChange={handleChange}>
                <option className="task__title" value="">...</option>
                {tasks.map((task) => (
                    <option className="task__title" key={task.id} value={task.id}>{task.title}</option>
                ))}
            </select>
        </div>
    );
};

export default AddSelectTask