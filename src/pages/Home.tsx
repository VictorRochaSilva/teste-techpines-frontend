import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { songApi } from "../services/api";
import { SongCard } from "../components/SongCard";
import { Music, TrendingUp, Users, ChevronLeft, ChevronRight } from "lucide-react";

export function Home() {
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage] = useState(6);

  const { data: topSongs, isLoading: isLoadingTop } = useQuery({
    queryKey: ["top-songs"],
    queryFn: songApi.getTopSongs,
  });

  const { data: allSongs, isLoading: isLoadingAll } = useQuery({
    queryKey: ["songs", currentPage, perPage],
    queryFn: () => songApi.getSongs(currentPage, perPage),
  });

  if (isLoadingTop || isLoadingAll) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <div className="relative overflow-hidden hero-gradient rounded-xl md:rounded-2xl text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative text-center py-12 md:py-20 px-4 md:px-6">
          <div className="inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 bg-white/20 backdrop-blur-sm rounded-full mb-4 md:mb-6">
            <Music className="h-8 w-8 md:h-10 md:w-10 text-white" />
          </div>
          <h1 className="text-3xl md:text-5xl font-bold mb-4 md:mb-6 hero-text">
            Top 5 Tião Carreiro
          </h1>
          <p className="text-base md:text-xl text-white/90 max-w-3xl mx-auto mb-6 md:mb-8 leading-relaxed px-4">
            Descubra as músicas mais populares e sugira suas favoritas para a
            comunidade. Uma celebração da música sertaneja raiz!
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-8 text-white/80">
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5" />
              <span className="text-sm font-medium">Mais Populares</span>
            </div>
            <div className="flex items-center space-x-2">
              <Users className="h-5 w-5" />
              <span className="text-sm font-medium">Comunidade Ativa</span>
            </div>
          </div>
        </div>
      </div>

      {/* Top 5 Songs */}
      <section className="fade-in-up">
        <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-3 mb-6 md:mb-8">
          <div className="w-10 h-10 bg-gradient-to-r from-red-600 to-red-700 rounded-lg flex items-center justify-center flex-shrink-0">
            <TrendingUp className="h-6 w-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Top 5 Músicas</h2>
            <p className="text-gray-600 text-sm md:text-base">As mais populares da comunidade</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {topSongs?.map((song, index) => (
            <div key={song.id} className="relative group">
              <div className="absolute -top-2 -left-2 w-10 h-10 md:w-12 md:h-12 bg-gradient-to-r from-red-600 to-red-700 rounded-full flex items-center justify-center text-white font-bold text-sm md:text-lg shadow-lg z-10">
                {index + 1}
              </div>
              <SongCard song={song} />
            </div>
          ))}
        </div>
      </section>

      {/* All Songs */}
      <section className="fade-in-up">
        <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-3 mb-6 md:mb-8">
          <div className="w-10 h-10 bg-gradient-to-r from-gray-600 to-gray-700 rounded-lg flex items-center justify-center flex-shrink-0">
            <Users className="h-6 w-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Todas as Músicas</h2>
            <p className="text-gray-600 text-sm md:text-base">Explore nossa coleção completa</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
          {allSongs?.data.map((song) => (
            <SongCard key={song.id} song={song} />
          ))}
        </div>

        {/* Paginação */}
        {allSongs && allSongs.pagination.last_page > 1 && (
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4 mt-8">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="btn btn-outline btn-sm flex items-center space-x-1 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="h-4 w-4" />
              <span className="hidden sm:inline">Anterior</span>
            </button>
            
            <div className="flex items-center space-x-1 sm:space-x-2">
              {Array.from({ length: allSongs.pagination.last_page }, (_, i) => i + 1)
                .filter(page => {
                  const totalPages = allSongs.pagination.last_page;
                  // Em mobile, mostra menos páginas
                  const range = window.innerWidth < 640 ? 1 : 2;
                  return page === 1 || page === totalPages || 
                         (page >= currentPage - range && page <= currentPage + range);
                })
                .map((page, index, array) => (
                  <div key={page} className="flex items-center">
                    {index > 0 && array[index - 1] !== page - 1 && (
                      <span className="px-1 sm:px-2 text-gray-500 text-sm">...</span>
                    )}
                    <button
                      onClick={() => setCurrentPage(page)}
                      className={`px-2 sm:px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                        currentPage === page
                          ? 'bg-red-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {page}
                    </button>
                  </div>
                ))}
            </div>
            
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, allSongs.pagination.last_page))}
              disabled={currentPage === allSongs.pagination.last_page}
              className="btn btn-outline btn-sm flex items-center space-x-1 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span className="hidden sm:inline">Próxima</span>
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        )}
        
        {/* Informações da paginação */}
        {allSongs && (
          <div className="text-center mt-4 text-sm text-gray-600">
            Mostrando {((currentPage - 1) * perPage) + 1} a {Math.min(currentPage * perPage, allSongs.pagination.total)} de {allSongs.pagination.total} músicas
          </div>
        )}
      </section>
    </div>
  );
}
