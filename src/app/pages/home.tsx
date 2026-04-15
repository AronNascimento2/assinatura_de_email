"use client";
import { useState } from "react";

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

    if (selectRadioButton === value) {
      setSelectRadioButton("");
    } else {
      setSelectRadioButton(value);
    }
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
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="flex-1 flex flex-col items-center ">
        <div className="flex justify-between items-center bg-[#16203d] rounded-full shadow-lg w-3/5 px-3 py-2 mt-2">
          <img src="uni-logo.png" className="w-6 h-6" alt="unilogo" />
          <p className="text-lg font-bold text-white m-0">
            Criador de assinatura de e-mail
          </p>
          <img src="uni-logo.png" className="w-6 h-6" alt="unilogo" />
        </div>

        <div className="flex justify-center  w-full mt-4 ">
          <div className=" "></div>
          <div className="w-1/3 flex justify-center items-center">
            <div className=" items-center ">
              <form method="post">
                <label className="cursor-pointer items-center">
                  <img
                    src={croppedImage || "user.png"}
                    className="mt-10 w-[140px] h-[140px] rounded-full border-4 border-blue-500"
                    alt="Usuário"
                  />
                  <div className="absolute bottom-1 left-0 right-0 bg-white bg-opacity-50 overflow-hidden h-0 transition-all duration-500 w-full hover:h-1/2 cursor-pointer">
                    <div className="text-gray-800 font-bold text-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                      Clique pra selecionar a imagem
                    </div>
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
        <div className="mt-4">
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

        <div className="mt-4">
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

        <Footer />
      </div>
    </div>
  );
};

export default Home;
