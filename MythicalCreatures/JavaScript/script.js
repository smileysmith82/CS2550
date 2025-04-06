/*I added a page turn animation to the website so that if you go from left to right, the page turn starts from the right

I also added the dark mode toggle*/
let currentSection = "home";

function showSection(sectionId){
    const sectionOrder = ["home", "dragon", "griffin", "phoenix"];

    const currentIndex = sectionOrder.indexOf(currentSection);
    const targetIndex = sectionOrder.indexOf(sectionId)
    const direction = targetIndex > currentIndex ? "forward" : "backward";

    const sections = document.querySelectorAll("main section");

    sections.forEach(section => {
        section.classList.add("hidden");
        section.classList.remove("page-transition-forward", "page-transition-backward");
    });

    const target = document.getElementById(sectionId);
    target.classList.remove("hidden")

    void target.offsetWidth;

    if (direction == "forward"){
        target.classList.add("page-transition-forward");    
    }else{
        target.classList.add("page-transition-backward");
    }

    currentSection = sectionId;
    
    document.querySelectorAll("nav button").forEach(button => {
        if (button.textContent.toLowerCase() === sectionId.toLowerCase()) {
            button.classList.add("active");
        } else {
            button.classList.remove("active");
        }
    });

    window.scrollTo({
        top:0,
        behavior: "smooth"
    });
}

document.getElementById("logo").addEventListener("click", function(){
    showSection("home");
})

function toggleDarkMode(){
    document.body.classList.toggle("dark-mode");

    if (document.body.classList.contains("dark-mode")){
        localStorage.setItem("theme", "dark");
    }else{
        localStorage.setItem("theme", "light");
    }
}

window.onload = function () {
    if (localStorage.getItem("theme")=="dark"){
        document.body.classList.add("dark-mode");
    }

}