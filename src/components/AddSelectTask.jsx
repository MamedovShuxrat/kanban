import React, { useState } from 'react'

const AddSelectTask = ({ tasks, onMoveItem }) => {
    const [isAddSelect, setIsAddSelect] = useState(false)
    const handleSelectTask = (taskId) => {
        onMoveItem(taskId)
        setIsAddSelect(false)
    }

    const handleChange = (event) => {
        const selectedTaskId = event.target.value
        handleSelectTask(selectedTaskId)
    }

    return (
        <div className='select__wrapper' >
            {isAddSelect ?
                (<select className="task" onChange={handleChange}>
                    <option className="task__title" value="">...</option>
                    {tasks.map((task) => (
                        <option className="task__title" key={task.id} value={task.id}>{task.title}</option>
                    ))}
                </select>) : (<button
                    disabled={tasks.length < 1}
                    onClick={() => setIsAddSelect(!isAddSelect)}
                    className={`add__card-btn  ${tasks.length < 1 ? "disabled" : ""}`}
                    type="button">
                    Add Card
                </button>)}

        </div>
    )
}

export default AddSelectTask


