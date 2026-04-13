import styles from "../styles/form.module.css";

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
    <form action="#" method="post" className={styles.form}>
      <div className={styles.inputContainer}>
        <p className={styles.label}>Nome</p>
        <input
          className={styles.input}
          type="text"
          id="nome"
          placeholder="Digite o nome"
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div className={styles.inputContainer}>
        <p className={styles.label}>Sobrenome</p>
        <input
          className={styles.input}
          type="text"
          id="sobrenome"
          placeholder="Digite o sobrenome"
          onChange={(e) => setSobrenome(e.target.value)}
        />
      </div>

      <div className={styles.inputContainer}>
        <p className={styles.label}>Setor</p>
        <select
          id="setor"
          className={styles.input}
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

      <div className={styles.inputContainer}>
        <div className={styles.containerRadio}>
          <div className={styles.radiobutton}>
            <input
              type="radio"
              id="ramal"
              name="drone"
              value="ramal"
              onClick={handleRadioButton}
              checked={selectRadioButton === "ramal"}
            />
            <label htmlFor="ramal">Ramal</label>
          </div>

          <div className={styles.radiobutton}>
            <input
              type="radio"
              id="celular"
              name="drone"
              value="celular"
              onClick={handleRadioButton}
              checked={selectRadioButton === "celular"}
            />
            <label htmlFor="celular">Celular</label>
          </div>
          <span style={{ paddingRight: "10px" }}>(Opcional)</span>
        </div>

        <input
          disabled={!selectRadioButton}
          value={branchLineOrCellPhone}
          onChange={handleInputChange}
          className={styles.input}
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

      <div className={styles.inputContainer}>
        <p className={styles.label}>E-mail</p>
        <input
          defaultValue={email?.trim() ? email : resultUserName}
          onChange={(e) => setEmail(e.target.value)}
          className={styles.input}
          type="email"
          id="email"
          placeholder="Digite o e-mail"
        />
      </div>

      <div className={styles.inputContainer}>
        <p className={styles.label}>Local</p>
        <select
          id="local"
          defaultValue={local}
          className={styles.input}
          onChange={handleLocal}
        >
          <option value="">Selecione a localidade</option>
          <option value="CD Guarulhos - Cond.">CD Guarulhos - Cond.</option>
        </select>
      </div>

      <input type="hidden" name="imgCropada" id="imgCropada" />
      <input type="hidden" name="criar" value="criar" />

      <div className={styles.buttonContainer}>
        <input
          className={`${styles.button} ${styles.buttonReset}`}
          type="reset"
          value="Redefinir"
          onClick={resetForm}
        />
      </div>
    </form>
  );
};
