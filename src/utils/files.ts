/**
 * Download a file by attaching a phantom link and clicking on it.
 *
 * @param data data of the file
 * @param filename name of the file
 */
export function download(data: string, filename: string) {
  const file = new Blob([data]);

  const a = document.createElement("a");
  const url = URL.createObjectURL(file);

  a.href = url;
  a.style.display = "none";
  a.download = filename;
  document.body.appendChild(a);
  a.click();

  setTimeout(function () {
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  }, 0);
}
