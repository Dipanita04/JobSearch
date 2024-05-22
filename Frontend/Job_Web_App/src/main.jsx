import React, { useState, createContext } from "react";
//import ReactDOM from "react-dom";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";

export const Context = createContext({ isAuthorized: false });

const AppWrapper = () => {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [user, setUser] = useState({});

  return (
    <Context.Provider value={{ isAuthorized, setIsAuthorized, user, setUser }}>
      <App />
    </Context.Provider>
  );
};

//ReactDOM.createRoot(document.getElementById("root")).render(
// createRoot(document.getElementById("root")).render(
const root = createRoot(document.getElementById("root")); // Create the root once

root.render(
  <React.StrictMode>
    <AppWrapper />
  </React.StrictMode>
);

// import React, { useState, createContext } from "react";
// import ReactDOM from "react-dom";
// import App from "./App.jsx";

// export const Context = createContext({ isAuthorized: false });

// const AppWrapper = () => {
//   const [isAuthorized, setIsAuthorized] = useState(false);
//   const [user, setUser] = useState({});

//   return (
//     <Context.Provider value={{ isAuthorized, setIsAuthorized, user, setUser }}>
//       <App />
//     </Context.Provider>
//   );
// };

// ReactDOM.createRoot(document.getElementById("root")).render(
//   <React.StrictMode>
//     <AppWrapper />
//   </React.StrictMode>
// );
