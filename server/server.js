/**
 * 서버 설정 먼저 해주세요
 * 참고 : https://to2.kr/d9o
 */
const express = require("express");
const cors = require("cors");
const session = require("express-session");
const mysql = require("mysql2");
const db = mysql.createPoolCluster();

const app = express();
const port = 4000;

app.use(express.json());
app.use(
  session({
    secret: "SECRET",
    resave: false,
    saveUninitialized: true,
  })
);

app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

db.add("article_project", {
  host: "127.0.0.1",
  user: "root",
  password: "",
  database: "article_project",
  port: 3306,
});

function 디비실행(query) {
  return new Promise(function (resolve, reject) {
    db.getConnection("article_project", function (error, connection) {
      if (error) {
        console.log("디비 연결 오류", error);
        reject(true);
      }

      connection.query(query, function (error, data) {
        if (error) {
          console.log("쿼리 오류", error);
          reject(true);
        }

        resolve(data);
      });

      connection.release();
    });
  });
}

app.get("/", (req, res) => {
  res.send("Hello");
});

app.post("/autoLogin", (req, res) => {
  res.send(req.session.loginUser);
});

app.post("/login", async (req, res) => {
  const { id, pw } = req.body;

  const result = {
    code: "success",
    message: "로그인 되었습니다",
  };

  if (id === "") {
    result.code = "fail";
    result.message = "아이디를 입력해주세요";
  }

  if (pw === "") {
    result.code = "fail";
    result.message = "비밀번호를 입력해주세요";
  }

  const user = await 디비실행(
    `SELECT * FROM user WHERE id='${id}' AND password = '${pw}'`
  );

  if (user.length === 0) {
    result.code = "fail";
    result.message = "아이디가 존재하지 않습니다";
  }

  if (result.code === "fail") {
    res.send(result);
    return;
  }

  req.session.loginUser = user[0];
  req.session.save();

  res.send(result);
});

app.post("/join", async (req, res) => {
  const { id, nickname, pw } = req.body;

  const result = {
    code: "success",
    message: "회원가입 되었습니다",
  };

  if (id === "") {
    result.code = "fail";
    result.message = "아이디를 입력해주세요";
  }

  if (pw === "") {
    result.code = "fail";
    result.message = "비밀번호를 입력해주세요";
  }

  const user = await 디비실행(`SELECT * FROM user WHERE id='${id}'`);

  if (user.length > 0) {
    result.code = "fail";
    result.message = "이미 동일한 아이디가 존재합니다";
  }

  if (result.code === "fail") {
    res.send(result);
    return;
  }

  await 디비실행(
    `INSERT INTO user(id,password,nickname) VALUES('${id}','${pw}','${nickname}')`
  );

  res.send(result);
});

