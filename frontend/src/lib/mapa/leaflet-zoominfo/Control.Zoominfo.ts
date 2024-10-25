import L from "leaflet";

// Interface para as opções do controle de coordenadas
interface CoordinatesOptions extends L.ControlOptions {
  decimals?: number;
  decimalSeperator?: string;
  labelTemplateLat?: string;
  labelTemplateLng?: string;
}

// Classe para o controle de coordenadas
class CoordinatesControl extends L.Control {
  private _container: HTMLElement;

  constructor(options?: CoordinatesOptions) {
    options = {
      position: "bottomleft",
      decimals: 4,
      decimalSeperator: ".",
      labelTemplateLat: "Lat: {y}",
      labelTemplateLng: "Lng: {x}",
    };

    super(options);
    this._container = L.DomUtil.create("div", "leaflet-control-coordinates");
    this._container.style.display = "none";
  }

  onAdd(map: L.Map): HTMLElement {
    // Atualiza as coordenadas e o nível de zoom ao mover o mouse no mapa
    map.on("mousemove", (event: L.LeafletMouseEvent) => {
      const lat = event.latlng.lat.toFixed(6);
      const lng = event.latlng.lng.toFixed(6);

      this._container.style.display = "flex";
      this._container.innerHTML = `
        <div class="coordinates-container">${lat},</div>
        <div class="coordinates-container"> ${lng}</div>
      `;
    });

    // Atualiza o nível de zoom ao finalizar o zoom no mapa
    map.on("zoomend", () => {
      const zoom = map.getZoom();
      const latlng = map.getCenter();

      const lat = latlng.lat.toFixed(6);
      const lng = latlng.lng.toFixed(6);

      this._container.style.display = "flex";
      this._container.innerHTML = `
        <div class="coordinates-container">${lat}</div>
        <div class="coordinates-container">${lng}</div>
      `;
    });

    return this._container;
  }
}

// Função de inicialização do controle de coordenadas
function coordinatesControl(options?: CoordinatesOptions): CoordinatesControl {
  return new CoordinatesControl(options);
}

// Exportações
export { CoordinatesControl, coordinatesControl };
