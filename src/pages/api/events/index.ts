
import { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { db } = await connectToDatabase();
    const eventsCollection = db.collection('events');

    // GET - Fetch all events
    if (req.method === 'GET') {
      const events = await eventsCollection.find({}).sort({ createdAt: -1 }).toArray();
      
      return res.status(200).json({
        success: true,
        events: events.map(event => ({
          ...event,
          _id: event._id.toString()
        }))
      });
    }
    
    // POST - Create a new event
    if (req.method === 'POST') {
      const eventData = {
        ...req.body,
        createdAt: new Date(),
        updatedAt: new Date(),
        attendees: 0 // Start with 0 attendees for new events
      };
      
      const result = await eventsCollection.insertOne(eventData);
      
      return res.status(201).json({
        success: true,
        event: {
          ...eventData,
          _id: result.insertedId.toString()
        }
      });
    }
    
    // Method not allowed
    return res.status(405).json({ success: false, message: 'Method not allowed' });
    
  } catch (error) {
    console.error('API Error:', error);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
}
