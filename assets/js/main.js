document.addEventListener("DOMContentLoaded", () => {
    // Bersihkan form sebelum di unload
    window.onbeforeunload = () => {
        document.querySelectorAll("form").forEach((form) => form.reset());
    };

    // Toggle Burger
    const navSlide = () => {
        const burger = document.querySelector(".burger");
        const navLists = document.querySelector("nav");

        burger.addEventListener("click", () => {
            navLists.classList.toggle("nav-active");
            burger.classList.toggle("toggle-burger");
        });
    };

    // Panggil fungsi navSlide untuk mengaktifkan event listener
    navSlide();

    const texts = ["Rahman Badio", "Junior Developer", "Hobby Ngoding"];
    let currentIndex = 0;
    let textIndex = 0;
    const element = document.getElementById("dynamic-text");

    function typeWriter() {
        const currentText = texts[currentIndex].substring(0, textIndex);
        element.textContent = currentText;
        textIndex++;

        if (textIndex > texts[currentIndex].length) {
            // Setelah selesai menulis, tunggu 2 detik sebelum melanjutkan ke teks berikutnya
            setTimeout(() => {
                currentIndex = (currentIndex + 1) % texts.length;
                textIndex = 0;
                setTimeout(typeWriter, 500); // Jeda sebelum mulai menulis lagi
            }, 2000); // Jeda 2 detik setelah menulis selesai
        } else {
            setTimeout(typeWriter, 150); // Kecepatan mengetik
        }
    }

    typeWriter(); // Mulai animasi penulisan
});

const form = document.getElementById("contactForm");

form.addEventListener("submit", function (event) {
    let isValid = true;

    // Validasi Nama (hanya huruf dan spasi)
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

    // Validasi Pesan (tidak boleh kosong)
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

    if (!isValid) {
        event.preventDefault(); // Mencegah pengiriman form jika tidak valid
    } else {
        Swal.fire({
            icon: "success",
            title: "Berhasil!",
            text: "Pesan Anda telah terkirim!",
        });
        form.reset(); // Reset form setelah sukses
    }
});