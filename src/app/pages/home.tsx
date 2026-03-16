"use client";
import { useState } from "react";
import styles from "../styles/Home.module.css";

import { Footer } from "../components/footer";
import { Form } from "../components/form";
import { ModalCrop } from "../components/modalCrop";
import { SignatureCompleted } from "../components/signatureCompleted";

const Home: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [croppedImage, setCroppedImage] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [sobrenome, setSobrenome] = useState("");
  const [ramal, setRamal] = useState("");
  const [email, setEmail] = useState("");
  const [selectedSector, setSelectedSector] = useState<string>("");
  const [local, setLocal] = useState<string>("CD Guarulhos - Cond.");

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
  const firstLetter = name?.[0] ?? "";
  const lastName = sobrenome ?? "";

  const resultUserName =
    `${firstLetter}${lastName}`.trim().toLowerCase() + "@unicargo.com.br";
  return (
    <div className={styles.container}>
      <div className={styles.titleContainer}>
        <img src="uni-logo.png" className={styles.uniLogo} alt="unilogo" />
        <p className={styles.mainTitle}>Criador de assinatura de e-mail</p>
        <img src="uni-logo.png" className={styles.uniLogo} alt="unilogo" />
      </div>

      <div className={styles.row}>
        <div className={styles.colMd4}>&nbsp;</div>
        <div className={styles.colMd4}>
          <div className={styles.imageArea}>
            <form method="post">
              <label>
                <img
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
          </div>
        </div>
        <ModalCrop
          isModalOpen={isModalOpen}
          selectedImage={selectedImage}
          setCroppedImage={setCroppedImage}
          setIsModalOpen={setIsModalOpen}
          setSelectedImage={setSelectedImage}
          croppedImage={croppedImage}
        />
      </div>
      <div className={styles.containerForm}>
        <Form
          setName={setName}
          setSobrenome={setSobrenome}
          setEmail={setEmail}
          setRamal={setRamal}
          handleSectorChange={handleSectorChange}
          handleLocal={handleLocal}
          local={local}
          resultUserName={resultUserName}
          email={email}
          setSelectedSector={setSelectedSector}
        />
      </div>

      <div className={styles.containerSig}>
        <SignatureCompleted
          ramal={ramal}
          email={email}
          local={local}
          name={name}
          selectedSector={selectedSector}
          sobrenome={sobrenome}
          croppedImage={croppedImage}
          resultUserName={resultUserName}
        />
      </div>

      <Footer />
    </div>
  );
};

export default Home;
