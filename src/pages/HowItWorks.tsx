
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const HowItWorks = () => {
  const steps = [
    {
      number: "01",
      title: "Report Your Item",
      description:
        "Fill out a simple form with details about your lost or found item. Include photos and specific information to help with identification.",
      image: "https://images.unsplash.com/photo-1586769852044-692d6e3703f0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    },
    {
      number: "02",
      title: "AI Matching Technology",
      description:
        "Our advanced AI analyzes your report and compares it with our database to find potential matches based on visual similarities and item descriptions.",
      image: "https://api.time.com/wp-content/uploads/2022/11/GettyImages-1358149692.jpg",
    },
    {
      number: "03",
      title: "Get Notified",
      description:
        "When a potential match is found, you'll receive an immediate notification. You can then review the match and decide if it's your item.",
      image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    },
    {
      number: "04",
      title: "Secure Connection",
      description:
        "If it's a match, we facilitate a secure connection between the finder and the owner to arrange for the item to be returned.",
      image: "https://images.unsplash.com/photo-1516321497487-e288fb19713f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    },
  ];

  

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-indigo-500 text-white py-16 md:py-24">
          <div className="container px-4 mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              How FindIt Works
            </h1>
            <p className="max-w-2xl mx-auto text-lg md:text-xl mb-8">
              Our platform uses advanced AI technology to match lost items with found ones, making the recovery process simple and efficient.
            </p>
            <Button asChild size="lg" variant="secondary">
              <Link to="/report">Report an Item Now</Link>
            </Button>
          </div>
        </section>

        {/* Steps Section */}
        <section className="py-16">
          <div className="container px-4 mx-auto">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">The Process</h2>
              <p className="text-muted-foreground text-lg">
                Our simple 4-step process helps reconnect people with their lost belongings quickly and securely.
              </p>
            </div>

            <div className="space-y-16 md:space-y-32">
              {steps.map((step, index) => (
                <div
                  key={index}
                  className={`grid grid-cols-1 ${
                    index % 2 === 0 ? "md:grid-cols-[2fr_3fr]" : "md:grid-cols-[3fr_2fr]"
                  } gap-8 md:gap-12 items-center`}
                >
                  <div
                    className={`${index % 2 !== 0 ? "md:order-2" : ""} animate-fade-in`}
                  >
                    <div className="p-1 bg-gradient-to-br from-indigo-500 to-indigo-300 rounded-lg shadow-lg">
                      <img
                        src={step.image}
                        alt={step.title}
                        className="rounded-lg w-full"
                      />
                    </div>
                  </div>
                  <div
                    className={`${
                      index % 2 !== 0 ? "md:order-1 md:text-right" : ""
                    } space-y-4 animate-fade-in`}
                  >
                    <span className="inline-block text-5xl font-bold text-indigo-500/20">
                      {step.number}
                    </span>
                    <h3 className="text-2xl font-bold">{step.title}</h3>
                    <p className="text-muted-foreground text-lg">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-indigo-50">
          <div className="container px-4 mx-auto text-center">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
              <p className="text-lg mb-8">
                Whether you've lost something valuable or found an item that someone else is looking for, our platform can help.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="bg-indigo-500 hover:bg-indigo-600">
                  <Link to="/report">Report an Item</Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <Link to="/browse">Browse Lost & Found</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default HowItWorks;
