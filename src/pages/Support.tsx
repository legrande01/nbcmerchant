import { HelpCircle, MessageSquare, Book, Phone, Mail, ExternalLink } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const faqs = [
  {
    question: 'How do I add a new product?',
    answer: 'Go to the Products page and click "Add Product". Fill in the product details including name, description, price, and stock quantity, then click "Create Product".',
  },
  {
    question: 'How do I process an order?',
    answer: 'When you receive a new order, go to the Orders page and click on the order to view details. You can then update the order status to "Processing", "Shipped", or "Delivered".',
  },
  {
    question: 'How do I update my store information?',
    answer: 'Go to Store Management from the sidebar. You can update your store name, description, contact information, and business hours from there.',
  },
  {
    question: 'What payment methods are supported?',
    answer: 'NBC Sokoni supports M-Pesa, bank transfers, and card payments. Payment processing will be available soon.',
  },
  {
    question: 'How do I track my revenue?',
    answer: 'Your dashboard shows daily revenue and order trends. Detailed reports will be available in the Reports section coming soon.',
  },
];

export default function Support() {
  return (
    <div className="space-y-6 animate-fade-in max-w-4xl">
      {/* Quick Links */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="hover:shadow-md transition-shadow cursor-pointer">
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
              <Book className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-semibold mb-1">Documentation</h3>
            <p className="text-sm text-muted-foreground">Browse our help guides</p>
          </CardContent>
        </Card>
        <Card className="hover:shadow-md transition-shadow cursor-pointer">
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-3">
              <MessageSquare className="h-6 w-6 text-success" />
            </div>
            <h3 className="font-semibold mb-1">Live Chat</h3>
            <p className="text-sm text-muted-foreground">Chat with our team</p>
          </CardContent>
        </Card>
        <Card className="hover:shadow-md transition-shadow cursor-pointer">
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-3">
              <Phone className="h-6 w-6 text-accent" />
            </div>
            <h3 className="font-semibold mb-1">Call Us</h3>
            <p className="text-sm text-muted-foreground">+254 700 123 456</p>
          </CardContent>
        </Card>
      </div>

      {/* FAQs */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <HelpCircle className="h-5 w-5" />
            Frequently Asked Questions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>

      {/* Contact Form */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Mail className="h-5 w-5" />
            Contact Support
          </CardTitle>
          <CardDescription>
            Can't find what you're looking for? Send us a message.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Your Name</Label>
              <Input id="name" placeholder="John Doe" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input id="email" type="email" placeholder="john@example.com" />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="subject">Subject</Label>
            <Input id="subject" placeholder="How can we help?" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="message">Message</Label>
            <Textarea
              id="message"
              placeholder="Describe your issue or question in detail..."
              rows={4}
            />
          </div>
          <Button>Send Message</Button>
        </CardContent>
      </Card>
    </div>
  );
}
