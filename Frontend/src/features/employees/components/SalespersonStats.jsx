export default function SalespersonStats({ salespersons }) {
  const total = salespersons.length;

  const active = salespersons.filter(
    (person) => person.status === "active",
  ).length;

  const inactive = total - active;

  const stats = [
    {
      label: "Total Salespersons",
      value: total,
    },
    {
      label: "Active",
      value: active,
    },
    {
      label: "Inactive",
      value: inactive,
    },
  ];

  return (
    <section className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
      {stats.map((stat) => (
        <div key={stat.label} className="card-soft p-5">
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            {stat.label}
          </p>

          <p className="mt-2 font-mono text-2xl font-semibold">{stat.value}</p>
        </div>
      ))}
    </section>
  );
}
