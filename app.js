const http = require('http');
const url = require('url'); // To parse query parameters

// List of fortunes
const fortunes = [
  "You will have a great day!",
  "A big opportunity is coming your way.",
  "Happiness is just around the corner.",
  "Keep an eye out for something unexpected!",
  "Your hard work will soon pay off.",
  "A pleasant surprise awaits you.",
  "An old friend may reach out to you.",
  "Good news is on the horizon.",
];

// Create the server
const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname.replace(/\/+$/, ''); // Normalize trailing slashes

  // CSS for styling the page
  const commonCSS = `
    <style>
      body {
        font-family: 'Roboto', sans-serif;
        margin: 0;
        padding: 0;
        background-color: var(--bg-color, #f7f9fc);
        color: var(--text-color, #333);
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        height: 100vh;
        transition: background-color 0.5s, color 0.5s;
      }
      :root {
        --bg-color: #f7f9fc;
        --text-color: #333;
      }
      .dark-mode {
        --bg-color: #121212;
        --text-color: #f1f1f1;
      }
      h1 {
        color: #4a90e2;
        font-size: 2.5em;
        margin-bottom: 20px;
        animation: fadeIn 1s ease-in;
      }
      p, label {
        font-size: 1.2em;
      }
      input {
        padding: 10px;
        margin-top: 10px;
        font-size: 1em;
        border: 1px solid #ccc;
        border-radius: 5px;
        width: 80%;
        max-width: 300px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      }
      button {
        margin-top: 20px;
        padding: 10px 20px;
        font-size: 1em;
        background: #4a90e2;
        color: #fff;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        transition: background 0.3s;
      }
      button:hover {
        background: #357abd;
      }
      a {
        margin-top: 20px;
        text-decoration: none;
        font-size: 1em;
        color: #fff;
        background: #4a90e2;
        padding: 10px 20px;
        border-radius: 5px;
        display: inline-block;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        transition: background 0.3s;
      }
      a:hover {
        background: #357abd;
      }
      footer {
        margin-top: 50px;
        font-size: 0.9em;
        color: #888;
      }
      @keyframes fadeIn {
        from {
          opacity: 0;
        }
        to {
          opacity: 1;
        }
      }
    </style>
  `;

  const themeScript = `
    <script>
      const toggleTheme = () => {
        document.body.classList.toggle('dark-mode');
        localStorage.setItem('theme', document.body.classList.contains('dark-mode') ? 'dark' : 'light');
      };
      window.onload = () => {
        if (localStorage.getItem('theme') === 'dark') {
          document.body.classList.add('dark-mode');
        }
      };
    </script>
  `;

  if (pathname === '') {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(`
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Fortune Teller</title>
        ${commonCSS}
      </head>
      <body>
        <h1>Fortune Teller</h1>
        <form action="./fortune" method="GET">
          <label for="name">Enter your name:</label><br>
          <input type="text" id="name" name="name" required><br>
          <button type="submit">Get My Fortune</button>
        </form>
        <button onclick="toggleTheme()">Toggle Theme</button>
        ${themeScript}
        <footer>Fortune Teller © 2025</footer>
      </body>
      </html>
    `);
  }
  else if (pathname === '/fortune') {
    const name = parsedUrl.query.name; // Get the 'name' parameter

    if (name) {
      const randomFortune = fortunes[Math.floor(Math.random() * fortunes.length)];
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Your Fortune</title>
          ${commonCSS}
        </head>
        <body>
          <h1>Hello, ${name}!</h1>
          <p>Your fortune: <strong>${randomFortune}</strong></p>
          <a href="./">Get another fortune</a>
          ${themeScript}
        </body>
        </html>
      `);
    } else {
      res.writeHead(400, { 'Content-Type': 'text/html' });
      res.end(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Error</title>
          ${commonCSS}
        </head>
        <body>
          <h1>Error: Name is required!</h1>
          <a href="./">Go back</a>
        </body>
        </html>
      `);
    }
  }
});

const PORT = process.env.PORT || 8887;
server.listen(PORT, () => {
  console.log(`Fortune Teller Server running on port ${PORT}`);
});