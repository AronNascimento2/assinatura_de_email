import styles from "../styles/form.module.css";

interface FormProps {
  setName: (value: string) => void;
  setSobrenome: (value: string) => void;
  setEmail: (value: string) => void;
  setContato: (value: string) => void;
  handleSectorChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  handleLocal: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

export const Form: React.FC<FormProps> = ({
  setName,
  setSobrenome,
  setEmail,
  setContato,
  handleSectorChange,
  handleLocal,
}) => {
  return (
    <form action="#" method="post" className={styles.form}>
      <div className={styles.inputContainer}>
        <label htmlFor="nome">Nome</label>
        <input
          className={styles.input}
          type="text"
          id="nome"
          placeholder="Digite o nome"
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div className={styles.inputContainer}>
        <label htmlFor="sobrenome">Sobrenome</label>
        <input
          className={styles.input}
          type="text"
          id="sobrenome"
          placeholder="Digite o sobrenome"
          onChange={(e) => setSobrenome(e.target.value)}
        />
      </div>

      <div className={styles.inputContainer}>
        <label htmlFor="setor">Setor</label>
        <select
          id="setor"
          className={styles.input}
          onChange={handleSectorChange}
        >
          <option value="">Selecione o setor</option>
          <option value="Administrativo">Administrativo</option>
          <option value="ADM e Regulatório">ADM e Regulatório</option>
          <option value="CEO">CEO</option>
          <option value="Comercial">Comercial</option>
          <option value="Customer Success">Customer Success</option>
          <option value="Compras">Compras</option>
          <option value="Diretoria de Negócios">Diretoria de Negócios</option>
          <option value="Expedição">Expedição</option>
          <option value="Financeiro">Financeiro</option>
          <option value="Gente e Gestão">Gente e Gestão</option>
          <option value="GRIS">GRIS</option>
          <option value="Gestão de Projetos">Gestão de Projetos</option>
          <option value="Inovação e Tecnologia">Inovação e Tecnologia</option>
          <option value="Marketing">Marketing</option>
          <option value="CX - Customer Experience">
            CX - Customer Experience
          </option>
          <option value="Operações">Operações</option>
          <option value="Operacional">Operacional</option>
          <option value="Pricing">Pricing</option>
          <option value="Qualidade - RT">Qualidade - RT</option>
          <option value="Qualidade">Qualidade</option>
          <option value="Vendas">Vendas</option>
        </select>
      </div>

      <div className={styles.inputContainer}>
        <label htmlFor="celular">Contato</label>
        <input
          onChange={(e) => setContato(e.target.value)}
          className={styles.input}
          type="text"
          id="celular"
          placeholder="(xx) xxxxx-xxxx"
          pattern="\(\d{2}\) \d{5}-\d{4}"
          required
        />
      </div>

      <div className={styles.inputContainer}>
        <label htmlFor="email">E-mail</label>
        <input
          onChange={(e) => setEmail(e.target.value)}
          className={styles.input}
          type="email"
          id="email"
          placeholder="Digite o e-mail"
        />
      </div>

      <div className={styles.inputContainer}>
        <label htmlFor="local">Local</label>
        <select id="local" className={styles.input} onChange={handleLocal}>
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
        />
      </div>
    </form>
  );
};
