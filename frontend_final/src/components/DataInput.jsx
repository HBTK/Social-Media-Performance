import React, { useState } from "react";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Button,
  Grid,
} from "@mui/material";
import { FaThumbsUp, FaRegComments, FaEye } from "react-icons/fa";
import { IoShareSocial } from "react-icons/io5";
import { ToastContainer, toast } from "react-toastify"; // Import Toastify components
import "react-toastify/dist/ReactToastify.css"; // Import the default styles

function DataInput({ postTypes, PostType, handleChange }) {
  const [inputValues, setInputValues] = useState({
    Likes: "",
    Comments: "",
    Shares: "",
    Views: "",
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
      !inputValues.Shares ||
      !inputValues.Views
    ) {
      alert("Please fill out all fields.");
      return;
    }

    const payload = {
      Post_Type: PostType,
      Likes: parseInt(inputValues.Likes, 10),
      Comments: parseInt(inputValues.Comments, 10),
      Shares: parseInt(inputValues.Shares, 10),
      Views: parseInt(inputValues.Views, 10),
    };

    try {
      const response = await fetch(
        "https://social-media-performance-7gik.onrender.com/addData",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to submit data.");
      }

      // Show toast notification
      toast.success("Data successfully submitted!");

      setInputValues({ Likes: "", Comments: "", Shares: "", Views: "" });
    } catch (error) {
      console.error("Error submitting data:", error);
      alert("Error submitting data.");
    }
  };

  const inputFields = [
    { label: "Likes", icon: <FaThumbsUp size={20} color="#00BFFF" /> },
    { label: "Comments", icon: <FaRegComments size={20} color="#36454F" /> },
    { label: "Shares", icon: <IoShareSocial size={20} color="#36454F" /> },
    { label: "Views", icon: <FaEye size={20} color="#36454F" /> },
  ];

  return (
    <Box className="Data-input" sx={{ p: 2 }}>
      <h2 style={{ marginBottom: 20, color: "rgb(49, 47, 47)" }}>
        Add Your Data
      </h2>

      {/* Post Type Dropdown */}
      <Box sx={{ textAlign: "center", mb: 3 }}>
        <FormControl sx={{ minWidth: 200 }}>
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
      </Box>

      {/* Likes, Comments, Shares, Views Input */}
      <Grid container spacing={3} justifyContent="center">
        {inputFields.map(({ label, icon }) => (
          <Grid item xs={12} sm={6} key={label}>
            <Box display="flex" alignItems="center">
              {icon}
              <TextField
                id={`${label}-input`}
                label={label}
                type="number"
                value={inputValues[label]}
                onChange={handleInputChange}
                sx={{ ml: 2, flex: 1 }}
              />
            </Box>
          </Grid>
        ))}
      </Grid>

      {/* Submit Button */}
      <Box sx={{ textAlign: "right", mt: 3 }}>
        <Button variant="contained" onClick={handleSubmit}>
          Submit
        </Button>
      </Box>

      {/* Toast Container */}
      <ToastContainer />
    </Box>
  );
}

export default DataInput;
