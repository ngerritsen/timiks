export function downloadAsFile(filename, data, type) {
  const blob = new Blob([data], { type });
  const a = document.createElement('a');

  a.style.display = 'none';
  a.href = URL.createObjectURL(blob);
  a.download = filename;

  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);

  setTimeout(() => URL.revokeObjectURL(a.href), 1500);
}
