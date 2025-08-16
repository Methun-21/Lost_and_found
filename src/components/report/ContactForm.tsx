
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface ContactFormProps {
  formData: {
    name: string;
    email: string;
    phone: string;
    [key: string]: string; // Allow for additional fields
  };
  onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

const ContactForm = ({ formData, onInputChange }: ContactFormProps) => {
  return (
    <div className="space-y-4">
      <h3 className="font-medium">Contact Information</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name">Full Name</Label>
          <Input 
            id="name" 
            required 
            value={formData.name}
            onChange={onInputChange}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input 
            id="email" 
            type="email" 
            required 
            value={formData.email}
            onChange={onInputChange}
          />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="phone">Phone Number</Label>
        <Input 
          id="phone" 
          type="tel" 
          value={formData.phone}
          onChange={onInputChange}
        />
      </div>
    </div>
  );
};

export default ContactForm;
