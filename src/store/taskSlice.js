import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

const initialState = {
  tasks: [],
  filteredTasks: [],
  query: '',
};

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action) => {
      state.tasks.push({ id: uuidv4(), ...action.payload, stage: 'To Do' });
    },
    moveTask: (state, action) => {
      const { taskId, newStage } = action.payload;
      const task = state.tasks.find(task => task.id === taskId);
      if (task) {
        task.stage = newStage;
      }
    },
    filterTasks: (state, action) => {
      state.query = action.payload;
      state.filteredTasks = state.tasks.filter(task =>
        task.title.toLowerCase().includes(action.payload.toLowerCase())
      );
    },
  },
});

export const { addTask, moveTask, filterTasks } = taskSlice.actions;
export default taskSlice.reducer;


