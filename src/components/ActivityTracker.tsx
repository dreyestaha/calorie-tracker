import type { Activity } from "../types"
import { useMemo } from "react"


type ActivityTrackerProps = {
    activities: Activity[]
}

export default function ActivityTracker({activities} : ActivityTrackerProps) {
  
    //contadores
    const caloriesConsumed = useMemo(()=> activities.reduce((total, activity) => activity.category === 1 ? 
        total + activity.calories : total, 0) , [activities]
    )
    const caloriesBurned = useMemo(()=> activities.reduce((total, activity) => activity.category === 2 ? 
        total + activity.calories : total, 0) , [activities]
    )
    const caloryBalance = useMemo(()=> activities.reduce((total, activity) => activity.category === 2 ? 
        caloriesConsumed - caloriesBurned : total, 0) , [activities]
    )
  
    return (
    <>
        <h2 className="text-3xl font-bold text-center text-gray-50">Calorías totales</h2>
        <div className="grid grid-cols-3 py-5 text-center text-xl text-gray-50">
            <p><span className="font-bold">Calorías consumidas:</span>{" "}{caloriesConsumed}</p>
            <p><span className="font-bold">Calorías quemadas:</span>{" "}{caloriesBurned}</p>
            <p><span className="font-bold">Balance de calorías:</span>{" "}{caloryBalance}</p>
        </div>
    </>
  )
}
