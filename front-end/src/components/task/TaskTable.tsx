import React, { useEffect, useState } from 'react';
import '../../css/task/TaskTable.css';
import TaskForm from './TaskForm';
import Popup from '../common/PopUp';
import { useUserContext } from '../context/UserContext';
import ApiHelper from '../../helper/api-helper';
import { Task } from '../../dto/common.dto';

const TaskTable: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [currentTask, setCurrentTask] = useState<Task | null>(null);
  const { user } = useUserContext();

  const fetchTasks = async () => {
    try {
      const taskReq = !user?.employeeId ? { assigner: user?.username } : { assignee: user?.username };
      const taskRes = await ApiHelper.getAllTaskByCriteria(taskReq);
      if (taskRes.success && taskRes.tasks) {
        setTasks(taskRes.tasks);
      }
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await ApiHelper.deleteTask({ id });
      setTasks(tasks.filter(task => task.id !== id));
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const handleEdit = (task: Task) => {
    setCurrentTask(task);
    setIsEdit(true);
    setIsPopupOpen(true);
  };

  const handleCreate = () => {
    setCurrentTask(null);
    setIsEdit(false);
    setIsPopupOpen(true);
  };

  const handleAssign = async (id: string) => {
    const newAssignee = prompt('Enter new assignee');
    if (newAssignee) {
      try {
        const updatedTask = tasks.find(task => task.id === id);
        if (updatedTask) {
          updatedTask.assignee = newAssignee;
          await ApiHelper.editTask(updatedTask);
          setTasks(tasks.map(task => (task.id === id ? updatedTask : task)));
        }
      } catch (error) {
        console.error('Error assigning task:', error);
      }
    }
  };

  const handleSave = async (task: Task) => {
    try {
      if (isEdit) {
        await ApiHelper.editTask(task);
        setTasks(tasks.map(t => (t.id === task.id ? task : t)));
      } else {
        const newTaskRes = await ApiHelper.createTask(task);
        if (newTaskRes && newTaskRes.success) {
          setTasks(prevTasks => [...prevTasks, { ...task, id: newTaskRes.id }]);
        }
      }
      setIsPopupOpen(false);
    } catch (error) {
      console.error('Error saving task:', error);
    }
  };

  return (
    <div className="task-table">
      <button onClick={handleCreate}>Create Task</button>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Assigner</th>
            <th>Assignee</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map(task => (
            <tr key={task.id}>
              <td>{task.name}</td>
              <td>{task.assigner}</td>
              <td>{task.assignee}</td>
              <td>{task.status}</td>
              <td>
                <button onClick={() => handleEdit({...task, id: task.id})}>Edit</button>
                <button onClick={() => handleDelete(String(task.id))}>Delete</button>
                <button onClick={() => handleAssign(String(task.id))}>Assign</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {isPopupOpen && (
        <Popup>
          <TaskForm task={currentTask} onSave={handleSave} onClose={() => setIsPopupOpen(false)} />
        </Popup>
      )}
    </div>
  );
};

export default TaskTable;
