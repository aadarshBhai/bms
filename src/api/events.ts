
import { Event } from '@/models/Event';

// Base URL for API calls
const API_BASE_URL = '/api/events';

// Get all events
export const fetchEvents = async (): Promise<Event[]> => {
  const response = await fetch(API_BASE_URL);
  
  if (!response.ok) {
    throw new Error('Failed to fetch events');
  }
  
  const data = await response.json();
  return data.events;
};

// Get a single event by ID
export const fetchEventById = async (id: string): Promise<Event> => {
  const response = await fetch(`${API_BASE_URL}/${id}`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch event');
  }
  
  const data = await response.json();
  return data.event;
};

// Create a new event
export const createEvent = async (eventData: Omit<Event, '_id'>): Promise<Event> => {
  const response = await fetch(API_BASE_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(eventData),
  });
  
  if (!response.ok) {
    throw new Error('Failed to create event');
  }
  
  const data = await response.json();
  return data.event;
};

// Update an existing event
export const updateEvent = async (id: string, eventData: Partial<Event>): Promise<Event> => {
  const response = await fetch(`${API_BASE_URL}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(eventData),
  });
  
  if (!response.ok) {
    throw new Error('Failed to update event');
  }
  
  const data = await response.json();
  return data.event;
};

// Delete an event
export const deleteEvent = async (id: string): Promise<void> => {
  const response = await fetch(`${API_BASE_URL}/${id}`, {
    method: 'DELETE',
  });
  
  if (!response.ok) {
    throw new Error('Failed to delete event');
  }
};
