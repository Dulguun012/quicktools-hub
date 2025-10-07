const fileInput = document.getElementById("bgInput");
const output = document.getElementById("output");
const btn = document.getElementById("removeBtn");

btn.addEventListener("click", async () => {
  const file = fileInput.files[0];
  if (!file) return alert("Please upload an image first.");

  const formData = new FormData();
  formData.append("image_file", file);

  const res = await fetch("https://api.remove.bg/v1.0/removebg", {
    method: "POST",
    headers: { "X-Api-Key": "1gKnJsyfdHZcB4LuzquMHJGr" },
    body: formData,
  });

  if (!res.ok) {
    alert("Failed to remove background.");
    return;
  }

  const blob = await res.blob();
  output.src = URL.createObjectURL(blob);
});
