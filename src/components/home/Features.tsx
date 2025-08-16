
import { Check, Image, Search, Upload } from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: <Upload className="h-10 w-10 text-indigo-500" />,
      title: "Report Lost or Found Items",
      description:
        "Quickly report items with our simple form. Add images and details to help others identify your lost belongings.",
    },
    {
      icon: <Search className="h-10 w-10 text-indigo-500" />,
      title: "Search & Filter",
      description:
        "Browse through our database of lost and found items using advanced search and filter capabilities.",
    },
    {
      icon: <Image className="h-10 w-10 text-indigo-500" />,
      title: "AI Image Matching",
      description:
        "Our advanced AI technology compares your item photos with existing entries to find potential matches.",
    },
    {
      icon: <Check className="h-10 w-10 text-indigo-500" />,
      title: "Simple Reunion Process",
      description:
        "Once a match is found, we make it easy to safely connect and arrange for item retrieval.",
    },
  ];

  return (
    <section className="py-16 bg-muted/50">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">
              How it works
            </div>
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
              Reconnect with your belongings
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed">
              Our platform makes it easy to report, search, and recover lost items through a simple process.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:gap-12 mt-12">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex flex-col items-start gap-4 rounded-lg border p-6 shadow-sm bg-background animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="rounded-full bg-muted p-2.5 shadow-sm">
                {feature.icon}
              </div>
              <div className="space-y-2">
                <h3 className="font-bold">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
