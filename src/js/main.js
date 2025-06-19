// Fungsi untuk load HTML ke dalam element dengan id tertentu
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

// Routing
const routes = {
  "": "../src/views/home.html",
  "#home": "../src/views/home.html",
  "#map": "../src/views/halamanPeta.html",
  "#about": "../src/views/about.html"
};

// Fungsi untuk load konten berdasarkan hash
async function loadPage() {
  const hash = window.location.hash;
  const page = routes[hash] || "../src/views/home.html"; // Default ke home
  await includeHTML("main-content", page);
}


// Inisialisasi halaman
window.addEventListener("DOMContentLoaded", async () => {
  await includeHTML("header-placeholder", "../src/components/header.html");
  await includeHTML("footer-placeholder", "../src/components/footer.html");
  loadPage();
});

window.addEventListener("hashchange", loadPage);
