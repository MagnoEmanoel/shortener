const urlInput = document.getElementById("url-input");
const encurtarBtn = document.getElementById("encurtar-btn");
const resultado = document.getElementById("resultado");

encurtarBtn.addEventListener("click", async () => {
  const url = urlInput.value;

  try {
    const response = await fetch(`https://api.shrtco.de/v2/shorten?url=${url}`);
    const data = await response.json();

    if (data.ok) {
      resultado.innerHTML = `
        <div class="input-container">
          <label for="url-output"></label>
          <input type="text" id="url-output" value="${data.result.full_short_link}" readonly>
          <button id="copiar-btn" onclick="copyToClipboard('${data.result.full_short_link}')">Copiar</button>
        </div>
      `;    
      resultado.style.display = "block";
    } else {
      resultado.innerHTML = "Ocorreu um erro ao encurtar o URL.";
      resultado.style.display = "block";
    }
  } catch (error) {
    resultado.innerHTML = "Ocorreu um erro ao encurtar o URL.";
    resultado.style.display = "block";
  }
});

function copyToClipboard(text) {
  const textarea = document.createElement('textarea');
  textarea.value = text;
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand('copy');
  textarea.remove();
  alert("Link copiado para a área de transferência!");
}
