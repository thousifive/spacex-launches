import React from "react";
import { Modal, Box, Typography } from "@mui/material";
import { IoMdClose } from "react-icons/io";
import { MdOutlineArticle } from "react-icons/md";
import { FaWikipediaW, FaYoutube } from "react-icons/fa";
import "./LaunchModal.css";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  borderRadius: "6px",
  boxShadow: 24,
  p: 4,
};

const LaunchModal = ({ currLaunch, modalOpen, handleClose }) => {
  const statusClass = currLaunch.launch_success
    ? "success"
    : currLaunch.launch_success === false
    ? "failed"
    : "upcoming";

  return (
    <div>
      <Modal
        open={modalOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="container">
            {/* <div>
            <img src={currLaunch?.links?.mission_patch_small || ""} alt=""/>
          </div> */}
            <div>
              <div className="title-links">
                <h4 id="modal-modal-title" style={{ margin: 0 }}>
                  {currLaunch.mission_name}
                </h4>
                {currLaunch.links && (
                  <div>
                    <a href={currLaunch.links.article_link}>
                      <MdOutlineArticle />
                    </a>
                    <a href={currLaunch.links.wikipedia}>
                      <FaWikipediaW />
                    </a>
                    <a href={currLaunch.links.video_link}>
                      <FaYoutube />
                    </a>
                  </div>
                )}
              </div>
              <span className="rocket-name">
                {currLaunch.rocket?.rocket_name}
              </span>
              <span className={`launch-status ${statusClass}`}>
                {currLaunch.launch_success
                  ? "Success"
                  : currLaunch.launch_success === false
                  ? "Failed"
                  : "Upcoming"}
              </span>
            </div>
            <div>
              <IoMdClose onClick={handleClose} />
            </div>
          </div>
          {currLaunch.details && (
            <div>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                {currLaunch.details}
              </Typography>
            </div>
          )}
          <div className="details">
            {currLaunch.flight_number && (
              <div className="grid-row">
                <span>Flight Number:</span>
                {currLaunch.flight_number}
              </div>
            )}
            {currLaunch.mission_name && (
              <div className="grid-row">
                <span>Mission Name:</span>
                {currLaunch.mission_name}
              </div>
            )}
            {currLaunch.rocket && currLaunch.rocket.rocket_type && (
              <div className="grid-row">
                <span>Rocket Type:</span>
                {currLaunch.rocket.rocket_type}
              </div>
            )}
            {currLaunch.rocket && currLaunch.rocket.rocket_name && (
              <div className="grid-row">
                <span>Rocket Name:</span>
                {currLaunch.rocket.rocket_name}
              </div>
            )}
            {currLaunch.launch_date_utc && (
              <div className="grid-row">
                <span>Launch Date:</span>
                {new Date(currLaunch.launch_date_utc).toUTCString()}
              </div>
            )}
            {currLaunch.rocket &&
              currLaunch.rocket.second_stage &&
              currLaunch.rocket.second_stage.payloads &&
              currLaunch.rocket.second_stage.payloads[0] &&
              currLaunch.rocket.second_stage.payloads[0].payload_type && (
                <div className="grid-row">
                  <span>Payload Type:</span>
                  {currLaunch.rocket.second_stage.payloads[0].payload_type}
                </div>
              )}
            {currLaunch.rocket &&
              currLaunch.rocket.second_stage &&
              currLaunch.rocket.second_stage.payloads &&
              currLaunch.rocket.second_stage.payloads[0] &&
              currLaunch.rocket.second_stage.payloads[0].orbit && (
                <div className="grid-row">
                  <span>Orbit:</span>
                  {currLaunch.rocket.second_stage.payloads[0].orbit}
                </div>
              )}
            {currLaunch.launch_site && currLaunch.launch_site.site_name && (
              <div className="grid-row">
                <span>Launch Site:</span>
                {currLaunch.launch_site.site_name}
              </div>
            )}
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default LaunchModal;
