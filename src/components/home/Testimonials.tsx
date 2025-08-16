
const Testimonials = () => {
  const testimonials = [
    {
      quote:
        "I lost my wallet during a trip and thought it was gone forever. Within 24 hours of reporting it on FindIt, I was contacted by someone who found it. All my cards and IDs were still inside!",
      author: "Sarah M.",
      role: "Recovered wallet",
    },
    {
      quote:
        "As someone who found a laptop bag at the train station, this platform made it incredibly easy to connect with the owner. The AI matching system is impressive!",
      author: "David L.",
      role: "Found laptop bag",
    },
    {
      quote:
        "My daughter lost her favorite teddy bear at the mall. We were devastated, but after posting on FindIt, someone recognized it from our photos and reached out. We got it back the next day!",
      author: "Rebecca T.",
      role: "Recovered child's toy",
    },
  ];

  return (
    <section className="py-16">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
              Success Stories
            </h2>
            <p className="max-w-[600px] text-muted-foreground md:text-xl">
              See how we've helped people reconnect with their lost items.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="flex flex-col justify-between rounded-lg border bg-card p-6 shadow-sm animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div>
                <svg
                  className="h-8 w-8 text-indigo-500 mb-4 opacity-70"
                  fill="currentColor"
                  viewBox="0 0 32 32"
                  aria-hidden="true"
                >
                  <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                </svg>
                <p className="mb-4 italic">{testimonial.quote}</p>
              </div>
              <div>
                <p className="font-semibold">{testimonial.author}</p>
                <p className="text-sm text-muted-foreground">
                  {testimonial.role}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
