// Importamos el tipo Activity, que define la estructura de una actividad
import type { Activity } from "../types"

// Definimos los tipos posibles de acciones que puede manejar el reducer.
// En este caso, solo hay una: "save-activity", que trae un nuevo objeto Activity en su payload.
export type ActivityActions = 
    {type:"save-activity", payload: {newActivity: Activity} } 

// Definimos cómo luce el estado que maneja este reducer: tiene un arreglo de actividades.
type ActivityState = {
    activities: Activity[]
}

// Estado inicial: un objeto con una propiedad `activities` que comienza como un arreglo vacío.
export const initialState : ActivityState = {
    activities: []
}

// Esta es la función reducer. 
// Recibe dos cosas: el estado actual (`state`) y una acción (`actions`).
// Si no se pasa un estado, se usará `initialState` como valor por defecto.
export const activityReducer = (
    state : ActivityState = initialState,
    actions : ActivityActions
    ) => {

    // Comprobamos qué tipo de acción se recibió.
    if(actions.type === "save-activity"){
        // Si la acción es "save-activity", devolvemos un nuevo estado:

        return {
            // Copiamos el estado anterior (por si hay más propiedades)
            ...state,
            // Actualizamos la lista de actividades, agregando la nueva actividad al final
            activities: [...state.activities, actions.payload.newActivity]
        }
    }

    // Si la acción no es reconocida, devolvemos el estado sin cambios
    return state
}
