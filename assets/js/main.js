// bersihkan sebelum di unload
window.onbeforeunload = () => {
    for (const from of document.getElementsByTagName("form")) {
        from.reset();
    }
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
let currentText = "";
const element = document.getElementById("dynamic-text");

function typeWriter() {
    currentText = texts[currentIndex].substring(0, textIndex);
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
