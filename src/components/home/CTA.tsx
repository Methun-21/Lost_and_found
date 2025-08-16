
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const CTA = () => {
  return (
    <section className="py-16 md:py-24 bg-indigo-50">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
              Ready to find what you've lost?
            </h2>
            <p className="max-w-[600px] text-muted-foreground md:text-xl">
              Join thousands of others who have successfully recovered their belongings.
            </p>
          </div>
          <div className="flex flex-col gap-2 min-[400px]:flex-row">
            <Button size="lg" asChild className="bg-indigo-500 hover:bg-indigo-600">
              <Link to="/report">Report an Item</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link to="/browse">Browse Items</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
