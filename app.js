const button = document.querySelector(".menuButton")
const list = document.querySelector(".navList")

button.addEventListener("click", ()=>{
    if(list.ariaExpanded === "false"){
        list.classList.remove("navClosed")
        list.setAttribute("aria-expanded", "true")
    } else if(list.ariaExpanded === "true"){
        list.classList.add("navClosed")
        list.setAttribute("aria-expanded", "false")
    }
})

// window.onload(()=>{
//     if(window.innerWidth > 1440){
//         list.setAttribute("aria-expanded", "true")
//     }
// })

window.addEventListener("resize", ()=>{
    if(window.innerWidth > 1440){
        list.setAttribute("aria-expanded", "true")
    }
})


let linkInput = document.querySelector("#linkInput")
const shortenButton = document.querySelector("#shortenButton")
const section = document.querySelector(".linksSection")
let elements = []





shortenButton.addEventListener("click", ()=>{
    if(linkInput.value){
        const url = "https://api.shrtco.de/v2/shorten?url="
        let toShortenUrl = url + linkInput.value
        console.log(toShortenUrl)
        fetch(toShortenUrl)
            .then(res => res.json())
            .then(data=>{
                const component = {
                    link: linkInput.value,
                    id: data.result.short_link,
                }
                elements.push(component)
                let part = document.createElement("div")
                part.setAttribute("class", "linkWrapper")
                part.innerHTML =` 
                <a class="oldLink" href="https://${component.link}">${component.link}</a>
                <div class="copyWrapper">
                  <button id="${component.id}" class="copyButton">Copy</button>
                  <div class="shortLinkWrapper">
                    <a class="shortLink" href="https://${component.id}">${component.id}</a>
                  </div>
                </div>`
                section.append(part)
                linkInput.value=""
            })
    }
})

document.addEventListener("mouseover", function(e){
    let target = e.target.closest(".copyButton"); 
    if(target){
        let targetId = target.id
        target.addEventListener("click", ()=>{
            elements.forEach(element => {
               if(targetId == element.id){
                let toCopy = element.id
                navigator.clipboard.writeText(toCopy)
                target.classList.add("copied")
                target.innerText = "Copied!"
               }
            })
      })
    }
})

