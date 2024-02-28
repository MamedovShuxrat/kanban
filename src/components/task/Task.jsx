import React from "react";
import { useSortable } from "@dnd-kit/sortable";
const Task = ({ id, title }) => {
    console.log(id);
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: id })

    return (
        <div
            ref={setNodeRef}
            style={{ transform, transition }}
            {...attributes}
            {...listeners}
            className="task"
        >
            <h2 className="task__title">{title}</h2>
        </div>
    );
};

export default Task;