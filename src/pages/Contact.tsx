
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Mail, MessageCircle, User } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Contact = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <section className="py-16 flex-grow">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl font-bold mb-4 text-brand-blue">Get in Touch</h1>
              <p className="text-lg text-gray-600 mb-8">
                Have questions about our platform or need assistance? Reach out to us and we'll get back to you as soon as possible.
              </p>
              
              <div className="space-y-6">
                <div className="space-y-3">
                  <Label htmlFor="name">Your Name</Label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <User className="h-5 w-5 text-gray-400" />
                    </div>
                    <Input id="name" placeholder="Enter your name" className="pl-10" />
                  </div>
                </div>
                
                <div className="space-y-3">
                  <Label htmlFor="email">Your Email</Label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <Mail className="h-5 w-5 text-gray-400" />
                    </div>
                    <Input id="email" type="email" placeholder="Enter your email" className="pl-10" />
                  </div>
                </div>
                
                <div className="space-y-3">
                  <Label htmlFor="message">Your Message</Label>
                  <div className="relative">
                    <div className="absolute top-3 left-3 pointer-events-none">
                      <MessageCircle className="h-5 w-5 text-gray-400" />
                    </div>
                    <Textarea id="message" placeholder="Type your message here..." className="pl-10 pt-2" rows={5} />
                  </div>
                </div>
                
                <Button className="w-full bg-brand-blue hover:bg-brand-purple transition-colors">
                  Send Message
                </Button>
              </div>
            </div>
            
            <div className="hidden md:block">
              <img 
                src="https://images.unsplash.com/photo-1542744094-3a31f272c490?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80" 
                alt="Contact" 
                className="rounded-xl shadow-xl w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Contact;
