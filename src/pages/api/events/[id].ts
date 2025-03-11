
import { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { db } = await connectToDatabase();
    const eventsCollection = db.collection('events');
    
    const { id } = req.query;
    
    if (!ObjectId.isValid(id as string)) {
      return res.status(400).json({ success: false, message: 'Invalid event ID' });
    }
    
    const eventId = new ObjectId(id as string);
    
    // GET - Fetch single event
    if (req.method === 'GET') {
      const event = await eventsCollection.findOne({ _id: eventId });
      
      if (!event) {
        return res.status(404).json({ success: false, message: 'Event not found' });
      }
      
      return res.status(200).json({
        success: true,
        event: {
          ...event,
          _id: event._id.toString()
        }
      });
    }
    
    // PUT - Update event
    if (req.method === 'PUT') {
      const updateData = {
        ...req.body,
        updatedAt: new Date()
      };
      
      const result = await eventsCollection.findOneAndUpdate(
        { _id: eventId },
        { $set: updateData },
        { returnDocument: 'after' }
      );
      
      if (!result.value) {
        return res.status(404).json({ success: false, message: 'Event not found' });
      }
      
      return res.status(200).json({
        success: true,
        event: {
          ...result.value,
          _id: result.value._id.toString()
        }
      });
    }
    
    // DELETE - Remove event
    if (req.method === 'DELETE') {
      const result = await eventsCollection.deleteOne({ _id: eventId });
      
      if (result.deletedCount === 0) {
        return res.status(404).json({ success: false, message: 'Event not found' });
      }
      
      return res.status(200).json({ success: true, message: 'Event deleted successfully' });
    }
    
    // Method not allowed
    return res.status(405).json({ success: false, message: 'Method not allowed' });
    
  } catch (error) {
    console.error('API Error:', error);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
}
