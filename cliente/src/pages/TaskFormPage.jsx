import{useForm} from'react-hook-form';
import { createTasks, deleteTasks,updateTasks,getTasks } from '../api/tasks.api';
import {useNavigate,useParams} from "react-router-dom";
import { useEffect } from 'react';
import { toast } from 'react-hot-toast';

export function TaskFormPage(){
    const{register,handleSubmit,formState:{
        errors
    },
    setValue,
    } =useForm();
    const navigate= useNavigate();
    const params=useParams()
   // console.log(params);
    const onSubmit=handleSubmit(async data=>{
        if(params.id){
           // console.log(data);
           //updateTasks(params.id,data)
          //  console.log("actualizando");
          await updateTasks(params.id,data)
          toast.success('Tarea actualizada',{
            position:"bottom-right",
            style:{
             background:"#101010",
             color:"#fff"
            }
             })
        }else{
        await createTasks(data);
       /*-- console.log(res);--*/
       toast.success('Tarea creada',{
       position:"bottom-right",
       style:{
        background:"#101010",
        color:"#fff"
       }
        })
    }
    navigate("/tasks")
    });
    useEffect(()=>{
       async function loadtask(){
        if(params.id){
            const res=await getTasks(params.id);
            setValue('title',res.data.title);
            setValue('description',res.data.description)
        }
       }
       loadtask();
    },[]);
    return(
        <div className="max-w-x1 mx-auto">
        <form onSubmit={onSubmit}>
            <input 
            type="text" placeholder="title"
            {...register("title",{required:true})}
            className='bg-zinc-700 p-3 rouded-lg block w-full mb-3'
            />
        {errors.title && <span>error el titulo es requirido</span>}
            <textarea 
            rows="3" 
            placeholder="Description"
             {...register("description",{required:true})}
             className='bg-zinc-700 p-3 rounded-lg block w-full mb-3'
            ></textarea>
        {errors.description && <span>error descripcion requerido</span>}
            <button className='bg-indigo-500 p-3 rounded-lg block w-full mt-3'
            >Save</button>
        </form>
       {params.id &&(
      <div className='flex justify-end'>
         <button 
         className='bg-red-500 p-3 rounded-lg w-48 mt-3'
       onClick={async()=>{
        const accepted=window.confirm("estas seguro");
        if(accepted){
            await deleteTasks(params.id);
            toast.success('Tarea eliminada',{
                position:"bottom-right",
                style:{
                 background:"#101010",
                 color:"#fff"
                },
            });
            navigate("/tasks");
        }
       }}>
            DELETE 
        </button>
      </div>
      )}       
        </div>
    );
}