import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";

type FormValues = {
  nome: string;
  setor: string;
  celular: string;
  email: string;
  local: string;
};

export const Form = ({
  setName,
  setEmail,
  setSelectedSector,
  setBranchLineOrCellPhone,
  setLocal,
  resetForm,
}: any) => {
  const { register, reset } = useForm<FormValues>({
    defaultValues: {
      nome: "",
      setor: "",
      celular: "",
      email: "",
      local: "",
    },
  });

  const handleReset = () => {
    reset({
      nome: "",
      setor: "",
      celular: "",
      email: "",
      local: "",
    });

    setName?.("");
    setEmail?.("");
    setSelectedSector?.("");
    setBranchLineOrCellPhone?.("");
    setLocal?.("");

    resetForm?.();
  };

  return (
    <form className="w-80 space-y-5">
      {/* Nome */}
      <div>
        <p className="text-sm font-semibold">Nome</p>
        <input
          {...register("nome", {
            onChange: (e) => setName?.(e.target.value),
          })}
          className="w-full rounded-lg border border-blue-500 bg-white p-2.5 text-sm"
          type="text"
          placeholder="Digite o nome"
        />
      </div>

      {/* Setor */}
      <div>
        <p className="text-sm font-semibold">Setor</p>
        <input
          {...register("setor", {
            onChange: (e) => setSelectedSector?.(e.target.value),
          })}
          className="w-full rounded-lg border border-blue-500 bg-white p-2.5 text-sm"
          type="text"
          placeholder="Digite o setor"
        />
      </div>

      {/* Celular */}
      <div>
        <p className="text-sm font-semibold">Celular</p>
        <input
          {...register("celular", {
            required: true,
            onChange: (e) => setBranchLineOrCellPhone?.(e.target.value),
          })}
          className="w-full rounded-lg border border-blue-500 bg-white p-2.5 text-sm"
          type="text"
          placeholder="(11) 91234-5678"
        />
      </div>

      {/* Email */}
      <div>
        <p className="text-sm font-semibold">E-mail</p>
        <input
          {...register("email", {
            onChange: (e) => setEmail?.(e.target.value),
          })}
          className="w-full rounded-lg border border-blue-500 bg-white p-2.5 text-sm"
          type="email"
          placeholder="Digite o e-mail"
        />
      </div>

      {/* Local (novo campo livre) */}
      <div>
        <p className="text-sm font-semibold">Local</p>
        <input
          {...register("local", {
            onChange: (e) => setLocal?.(e.target.value),
          })}
          className="w-full rounded-lg border border-blue-500 bg-white p-2.5 text-sm"
          type="text"
          placeholder="Ex: São Paulo - SP"
        />
      </div>

      <Button type="button" className="w-full" onClick={handleReset}>
        Redefinir
      </Button>
    </form>
  );
};
