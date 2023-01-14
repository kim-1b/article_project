import axios from "axios";
import React from "react";
import "./Login.css";
axios.defaults.withCredentials = true;
function Login() {
  const [data, setData] = React.useState({});

  const 데이터변경 = (event) => {
    const cloneData = { ...data };
    cloneData[event.target.name] = event.target.value;
    setData(cloneData);
  };

  const 로그인하기 = async () => {
    await axios({
      url: "http://18.183.82.9:4000/login",
      method: "POST",
      data: data,
    }).then((response) => {
      if (response.data.message) {
        alert(response.data.message);
      }

      if (response.data.code === "success") {
        window.location = "/";
      }
    });
  };
  
  const 회원가입페이지로이동 = () => {
    window.location.replace("/join");
  };

  return (
    <div className="login">
      <input
        className="id"
        name="id"
        placeholder="아이디 입력해주세요"
        onChange={데이터변경}
      />
      <input
        className="pw"
        type="password"
        name="pw"
        placeholder="비밀번호를 입력해주세요"
        onChange={데이터변경}
      />
      <button className="login-btn" type="button" onClick={로그인하기}>
        로그인
      </button>
      <button onClick={회원가입페이지로이동} className="question">
        회원가입을 하지 않으셨나요?
      </button>
    </div>
  );
}

export default Login;
