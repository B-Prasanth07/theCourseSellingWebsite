import { PurchasedCourses } from "./UserComponents/purchasedCourses.jsx";
import Signin from "./UserComponents/signin.jsx";
import Signup from "./UserComponents/signup.jsx";
import Appbar from "./UserComponents/appbar.jsx";
import Landing from "./UserComponents/Landing.jsx";
import { userState } from "./store/atoms/user.js";
import { Coursespage } from "./UserComponents/coursespage.jsx";
import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import axios from "axios";
import { BASE_URL } from "../config.js";

function App() {
  return (
    <div>
      <div
        style={{ width: "100vw", height: "100vh", backgroundColor: "#eeeeee" }}
      >
        <Router>
          <Appbar />
          <InitUser />
          <Routes>
            <Route path={"/purchasedCourse"} element={<PurchasedCourses />} />
            <Route path={"/courses"} element={<Coursespage />} />
            <Route path={"/signin"} element={<Signin />} />
            <Route path={"/signup"} element={<Signup />} />
            <Route path={"/"} element={<Landing />} />
          </Routes>
        </Router>
      </div>
    </div>
  );
}

function InitUser() {
  const setUser = useSetRecoilState(userState);
  const init = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/user/me`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });

      if (response.data.username) {
        setUser({
          isLoading: false,
          userEmail: response.data.username,
        });
      } else {
        setUser({
          isLoading: false,
          userEmail: null,
        });
      }
    } catch (e) {
      setUser({
        isLoading: false,
        userEmail: null,
      });
    }
  };

  useEffect(() => {
    init();
  }, []);

  return <></>;
}

export default App;
