const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { exec } = require('child_process');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 3000;

// Define the directory where MP3 files will be saved
const DOWNLOAD_DIR = path.join(__dirname, '..', 'downloads');

if (!fs.existsSync(DOWNLOAD_DIR)) {
  fs.mkdirSync(DOWNLOAD_DIR);
}

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '..', 'public')));
app.use('/downloads', express.static(DOWNLOAD_DIR));

// Route: Convert YouTube to MP3
app.post('/api/download', (req, res) => {
  const { url, filename } = req.body;

  if (!url || (!url.includes('youtube.com') && !url.includes('youtu.be'))) {
    return res.status(400).json({ error: 'Invalid YouTube URL' });
  }

  // Use custom filename if provided, otherwise use the YouTube video title
  const ytDlpOutputTemplate = filename
    ? path.join(DOWNLOAD_DIR, filename.replace(/[<>:"/\\|?*]+/g, '_')) + '.%(ext)s'
    : path.join(DOWNLOAD_DIR, '%(title)s.%(ext)s');

  const command = `yt-dlp -x --audio-format mp3 --audio-quality 0 -o "${ytDlpOutputTemplate}" "${url}"`;

  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error('Download error:', stderr);
      return res.status(500).json({ error: 'Failed to download video' });
    }

    // Find the most recently modified MP3 file
    const files = fs.readdirSync(DOWNLOAD_DIR)
      .filter(file => file.endsWith('.mp3'))
      .map(file => ({
        name: file,
        time: fs.statSync(path.join(DOWNLOAD_DIR, file)).mtime.getTime()
      }))
      .sort((a, b) => b.time - a.time);

    if (files.length === 0) {
      return res.status(500).json({ error: 'MP3 file not found' });
    }

    const latestFile = files[0].name;
    const fileUrl = `/downloads/${latestFile}`;
    return res.json({ success: true, file: fileUrl });
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
