import React, { useContext, useEffect } from "react";
import "@fullcalendar/react/dist/vdom";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import { useAllWorkers } from "@hooks/workers/useAllWorkers";
import { BreadcrumbContext } from "src/contexts/BreadcrumbContext";
import { FaPlaneArrival, FaPlaneDeparture } from "react-icons/fa";

const CalendarPage = () => {
  const { data: { data: workers } = {} } = useAllWorkers();
  const { setBreadcrumb } = useContext(BreadcrumbContext);

  useEffect(() => setBreadcrumb([{ name: "Calender", path: "/calendar" }]), []);

  return (
    <div className="bg-white">
      {workers && (
        <FullCalendar
          plugins={[dayGridPlugin]}
          initialView="dayGridMonth"
          headerToolbar={{
            start: "prev,next today",
            center: "title",
            end: "dayGridMonth,dayGridWeek,dayGridDay",
          }}
          eventContent={(event) => {
            const worker = event.event.extendedProps;
            return (
              <div className="flex items-center justify-between space-x-2">
                <span>
                  {worker.firstname} {worker.lastname}{" "}
                </span>
                {worker.status === "WORKING" ? (
                  <FaPlaneDeparture />
                ) : (
                  <FaPlaneArrival />
                )}
              </div>
            );
          }}
          events={workers?.map((worker) => ({
            id: worker.id,
            extendedProps: worker,
            start: worker.next_date,
            allDay: true,
            classNames: "px-3 py-2 font-medium tracking-wide text-sm",
          }))}
        />
      )}
    </div>
  );
};

export default CalendarPage;
