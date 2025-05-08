// src/components/Calendar.js
import { useState } from "react";
import {
  format,
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
} from "date-fns";
import { fr } from "date-fns/locale";
import { ChevronLeft, ChevronRight } from "lucide-react";
import DashboardHeader from "./DashboardHeader";

const TechnicienDashboard = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState("month");

  const [events] = useState([
    {
      id: "1",
      title: "Intervention Client A",
      date: new Date(),
      color: "bg-blue-100 border-l-4 border-blue-400",
      textColor: "text-blue-800",
    },
    {
      id: "2",
      title: "Maintenance préventive",
      date: new Date(),
      color: "bg-green-100 border-l-4 border-green-400",
      textColor: "text-green-800",
    },
  ]);

  const handlePreviousMonth = () =>
    setCurrentDate((prev) => subMonths(prev, 1));
  const handleNextMonth = () => setCurrentDate((prev) => addMonths(prev, 1));

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader />

      <div className="container mx-auto px-4 py-6 max-w-7xl">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Mon planning</h1>

        <div className="bg-white rounded-md shadow-sm overflow-hidden">
          <CalendarHeader
            currentDate={currentDate}
            onPrevious={handlePreviousMonth}
            onNext={handleNextMonth}
            view={view}
            onViewChange={setView}
          />
          <CalendarGrid currentDate={currentDate} events={events} view={view} />
        </div>
      </div>
    </div>
  );
};

const CalendarHeader = ({
  currentDate,
  onPrevious,
  onNext,
  view,
  onViewChange,
}) => (
  <div className="flex items-center justify-between p-4 border-b">
    <div className="text-lg font-medium flex items-center gap-1">
      <button
        onClick={onPrevious}
        className="p-1 hover:bg-gray-100 rounded-full"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
      <h2 className="w-48 text-center">
        {format(currentDate, "MMMM yyyy", { locale: fr })}
      </h2>
      <button onClick={onNext} className="p-1 hover:bg-gray-100 rounded-full">
        <ChevronRight className="h-5 w-5" />
      </button>
    </div>

    <div className="flex gap-2">
      <div className="flex items-center rounded-full bg-gray-100">
        {["day", "week", "month"].map((v) => (
          <button
            key={v}
            onClick={() => onViewChange(v)}
            className={`rounded-full text-sm h-8 px-4 ${
              view === v ? "bg-red-600 text-white shadow-sm" : "hover:bg-red-200"
            }`}
          >
            {v === "day" && "Jour"}
            {v === "week" && "Semaine"}
            {v === "month" && "Mois"}
          </button>
        ))}
      </div>
    </div>
  </div>
);

const CalendarGrid = ({ currentDate, events }) => {
  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const calendarStart = startOfWeek(monthStart, { weekStartsOn: 1 });
  const calendarEnd = endOfWeek(monthEnd, { weekStartsOn: 1 });

  const days = eachDayOfInterval({ start: calendarStart, end: calendarEnd });
  const weeks = [];
  let week = [];

  days.forEach((day) => {
    week.push(day);
    if (week.length === 7) {
      weeks.push(week);
      week = [];
    }
  });

  const getEventsForDay = (date) =>
    events.filter((event) => isSameDay(event.date, date));

  return (
    <div className="calendar-grid">
      <div className="grid grid-cols-7 bg-gray-50">
        {["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"].map((day) => (
          <div
            key={day}
            className="py-2 text-center text-sm font-medium text-gray-700"
          >
            {day}
          </div>
        ))}
      </div>

      <div className="divide-y">
        {weeks.map((week, weekIndex) => (
          <div
            key={weekIndex}
            className="grid grid-cols-7 divide-x min-h-[100px]"
          >
            {week.map((day, dayIndex) => {
              const isCurrentMonth = isSameMonth(day, currentDate);
              const dayEvents = getEventsForDay(day);

              return (
                <div
                  key={dayIndex}
                  className={`min-h-[100px] p-1 ${
                    !isCurrentMonth && "bg-gray-50"
                  }`}
                >
                  <div className="text-right p-1">
                    <span
                      className={`inline-block w-6 h-6 rounded-full text-center text-sm ${
                        isCurrentMonth ? "text-gray-800" : "text-gray-400"
                      }`}
                    >
                      {format(day, "d")}
                    </span>
                  </div>
                  <CalendarEvents events={dayEvents} />
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

const CalendarEvents = ({ events }) => (
  <div className="mt-1 space-y-1">
    {events.map((event) => (
      <div
        key={event.id}
        className={`text-xs p-1 rounded truncate ${event.color} ${event.textColor}`}
      >
        {event.title}
      </div>
    ))}
  </div>
);

export default TechnicienDashboard;
