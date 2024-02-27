import { useDrag } from 'react-dnd';

const Task = ({ id, title }) => {
    const [{ isDragging }, drag] = useDrag({
        type: 'TASK',
        item: { id },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });

    return (
        <div ref={drag} className={`task ${isDragging ? 'dragging' : ''}`}>
            <h2 className="task__title">{title}</h2>
        </div>
    );
};

export default Task;