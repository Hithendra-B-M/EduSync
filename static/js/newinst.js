document.addEventListener("DOMContentLoaded", function () {
    const progressBars = document.querySelectorAll(".header li");
    const formSections = document.querySelectorAll(".form_wrap .data_info");
    const btnNext = document.querySelectorAll(".btn_next");
    const btnBack = document.querySelectorAll(".btn_back");
    const btnDone = document.querySelector(".btn_done");
    const modalWrapper = document.querySelector(".modal_wrapper");
    const successWrap = document.querySelector(".success_wrap");

    let currentStep = 0;

    // Function to update the form step
    function updateFormStep(step) {
        formSections.forEach((section, index) => {
            section.style.display = index === step ? "block" : "none";
        });

        progressBars.forEach((bar, index) => {
            bar.classList.toggle("active", index === step);
        });
    }

    // Event listener for the "Next" button
    btnNext.forEach((button, index) => {
        button.addEventListener("click", function () {
            currentStep++;
            updateFormStep(currentStep);

            if (currentStep === formSections.length - 1) {
                btnDone.style.display = "block";
                button.style.display = "none";
            } else {
                btnDone.style.display = "none";
                btnBack[index].style.display = "inline-block";
            }
        });
    });

    // Event listener for the "Back" button
    btnBack.forEach((button, index) => {
        button.addEventListener("click", function () {
            currentStep--;
            updateFormStep(currentStep);

            btnDone.style.display = "none";
            btnNext[index].style.display = "inline-block";
        });
    });

    // Event listener for the "Done" button
    btnDone.addEventListener("click", function () {
        modalWrapper.style.display = "block";
    });

    // Close the modal on click outside
    modalWrapper.addEventListener("click", function () {
        modalWrapper.style.display = "none";
        successWrap.style.display = "none";
    });

    // Prevent modal from closing on click inside
    successWrap.addEventListener("click", function (event) {
        event.stopPropagation();
    });
});
