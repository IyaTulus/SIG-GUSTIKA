async function includeHTML(id, file) {
  const el = document.getElementById(id);
  try {
    const res = await fetch(file);
    const html = await res.text();
    el.innerHTML = html;
  } catch (err) {
    el.innerHTML = "<p>Gagal memuat file.</p>";
    console.error(`Gagal load ${file}`, err);
  }
}

// Fungsi untuk cek status login
function isLoggedIn() {
  const loginStatus = localStorage.getItem("loginStatus");
  return loginStatus === "true";
}

// Fungsi untuk login (contoh implementasi)
function login(username, password) {
  console.log("TESSS" + username + password);

  fetch("http://localhost/sig/app/model/authController.php")
    .then((response) => response.json())
    .then((data) => {
      const user = data.find(
        (u) => u.username === username && u.password === password
      );

      if (user) {
        // ✅ Login berhasil
        localStorage.setItem("loginStatus", "true");
        localStorage.setItem("userId", user.id);
        localStorage.setItem("username", user.username);
        alert("Login berhasil!");

        // Redirect ke halaman admin setelah login berhasil
        window.location.hash = "#admin";
      } else {
        // ❌ Login gagal
        alert("Username atau password salah");
      }
    })
    .catch((error) => {
      console.error("Gagal fetch data:", error);
      alert("Terjadi kesalahan saat menghubungi server");
    });
}

// Fungsi untuk logout
function logout() {
  localStorage.removeItem("loginStatus");
  localStorage.removeItem("userId"); // Tambahkan ini untuk membersihkan userId juga
  localStorage.removeItem("username");
  window.location.hash = "#home";
}

// Routing
const routes = {
  "": "../src/views/home.html",
  "#home": "../src/views/home.html",
  "#map": "../src/views/halamanPeta.html",
  "#about": "../src/views/about.html",
  "#admin": "../src/views/admin/dashboard.html",
  "#login": "../src/views/admin/login.html",
};

// Fungsi untuk load konten berdasarkan hash
async function loadPage() {
  const hash = window.location.hash;
  console.log(hash);

  // Cek jika mengakses halaman admin
  if (hash === "#admin") {
    if (!isLoggedIn()) {
      // Jika belum login, redirect ke halaman login
      console.log("Akses ditolak: Belum login");
      window.location.hash = "#login";
      return;
    }
  }

  const page = routes[hash] || "../src/views/home.html"; // Default ke home
  await includeHTML("main-content", page);

  // Jika perlu reload untuk halaman tertentu, bisa ditambahkan kondisi khusus
  setTimeout(() => {
    window.location.reload();
  }, 100);
}

// Inisialisasi halaman
window.addEventListener("DOMContentLoaded", async () => {
  const hash = window.location.hash;

  // Cek jika mengakses halaman admin pada load awal
  if (hash === "#admin" && !isLoggedIn()) {
    window.location.hash = "#login";
    return;
  }

  if (hash === "#admin" && isLoggedIn()) {
    // JANGAN ubah hash, biarkan tetap #admin
    const page = routes[hash];
    await includeHTML("main-content", page);
    return;
  }

  if (hash === "#login" && !isLoggedIn()) {
    // JANGAN ubah hash, biarkan tetap #admin
    const page = routes[hash];
    await includeHTML("main-content", page);
    return;
  }

  if (hash != "#admin" || hash != "#login") {
    await includeHTML("header-placeholder", "../src/components/header.html");
    await includeHTML("footer-placeholder", "../src/components/footer.html");
    const page = routes[hash] || "../src/views/home.html";
    await includeHTML("main-content", page);
  }
});

// Event listener untuk perubahan hash (navigasi)
window.addEventListener("hashchange", loadPage);

// Fungsi helper yang bisa dipanggil dari halaman lain
window.authHelper = {
  login: login,
  logout: logout,
  isLoggedIn: isLoggedIn,
};

