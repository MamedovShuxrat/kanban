import React from "react";

const Task = ({ title }) => {
    return (
        <div className="task">
            <h3 className="task__title">{title}</h3>
        </div>
    );
};

export default Task;