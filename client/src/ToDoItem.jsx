import { useState } from "react"

const API_BASE='http://localhost:5000/todo';
const ToDoItem = (props) => {
    const {name,id,setItems}=props;
    const deleteTodo=async(id)=>{
      try {
        const response=await fetch(API_BASE+"/delete/"+id,{
          method:"DELETE",
        });
        if(!response.ok){
          throw new Error("Failed to Delete to Task")
        }
        const data=await response.json()
        setItems(items=>items.filter(item=>item._id!==data._id))
      } catch (error) {
        console.error("error updating task status:",error)
      }
    }
  return (
    <div className="flex justify-between  p-5 bg-blue-950 m-5 w-1/2 rounded-xl mx-auto">
        <div className="font-semibold text-xl text-white">{name}</div>
        <div className=" p-1 rounded-md text-center hover:bg-red-400"><span className="text-white font-extrabold text-xl hover:cursor-pointer" onClick={()=>deleteTodo(id)}>X</span></div>
    </div>
  )
}

export default ToDoItem