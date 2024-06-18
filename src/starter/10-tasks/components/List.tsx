import React from 'react';
import { TTask } from '../types/types';

type TProps = {
    tasks: TTask[],
    toggleTask: (id: string) => void
}

const List = ({tasks, toggleTask}: TProps) => {
    return (
        <ul className="list">
            {tasks.map(task => (
                <li key={task.id}>
                    <p className={`task-text ${task.isCompleted ? 'trikethrough' : ''}`}>{task.description}</p>
                    <input type="checkbox" name="toggle" checked={task.isCompleted} onChange={() => toggleTask(task.id)} />
                </li>
            ))}            
        </ul>
    );
};

export default List;