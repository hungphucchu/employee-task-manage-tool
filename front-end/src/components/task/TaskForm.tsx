import React, { useState, useEffect } from 'react';
import { Task } from '../../dto/common.dto';
import '../../css/task/TaskForm.css';

interface TaskFormProps {
  task: Task | null;
  onSave: (task: Task) => void;
  onClose: () => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ task, onSave, onClose }) => {
  const [name, setName] = useState('');
  const [assigner, setAssigner] = useState('');
  const [assignee, setAssignee] = useState('');
  const [status, setStatus] = useState('');

  useEffect(() => {
    if (task) {
      setName(String(task.name));
      setAssigner(String(task.assigner));
      setAssignee(String(task.assignee));
      setStatus(String(task.status));
    } else {
      setName('');
      setAssigner('');
      setAssignee('');
      setStatus('');
    }
  }, [task]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ id: task?.id, name, assigner, assignee, status });
  };

  return (
    <div className="task-form-popup">
      <button className="close-popup" onClick={onClose}>
        X
      </button>
      <form className="task-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Assigner</label>
          <input type="text" value={assigner} onChange={(e) => setAssigner(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Assignee</label>
          <input type="text" value={assignee} onChange={(e) => setAssignee(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Status</label>
          <input type="text" value={status} onChange={(e) => setStatus(e.target.value)} required />
        </div>
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default TaskForm;