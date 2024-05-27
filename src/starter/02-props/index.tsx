//import { ReactNode } from "react";
import { type PropsWithChildren } from "react";

type TProps = PropsWithChildren<{
  name: string;
  id: number;
  //children: ReactNode
}>

function Component({name, id, children}: TProps) {
  return (
    <div>
      <h2>Name: {name}t</h2>
      <h2>Id: {id}</h2>
      {children}
    </div>
  );
}
export default Component;
