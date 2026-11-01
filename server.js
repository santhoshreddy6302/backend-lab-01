const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;

// Enable pretty-printed JSON output
app.set('json spaces', 2);

// Prevent browser caching so responses are always fresh
app.use((req, res, next) => {
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
    next();
});

// Request logging middleware
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});

// GET / - Home route
app.get('/', (req, res) => {
    res.status(200).send('Welcome to the Backend Development Fundamentals Lab 1 Server!');
});

// GET /about - Student details
app.get('/about', (req, res) => {
    const studentInfo = {
        name: 'Santhosh B Reddy',
        registrationNumber: '252U1R5016',
        section: 'Aurora - CSE-AIDE'
    };

    // If opened directly in browser, send as HTML so it renders cleanly
    if (req.headers.accept && req.headers.accept.includes('text/html') && !req.query.json) {
        res.setHeader('Content-Type', 'text/html; charset=utf-8');
        return res.status(200).send(`<pre style="word-wrap: break-word; white-space: pre-wrap; font-family: Consolas, monospace; font-size: 16px; margin: 20px;">${JSON.stringify(studentInfo, null, 2)}</pre>`);
    }

    res.status(200).json(studentInfo);
});

// GET /time - Current date and time
app.get('/time', (req, res) => {
    const timeInfo = {
        currentTime: new Date()
    };

    // If opened directly in browser, send as HTML so it renders cleanly
    if (req.headers.accept && req.headers.accept.includes('text/html') && !req.query.json) {
        res.setHeader('Content-Type', 'text/html; charset=utf-8');
        return res.status(200).send(`<pre style="word-wrap: break-word; white-space: pre-wrap; font-family: Consolas, monospace; font-size: 16px; margin: 20px;">${JSON.stringify(timeInfo, null, 2)}</pre>`);
    }

    res.status(200).json(timeInfo);
});

// Handle unknown routes - 404
app.use((req, res) => {
    res.status(404).json({
        error: 'Not Found',
        message: 'This route does not exist.'
    });
});

// Start Express server
if (require.main === module) {
    app.listen(PORT, '0.0.0.0', () => {
        console.log(`Express server running on http://localhost:${PORT}`);
    });
}

module.exports = app;
