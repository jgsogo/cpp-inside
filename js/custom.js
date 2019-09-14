

function footer_visibility(currentSlide, force_hide=false) {
    if (force_hide || currentSlide.classList.contains("my-title")) {
        $(".my-foot").hide();
        $(".my-header").hide();
    }
    else {
        $(".my-foot").show();
        $(".my-header").show();
    }
}