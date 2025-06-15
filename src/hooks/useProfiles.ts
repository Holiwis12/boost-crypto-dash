
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase as typedSupabase } from "@/integrations/supabase/client";

/** Representa el perfil de usuario desde la db */
export type Profile = {
  id: string;
  email: string;
  nombre: string | null;
  balance: number;
  status: string;
  created_at: string;
};

// Cast de supabase a any para evitar error de tipo hasta que se arregle types.ts
const supabase: any = typedSupabase;

export function useProfiles() {
  const queryClient = useQueryClient();

  // Obtener todos los perfiles (solo admins pueden)
  const { data, isLoading, error } = useQuery<Profile[]>({
    queryKey: ["profiles"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return (data ?? []) as Profile[]; // force type for compatibility
    },
  });

  // Mutación para actualizar status del perfil
  const mutation = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      const { error } = await supabase
        .from("profiles")
        .update({ status })
        .eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profiles"] });
    },
  });

  return {
    profiles: data,
    isLoading,
    error,
    updateStatus: mutation.mutate,
    updatingStatus: mutation.isPending,
  };
}