// Fungsi untuk memuat data dari API
async function loadData() {
  const tableBody = document.getElementById("data-table-body");
  const loadingMessage = document.getElementById("loading-message");

  try {
    // Tampilkan loading
    if (loadingMessage) {
      loadingMessage.textContent = "Memuat data...";
    }

    // Fetch data dari API
    const response = await fetch(
      "http://localhost/sig/app/model/controller.php"
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log("Data dari API:", data); // Debug log

    // Kosongkan tbody
    tableBody.innerHTML = "";

    // Cek apakah data ada
    if (!data || data.length === 0) {
      tableBody.innerHTML = `
        <tr>
          <td colspan="9" class="border border-gray-400 px-4 py-2 text-center text-gray-500">
            Tidak ada data tersedia
          </td>
        </tr>
      `;
      return;
    }

    // Loop melalui data dan buat baris tabel
    data.forEach((item, index) => {
      const row = document.createElement("tr");
      row.className = "hover:bg-gray-50";

      row.innerHTML = `
        <td class="border border-gray-400 px-4 py-2 text-center">${
          index + 1
        }</td>
        <td class="border border-gray-400 px-4 py-2">${
          item.nama_jalan || "-"
        }</td>
        <td class="border border-gray-400 px-4 py-2">${
          item.latitude || item.lat || "-"
        }</td>
        <td class="border border-gray-400 px-4 py-2">${
          item.longitude || item.lng || item.lon || "-"
        }</td>
        <td class="border border-gray-400 px-4 py-2">${item.alamat || "-"}</td>
        <td class="border border-gray-400 px-4 py-2">${item.arah || "-"}</td>
        <td class="border border-gray-400 px-4 py-2">${item.kondisi || "-"}</td>
        <td class="border border-gray-400 px-4 py-2">${
          item.keterangan || "-"
        }</td>
        <td class="border border-gray-400 px-4 py-2 text-center">
          <button onclick="editData(${
            item.id || index
          })" class="bg-yellow-500 hover:bg-yellow-600 text-white px-2 py-1 rounded text-sm mr-1">
            Edit
          </button>
          <button onclick="deleteData(${
            item.id || index
          })" class="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded text-sm">
            Hapus
          </button>
        </td>
      `;

      tableBody.appendChild(row);
    });

    console.log("Data berhasil dimuat:", data.length, "items");
  } catch (error) {
    console.error("Error saat memuat data:", error);
    tableBody.innerHTML = `
      <tr>
        <td colspan="9" class="border border-gray-400 px-4 py-2 text-center text-red-500">
          Gagal memuat data: ${error.message}
        </td>
      </tr>
    `;
  }
}

// Fungsi untuk edit data
function editData(id) {
  alert(`Edit data dengan ID: ${id}`);
  // Implementasi edit sesuai kebutuhan Anda
}

// Fungsi untuk hapus data
function deleteData(id) {
  if (confirm("Apakah Anda yakin ingin menghapus data ini?")) {
    // Implementasi delete sesuai kebutuhan Anda
    console.log(`Delete data dengan ID: ${id}`);
    // Setelah berhasil delete, reload data
    loadData();
  }
}

// Fungsi create
function create(nama_, latitude, longitude, alamat, arah, kondisi, keterangan) {
  if (!nama_ || !latitude || !longitude || !alamat || !arah || !kondisi) {
    alert("Semua field wajib diisi.");
    return;
  }

  // Kirim data ke API
  fetch("http://localhost/sig/app/model/controller.php?tambahJalan", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      nama_jalan: nama_,
      latitude: latitude,
      longitude: longitude,
      alamat: alamat,
      arah: arah,
      kondisi: kondisi,
      keterangan: keterangan,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      alert(data.message || "Data berhasil disimpan!");
      closeForm(); // kalau ada fungsi closeForm()
    })
    .catch((err) => {
      console.error(err);
      alert("Gagal menyimpan data!");
    });
}

// Fungsi logout menggunakan authHelper dari main.js
function logout() {
  if (window.authHelper && window.authHelper.logout) {
    window.authHelper.logout();
  } else {
    // Fallback manual
    localStorage.removeItem("loginStatus");
    localStorage.removeItem("userId");
    localStorage.removeItem("username");
    window.location.hash = "#home";
  }
}

// Auto load data saat halaman dimuat
setTimeout(() => {
  loadData();
}, 500); //
