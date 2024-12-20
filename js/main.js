document.addEventListener("DOMContentLoaded", function () {
    const pageId = document.body.id;

    if (pageId === "login-page") {
        // Página de login
        const loginForm = document.getElementById("loginForm");
        const passwordInput = document.getElementById("passInput");

        if (loginForm && passwordInput) {
            loginForm.addEventListener("submit", async function (e) {
                e.preventDefault();
                const pass = passwordInput.value;
                const backendUrl = "https://silasab.pythonanywhere.com/check_password";

                try {
                    const resp = await fetch(backendUrl, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ pass: pass })
                    });

                    const data = await resp.json();

                    if (data.status === "ok") {
                        localStorage.setItem("logged_in", "true");
                        window.location.href = "index.html";
                    } else {
                        alert("Senha incorreta! Tente novamente.");
                    }
                } catch (error) {
                    console.error("Erro ao verificar a senha:", error);
                    alert("Erro ao se conectar ao servidor.");
                }
            });
        } else {
            console.error("Erro: Elementos do login não encontrados.");
        }
    } else {
        // Validação de sessão para outras páginas
        if (!sessCheck()) {
            window.location.href = "login.html";
        } else if (pageId === "home-page") {
            setupSearch();
            configureCardLinks();
        }
    }

    // Ativação do modal para itens
    const modal = document.getElementById("imageModal");
    const modalImage = document.getElementById("modalImage");
    const closeModal = document.querySelector(".close-modal");

    document.querySelectorAll(".slider-image").forEach(image => {
        image.addEventListener("click", function () {
            modal.style.display = "block";
            modalImage.src = this.src;
        });
    });

    if (closeModal) {
        closeModal.addEventListener("click", function () {
            modal.style.display = "none";
        });

        modal.addEventListener("click", function (e) {
            if (e.target === modal) {
                modal.style.display = "none";
            }
        });
    }
});

// Função para verificar se o usuário está logado
function sessCheck() {
    return localStorage.getItem("logged_in") === "true";
}

// Função para configurar a busca na página inicial
function setupSearch() {
    const searchInput = document.getElementById("searchInput");
    if (!searchInput) return;

    searchInput.addEventListener("input", function () {
        const value = searchInput.value.toLowerCase();
        const cards = document.querySelectorAll(".card");

        cards.forEach(card => {
            const title = card.querySelector(".card-title").innerText.toLowerCase();
            if (title.includes(value)) {
                card.style.display = "";
            } else {
                card.style.display = "none";
            }
        });
    });
}

// Função para configurar links nos botões dos cards
function configureCardLinks() {
    const cards = document.querySelectorAll(".card");

    cards.forEach(card => {
        const button = card.querySelector(".btn-view");
        const pageLink = card.dataset.pageLink;

        if (button && pageLink) {
            button.addEventListener("click", function () {
                window.location.href = pageLink;
            });
        }
    });
}
