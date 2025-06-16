# YouTube to MP3 Converter

A simple and user-friendly tool to download YouTube videos and convert them into high-quality MP3 audio files.  
Built with a Node.js backend using `yt-dlp` and `ffmpeg` for downloading and audio extraction, plus a clean frontend interface.

---

## Features

- Download YouTube videos as MP3 files (320 kbps)
- Uses original video title as default filename
- Supports optional custom filenames
- Responsive modern frontend with loading animations
- Easy setup and usage

---

## Prerequisites & Installation

Before running the project, install these tools:

### 1. Install Node.js

Download and install Node.js (v14+) from:  
https://nodejs.org/

---

### 2. Install yt-dlp

**yt-dlp** handles video downloading and audio extraction.

- **Windows:**  
  Download `yt-dlp.exe` from https://github.com/yt-dlp/yt-dlp/releases/latest  
  Place it somewhere in your system PATH (e.g., `C:\Windows\System32`)

- **macOS (using Homebrew):**  
  
  brew install yt-dlp
Linux:
sudo curl -L https://github.com/yt-dlp/yt-dlp/releases/latest/download/yt-dlp -o /usr/local/bin/yt-dlp
sudo chmod a+rx /usr/local/bin/yt-dlp

Verify installation by running:
yt-dlp --version
3. Install ffmpeg
ffmpeg is used to convert video to MP3.

Windows:
Download from https://ffmpeg.org/download.html
Follow the Windows build instructions and add ffmpeg to your PATH.

macOS (using Homebrew):
brew install ffmpeg
Linux (Debian/Ubuntu):
sudo apt update
sudo apt install ffmpeg
Verify installation by running:
ffmpeg -version

Setup & Run
Clone the repository:
git clone https://github.com/yourusername/youtube-to-mp3.git
cd youtube-to-mp3

Install project dependencies:
npm install
Start the server:
npm start
Open your browser at http://localhost:3000
Enter a YouTube URL, optionally specify a filename, and click Download.

Usage
Enter a valid YouTube video URL.

Optionally add a custom filename.

Wait for the conversion; a download link will appear when ready.

MP3 files are saved on the server in /downloads.

Ensure yt-dlp and ffmpeg are installed and accessible via PATH.

Intended for personal and educational use.

Consider adding rate limiting if exposing the server publicly.


Acknowledgements
yt-dlp — Video downloading & processing

ffmpeg — Audio extraction & conversion

Feel free to open issues or contribute! Happy downloading! 🎵

If you want, I can also help you generate a `.gitignore` or add deployment instructions next!








