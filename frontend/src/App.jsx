import React from 'react'
import Todo from './Todo'
import { ToastContainer } from "react-toastify";

const App = () => {
  return (
    <div>
<ToastContainer position="top-right" autoClose={2000} />
      <Todo/>
    </div>
  )
}

export default App