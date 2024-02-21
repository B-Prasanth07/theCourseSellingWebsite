import { useEffect } from "react";
import { BASE_URL } from "../../config.js";
import { Button, Typography } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { Card } from "@mui/material";

export function Coursespage() {
  const [courses, setCourses] = useState([]);
  const init = async () => {
    const response = await axios.get(`${BASE_URL}/user/courses/`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
    setCourses(response.data.courses);
  };

  useEffect(() => {
    init();
  }, []);

  return (
    <div>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          backgroundColor: "#eeeeee",
        }}
      >
        {courses.map((course) => {
          return <Course key={course._id}  course={course} />;
        })}
      </div>
    </div>
  );
}

export function Course({ course }) {
  const courseId = course._id;
  return (
    <Card style={{ margin: 10, width: 300, minHeight: 200, padding: 20 }}>
      <Typography textAlign={"center"} variant="h5">
        {course.title}
      </Typography>
      <Typography textAlign={"center"} variant="subtitle1">
        {course.description}
      </Typography>
      <img src={"./images/user_image.jpg"} style={{ width: 300 }}></img>
      <div style={{ display: "flex", justifyContent: "center", marginTop: 20 }}>
        <Button
        variant="contained"
          onClick={async () => {
            try {
              await axios.post(`${BASE_URL}/user/courses/${courseId}`, null, {
                headers: {
                  Authorization: "Bearer " + localStorage.getItem("token"),
                },
              });

              alert("Course purchased successfully");
            } catch (error) {
              console.error("Error purchasing course:", error);
              alert("Failed to purchase course");
            }
          }}
        >
          Buy
        </Button>
      </div>
    </Card>
  );
}
