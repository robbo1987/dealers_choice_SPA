const ul = document.querySelector("ul");
const init = async () => {
  const response = await axios.get("/api/guitarists");
  const guitarists = response.data;
  const html = guitarists
    .map((guitarist) => {
      return ` <li>${guitarist.name} - ${guitarist.style}</li>`;
    })
    .join("");
  ul.innerHTML = html;
};
init();
