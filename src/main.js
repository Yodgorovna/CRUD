let card = document.getElementById("card");

const render = (data) => {
  card.innerHTML = data
    .map(
      (item) => `
      <div class="group relative">
        <div class="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
          <img src="${item.url}" alt="Front of men&#039;s Basic Tee in black." class="h-full w-full object-cover object-center lg:h-full lg:w-full">
        </div>
        <div class="mt-4 flex justify-between">
          <div>
            <h3 class="text-sm text-gray-700">
              <a href="#">
                <span aria-hidden="true" class="absolute inset-0"></span>
                ${item.title}
              </a>
              </h3>
              </div>
              <button class = 'edit'>edit</button>
              <button data-deleteId="${item.id}">delete</button>
          </div>
          </div>
  `
    )
    .join("");
};

const getData = async () => {
  const res = await fetch("http://localhost:3600/photos", { method: "GET" });
  const data = await res.json();
  render(data);
};

getData();

card.addEventListener("click", (e) => {
  if (e.target.dataset.deleteId) {
    fetch(`http://localhost:3600/photos/${e.target.dataset.deleteId}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then(() => {
        getData();
      });
  }
});
