import mongoose from 'mongoose';

const TodoSchema=new mongoose.Schema({name:String});

export const Todo=mongoose.model('Todo',TodoSchema);