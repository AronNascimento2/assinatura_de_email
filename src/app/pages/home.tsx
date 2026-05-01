"use client";

import { SignaturePreviewPanel } from "@/components/signature-page/SignaturePreviewPanel";
import { useState } from "react";
import { ModalCrop } from "../components/modalCrop";
import { FormPanel } from "@/components/signature-page/FormPanel";

const Home: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [croppedImage, setCroppedImage] = useState<string | null>(null);

  const [name, setName] = useState("");
  const [sobrenome, setSobrenome] = useState("");
  const [branchLineOrCellPhone, setBranchLineOrCellPhone] = useState("");
  const [email, setEmail] = useState("");
  const [selectedSector, setSelectedSector] = useState("");
  const [local, setLocal] = useState("Local");
  const [selectRadioButton, setSelectRadioButton] = useState("");

  const handleSectorChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSector(event.target.value);
  };

  const handleRadioButton = (event: React.MouseEvent<HTMLInputElement>) => {
    const value = event.currentTarget.value;
    setSelectRadioButton((prev) => (prev === value ? "" : value));
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) return;

    const imageUrl = URL.createObjectURL(file);
    setSelectedImage(imageUrl);
    setIsModalOpen(true);
  };

  return (
    <>
      <div className="grid gap-8 lg:grid-cols-[minmax(360px,420px)_1fr] lg:items-start lg:gap-12">
        <FormPanel
          croppedImage={croppedImage}
          onImageChange={handleImageChange}
          setSelectRadioButton={setSelectRadioButton}
          branchLineOrCellPhone={branchLineOrCellPhone}
          selectRadioButton={selectRadioButton}
          handleRadioButton={handleRadioButton}
          setName={setName}
          setSobrenome={setSobrenome}
          setEmail={setEmail}
          setBranchLineOrCellPhone={setBranchLineOrCellPhone}
          handleSectorChange={handleSectorChange}
          setLocal={setLocal}
          local={local}
          email={email}
          setSelectedSector={setSelectedSector}
        />

        <SignaturePreviewPanel
          selectRadioButton={selectRadioButton}
          branchLineOrCellPhone={branchLineOrCellPhone}
          email={email}
          local={local}
          name={name}
          selectedSector={selectedSector}
          sobrenome={sobrenome}
          croppedImage={croppedImage}
          resultUserName={email}
        />
      </div>
      <ModalCrop
        isModalOpen={isModalOpen}
        selectedImage={selectedImage}
        setCroppedImage={setCroppedImage}
        setIsModalOpen={setIsModalOpen}
        setSelectedImage={setSelectedImage}
        croppedImage={croppedImage}
      />
    </>
  );
};

export default Home;
