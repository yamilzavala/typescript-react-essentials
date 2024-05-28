import { useTheme, ThemeContextProvider } from "./context";

const ParentComponent = () => {
  return (
    <ThemeContextProvider>
      <Component/>
    </ThemeContextProvider>
  )
}

function Component() {
  const context = useTheme();
  console.log(context)
  return (
    <div>
      <h2>React & Typescript</h2>
      <h2>Context API</h2>
      <button className='btn btn-center' onClick={() => {
        if(context.theme === 'dark') {
          context.setTheme('system');
          document.body.style.background = 'white'
          document.body.style.color = 'black'
          return;
        }
        context.setTheme('dark');
        document.body.style.background = 'black';
        document.body.style.color = 'white'
      }}>toggle theme</button>
    </div>
  );
}
export default ParentComponent;
