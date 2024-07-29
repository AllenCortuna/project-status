"use client";
import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

const Bidding = () => {
  const events = [
    { title: "Meeting 1", start: "2024-08-02" },
    { title: "Meeting 2", start: "2024-08-02" },
    { title: "Meeting 3", start: "2024-08-02" },
    { title: "Meeting 4", start: "2024-08-02" },
    { title: "Meeting 5", start: "2024-08-02" },
    { title: "Bidding", start: "2024-07-02" },
    { title: "Meeting 1", start: "2024-07-02" },
    { title: "Meeting 2", start: "2024-07-02" },
    { title: "Meeting 3", start: "2024-07-02" },
    { title: "Meeting 4", start: "2024-07-02" },
    { title: "Meeting 5", start: "2024-07-02" },
    { title: "Bidding", start: "2024-07-02" },
  ];

  const renderEventContent = (eventContent) => {
    return (
      <div>
        <b>{eventContent.timeText}</b>
        <i>{eventContent.event.title}</i>
      </div>
    );
  };

  const handleMoreLinkClick = (info) => {
    console.log('Clicked on more link', info);
    return false;
  };

  return (
    <div className="flex w-screen h-[48rem] flex-col justify-center items-center p-5">
    <div className="flex bg-white rounded-lg shadow-md p-4  h-[calc(100%-5rem)] w-full mx-auto">
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth,timeGridWeek,timeGridDay",
          }}
          events={events}
          dayMaxEvents={2}
          eventContent={renderEventContent}
          moreLinkClick={handleMoreLinkClick}
          height="100%"
          
          dayCellClassNames="max-h-40"
        />
      </div>
    </div>
  );
};

export default Bidding;