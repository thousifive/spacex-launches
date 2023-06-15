import React, { useState } from "react";
import {
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Pagination,
  CircularProgress,
  Modal,
  Box,
  Typography,
} from "@mui/material";
import { IoMdClose } from "react-icons/io";
import { MdOutlineArticle } from "react-icons/md";
import { FaWikipediaW, FaYoutube } from "react-icons/fa";

const tableHeaders = [
  "No:",
  "Launched (UTC)",
  "Location",
  "Mission",
  "Orbit",
  "Launch Status",
  "Rocket",
];

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

const LaunchTable = ({ loading, launches }) => {
  const [page, setPage] = useState(1);
  const [rowsPerPage] = useState(7);
  const [currLaunch, setCurrLaunch] = useState({});
  const [modalOpen, setModalOpen] = useState(false);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  // const handleOpen = () => setModalOpen(true);
  const handleClose = () => {
    setModalOpen(false);
    setCurrLaunch({});
  };

  const openLaunch = (launchData) => {
    setCurrLaunch(launchData);
    setModalOpen(true);
  };

  const emptyRows =
    rowsPerPage -
    Math.min(rowsPerPage, launches.length - (page - 1) * rowsPerPage);

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <TableContainer
        component={Paper}
        sx={{
          boxShadow: "0px 10px 30px 3px rgba(5, 16, 55, 0.15)",
          border: "0.5px solid gray",
          borderRadius: "10px",
        }}
      >
        <Table>
          <TableHead sx={{ backgroundColor: "#F4F5F7" }}>
            <TableRow>
              {tableHeaders.map((header) => (
                <TableCell>{header}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <div>
                <CircularProgress />
              </div>
            ) : launches.length > 0 ? (
              launches
                .slice((page - 1) * rowsPerPage, page * rowsPerPage)
                .map((launch) => (
                  <TableRow
                    key={launch.id}
                    sx={{ cursor: "pointer" }}
                    onClick={() => openLaunch(launch)}
                  >
                    <TableCell>{launch.flight_number}</TableCell>
                    <TableCell>
                      {new Date(launch.launch_date_utc).toUTCString()}
                    </TableCell>
                    <TableCell>{launch.launch_site.site_name}</TableCell>
                    <TableCell>{launch.mission_name}</TableCell>
                    <TableCell>
                      {launch.rocket?.second_stage?.payloads[0]?.orbit}
                    </TableCell>
                    <TableCell>
                      <p
                        style={{
                          textAlign: "center",
                          borderRadius: "8px",
                          backgroundColor: launch.launch_success
                            ? "#DEF7EC"
                            : launch.launch_success === false
                            ? "#FDE2E1"
                            : "#FEF2C7",
                          color: launch.launch_success
                            ? "#064626"
                            : launch.launch_success === false
                            ? "#95120E"
                            : "#A14B2F",
                        }}
                      >
                        {launch.launch_success
                          ? "Success"
                          : launch.launch_success === false
                          ? "Failed"
                          : "Upcoming"}
                      </p>
                    </TableCell>
                    <TableCell>{launch.rocket.rocket_name}</TableCell>
                  </TableRow>
                ))
            ) : (
              <TableCell>No results found for this specific filter</TableCell>
            )}
            {/* {filteredLaunches
              .slice((page - 1) * rowsPerPage, page * rowsPerPage)
              .map((launch) => (
                <TableRow key={launch.id}>
                  <TableCell>{launch.name}</TableCell>
                  <TableCell>{launch.date_utc}</TableCell>
                  <TableCell>{launch.success ? 'Success' : 'Failure'}</TableCell>
                </TableRow>
              ))} */}
            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={3} />
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Pagination
        count={Math.ceil(launches.length / rowsPerPage)}
        page={page}
        onChange={handlePageChange}
        style={{ marginTop: 20, alignSelf: "end" }}
      />

      <Modal
        open={modalOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "start",
            }}
          >
            {/* <div>
            <img src={currLaunch?.links?.mission_patch_small || ""} alt=""/>
          </div> */}
            <div>
              <div
                style={{ display: "flex", alignItems: "center", gap: "10px" }}
              >
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
              <span style={{ fontSize: "12px" }}>
                {currLaunch.rocket?.rocket_name}
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
          <div style={{display: "grid", gridTemplateColumns: "auto", fontSize: "14px", marginTop: "10px"}}>
            <div style={{borderBottom: "1px solid #E6E6E8", padding: "10px"}}><span style={{marginRight: "10px", fontWeight: 600}}>Flight Number:</span>{currLaunch.flight_number}</div>
            <div style={{borderBottom: "1px solid #E6E6E8", padding: "10px"}}><span style={{marginRight: "10px", fontWeight: 600}}>Mission Name:</span>{currLaunch.mission_name}</div>
            <div style={{borderBottom: "1px solid #E6E6E8", padding: "10px"}}><span style={{marginRight: "10px", fontWeight: 600}}>Rocket Type:</span>{currLaunch.rocket?.rocket_type}</div>
            <div style={{borderBottom: "1px solid #E6E6E8", padding: "10px"}}><span style={{marginRight: "10px", fontWeight: 600}}>Rocket Name:</span>{currLaunch.rocket?.rocket_name}</div>
            <div style={{borderBottom: "1px solid #E6E6E8", padding: "10px"}}><span style={{marginRight: "10px", fontWeight: 600}}>Launch Date:</span>{new Date(currLaunch.launch_date_utc).toUTCString()}</div>
            <div style={{borderBottom: "1px solid #E6E6E8", padding: "10px"}}><span style={{marginRight: "10px", fontWeight: 600}}>Payload Type:</span>{currLaunch.rocket?.second_stage?.payloads[0]?.payload_type}</div>
            <div style={{borderBottom: "1px solid #E6E6E8", padding: "10px"}}><span style={{marginRight: "10px", fontWeight: 600}}>Orbit:</span>{currLaunch.rocket?.second_stage?.payloads[0]?.orbit}</div>
            <div style={{borderBottom: "1px solid #E6E6E8", padding: "10px"}}><span style={{marginRight: "10px", fontWeight: 600}}>Launch Site:</span>{currLaunch.launch_site?.site_name}</div>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default LaunchTable;
