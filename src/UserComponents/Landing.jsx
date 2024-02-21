import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { userEmailState } from "../store/selectors/userEmail.js";
import { isuserLoading } from "../store/selectors/isUserLoading.js";
import { Button, Grid, Typography } from "@mui/material";

const Landing = () => {
  const navigate = useNavigate();
  const userEmail = useRecoilValue(userEmailState);
  const userLoading = useRecoilValue(isuserLoading);
  return (
    <div>
      <Grid container style={{ padding: "5vw" }}>
        <Grid item xs={12} md={6} lg={6}>
          <div style={{ marginTop: 20 }}>
            <Typography variant={"h2"}>Coursera for User</Typography>
            <Typography variant={"h5"}>A place to learn and grow</Typography>
            {!userEmail && !userLoading && (
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
          <img src={"./images/course_image2.jpg"} width={"80%"} />
        </Grid>
      </Grid>
    </div>
  );
};

export default Landing;
