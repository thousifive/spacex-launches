import React, { useState } from "react";
import LaunchModal from "./LaunchModal";
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
} from "@mui/material";
import "./LaunchTable.css";

const tableHeaders = [
  "No:",
  "Launched (UTC)",
  "Location",
  "Mission",
  "Orbit",
  "Launch Status",
  "Rocket",
];

const LaunchTable = ({ loading, launches }) => {
  const [page, setPage] = useState(1);
  const [rowsPerPage] = useState(7);
  const [currLaunch, setCurrLaunch] = useState({});
  const [modalOpen, setModalOpen] = useState(false);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

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
    <div className="table-div">
      <TableContainer component={Paper} className="table-container">
        <Table>
          <TableHead className="table-header">
            <TableRow>
              {tableHeaders.map((header, id) => (
                <TableCell key={id+header}>{header}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell>
                  <CircularProgress />
                </TableCell>
              </TableRow>
            ) : launches.length > 0 ? (
              launches
                .slice((page - 1) * rowsPerPage, page * rowsPerPage)
                .map((launch, id) => {
                  const statusClass = launch.launch_success
                    ? "success"
                    : launch.launch_success === false
                    ? "failed"
                    : "upcoming";

                  return (
                    <TableRow
                      key={id}
                      className="table-row-content"
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
                        <p className={`status ${statusClass}`}>
                          {launch.launch_success
                            ? "Success"
                            : launch.launch_success === false
                            ? "Failed"
                            : "Upcoming"}
                        </p>
                      </TableCell>
                      <TableCell>{launch.rocket.rocket_name}</TableCell>
                    </TableRow>
                  );
                })
            ) : (
              <TableCell>No results found for this specific filter</TableCell>
            )}
            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={3} />
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Pagination
        className="pagination"
        count={Math.ceil(launches.length / rowsPerPage)}
        page={page}
        onChange={handlePageChange}
      />

      <LaunchModal
        currLaunch={currLaunch}
        modalOpen={modalOpen}
        handleClose={handleClose}
      />
    </div>
  );
};

export default LaunchTable;
