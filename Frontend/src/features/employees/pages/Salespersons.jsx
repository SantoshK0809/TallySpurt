import { useState } from "react";

import SalespersonHeader from "../components/SalespersonHeader";
import SalespersonStats from "../components/SalespersonStats";
import SalespersonList from "../components/SalespersonList";
import CreateSalespersonModal from "../components/CreateSalespersonModal";

export default function Salespersons() {
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  // Temporary mock data.
  // Later this comes from useSalespersons().
  const salespersons = [
    {
      id: "sp_001",
      name: "Rahul Sharma",
      email: "rahul@example.com",
      phone: "9876543210",
      status: "active",
    },
    {
      id: "sp_002",
      name: "Amit Patil",
      email: "amit@example.com",
      phone: "9876543211",
      status: "inactive",
    },
  ];

  return (
    <div className="w-full min-w-0">
      <SalespersonHeader onCreate={() => setIsCreateOpen(true)} />

      <SalespersonStats salespersons={salespersons} />

      <SalespersonList salespersons={salespersons} />

      <CreateSalespersonModal
        open={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
      />
    </div>
  );
}
