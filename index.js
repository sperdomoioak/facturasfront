
const backendUrl = "https://facturas-backend-production.up.railway.app/analizar_factura";

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("upload-form");
  const result = document.getElementById("result");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const fileInput = document.getElementById("pdf-file");
    const file = fileInput.files[0];

    if (!file) {
      alert("Por favor selecciona un archivo PDF.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    result.innerHTML = "Procesando...";

    try {
      const response = await fetch(backendUrl, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Error en la respuesta del servidor");
      }

      const data = await response.json();

      result.innerHTML = `
        <h2>Resultado de la Factura</h2>
        <p><strong>RUT:</strong> ${data.rut}</p>
        <p><strong>Razón Social:</strong> ${data.razon_social}</p>
        <p><strong>Folio:</strong> ${data.folio}</p>
        <p><strong>Monto Total:</strong> ${data.monto_total}</p>
        <h3>Detalle:</h3>
        <ul>
          ${data.detalles.map(item => `<li>${item}</li>`).join("")}
        </ul>
      `;
    } catch (error) {
      console.error("Error:", error);
      result.innerHTML = "Ocurrió un error al procesar el archivo.";
    }
  });
});
