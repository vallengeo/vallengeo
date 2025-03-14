interface Perfis {
  id: string;
}

interface Grupos {
  id: string;
}

interface Telas {
  id: string;
  permissoes: Permissoes[];
}

interface Permissoes {
  codigo: string;
}

export default interface ICadastroUsuario {
  email: string;
  ativo: boolean;
  perfis: Perfis[];
  grupos: Grupos[];
  telas: Telas[];
  modulo: string;
}
