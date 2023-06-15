import axios from "axios";

const fetchLaunches = async () => {
  try {
    const response = await axios.get('https://api.spacexdata.com/v3/launches');
    // setLaunches(response.data);
    // setLoading(false);
    return response.data;
  } catch (error) {
    alert('Error fetching launches: '+ JSON.stringify(error));
    console.error('Error fetching launches:', error);
  }
};

export {fetchLaunches};