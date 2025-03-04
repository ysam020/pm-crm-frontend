import { useEffect, useState } from "react";
import apiClient from "../config/axiosConfig";

function useEvents() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    async function getEvents() {
      try {
        const res = await apiClient.get(`/get-events`);
        setEvents(res.data);
      } catch (err) {
        console.error(err);
      }
    }

    getEvents();
  }, []);

  return events;
}

export default useEvents;
