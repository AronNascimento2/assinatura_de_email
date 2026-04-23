"use client";

import { useState } from "react";

import { Form } from "../components/form";
import { ModalCrop } from "../components/modalCrop";
import { SignatureCompleted } from "../components/signatureCompleted";

import { AvatarModel } from "../components/avatarModel";
import { SetorModel } from "../components/setorModel";

const Home: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [croppedImage, setCroppedImage] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [sobrenome, setSobrenome] = useState("");
  const [branchLineOrCellPhone, setBranchLineOrCellPhone] = useState("");
  const [email, setEmail] = useState("");
  const [selectedSector, setSelectedSector] = useState<string>("");
  const [local, setLocal] = useState<string>("CD Guarulhos - Cond.");
  const [selectRadioButton, setSelectRadioButton] = useState("");
  const handleSectorChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSector(event.target.value);
  };

  const handleRadioButton = (event: React.MouseEvent<HTMLInputElement>) => {
    const value = event.currentTarget.value;

    setSelectRadioButton((prev) => (prev === value ? "" : value));
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
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto flex min-h-screen w-full max-w-7xl flex-col px-4 py-4 sm:px-6 lg:px-8">
        <header className="mx-auto mb-10 flex w-full  items-center justify-between rounded-2xl bg-gradient-to-r from-[#16203d] to-[#1f2b52] px-6 py-4 shadow-xl">
          <div className="flex items-center gap-3">
            <img src="uni-logo.png" className="h-8 w-8" alt="unilogo" />
            <span className="hidden text-sm font-medium text-gray-300 sm:block">
              Unicargo
            </span>
          </div>

          {/* Título */}
          <div className="flex flex-col items-center">
            <h1 className="text-center text-base font-bold text-white sm:text-xl">
              Gerador de Assinatura de Email
            </h1>
          </div>

          {/* Logo direita (ou ação futura) */}
          <div className="flex items-center gap-2">
            <img
              src="uni-logo.png"
              className="h-8 w-8 opacity-80"
              alt="unilogo"
            />
          </div>
        </header>

        <main className="flex flex-1 flex-col gap-8 lg:grid lg:grid-cols-[minmax(360px,420px)_1fr] lg:items-start lg:gap-12">
          <section className="flex w-full flex-col rounded-2xl bg-white p-6 shadow-sm">
            <div className="mb-8 flex w-full justify-center">
              <form method="post" className="flex justify-center">
                <label className="group relative cursor-pointer">
                  <img
                    src={croppedImage || "user.png"}
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
                    onChange={handleImageChange}
                  />
                </label>
              </form>
            </div>

            <div className="w-full">
              <Form
                setSelectRadioButton={setSelectRadioButton}
                branchLineOrCellPhone={branchLineOrCellPhone}
                selectRadioButton={selectRadioButton}
                handleRadioButton={handleRadioButton}
                setName={setName}
                setSobrenome={setSobrenome}
                setEmail={setEmail}
                setBranchLineOrCellPhone={setBranchLineOrCellPhone}
                handleSectorChange={handleSectorChange}
                handleLocal={handleLocal}
                local={local}
                resultUserName={resultUserName}
                email={email}
                setSelectedSector={setSelectedSector}
              />
            </div>
          </section>

          <section className="flex w-full flex-col gap-4 justify-center lg:justify-end">
            <div className="w-full rounded-2xl bg-white p-6 shadow-sm flex justify-center">
              <SignatureCompleted
                resultUserName={resultUserName}
                selectRadioButton={selectRadioButton}
                contato={branchLineOrCellPhone}
                email={email}
                local={local}
                name={name}
                selectedSector={selectedSector}
                sobrenome={sobrenome}
                croppedImage={croppedImage}
              />
            </div>
            <AvatarModel
              croppedImage={croppedImage}
              name={name}
              sobrenome={sobrenome}
              selectedSector={selectedSector}
            />
            <SetorModel />
          </section>
        </main>

        <ModalCrop
          isModalOpen={isModalOpen}
          selectedImage={selectedImage}
          setCroppedImage={setCroppedImage}
          setIsModalOpen={setIsModalOpen}
          setSelectedImage={setSelectedImage}
          croppedImage={croppedImage}
        />
      </div>
    </div>
  );
};

export default Home;
