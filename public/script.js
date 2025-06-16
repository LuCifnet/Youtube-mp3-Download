document.getElementById('convertForm').addEventListener('submit', async function(e) {
  e.preventDefault();

  const url = document.getElementById('urlInput').value.trim();
  const filename = document.getElementById('filenameInput').value.trim();

  if (!url) {
    alert("Please enter a YouTube URL.");
    return;
  }

  const loading = document.getElementById('loading');
  const result = document.getElementById('result');
  const message = document.getElementById('message');
  const downloadLink = document.getElementById('downloadLink');

  // Reset
  loading.classList.remove('hidden');
  result.classList.add('hidden');
  message.textContent = "";
  downloadLink.href = "#";

  try {
    const response = await fetch('/api/download', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url, filename })
    });

    const data = await response.json();

    loading.classList.add('hidden');

    if (data.success) {
      result.classList.remove('hidden');
      message.textContent = "✅ MP3 file is ready!";
      downloadLink.href = data.file;
      downloadLink.setAttribute("download", "");
    } else {
      result.classList.remove('hidden');
      message.textContent = "❌ " + (data.error || "Something went wrong");
    }

  } catch (err) {
    loading.classList.add('hidden');
    result.classList.remove('hidden');
    message.textContent = "❌ Server error. Try again.";
  }
});
