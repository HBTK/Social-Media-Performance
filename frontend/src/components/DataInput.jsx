import React, { useState } from "react";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Button,
} from "@mui/material";
import { FaThumbsUp, FaRegComments } from "react-icons/fa";
import { IoShareSocial } from "react-icons/io5";

function DataInput({ postTypes, PostType, handleChange }) {
  const [inputValues, setInputValues] = useState({
    Likes: "",
    Comments: "",
    Shares: "",
  });

  // Handle input changes
  const handleInputChange = (event) => {
    const { id, value } = event.target;
    setInputValues((prev) => ({
      ...prev,
      [id.split("-")[0]]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async () => {
    if (
      !PostType ||
      !inputValues.Likes ||
      !inputValues.Comments ||
      !inputValues.Shares
    ) {
      alert("Please fill out all fields.");
      return;
    }

    const payload = {
      Post_Type: PostType,
      Likes: parseInt(inputValues.Likes, 10),
      Comments: parseInt(inputValues.Comments, 10),
      Shares: parseInt(inputValues.Shares, 10),
    };

    try {
      const response = await fetch("https://social-media-performance.onrender.com/addData", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Failed to submit data.");
      }

      alert("Data successfully submitted!");
      setInputValues({ Likes: "", Comments: "", Shares: "" });
    } catch (error) {
      console.error("Error submitting data:", error);
      alert("Error submitting data.");
    }
  };

  return (
    <div className="Data-input">
      {/* Post Type Dropdown */}
      <div className="dropdown-container">
        <FormControl sx={{ m: 1, minWidth: 200 }}>
          <InputLabel id="post-type-label">Post Type</InputLabel>
          <Select
            labelId="post-type-label"
            id="post-type-select"
            value={PostType}
            onChange={handleChange}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {postTypes.map((type) => (
              <MenuItem key={type} value={type}>
                {type}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>

      {/* Likes, Comments, Shares Input */}
      <div className="like-comments">
        {["Likes", "Comments", "Shares"].map((label, index) => (
          <Box
            key={label}
            component="form"
            sx={{ "& .MuiTextField-root": { m: 1, width: "15ch" } }}
            noValidate
          >
            {index === 0 && <FaThumbsUp size={30} color="#00BFFF" />}
            {index === 1 && <FaRegComments size={30} color="#36454F" />}
            {index === 2 && <IoShareSocial size={30} color="#36454F" />}
            <TextField
              id={`${label}-input`}
              label={label}
              type="number"
              value={inputValues[label]}
              onChange={handleInputChange}
            />
          </Box>
        ))}
      </div>

      {/* Submit Button */}
      <div className="submit-btn">
        <Button variant="contained" onClick={handleSubmit}>
          Submit
        </Button>
      </div>
    </div>
  );
}

export default DataInput;
