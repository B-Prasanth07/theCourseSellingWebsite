import { useNavigate } from "react-router-dom";
import { useSetRecoilState, useRecoilValue } from "recoil";
import { userEmailState } from "../store/selectors/userEmail.js";
import { isuserLoading } from "../store/selectors/isUserLoading.js";
import { userState } from "../store/atoms/user.js";
import { Button, Typography } from "@mui/material";

function Appbar() {
  const navigate = useNavigate();
  const userLoading = useRecoilValue(isuserLoading);
  const userEmail = useRecoilValue(userEmailState);
  const setUser = useSetRecoilState(userState);


  if (userLoading) {
    return <></>;
  }

  if (userEmail) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: 4,
          zIndex: 1,
        }}
      >
        <div
          style={{ marginLeft: 10, cursor: "pointer" }}
          onClick={() => {
            navigate("/");
          }}
        >
          <Typography variant={"h6"}>Coursera</Typography>
        </div>
        <div style={{ display: "flex" }}>
          <div style={{ marginRight: 10, display: "flex" }}>
            <div style={{ marginRight: 10 }}>
              <Button onClick={() => navigate("/purchasedCourse")}>
                purchased courses
              </Button>
            </div>
            <div style={{ marginRight: 10 }}>
              <Button onClick={() => navigate("/Courses")}>Courses</Button>
            </div>
            <Button
              variant={"contained"}
              onClick={() => {
                localStorage.setItem("token", null);
                setUser({
                  isLoading: false,
                  userEmail: null,
                });
                navigate("/");
              }}
            >
              Logout
            </Button>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: 4,
          zIndex: 1,
        }}
      >
        <div
          style={{ marginLeft: 10, cursor: "pointer" }}
          onClick={() => navigate("/")}
        >
          <Typography variant={"h6"}>Coursera</Typography>
        </div>
        <div style={{ display: "flex", marginTop: 10 }}>
          <div style={{ marginRight: 20 }}>
            <Button variant="contained" onClick={() => navigate("/Signup")}>
              Signup
            </Button>
          </div>
          <div style={{ marginRight: 20 }}>
            <Button variant="contained" onClick={() => navigate("/Signin")}>
              signin
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

export default Appbar;
