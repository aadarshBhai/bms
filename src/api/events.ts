
import { Event, EventFormData } from '@/models/Event';

// For future MongoDB integration
// Mock data for events until MongoDB implementation
let MOCK_EVENTS: Event[] = [
  {
    _id: "1",
    title: "React Workshop",
    date: "June 15, 2023",
    time: "10:00 AM",
    location: "Tech Hub, Building B",
    category: "workshop",
    organizer: "Code Club",
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97",
    description: "Learn the fundamentals of React and build your first application.",
    price: 500,
    attendees: 45,
    createdAt: new Date("2023-05-01"),
    updatedAt: new Date("2023-05-10")
  },
  {
    _id: "2",
    title: "College Annual Fest",
    date: "July 10, 2023",
    time: "9:00 AM",
    location: "Main Auditorium",
    category: "festival",
    organizer: "Student Council",
    image: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4",
    description: "Annual cultural festival with music, dance, and art performances.",
    price: 0,
    attendees: 350,
    createdAt: new Date("2023-04-15"),
    updatedAt: new Date("2023-04-15")
  },
  {
    _id: "3",
    title: "Coding Competition",
    date: "June 25, 2023",
    time: "2:00 PM",
    location: "Computer Lab, Science Block",
    category: "competition",
    organizer: "Computer Science Department",
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d",
    description: "Test your programming skills against other teams in this exciting competition.",
    price: 200,
    attendees: 60,
    createdAt: new Date("2023-05-05"),
    updatedAt: new Date("2023-05-08")
  }
];

// GET all events
export async function getEvents(): Promise<{ events: Event[] }> {
  try {
    // In the future, this would connect to MongoDB
    // For now, we'll return mock data
    return { events: MOCK_EVENTS };
  } catch (error) {
    console.error("Error fetching events:", error);
    throw new Error("Failed to fetch events");
  }
}

// GET a single event by ID
export async function getEventById(id: string): Promise<{ event: Event }> {
  try {
    const event = MOCK_EVENTS.find(event => event._id === id);
    
    if (!event) {
      throw new Error("Event not found");
    }
    
    return { event };
  } catch (error) {
    console.error("Error fetching event:", error);
    throw new Error("Failed to fetch event");
  }
}

// POST - Create a new event
export async function createEvent(eventData: EventFormData): Promise<{ event: Event }> {
  try {
    const newEvent: Event = {
      ...eventData,
      _id: Date.now().toString(), // Simple ID generator (would be MongoDB _id in production)
      attendees: 0,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    MOCK_EVENTS.push(newEvent);
    
    return { event: newEvent };
  } catch (error) {
    console.error("Error creating event:", error);
    throw new Error("Failed to create event");
  }
}

// PUT - Update an event
export async function updateEvent(id: string, eventData: EventFormData): Promise<{ event: Event }> {
  try {
    const eventIndex = MOCK_EVENTS.findIndex(event => event._id === id);
    
    if (eventIndex === -1) {
      throw new Error("Event not found");
    }
    
    const updatedEvent: Event = {
      ...MOCK_EVENTS[eventIndex],
      ...eventData,
      updatedAt: new Date()
    };
    
    MOCK_EVENTS[eventIndex] = updatedEvent;
    
    return { event: updatedEvent };
  } catch (error) {
    console.error("Error updating event:", error);
    throw new Error("Failed to update event");
  }
}

// DELETE - Remove an event
export async function deleteEvent(id: string): Promise<{ message: string }> {
  try {
    const initialLength = MOCK_EVENTS.length;
    MOCK_EVENTS = MOCK_EVENTS.filter(event => event._id !== id);
    
    if (MOCK_EVENTS.length === initialLength) {
      throw new Error("Event not found");
    }
    
    return { message: "Event deleted successfully" };
  } catch (error) {
    console.error("Error deleting event:", error);
    throw new Error("Failed to delete event");
  }
}
