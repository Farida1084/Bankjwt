import { useState } from "react";
import "./App.css";
import Login from "./Login";

function App() {
  const [userName, setUserName] = useState("");
  const [passWord, setPassWord] = useState("");
  const [email, setEmail] = useState("");

  function handleRegister() {
    const user = {
      userName: userName,
      passWord: passWord,
    };

    const userString = JSON.stringify(user);

    fetch("http://localhost:4002/users", {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: userString,
    }).then((res) => console.log(res));
    // .then((res) => console.log(res))
    // .then((data) => console.log(data));
  }

  return (
    //box-border h-96 w-80 p-4 border-4
    <div className=" bg-slate-200 max-w-md mx-auto rounded-xl shadow-md overflow-hidden md:max-w-2xl justify-center">
      <h2 className="text-2xl font-bold mb-4  ml-16"> Users register</h2>
      <div className="mb-4">
        <label>Username: </label>
        <input type="text" onChange={(e) => setUserName(e.target.value)} />
      </div>
      <div className="mb-4 ml-8">
        <label>Email: </label>
        <input
          type="text"
          onChange={(e) => setEmail(e.target.value)}
          className=""
        />{" "}
      </div>
      <div>
        <label>Password: </label>
        <input type="text" onChange={(e) => setPassWord(e.target.value)} />
      </div>
      <div>
        <button
          onClick={handleRegister}
          className=" bg-slate-100 hover:text-blue-600 rounded-md w-20 mt-4 ml-14"
        >
          Register
        </button>
      </div>
      <Login />
    </div>
  );
}

export default App;
