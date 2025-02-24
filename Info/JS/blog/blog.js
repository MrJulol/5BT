const blogContainer = document.getElementById("blog-container");
const postBlogButton = document.getElementById("post-blog");
const removeAlternateButton = document.getElementById("remove-alternate");
const textArea = document.getElementById("blog-text");

window.addEventListener("load", () => {
  (JSON.parse(localStorage.getItem("blogEntries")) || []).forEach((entry) => {
    addBlogEntry(entry.text, entry.color);
  });
});

postBlogButton.addEventListener("click", () => {
  const blogText = document.getElementById("blog-text").value.trim();

  if (blogText === "") {
    alert("Bitte einen Blogeintrag schreiben!");
    return;
  }

  const blogEntry = addBlogEntry(blogText, getRandomColor());
  localStorage.setItem(
    "blogEntries",
    JSON.stringify(
      (JSON.parse(localStorage.getItem("blogEntries")) || []).push({
        text: blogText,
        color: blogEntry.querySelector("p").style.color,
      })
    )
  );
});

function addBlogEntry(text, color) {
  const blogEntry = document.createElement("div");
  blogEntry.className = "blog-entry";

  const blogContent = document.createElement("p");
  blogContent.textContent = text;
  blogContent.style.color = color;

  const controls = document.createElement("div");
  controls.className = "controls";

  const colorButton = document.createElement("button");
  colorButton.textContent = "Farbe ändern";
  colorButton.addEventListener("click", () => {
    blogContent.style.color = getRandomColor();
  });

  controls.appendChild(colorButton);
  blogEntry.appendChild(blogContent);
  blogEntry.appendChild(controls);

  blogContainer.prepend(blogEntry);

  document.getElementById("blog-text").value = "";

  return blogEntry;
}

function getRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

removeAlternateButton.addEventListener("click", () => {
  const entries1 = document.querySelectorAll(".blog-entry");
  if (entries1.length < 2) {
    entries1.forEach((entry) => {
      entry.remove();
    });
  } else {
    entries1.forEach((entry, index) => {
      if (index % 2 !== 0) {
        entry.remove();
      }
    });
  }

  localStorage.setItem(
    "blogEntries",
    JSON.stringify(
      Array.from(document.querySelectorAll(".blog-entry")).map((entry) => ({
        text: entry.querySelector("p").textContent,
        color: entry.querySelector("p").style.color,
      }))
    )
  );
});

textArea.addEventListener("keydown", (event) => {
  if (event.key == "Enter") document.getElementById("post-blog").click();
});
