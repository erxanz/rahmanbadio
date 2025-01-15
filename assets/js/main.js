document.addEventListener("DOMContentLoaded", () => {
    // Bersihkan form saat halaman di-reload
    window.addEventListener("beforeunload", () => {
        document.querySelectorAll("form").forEach((form) => form.reset());
    });

    // Fungsi toggle navigasi
    const navSlide = () => {
        const burger = document.querySelector(".burger");
        const navLists = document.querySelector("nav");

        if (burger && navLists) {
            burger.addEventListener("click", () => {
                navLists.classList.toggle("nav-active");
                burger.classList.toggle("toggle-burger");
            });
        } else {
            console.warn("Element burger atau nav tidak ditemukan.");
        }
    };

    navSlide();

    // Efek ketik dinamis
    const texts = ["Rahman Badio", "Junior Developer", "Hobby Ngoding"];
    let currentIndex = 0;
    let textIndex = 0;
    const element = document.getElementById("dynamic-text");

    const typeWriter = () => {
        if (!element) return;
        const currentText = texts[currentIndex].substring(0, textIndex);
        element.textContent = currentText;
        textIndex++;

        if (textIndex > texts[currentIndex].length) {
            setTimeout(() => {
                currentIndex = (currentIndex + 1) % texts.length;
                textIndex = 0;
                setTimeout(typeWriter, 500);
            }, 2000);
        } else {
            setTimeout(typeWriter, 150);
        }
    };

    typeWriter();

    // Fungsi drag & drop galeri
    const gallery = document.querySelector(".gallery");
    const galleryItems = document.querySelectorAll(".gallery-item");
    let draggedItem = null;

    if (galleryItems.length > 0) {
        galleryItems.forEach((item) => {
            item.addEventListener("dragstart", () => {
                draggedItem = item;
                setTimeout(() => item.classList.add("dragging"), 0);
            });

            item.addEventListener("dragend", () => {
                draggedItem = null;
                item.classList.remove("dragging");
            });

            item.addEventListener("dragover", (e) => e.preventDefault());
            item.addEventListener("dragenter", (e) => {
                e.preventDefault();
                item.classList.add("hovered");
            });

            item.addEventListener("dragleave", () =>
                item.classList.remove("hovered")
            );

            item.addEventListener("drop", (e) => {
                e.preventDefault();
                if (item !== draggedItem) {
                    const draggedIndex = Array.from(gallery.children).indexOf(
                        draggedItem
                    );
                    const targetIndex = Array.from(gallery.children).indexOf(item);
                    gallery.insertBefore(
                        draggedItem,
                        targetIndex > draggedIndex ? item.nextSibling : item
                    );
                }
                item.classList.remove("hovered");
            });
        });
    }

    // Validasi formulir kontak
    const form = document.getElementById("contactForm");

    const validateForm = () => {
        let isValid = true;

        // Validasi Nama
        const nameInput = document.getElementById("name");
        const nameValue = nameInput.value.trim();
        if (!/^[a-zA-Z\s]+$/.test(nameValue) || nameValue === "") {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Nama harus diisi dan hanya boleh berisi huruf dan spasi.",
            });
            nameInput.focus();
            isValid = false;
        }

        // Validasi Email
        const emailInput = document.getElementById("email");
        const emailValue = emailInput.value.trim();
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue)) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Format email tidak valid.",
            });
            emailInput.focus();
            isValid = false;
        }

        // Validasi Pesan
        const messageInput = document.getElementById("message");
        if (messageInput.value.trim() === "") {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Pesan tidak boleh kosong.",
            });
            messageInput.focus();
            isValid = false;
        }

        return isValid;
    };

    if (form) {
        form.addEventListener("submit", (event) => {
            if (!validateForm()) {
                event.preventDefault(); // Mencegah pengiriman form jika tidak valid
            } else {
                Swal.fire({
                    icon: "success",
                    title: "Berhasil!",
                    text: "Pesan Anda telah terkirim!",
                }).then(() => {
                    form.reset(); // Reset form setelah sukses
                });
            }
        });
    }
});

document.addEventListener('keydown', function (event) {
    // Nonaktifkan Ctrl + Shift + I, Ctrl + Shift + J, F12
    if ((event.ctrlKey && event.shiftKey && (event.key === 'I' || event.key === 'J')) || event.key === 'F12') {
        event.preventDefault();
        Swal.fire({
            title: "Becanda Bang hacker!",
            text: "Jangan hack saya ya! 😁",
            icon: "warning",
            confirmButtonText: "Kembali Bang",
        });
    }

    // Nonaktifkan Ctrl + U untuk View Page Source
    if (event.ctrlKey && event.key === 'u') {
        event.preventDefault();
        Swal.fire({
            title: "Becanda Bang hacker!",
            text: "Jangan hack saya ya! 😁",
            icon: "warning",
            confirmButtonText: "Kembali Bang",
        });
    }
});

// // Menonaktifkan klik kanan di seluruh halaman
// document.addEventListener('contextmenu', function (event) {
//     event.preventDefault();
// });

// let devToolsOpen = false;
// const originalWidth = window.innerWidth;
// const originalHeight = window.innerHeight;

// window.addEventListener("resize", () => {
//     const widthDiff = Math.abs(window.innerWidth - originalWidth);
//     const heightDiff = Math.abs(window.innerHeight - originalHeight);

//     // Ambang batas perubahan ukuran (sesuaikan sesuai kebutuhan)
//     const threshold = 160; // Nilai ini bisa berbeda di browser dan sistem operasi yang berbeda

//     if (widthDiff > threshold || heightDiff > threshold) {
//         if (!devToolsOpen) {
//             console.log("Developer Tools kemungkinan dibuka.");
//             devToolsOpen = true;

//             // Tampilkan SweetAlert dan beri peringatan
//             Swal.fire({
//                 title: "Developer Tools Ditemukan!",
//                 text: "Bang Udah Bang Jangan Hack Lagi! 😁",
//                 icon: "warning",
//                 confirmButtonText: "Oke",
//             }).then(() => {
//                 // Setelah pengguna mengklik "Oke", arahkan ke Google.com
//                 window.location.href = "https://www.google.com"; // Arahkan ke Google setelah peringatan
//             });
//         }
//     } else if (devToolsOpen) {
//         console.log("Developer Tools kemungkinan ditutup.");
//         devToolsOpen = false;
//     }
// });
