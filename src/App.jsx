import Appbar from "./adminComponents/Appbar";
import Landing from "./adminComponents/Landing";
import AddCourse from "./adminComponents/AddCourse";
import Course from "./adminComponents/Course";
import Courses from "./adminComponents/Courses";
import Signup from "./adminComponents/Signup";
import Signin from "./adminComponents/Signin";
import { adminUserState} from "./Store/atoms/adminUser";
import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {
    RecoilRoot,
    useSetRecoilState
} from 'recoil';
import axios from "axios";
import { BASE_URL } from "./config";



function App() {
  return (
    <RecoilRoot>
      <div
        style={{ width: "100vw", height: "100vh", backgroundColor: "#eeeeee" }}
      >
        <Router>
          <Appbar />
          <InitUser />
          <Routes>
            <Route path={"/addcourse"} element={<AddCourse />} />
            <Route path={"/course/:courseId"} element={<Course />} />
            <Route path={"/courses"} element={<Courses />} />
            <Route path={"/signin"} element={<Signin />} />
            <Route path={"/signup"} element={<Signup />} />
            <Route path={"/"} element={<Landing />} />
          </Routes>
        </Router>
      </div>
    </RecoilRoot>
  );
}

function InitUser() {
  const setUser = useSetRecoilState(adminUserState);
  const init = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/admin/me`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });

      if (response.data.username) {
        setUser({
          isLoading: false,
          adminEmail: response.data.username,
        });
      } else {
        setUser({
          isLoading: false,
          adminEmail: null,
        });
      }
    } catch (e) {
      setUser({
        isLoading: false,
        adminEmail: null,
      });
    }
  };

  useEffect(() => {
    init();
  }, []);

  return <></>;
}

export default App;