export default interface IUsuario {
  id: string;
  email: string;
  ativo: boolean;
  perfis: Perfis[];
  grupos: Grupos[];
  telas: Telas[];
}

export interface Perfis {
  codigo: string;
}

interface Grupos {
  codigo: string;
}

interface Telas {
  codigo: string;
  permissoes: Permissoes[];
}

interface Permissoes {
  codigo: string;
}
