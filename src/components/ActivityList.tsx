import { useMemo, type Dispatch } from "react"
import { categories } from "../data/categories"

import type { Activity } from "../types"
import type { ActivityActions } from "../reducers/activityReducer"

import { PencilSquareIcon, XCircleIcon } from '@heroicons/react/24/outline'

type ActivityListProps = {
    activities: Activity[]
    dispatch: Dispatch<ActivityActions>
}

export default function ActivityList({activities, dispatch} : ActivityListProps) {
    const categoryName = useMemo( ()=> (category:Activity["category"]) => categories.map(cat => cat.id === category ? cat.name : "")
    , [activities])

    const isEmpty = useMemo(() => activities.length === 0 , [activities])
    
  return (
    <>
        <h2 className="font-bold text-center text-gray-50 p-5 text-3xl">Actividades y Calorías</h2>
        
        { isEmpty ? 
            <p className="text-center text-xl p-5 text-gray-100">Aún no hay actividades...</p> :
            activities.map(activity =>(
                <div key={activity.id} className="bg-gray-100/80 flex justify-between mx-auto my-3 shadow-2xl rounded-lg max-w-3xl">
                    <div className=" px-5 py-2 w-3xl" >
                        <p className={`uppercase font-bold text-center text-gray-50 w-30 rounded-2xl 
                            ${activity.category === 1 ? "bg-lime-600":"bg-orange-600"}`}>
                                {categoryName(+activity.category)}
                        </p>
                        <p className="text-lg font-semibold">{activity.name}</p>
                        <p className="text-lg font-bold">{activity.calories} {""} <span>calorías</span></p>
                    </div>

                    <div className="flex gap-5 items-center">
                        {/* Botón para editar */}
                        <button className="pl-5"
                            onClick={() => dispatch({type:"set-activeId", payload: {id: activity.id}})}
                        >
                            <PencilSquareIcon
                                className="h-8 w-8 text-gray-800"
                            />
                        </button>
                        {/* Botón para eliminar actividad */}
                        <button className="pr-5"
                            onClick={() => dispatch({type:"delete-activity", payload: {id: activity.id}})}
                        >
                            <XCircleIcon
                                className="h-8 w-8 text-gray-800 hover:text-red-500"
                            />
                        </button>
                    </div>
                </div>
            ))}
       
    </>
  )
}
