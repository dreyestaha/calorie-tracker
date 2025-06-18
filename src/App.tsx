import Form from "./components/Form"
import { useReducer } from "react"
import { activityReducer, initialState } from "./reducers/activityReducer"

function App() {
  const [state, dispatch] = useReducer(activityReducer,initialState)

  return (
    <>
      <header className=" bg-amber-600 flex justify-between">
        <h1 className="text-center text-3xl  text-gray-50 align-middle font-bold w-auto p-2 m-5">Contador de Calorías</h1>
        <button className="bg-gray-200 hover:bg-green-500 hover:text-white text-mg text-black font-semibold  px-5 py-2 m-5 rounded-sm">Reiniciar contador</button>
      </header>
      
      <Form
        dispatch ={dispatch}
      />

    </>
  )
}

export default App
