// Initialize the map when the page loads
document.addEventListener("DOMContentLoaded", function () {
    // Add a small delay to ensure the DOM is fully rendered
    setTimeout(function () {
        // Check if Leaflet is available
        if (typeof L !== "undefined") {
            try {
                var map = L.map("map", {
                    zoomControl: false, // Remove default zoom control since we have custom ones
                }).setView([-7.7956, 110.3695], 13); // Yogyakarta coordinates

                L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
                    maxZoom: 19,
                    attribution:
                        '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
                }).addTo(map);

                // Add a marker for Yogyakarta
                var popup = L.popup();

                function onMapClick(e) {
                    popup
                        .setLatLng(e.latlng)
                        .setContent("You clicked the map at " + e.latlng.toString())
                        .openOn(map);

                    console.log(e.latlng);
                }

                map.on("click", onMapClick);

                function popUp(f, l) {
                    var out = [];
                    if (f.properties) {
                        for (key in f.properties) {
                            out.push(key + ": " + f.properties[key]);
                        }
                        l.bindPopup(out.join("<br />"));
                    }
                }
                var jsonTest = new L.GeoJSON.AJAX(
                    ["./assets/JS/geojson/id34_daerah_istimewa_yogyakarta_district.geojson"],
                    { onEachFeature: popUp }
                ).addTo(map);

                // Invalidate size to ensure proper rendering
                setTimeout(function () {
                    map.invalidateSize();
                }, 100);
            } catch (error) {
                console.error("Error initializing map:", error);
                document.getElementById("map").innerHTML =
                    '<div class="flex items-center justify-center h-full text-gray-500"><p>Peta tidak dapat dimuat. Pastikan koneksi internet tersedia.</p></div>';
            }
        } else {
            console.warn(
                "Leaflet library not loaded. Make sure to include Leaflet CSS and JS in your header.php"
            );
            document.getElementById("map").innerHTML =
                '<div class="flex items-center justify-center h-full text-gray-500"><p>Library peta tidak tersedia. Pastikan Leaflet sudah dimuat.</p></div>';
        }
    }, 500);
});
