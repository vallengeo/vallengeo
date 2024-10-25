import L from "leaflet";
import "leaflet-draw";

export function DrawLocal() {
  L.drawLocal.draw.toolbar.actions = {
    title: "Cancelar desenho",
    text: "Cancelar",
  };
  L.drawLocal.draw.toolbar.finish = {
    title: "Finalizar desenho",
    text: "Finalizar",
  };
  L.drawLocal.draw.toolbar.undo = {
    title: "Desfazer última ação",
    text: "Desfazer",
  };
  L.drawLocal.draw.toolbar.buttons = {
    polyline: "Medir a Distância",
    polygon: "Medir a Área",
    rectangle: "Desenhar um retângulo",
    circle: "Medir o Raio",
    marker: "Adicionar um marcador",
    circlemarker: "Desenhar um círculo",
  };

  L.drawLocal.edit.toolbar.actions = {
    save: {
      title: "Salvar alterações",
      text: "Salvar",
    },
    cancel: {
      title: "Cancelar edição",
      text: "Cancelar",
    },
    clearAll: {
      title: "Limpar todas as camadas",
      text: "Limpar tudo",
    },
  };
  L.drawLocal.edit.toolbar.buttons = {
    edit: "Editar camadas",
    editDisabled: "Nenhuma camada para editar",
    remove: "Excluir camadas",
    removeDisabled: "Nenhuma camada para excluir",
  };

  L.drawLocal.draw.handlers.polyline = {
    tooltip: {
      start: "Clique para começar a desenhar a linha.",
      cont: "Clique para continuar desenhando a linha.",
      end: "Clique no último ponto para finalizar a linha.",
    },
    error: "Erro ao desenhar a linha.",
  };

  L.drawLocal.draw.handlers.circle = {
    tooltip: {
      start: "Clique e arraste para desenhar um círculo.",
    },
    radius: "Raio", // Mensagem sobre o raio do círculo
  };

  L.drawLocal.draw.handlers.polygon = {
    tooltip: {
      start: "Clique para começar a desenhar o polígono.",
      cont: "Clique para continuar desenhando o polígono.",
      end: "Clique no primeiro ponto para fechar o polígono.",
    },
  };
}
