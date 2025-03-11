import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Calendar, Clock, Edit, Trash, Plus, Tag, MapPin, DollarSign } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useToast } from "@/components/ui/use-toast";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { auth } from '@/lib/firebase';
import { Event, EventFormData } from '@/models/Event';
import AdminProtectedRoute from '@/components/AdminProtectedRoute';
import { getEvents, createEvent, updateEvent, deleteEvent } from '@/api/events';

const Admin = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [currentEvent, setCurrentEvent] = useState<Event | null>(null);
  const [formData, setFormData] = useState<EventFormData>({
    title: '',
    date: '',
    time: '',
    location: '',
    category: 'workshop',
    organizer: '',
    image: '',
    description: '',
    price: 0
  });
  
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const user = auth.currentUser;
      if (!user) {
        navigate('/login');
      } else {
        fetchEvents();
      }
    };
    
    checkAuth();
  }, [navigate]);

  const fetchEvents = async () => {
    try {
      setIsLoading(true);
      const data = await getEvents();
      setEvents(data.events);
    } catch (error) {
      console.error('Error fetching events:', error);
      toast({
        title: 'Error',
        description: 'Failed to load events. Please try again later.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateEvent = async () => {
    try {
      await createEvent(formData);
      toast({
        title: 'Success',
        description: 'Event created successfully!',
      });
      
      resetForm();
      setShowAddForm(false);
      fetchEvents();
    } catch (error) {
      console.error('Error creating event:', error);
      toast({
        title: 'Error',
        description: 'Failed to create event. Please try again.',
        variant: 'destructive',
      });
    }
  };

  const handleUpdateEvent = async () => {
    if (!currentEvent?._id) return;

    try {
      await updateEvent(currentEvent._id, formData);
      toast({
        title: 'Success',
        description: 'Event updated successfully!',
      });
      
      resetForm();
      setShowEditForm(false);
      fetchEvents();
    } catch (error) {
      console.error('Error updating event:', error);
      toast({
        title: 'Error',
        description: 'Failed to update event. Please try again.',
        variant: 'destructive',
      });
    }
  };

  const handleDeleteEvent = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this event?')) return;

    try {
      await deleteEvent(id);
      toast({
        title: 'Success',
        description: 'Event deleted successfully!',
      });
      
      fetchEvents();
    } catch (error) {
      console.error('Error deleting event:', error);
      toast({
        title: 'Error',
        description: 'Failed to delete event. Please try again.',
        variant: 'destructive',
      });
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      date: '',
      time: '',
      location: '',
      category: 'workshop',
      organizer: '',
      image: '',
      description: '',
      price: 0
    });
    setCurrentEvent(null);
  };

  const openEditForm = (event: Event) => {
    setCurrentEvent(event);
    setFormData({
      title: event.title,
      date: event.date,
      time: event.time,
      location: event.location,
      category: event.category,
      organizer: event.organizer,
      image: event.image,
      description: event.description,
      price: event.price
    });
    setShowEditForm(true);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'price' ? parseFloat(value) || 0 : value
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <AdminProtectedRoute>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        
        <section className="py-10 flex-grow bg-gray-50">
          <div className="container-custom">
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-3xl font-bold text-brand-blue">Admin Dashboard</h1>
              <Button 
                onClick={() => setShowAddForm(true)}
                className="bg-brand-blue hover:bg-brand-purple transition-colors flex items-center gap-2"
              >
                <Plus size={16} />
                Add New Event
              </Button>
            </div>
            
            {isLoading ? (
              <div className="flex justify-center items-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-blue"></div>
              </div>
            ) : (
              <div className="bg-white rounded-xl shadow-md p-6">
                <h2 className="text-xl font-semibold mb-4">Manage Events</h2>
                
                {events.length === 0 ? (
                  <p className="text-center py-8 text-gray-500">No events found. Add your first event!</p>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="min-w-full bg-white">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Event</th>
                          <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date & Time</th>
                          <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                          <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                          <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {events.map((event) => (
                          <tr key={event._id} className="hover:bg-gray-50">
                            <td className="py-4 px-4">
                              <div className="flex items-center">
                                <div className="h-12 w-12 rounded-md overflow-hidden mr-3">
                                  <img 
                                    src={event.image} 
                                    alt={event.title} 
                                    className="h-full w-full object-cover"
                                    onError={(e) => {
                                      (e.target as HTMLImageElement).src = "https://via.placeholder.com/150";
                                    }}
                                  />
                                </div>
                                <div>
                                  <div className="font-medium text-gray-900">{event.title}</div>
                                  <div className="text-sm text-gray-500">{event.location}</div>
                                </div>
                              </div>
                            </td>
                            <td className="py-4 px-4">
                              <div className="text-sm text-gray-900">{event.date}</div>
                              <div className="text-sm text-gray-500">{event.time}</div>
                            </td>
                            <td className="py-4 px-4">
                              <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800">
                                {event.category}
                              </span>
                            </td>
                            <td className="py-4 px-4">
                              <div className="text-sm font-medium">
                                {event.price > 0 ? `₹${event.price}` : 'Free'}
                              </div>
                            </td>
                            <td className="py-4 px-4">
                              <div className="flex space-x-2">
                                <Button 
                                  variant="outline" 
                                  size="sm" 
                                  onClick={() => openEditForm(event)}
                                  className="flex items-center gap-1"
                                >
                                  <Edit size={14} />
                                  Edit
                                </Button>
                                <Button 
                                  variant="outline" 
                                  size="sm" 
                                  onClick={() => handleDeleteEvent(event._id!)}
                                  className="flex items-center gap-1 text-red-600 hover:text-white hover:bg-red-600 border-red-200"
                                >
                                  <Trash size={14} />
                                  Delete
                                </Button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}
            
            {/* Add Event Dialog */}
            <Dialog open={showAddForm} onOpenChange={setShowAddForm}>
              <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                  <DialogTitle className="text-2xl">Add New Event</DialogTitle>
                  <DialogDescription>
                    Fill in the details to create a new event.
                  </DialogDescription>
                </DialogHeader>
                
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="title">Event Title</Label>
                      <Input 
                        id="title" 
                        name="title" 
                        value={formData.title} 
                        onChange={handleInputChange} 
                        placeholder="Enter event title" 
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="category">Category</Label>
                      <Select 
                        value={formData.category} 
                        onValueChange={(value) => handleSelectChange('category', value)}
                      >
                        <SelectTrigger id="category">
                          <div className="flex items-center">
                            <Tag className="h-4 w-4 mr-2" />
                            <SelectValue placeholder="Select Category" />
                          </div>
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="workshop">Workshop</SelectItem>
                          <SelectItem value="competition">Competition</SelectItem>
                          <SelectItem value="quiz">Quiz</SelectItem>
                          <SelectItem value="conference">Conference</SelectItem>
                          <SelectItem value="festival">Festival</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="date">Date</Label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                          <Calendar className="h-4 w-4 text-gray-400" />
                        </div>
                        <Input 
                          id="date" 
                          name="date" 
                          value={formData.date} 
                          onChange={handleInputChange} 
                          placeholder="e.g., Oct 25, 2023" 
                          className="pl-10"
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="time">Time</Label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                          <Clock className="h-4 w-4 text-gray-400" />
                        </div>
                        <Input 
                          id="time" 
                          name="time" 
                          value={formData.time} 
                          onChange={handleInputChange} 
                          placeholder="e.g., 10:00 AM" 
                          className="pl-10"
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="location">Location</Label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                          <MapPin className="h-4 w-4 text-gray-400" />
                        </div>
                        <Input 
                          id="location" 
                          name="location" 
                          value={formData.location} 
                          onChange={handleInputChange} 
                          placeholder="Event location" 
                          className="pl-10"
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="price">Price (₹)</Label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                          <DollarSign className="h-4 w-4 text-gray-400" />
                        </div>
                        <Input 
                          id="price" 
                          name="price" 
                          type="number" 
                          value={formData.price} 
                          onChange={handleInputChange} 
                          placeholder="0 for free events" 
                          className="pl-10"
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="organizer">Organizer</Label>
                    <Input 
                      id="organizer" 
                      name="organizer" 
                      value={formData.organizer} 
                      onChange={handleInputChange} 
                      placeholder="Name of the organizer"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="image">Image URL</Label>
                    <Input 
                      id="image" 
                      name="image" 
                      value={formData.image} 
                      onChange={handleInputChange} 
                      placeholder="Enter image URL"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea 
                      id="description" 
                      name="description" 
                      value={formData.description} 
                      onChange={handleInputChange} 
                      placeholder="Describe the event"
                      className="resize-none"
                      rows={4}
                    />
                  </div>
                </div>
                
                <div className="flex justify-end gap-3">
                  <Button variant="outline" onClick={() => setShowAddForm(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleCreateEvent} className="bg-brand-blue hover:bg-brand-purple transition-colors">
                    Create Event
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
            
            {/* Edit Event Dialog */}
            <Dialog open={showEditForm} onOpenChange={setShowEditForm}>
              <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                  <DialogTitle className="text-2xl">Edit Event</DialogTitle>
                  <DialogDescription>
                    Update the details of this event.
                  </DialogDescription>
                </DialogHeader>
                
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="edit-title">Event Title</Label>
                      <Input 
                        id="edit-title" 
                        name="title" 
                        value={formData.title} 
                        onChange={handleInputChange} 
                        placeholder="Enter event title" 
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="edit-category">Category</Label>
                      <Select 
                        value={formData.category} 
                        onValueChange={(value) => handleSelectChange('category', value)}
                      >
                        <SelectTrigger id="edit-category">
                          <div className="flex items-center">
                            <Tag className="h-4 w-4 mr-2" />
                            <SelectValue placeholder="Select Category" />
                          </div>
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="workshop">Workshop</SelectItem>
                          <SelectItem value="competition">Competition</SelectItem>
                          <SelectItem value="quiz">Quiz</SelectItem>
                          <SelectItem value="conference">Conference</SelectItem>
                          <SelectItem value="festival">Festival</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="edit-date">Date</Label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                          <Calendar className="h-4 w-4 text-gray-400" />
                        </div>
                        <Input 
                          id="edit-date" 
                          name="date" 
                          value={formData.date} 
                          onChange={handleInputChange} 
                          placeholder="e.g., Oct 25, 2023" 
                          className="pl-10"
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="edit-time">Time</Label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                          <Clock className="h-4 w-4 text-gray-400" />
                        </div>
                        <Input 
                          id="edit-time" 
                          name="time" 
                          value={formData.time} 
                          onChange={handleInputChange} 
                          placeholder="e.g., 10:00 AM" 
                          className="pl-10"
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="edit-location">Location</Label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                          <MapPin className="h-4 w-4 text-gray-400" />
                        </div>
                        <Input 
                          id="edit-location" 
                          name="location" 
                          value={formData.location} 
                          onChange={handleInputChange} 
                          placeholder="Event location" 
                          className="pl-10"
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="edit-price">Price (₹)</Label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                          <DollarSign className="h-4 w-4 text-gray-400" />
                        </div>
                        <Input 
                          id="edit-price" 
                          name="price" 
                          type="number" 
                          value={formData.price} 
                          onChange={handleInputChange} 
                          placeholder="0 for free events" 
                          className="pl-10"
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="edit-organizer">Organizer</Label>
                    <Input 
                      id="edit-organizer" 
                      name="organizer" 
                      value={formData.organizer} 
                      onChange={handleInputChange} 
                      placeholder="Name of the organizer"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="edit-image">Image URL</Label>
                    <Input 
                      id="edit-image" 
                      name="image" 
                      value={formData.image} 
                      onChange={handleInputChange} 
                      placeholder="Enter image URL"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="edit-description">Description</Label>
                    <Textarea 
                      id="edit-description" 
                      name="description" 
                      value={formData.description} 
                      onChange={handleInputChange} 
                      placeholder="Describe the event"
                      className="resize-none"
                      rows={4}
                    />
                  </div>
                </div>
                
                <div className="flex justify-end gap-3">
                  <Button variant="outline" onClick={() => setShowEditForm(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleUpdateEvent} className="bg-brand-blue hover:bg-brand-purple transition-colors">
                    Save Changes
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </section>
        
        <Footer />
      </div>
    </AdminProtectedRoute>
  );
};

export default Admin;
