import StatCard from "./StatCard";

export default function DashboardStats({ stats }) {
  return (
    <section
      className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 xl:grid-cols-4"
      aria-label="Store statistics"
    >
      {stats.map((stat) => (
        <StatCard key={stat.label} {...stat} />
      ))}
    </section>
  );
}
