const backBtn = document.querySelector(".back-btn");

//backBtn.addEventListener('click', goBack);

function goBack() {
    window.history.back();
    console.log("back");
}