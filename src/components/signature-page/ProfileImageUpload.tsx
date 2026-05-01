interface ProfileImageUploadProps {
  croppedImage: string | null;
  onImageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const ProfileImageUpload = ({
  croppedImage,
  onImageChange,
}: ProfileImageUploadProps) => {
  return (
    <div className="mb-8 flex w-full justify-center">
      <form method="post" className="flex justify-center">
        <label className="group relative cursor-pointer">
          <img
            src={croppedImage || "/user.png"}
            className="h-[140px] w-[140px] rounded-full border-4 border-blue-500 object-cover shadow-md"
            alt="Usuário"
          />

          <div className="absolute inset-0 flex items-center justify-center rounded-full bg-black/35 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <span className="px-3 text-center text-xs font-semibold text-white">
              Clique para selecionar a imagem
            </span>
          </div>

          <input
            type="file"
            name="image"
            className="hidden"
            accept="image/*"
            onChange={onImageChange}
          />
        </label>
      </form>
    </div>
  );
};
