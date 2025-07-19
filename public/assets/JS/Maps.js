let map;
        let currentMarker = null; // Untuk menyimpan marker yang aktif
        let streetDataCache = []; // Cache untuk menyimpan data jalan

        const waitForMapContainer = setInterval(() => {
            const mapContainer = document.getElementById("map");

            if (mapContainer) {
                clearInterval(waitForMapContainer); // Stop cek

                map = L.map("map", {
                    zoomControl: false,
                    renderer: L.canvas(),
                }).setView([-7.7956, 110.3695], 13);

                L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
                    maxZoom: 19,
                    attribution:
                        '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap contributors</a>',
                }).addTo(map);

                // Variabel untuk menyimpan layer
                let oneWayLayer = null;
                let twoWayLayer = null;

                // Fungsi popup
                function onEachFeature(feature, layer) {
                    if (feature.properties) {
                        const popupContent = Object.entries(feature.properties)
                            .map(([key, value]) => `${key}: ${value}`)
                            .join("<br>");
                        layer.bindPopup(popupContent);
                    }
                }

                // Fungsi untuk toggle layer
                function toggleLayer(layerName, show) {
                    if (layerName === 'oneWay' && oneWayLayer) {
                        if (show) {
                            map.addLayer(oneWayLayer);
                        } else {
                            map.removeLayer(oneWayLayer);
                        }
                    } else if (layerName === 'twoWay' && twoWayLayer) {
                        if (show) {
                            map.addLayer(twoWayLayer);
                        } else {
                            map.removeLayer(twoWayLayer);
                        }
                    }
                }

                // Buat legenda dan kontrol
                const legendHTML = `
                    <div id="map-legend" class="absolute bottom-4 left-4 bg-white mx-2 my-2 backdrop-blur-sm rounded-lg shadow-lg border border-gray-200 p-4 z-[1000] min-w-64">
                        <!-- Header -->
                        <div class="flex items-center gap-2 mb-3 pb-2 border-b border-gray-200">
                            <div class="w-3 h-3 bg-blue-500 rounded-full"></div>
                            <h3 class="font-semibold text-gray-800">Peta Jalan Yogyakarta</h3>
                        </div>
                        
                        <!-- Location Info -->
                        <div class="mb-4">
                            <p class="text-sm text-gray-600 flex items-center gap-1">
                                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                    <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd"/>
                                </svg>
                                Yogyakarta, Indonesia
                            </p>
                        </div>
                        
                        <!-- Legend Items -->
                        <div class="space-y-3 mb-4">
                            <div class="flex items-center justify-between">
                                <div class="flex items-center gap-2">
                                    <div class="w-4 h-1 bg-yellow-400 rounded"></div>
                                    <span class="text-sm text-gray-700">Jalan 1 Arah</span>
                                </div>
                                <label class="relative inline-flex items-center cursor-pointer">
                                    <input type="checkbox" id="toggle-oneway" class="sr-only peer" checked>
                                    <div class="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-yellow-400"></div>
                                </label>
                            </div>
                            
                            <div class="flex items-center justify-between">
                                <div class="flex items-center gap-2">
                                    <div class="w-4 h-1 bg-blue-500 rounded"></div>
                                    <span class="text-sm text-gray-700">Jalan Umum</span>
                                </div>
                                <label class="relative inline-flex items-center cursor-pointer">
                                    <input type="checkbox" id="toggle-twoway" class="sr-only peer" checked>
                                    <div class="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-500"></div>
                                </label>
                            </div>
                        </div>
                        
                        <!-- Quick Actions -->
                        <div class="flex gap-2">
                            <button id="show-all" class="flex-1 px-3 py-2 bg-green-500 hover:bg-green-600 text-white text-xs rounded-md transition-colors duration-200 font-medium">
                                Tampilkan Semua
                            </button>
                            <button id="hide-all" class="flex-1 px-3 py-2 bg-red-500 hover:bg-red-600 text-white text-xs rounded-md transition-colors duration-200 font-medium">
                                Sembunyikan Semua
                            </button>
                        </div>
                    </div>
                `;

                // Tambahkan legenda setelah map initialized
                setTimeout(() => {
                    // Cari parent container atau body sebagai fallback
                    const targetContainer = mapContainer.parentElement || document.body;
                    
                    // Hapus legenda lama jika ada
                    const existingLegend = document.getElementById('map-legend');
                    if (existingLegend) {
                        existingLegend.remove();
                    }
                    
                    // Tambahkan legenda baru
                    targetContainer.insertAdjacentHTML('beforeend', legendHTML);
                    
                    // Re-attach event listeners setelah legenda ditambahkan
                    attachLegendEvents();
                }, 500);

                // Fungsi untuk attach event listeners
                function attachLegendEvents() {
                    // Event listeners untuk kontrol
                    const toggleOneway = document.getElementById('toggle-oneway');
                    const toggleTwoway = document.getElementById('toggle-twoway');
                    const showAllBtn = document.getElementById('show-all');
                    const hideAllBtn = document.getElementById('hide-all');

                    if (toggleOneway) {
                        toggleOneway.addEventListener('change', function() {
                            toggleLayer('oneWay', this.checked);
                        });
                    }

                    if (toggleTwoway) {
                        toggleTwoway.addEventListener('change', function() {
                            toggleLayer('twoWay', this.checked);
                        });
                    }

                    if (showAllBtn) {
                        showAllBtn.addEventListener('click', function() {
                            if (toggleOneway) toggleOneway.checked = true;
                            if (toggleTwoway) toggleTwoway.checked = true;
                            toggleLayer('oneWay', true);
                            toggleLayer('twoWay', true);
                        });
                    }

                    if (hideAllBtn) {
                        hideAllBtn.addEventListener('click', function() {
                            if (toggleOneway) toggleOneway.checked = false;
                            if (toggleTwoway) toggleTwoway.checked = false;
                            toggleLayer('oneWay', false);
                            toggleLayer('twoWay', false);
                        });
                    }
                }

                // Tambahkan layer kedua: JalanJogjaGeo.geojson (Jalan 2 Arah)
                fetch("./assets/JS/geojson/Geo-JalanJogja.geojson")
                    .then(res => res.json())
                    .then(data => {
                        twoWayLayer = L.geoJSON(data, {
                            onEachFeature,
                            renderer: L.canvas(),
                            style: {
                                color: "#3498db", // Biru
                                weight: 3,
                                opacity: 0.6,
                            },
                        });
                        twoWayLayer.addTo(map);
                    })
                    .catch(err => {
                        console.error("Gagal memuat Geo-JalanJogja.geojson:", err);
                    });

                // Tambahkan layer pertama: OneWayGeo.geojson (Jalan 1 Arah)
                fetch("./assets/JS/geojson/OneWayGeo.geojson")
                    .then(res => res.json())
                    .then(data => {
                        oneWayLayer = L.geoJSON(data, {
                            onEachFeature,
                            renderer: L.canvas(),
                            style: {
                                color: "#f1c40f", // Kuning
                                weight: 5,
                                opacity: 0.5,
                            },
                        });
                        oneWayLayer.addTo(map);
                    })
                    .catch(err => {
                        console.error("Gagal memuat OneWayGeo.geojson:", err);
                    });

                // Paksa redraw ukuran
                requestAnimationFrame(() => {
                    map.invalidateSize();
                });
            }
        }, 100);

        // Fungsi untuk menampilkan marker di peta
        function showMarkerOnMap(latitude, longitude, namaJalan, alamat, arah, kondisi, keterangan) {
            // Hapus marker sebelumnya jika ada
            if (currentMarker) {
                map.removeLayer(currentMarker);
            }

            // Buat marker baru
            currentMarker = L.marker([latitude, longitude]).addTo(map);
            
            // Buat popup content
            const popupContent = `
                <div class="p-2">
                    <h3 class="font-bold text-lg text-gray-800 mb-2">${namaJalan}</h3>
                    <div class="space-y-1 text-sm">
                        <p><strong>Alamat:</strong> ${alamat}</p>
                        <p><strong>Arah:</strong> ${arah}</p>
                        <p><strong>Kondisi:</strong> <span class="px-2 py-1 rounded text-xs ${kondisi === 'Baik' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}">${kondisi}</span></p>
                        <p><strong>Keterangan:</strong> ${keterangan}</p>
                        <p class="text-gray-500 mt-2">Lat: ${latitude}, Lng: ${longitude}</p>
                    </div>
                </div>
            `;
            
            currentMarker.bindPopup(popupContent).openPopup();
            
            // Zoom ke lokasi marker
            map.setView([latitude, longitude], 16);
        }

        // Fungsi untuk memuat dan menampilkan data jalan
        function loadStreetData() {
            fetch('http://localhost/sig/app/model/controller.php')
                .then(response => response.json())
                .then(data => {
                    // Simpan data ke cache untuk pencarian
                    streetDataCache = data || [];
                    
                    // Tunggu hingga streetList tersedia sebelum menampilkan data
                    waitForElement('streetList', () => {
                        displayStreetList(streetDataCache);
                    });
                })
                .catch(error => {
                    console.error('Error loading street data:', error);
                    // Tunggu hingga streetList tersedia untuk menampilkan error
                    waitForElement('streetList', () => {
                        const streetList = document.getElementById('streetList');
                        if (streetList) {
                            streetList.innerHTML = '<div class="p-4 text-center text-red-500">Error memuat data jalan</div>';
                        }
                    });
                });
        }

        // Fungsi untuk menampilkan daftar jalan
        function displayStreetList(data) {
            const streetList = document.getElementById('streetList');
            
            if (!streetList) {
                console.error('Element dengan ID streetList tidak ditemukan');
                // Coba lagi setelah delay
                setTimeout(() => displayStreetList(data), 200);
                return;
            }
            
            if (data && data.length > 0) {
                let html = '';
                
                data.forEach(street => {
                    html += `
                        <div class="street-item p-4 hover:cursor-pointer hover:bg-gray-50 transition-colors duration-200" 
                             onclick="showMarkerOnMap(${street.latitude}, ${street.longitude}, '${street.nama_jalan}', '${street.alamat}', '${street.arah}', '${street.kondisi}', '${street.keterangan}')">
                            <div class="flex justify-between items-center">
                                <div>
                                    <h3 class="text-lg font-medium text-gray-800">
                                        ${street.nama_jalan}
                                    </h3>
                                    <p class="text-sm text-gray-600">${street.alamat}</p>
                                    <div class="flex gap-2 mt-1">
                                        <span class="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded">${street.arah}</span>
                                        <span class="text-xs px-2 py-1 ${street.kondisi === 'Baik' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'} rounded">${street.kondisi}</span>
                                    </div>
                                </div>
                                <div class="text-blue-600">
                                    <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    `;
                });
                
                streetList.innerHTML = html;
                console.log('Street list displayed with', data.length, 'items');
            } else {
                streetList.innerHTML = '<div class="p-4 text-center text-gray-500">Tidak ada data jalan ditemukan</div>';
                console.log('No street data to display');
            }
        }

        // Fungsi untuk melakukan pencarian
        function searchStreets(searchTerm) {
            if (!searchTerm.trim()) {
                // Jika pencarian kosong, tampilkan semua data
                displayStreetList(streetDataCache);
                return;
            }

            // Filter data berdasarkan nama jalan, alamat, arah, kondisi, dan keterangan
            const filteredData = streetDataCache.filter(street => {
                const searchLower = searchTerm.toLowerCase();
                return (
                    street.nama_jalan.toLowerCase().includes(searchLower) ||
                    street.alamat.toLowerCase().includes(searchLower) ||
                    street.arah.toLowerCase().includes(searchLower) ||
                    street.kondisi.toLowerCase().includes(searchLower) ||
                    street.keterangan.toLowerCase().includes(searchLower)
                );
            });

            displayStreetList(filteredData);
        }

        // Fungsi untuk menangani input pencarian dengan debounce
        function handleSearchInput() {
            const searchInput = document.getElementById('searchInput');
            
            if (!searchInput) {
                // Jika elemen belum ada, coba lagi setelah delay
                setTimeout(handleSearchInput, 500);
                return;
            }

            let searchTimeout;
            
            searchInput.addEventListener('input', function() {
                const searchTerm = this.value;
                
                // Clear timeout sebelumnya untuk debounce
                clearTimeout(searchTimeout);
                
                // Set timeout baru untuk mengurangi frequency pencarian
                searchTimeout = setTimeout(() => {
                    searchStreets(searchTerm);
                }, 300); // Tunggu 300ms setelah user berhenti mengetik
            });

            // Handle pencarian saat Enter ditekan
            searchInput.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    clearTimeout(searchTimeout);
                    searchStreets(this.value);
                }
            });

            console.log('Search input initialized successfully');
        }

        // Fungsi untuk menunggu elemen dengan polling
        function waitForElement(elementId, callback, maxAttempts = 50) {
            let attempts = 0;
            
            const checkElement = () => {
                const element = document.getElementById(elementId);
                if (element) {
                    callback();
                    return;
                }
                
                attempts++;
                if (attempts < maxAttempts) {
                    setTimeout(checkElement, 200);
                } else {
                    console.error(`Element dengan ID ${elementId} tidak ditemukan setelah ${maxAttempts} percobaan`);
                }
            };
            
            checkElement();
        }

        // Load data saat halaman dimuat
        document.addEventListener('DOMContentLoaded', function() {
            loadStreetData();
            
            // Tunggu hingga searchInput tersedia
            waitForElement('searchInput', handleSearchInput);
        });