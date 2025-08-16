
import { ItemCardProps } from "@/components/items/ItemCard";

// Get items from localStorage or use sample data if none exists
const getStoredItems = (): ItemCardProps[] => {
  const storedItems = localStorage.getItem('lostFoundItems');
  
  if (storedItems) {
    return JSON.parse(storedItems);
  }
  
  // Sample data - in a real app, this would come from an API
  const sampleItems: ItemCardProps[] = [
    {
      id: 1,
      title: "iPhone 12 Pro - Space Gray",
      description: "Lost in Central Park on Saturday afternoon. Has a blue case with stars on it.",
      image: "https://images.unsplash.com/photo-1603921326210-6edd2d60ca68?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      category: "Electronics",
      location: "Central Park, New York",
      date: "April 24, 2025",
      status: "lost",
    },
    {
      id: 2,
      title: "Gold Ring with Diamond",
      description: "Found near the fountain in Bryant Park. Has an inscription inside.",
      image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      category: "Jewelry",
      location: "Bryant Park, New York",
      date: "April 22, 2025",
      status: "found",
    },
    {
      id: 3,
      title: "Black Leather Wallet",
      description: "Lost in Times Square. Contains ID cards and credit cards.",
      image: "https://images.unsplash.com/photo-1627123424574-724758594e93?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      category: "Accessories",
      location: "Times Square, New York",
      date: "April 20, 2025",
      status: "lost",
    },
    {
      id: 4,
      title: "Sony Headphones WH-1000XM4",
      description: "Found on the subway, Line 6 heading downtown.",
      image: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      category: "Electronics",
      location: "Subway Line 6, New York",
      date: "April 18, 2025",
      status: "found",
    },
    {
      id: 5,
      title: "Keys with Red Keychain",
      description: "Found in Washington Square Park. Has about 5 keys and a small red keychain.",
      image: "https://images.unsplash.com/photo-1607753724987-7bf692b599d0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      category: "Keys",
      location: "Washington Square Park, New York",
      date: "April 15, 2025",
      status: "found",
    },
    {
      id: 6,
      title: "MacBook Air 13\"",
      description: "Lost at Starbucks on 5th Avenue. Space gray color with stickers on the cover.",
      image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      category: "Electronics",
      location: "Starbucks, 5th Avenue, New York",
      date: "April 14, 2025",
      status: "lost",
    },
  ];

  // Store the sample items in localStorage
  localStorage.setItem('lostFoundItems', JSON.stringify(sampleItems));
  return sampleItems;
};

// Get all items
let items = getStoredItems();

// Function to add a new item
export const addNewItem = (item: ItemCardProps) => {
  items = [item, ...items];
  localStorage.setItem('lostFoundItems', JSON.stringify(items));
  console.log("Item added:", item);
  console.log("Total items:", items.length);
  return item;
};

// Function to get all items
export const getAllItems = () => {
  // Refresh items from localStorage to ensure we have the latest
  items = getStoredItems();
  return items;
};

// Function to get a specific item
export const getItemById = (id: number) => {
  // Refresh items from localStorage to ensure we have the latest
  items = getStoredItems();
  return items.find(item => item.id === id);
};

// Function to delete an item
export const deleteItem = (id: number) => {
  items = items.filter(item => item.id !== id);
  localStorage.setItem('lostFoundItems', JSON.stringify(items));
  console.log("Item deleted:", id);
  return true;
};

// Function to simulate AI matching with images - simple implementation
export const findSimilarItems = (imageUrl: string, category: string) => {
  // This is a simple simulation - in a real app, this would use actual image processing
  const itemsInCategory = items.filter(item => 
    item.category.toLowerCase() === category.toLowerCase()
  );
  
  if (itemsInCategory.length === 0) {
    return [];
  }
  
  // Simulate finding similar items - just return items in the same category for now
  // In a real application, this would use AI-based image comparison
  return itemsInCategory.slice(0, 3).map(item => ({
    item,
    similarity: Math.round(Math.random() * 80 + 20), // Random similarity score between 20-100%
  }));
};
