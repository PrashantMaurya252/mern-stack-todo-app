import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import { Todo } from './model/Todo.js';

dotenv.config()
 const app=express();
 app.use(express.json());
 app.use(cors());

 const port=5000;

 const connectionString=process.env.MONGO_URL;
 mongoose.connect(connectionString).then(()=>console.log('Connected to the database')).catch((err)=>console.log('Connection Error',err));

 app.get('/todo',async(req,res)=>{
    const todos=await Todo.find();
    console.log(Todo.find())
    res.json(todos);
 });

 app.post('/todo/new',async (req,res)=>{
    const newTask=await Todo.create(req.body);
    res.status(201).json({newTask});
 });

 app.delete('/todo/delete/:id',async(req,res)=>{
    const result=await Todo.findByIdAndDelete(req.params.id);
    res.json(result)
 })

 app.listen(port,()=> console.log(`App is listening ${port}`));
