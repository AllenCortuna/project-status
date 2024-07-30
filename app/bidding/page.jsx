"use client";
import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import axios from "axios";

const Bidding = () => {
  const [events, setEvents] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_BASE_API_URL}/api/get-bidding`
        );
        console.log("response.data.result", response.data.result);
        setEvents(
          response.data.result.map((event) => ({
            title: event.contractID,
            start: event.bidding,
          }))
        );
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const renderEventContent = (eventContent) => {
    return (
      <div className="px-2 bg-blue-600 text-white">
        <i>{eventContent.event.title}</i>
      </div>
    );
  };

  const handleMoreLinkClick = (info) => {
    console.log("Clicked on more link", info);
    return false;
  };

  return (
    <div className="w-full h-full p-8 bg-gray-100">
      <div className="bg-white rounded-lg shadow-md p-4 h-full w-auto md:mx-20 flex flex-col">
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          headerToolbar={{
            left: "prev,next today",
            right: "title",
          }}
          events={events}
          dayMaxEvents={1}
          eventContent={renderEventContent}
          moreLinkClick={handleMoreLinkClick}
          selectable={true}
          height="100%"
          className="w-full flex-grow"
          dayCellClassNames="h-auto"
        />
      </div>
    </div>
  );
};

export default Bidding;
