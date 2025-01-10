import { useState } from "react";
import "./App.css";
import logo from "./assets/logo2.png";
import {
  BsDribbble,
  BsFacebook,
  BsGithub,
  BsInstagram,
  BsTwitter,
} from "react-icons/bs";
import StackedBarChart from "./components/StackedBarChart";
import DoughnutChart from "./components/DoughnutChart";
import { FaGithub } from "react-icons/fa";
import { Box, Button, TextField } from "@mui/material";
import DataInput from "./components/DataInput";
import GetInsight from "./components/Insights";

function App() {
  const [postTypes] = useState([
    "Story",
    "Reels",
    "Carousel",
    "Image",
    "Video",
  ]);
  const [PostType, setPostType] = useState("");

  const handleChange = (event) => setPostType(event.target.value);

  return (
    <>
      {/* Header Section */}
      <header className="header">
        <img src={logo} alt="Logo" className="logo" />
        <div className="github">
          <a
            href="https://github.com/your-repo"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaGithub size={40} />
          </a>
        </div>
      </header>

      <div className="combined">
        {/* Main Content */}
        <div className="main">
          <DoughnutChart />
          <StackedBarChart />
        </div>

        <div className="row2">
          {/* Data Input Section */}
          <DataInput
            postTypes={postTypes}
            PostType={PostType}
            handleChange={handleChange}
          />

          {/* Insights Section */}
          <GetInsight PostType={PostType} />
        </div>
      </div>

      {/* Footer Section */}
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-grid">
            {["Company", "Help Center", "Legal", "Download"].map((section) => (
              <div key={section}>
                <h5 className="footer-title">{section}</h5>
                <ul className="footer-list">
                  {/* Add section-specific links */}
                </ul>
              </div>
            ))}
          </div>
          <div className="footer-bottom">
            <p>
              &copy; 2022 <a href="#">Your App™</a>. All rights reserved.
            </p>
            <div className="footer-icons">
              {[BsFacebook, BsInstagram, BsTwitter, BsGithub, BsDribbble].map(
                (Icon, index) => (
                  <a key={index} href="#" aria-label={Icon.name}>
                    <Icon />
                  </a>
                )
              )}
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

export default App;
