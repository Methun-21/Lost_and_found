
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface ItemDetailsFormProps {
  formData: {
    title: string;
    description: string;
    location: string;
    date: string;
  };
  category: string;
  reportType: "lost" | "found";
  setCategory: (value: string) => void;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

const ItemDetailsForm = ({ 
  formData, 
  category, 
  reportType, 
  setCategory, 
  onInputChange 
}: ItemDetailsFormProps) => {
  return (
    <>
      <div className="space-y-2">
        <Label htmlFor="title">Item Title</Label>
        <Input 
          id="title" 
          placeholder="e.g. iPhone 12 Pro - Black" 
          required
          value={formData.title}
          onChange={onInputChange} 
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="category">Category</Label>
        <Select value={category} onValueChange={setCategory}>
          <SelectTrigger id="category">
            <SelectValue placeholder="Select a category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="electronics">Electronics</SelectItem>
            <SelectItem value="jewelry">Jewelry</SelectItem>
            <SelectItem value="accessories">Accessories</SelectItem>
            <SelectItem value="clothing">Clothing</SelectItem>
            <SelectItem value="documents">Documents/ID</SelectItem>
            <SelectItem value="keys">Keys</SelectItem>
            <SelectItem value="pets">Pets</SelectItem>
            <SelectItem value="other">Other</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          placeholder="Provide a detailed description of the item..."
          rows={4}
          required
          value={formData.description}
          onChange={onInputChange}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="location">
          {reportType === "lost" ? "Where did you lose it?" : "Where did you find it?"}
        </Label>
        <Input
          id="location"
          placeholder="e.g. Central Park, near Bethesda Fountain"
          required
          value={formData.location}
          onChange={onInputChange}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="date">
          {reportType === "lost" ? "When did you lose it?" : "When did you find it?"}
        </Label>
        <Input 
          id="date" 
          type="date" 
          required 
          value={formData.date}
          onChange={onInputChange}
        />
      </div>
    </>
  );
};

export default ItemDetailsForm;
