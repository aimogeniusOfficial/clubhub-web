import React, { useState, ChangeEvent } from 'react';
import { Modal, Button, TextInput, Select, NumberInput, Paper, Text } from '@mantine/core';
import { IconClock } from '@tabler/icons-react';

type Event = {
  id: number;
  name: string;
  description: string;
  date: Date;
  time: string;
};

const MonthlyCalendar = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [events, setEvents] = useState<Event[]>([]);
  const [eventName, setEventName] = useState('');
  const [eventDescription, setEventDescription] = useState('');
  const [eventDate, setEventDate] = useState<number>(1);
  const [eventTime, setEventTime] = useState('');
  const [eventModalOpen, setEventModalOpen] = useState(false);
  const [selectedEvents, setSelectedEvents] = useState<Event[]>([]);

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const startDay = new Date(currentYear, currentMonth, 1).getDay();
  const totalSlots = startDay + daysInMonth;

  const addEvent = () => {
    if (eventName && eventTime && eventDescription) {
      setEvents(prev => [...prev, {
        id: Date.now(),
        name: eventName,
        description: eventDescription,
        date: new Date(currentYear, currentMonth, eventDate),
        time: eventTime
      }]);
      setEventName('');
      setEventDescription('');
      setEventTime('');
    }
  };

  const handleDayClick = (dayEvents: Event[]) => {
    setSelectedEvents(dayEvents);
    setEventModalOpen(true);
  };

  return (
    <div>
      {/* Navigation */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <Button onClick={() => setCurrentMonth(prev => (prev - 1 + 12) % 12)}>Previous</Button>
        <div>{`${new Date(currentYear, currentMonth).toLocaleString('default', { month: 'long' })} ${currentYear}`}</div>
        <Button onClick={() => setCurrentMonth(prev => (prev + 1) % 12)}>Next</Button>
      </div>

      {/* Event Form */}
      <div style={{ marginBottom: '2rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
        <TextInput 
          label="Event Name"
          placeholder="Event Name"
          value={eventName}
          onChange={(event: ChangeEvent<HTMLInputElement>) => setEventName(event.currentTarget.value)}
        />
        <TextInput 
          label="Event Time"
          placeholder="HH:mm"
          value={eventTime}
          onChange={(event: ChangeEvent<HTMLInputElement>) => setEventTime(event.currentTarget.value)}
        />
        <TextInput 
          label="Description"
          placeholder="Event Description"
          value={eventDescription}
          onChange={(event: ChangeEvent<HTMLInputElement>) => setEventDescription(event.currentTarget.value)}
        />
        <NumberInput 
          label="Date (day of the month)"
          min={1}
          max={daysInMonth}
          value={eventDate}
          onChange={(value: number | "") => typeof value === 'number' && setEventDate(value)}
        />
        <Button onClick={addEvent} fullWidth>Add Event</Button>
      </div>

      {/* Monthly Calendar Display */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
        {Array.from({ length: totalSlots }).map((_, slotIndex) => {
          if (slotIndex < startDay) {
            return <div style={{ flex: '0 0 calc(14% - 1rem)', height: '180px', border: '1px solid transparent' }}></div>;
          }
          const dayIndex = slotIndex - startDay;
          const dayEvents = events.filter(event => event.date.getDate() === dayIndex + 1 && event.date.getMonth() === currentMonth);
          
          return (
            <div 
              key={slotIndex} 
              style={{ flex: '0 0 calc(14% - 1rem)', height: '180px', border: '1px solid #e5e5e5', borderRadius: '15px', padding: '10px' }}
              onClick={() => dayEvents.length && handleDayClick(dayEvents)}
            >
              <div style={{ fontSize: '0.8em', marginBottom: '1rem' }}>{dayIndex + 1}</div>
              {dayEvents.map(event => (
                <div 
                  key={event.id} 
                  style={{ display: 'flex', alignItems: 'center', gap: '5px', cursor: 'pointer', marginBottom: '5px' }}
                >
                  <IconClock size={14} />
                  <Text size="sm">{event.name}</Text>
                </div>
              ))}
            </div>
          );
        })}
      </div>

      {/* Modal for Event Details */}
      {eventModalOpen && (
        <Modal
          opened={eventModalOpen}
          onClose={() => setEventModalOpen(false)}
          title="Event Details"
        >
          {selectedEvents.map(event => (
            <Paper radius="sm" style={{ marginBottom: '1rem', padding: '1rem' }}>

              <div style={{ fontWeight: 'bold', fontSize: '1.2em', marginBottom: '0.5em' }}>{event.name}</div>
              <Text size="sm" style={{ marginBottom: '0.5em' }}>{event.description}</Text>
              <div style={{ marginTop: '1em', fontSize: '0.9em' }}>
                <strong>Date:</strong> {event.date.toDateString()}
              </div>
              <div style={{ marginTop: '0.5em', fontSize: '0.9em' }}>
                <strong>Time:</strong> {event.time}
              </div>
            </Paper>
          ))}
        </Modal>
      )}
    </div>
  );
};

export default MonthlyCalendar;
