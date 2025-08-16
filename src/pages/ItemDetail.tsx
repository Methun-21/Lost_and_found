
import { useParams, Link, useNavigate } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, User, Clock, Edit, Trash2, Mail } from "lucide-react";
import { ItemCardProps } from "@/components/items/ItemCard";
import { cn } from "@/lib/utils";
import ContactReporter from "@/components/report/ContactReporter";
import { getItemById, getAllItems, deleteItem } from "@/utils/itemsStore";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const ItemDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editFormData, setEditFormData] = useState<ItemCardProps | null>(null);
  const [emailDialogOpen, setEmailDialogOpen] = useState(false);
  const [emailData, setEmailData] = useState({ email: "", message: "" });

  // Get the item from itemsStore instead of the static array
  const item = getItemById(Number(id));
  
  // Get all items for similar items section
  const allItems = getAllItems();

  const handleReportSimilar = () => {
    if (item) {
      navigate('/report', {
        state: {
          similarTo: {
            id: item.id,
            title: item.title,
            category: item.category,
            location: item.location
          }
        }
      });
    }
  };

  const handleEditItem = () => {
    if (item) {
      setEditFormData({...item});
      setIsEditDialogOpen(true);
    }
  };

  const handleDeleteItem = () => {
    if (item) {
      deleteItem(item.id);
      toast({
        title: "Item Deleted",
        description: "The item has been successfully deleted.",
      });
      navigate('/browse');
    }
  };

  const handleSaveEdit = () => {
    if (editFormData) {
      // Update the item in the store
      const updatedItems = getAllItems().map(i => 
        i.id === editFormData.id ? editFormData : i
      );
      // Update the store with the updated items
      window.localStorage.setItem('lostFoundItems', JSON.stringify(updatedItems));
      toast({
        title: "Item Updated",
        description: "Your item has been updated successfully.",
      });
      setIsEditDialogOpen(false);
      // Refresh the page to show updated item
      window.location.reload();
    }
  };

  const handleEditInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setEditFormData(prev => prev ? { ...prev, [id]: value } : null);
  };

  const handleSendEmail = () => {
    // Simulate sending an email
    toast({
      title: "Email Sent",
      description: `Your message has been sent to the owner of the ${item?.status === "lost" ? "lost" : "found"} item.`,
    });
    setEmailDialogOpen(false);
    setEmailData({ email: "", message: "" });
  };

  if (!item) {
    return (
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <main className="flex-1 py-12">
          <div className="container px-4 mx-auto text-center">
            <h1 className="text-3xl font-bold mb-4">Item Not Found</h1>
            <p className="text-muted-foreground mb-6">
              The item you're looking for doesn't exist or has been removed.
            </p>
            <Button asChild>
              <Link to="/browse">Browse Items</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Simulate being the owner of the item (in a real app, this would check user authentication)
  const isItemOwner = true;

  // Find similar items
  const similarItems = allItems.filter(i => 
    i.id !== item?.id && i.category === item?.category
  ).slice(0, 3);

  // Simulate AI match (in a real app this would be based on actual AI image comparison)
  const aiMatched = item.status === "lost" && 
    similarItems.some(i => i.status === "found" && i.category === item.category);

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 py-12">
        <div className="container px-4 mx-auto">
          <div className="mb-6">
            <Link
              to="/browse"
              className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mr-2 h-4 w-4"
              >
                <path d="m15 18-6-6 6-6" />
              </svg>
              Back to Browse
            </Link>
          </div>

          {aiMatched && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
              <h3 className="font-semibold text-green-800">AI Match Found!</h3>
              <p className="text-green-700 text-sm">
                Our AI system has identified a potential match for your item. Click the email button to contact the owner.
              </p>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <div className="rounded-xl overflow-hidden shadow-lg border">
                <img
                  src={item?.image}
                  alt={item?.title}
                  className="w-full h-auto"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center gap-3 mb-3">
                <Badge
                  className={cn(
                    item?.status === "lost" ? "bg-lost text-white" : "bg-found text-white"
                  )}
                >
                  {item?.status === "lost" ? "Lost" : "Found"}
                </Badge>
                <Badge variant="outline">{item?.category}</Badge>
              </div>
              
              <h1 className="text-3xl font-bold mb-4">{item?.title}</h1>
              
              <div className="space-y-4 mb-6">
                <div className="flex items-center text-sm text-muted-foreground">
                  <MapPin className="mr-2 h-4 w-4" />
                  <span>{item?.location}</span>
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Calendar className="mr-2 h-4 w-4" />
                  <span>{item?.date}</span>
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <User className="mr-2 h-4 w-4" />
                  <span>Reported by John Doe</span>
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Clock className="mr-2 h-4 w-4" />
                  <span>2 days ago</span>
                </div>
              </div>
              
              <h3 className="font-semibold text-lg mb-2">Description</h3>
              <p className="text-muted-foreground mb-8">{item?.description}</p>
              
              <div className="space-y-4">
                {item && <ContactReporter itemTitle={item.title} />}
                
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={handleReportSimilar}
                >
                  Report Similar Item
                </Button>
                
                {isItemOwner && (
                  <div className="flex gap-4">
                    <Button 
                      className="w-1/2" 
                      variant="outline"
                      onClick={handleEditItem}
                    >
                      <Edit className="mr-2 h-4 w-4" /> Edit Item
                    </Button>
                    <Button 
                      className="w-1/2" 
                      variant="destructive"
                      onClick={() => setIsDeleteDialogOpen(true)}
                    >
                      <Trash2 className="mr-2 h-4 w-4" /> Delete Item
                    </Button>
                  </div>
                )}
                
                {aiMatched && (
                  <Button 
                    className="w-full bg-green-600 hover:bg-green-700" 
                    onClick={() => setEmailDialogOpen(true)}
                  >
                    <Mail className="mr-2 h-4 w-4" /> Contact Match
                  </Button>
                )}
              </div>
            </div>
          </div>

          {/* Similar Items Section */}
          <div className="mt-16">
            <h2 className="text-2xl font-bold mb-6">Similar Items</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {similarItems.map((similarItem) => (
                <Link key={similarItem.id} to={`/items/${similarItem.id}`}>
                  <div className="rounded-xl overflow-hidden border bg-card shadow-sm card-hover">
                    <div className="aspect-video relative overflow-hidden">
                      <img
                        src={similarItem.image}
                        alt={similarItem.title}
                        className="object-cover w-full h-full"
                      />
                      <Badge
                        className={cn(
                          "absolute top-3 right-3",
                          similarItem.status === "lost" ? "bg-lost text-white" : "bg-found text-white"
                        )}
                      >
                        {similarItem.status === "lost" ? "Lost" : "Found"}
                      </Badge>
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold line-clamp-1">{similarItem.title}</h3>
                      <div className="flex items-center text-xs text-muted-foreground mt-2">
                        <MapPin className="mr-1 h-3 w-3" />
                        <span>{similarItem.location}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Item</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this item? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>Cancel</Button>
            <Button variant="destructive" onClick={handleDeleteItem}>Delete Item</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Item Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[550px]">
          <DialogHeader>
            <DialogTitle>Edit Item</DialogTitle>
            <DialogDescription>
              Make changes to your item details below.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="title" className="text-right text-sm">Title</label>
              <Input
                id="title"
                value={editFormData?.title || ""}
                onChange={handleEditInputChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="description" className="text-right text-sm">Description</label>
              <Textarea
                id="description"
                value={editFormData?.description || ""}
                onChange={handleEditInputChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="location" className="text-right text-sm">Location</label>
              <Input
                id="location"
                value={editFormData?.location || ""}
                onChange={handleEditInputChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="category" className="text-right text-sm">Category</label>
              <Input
                id="category"
                value={editFormData?.category || ""}
                onChange={handleEditInputChange}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleSaveEdit}>Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Email Contact Dialog */}
      <Dialog open={emailDialogOpen} onOpenChange={setEmailDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Contact Item Owner</DialogTitle>
            <DialogDescription>
              Send a message to the owner of this item.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <label htmlFor="email" className="text-sm font-medium">Your Email</label>
              <Input
                id="email"
                value={emailData.email}
                onChange={(e) => setEmailData({...emailData, email: e.target.value})}
                placeholder="your@email.com"
              />
            </div>
            <div className="grid gap-2">
              <label htmlFor="message" className="text-sm font-medium">Message</label>
              <Textarea
                id="message"
                value={emailData.message}
                onChange={(e) => setEmailData({...emailData, message: e.target.value})}
                placeholder="Describe how you identified this item as yours, when and where you lost it, etc."
                rows={5}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEmailDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleSendEmail}>Send Message</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ItemDetail;
