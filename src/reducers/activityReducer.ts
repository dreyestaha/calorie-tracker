import type { Activity } from "../types"

export type ActivityActions = 
    {type:"save-activity", payload: {newActivity: Activity} } 

type ActivityState = {
    activities: Activity[]
}

export const initialState : ActivityState = {
    activities: []
}

export const activityReducer = (
    //parámetros
    state : ActivityState = initialState,
    actions : ActivityActions
    ) =>{
        //aquí puede ser con un switch o con ifs para cada acción
        if(actions.type === "save-activity"){
            //aquí ocurren las cosas que actualizan el state
            console.log("acción desde el type de 'save activity'")
        }

    return state
}