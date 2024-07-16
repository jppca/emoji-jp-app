import React from "react";

export function Card({ index,emoji }) {

  // Function to generate emoji.
  const generateEmoji = (unicode) => {
    // Regular expression to search for HTML Unicode entities.
    const regex = /&#(\d+);/g;

    // Function to convert Htmlcode to emoji.
    const convertHtmlToEmoji = (unicode) => {
      const emojis = [];
      let match;
      while ((match = regex.exec(unicode)) !== null) {
        const codePoint = match[1];
        emojis.push(String.fromCodePoint(parseInt(codePoint, 10)));
      }
      return emojis.join('');
    };
    const emojiCombined = convertHtmlToEmoji(unicode);

    return { __html: emojiCombined };
  };

  const emojiConvert = generateEmoji(emoji.htmlCode);

  // Funtion click copy.
  const handleCopyClick = (spanId) => {

    const emojiSpan = document.getElementById(spanId);

    if (emojiSpan) {
      // Get the text (emoji) inside the span.
      const emojiToCopy = emojiSpan.textContent;
      // Copy emoji to clipboard using the Clipboard API.
      navigator.clipboard.writeText(emojiToCopy)
        .then(() => {
          alert('¡Emoji copiado!');
        })
        .catch(err => {
          console.error('Error al intentar copiar el emoji:', err);
          alert('No se pudo copiar el emoji. Por favor, intente nuevamente.');
        });
    } else {
      console.error('No se encontró el span con el emoji dentro del div emoji-wrapper.');
    }
  };

  return (
    <div className="card-wrapper">
      <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 h-full">
        <div className="emoji-wrapper">
          <span id={`emoji-${index}`} style={{fontSize: '35px'}} dangerouslySetInnerHTML={emojiConvert} />
        </div>
        <button className="btn-card relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800" onClick={() => handleCopyClick(`emoji-${index}`)}>copiar</button>
        <div>
          <strong>Categoría:</strong>
          <p>{emoji.category}</p>
        </div>
        <div>
          <strong>Grupo:</strong>
          <p>{emoji.group}</p>
        </div>
      </div>
    </div>
  );
}
