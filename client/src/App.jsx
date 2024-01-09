import { useEffect,useState } from "react";
import ToDoItem from "./ToDoItem";



const API_BASE=`http://localhost:5000/todo`


function App() {
  const [items,setItems]=useState([]);
  const [input,setInput]=useState("");
  useEffect(()=>{
    GetTodos();
  },[]);

  const handleChange=(e)=>{
    setInput(e.target.value);
  };
  const GetTodos=()=>{
    fetch(API_BASE).then(res=>res.json()).then(data=>setItems(data)).catch(err=>console.log(err))
  }

  const addItem=async()=>{
    if(input===''){
      return

    }
    const data=await fetch(API_BASE+"/new",{
      method:"POST",
      headers:{
        "content-type":"application/json"
      },
      body:JSON.stringify({
        name:input,
      })
    }).then(res=>res.json())
    await GetTodos()
    setInput('')
  }

  

  


  return (
   <div className="bg-blue-300 w-2/3 mx-auto my-10 p-3 rounded-md border-blue-700 border-solid text-center">
    <div className="p-5">
      <h1 className="font-bold text-2xl">To-Do-App</h1>
    </div>
    <div className="flex justify-evenly">
      <input type="text" placeholder="Add Your Task" value={input} onChange={handleChange} className="text-xl mr-7 p-2 rounded-md w-1/2"/>
      <button onClick={addItem} className="bg-green-500 px-3 py-1 rounded-md  hover:bg-green-950"><span className="font-semibold text-white">Add</span></button>
    </div>
    <div >
      {items.map((item)=>{
        const {_id,name}=item
        return <ToDoItem name={name} key={_id} id={_id} setItems={setItems}/>
      })}
    </div>
   </div>
  )
}

export default App
