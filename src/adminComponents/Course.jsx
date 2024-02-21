import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { courseState } from "../Store/atoms/course";
import { isCourseLoading } from "../Store/selectors/course";
import { BASE_URL } from "../config";
import { useState } from "react";
import { Button, Card, TextField, Typography } from "@mui/material";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { Loading } from "./Loading";

function Course() {
  let { courseId } = useParams();
  const setCourse = useSetRecoilState(courseState);
  const courseLoading = useRecoilValue(isCourseLoading);

  useEffect(() => {
    axios
      .get(`${BASE_URL}/admin/courses/${courseId}`, {
        method: "GET",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((res) => {
        setCourse({ isLoading: false, course: res.data.course });
      })
      .catch((e) => {
        setCourse({ isLoading: false, course: null });
      });
  }, []);

  if (courseLoading) {
    return <Loading />;
  }

  return (
    <div>
      <UpdateCard />
    </div>
  );
}

function UpdateCard() {
  const [courseDetails, setCourse] = useRecoilState(courseState);
  useEffect(() => {
    // Update the state variables when courseDetails.course changes
    if (courseDetails.course) {
      setTitle(courseDetails.course.title);
      setDescription(courseDetails.course.description);
      setImage(courseDetails.course.imageLink);
      setPrice(courseDetails.course.price);
    }
  }, [courseDetails.course]);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [price, setPrice] = useState("");

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Card varint={"outlined"} style={{ maxWidth: 600, marginTop: 100 }}>
        <div style={{ padding: 20 }}>
          <Typography style={{ marginBottom: 10 }}>
            Update course details
          </Typography>
          <TextField
            value={title}
            style={{ marginBottom: 10 }}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            fullWidth={true}
            label="Title"
            variant="outlined"
          />

          <TextField
            value={description}
            style={{ marginBottom: 10 }}
            onChange={(e) => {
              setDescription(e.target.value);
            }}
            fullWidth={true}
            label="Description"
            variant="outlined"
          />

          <TextField
            value={image}
            style={{ marginBottom: 10 }}
            onChange={(e) => {
              setImage(e.target.value);
            }}
            fullWidth={true}
            label="Image link"
            variant="outlined"
          />
          <TextField
            value={price}
            style={{ marginBottom: 10 }}
            onChange={(e) => {
              setPrice(e.target.value);
            }}
            fullWidth={true}
            label="Price"
            variant="outlined"
          />

          <Button
            variant="contained"
            onClick={async () => {
              axios.put(
                `${BASE_URL}/admin/courses/` + courseDetails.course._id,
                {
                  title: title,
                  description: description,
                  imageLink: image,
                  published: true,
                  price: price,
                },
                {
                  headers: {
                    "Content-type": "application/json",
                    Authorization: "Bearer " + localStorage.getItem("token"),
                  },
                }
              );
              let updatedCourse = {
                _id: courseDetails.course._id,
                title: title,
                description: description,
                imageLink: image,
                price,
              };
              setCourse({ course: updatedCourse, isLoading: false });
              alert("CourseUpdates Successfully!");
            }}
          >
            Update course
          </Button>
        </div>
      </Card>
    </div>
  );
}

export default Course;
