import Link from "next/link";

export const metadata = {
  title: "Home",
};

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] p-6">
      <div className="w-full max-w-5xl bg-white/10 backdrop-blur-md p-10 rounded-2xl shadow-2xl border border-gray-200/10 text-white space-y-8">
        <h1 className="text-4xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
          Welcome to Work Manager
        </h1>
        <p className="text-center text-gray-300 text-lg">
          Here you can manage your tasks, track your progress, and stay
          organized.
        </p>

        {/* Dashboard Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <DashboardCard title="Total Tasks" value="12" icon="📋" />
          <DashboardCard title="Tasks Completed" value="7" icon="✅" />
          <DashboardCard title="Pending Tasks" value="5" icon="⌛" />
          <DashboardCard title="Today's Focus" value="3 Tasks" icon="🔥" />
          <DashboardCard title="Deadline Approaching" value="2" icon="⏳" />
          <DashboardCard title="Your Rank" value="#3" icon="🏆" />
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-6">
          <Link href="/add-task" className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-purple-600 hover:to-blue-500 rounded-xl text-white font-semibold shadow-md hover:scale-105 transition-all">
            ➕ Add New Task
            </Link>
          <Link href="/show-task" className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-green-500 to-teal-600 hover:from-teal-600 hover:to-green-500 rounded-xl text-white font-semibold shadow-md hover:scale-105 transition-all">
            📂 View All Tasks
            </Link>
        </div>
      </div>
    </div>
  );
}

// 👇 Dashboard Card Component
const DashboardCard = ({ title, value, icon }) => (
  <div className="bg-white/10 p-6 rounded-xl border border-white/10 shadow-lg backdrop-blur-md hover:scale-105 transition-all duration-300">
    <div className="text-3xl mb-2">{icon}</div>
    <h3 className="text-lg font-semibold text-gray-200">{title}</h3>
    <p className="text-2xl font-bold text-white">{value}</p>
  </div>
);
