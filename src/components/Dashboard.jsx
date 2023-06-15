import React, { useState, useEffect } from "react";
import { fetchLaunches } from "../sevices";
import LaunchTable from "./LaunchTable";
import {
  FormControl,
  Select,
  MenuItem,
  Box,
} from "@mui/material";

const Dashboard = () => {
  const [launches, setLaunches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dateFilter, setDateFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  const loadData = async () => {
    setLoading(true);
    try {
      const data = await fetchLaunches();
      setLaunches(data);
      setLoading(false);
    } catch (e) {
      setLoading(false);
      console.error(e);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleDateFilterChange = (event) => {
    setDateFilter(event.target.value);
  };

  const handleStatusFilterChange = (event) => {
    setStatusFilter(event.target.value);
  };

  const filteredLaunches = launches.filter((launch) => {
    const filterDate = new Date();
    filterDate.setMonth(filterDate.getMonth() - 6);
    const launchDate = new Date(launch.launch_date_utc);
    const launchStatus = launch.launch_success
    ? "success"
    : launch.launch_success === false
    ? "failure"
    : "upcoming"
  
    if (dateFilter === "past-6" && launchDate < filterDate) {
      return false;
    }
    if (dateFilter === "last-6" && launchDate >= filterDate) {
      return false;
    }
  
    if (statusFilter !== "all" && launchStatus !== statusFilter) {
      return false;
    }
  
    return true;
  });

  return (
    <div style={{margin: "30px 150px"}}>
      <Box display="flex" justifyContent="space-between" alignItems="center" marginBottom={2}>
        <FormControl>
        <Select sx={{ boxShadow: 'none', '.MuiOutlinedInput-notchedOutline': { border: 0 } }} autoWidth value={dateFilter} onChange={handleDateFilterChange}>
            <MenuItem value="all">All</MenuItem>
            <MenuItem value="past-6">Past 6 Months</MenuItem>
            <MenuItem value="last-6">Last 6 Months</MenuItem>
          </Select>
        </FormControl>

        <FormControl>
          <Select sx={{ boxShadow: 'none', '.MuiOutlinedInput-notchedOutline': { border: 0 } }} autoWidth value={statusFilter} onChange={handleStatusFilterChange}>
            <MenuItem value="all">All Launches</MenuItem>
            <MenuItem value="upcoming">Upcoming Launches</MenuItem>
            <MenuItem value="success">Successful Launches</MenuItem>
            <MenuItem value="failure">Failed Launches</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <LaunchTable loading={loading} launches={filteredLaunches} />
    </div>
  );
};

export default Dashboard;
