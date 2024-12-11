import React, { useState } from "react";
import { Search, X } from "lucide-react";
import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";

interface Sugestao {
  id: number;
  valor: string;
}

interface PesquisarProps {
  onSearch: (value: string) => void; // Callback para executar a pesquisa
  onChange: (value: string) => void;
  sugestoes: Sugestao[]; // Lista de sugestões
  loading: boolean;
}

export const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const Pesquisar: React.FC<PesquisarProps> = ({
  onSearch,
  onChange,
  sugestoes,
  loading
}) => {
  const [inputValue, setInputValue] = useState<string>(""); // Valor do input
  const [filteredSuggestions, setFilteredSuggestions] = useState<Sugestao[]>(
    []
  ); // Sugestões filtradas
  const [isSuggestionVisible, setIsSuggestionVisible] =
    useState<boolean>(false); // Controle de visibilidade

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInputValue(value);
    onChange(event.target.value);
    // Filtra as sugestões
    if (!loading && value.trim()) {
      const filtered = sugestoes.filter((sugestao) =>
        sugestao.valor.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredSuggestions(filtered);
      setIsSuggestionVisible(true);
    } else {
      setFilteredSuggestions([]);
      setIsSuggestionVisible(false);
    }
  };

  const handleSuggestionClick = (sugestao: string) => {
    setInputValue(sugestao);
    setIsSuggestionVisible(false);
    onSearch(sugestao);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && inputValue.trim()) {
      setIsSuggestionVisible(false);
      onSearch(inputValue);
    }
  };
  const onClean = () => {
    setFilteredSuggestions([]);
    setInputValue("");
    setIsSuggestionVisible(false);
    onSearch("");
  };

  return (
    <div className="pesquisar-container relative w-full bg-gray-200 shadow-lg shadow-gray-200/50 rounded">
      <div className="flex items-center">
        <input
          type="text"
          placeholder="Pesquisar"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          className={cn(
            "border rounded-l px-2 py-1 w-full text-sm text-gray-900 dark:text-gray-300 text-title font-medium",
            inter.className
          )}
        />
        <button
          type="button"
          title="Pesquisar"
          onClick={() => onSearch(inputValue)}
          className="cursor-pointer rounded-full w-9 h-8 flex items-center justify-center hover:text-link"
        >
          <Search style={{ width: 18, height: 18, margin: 0 }} />
        </button>
        <button
          type="button"
          title="Pesquisar"
          onClick={() => onClean()}
          className="cursor-pointer rounded-full w-9 h-8 flex items-center justify-center hover:text-link"
        >
          <X style={{ width: 18, height: 18, margin: 0 }} />
        </button>
      </div>
      {isSuggestionVisible && filteredSuggestions.length > 0 && (
        <ul className="sugestao bg-white border-y-2 border-y-sky-100 w-full mt-1 pb-2">
          {filteredSuggestions.map((sugestao) => (
            <li
              key={sugestao.id}
              onClick={() => handleSuggestionClick(sugestao.valor)}
              className={cn(
                "cursor-pointer px-2 py-3 w-full text-xs text-gray-900 dark:text-gray-300 hover:bg-gray-100",
                inter.className
              )}
            >
              {sugestao.valor}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Pesquisar;

// interface PesquisarProps {
//     onSearch: (value: string) => void; // Função callback para tratar a pesquisa
//     onChange: (value: string) => void; // Função callback para tratar a pesquisa
// }

// const Pesquisar: React.FC<PesquisarProps> = ({ onSearch, onChange }) => {
//     const [inputValue, setInputValue] = useState<string>(""); // Estado para o valor do input

//     const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//         setInputValue(event.target.value); // Atualiza o estado com o valor do input
//         onChange(event.target.value);
//     };

//     const handleSearchClick = () => {
//         onSearch(inputValue); // Chama a função de busca com o valor atual do input
//     };

//     const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
//         if (event.key === 'Enter') {
//             handleSearchClick(); // Chama a função de busca ao pressionar "Enter"
//         }
//     };

//     return (
//         <div className="pesquisar-container focus-visible:outline-none flex items-center">
//             <input
//                 type="text"
//                 placeholder="Pesquisar"
//                 value={inputValue}
//                 onChange={handleInputChange} // Atualiza o valor do input]
//                 onKeyDown={handleKeyDown} // Detecta a tecla "Enter"
//                 className="border rounded-l px-2 py-1"
//             />
//             <button
//             type="button"
//             title='Pesquisar'
//             onClick={handleSearchClick}
//             className="cursor-pointer rounded-full w-9 h-8 flex items-center justify-center hover:text-link"
//           >
//             <Search style={{ width: 18, height: 18, margin: 0 }} />
//           </button>

//         </div>
//     );
// };

// export default Pesquisar;
