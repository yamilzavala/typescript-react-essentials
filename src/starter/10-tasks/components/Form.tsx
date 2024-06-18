import React, { useState } from 'react';
import { TTask } from '../types/types';

type TProps = {
    addTask: (task: TTask) => void
}

const Form = ({addTask}:TProps) => {
    const [task, setTask] = useState<string>('');

    const handleSubmit = (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const newTask = {
            id: Date.now().toString(),
            description: task,
            isCompleted: false
        }
        addTask(newTask)
        setTask('');
    }

    return (
        <form className='form task-form' onSubmit={handleSubmit}>           
                <input className='form-input' type="text" required name='task' value={task} onChange={e => setTask(e.target.value)}/>
                <button className='btn'>add task</button>           
        </form>
    );
};

export default Form;