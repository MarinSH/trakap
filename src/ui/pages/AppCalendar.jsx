import React, { useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import frLocale from '@fullcalendar/core/locales/fr';
import { STATUS_GRADIENTS } from '../../utils/config';
import { useNavigate } from 'react-router-dom';

export default function AppCalendar() {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  const handleViewOffer = (id) => {
    navigate(`/offer/view/${id}`);
  };

  useEffect(() => {
    const loadEvents = async () => {
      try {
        const data = await window.api.readDirectory();

        const extractedEvents = data.offers.flatMap((offer) => {
          const events = [];

          const statusColor = STATUS_GRADIENTS[offer.status];

          if (offer.interviewDate) {
            events.push({
              id: offer.id,
              title: `Entretien - ${offer.companyName}`,
              start: offer.interviewDate,
              status: offer.status,
              backgroundColor: statusColor,
            });
          }

          if (offer.relaunchDate) {
            events.push({
              id: offer.id,
              title: `Relance - ${offer.companyName}`,
              start: offer.relaunchDate,
              status: offer.status,
              backgroundColor: statusColor,
            });
          }

          if (offer.sendAt) {
            events.push({
              id: offer.id,
              title: `Envoie - ${offer.companyName}`,
              start: offer.sendAt,
              status: offer.status,
              backgroundColor: statusColor,
            });
          }

          return events;
        });

        setEvents(extractedEvents);
      } catch (error) {
        console.error('Error loading data:', error);
      }
    };

    loadEvents();
  }, []);

  return (
    <section className="py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-6 text-base-content">Calendrier des offres</h1>

        <div className="bg-base-200 p-4 rounded-lg shadow-md">
            <FullCalendar
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                events={events}
                locale={frLocale}
                headerToolbar={{
                    left: 'prev,next today',
                    center: 'title',
                    right: 'dayGridMonth,timeGridWeek,timeGridDay',
                }}
                height="auto"
                eventTimeFormat={{
                    hour: '2-digit',
                    minute: '2-digit',
                    meridiem: 'short',
                }}
                eventClassNames={() => {
                    return ['bg-transparent', 'border-transparent'];
                }}
                eventContent={({ event }) => (
                    <div
                    className={`text-xs text-white rounded px-2 py-1 ${event.backgroundColor} cursor-pointer`}
                    style={{ whiteSpace: 'normal', wordWrap: 'break-word', maxWidth: '100%' }}
                    >
                    {event.title}
                    </div>
                )}
                eventClick={(info) => {
                    handleViewOffer(info.event.id);
                }}
                dayHeaderClassNames="bg-gray-750 text-base-content"
                dayCellClassNames={({ isToday }) =>
                    `${isToday ? 'bg-primary-900' : 'bg-base-200'}`
                }
                className="text-base-content"
            />
        </div>
      </div>
    </section>
  );
}
