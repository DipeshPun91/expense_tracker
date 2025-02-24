import Header from "@/components/Header";

export default function Home() {
  return (
    <>
      <Header />
      <section className="text-gray-600 body-font">
        <div className="container mx-auto flex px-5 py-24 items-center justify-center flex-col">
          <div className="text-center lg:w-2/3 w-full">
            <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">
              Smart Expense Tracker
            </h1>
            <p className="mb-8 leading-relaxed">
              Take control of your finances with our intuitive expense tracker.
              Effortlessly log transactions, analyze spending habits, and stay
              on top of your budget—all in one place.
            </p>
            <div className="flex justify-center">
              <button className="inline-flex text-black font-semibold bg-accent border-0 py-2 px-6 focus:outline-none hover:bg-accent-HOVER rounded text-lg">
                Get Started
              </button>
              <button className="ml-4 inline-flex text-gray-700 bg-gray-100 border-0 py-2 px-6 focus:outline-none hover:bg-gray-200 rounded text-lg">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-primary py-12">
        <div className="container mx-auto px-5 text-center">
          <h2 className="text-3xl font-semibold text-gray-900 mb-6">
            Why Choose Our Expense Tracker?
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-6 bg-transparent">
              <h3 className="text-xl font-semibold mb-2">
                Easy Expense Logging
              </h3>
              <p className="text-gray-600">
                Quickly add and categorize expenses with just a few taps.
              </p>
            </div>
            <div className="p-6 bg-transparent">
              <h3 className="text-xl font-semibold mb-2">
                Insightful Analytics
              </h3>
              <p className="text-gray-600">
                Visualize your spending trends with dynamic charts and reports.
              </p>
            </div>
            <div className="p-6 bg-transparent">
              <h3 className="text-xl font-semibold mb-2">Budget Planning</h3>
              <p className="text-gray-600">
                Set monthly budgets and track your financial goals effortlessly.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
