import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { userState } from "../store/atoms/user.js";
import { Button, TextField, Typography } from "@mui/material";
import { Card } from "@mui/material";
import { BASE_URL } from "../../config.js";
import axios from "axios";
import { useSetRecoilState } from "recoil";

function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const setUser = useSetRecoilState(userState);

  return (
    <div>
      <div
        style={{
          paddingTop: 100,
          marginBottom: 10,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Typography variant={"h6"}>
          Welcome to the coursera User. signin below
        </Typography>
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Card varint={"outlined"} style={{ width: 400, padding: 30 }}>
          <TextField
            onChange={(event) => {
              setEmail(event.target.value);
            }}
            fullWidth={true}
            label="Email"
            variant="outlined"
          />
          <br />
          <br />
          <TextField
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            fullWidth={true}
            label="Password"
            variant="outlined"
            type={"password"}
          />
          <br />
          <br />
          <Button
            size={"large"}
            variant="contained"
            onClick={async () => {
              const response = await axios.post(
                `${BASE_URL}/user/login`,
                {
                  username: email,
                  password: password,
                },
                {
                  headers: {
                    "content-type": "application/json",
                  },
                }
              );
              let data = response.data;
              localStorage.setItem("token", data.token);
              setUser({ userEmail: email, isLoading: false });
              navigate("/courses");
            }}
          >
            Signin
          </Button>
        </Card>
      </div>
    </div>
  );
}

export default Signin;
