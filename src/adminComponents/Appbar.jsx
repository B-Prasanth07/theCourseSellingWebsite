import { useNavigate } from "react-router-dom";
import { useSetRecoilState, useRecoilValue } from "recoil";
import { isAdminLoading } from "../Store/selectors/isAdminLoading";
import { adminEmailState } from "../Store/selectors/adminEmail";
import { adminUserState } from "../Store/atoms/adminUser";
import { Button, Typography } from "@mui/material";

function Appbar() {
  const navigate = useNavigate();
  const adminLoading = useRecoilValue(isAdminLoading);
  const adminEmail = useRecoilValue(adminEmailState);
  const setUser = useSetRecoilState(adminUserState);

  if (adminLoading) {
    return <></>;
  }

  if (adminEmail) {
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
          <div style={{ marginRight: 10, display: "flex", marginTop: 10 }}>
            <div style={{ marginRight: 10 }}>
              <Button onClick={() => navigate("/AddCourse")}>Add course</Button>
            </div>
            <div style={{ marginRight: 10 }}>
              <Button onClick={() => navigate("/Courses")}>Courses</Button>
            </div>
            <div style={{ marginRight: 15 }}>
              <Button
                variant={"contained"}
                onClick={() => {
                  localStorage.setItem("token", null);
                  setUser({
                    isLoading: false,
                    adminEmail: null,
                  });
                  navigate("/");
                }}
              >
                Logout
              </Button>
            </div>
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
