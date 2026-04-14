interface FormProps {
  setName: (value: string) => void;
  setSobrenome: (value: string) => void;
  setEmail: (value: string) => void;
  setBranchLineOrCellPhone: (value: string) => void;
  handleSectorChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  handleLocal: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  local: string;
  resultUserName: string;
  email: string;
  setSelectedSector: (value: string) => void;
  selectRadioButton: string;
  handleRadioButton: (event: React.MouseEvent<HTMLInputElement>) => void;
  branchLineOrCellPhone: string;
  setSelectRadioButton: (value: string) => void;
}

export const Form: React.FC<FormProps> = ({
  selectRadioButton,
  handleRadioButton,
  setName,
  setSobrenome,
  setEmail,
  setBranchLineOrCellPhone,
  handleSectorChange,
  handleLocal,
  resultUserName,
  local,
  email,
  setSelectedSector,
  branchLineOrCellPhone,
  setSelectRadioButton,
}) => {
  const sectors = [
    "Administrativo",
    "ADM e Regulatório",
    "CEO",
    "Comercial",
    "Customer Success",
    "Compras",
    "Diretoria de Negócios",
    "Expedição",
    "Financeiro",
    "GEDOC",
    "Gente e Cultura",
    "GRIS",
    "Gestão de Projetos",
    "Inovação e Tecnologia",
    "Marketing",
    "CX - Customer Experience",
    "Operações",
    "Operacional",
    "Pricing",
    "Qualidade - RT",
    "Qualidade",
    "Vendas",
    "Governança e Controladoria",
  ];

  const resetForm = () => {
    setName("");
    setEmail("");
    setBranchLineOrCellPhone("");
    setSobrenome("");
    setSelectedSector("");
    setSelectRadioButton("");
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, "");

    if (selectRadioButton === "celular") {
      if (value.length <= 2) {
        value = value;
      } else if (value.length <= 7) {
        value = value.replace(/^(\d{2})(\d+)/, "($1) $2");
      } else {
        value = value
          .replace(/^(\d{2})(\d+)/, "($1) $2")
          .replace(/(\d{5})(\d+)/, "$1-$2");
      }

      value = value.slice(0, 15);
    } else {
      // ramal (somente números)
      value = value.slice(0, 5);
    }

    setBranchLineOrCellPhone(value);
  };
  return (
    <form action="#" method="post" className="w-80">
      <div className="">
        <p className="font-semibold m-0 text-sm">Nome</p>
        <input
          className="w-full p-2.5 rounded-lg bg-white border border-blue-500 box-border text-sm mb-5"
          type="text"
          id="nome"
          placeholder="Digite o nome"
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div className="">
        <p className="font-semibold m-0 text-sm">Sobrenome</p>
        <input
          className="w-full p-2.5 rounded-lg bg-white border border-blue-500 box-border text-sm mb-5"
          type="text"
          id="sobrenome"
          placeholder="Digite o sobrenome"
          onChange={(e) => setSobrenome(e.target.value)}
        />
      </div>

      <div className="">
        <p className="font-semibold m-0 text-sm">Setor</p>
        <select
          id="setor"
          className="w-full p-2.5 rounded-lg bg-white border border-blue-500 box-border text-sm mb-5"
          onChange={handleSectorChange}
        >
          <option value="">Selecione o setor</option>

          {sectors.map((sector) => (
            <option key={sector} value={sector}>
              {sector}
            </option>
          ))}
        </select>
      </div>

      <div className="">
        <div className="flex items-center pb-1 gap-2">
          <div className="flex items-center justify-center font-semibold text-xs">
            <input
              type="radio"
              id="ramal"
              name="drone"
              value="ramal"
              onClick={handleRadioButton}
              defaultChecked={selectRadioButton === "ramal"}
            />
            <label htmlFor="ramal" className="ml-1">
              Ramal
            </label>
          </div>

          <div className="flex items-center justify-center font-semibold text-xs pr-2.5">
            <input
              type="radio"
              id="celular"
              name="drone"
              value="celular"
              onClick={handleRadioButton}
              defaultChecked={selectRadioButton === "celular"}
            />
            <label htmlFor="celular" className="ml-1">
              Celular
            </label>
          </div>
          <span className=" text-[12px]">(Opcional)</span>
        </div>

        <input
          disabled={!selectRadioButton}
          value={branchLineOrCellPhone}
          onChange={handleInputChange}
          className="w-full p-2.5 rounded-lg bg-white border border-blue-500 box-border text-sm mb-5"
          type="text"
          placeholder={
            !selectRadioButton
              ? "Escolha ramal ou celular"
              : `Digite o ${selectRadioButton}`
          }
          required
          pattern={
            selectRadioButton === "celular"
              ? "\\(\\d{2}\\) \\d{5}-\\d{4}"
              : "\\d{1,5}"
          }
        />
      </div>

      <div className="">
        <p className="font-semibold m-0 text-sm">E-mail</p>
        <input
          defaultValue={email?.trim() ? email : resultUserName}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2.5 rounded-lg bg-white border border-blue-500 box-border text-sm mb-5"
          type="email"
          id="email"
          placeholder="Digite o e-mail"
        />
      </div>

      <div className="">
        <p className="font-semibold m-0 text-sm">Local</p>
        <select
          id="local"
          defaultValue={local}
          className="w-full p-2.5 rounded-lg bg-white border border-blue-500 box-border text-sm mb-5"
          onChange={handleLocal}
        >
          <option value="">Selecione a localidade</option>
          <option value="CD Guarulhos - Cond.">CD Guarulhos - Cond.</option>
        </select>
      </div>

      <input type="hidden" name="imgCropada" id="imgCropada" />
      <input type="hidden" name="criar" value="criar" />

      <div className="flex flex-col gap-4">
        <input
          className="w-full p-3.5 rounded-lg font-semibold text-base border border-gray-300 bg-gray-200 hover:scale-105 cursor-pointer transition-all duration-200"
          type="reset"
          value="Redefinir"
          onClick={resetForm}
        />
      </div>
    </form>
  );
};
