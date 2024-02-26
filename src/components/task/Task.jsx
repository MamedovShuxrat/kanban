import React from "react";

import { useDrag } from 'react-dnd';


const Task = ({ id, title }) => {
    const [{ isDragging }, drag] = useDrag({
        item: { type: "TASK", id },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging()
        })
    })
    return (
        <div ref={drag} className="task" style={{ opacity: isDragging ? 0.5 : 1 }}>
            {title}
        </div>
    )
}

export default Task