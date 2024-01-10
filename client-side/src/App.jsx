// import "./App.css";
// import { Route, Routes, useNavigate } from "react-router-dom";

// import About from "./pages/About";

// // import Register from "./pages/Register";
// import axios from "./axiosConfig";
// import { useEffect, useState,createContext } from "react";
// import AskQuestion from "./AskQuestionPage/AskQuestionPage";
// import Login from "./pages/Login/Login";
// import SignUp from "./pages/SignUp/SignUp";
// import ResetPassword from "./ForgetPassword/ResetPassword";
// import SharedCommenLayout from "./pages/SharedCommenLayout/SharedCommenLayout";

//  export const AppState=createContext();
// function App() {
//     const[user, setUser]=useState({});
//     const token=localStorage.getItem("token");
//     const navigation = useNavigate();
//     async function checkUser(){
//         try {
//        const {data}= await axios.get('/users/check', {
//         headers: {
//           Authorization: 'Bearer ' + token
//         }
//       });
//       setUser(data);
//         } catch (error) {
//       console.log(error.response);
//       navigation('/login');
//     }
//     }
//     useEffect(()=>{
//         checkUser();
//     },[]);

//     return (
//         <AppState.Provider value={{user,setUser}}>
//             <Routes>
//               <Route path="/" element={<SharedCommenLayout/>}/>
//                 <Route path="/signup" element={<SignUp />} />
//                 <Route path="/reset-password" element={<ResetPassword/>} />
//                 <Route path="/about" element ={<About/>}/>
//                 <Route path="/askquestion" element={<AskQuestion />} />
//                 <Route path="/login" element ={<Login/>}/>
                
              
        
//             </Routes>
//         </AppState.Provider>
//     );
// }

// export default App;

//new
import { Route, Routes, useNavigate } from "react-router-dom";
import { useEffect, useState, createContext } from "react";
import axios from "./components/axiosConfig";
// import About from "../src/pages/About";
import SignUp from "./pagess/SignUp/SignUp";
import SignIn from "./pagess/SignIn/SignIn";
// import Footer from "./pages/Footer/Footer";
import SharedCommenLayout from "./pagess/SharedCommenLayout/SharedCommenLayout";
// import Header from "./pages/Header";
import Homepage from "./pagess/Homepage/Homepage";
import NewQuestion from "./pagess/Questions/NewQuestion";
import Answer from "./pagess/Answer/Answer";

// import Login from "./pages/Login/Login";
export const AppState = createContext();
function App() {
  const [user, setUser] = useState([]);
  const token = localStorage.getItem("token");

  const navigate = useNavigate();
  const checkUser = async () => {
    try {
      const { data } = await axios.get("/users/check", {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      setUser(data);
      // console.log(data);
    } catch (error) {
      navigate("/login");
      return error.response;
    }
  };

  useEffect(() => {
    checkUser();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <AppState.Provider value={{ user, setUser }}>
      <Routes>
        
        <Route path="/" element={<SharedCommenLayout/>}>
            <Route path="login" element={<SignIn/>}/>
            <Route path="/register" element={<SignUp />}/>
             <Route path="/home" element={ <Homepage />}/>
             <Route path="askquestion" element={<NewQuestion />}/>
             <Route path="/Answer/:questionid" element={<Answer />}/>
      </Route>

            </Routes>
    </AppState.Provider>
  );
}
export default App;
  
 


