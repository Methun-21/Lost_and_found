
const Stats = () => {
  return (
    <section className="py-16 bg-indigo-500 text-white">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-2">Our Impact</h2>
          <p className="text-indigo-100 max-w-xl mx-auto">
            We're committed to reuniting people with their belongings. Here's what we've accomplished so far.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-8">
          <div className="flex flex-col items-center">
            <span className="text-4xl md:text-5xl font-bold">1,298</span>
            <span className="text-indigo-100 mt-1">Items Found</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-4xl md:text-5xl font-bold">853</span>
            <span className="text-indigo-100 mt-1">Successful Returns</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-4xl md:text-5xl font-bold">5,621</span>
            <span className="text-indigo-100 mt-1">Users Joined</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-4xl md:text-5xl font-bold">98%</span>
            <span className="text-indigo-100 mt-1">Satisfaction Rate</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Stats;
