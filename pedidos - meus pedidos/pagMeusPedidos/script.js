const backBtn = document.querySelector(".back-btn");

function goBack() {
    window.history.back();
}

backBtn.addEventListener("click", goBack);