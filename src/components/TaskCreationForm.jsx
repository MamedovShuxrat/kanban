import React, { useState, useRef, useEffect } from 'react'
import { v4 as uuid } from 'uuid'


const TaskCreationForm = ({ onSubmit }) => {
    const [isEditInput, setIsEditInput] = useState(false)
    const [newTaskTitle, setNewTaskTitle] = useState('')
    const inputRef = useRef(null)

    const resetForm = () => {
        setNewTaskTitle('')
    }

    useEffect(() => {
        if (isEditInput) {
            inputRef.current.focus()
        }
    }, [isEditInput])

    const handleAddTask = (e) => {
        e.preventDefault()

        if (newTaskTitle.trim() === '') {
            return
        }
        const newTask = {
            id: uuid(),
            title: newTaskTitle,
            descriptions: 'This task has no description'
        }
        onSubmit(newTask)
        resetForm()
    }

    return (
        < >
            <form className='form' onSubmit={handleAddTask}>
                {isEditInput &&
                    <label className='board__input_wrapper'>
                        <input
                            ref={inputRef}
                            className='board__input'
                            type="text"
                            value={newTaskTitle}
                            onChange={(e) => setNewTaskTitle(e.target.value)}
                            placeholder="Ввидите текст! " />
                    </label>
                }
                {
                    isEditInput ? <button
                        disabled={newTaskTitle.length < 1}
                        className={` submit-btn  ${newTaskTitle.length < 1 ? "disabled" : ""}`}
                        type="submit"
                        onClick={() => setIsEditInput(!isEditInput)}>
                        Submit
                    </button> :
                        <button
                            onClick={() => setIsEditInput(!isEditInput)}
                            className='add__card-btn'
                            type="submit">
                            Add Card
                        </button>
                }
            </form>
        </>
    )
}

export default TaskCreationForm