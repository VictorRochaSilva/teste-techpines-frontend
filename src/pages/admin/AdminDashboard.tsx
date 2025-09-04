import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { songApi } from "../../services/api";
import { SongCard } from "../../components/SongCard";
import { AddSongModal } from "../../components/AddSongModal";
import { EditSongModal } from "../../components/EditSongModal";
import { DeleteConfirmModal } from "../../components/DeleteConfirmModal";
import { Shield, Music, Plus } from "lucide-react";
import { Song } from "../../types";

export function AdminDashboard() {
  const queryClient = useQueryClient();
  
  // Modal states
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedSong, setSelectedSong] = useState<Song | null>(null);

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
      setIsDeleteModalOpen(false);
      setSelectedSong(null);
    },
  });

  const addMutation = useMutation({
    mutationFn: (data: { youtube_url: string }) => songApi.suggestSong(data.youtube_url),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pending-songs"] });
      queryClient.invalidateQueries({ queryKey: ["admin-songs"] });
      setIsAddModalOpen(false);
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ songId, data }: { songId: string; data: { title: string; youtube_url: string } }) =>
      songApi.updateSong(songId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-songs"] });
      queryClient.invalidateQueries({ queryKey: ["top-songs"] });
      setIsEditModalOpen(false);
      setSelectedSong(null);
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
    const song = [...(pendingSongs || []), ...(allSongs?.data || [])].find(s => s.id === songId);
    if (song) {
      setSelectedSong(song);
      setIsDeleteModalOpen(true);
    }
  };

  const handleEdit = (song: Song) => {
    setSelectedSong(song);
    setIsEditModalOpen(true);
  };

  const handleAddSong = async (data: { youtube_url: string }) => {
    addMutation.mutate(data);
  };

  const handleUpdateSong = async (songId: string, data: { title: string; youtube_url: string }) => {
    updateMutation.mutate({ songId, data });
  };

  const handleConfirmDelete = (songId: string) => {
    deleteMutation.mutate(songId);
  };

  if (isLoadingPending || isLoadingAll) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-red-600 border-t-transparent mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Carregando dados...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gradient-to-r from-red-600 to-red-700 rounded-2xl flex items-center justify-center shadow-lg">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  Painel Administrativo
                </h1>
                <p className="text-gray-600">
                  Gerencie músicas e aprovações do Top 5 Tião Carreiro
                </p>
              </div>
            </div>
            <button 
              onClick={() => setIsAddModalOpen(true)}
              className="btn btn-primary btn-lg flex items-center space-x-3 px-6 py-3 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
            >
              <Plus className="h-6 w-6" />
              <span>Adicionar Música</span>
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-yellow-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pendentes</p>
                <p className="text-3xl font-bold text-gray-900">{pendingSongs?.length || 0}</p>
              </div>
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <Music className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-green-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Aprovadas</p>
                <p className="text-3xl font-bold text-gray-900">
                  {allSongs?.data.filter(song => song.status === 'approved').length || 0}
                </p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Music className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-blue-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total</p>
                <p className="text-3xl font-bold text-gray-900">{allSongs?.data.length || 0}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Music className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Pending Songs */}
        <div className="bg-white rounded-2xl shadow-xl mb-8">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                <Music className="h-6 w-6 text-yellow-600" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  Músicas Pendentes
                </h2>
                <p className="text-gray-600">
                  {pendingSongs?.length || 0} músicas aguardando aprovação
                </p>
              </div>
            </div>
          </div>
          
          <div className="p-6">
            {pendingSongs && pendingSongs.length > 0 ? (
              <div className="grid gap-6">
                {pendingSongs.map((song) => (
                  <SongCard
                    key={song.id}
                    song={song}
                    isAdmin
                    onApprove={handleApprove}
                    onReject={handleReject}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Music className="h-10 w-10 text-yellow-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Nenhuma música pendente
                </h3>
                <p className="text-gray-600 mb-6">
                  Todas as músicas foram processadas ou não há sugestões no momento.
                </p>
                <button 
                  onClick={() => setIsAddModalOpen(true)}
                  className="btn btn-primary btn-sm flex items-center space-x-2 mx-auto"
                >
                  <Plus className="h-4 w-4" />
                  <span>Adicionar Primeira Música</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* All Songs */}
        <div className="bg-white rounded-2xl shadow-xl">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Music className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  Todas as Músicas
                </h2>
                <p className="text-gray-600">
                  {allSongs?.data.length || 0} músicas cadastradas no sistema
                </p>
              </div>
            </div>
          </div>
          
          <div className="p-6">
            {allSongs && allSongs.data.length > 0 ? (
              <div className="grid gap-6">
                {allSongs.data.map((song) => (
                  <SongCard
                    key={song.id}
                    song={song}
                    isAdmin
                    onApprove={handleApprove}
                    onReject={handleReject}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Music className="h-10 w-10 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Nenhuma música cadastrada
                </h3>
                <p className="text-gray-600 mb-6">
                  Comece adicionando músicas ao sistema.
                </p>
                <button 
                  onClick={() => setIsAddModalOpen(true)}
                  className="btn btn-primary btn-sm flex items-center space-x-2 mx-auto"
                >
                  <Plus className="h-4 w-4" />
                  <span>Adicionar Primeira Música</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modals */}
      <AddSongModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSave={handleAddSong}
        isLoading={addMutation.isPending}
      />

      <EditSongModal
        song={selectedSong}
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setSelectedSong(null);
        }}
        onSave={handleUpdateSong}
        isLoading={updateMutation.isPending}
      />

      <DeleteConfirmModal
        song={selectedSong}
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setSelectedSong(null);
        }}
        onConfirm={handleConfirmDelete}
        isLoading={deleteMutation.isPending}
      />
    </div>
  );
}
