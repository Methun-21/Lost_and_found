import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { addNewItem } from "@/utils/itemsStore";
import ImageUpload from "@/components/report/ImageUpload";
import ContactForm from "@/components/report/ContactForm";
import ItemDetailsForm from "@/components/report/ItemDetailsForm";

interface LocationState {
  similarTo?: {
    id: number;
    title: string;
    category: string;
    location: string;
  };
}

const Report = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { similarTo } = (location.state as LocationState) || {};
  
  const [reportType, setReportType] = useState<"lost" | "found">("lost");
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [category, setCategory] = useState<string>(similarTo?.category || "");
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    title: similarTo ? `Similar to: ${similarTo.title}` : "",
    description: "",
    location: similarTo?.location || "",
    date: "",
    name: "",
    email: "",
    phone: "",
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newId = Math.floor(Math.random() * 10000) + 100;
    
    const newItem = {
      id: newId,
      title: formData.title,
      description: formData.description,
      image: imagePreview || "https://images.unsplash.com/photo-1607753724987-7bf692b599d0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      category: category || "Other",
      location: formData.location,
      date: formData.date || new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }),
      status: reportType,
    };
    
    addNewItem(newItem);
    
    toast({
      title: "Report Submitted",
      description: "Your item has been reported successfully.",
    });
    
    navigate("/browse", { 
      state: { 
        newItemSubmitted: true,
        itemId: newId 
      }
    });
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 py-12 bg-muted/30">
        <div className="container px-4 mx-auto">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold mb-2">
                {similarTo ? "Report Similar Item" : "Report an Item"}
              </h1>
              {similarTo && (
                <p className="text-muted-foreground mb-2">
                  You are reporting an item similar to "{similarTo.title}"
                </p>
              )}
              <p className="text-muted-foreground">
                Fill out the form below to report a lost or found item.
              </p>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Item Details</CardTitle>
                <CardDescription>
                  Provide as much information as possible to help with identification.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Report Type */}
                  <div className="grid grid-cols-2 gap-4">
                    <Button
                      type="button"
                      variant={reportType === "lost" ? "default" : "outline"}
                      className={reportType === "lost" ? "bg-lost hover:bg-lost/90" : ""}
                      onClick={() => setReportType("lost")}
                    >
                      I Lost an Item
                    </Button>
                    <Button
                      type="button"
                      variant={reportType === "found" ? "default" : "outline"}
                      className={reportType === "found" ? "bg-found hover:bg-found/90" : ""}
                      onClick={() => setReportType("found")}
                    >
                      I Found an Item
                    </Button>
                  </div>

                  <ItemDetailsForm 
                    formData={formData}
                    category={category}
                    reportType={reportType}
                    setCategory={setCategory}
                    onInputChange={handleInputChange}
                  />

                  <ImageUpload 
                    imagePreview={imagePreview}
                    onImageChange={handleImageChange}
                    setImagePreview={setImagePreview}
                  />

                  <ContactForm 
                    formData={formData}
                    onInputChange={handleInputChange}
                  />

                  <Button type="submit" className="w-full bg-indigo-500 hover:bg-indigo-600">
                    Submit Report
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Report;