
import { Button } from "@/components/ui/button";
import { Profile } from "@/hooks/useProfiles";
import { Check, X, User } from "lucide-react";

type Props = {
  profile: Profile;
  onStatusChange: (status: string) => void;
  updating: boolean;
};

export const AdminProfileRow = ({ profile, onStatusChange, updating }: Props) => {
  const statusColor =
    profile.status === "approved"
      ? "bg-green-100 text-green-800"
      : profile.status === "rejected"
      ? "bg-red-100 text-red-800"
      : "bg-yellow-100 text-yellow-800";

  return (
    <tr className="text-white border-b border-muted-foreground/20">
      <td className="whitespace-nowrap flex items-center gap-2 py-2">
        <User size={18} className="text-primary" />
        {profile.nombre || "-"}
      </td>
      <td className="whitespace-nowrap">{profile.email}</td>
      <td>${profile.balance ?? 0}</td>
      <td>
        <span className={`px-2 py-1 text-xs rounded ${statusColor}`}>
          {profile.status}
        </span>
      </td>
      <td className="whitespace-nowrap">{new Date(profile.created_at).toLocaleString()}</td>
      <td className="flex gap-2">
        <Button
          size="sm"
          variant={profile.status === "approved" ? "secondary" : "outline"}
          onClick={() => onStatusChange("approved")}
          disabled={profile.status === "approved" || updating}
        >
          <Check size={14} /> Aprobar
        </Button>
        <Button
          size="sm"
          variant={profile.status === "rejected" ? "secondary" : "outline"}
          onClick={() => onStatusChange("rejected")}
          disabled={profile.status === "rejected" || updating}
        >
          <X size={14} /> Rechazar
        </Button>
      </td>
    </tr>
  );
};
