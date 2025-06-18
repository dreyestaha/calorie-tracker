import type { Activity } from "../types"

type ActivityListProps = {
    activities: Activity[]
}

export default function ActivityList({activities} : ActivityListProps) {
  return (
    <>
        <h2 className="font-bold text-center text-gray-50 p-5 text-3xl">Actividades y Calorías</h2>
        {activities.map(activity =>(
            <div key={activity.id} className="bg-gray-100/75 flex justify-between mx-auto my-3 border-2 border-gray-50/80 rounded-sm max-w-4xl">
                <div className="grid grid-cols-3 px-5 py-2 w-3xl" >
                    <p>{activity.category}</p>
                    <p className="text-lg font-bold">{activity.name}</p>
                    <p className="text-xl font-black">{activity.calories} {""} <span>calorías</span></p>
                </div>

                <div>
                    <p>X</p>
                </div>
            </div>
        ))}
       
    </>
  )
}
