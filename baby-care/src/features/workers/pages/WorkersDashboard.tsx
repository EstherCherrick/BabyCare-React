import React from 'react';
import { useGetAllWorkersQuery, useDeleteWorkerMutation } from '../workersApi';
import { Worker } from '../types';
import '../../styles/WorkersDashboard.css';


const WorkersDashboard: React.FC = () => {
  const { data: workers, error, isLoading } = useGetAllWorkersQuery();
  const [deleteWorker] = useDeleteWorkerMutation();

  if (isLoading) return <p>טוען עובדים...</p>;
  if (error) return <p>שגיאה בטעינה</p>;

  return (
    <div>
      <p>ניהול עובדים</p>
      <ul>
        {workers?.map((worker: Worker) => (
          <li key={worker.id}>
            {worker.firstName} {worker.lastName} - {worker.role}
            <button onClick={() => deleteWorker({ id: worker.id, name: worker.firstName })}>
              מחק
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WorkersDashboard;
