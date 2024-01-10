import { useContext, useEffect, useState } from "react";
import PageviewRoundedIcon from "@mui/icons-material/PageviewRounded";
import axiosBase from "../../components/axios";
import { AppState } from "../../App";
import QuestionDetail from "../Questions/QuestionDetail";
import { useNavigate } from "react-router-dom";
import "../Homepage/Homepage.css";

function Homepage() {
  const { user } = useContext(AppState);
  const [question, setQuestions] = useState([]);
  const [search, setSearch] = useState("");
  const [Filter, setFilter] = useState([]);
  const navigate = useNavigate();

  // console.log(Filter)
  // console.log(question);
  // console.log(user);
  const token = localStorage.getItem("token");
  const axios = axiosBase();
  const handleclick = () => {
    navigate("/askquestion");
  };

  useEffect(() => {
    allquestions();
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //all questions load here
  const allquestions = async () => {
    try {
     const data = await axios.get("/questions/all-questions", {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      setQuestions(data?.data?.allquestion);
    } catch (error) {
      console.log(error.response);
    }
  };

  // all Questions()
 useEffect(() => {
  // Check if question is defined and not empty before filtering
  if (question && question.length > 0) {
    setFilter(
      question.filter((q) =>
        q.title.toLowerCase().includes(search.toLowerCase())
      )
    );
  }
}, [search, question]);
 
  return (
    <section className="container home">
      <div className="heros">
        <div className=" row">
          <div className="col-sm-6 col-md-6">
            <button className="blue_button" onClick={handleclick}>
              Ask Questions
            </button>
          </div>

          <div className="col-sm-6  col-md-6">
            <h2>
              WellCome :<span className="user">{user.username}</span>
            </h2>
          </div>
        </div>
      </div>

      <div>
        <div className="search_bar">
          <input
            type="text"
            onChange={(e) => {
              setSearch(e.target.value);
            }}
            placeholder="search...."
          />
          <PageviewRoundedIcon className="search_icon" />
        </div>
      </div>
        <h3 className="ns">Questions</h3>
      <div>
        <div>
          {Filter.map((quest, i) => (
            <QuestionDetail question={quest} key={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Homepage;