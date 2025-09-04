import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { songApi } from "../services/api";
import { SongCard } from "../components/SongCard";
import { Shield, Music, Plus } from "lucide-react";

export function AdminDashboard() {
  const queryClient = useQueryClient();

  const { data: pendingSongs, isLoading: isLoadingPending } = useQuery({
    queryKey: ["pending-songs"],
    queryFn: songApi.getPendingSongs,
  });

  const { data: allSongs, isLoading: isLoadingAll } = useQuery({
    queryKey: ["admin-songs"],
    queryFn: () => songApi.getSongs(1, 50),
  });

  const approveMutation = useMutation({
    mutationFn: songApi.approveSong,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pending-songs"] });
      queryClient.invalidateQueries({ queryKey: ["admin-songs"] });
      queryClient.invalidateQueries({ queryKey: ["top-songs"] });
    },
  });

  const rejectMutation = useMutation({
    mutationFn: songApi.rejectSong,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pending-songs"] });
      queryClient.invalidateQueries({ queryKey: ["admin-songs"] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: songApi.deleteSong,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-songs"] });
      queryClient.invalidateQueries({ queryKey: ["top-songs"] });
    },
  });

  const handleApprove = (songId: string) => {
    if (confirm("Tem certeza que deseja aprovar esta música?")) {
      approveMutation.mutate(songId);
    }
  };

  const handleReject = (songId: string) => {
    if (confirm("Tem certeza que deseja rejeitar esta música?")) {
      rejectMutation.mutate(songId);
    }
  };

  const handleDelete = (songId: string) => {
    if (
      confirm(
        "Tem certeza que deseja excluir esta música? Esta ação não pode ser desfeita."
      )
    ) {
      deleteMutation.mutate(songId);
    }
  };

  if (isLoadingPending || isLoadingAll) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Shield className="h-8 w-8 text-primary-600" />
          <h1 className="text-3xl font-bold text-gray-900">
            Painel Administrativo
          </h1>
        </div>
        <button className="btn btn-primary flex items-center space-x-2">
          <Plus className="h-4 w-4" />
          <span>Adicionar Música</span>
        </button>
      </div>

      {/* Pending Songs */}
      <section>
        <div className="flex items-center space-x-2 mb-6">
          <Music className="h-6 w-6 text-yellow-600" />
          <h2 className="text-2xl font-bold text-gray-900">
            Músicas Pendentes ({pendingSongs?.length || 0})
          </h2>
        </div>

        {pendingSongs && pendingSongs.length > 0 ? (
          <div className="grid gap-4">
            {pendingSongs.map((song) => (
              <SongCard
                key={song.id}
                song={song}
                isAdmin
                onApprove={handleApprove}
                onReject={handleReject}
                onDelete={handleDelete}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <Music className="h-12 w-12 mx-auto text-gray-400 mb-4" />
            <p className="text-gray-600">Nenhuma música pendente no momento</p>
          </div>
        )}
      </section>

      {/* All Songs */}
      <section>
        <div className="flex items-center space-x-2 mb-6">
          <Music className="h-6 w-6 text-primary-600" />
          <h2 className="text-2xl font-bold text-gray-900">
            Todas as Músicas ({allSongs?.data.length || 0})
          </h2>
        </div>

        {allSongs && allSongs.data.length > 0 ? (
          <div className="grid gap-4">
            {allSongs.data.map((song) => (
              <SongCard
                key={song.id}
                song={song}
                isAdmin
                onApprove={handleApprove}
                onReject={handleReject}
                onDelete={handleDelete}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <Music className="h-12 w-12 mx-auto text-gray-400 mb-4" />
            <p className="text-gray-600">Nenhuma música cadastrada</p>
          </div>
        )}
      </section>
    </div>
  );
}
