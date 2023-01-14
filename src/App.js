import React from "react";
import "./App.css";
import Login from "./pages/Login";
import Join from "./pages/Join";
import Main from "./pages/Main";
import Notice from "./pages/Notice";
import Notice2 from "./pages/Notice2";
import Notice3 from "./pages/Notice3";
import Notice4 from "./pages/Notice4";
import Notice5 from "./pages/Notice5";
import Notice6 from "./pages/Notice6";
import Notice7 from "./pages/Notice7";
import Notice8 from "./pages/Notice8";
import Article from "./pages/Article";

import { Route, Routes, useNavigate } from "react-router-dom";
import axios from "axios";

axios.defaults.withCredentials = true;

export const StoreContext = React.createContext({});

function App() {
  const [loginUser, setLoginUser] = React.useState({});

  const 자동로그인 = async () => {
    await axios({
      url: "http://18.183.82.9:3306/autologin",
      method: "POST",
    }).then((response) => {
      console.log(response.data);
      setLoginUser(response.data);
    });
  };
  React.useEffect(() => {
    자동로그인();
  }, []);

  return (
    <StoreContext.Provider
      value={{
        loginUser: loginUser,
      }}
    >
      <Routes>
        <Route exact path="/" element={<Main />} />
        <Route exact path="/join" element={<Join />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/notice" element={<Notice />} />
        <Route exact path="/notice2" element={<Notice2 />} />
        <Route exact path="/notice3" element={<Notice3 />} />
        <Route exact path="/notice4" element={<Notice4 />} />
        <Route exact path="/notice5" element={<Notice5 />} />
        <Route exact path="/notice6" element={<Notice6 />} />
        <Route exact path="/notice7" element={<Notice7 />} />
        <Route exact path="/notice8" element={<Notice8 />} />
        <Route exact path="/article/:seq" element={<Article />} />
      </Routes>
    </StoreContext.Provider>
  );
}

export default App;