app.get("/notice", async (req, res) => {
  const query = `SELECT * FROM notice AS a, user AS b WHERE a.user_seq = b.seq`;
  const notice = await 디비실행(query);
  res.send(notice);
});
app.get("/notice2", async (req, res) => {
  const query = `SELECT * FROM notice2 AS a, user AS b WHERE a.user_seq = b.seq`;
  const notice2 = await 디비실행(query);
  res.send(notice2);
});
app.get("/notice3", async (req, res) => {
  const query = `SELECT * FROM notice3 AS a, user AS b WHERE a.user_seq = b.seq`;
  const notice3 = await 디비실행(query);
  res.send(notice3);
});
app.get("/notice4", async (req, res) => {
  const query = `SELECT * FROM notice4 AS a, user AS b WHERE a.user_seq = b.seq`;
  const notice4 = await 디비실행(query);
  res.send(notice4);
});
app.get("/notice5", async (req, res) => {
  const query = `SELECT * FROM notice5 AS a, user AS b WHERE a.user_seq = b.seq`;
  const notice5 = await 디비실행(query);
  res.send(notice5);
});
app.get("/notice6", async (req, res) => {
  const query = `SELECT * FROM notice6 AS a, user AS b WHERE a.user_seq = b.seq`;
  const notice6 = await 디비실행(query);
  res.send(notice6);
});
app.get("/notice7", async (req, res) => {
  const query = `SELECT * FROM notice7 AS a, user AS b WHERE a.user_seq = b.seq`;
  const notice7 = await 디비실행(query);
  res.send(notice7);
});
app.get("/notice8", async (req, res) => {
  const query = `SELECT * FROM notice8 AS a, user AS b WHERE a.user_seq = b.seq`;
  const notice8 = await 디비실행(query);
  res.send(notice8);
});
app.post("/notice", async (req, res) => {
  const { title, body } = req.body;

  const { loginUser } = req.session;

  const result = {
    code: "success",
    message: "작성되었습니다.",
  };

  if (body === "") {
    result.code = "fail";
    result.message = "내용을 입력해주세요";
  }

  if (result.code === "fail") {
    res.send(result);
    return;
  }

  const query = `INSERT INTO notice (title, body, user_seq) VALUES('${title}', '${body}', '${loginUser.seq}')`;

  await 디비실행(query);

  res.send(result);
});
app.post("/notice2", async (req, res) => {
  const { title, body } = req.body;

  const { loginUser } = req.session;

  const result = {
    code: "success",
    message: "작성되었습니다.",
  };

  if (body === "") {
    result.code = "fail";
    result.message = "내용을 입력해주세요";
  }

  if (result.code === "fail") {
    res.send(result);
    return;
  }

  const query = `INSERT INTO notice2 (title, body, user_seq) VALUES('${title}', '${body}', '${loginUser.seq}')`;

  await 디비실행(query);

  res.send(result);
});
app.post("/notice3", async (req, res) => {
  const { title, body } = req.body;

  const { loginUser } = req.session;

  const result = {
    code: "success",
    message: "작성되었습니다.",
  };

  if (body === "") {
    result.code = "fail";
    result.message = "내용을 입력해주세요";
  }

  if (result.code === "fail") {
    res.send(result);
    return;
  }

  const query = `INSERT INTO notice3 (title, body, user_seq) VALUES('${title}', '${body}', '${loginUser.seq}')`;

  await 디비실행(query);

  res.send(result);
});
app.post("/notice4", async (req, res) => {
  const { title, body } = req.body;

  const { loginUser } = req.session;

  const result = {
    code: "success",
    message: "작성되었습니다.",
  };

  if (body === "") {
    result.code = "fail";
    result.message = "내용을 입력해주세요";
  }

  if (result.code === "fail") {
    res.send(result);
    return;
  }

  const query = `INSERT INTO notice4 (title, body, user_seq) VALUES('${title}', '${body}', '${loginUser.seq}')`;

  await 디비실행(query);

  res.send(result);
});
app.post("/notice5", async (req, res) => {
  const { title, body } = req.body;

  const { loginUser } = req.session;

  const result = {
    code: "success",
    message: "작성되었습니다.",
  };

  if (body === "") {
    result.code = "fail";
    result.message = "내용을 입력해주세요";
  }

  if (result.code === "fail") {
    res.send(result);
    return;
  }

  const query = `INSERT INTO notice5 (title, body, user_seq) VALUES('${title}', '${body}', '${loginUser.seq}')`;

  await 디비실행(query);

  res.send(result);
});
app.post("/notice6", async (req, res) => {
  const { title, body } = req.body;

  const { loginUser } = req.session;

  const result = {
    code: "success",
    message: "작성되었습니다.",
  };

  if (body === "") {
    result.code = "fail";
    result.message = "내용을 입력해주세요";
  }

  if (result.code === "fail") {
    res.send(result);
    return;
  }

  const query = `INSERT INTO notice6 (title, body, user_seq) VALUES('${title}', '${body}', '${loginUser.seq}')`;

  await 디비실행(query);

  res.send(result);
});
app.post("/notice7", async (req, res) => {
  const { title, body } = req.body;

  const { loginUser } = req.session;

  const result = {
    code: "success",
    message: "작성되었습니다.",
  };

  if (body === "") {
    result.code = "fail";
    result.message = "내용을 입력해주세요";
  }

  if (result.code === "fail") {
    res.send(result);
    return;
  }

  const query = `INSERT INTO notice7 (title, body, user_seq) VALUES('${title}', '${body}', '${loginUser.seq}')`;

  await 디비실행(query);

  res.send(result);
});
app.post("/notice8", async (req, res) => {
  const { title, body } = req.body;

  const { loginUser } = req.session;

  const result = {
    code: "success",
    message: "작성되었습니다.",
  };

  if (body === "") {
    result.code = "fail";
    result.message = "내용을 입력해주세요";
  }

  if (result.code === "fail") {
    res.send(result);
    return;
  }

  const query = `INSERT INTO notice8 (title, body, user_seq) VALUES('${title}', '${body}', '${loginUser.seq}')`;

  await 디비실행(query);

  res.send(result);
});

app.get("/article_row", async (req, res) => {
  const { seq } = req.query;
  const query = `SELECT * FROM notice WHERE seq = '${seq}'`;

  const article = await 디비실행(query);
  res.send(article[0]);
});

app.listen(port, () => {
  console.log("서버가 실행되었습니다");
});
