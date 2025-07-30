document.getElementById('convertForm').addEventListener('submit', async function (e) {
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

// Add some interactive animations
document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('convertForm');
  const loading = document.getElementById('loading');
  const result = document.getElementById('result');
  const convertBtn = document.getElementById('convertBtn');

  // Add input focus animations
  const inputs = document.querySelectorAll('input[type="text"]');
  inputs.forEach(input => {
    input.addEventListener('focus', function () {
      this.parentElement.style.transform = 'scale(1.02)';
    });

    input.addEventListener('blur', function () {
      this.parentElement.style.transform = 'scale(1)';
    });
  });

  // Form submission with animations
  form.addEventListener('submit', function (e) {
    e.preventDefault();

    // Hide result if visible
    result.classList.add('hidden');

    // Show loading with animation
    loading.classList.remove('hidden');
    convertBtn.disabled = true;
    convertBtn.innerHTML = '<span>Processing...</span>';

    // Simulate processing (replace with actual API call)
    setTimeout(() => {
      loading.classList.add('hidden');
      result.classList.remove('hidden');
      convertBtn.disabled = false;
      convertBtn.innerHTML = '<span>Convert & Download</span>';

      document.getElementById('message').textContent = 'Conversion completed successfully!';
      document.getElementById('downloadLink').href = '#'; // Replace with actual download link
    }, 3000);
  });

  // Add button click ripple effect
  convertBtn.addEventListener('click', function (e) {
    const ripple = document.createElement('span');
    const rect = this.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;

    ripple.style.cssText = `
          position: absolute;
          width: ${size}px;
          height: ${size}px;
          left: ${x}px;
          top: ${y}px;
          background: rgba(255, 255, 255, 0.5);
          border-radius: 50%;
          transform: scale(0);
          animation: ripple 0.6s linear;
          pointer-events: none;
        `;

    this.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
  });

  // Add CSS for ripple animation
  const style = document.createElement('style');
  style.textContent = `
        @keyframes ripple {
          to {
            transform: scale(4);
            opacity: 0;
          }
        }
      `;
  document.head.appendChild(style);
});