import axios from 'axios'

 const tasksApi =axios.create({
    baseURL:'http://localhost:8000/tasks/api/v1/tasks/',
 });

export const getAllTasks = ()=>tasksApi.get("/");
export const getTasks = (id)=>tasksApi.get("/"+id+"/");
export const createTasks = (tasks)=>tasksApi.post("/",tasks);
export const deleteTasks = (id)=>tasksApi.delete('/'+id);
export const updateTasks = (id,tasks)=>tasksApi.put('/'+id+'/',tasks)