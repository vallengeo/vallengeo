import L from "leaflet";

// Função que cria e adiciona o controle personalizado
const ZoomControl = (map: L.Map) => {
    const ZoomControl = L.Control.extend({
        onAdd: function () {
            // Cria o container para o controle
            const _container = L.DomUtil.create("div", "leaflet-control-custom-zoom");

            // Botão de Zoom In
            const zoomInButton = L.DomUtil.create("a", "zoom-in-btn leaflet-control-zoom-in", _container);
            zoomInButton.innerHTML = "<span aria-hidden='true'>+</span>";
            zoomInButton.style.cursor = "pointer";

            // Div para mostrar o nível de zoom atual
            const zoomLevelDiv = L.DomUtil.create("div", "zoom-level", _container);
            zoomLevelDiv.innerHTML = `${map.getZoom()}x`;

            // Botão de Zoom Out
            const zoomOutButton = L.DomUtil.create("a", "zoom-out-btn leaflet-control-zoom-out", _container);
            zoomOutButton.innerHTML = "<span aria-hidden='true'>-</span>";
            zoomOutButton.style.cursor = "pointer";

            // Adiciona eventos aos botões
            L.DomEvent.on(zoomInButton, 'click', function () {
                map.zoomIn();
            });

            L.DomEvent.on(zoomOutButton, 'click', function () {
                map.zoomOut();
            });

            // Atualiza o nível de zoom exibido quando o zoom muda
            map.on('zoomend', () => {
                zoomLevelDiv.innerHTML = `${map.getZoom()}x`;
            });

            return _container;
        },

        onRemove: function () {
            // Função de limpeza, caso necessário
        }
    });
    map.addControl(new ZoomControl({ position: 'topright' }));
};

export default ZoomControl;
