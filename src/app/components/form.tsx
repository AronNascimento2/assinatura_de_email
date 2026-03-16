import styles from "../styles/form.module.css";

interface FormProps {
  setName: (value: string) => void;
  setSobrenome: (value: string) => void;
  setEmail: (value: string) => void;
  setRamal: (value: string) => void;
  handleSectorChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  handleLocal: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  local: string;
  resultUserName: string;
  email: string;
  setSelectedSector: (value: string) => void;
}

export const Form: React.FC<FormProps> = ({
  setName,
  setSobrenome,
  setEmail,
  setRamal,
  handleSectorChange,
  handleLocal,
  resultUserName,
  local,
  email,
  setSelectedSector,
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
    setRamal("");
    setSobrenome("");
    setSelectedSector("");
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
        <p className={styles.label}>Ramal</p>
        <input
          onChange={(e) => setRamal(e.target.value)}
          className={styles.input}
          type="text"
          id="ramal"
          placeholder="Digite o ramal"
          pattern="\d{4}"
          required
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
