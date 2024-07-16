import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTask, moveTask, filterTasks } from '../store/taskSlice';
import TaskCard from './TaskCard';
import AddTaskForm from './AddTaskForm';
import './KanbanBoard.css';

const KanbanBoard = () => {
  const dispatch = useDispatch();
  const { tasks, filteredTasks, query } = useSelector(state => state.tasks);

  const stages = ['To Do', 'In Progress', 'Peer Review', 'Done'];

  const handleAddTask = (task) => {
    dispatch(addTask(task));
  };

  const handleMoveTask = (taskId, newStage) => {
    dispatch(moveTask({ taskId, newStage }));
  };

  const handleSearch = (e) => {
    dispatch(filterTasks(e.target.value));
  };

  const tasksToDisplay = query ? filteredTasks : tasks;

  return (
    <div className="kanban-board">
            <div className="search">
            <input
                type="text"
                placeholder="Search tasks..."
                value={query}
                onChange={handleSearch}
                className='banner'
            />
            </div>
      <div className="board-columns">
        {stages.map(stage => (
          <div key={stage} className="column" onDragOver={(e) => e.preventDefault()} onDrop={(e) => {
            const taskId = e.dataTransfer.getData('taskId');
            handleMoveTask(taskId, stage);
          }}>
            <h2>{stage}</h2>
            {tasksToDisplay
              .filter(task => task.stage === stage)
              .map(task => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onMoveTask={handleMoveTask}
                />
              ))}
          </div>
        ))}
      </div>
      <AddTaskForm onAddTask={handleAddTask} />
    </div>
  );
};

export default KanbanBoard;

