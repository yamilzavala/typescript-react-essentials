import React, { useState } from "react";

type TPerson = {
  name: string;
  email: string;
}

function Component() {
  const [text, setText] = useState('');
  const [email, setEmail] = useState('');

  const handleChange= (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;

    if(name === 'text') {
      setText(value)
    } else {
      setEmail(value)
    }
  }

  const handleSubmit = (e:  React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);

    const person: TPerson = {
      name: data.text as string,
      email: data.email  as string
    }

    console.log(person)

  }

  return (
    <div>      
      <section>
        <h2>Events</h2>
        <form onSubmit={handleSubmit} className="form">
          <input name='text' type='text' className="form-input mb-1" value={text} onChange={handleChange} placeholder="text"/>
          <input name='email' type='email' className="form-input mb-1" value={email} onChange={handleChange} placeholder="email"/>
          <button type="submit" className="btn btn-block">submit</button>
        </form>
      </section>
    </div>
  );
}
export default Component;
