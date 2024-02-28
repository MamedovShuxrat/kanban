import React from 'react'

const Def = () => {
    return (
        <div>
            ссылка на конкретную Таску!
        </div>
    )
}

export default Def
// const handleTaskDrop = (taskId, targetList) => {
//     setTasks(prevTasks => {
//         console.log(prevTasks, taskId);
//         console.log(targetList);
//         const updatedTasks = { ...prevTasks };


//         const taskToMoveIndex = updatedTasks[targetList].find(task => task.id === taskId);

//         if (taskToMoveIndex !== -1) {
//             updatedTasks[targetList] = updatedTasks[targetList].filter(task => task.id !== taskId);
//         }
//         return updatedTasks;
//     });
// };