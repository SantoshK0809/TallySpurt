export default function SidebarUser({ user }) {
  const initials = user?.name
    ?.split(" ")
    .map((word) => word[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  const roleLabels = {
    shopOwner: "Shop Owner",
    salesperson: "Salesperson",
  };

  return (
    <div className="flex items-center gap-3">
      <div className="grid size-9 shrink-0 place-items-center rounded-full bg-muted text-xs font-bold">
        {initials || "U"}
      </div>

      <div className="min-w-0 text-xs">
        <p className="truncate font-medium">{user?.name}</p>

        <p className="truncate text-muted-foreground">
          {roleLabels[user?.role] || user?.role}
        </p>
      </div>
    </div>
  );
}
