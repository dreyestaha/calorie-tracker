import type { Activity } from "../types"
import { categories } from "../data/categories"
import { useMemo } from "react"
import { PencilSquareIcon } from '@heroicons/react/24/outline'

type ActivityListProps = {
    activities: Activity[]
}

export default function ActivityList({activities} : ActivityListProps) {
    const categoryName = useMemo( ()=> (category:Activity["category"]) => categories.map(cat => cat.id === category ? cat.name : "")
    , [activities])
    
  return (
    <>
        <h2 className="font-bold text-center text-gray-50 p-5 text-3xl">Actividades y Calorías</h2>
        {activities.map(activity =>(
            <div key={activity.id} className="bg-gray-100/75 flex justify-between mx-auto my-3 border-2 border-gray-50/80 rounded-sm max-w-4xl">
                <div className=" px-5 py-2 w-3xl" >
                    <p className={`uppercase font-bold text-center text-gray-50 w-30 rounded-2xl 
                        ${activity.category === 1 ? "bg-lime-600":"bg-orange-600"}`}>
                            {categoryName(+activity.category)}
                    </p>
                    <p className="text-lg font-semibold">{activity.name}</p>
                    <p className="text-lg font-bold">{activity.calories} {""} <span>calorías</span></p>
                </div>

                <div className="flex gap-5 items-center">
                    <button className="p-5"
                        onClick={}
                    >
                        <PencilSquareIcon
                            className="h-8 w-8 text-gray-800"
                        />
                    </button>
                </div>
            </div>
        ))}
       
    </>
  )
}
