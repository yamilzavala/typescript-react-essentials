
type TAdvance = {
  name: string;
  type: 'advance';
  email: string;
}
type TBasic = {
  name: string;
  type: 'basic'
}

type TComponent = TAdvance | TBasic;

function Component(props: TComponent) {
  const {name, type} = props;

  if(type === 'basic') {
    return (
      <article className='alert alert-success'>
        <h2>User: {name}</h2>
      </article>
    );
  }
  return (
    <article className='alert alert-danger'>
      <h2>User: {name}</h2>
      {props.email && <h2>Email: {props.email}</h2>}
    </article>
  );
}
export default Component;
