
export interface Event {
  _id?: string;
  title: string;
  date: string;
  time: string;
  location: string;
  category: string;
  organizer: string;
  image: string;
  description: string;
  price: number;
  attendees?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface EventFormData extends Omit<Event, '_id' | 'createdAt' | 'updatedAt'> {}
