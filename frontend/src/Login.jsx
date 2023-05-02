import { useState } from "react";

let myToken;

function Login() {
  const [userName, setUserName] = useState("");
  const [passWord, setPassWord] = useState("");
  const [money, setMoney] = useState("");

  function handleLogin() {
    const user = {
      userName: userName,
      passWord: passWord,
    };

    const userString = JSON.stringify(user);

    fetch("http://localhost:4002/sessions", {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        //Athorization: "Bearer" + ""
      },
      body: userString,
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("login data:", data);
        myToken = data.token;
      });
  }

  function handleGetAccount() {
    fetch("http://localhost:4002/me/accounts", {
      method: "GET",
      mode: "cors",
      cache: "no-cache",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + myToken,
      },
      //body: userString,
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setMoney(data.money);
      });
  }

  return (
    <div className="">
      <h2 className="text-2xl font-bold mt-4 mb-2 mr-6">Login</h2>
      <div className="mb-4">
        {" "}
        <label>Username: </label>
        <input type="text" onChange={(e) => setUserName(e.target.value)} />
      </div>
      <div>
        <label>Password: </label>
        <input type="password" onChange={(e) => setPassWord(e.target.value)} />
      </div>

      <button
        onClick={handleLogin}
        className=" bg-slate-100 hover:text-blue-600 rounded-md w-20 mt-4 ml-14"
      >
        Login
      </button>

      <div className="">
        <button
          className="bg-slate-100 hover:text-blue-600 rounded-md mt-4 ml-14"
          onClick={handleGetAccount}
        >
          Get Account
        </button>
      </div>
      <div className="ml-14">
        <h2>Amount: {money}</h2>
      </div>
    </div>
  );
}

export default Login;
