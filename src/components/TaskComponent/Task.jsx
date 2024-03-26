import React from "react"
import { Link } from "react-router-dom"

const Task = ({ task }) => {
    return (
        <div className="task">
            <Link to={`/task/${task.id}`}>
                <h3 className="task__title">{task.title}</h3>
            </Link>
        </div>
    )
}

export default Task