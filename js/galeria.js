document.addEventListener("DOMContentLoaded", function () {
    const galleryImages = document.querySelectorAll(".gallery-image");
    const modal = new bootstrap.Modal(document.getElementById("imageModal"));
    const modalImage = document.getElementById("modalImage");

    // Abre o modal com a imagem selecionada
    galleryImages.forEach(image => {
        image.addEventListener("click", function () {
            modalImage.src = this.src; // Define a imagem no modal
            modal.show(); // Exibe o modal
        });
    });

    // Limpa a imagem do modal ao fechá-lo
    const modalElement = document.getElementById("imageModal");
    modalElement.addEventListener("hidden.bs.modal", function () {
        modalImage.src = ""; // Remove a imagem para liberar memória
    });
});
$(document).ready(function () {
    $(".gallery-link").colorbox({
        rel: 'gallery-link',
        maxWidth: '90%',
        maxHeight: '90%',
        scalePhotos: true,
        transition: "elastic",
        onComplete: function () {
            // Remove qualquer botão anterior, se existir
            $(".custom-close-btn").remove();

            // Adiciona o botão manualmente no contêiner do Colorbox
            $("#cboxContent").append(`
                <button class="custom-close-btn" onclick="$.colorbox.close()" 
                    style="position: absolute; top: 10px; right: 10px; background-color: #d9534f; color: white; font-size: 18px; border: none; padding: 10px 20px; border-radius: 5px; cursor: pointer; z-index: 9999;">
                    Fechar
                </button>
            `);
        },
        close: "Fechar"
    });
});




