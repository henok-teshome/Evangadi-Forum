import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GoDotFill } from "react-icons/go";
import "./newquestion.css";
import axiosBase from "../../components/axios";
const NewQuestion = () => {
  const [form, setForm] = useState({});
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const axios = axiosBase();
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // eslint-disable-next-line no-unused-vars
      const { data } = await axios.post("/questions/post-questions", form, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });

      navigate("/home");
    } catch (error) {
      console.log(error.response);
    }
  };

  return (
    <div className="container">
      <div className="container_header">
        <h3 className="step">Steps to write a good question</h3>
        <ul className="list">
          <li>
            {" "}
            <span>
              <GoDotFill className="px-1" />
            </span>
            Summerize your in a one-line title.
          </li>

          <li>
            {" "}
            <span>
              <GoDotFill className="px-1" />
            </span>
            Describe your problem in more detail.
          </li>

          <li>
            {" "}
            <span>
              <GoDotFill className="px-1" />
            </span>
            Describe what you tried and what you expected to happen.
          </li>

          <li>
            {" "}
            {/* <span> */}
            <GoDotFill className="px-1" />
            {/* </span> */}
            Review your question and post it to the site.
          </li>
        </ul>
      </div>

      <div className="inputs">
        <div className="input_description ">
          <h3>Ask a public question</h3>
          <div className="mb-3">
            {" "}
            <Link className="li" to="/home">
              Go to Question Page
            </Link>
          </div>
        </div>

        <form method="post" className="box_input" onSubmit={handleSubmit}>
          <div>
            <input
              className="input_text_title input_text_one"
              type="text"
              name="title"
              placeholder="Title"
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <textarea
              className="input_text_text input_text_one"
              maxLength="255"
              type="text"
              name="description"
              placeholder="Question Description..."
              onChange={handleChange}
              required
            />
          </div>
          <div className="">
            <button className="btn btn-lg btn-primary mb-4" type="submit">
              Post Your Question
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewQuestion;
