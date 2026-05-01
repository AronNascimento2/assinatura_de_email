import { Form } from "@/app/components/form";
import { ProfileImageUpload } from "./ProfileImageUpload";

interface FormPanelProps {
  croppedImage: string | null;
  onImageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;

  setSelectRadioButton: React.Dispatch<React.SetStateAction<string>>;
  branchLineOrCellPhone: string;
  selectRadioButton: string;
  handleRadioButton: (event: React.MouseEvent<HTMLInputElement>) => void;
  setName: React.Dispatch<React.SetStateAction<string>>;
  setSobrenome: React.Dispatch<React.SetStateAction<string>>;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  setBranchLineOrCellPhone: React.Dispatch<React.SetStateAction<string>>;
  handleSectorChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  setLocal: React.Dispatch<React.SetStateAction<string>>;

  local: string;
  email: string;
  setSelectedSector: React.Dispatch<React.SetStateAction<string>>;
}

export const FormPanel = ({
  croppedImage,
  onImageChange,
  setSelectRadioButton,
  branchLineOrCellPhone,
  selectRadioButton,
  handleRadioButton,
  setName,
  setSobrenome,
  setEmail,
  setBranchLineOrCellPhone,
  handleSectorChange,
  setLocal,
  local,
  email,
  setSelectedSector,
}: FormPanelProps) => {
  return (
    <section className="flex w-full flex-col rounded-2xl bg-white p-6 shadow-sm">
      <ProfileImageUpload
        croppedImage={croppedImage}
        onImageChange={onImageChange}
      />

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
        setLocal={setLocal}
        local={local}
        email={email}
        setSelectedSector={setSelectedSector}
      />
    </section>
  );
};
