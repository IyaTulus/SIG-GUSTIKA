const waitForMapContainer = setInterval(() => {
    const mapContainer = document.getElementById("map");

    if (mapContainer) {
        clearInterval(waitForMapContainer); // Stop cek

        const map = L.map("map", {
            zoomControl: false,
            renderer: L.canvas(),
        }).setView([-7.7956, 110.3695], 13);

        L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
            maxZoom: 19,
            attribution:
                '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap contributors</a>',
        }).addTo(map);

        // Fungsi popup
        function onEachFeature(feature, layer) {
            if (feature.properties) {
                const popupContent = Object.entries(feature.properties)
                    .map(([key, value]) => `${key}: ${value}`)
                    .join("<br>");
                layer.bindPopup(popupContent);
            }
        }

        // Tambahkan layer kedua: JalanJogjaGeo.geojson
        fetch("./assets/JS/geojson/Geo-JalanJogja.geojson")
            .then(res => res.json())
            .then(data => {
                L.geoJSON(data, {
                    onEachFeature,
                    renderer: L.canvas(),
                    style: {
                        color: "#3498db", // Biru
                        weight: 3,
                        opacity: 0.6,
                    },
                }).addTo(map);
            })
            .catch(err => {
                console.error("Gagal memuat Geo-JalanJogja.geojson:", err);
            });

        // Paksa redraw ukuran
        requestAnimationFrame(() => {
            map.invalidateSize();
        });

        // Tambahkan layer pertama: OneWayGeo.geojson
        fetch("./assets/JS/geojson/OneWayGeo.geojson")
            .then(res => res.json())
            .then(data => {
                L.geoJSON(data, {
                    onEachFeature,
                    renderer: L.canvas(),
                    style: {
                        color: "#f1c40f", // Kuning
                        weight: 5,
                        opacity: 0.5,
                    },
                }).addTo(map);
            })
            .catch(err => {
                console.error("Gagal memuat OneWayGeo.geojson:", err);
            });

        
    }
}, 100);
