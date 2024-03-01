document.addEventListener("DOMContentLoaded", async () => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  if (tab) {
    try {
      const firstByteAsString = await fetchFirstByteAsString(tab.url);
      document.getElementById(
        "byteValue"
      ).textContent = `First byte: ${firstByteAsString}`;
    } catch (error) {
      document.getElementById(
        "byteValue"
      ).textContent = `Error: ${error.message}`;
      console.error("Fetch error:", error.message);
    }
  }
});

async function fetchFirstByteAsString(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const buffer = await response.arrayBuffer();
  const uint8Array = new Uint8Array(buffer);
  return uint8Array[0].toString(2).padStart(8, "0");
}
