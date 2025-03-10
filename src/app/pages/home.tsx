"use client";
import { useCallback, useState } from "react";
import styles from "../styles/Home.module.css";
import getCroppedImg from "../utils/getCroppedImg";
import Cropper from "react-easy-crop";
import Image from "next/image";

const Home: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [croppedImage, setCroppedImage] = useState<string | null>(null);
  const [showSignature, setShowSignature] = useState(false); // Adicionando estado para exibir a assinatura gerada
  const [name, setName] = useState("");
  const [sobrenome, setSobrenome] = useState("");
  const [contato, setContato] = useState("");
  const [email, setEmail] = useState("");
  const [selectedSector, setSelectedSector] = useState<string>("");
  const [local, setLocal] = useState<string>("");

  const handleSectorChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSector(event.target.value);
  };

  const handleLocal = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setLocal(event.target.value);
  };
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
      setIsModalOpen(true);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
    setCrop({ x: 0, y: 0 });
    setZoom(1);
    setRotation(0);
    setCroppedImage(null);
  };

  const onCropComplete = useCallback(
    async (_croppedArea, croppedAreaPixels) => {
      if (!selectedImage) return;
      const croppedImg = await getCroppedImg(
        selectedImage,
        croppedAreaPixels,
        rotation
      );
      setCroppedImage(croppedImg);
    },
    [selectedImage, rotation]
  );

  const handleGenerateSignature = () => {
    setShowSignature(true); // Mostrar a assinatura gerada
  };

  return (
    <div className={styles.container}>
      <div className={styles.titleContainer}>
        <Image src="uni-logo.png" className={styles.uniLogo} alt="unilogo" />
        <p className={styles.mainTitle}>Criador de assinatura de e-mail</p>
        <Image src="uni-logo.png" className={styles.uniLogo} alt="unilogo" />
      </div>

      <div className={styles.row}>
        <div className={styles.colMd4}>&nbsp;</div>
        <div className={styles.colMd4}>
          <div className={styles.imageArea}>
            <form method="post">
              <label>
                <Image
                  src={croppedImage || "user.png"}
                  className={`${styles.image} ${styles.imgResponsive} ${styles.imgCircle} ${styles.userImage}`}
                  alt="Usuário"
                />
                <div className={styles.overlay}>
                  <div className={styles.text}>
                    Clique pra selecionar a imagem
                  </div>
                </div>
                <input
                  type="file"
                  name="image"
                  className={styles.file}
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </label>
            </form>

            {isModalOpen && selectedImage && (
              <div className={styles.modal}>
                <div className={styles.modalContent}>
                  <span className={styles.close} onClick={closeModal}>
                    &times;
                  </span>

                  <h3>Editar Imagem</h3>

                  {/* Área de Crop */}
                  <div className={styles.controls}>
                    <label>Zoom</label>
                    <input
                      type="range"
                      min="1"
                      max="3"
                      step="0.1"
                      value={zoom}
                      onChange={(e) => setZoom(Number(e.target.value))}
                    />

                    <label>Rotação</label>
                    <input
                      type="range"
                      min="-180"
                      max="180"
                      step="1"
                      value={rotation}
                      onChange={(e) => setRotation(Number(e.target.value))}
                    />
                  </div>
                  <div className={styles.wrapperImages}>
                    <div className={styles.cropContainer}>
                      <Cropper
                        image={selectedImage}
                        crop={crop}
                        zoom={zoom}
                        rotation={rotation}
                        aspect={1}
                        onCropChange={setCrop}
                        onZoomChange={setZoom}
                        onRotationChange={setRotation}
                        onCropComplete={onCropComplete}
                      />
                    </div>

                    {/* Controles de Zoom e Rotação */}

                    {/* Preview da Imagem */}
                    <div className={styles.previewContainer}>
                      <p>Prévia:</p>
                      <div className={styles.previewWrapper}>
                        {croppedImage ? (
                          <img
                            src={croppedImage}
                            alt="Preview"
                            className={styles.previewImage}
                          />
                        ) : (
                          <p>Selecione uma área</p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Botão Aplicar */}
                  <button
                    className={styles.buttonAplicar}
                    onClick={() => setIsModalOpen(false)}
                  >
                    Aplicar Recorte
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <form action="#" method="post" className={styles.form}>
        <div className={styles.inputContainer}>
          <label>Nome</label>
          <input
            className={styles.input}
            type="text"
            name="nome"
            id="nome"
            placeholder="Digite o nome"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className={styles.inputContainer}>
          <label>Sobrenome</label>
          <input
            className={styles.input}
            type="text"
            name="sobrenome"
            id="sobrenome"
            placeholder="Digite o sobrenome"
            value={sobrenome}
            onChange={(e) => setSobrenome(e.target.value)}
          />
        </div>
        <div className={styles.inputContainer}>
          <label>Setor</label>
          <select
            name="setor"
            id="setor"
            className={styles.input}
            onChange={handleSectorChange}
          >
            <option value="selecione" selected>
              Selecione o setor
            </option>
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
          <label>Contato:</label>
          <input
            value={contato}
            onChange={(e) => setContato(e.target.value)}
            className={styles.input}
            type="text"
            name="celular"
            id="celular"
            placeholder="(xx) xxxxx-xxxx"
            pattern="\(\d{2}\) \d{5}-\d{4}"
            required
          />
        </div>
        <div className={styles.inputContainer}>
          <label>E-mail</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={styles.input}
            type="email"
            name="email"
            id="email"
            placeholder="Digite o e-mail"
          />
        </div>
        <div className={styles.inputContainer}>
          <label>Local</label>
          <select
            name="local"
            id="local"
            className={styles.input}
            onChange={handleLocal}
          >
            <option value="selecione" selected>
              Selecione a localidade
            </option>
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
          <input
            className={`${styles.button} ${styles.buttonRegister}`}
            type="button"
            id="enviar"
            value="Criar assinatura"
            onClick={handleGenerateSignature} // Aciona a geração da assinatura
          />
        </div>
      </form>

      {/* Exibição da imagem template e da imagem recortada quando a assinatura for gerada */}
      {showSignature && (
        <div className={styles.signaturePreview}>
          <h3>Assinatura Gerada:</h3>
          <div className={styles.signatureImages}>
            <div>
              <Image src="/template.jpg" alt="Template" />
            </div>
            <p className={styles.nameSignature}>{name}</p>
            <p className={styles.sobrenomeSignature}>{sobrenome}</p>
            <p className={styles.setorSignature}>{selectedSector}</p>

            <p className={styles.contatoSignature}>{contato}</p>
            <p className={styles.emailSignature}>{email}</p>
            <p className={styles.localSignature}>{local}</p>
            <Image
              className={styles.imageSignature}
              src={croppedImage || "/assets/user.png"}
              alt="Assinatura Recortada"
            />
          </div>
        </div>
      )}

      <footer className={styles.footer}>
        <p className={styles.footerText}>
          Copyright © Unicargo 2025. Todos os direitos reservados.
        </p>
      </footer>
    </div>
  );
};

export default Home;
