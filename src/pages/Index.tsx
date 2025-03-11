
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar, CalendarIcon, Clock, MapPin, Upload, Users } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Index = () => {
  const [formOpen, setFormOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="hero-gradient text-white py-16 md:py-24">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">Discover Amazing Events</h1>
              <p className="text-lg md:text-xl mb-6 opacity-90">
                Find and register for the best events, workshops, and competitions at your educational institution. All in one place.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button className="bg-white text-brand-blue hover:bg-brand-purple hover:text-white transition-colors text-base">
                  Browse Events
                </Button>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="bg-transparent border-white text-white hover:bg-white hover:text-brand-blue transition-colors text-base">
                      I'm an Organizer
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle className="text-2xl font-bold">Submit Your Event</DialogTitle>
                      <DialogDescription>
                        Fill out this form to submit your event for approval by our admins.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">Name</Label>
                          <Input id="name" placeholder="Your full name" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <Input id="email" type="email" placeholder="Your email" />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="phone">Phone</Label>
                          <Input id="phone" placeholder="Your phone number" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="organization">Organization Name</Label>
                          <Input id="organization" placeholder="Your organization" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="eventName">Event Name</Label>
                        <Input id="eventName" placeholder="Name of your event" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="description">Description</Label>
                        <Textarea id="description" placeholder="Describe your event" rows={3} />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="type">Event Type</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Select type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="workshop">Workshop</SelectItem>
                              <SelectItem value="competition">Competition</SelectItem>
                              <SelectItem value="quiz">Quiz</SelectItem>
                              <SelectItem value="conference">Conference</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="date">Event Date</Label>
                          <div className="flex">
                            <Input id="date" type="date" />
                          </div>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="time">Event Time</Label>
                          <div className="flex">
                            <Input id="time" type="time" />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="duration">Duration (hours)</Label>
                          <Input id="duration" type="number" placeholder="Event duration" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="location">Location</Label>
                        <Input id="location" placeholder="Event venue" />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="attendees">Expected Attendees</Label>
                          <Input id="attendees" type="number" placeholder="Number of attendees" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="paid">Event Type</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Free/Paid" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="free">Free</SelectItem>
                              <SelectItem value="paid">Paid</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="deadline">Registration Deadline</Label>
                          <Input id="deadline" type="date" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="payment">Payment Methods</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Select method" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="upi">UPI</SelectItem>
                              <SelectItem value="card">Credit/Debit Card</SelectItem>
                              <SelectItem value="bank">Bank Transfer</SelectItem>
                              <SelectItem value="cash">Cash</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>QR Code Upload</Label>
                          <div className="flex items-center justify-center border-2 border-dashed rounded-md p-4 hover:bg-slate-50 cursor-pointer">
                            <div className="text-center">
                              <Upload className="mx-auto h-6 w-6 text-gray-400" />
                              <p className="mt-2 text-sm text-gray-500">Upload payment QR</p>
                            </div>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label>Event Poster Upload</Label>
                          <div className="flex items-center justify-center border-2 border-dashed rounded-md p-4 hover:bg-slate-50 cursor-pointer">
                            <div className="text-center">
                              <Upload className="mx-auto h-6 w-6 text-gray-400" />
                              <p className="mt-2 text-sm text-gray-500">Upload event poster</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <Button className="mt-4 w-full bg-brand-blue hover:bg-brand-purple">Submit For Approval</Button>
                      <p className="text-center text-sm text-gray-500 mt-2">
                        Your event will be reviewed by our team before being published.
                      </p>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
            <div className="hidden md:block">
              <img 
                src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80" 
                alt="Event Crowd" 
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Event Categories Section */}
      <section className="section-padding">
        <div className="container-custom">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Find Your Next Experience</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Workshops",
                image: "https://images.unsplash.com/photo-1558403194-611308249627?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80",
                icon: <Calendar className="w-6 h-6" />
              },
              {
                title: "Competitions",
                image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80",
                icon: <Users className="w-6 h-6" />
              },
              {
                title: "Quizzes",
                image: "https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80",
                icon: <Clock className="w-6 h-6" />
              }
            ].map((category, index) => (
              <div key={index} className="group relative overflow-hidden rounded-xl shadow-lg h-[300px]">
                <img
                  src={category.image}
                  alt={category.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-6 w-full">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="bg-white/20 backdrop-blur-sm p-2 rounded-full">
                      {category.icon}
                    </div>
                    <h3 className="text-2xl font-bold text-white">{category.title}</h3>
                  </div>
                  <Button className="mt-2 bg-white text-brand-blue hover:bg-brand-purple hover:text-white transition-colors">
                    Explore
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Announcements Section */}
      <section className="bg-slate-50 section-padding">
        <div className="container-custom">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl md:text-4xl font-bold">Important Announcements</h2>
            <Button variant="outline" className="hidden md:flex">View All</Button>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Annual Tech Fest Registration Open",
                date: "Oct 15, 2023",
                content: "Registration for TechFest 2023 is now open. Early bird registrations close on October 20.",
                important: true
              },
              {
                title: "Photography Competition Results",
                date: "Oct 12, 2023",
                content: "The results for the annual photography competition have been announced. Check your email for details.",
                important: false
              },
              {
                title: "Workshop on AI & Machine Learning",
                date: "Oct 10, 2023",
                content: "Limited seats available for the upcoming workshop on AI & Machine Learning basics. Register soon!",
                important: true
              }
            ].map((announcement, index) => (
              <div key={index} className={`p-6 rounded-xl shadow-md ${announcement.important ? 'border-l-4 border-brand-blue' : ''} bg-white`}>
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-semibold">{announcement.title}</h3>
                  {announcement.important && (
                    <span className="bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded">Important</span>
                  )}
                </div>
                <time className="text-sm text-gray-500 block mb-3">{announcement.date}</time>
                <p className="text-gray-700">{announcement.content}</p>
                <Button variant="link" className="mt-4 p-0 text-brand-blue hover:text-brand-purple">
                  Learn more
                </Button>
              </div>
            ))}
          </div>
          <div className="mt-6 text-center md:hidden">
            <Button variant="outline">View All Announcements</Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
