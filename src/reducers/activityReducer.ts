import type { Activity } from "../types"

export type ActivityActions = 
{type:"save-activity", payload: {newActivity: Activity} } |
{type:"set-activeId", payload: {id: Activity["id"]} } |
{type:"delete-activity", payload: {id: Activity["id"]} } |
{type:"restart-app"} //como reinicia todo, no es necesario que reciba un payload

export type ActivityState = {
    activities: Activity[],
    activeId: Activity["id"]
}

const localStorageActivities = ()=>{
    const activities = localStorage.getItem("activities")
    return activities ? JSON.parse(activities) : []
}

export const initialState : ActivityState = {
    activities: localStorageActivities(),
    activeId: ""
}

export const activityReducer = (
    state : ActivityState = initialState,
    actions : ActivityActions
    ) => {

    if(actions.type === "save-activity"){
        let updatedActivity: Activity[] = []
        
        if(state.activeId){
            updatedActivity = state.activities.map(activity=>
                (activity.id === state.activeId ? actions.payload.newActivity : activity)
            )
        }
        else{
            updatedActivity = [...state.activities, actions.payload.newActivity]
        }

        return {
            ...state,
            activities: updatedActivity,
            activeId: ""
        }
    }

    if(actions.type === "set-activeId"){

        return{
            ...state,
            activeId: actions.payload.id
        }
    }

    if(actions.type === "delete-activity"){

        return{
            ...state,
            //aqui retornamos todas las actividades que no coinciden con el id seleccionado
            activities: state.activities.filter(activity => activity.id !== actions.payload.id)
        }
    }
    if(actions.type === "restart-app"){

        return{
            activities: [],
            activeId: ""   
        }
    }

    return state
}
