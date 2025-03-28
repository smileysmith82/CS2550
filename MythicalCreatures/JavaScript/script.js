function showSection(sectionId){
    const sections = document.querySelectorAll("main section");
    sections.forEach(section => section.classList.add("hidden"));
    document.getElementById(sectionId).classList.remove("hidden");

    document.querySelectorAll("nav ul li a").forEach(link => link.classList.remove("active"));
    document.querySelector(`nav ul li a[href="#${sectionId}"]`)?.classList.add("active");

    window.scrollTo({
        top:0,
        behavior: "smooth"
    });
}



document.getElementById("logo").addEventListener("click", function(){
    showSection("home");
})