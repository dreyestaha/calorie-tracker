import Form from "./components/Form"
import ActivityList from "./components/ActivityList"
import ActivityTracker from "./components/ActivityTracker"
import { useReducer, useEffect, useMemo } from "react"
import { activityReducer, initialState } from "./reducers/activityReducer"

function App() {
  const [state, dispatch] = useReducer(activityReducer,initialState)
  
  //conservamos en localStorage
  useEffect(()=>{
    localStorage.setItem("activities", JSON.stringify(state.activities))
  }, [state.activities])

  //función para saber si podemos reiniciar la app
  const canRestartApp = () => useMemo(()=> state.activities.length,[state.activities])

  return (
    <div>
      <header className=" bg-amber-600 flex justify-between">
        <h1 className="text-center text-3xl  text-gray-50 align-middle font-bold w-auto p-2 m-5">Contador de Calorías</h1>
        <button 
          className="bg-gray-200 border-0 hover:bg-green-500 hover:text-white text-mg text-black font-semibold  px-5 py-2 m-5 rounded-sm disabled:opacity-50 disabled:hover:bg-gray-200 disabled:hover:text-black"
          onClick={()=> dispatch({type:"restart-app"})} 
          disabled={!canRestartApp()} 
        >Reiniciar contador</button>
      </header>
      <section>
        <Form
          dispatch ={dispatch}
          state={state}
        />
      </section>
      <section className="py-5 max-w-3xl mx-auto">
        <ActivityTracker
          activities={state.activities}
        />
      </section>
      <section className="wx-auto justify-center ">
        <ActivityList
          activities= {state.activities}
          dispatch ={dispatch}
        />
      </section>

    </div>
  )
}

export default App
