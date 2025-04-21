let accessapikey = "w_nzc01Nea6WDhgwuCtKf2BEJYD-eKb6RGbyP8KtCQE";

let inputElement = document.querySelector(".inputdiv");
let inputText = document.getElementById("myVariable");
let imageContainer = document.querySelector(".search-image");
let showmoreButton = document.getElementById("btn1");

let inputData = "";
let page = 1;

async function searchImages() {
    inputData = inputText.value.trim();
    if (!inputData) return; 
    
    let url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessapikey}`;

    try {
        let res = await fetch(url);
        let data = await res.json();
        let results = data.results;

        if (page === 1) {
            imageContainer.innerHTML = "";
        }

        results.forEach((result) => {
            let imageWrapper = document.createElement('div');
            imageWrapper.classList.add("imageResult");
            
            let image = document.createElement('img');
            image.src = result.urls.small; 
            image.alt = result.alt_description || "Unsplash image";
            
            let imagelink = document.createElement('a');
            imagelink.href = result.links.html;
            imagelink.target = "_blank";
            imagelink.textContent = result.alt_description || "View on Unsplash";

            imageWrapper.appendChild(image);
            imageWrapper.appendChild(imagelink);
            imageContainer.appendChild(imageWrapper);
        });

        page++;
        if (results.length > 0) {
            showmoreButton.style.display = "block";
        }
    } catch (error) {
        console.error("Error fetching images:", error);
    }
}

inputElement.addEventListener("submit", (event) => {
    event.preventDefault();
    page = 1;
    searchImages();
});

showmoreButton.addEventListener("click", searchImages);