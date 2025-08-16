
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import ContactForm from "@/components/report/ContactForm";
import { useToast } from "@/hooks/use-toast";

interface ContactReporterProps {
  itemTitle: string;
}

const ContactReporter = ({ itemTitle }: ContactReporterProps) => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would send the message to the reporter
    console.log("Contact form submitted:", formData);
    toast({
      title: "Message sent",
      description: "Your message has been sent to the reporter.",
    });
    setOpen(false);
    setFormData({
      name: "",
      email: "",
      phone: "",
      message: "",
    });
  };

  return (
    <>
      <Button 
        className="w-full bg-indigo-500 hover:bg-indigo-600"
        onClick={() => setOpen(true)}
      >
        Contact Reporter
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Contact about "{itemTitle}"</DialogTitle>
            <DialogDescription>
              Send a message to the person who reported this item
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit}>
            <ContactForm 
              formData={formData} 
              onInputChange={handleInputChange} 
            />
            
            <div className="space-y-2 border-t pt-4 mt-4">
              <label htmlFor="message" className="block text-sm font-medium">
                Message
              </label>
              <textarea
                id="message"
                rows={4}
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                placeholder="Provide additional details about this item..."
                value={formData.message}
                onChange={handleInputChange}
                required
              />
            </div>

            <DialogFooter className="mt-6">
              <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">Send Message</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ContactReporter;
