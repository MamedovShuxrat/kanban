import React, { useState } from 'react'
import { useParams, Link, } from 'react-router-dom'

const TaskDetailPage = ({ backlogTasks, readyTasks, inProgressTasks, finishedTasks, onUpdateTask }) => {
  const { id } = useParams()
  const task = backlogTasks.find(task => task.id === id)
    || readyTasks.find(task => task.id === id)
    || inProgressTasks.find(task => task.id === id)
    || finishedTasks.find(task => task.id === id)

  const [isEditing, setIsEditing] = useState(false)
  const [editedDescriptions, setEditedDescriptions] = useState(task.descriptions)

  const handleDescriptionsChange = (e) => {
    setEditedDescriptions(e.target.value)
  }

  const handleSaveDescriptions = () => {
    onUpdateTask({ ...task, descriptions: editedDescriptions })
    setIsEditing(false)
  }

  if (!task) {
    return <div>Задача не найдена</div>
  }

  return (
    <div className="tasks__list task-center" >
      <div className="tasks__details_wrapper">
        <h2 className='tasks__details_title'>{task.title}</h2>
        <Link to='/' >
          <span className='task__datails_exit'>Exit</span>
        </Link>
      </div>
      {isEditing ? (
        <textarea className='task__textarea' value={editedDescriptions} onChange={handleDescriptionsChange} />
      ) : (
        <div className="task">
          <p className="task__title " onClick={() => setIsEditing(true)}>
            {task.descriptions}
          </p>
        </div>
      )}
      {isEditing && (
        <button className="task__descriptions_btn" onClick={handleSaveDescriptions}>Save Descriptions</button>
      )}
    </div>

  )
}

export default TaskDetailPage 
