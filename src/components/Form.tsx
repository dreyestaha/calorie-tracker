import {useEffect, useState, type Dispatch } from "react"
import  {v4 as uuidv4 } from "uuid"
import { categories } from "../data/categories"

import type { Activity } from "../types"
import type { ActivityActions, ActivityState } from "../reducers/activityReducer"

type FormProps = {
  dispatch: Dispatch<ActivityActions>,
  state: ActivityState  
}

const initialActivityState : Activity ={
    id: uuidv4(),
    category: 1,
    name: "",
    calories: 0
  } 

export default function Form({dispatch, state} : FormProps) {
  const [activity, setActivity] = useState<Activity>(initialActivityState)

  //con useEffect "escuchamos" si hay un activeId
  useEffect(()=>{
    if(state.activeId){
      const selectedActiveID = state.activities.filter(stateActivity => stateActivity.id === state.activeId)[0]
      setActivity(selectedActiveID)
    }
  }, [state.activeId])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>)=>{
    const isNumberType = ["category","calories"].includes(e.target.id)
    setActivity(
      {
        ...activity,
        [e.target.id]: isNumberType ? +e.target.value : e.target.value
      }
    )
  }

  const isValid = ()=>{
    const {name, calories} = activity
    return (name.trim() !== "" && calories>0)
  }

  const handleSubmit= (e : React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault()

    dispatch({type:"save-activity", payload: {newActivity : activity}})
    setActivity({
      ...initialActivityState,
      id: uuidv4()
    })
  }

  return (
    <section className="bg-cyan-700 w-auto p-5 flex justify-center">
        <form 
          className=" bg-gray-50 p-3 m-2 rounded-lg w-xl justify-center"
          onSubmit={handleSubmit}
          >
          <div className=" p-2 m-1 border-slate-200 border-2 rounded-md flex justify-between ">
            <label htmlFor="category" className="font-medium p-1" >Categoría</label>
            <select 
              name="category" 
              className="p-1 w-full text-center" 
              id="category"
              value={activity.category}
              onChange={handleChange}
              >
              {categories.map(category =>(
                <option value={category.id} key={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          
          <div className="border-2 p-2 m-1 border-slate-200 rounded-md flex">
            <label htmlFor="name" className="pr-2 font-medium">Actividad:</label>
            <input 
              type="text" 
              id="name" 
              className="w-full"
              placeholder="Ingresa tu actividad o comida..."
              value={activity.name}
              onChange={handleChange}
              />
          </div>

          <div className="border-2 p-2 m-1 border-slate-200 rounded-md flex">
            <label htmlFor="calories" className="pr-2 font-medium">Calorías:</label>
            <input 
              type="number" 
              id="calories" 
              className="w-full"
              placeholder="Calorías de la comida o actividad"
              value={activity.calories}
              onChange={handleChange}
              />
          </div>
          <div className="flex">
            <input 
              type="submit" 
              className="w-full bg-green-400 text-black font-semibold disabled:opacity-10 rounded-md py-2 m-1"
              value={activity.category === 1 ? "Guardar Comida" : "Guardar Ejercicio"}
              onChange={handleChange}
              disabled={!isValid()}
            />
          </div>
        </form>

    </section>
    
  )
}
