const reify_css = (cycle_s) =>
    `html, body { height: 100%; margin: 0; }
    body {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        background: #101418;
        color: #e8e8e8;
        font-family: Arial, sans-serif;
        }
    p { font-size: 18px; margin-top: 28px; }
    .spinner { position: relative; width: 12px; height: 12px; margin: 40px; }
    .dot {
        position: absolute;
        width: 12px;
        height: 12px;
        border-radius: 50%;
        background: #4da3ff;
        animation: fade ${cycle_s}s linear infinite;
        }
    @keyframes fade { 0% { opacity: 1; } 100% { opacity: 0.1; } }`

const reify_payload = (dots, message) =>
    `<div class="spinner">${dots}</div>
    <p id="status">${message}</p>`

export const loading_page = (message, dots = '', cycle_s = 1.2) =>
    {
    const CSS = reify_css (cycle_s)
    const PAYLOAD = reify_payload (dots, message) 

    const content =

        `<!DOCTYPE html>
        <html>
        <head>
            <style>${CSS}</style>
        </head>
        <body>
            ${PAYLOAD}
        </body>
        </html>`

    return content
    }

const VIDEO_PAGE_CSS = 
    `body  { margin: 0; background: #000; }
    video { width: 100%; height: 100vh; }`

export const video_page = (url) => 
    `<!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <style>${VIDEO_PAGE_CSS}</style>
    </head>
    <body>
        <video src="${url}" controls autoplay></video>
    </body>
    </html>`
