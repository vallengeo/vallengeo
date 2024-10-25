import React, { useState } from 'react';
import { Search } from 'lucide-react';

interface PesquisarProps {
    onSearch: (value: string) => void; // Função callback para tratar a pesquisa
}

const Pesquisar: React.FC<PesquisarProps> = ({ onSearch }) => {
    const [inputValue, setInputValue] = useState<string>(""); // Estado para o valor do input

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value); // Atualiza o estado com o valor do input
    };

    const handleSearchClick = () => {
        onSearch(inputValue); // Chama a função de busca com o valor atual do input
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            handleSearchClick(); // Chama a função de busca ao pressionar "Enter"
        }
    };

    return (
        <div className="pesquisar-container focus-visible:outline-none flex items-center">
            <input
                type="text"
                placeholder="Pesquisar"
                value={inputValue}
                onChange={handleInputChange} // Atualiza o valor do input]
                onKeyDown={handleKeyDown} // Detecta a tecla "Enter"
                className="border rounded-l px-2 py-1"
            />
            <button
            type="button"
            title='Pesquisar'
            onClick={handleSearchClick}
            className="cursor-pointer rounded-full w-9 h-8 flex items-center justify-center hover:text-link"
          >
            <Search style={{ width: 18, height: 18, margin: 0 }} />
          </button>
            
        </div>
    );
};

export default Pesquisar;