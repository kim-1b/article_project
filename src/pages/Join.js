import "./Join.css";
import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";

axios.defaults.withCredentials = true;

function Join() {
  const [data, setData] = React.useState({});

  const navigation = useNavigate();

  const 데이터변경 = (event) => {
    const cloneData = { ...data };
    cloneData[event.target.name] = event.target.value;
    setData(cloneData);
  };

  const 가입하기 = async () => {
    await axios({
      url: "18.183.82.9/join",
      method: "POST",
      data: data,
    }).then((response) => {
      if (response.data.message) {
        alert(response.data.message);
      }

      if (response.data.code === "success") {
        navigation("/login");
      }
    });
  };

  return (
    <div className="Join">
      <input
        className="id"
        name="id"
        placeholder="아이디 입력해주세요"
        onChange={데이터변경}
      />
      <input
        className="nick"
        name="nickname"
        placeholder="닉네임을 입력해주세요"
        onChange={데이터변경}
      />
      <input
        className="pw"
        type="password"
        name="pw"
        placeholder="비밀번호를 입력해주세요"
        onChange={데이터변경}
      />
      <button className="join-btn" type="button" onClick={가입하기}>
        회원가입 완료
      </button>
    </div>
  );
}

export default Join;
