import React from "react";
import { Route, Routes, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

axios.defaults.withCredentials = true;

export const StoreContext = React.createContext({});

function Article() {
  const { seq } = useParams();

  const [article, setArticle] = React.useState({});

  const 게시판상세정보가져오기 = async () => {
    await axios({
      url: ""http://18.183.82.9:3306/article_row",
      params: {
        seq: seq,
      },
    }).then((response) => {
      setArticle(response.data);
    });
  };

  React.useEffect(() => {
    게시판상세정보가져오기();
  }, []);

  return (
    <div>
      <h2>{article.title}</h2>
      <p>{article.body}</p>
    </div>
  );
}

export default Article;
