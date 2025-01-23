const accessKey = "ih3uVIrdQ_gsqd08Amf555pPJho7wsoS22hKHX_XRZ8"

const searchForm = document.getElementById("search-form")
const searchBox = document.getElementById("search-box")
const searchRes = document.getElementById("search-result")
const ShowMoreBTn = document.getElementById("show-more-btn")
var icon = document.getElementById("icon")

icon.onclick = ()=>{
    document.body.classList.toggle("dark-mode")
    if(document.body.classList.contains("dark-mode")){
        icon.src = "theme/sun.png"
    }else{
        icon.src = "theme/moon.png"
    }
}


let keyword = ""
let page = 1

async function searchImage(){
    keyword = searchBox.value
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&client_id=${accessKey}&per_page=12`
    const response = await fetch(url)
    const data = await response.json()
    console.log(data)

    const results = data.results

    if(page===1){
        searchRes.innerHTML = ""
    }

    results.map((result)=>{
        const image = document.createElement("img")
        image.src =  result.urls.small
        
        const imageLink = document.createElement("a")
        
        imageLink.href = image.src
        imageLink.target = "_blank";

        imageLink.appendChild(image)
        searchRes.appendChild(imageLink)
    })
    ShowMoreBTn.style.display = "block"

}

searchForm.addEventListener("submit", (e)=>{
    e.preventDefault()
    page=1
    searchImage()
})

ShowMoreBTn.addEventListener("click", ()=>{
    page++
    searchImage()
})
