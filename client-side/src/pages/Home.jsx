// import React from 'react'
// import { useContext} from 'react'
// import { AppState } from '../App'

// function Home() {
// const {user}= useContext(AppState)
// console.log(user)
//   return (
//     <div>
//       <h1> Home</h1>
//       <br />
//       <br />
//       <br />
//       <h2>Wellcome: {user.username}</h2>
//      </div>
//   )
// }

// export default Home


//new
import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axiosBase from '../axiosConfig'; // Adjust the path based on your project structure
import { AppState } from '../App';

function Home() {
  const { user } = useContext(AppState);
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axiosBase.get('all-questions', {
          headers: {
            'Content-Type': 'application/json',
            // Include any necessary headers for authentication if required
          },
        });

        setQuestions(response.data.questions);
      } catch (error) {
        console.error('Error fetching questions:', error.message);
      }
    };

    fetchQuestions();
  }, [user]); // Include user in the dependency array if you want to refetch questions when the user changes

  return (
    <div>
      <div>
        <h1>Home Page</h1>
        <h1>
          <Link to="/post-questions">Ask Question</Link>
        </h1>
        {/* Add your form or question input components here */}
      </div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <div style={{ flex: 1 }}>
          <h2>Questions</h2>
          <ul>
            {questions.map((question) => (
              <li key={question._id}>
                <p>{question.title}</p>
                <p>{question.description}</p>
                {/* Add more details as needed */}
                <hr />
              </li>
            ))}
          </ul>
        </div>
        <div style={{ textAlign: 'right' }}>
          <h3>Welcome: {user.username}</h3>
        </div>
      </div>
      <hr style={{ width: '100%', margin: '0' }} />
    </div>
  );
}

export default Home;














