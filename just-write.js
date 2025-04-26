document.addEventListener('keydown', function(event) {
  if (event.ctrlKey && event.key === 's') {
    event.preventDefault();

    let content = document.getElementById('text-area').value;
    let blob = new Blob([content], { type: 'text/plain' });
    let url = URL.createObjectURL(blob);

    let a = document.createElement('a');
    a.href = url;
    a.download = 'justwrite.txt';
    a.click();

    URL.revokeObjectURL(url);
  }
});
