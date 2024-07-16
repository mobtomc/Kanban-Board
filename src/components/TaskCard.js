import React from 'react';

const TaskCard = ({ task, onMoveTask }) => {
  const handleDragStart = (e) => {
    e.dataTransfer.setData('taskId', task.id);
  };

  const handleDrop = (e) => {
    const taskId = e.dataTransfer.getData('taskId');
    onMoveTask(taskId, task.stage);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  return (
    <div
      className="task-card"
      draggable
      onDragStart={handleDragStart}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
    >
      <h3>{task.title}</h3>
      <p>{task.description}</p>
    </div>
  );
};

export default TaskCard;
