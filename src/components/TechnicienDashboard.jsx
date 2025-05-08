import { useEffect, useState } from "react";
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
import api from "../utils/api";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

const TechnicienDashboard = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState("month");
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedIntervention, setSelectedIntervention] = useState(null);
  const navigate = useNavigate();

  // Fonction pour obtenir les couleurs selon le statut
  const getStatusStyles = (status) => {
    switch (status) {
      case "planifiee":
        return {
          color: "bg-blue-100 border-l-4 border-blue-400",
          textColor: "text-blue-800",
        };
      case "en_cours":
        return {
          color: "bg-yellow-100 border-l-4 border-yellow-400",
          textColor: "text-yellow-800",
        };
      case "terminee":
        return {
          color: "bg-green-100 border-l-4 border-green-400",
          textColor: "text-green-800",
        };
      case "annulee":
        return {
          color: "bg-red-100 border-l-4 border-red-400",
          textColor: "text-red-800",
        };
      default:
        return {
          color: "bg-gray-100 border-l-4 border-gray-400",
          textColor: "text-gray-800",
        };
    }
  };

  // Récupérer les interventions du technicien
  useEffect(() => {
    const fetchInterventions = async () => {
      try {
        // Récupérer l'ID du technicien depuis le token
        const token = localStorage.getItem("token");
        const decoded = jwtDecode(token);
        const technicienId = decoded.id;

        const response = await api.get(
          `/interventions/technicien/${technicienId}`
        );

        const formattedEvents = response.data.map((intervention) => ({
          id: intervention.id,
          title: `${intervention.site_nom || "Client inconnu"} - ${
            intervention.type_visite
          }`,
          date: new Date(intervention.date_planifiee),
          status: intervention.status,
          client: intervention.client_nom,
          site: intervention.site_nom,
          typeVisite: intervention.type_visite,
          ...getStatusStyles(intervention.status),
        }));

        setEvents(formattedEvents);
      } catch (error) {
        console.error("Erreur lors du chargement des interventions:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchInterventions();
  }, []);

  const handlePreviousMonth = () =>
    setCurrentDate((prev) => subMonths(prev, 1));
  const handleNextMonth = () => setCurrentDate((prev) => addMonths(prev, 1));

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader />

      <div className="container mx-auto px-4 py-6 max-w-7xl">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Mon planning</h1>

        {loading ? (
          <div className="text-center p-4">Chargement des interventions...</div>
        ) : (
          <div className="bg-white rounded-md shadow-sm overflow-hidden">
            <CalendarHeader
              currentDate={currentDate}
              onPrevious={handlePreviousMonth}
              onNext={handleNextMonth}
              view={view}
              onViewChange={setView}
            />
            <CalendarGrid
              currentDate={currentDate}
              events={events}
              view={view}
              onEventClick={setSelectedIntervention}
            />
          </div>
        )}
      </div>
      {selectedIntervention && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4"
          onClick={() => setSelectedIntervention(null)}
        >
          <div
            className="bg-white rounded-lg p-6 max-w-md w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl font-bold mb-4">
              Détails de l'intervention
            </h2>
            <div className="space-y-2 mb-4">
              <p>
                <span className="font-semibold">Date planifiée :</span>
                {format(selectedIntervention.date, "dd/MM/yyyy", {
                  locale: fr,
                })}
              </p>
              <p>
                <span className="font-semibold">Client :</span>{" "}
                {selectedIntervention.client}
              </p>
              <p>
                <span className="font-semibold">Site :</span>{" "}
                {selectedIntervention.site}
              </p>
              <p>
                <span className="font-semibold">Type de visite :</span>{" "}
                {selectedIntervention.typeVisite}
              </p>
            </div>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => {
                  navigate(`/intervention/${selectedIntervention.id}`);
                  setSelectedIntervention(null);
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Commencer
              </button>
              <button
                onClick={() => setSelectedIntervention(null)}
                className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
              >
                Fermer
              </button>
            </div>
          </div>
        </div>
      )}
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
  </div>
);

const CalendarGrid = ({ currentDate, events, view, onEventClick }) => {
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
                  <CalendarEvents
                    events={dayEvents}
                    onEventClick={onEventClick}
                  />
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

const CalendarEvents = ({ events, onEventClick }) => (
  <div className="mt-1 space-y-1">
    {events.map((event) => (
      <div
        key={event.id}
        className={`text-xs p-1 rounded truncate ${event.color} ${event.textColor} cursor-pointer hover:opacity-80`}
        onClick={() => onEventClick(event)}
      >
        {event.title}
      </div>
    ))}
  </div>
);

export default TechnicienDashboard;
