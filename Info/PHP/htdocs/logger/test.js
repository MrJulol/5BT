async function fetchHTML() {
  for (let i = 0; i < 10; i++) {
    try {
      const response = await fetch("http://localhost/logger/index.php");
      const html = await response.text();
      console.log(`Response ${i + 1}:`, html);
    } catch (error) {
      console.error(`Error fetching response ${i + 1}:`, error);
    }
  }
}

fetchHTML();
