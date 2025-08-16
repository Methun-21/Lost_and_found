
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ItemCard from "@/components/items/ItemCard";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { getAllItems } from "@/utils/itemsStore";
import { 
  Alert, 
  AlertTitle, 
  AlertDescription 
} from "@/components/ui/alert";

const Browse = () => {
  const { toast } = useToast();
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string | undefined>();
  const [categoryFilter, setCategoryFilter] = useState<string | undefined>();
  const [items, setItems] = useState(getAllItems());

  // Get unique categories from items
  const categories = [...new Set(items.map(item => item.category))];

  useEffect(() => {
    // Check if we're coming from a successful report submission
    if (location.state && location.state.newItemSubmitted) {
      toast({
        title: "Report Added Successfully",
        description: "Your item has been added to the database and is now visible in the browse page.",
      });
      
      // Clear the state so we don't show the message again on refresh
      window.history.replaceState({}, document.title);
      
      // Refresh items list
      setItems(getAllItems());
    }
  }, [location.state, toast]);

  // Filter items based on search query and filters
  const filteredItems = items.filter((item) => {
    // Search query filter
    if (
      searchQuery &&
      !item.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !item.description.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !item.category.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !item.location.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false;
    }

    // Status filter
    if (statusFilter && statusFilter !== "all" && item.status !== statusFilter) {
      return false;
    }

    // Category filter
    if (categoryFilter && categoryFilter !== "all" && item.category !== categoryFilter) {
      return false;
    }

    return true;
  });

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 py-12">
        <div className="container px-4 mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Browse Lost & Found Items</h1>
            <p className="text-muted-foreground">
              Search through our database of lost and found items.
            </p>
          </div>

          {/* AI Feature Info */}
          <Alert className="mb-6 bg-blue-50 border-blue-200">
            <AlertTitle>AI-Powered Image Matching</AlertTitle>
            <AlertDescription>
              Our system uses artificial intelligence to compare images of lost and found items.
              When you report an item with an image, our AI automatically searches for potential matches in the database.
            </AlertDescription>
          </Alert>

          {/* Search and Filters */}
          <div className="bg-white shadow-sm border rounded-lg p-4 mb-8">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search items..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex flex-col sm:flex-row gap-4 md:w-2/3 lg:w-1/2">
                <Select
                  value={statusFilter}
                  onValueChange={setStatusFilter}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="lost">Lost</SelectItem>
                    <SelectItem value="found">Found</SelectItem>
                  </SelectContent>
                </Select>
                <Select
                  value={categoryFilter}
                  onValueChange={setCategoryFilter}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setSearchQuery("");
                    setStatusFilter(undefined);
                    setCategoryFilter(undefined);
                  }}
                >
                  Clear Filters
                </Button>
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.length > 0 ? (
              filteredItems.map((item) => <ItemCard key={item.id} {...item} />)
            ) : (
              <div className="col-span-full py-16 text-center">
                <h3 className="text-xl font-semibold mb-2">No items found</h3>
                <p className="text-muted-foreground">
                  Try adjusting your search or filter criteria
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Browse;
