const backBtn = document.querySelector(".back-btn");

<<<<<<< HEAD
function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else { 
      console.log("Geolocalização não é suportada por esse navegador");
    }
=======
function goBack() {
    window.history.back();
    console.log("back");
>>>>>>> 02054ed70df0647cea808e6a33c5af57da795e87
}

backBtn.addEventListener('click', goBack);