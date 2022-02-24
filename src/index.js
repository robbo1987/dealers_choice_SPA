const ul = document.querySelector("ul");
ul.addEventListener("click", async (ev) => {
  if (ev.target.tagName === "LI") {
    const id = ev.target.getAttribute("data-id");
    await axios.delete(`/api/guitarists/${id}`);
    init()
  }
});

const button = document.querySelector("button");
button.addEventListener("click", async(ev) => {
  if(ev.target.tagName === "BUTTON") {
    
  }
})

const select = document.querySelector("select");
const option = document.querySelector('option')

const init = async () => {
  const response = await axios.get("/api/guitarists");
  const guitarists = response.data;
  const html = guitarists
    .map((guitarist) => {
      return ` <li data-id='${guitarist.id}'>${guitarist.name} - ${guitarist.style}</li>`;
    })
    .join("");
  ul.innerHTML = html;
  console.log(guitarists)
  const options = guitarists.map(guitarist => {
    return `<select><option> ${guitarist.style} </option><select>`
  }).join('');
  console.log(options)
  select.innerHTML = options
};

init();
