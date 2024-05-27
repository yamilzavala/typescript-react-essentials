import { useState } from "react";

type Link = {
  id: number;
  url: string;
  text: string;
}

const navLinks: Link[] = [
  {id: 1, url: 'www.example.com', text: 'some text'},
  {id: 2, url: 'www.example2.com', text: 'any text 2'},
  {id: 3, url: 'www.example3.com', text: 'litle text 3'},
]

function Component() {
  const [list, setList] = useState<string[]>([]);
  const [links, setLinks] = useState<Link[]>(navLinks);
  console.log(list)
  return (
    <div>
      <h2>React & Typescript</h2>
      <button className="btn btn-center" onClick={() => setList(['hi'])}>Click me</button>
      <button className="btn btn-center" onClick={() => setLinks([...links, {id:4, url: 'www.example.com',text: 'others'}])}>Click here</button>
    </div>
  );
}
export default Component;
