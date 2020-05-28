const backBtn = document.querySelector(".back-btn");

function goBack() {
    window.history.back();
    console.log("back");
}

backBtn.addEventListener('click', goBack);