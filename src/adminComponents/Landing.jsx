import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { adminEmailState } from "../Store/selectors/adminEmail";
import { isAdminLoading } from "../Store/selectors/isAdminLoading";
import { Button, Grid, Typography } from "@mui/material";

const Landing = () => {
  const navigate = useNavigate();
  const adminEmail = useRecoilValue(adminEmailState);
  const userLoading = useRecoilValue(isAdminLoading);
  return (
    <div>
      <Grid container style={{ padding: "5vw" }}>
        <Grid item xs={12} md={6} lg={6}>
          <div style={{ marginTop: 20 }}>
            <Typography variant={"h2"}>Coursera for Admin</Typography>
            <Typography variant={"h5"}>A place to learn and grow</Typography>
            {!adminEmail && !userLoading && (
              <div style={{ display: "flex", marginTop: 20 }}>
                <div style={{ marginRight: 10 }}>
                  <Button
                    size={"large"}
                    variant={"contained"}
                    onClick={() => {
                      navigate("/signup");
                    }}
                  >
                    signup
                  </Button>
                </div>
                <div>
                  <Button
                    size={"large"}
                    variant={"contained"}
                    onClick={() => {
                      navigate("/signin");
                    }}
                  >
                    signin
                  </Button>
                </div>
              </div>
            )}
          </div>
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <img src={"./images/course_image.jpg"} width={"100%"} />
        </Grid>
      </Grid>
    </div>
  );
};

export default Landing;
