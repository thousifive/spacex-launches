import React, { useState, useEffect } from "react";
import {useNavigate, useLocation} from 'react-router-dom';
import { fetchLaunches } from "../sevices";
import LaunchTable from "./LaunchTable";
import {
  FormControl,
  Select,
  MenuItem,
  Box,
} from "@mui/material";
import './Dashboard.css';

const Dashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const [dateFilter, setDateFilter] = useState(queryParams.get('date') || "all");
  const [statusFilter, setStatusFilter] = useState(queryParams.get("status") || "all");
  const [launches, setLaunches] = useState([]);
  const [loading, setLoading] = useState(true);

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

  useEffect(() => {
    queryParams.set("date", dateFilter);
    queryParams.set("status", statusFilter)
    navigate({ search: queryParams.toString() });
    // eslint-disable-next-line
  }, [dateFilter, statusFilter])

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
    ? "failed"
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
    <div className="main-container">
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
            <MenuItem value="failed">Failed Launches</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <LaunchTable loading={loading} launches={filteredLaunches} />
    </div>
  );
};

export default Dashboard;
