import { useState, ChangeEvent } from "react";
import { useMount, useUpdateEffect } from 'react-use'
import { v4 as createId } from 'uuid'
import * as types from './types'

export const useTasks = () => {
    const [phase, setPhase] = useState<types.phase>("resting");
    const [tasks, setTasks] = useState<types.task[]>([]);
    const [alert, setAlert] = useState<null | string>(null)
    const [name, setName] = useState<string>('')
    const [deleting, setDeleting] = useState<null | string>(null)
  
    useMount(() => {
      const currentString = window.localStorage.getItem('todo-tasks')
      const initialTasks = currentString ? JSON.parse(currentString) : []
      setTasks(initialTasks)
    })
  
    useUpdateEffect(() => {   
      window.localStorage.setItem('todo-tasks', JSON.stringify(tasks))
    }, [tasks])
  
    const handleToResting = () => setPhase('resting')
  
    const handleDelete = () => {
      const newTasks = tasks.filter(({ id }) => id !== deleting)
      setTasks(newTasks)
      setDeleting(null)
    }
  
    const handleToggle = (id: string) => {
      const newTasks = tasks.map((item) => {
        if (item.id !== id) return item
  
        return {
          ...item,
          completed: !item.completed,
        }
      })
      
      setTasks(newTasks)
      setDeleting(null)
    }
  
    const handleAdd = () => {
      if (!name) return setAlert('Value is required')
      
      setTasks([
        ...tasks,
        {
          id: createId(),
          title: name,
          completed: false,
        }
      ])
  
      handleToResting()
      setName('')
    }
  
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => setName(event.target.value)
  
    return {
        tasks,
        name,
        alert,
        phase,
        deleting, 
        handleChange,
        handleAdd,
        handleToggle,
        handleDelete,
        handleToResting,
        setDeleting,
        setPhase,
    }

}

export default useTasks