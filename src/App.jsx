
import React, { useState } from 'react';

function App() {
  const [resultado, setResultado] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const fileInput = document.getElementById('fileInput');
    const formData = new FormData();
    formData.append('file', fileInput.files[0]);

    const res = await fetch('https://facturas-backend.up.railway.app/analizar_factura', {
      method: 'POST',
      body: formData,
    });

    const data = await res.text();
    setResultado(data);
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Subir factura PDF</h2>
      <form onSubmit={handleSubmit}>
        <input type="file" id="fileInput" accept=".pdf" required />
        <button type="submit">Enviar</button>
      </form>
      <pre>{resultado}</pre>
    </div>
  );
}

export default App;
