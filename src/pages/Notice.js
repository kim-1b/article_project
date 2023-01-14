import axios from "axios";
import React, { useState } from "react";
import { StoreContext } from "../App";
import { useNavigate } from "react-router-dom";

axios.defaults.withCredentials = true;

function Notice() {
  const navigation = useNavigate();
  const { loginUser } = React.useContext(StoreContext);
  const [notice, setNotice] = React.useState([]);
  const [data, setData] = React.useState({
    body: "",
  });
  const [modalOpen, setModalOpen] = React.useState(false);
  const [num, setNum] = React.useState(0);
  const [num2, setNum2] = React.useState(0);

  const 게시글정보가져 = async () => {
    await axios({
      url: "http://18.183.82.9:4000/notice",
      method: "GET",
    }).then((response) => {
      setNotice(response.data);
    });
  };

  React.useEffect(() => {
    window.addEventListener("click", (event) => {
      if (event.target.className === "modal-bg") {
        setModalOpen(false);
      }
    });
  }, []);
  React.useEffect(() => {
    window.addEventListener("click", (event) => {
      if (event.target.className === "pre-complete") {
        setModalOpen(false);
      }
    });
  }, []);

  React.useEffect(() => {
    게시글정보가져();
  }, []);

  const 메인페이지로이동 = () => {
    navigation("/");
  };

  const 상세정보페이지로이동 = () => {
    window.location.replace("/article/:seq");
  };

  const 데이터변경 = (event) => {
    const name = event.target.name;
    const cloneData = { ...data };
    cloneData[name] = event.target.value;

    setData(cloneData);
  };

  const 작성 = async () => {
    await axios({
      url: "http://18.183.82.9:4000/notice",
      method: "POST",
      data: data,
    }).then((response) => {
      if (response.data.code === "success") {
        window.location.replace("/notice");
      }
    });
  };

  return (
    <div className="top-menu">
      {modalOpen && (
        <div>
          <div className="modal-bg"></div>
          <div className="modal">
            <div className="predict">경기 결과를 예측해주세요.</div>
            <div className="pre-box-1">브라질</div>
            <button
              onClick={() => {
                setNum(num + 1);
              }}
              className="upScore-number1"
            >
              🔺
            </button>
            <button
              onClick={() => {
                setNum(num - 1);
              }}
              className="downScore-number1"
            >
              🔻
            </button>
            <div className="pre-pre">:</div>
            <span>
              <div className="upscore-box1">{num}</div>

              <div className="pre-box-2">대한민국</div>

              <button
                onClick={() => {
                  setNum2(num2 + 1);
                }}
                className="upScore-number2"
              >
                🔺
              </button>
              <div className="downscore-box2">{num2}</div>
            </span>
            <button
              onClick={() => {
                setNum2(num2 - 1);
              }}
              className="downScore-number2"
            >
              🔻
            </button>
            <button className="pre-complete">예측완료</button>
          </div>
        </div>
      )}
      <div className="box-02">
        <h2>
          <button type="button" className="btn" onClick={메인페이지로이동}>
            월드컵 승부예측 게시판
          </button>
        </h2>
      </div>
      <ul>
        <li className="qwqw">
          <div className="match-box">
            <button className="match-box-btn1">
              <span className="match-team">
                <span className="match-team-img">
                  <img
                    className="qw"
                    src="https://sports-phinf.pstatic.net/team/qatar2022/default/4748.png"
                  />
                </span>
              </span>
            </button>

            <button
              className="draw"
              onClick={() => {
                setModalOpen(true);
              }}
            >
              <span className="score-btn">
                <span className="score">
                  <span>
                    {num}vs
                    {num2}
                  </span>
                </span>
              </span>
            </button>

            <button className="match-box-btn2">
              <span className="match-team2">
                <span className="match-team-img2">
                  <img
                    className="qw"
                    src="https://sports-phinf.pstatic.net/team/qatar2022/default/23120.png"
                  />
                </span>
              </span>
            </button>
          </div>
        </li>
      </ul>

      <div style={{ display: "flex", flexDirection: "column", padding: 12 }}>
        <h3>댓글</h3>

        <textarea
          name="body"
          onChange={데이터변경}
          cols="100"
          rows="10"
          placeholder="댓글을 입력해주세요"
        ></textarea>
        <button className="talk" onClick={작성} type="button">
          등록
        </button>
      </div>
      <table className="ui-table">
        <thead></thead>
        <tbody>
          {notice.length > 0 &&
            notice.map((item, index) => {
              return (
                <tr onClick={상세정보페이지로이동} key={index}>
                  <div className="talk-box">
                    <td className="main-talk">
                      {item.body}
                      <td className="talk-nickname">{item.nickname}</td>
                    </td>
                  </div>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
}
export default Notice;
