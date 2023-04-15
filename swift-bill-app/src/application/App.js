import React from "react"
import { Routes, Route } from "react-router-dom"
import View from "./invoice/view-invoice"
import Edit from "./invoice/edit-invoice"
import New from "./invoice/new-invoice"
import Home from "./home/home"
import "@fontsource/roboto"
import "./App.css"

const App = () => {
  /* Render */
  return (
    <Routes>
      <Route path="/" element={<Home />}>
        <Route index element={<New />} />
        <Route path="/new" element={<New />} />
        <Route path="/edit" element={<Edit />} />
        <Route path="/view" element={<View />} />
      </Route>
    </Routes>
    
  )
}

export default App;


// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;
