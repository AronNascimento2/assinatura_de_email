import { SignatureCompleted } from "../signatureCompleted/SignatureCompleted";

interface SignaturePreviewPanelProps {
  selectRadioButton: string;
  branchLineOrCellPhone: string;
  email: string;
  local: string;
  name: string;
  selectedSector: string;
  sobrenome: string;
  croppedImage: string | null;
  resultUserName: string;
}

export const SignaturePreviewPanel = ({
  selectRadioButton,
  branchLineOrCellPhone,
  email,
  local,
  name,
  selectedSector,
  sobrenome,
  croppedImage,
  resultUserName,
}: SignaturePreviewPanelProps) => {
  return (
    <section className="flex w-full flex-col justify-center gap-4 lg:justify-end">
      <div className="flex w-full justify-center rounded-2xl bg-gray-100 p-6 shadow-sm">
        <SignatureCompleted
          selectRadioButton={selectRadioButton}
          contato={branchLineOrCellPhone}
          email={email}
          local={local}
          name={name}
          selectedSector={selectedSector}
          sobrenome={sobrenome}
          croppedImage={croppedImage}
          resultUserName={resultUserName}
        />
      </div>
    </section>
  );
};
