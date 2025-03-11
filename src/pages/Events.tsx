
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar, Clock, Filter, MapPin, Search, Tag, Users } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Events = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');
  
  // Dummy events data
  const events = [
    {
      id: 1,
      title: "Annual Tech Fest 2023",
      date: "Oct 25, 2023",
      time: "10:00 AM",
      location: "Main Auditorium",
      category: "festival",
      organizer: "Computer Science Department",
      image: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1712&q=80",
      description: "Join us for the biggest tech festival of the year featuring workshops, competitions, and guest speakers from leading tech companies.",
      price: 500,
      attendees: 120,
    },
    {
      id: 2,
      title: "Coding Competition",
      date: "Nov 5, 2023",
      time: "2:00 PM",
      location: "Computer Lab 3",
      category: "competition",
      organizer: "Coding Club",
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1772&q=80",
      description: "Show off your coding skills in this 3-hour competition. Prizes for the top performers!",
      price: 0,
      attendees: 50,
    },
    {
      id: 3,
      title: "Leadership Workshop",
      date: "Nov 10, 2023",
      time: "11:00 AM",
      location: "Seminar Hall",
      category: "workshop",
      organizer: "Management Department",
      image: "https://images.unsplash.com/photo-1590402494610-2c378a9114c6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80",
      description: "Develop your leadership skills with this hands-on workshop led by industry experts.",
      price: 200,
      attendees: 30,
    },
    {
      id: 4,
      title: "General Knowledge Quiz",
      date: "Nov 15, 2023",
      time: "3:00 PM",
      location: "Library Conference Room",
      category: "quiz",
      organizer: "Quiz Club",
      image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1772&q=80",
      description: "Test your knowledge across various subjects in this exciting quiz competition.",
      price: 50,
      attendees: 40,
    },
    {
      id: 5,
      title: "Cultural Festival",
      date: "Dec 5, 2023",
      time: "5:00 PM",
      location: "College Grounds",
      category: "festival",
      organizer: "Cultural Committee",
      image: "https://images.unsplash.com/photo-1508997449629-303059a039c0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80",
      description: "Celebrate diversity with music, dance, food, and cultural performances from around the world.",
      price: 100,
      attendees: 200,
    },
    {
      id: 6,
      title: "Research Symposium",
      date: "Dec 12, 2023",
      time: "9:00 AM",
      location: "Science Building",
      category: "conference",
      organizer: "Research Department",
      image: "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80",
      description: "Present your research findings and learn from others in this one-day symposium.",
      price: 0,
      attendees: 80,
    },
  ];

  // Filter events based on search term and filters
  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          event.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || event.category === categoryFilter;
    // For simplicity, we're not implementing actual date filtering logic
    const matchesDate = dateFilter === 'all';
    
    return matchesSearch && matchesCategory && matchesDate;
  });
  
  // Highlight search terms in text
  const highlightText = (text, term) => {
    if (!term.trim()) return text;
    
    const parts = text.split(new RegExp(`(${term})`, 'gi'));
    return parts.map((part, index) => 
      part.toLowerCase() === term.toLowerCase() ? 
        <span key={index} className="bg-yellow-200">{part}</span> : part
    );
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <section className="py-10 bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-brand-blue mb-4">Discover Events</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Find and register for the best events, workshops, and competitions happening at your educational institution.
            </p>
          </div>
          
          <div className="bg-white rounded-xl shadow-md p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="md:col-span-2">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <Search className="h-5 w-5 text-gray-400" />
                  </div>
                  <Input 
                    placeholder="Search events..." 
                    className="pl-10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              
              <div>
                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger>
                    <div className="flex items-center">
                      <Tag className="h-4 w-4 mr-2" />
                      <SelectValue placeholder="Category" />
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="workshop">Workshops</SelectItem>
                    <SelectItem value="competition">Competitions</SelectItem>
                    <SelectItem value="quiz">Quizzes</SelectItem>
                    <SelectItem value="conference">Conferences</SelectItem>
                    <SelectItem value="festival">Festivals</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Select value={dateFilter} onValueChange={setDateFilter}>
                  <SelectTrigger>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2" />
                      <SelectValue placeholder="Date" />
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Any Date</SelectItem>
                    <SelectItem value="today">Today</SelectItem>
                    <SelectItem value="tomorrow">Tomorrow</SelectItem>
                    <SelectItem value="this-week">This Week</SelectItem>
                    <SelectItem value="this-month">This Month</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="flex items-center justify-end mt-4">
              <Button variant="outline" className="flex items-center gap-1">
                <Filter className="h-4 w-4" />
                More Filters
              </Button>
            </div>
          </div>
          
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">
              {filteredEvents.length} Events Found
              {searchTerm && <span> for "{searchTerm}"</span>}
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.map((event) => (
              <div key={event.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <div className="h-48 overflow-hidden">
                  <img 
                    src={event.image} 
                    alt={event.title} 
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-xl font-semibold">
                      {highlightText(event.title, searchTerm)}
                    </h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      event.price > 0 ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
                    }`}>
                      {event.price > 0 ? `₹${event.price}` : 'Free'}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-4 line-clamp-2">
                    {highlightText(event.description, searchTerm)}
                  </p>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-gray-500">
                      <Calendar className="h-4 w-4 mr-2" />
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center text-gray-500">
                      <Clock className="h-4 w-4 mr-2" />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center text-gray-500">
                      <MapPin className="h-4 w-4 mr-2" />
                      <span>{event.location}</span>
                    </div>
                    <div className="flex items-center text-gray-500">
                      <Users className="h-4 w-4 mr-2" />
                      <span>{event.attendees} attending</span>
                    </div>
                  </div>
                  
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="w-full bg-brand-blue hover:bg-brand-purple transition-colors">
                        Register Now
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[500px]">
                      <DialogHeader>
                        <DialogTitle className="text-2xl">Registration Form</DialogTitle>
                        <DialogDescription>
                          Complete this form to register for "{event.title}"
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="space-y-2">
                          <Label htmlFor="reg-name">Full Name</Label>
                          <Input id="reg-name" placeholder="Enter your full name" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="reg-email">Email</Label>
                          <Input id="reg-email" type="email" placeholder="Enter your email" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="reg-phone">Phone Number</Label>
                          <Input id="reg-phone" placeholder="Enter your phone number" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="reg-organization">Organization/Institution</Label>
                          <Input id="reg-organization" placeholder="Your school or organization" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="reg-dietary">Dietary Requirements (if any)</Label>
                          <Input id="reg-dietary" placeholder="Any dietary restrictions" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="reg-special">Special Accommodations (if any)</Label>
                          <Textarea 
                            id="reg-special" 
                            placeholder="Any special accommodations needed"
                            className="resize-none"
                            rows={3}
                          />
                        </div>
                        <div className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            id="updates"
                            className="h-4 w-4 rounded border-gray-300 text-brand-blue focus:ring-brand-blue"
                          />
                          <Label htmlFor="updates" className="text-sm font-normal">
                            Send me updates about this event
                          </Label>
                        </div>
                        
                        {event.price > 0 ? (
                          <div className="mt-2 p-4 border rounded-md bg-gray-50">
                            <div className="flex justify-between mb-3">
                              <span className="font-medium">Registration Fee:</span>
                              <span className="font-bold">₹{event.price}</span>
                            </div>
                            <div className="text-center">
                              <p className="text-sm text-gray-600 mb-2">Scan QR code to pay</p>
                              <div className="bg-white p-2 inline-block rounded-md shadow-sm">
                                <svg
                                  className="w-32 h-32"
                                  viewBox="0 0 100 100"
                                  style={{ background: 'white' }}
                                >
                                  <path 
                                    d="M0,0 L100,0 L100,100 L0,100 Z" 
                                    fill="none" 
                                    stroke="black" 
                                    strokeWidth="1"
                                  />
                                  <rect x="30" y="30" width="40" height="40" fill="black" />
                                  <rect x="10" y="10" width="30" height="30" fill="black" />
                                  <rect x="60" y="10" width="30" height="30" fill="black" />
                                  <rect x="10" y="60" width="30" height="30" fill="black" />
                                </svg>
                              </div>
                              <p className="text-xs text-gray-500 mt-2">
                                After payment, please click "Complete Registration"
                              </p>
                            </div>
                          </div>
                        ) : null}
                        
                        <Button className="mt-2 bg-brand-blue hover:bg-brand-purple transition-colors">
                          {event.price > 0 ? 'Complete Registration' : 'Register for Free'}
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            ))}
          </div>
          
          {filteredEvents.length === 0 && (
            <div className="text-center py-12">
              <div className="text-5xl mb-4">🔍</div>
              <h3 className="text-2xl font-semibold mb-2">No events found</h3>
              <p className="text-gray-600 mb-6">
                We couldn't find any events matching your search criteria. Try adjusting your filters.
              </p>
              <Button 
                variant="outline" 
                onClick={() => {
                  setSearchTerm('');
                  setCategoryFilter('all');
                  setDateFilter('all');
                }}
              >
                Clear All Filters
              </Button>
            </div>
          )}
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Events;
