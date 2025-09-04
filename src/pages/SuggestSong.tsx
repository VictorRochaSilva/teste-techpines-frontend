import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { songApi } from "../services/api";
import { suggestSongSchema, SuggestSongFormData } from "../schemas/song";
import { Music, Plus, CheckCircle } from "lucide-react";

export function SuggestSong() {
  const [isSuccess, setIsSuccess] = useState(false);
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<SuggestSongFormData>({
    resolver: zodResolver(suggestSongSchema),
  });

  const suggestMutation = useMutation({
    mutationFn: songApi.suggestSong,
    onSuccess: () => {
      setIsSuccess(true);
      reset();
      queryClient.invalidateQueries({ queryKey: ["top-songs"] });
      queryClient.invalidateQueries({ queryKey: ["songs"] });
      setTimeout(() => setIsSuccess(false), 3000);
    },
  });

  const onSubmit = (data: SuggestSongFormData) => {
    suggestMutation.mutate(data.youtube_url);
  };

  if (isSuccess) {
    return (
      <div className="max-w-md mx-auto text-center py-12">
        <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Música sugerida com sucesso!
        </h2>
        <p className="text-gray-600 mb-6">
          Sua sugestão foi enviada e será analisada pela equipe.
        </p>
        <button onClick={() => setIsSuccess(false)} className="btn btn-primary btn-sm">
          Sugerir outra música
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto">
      <div className="text-center mb-8">
        <Music className="h-12 w-12 mx-auto text-primary-600 mb-4" />
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Sugerir Música
        </h1>
        <p className="text-gray-600">
          Compartilhe sua música favorita do Tião Carreiro com a comunidade
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label
            htmlFor="youtube_url"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            URL do YouTube
          </label>
          <input
            {...register("youtube_url")}
            type="url"
            className="input"
            placeholder="https://www.youtube.com/watch?v=..."
          />
          {errors.youtube_url && (
            <p className="mt-1 text-sm text-red-600">
              {errors.youtube_url.message}
            </p>
          )}
          <p className="mt-2 text-sm text-gray-500">
            Cole aqui o link da música no YouTube. O título será extraído
            automaticamente.
          </p>
        </div>

        <button
          type="submit"
          disabled={suggestMutation.isPending}
          className="btn btn-primary btn-lg w-full flex items-center justify-center space-x-2"
        >
          {suggestMutation.isPending ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              <span>Enviando...</span>
            </>
          ) : (
            <>
              <Plus className="h-4 w-4" />
              <span>Sugerir Música</span>
            </>
          )}
        </button>

        {suggestMutation.error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
            {(suggestMutation.error as any)?.response?.data?.message ||
              "Erro ao sugerir música"}
          </div>
        )}
      </form>
    </div>
  );
}
