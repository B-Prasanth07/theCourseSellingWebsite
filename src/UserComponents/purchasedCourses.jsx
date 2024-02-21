import { useEffect } from "react";
import { BASE_URL} from "../../config";
import { Typography } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { Card } from "@mui/material";


export function PurchasedCourses() {
  const [purchasedCourses, setPurchasedCourses] = useState([]);
  const [loading, setLoading] = useState(true); // Added loading state
  const [error, setError] = useState(null); // Added error state

  const init = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/user/purchasedCourses`, {
        headers: {
          "content-type": "application/json",
          "Authorization": "Bearer " + localStorage.getItem("token"),
        },
      });
      setPurchasedCourses(response.data.purchasedCourses);
    } catch (error) {
      setError(error.message); // Set error message
    } finally {
      setLoading(false); // Set loading to false regardless of success or failure
    }
  };

  useEffect(() => {
    init();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        backgroundColor: "#eeeeee",
      }}

    >
      {purchasedCourses && purchasedCourses.length > 0 ? (
        purchasedCourses.map((course) => (
          <Course key={course._id} course={course} />
        ))
      ) : (
        <p>No purchased courses available</p>
      )}
    </div>
  );
}

export function Course({ course }) {
  return (
    <Card style={{ margin: 10, width: 300, minHeight: 200, padding: 20 }}>
      <Typography textAlign={"center"} variant="h5">
        {course.title}
      </Typography>
      <Typography textAlign={"center"} variant="subtitle1">
        {course.description}
      </Typography>
      <Typography textAlign={"center"} variant="subtitle1">
        {course.price}
      </Typography>
      <img src={"./images/course_image.jpg"} style={{ width: 300 }}></img>
      <div
        style={{ display: "flex", justifyContent: "center", marginTop: 20 }}
      ></div>
    </Card>
  );
}
