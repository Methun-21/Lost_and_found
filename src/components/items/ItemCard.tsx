
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ItemCardProps {
  id: number;
  title: string;
  description: string;
  image: string;
  category: string;
  location: string;
  date: string;
  status: "lost" | "found";
}

const ItemCard = ({
  id,
  title,
  description,
  image,
  category,
  location,
  date,
  status,
}: ItemCardProps) => {
  return (
    <Link to={`/items/${id}`}>
      <div className="rounded-xl overflow-hidden border bg-card shadow-custom card-hover">
        <div className="aspect-video relative overflow-hidden">
          <img
            src={image}
            alt={title}
            className="object-cover w-full h-full"
          />
          <Badge
            className={cn(
              "absolute top-3 right-3",
              status === "lost" ? "bg-lost text-white" : "bg-found text-white"
            )}
          >
            {status === "lost" ? "Lost" : "Found"}
          </Badge>
        </div>
        <div className="p-4">
          <h3 className="font-semibold text-lg line-clamp-1">{title}</h3>
          <p className="text-muted-foreground text-sm line-clamp-2 mt-1">
            {description}
          </p>
          <div className="mt-3 flex flex-col gap-1">
            <div className="flex items-center text-xs text-muted-foreground">
              <MapPin className="mr-1 h-3 w-3" />
              <span>{location}</span>
            </div>
            <div className="flex items-center text-xs text-muted-foreground">
              <Calendar className="mr-1 h-3 w-3" />
              <span>{date}</span>
            </div>
          </div>
          <Badge variant="outline" className="mt-3">
            {category}
          </Badge>
        </div>
      </div>
    </Link>
  );
};

export default ItemCard;
