import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useRef, useState } from "react";
export const sectors = [
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
export const SetorModel: React.FC = () => {
  const [selectedItemSector, setSelectedItemSector] = useState<string>("");
  const textRef = useRef<HTMLParagraphElement>(null);
  const [isMultiline, setIsMultiline] = useState(false);
  useEffect(() => {
    if (textRef.current) {
      const el = textRef.current;
      const isMultiline = selectedItemSector.length > 15;
      setIsMultiline(isMultiline);
    }
  }, [selectedItemSector]);
  return (
    <div className="flex h-[200px] w-full items-center gap-6 rounded-2xl bg-white p-6 shadow-sm">
      <div className="relative flex items-center justify-center">
        <img
          src="/model-setor.png"
          alt="Usuário"
          className="h-[120px] w-auto object-contain"
        />

        <p
          ref={textRef}
          className={`absolute left-1/2 -translate-x-1/2 max-w-[140px] break-words text-center text-sm font-medium text-[#fefefe] ${
            isMultiline ? "top-[10px]" : "top-[20px]"
          }`}
        >
          {selectedItemSector}
        </p>
      </div>

      <div className="">
        <Select onValueChange={(value) => setSelectedItemSector(value)}>
          <SelectTrigger className="w-full max-w-48">
            <SelectValue placeholder="Selecione um setor" />
          </SelectTrigger>

          <SelectContent>
            <SelectGroup>
              {sectors.map((sector) => (
                <SelectItem key={sector} value={sector}>
                  {sector}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};
