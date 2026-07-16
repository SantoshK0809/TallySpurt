import { MoreVertical } from "lucide-react";

export default function SalespersonList({ salespersons }) {
  return (
    <section className="card-soft overflow-hidden">
      <div className="border-b border-border p-4 sm:p-5">
        <h2 className="font-semibold">Shop Salespersons</h2>

        <p className="mt-1 text-xs text-muted-foreground">
          Salespersons registered for this shop.
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[700px]">
          <thead className="bg-surface-muted">
            <tr className="text-left text-xs uppercase tracking-wider text-muted-foreground">
              <th className="px-5 py-3 font-medium">Salesperson</th>

              <th className="px-5 py-3 font-medium">Contact</th>

              <th className="px-5 py-3 font-medium">Status</th>

              <th className="px-5 py-3 text-right font-medium">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-border">
            {salespersons.map((person) => (
              <tr key={person.id}>
                <td className="px-5 py-4">
                  <p className="text-sm font-medium">{person.name}</p>

                  <p className="mt-1 font-mono text-xs text-muted-foreground">
                    {person.id}
                  </p>
                </td>

                <td className="px-5 py-4">
                  <p className="text-sm">{person.phone}</p>

                  <p className="text-xs text-muted-foreground">
                    {person.email}
                  </p>
                </td>

                <td className="px-5 py-4">
                  <span
                    className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                      person.status === "active"
                        ? "bg-green-500/10 text-green-600"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {person.status}
                  </span>
                </td>

                <td className="px-5 py-4 text-right">
                  <button
                    type="button"
                    className="rounded-lg p-2 hover:bg-muted"
                  >
                    <MoreVertical className="size-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
