// Get the 'to top' button element by ID
var toTopButton = document.getElementById("to-top-button");

// Check if the button exists
if (toTopButton) {
    // On scroll event, toggle button visibility based on scroll position
    window.onscroll = function () {
        if (
            document.body.scrollTop > 500 ||
            document.documentElement.scrollTop > 500
        ) {
            toTopButton.classList.remove("hidden");
        } else {
            toTopButton.classList.add("hidden");
        }
    };

    // Function to scroll to the top of the page smoothly
    window.goToTop = function () {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };
}

// function validateSignupForm() {
//     const inputs = document.querySelectorAll("#signupModal input");
//     const maliciousPattern =
//         /(<|>|script|onerror|onload|alert|SELECT|INSERT|DELETE|DROP|;)/i;

//     for (const input of inputs) {
//         if (maliciousPattern.test(input.value)) {
//             alert(
//                 "Invalid input detected. Please avoid using special characters or code."
//             );
//             return false;
//         }
//     }

//     alert(
//         "Thank you for signing up! Please check your email for confirmation."
//     );
//     return true;
// }

// // Submission Trigger
// let submitted = false;

// function openSignupModal() {
//     document.getElementById("signupModal").classList.remove("hidden");
//     document.body.classList.add("overflow-hidden");
// }

// function closeSignupModal() {
//     document.getElementById("signupModal").classList.add("hidden");
//     document.body.classList.remove("overflow-hidden");
// }

// function closeModal(e) {
//     if (e.target.id === "signupModal") {
//         closeSignupModal();
//     }
// }

// function validateSignupForm() {
//     submitted = true;
//     return true;
// }

// function formSubmitted() {
//     const form = document.getElementById("earlySignupForm");
//     const successMsg = document.getElementById("signupSuccessMessage");

//     form.reset();

//     // Show success message with fade-in
//     successMsg.classList.remove("hidden");
//     setTimeout(() => {
//         successMsg.classList.add("opacity-100");
//     }, 50);

//     // Auto-hide and reload after 5s
//     setTimeout(() => {
//         successMsg.classList.remove("opacity-100");
//         setTimeout(() => {
//             successMsg.classList.add("hidden");
//             location.reload(); // ✅ Reload after fade-out
//         }, 700);
//     }, 5000);

//     submitted = false;
// }

// Team Component

function teamComponent() {
    return {
        teamMembers: [
            {
                name: "Agboola Shonekan",
                title: "CEO",
                role: "Civil Engineer",
                image: "img/Agboola Shonekan.png",
                socials: [
                    { icon: "fab fa-facebook-f", url: "#" },
                    { icon: "fab fa-instagram", url: "#" },
                    { icon: "fab fa-linkedin-in", url: "#" },
                ],
                bio: [
                    "Agboola Shonekan is a dynamic and results-driven construction and engineering professional with over 20 years of practical experience spanning site operations, project supervision, and executive leadership. He began his technical journey with a NABTEB A-Level certification in Brick/Block Laying and Concreting, earning him a Craftsman License (R.2936C) from the Council for the Regulation of Engineering in Nigeria (COREN). Over the years, he advanced from field-level roles to founding and managing multiple businesses, including FixItAll Handyman Multi Services Limited and KonnectU Solutions Limited.",
                    "Agboola holds a Bachelor’s Degree in Civil Engineering (Second Class Upper Division) from the University of Abuja, where he developed strong expertise in structural analysis, construction methodologies, and project management. His commitment to professional growth is reflected in his membership with the Nigerian Society of Engineers (NSE) and his designation as an Associate Member of the Ontario Association of Certified Engineering Technicians and Technologists (OACETT) in Canada.",
                    "As CEO of KonnectU Solutions Limited,  Agboola is focused on revolutionizing how clients connect with skilled professionals. He leverages his extensive engineering background and on-site experience to drive innovation, promote service excellence, and lead digital transformation in the service industry. His mission is to bridge the gap between clients and trusted experts—empowering artisans, consultants, and technicians through smart technology, practical systems, and a deep understanding of real-world challenges. His leadership fosters quality, reliability, and efficiency across every project.",
                ],
            },
            {
                name: "Abayomi Adeosun",
                title: "COO",
                role: "Project Manager",
                image: "img/Abayomi Adeosun 1.jpg",
                socials: [
                    { icon: "fab fa-facebook-f", url: "#" },
                    { icon: "fab fa-instagram", url: "#" },
                    { icon: "fab fa-linkedin-in", url: "#" },
                ],
                bio: [
                    "Abayomi Adeosun is a seasoned management consultant with over nine years of experience in public health research, project management, and operational logistics. As a proven leader, he has successfully spearheaded complex projects, optimizing resource allocation. With a Master’s in International Health from the University of Basel and a Bachelor of Pharmacy from Obafemi Awolowo University, Abayomi combines strategic insight with hands-on expertise in stakeholder engagement, budget management, and data-driven decision-making. His innovative approaches, demonstrate his ability to streamline logistics and deliver results in high-pressure environments. A Mandela Washington Fellow, Abayomi excels at leading diverse teams and building robust systems to drive organizational success.",
                ],
            },
            {
                name: "Isaac Adejuwon",
                title: "CTO",
                role: "DevOps Engineer",
                image: "img/Isaac.jpg",
                socials: [
                    { icon: "fab fa-facebook-f", url: "#" },
                    { icon: "fab fa-instagram", url: "#" },
                    { icon: "fab fa-linkedin-in", url: "#" },
                ],
                bio: [
                    "Isaac is an accomplished Cybersecurity Analyst and DevOps Engineer, leveraging a strong foundation as a Digitization Project Associate in the Energy Technology sector. Renowned for their ability to secure Operational Technology and cloud infrastructure, Isaac expertly identifies vulnerabilities and deploys innovative, resilient solutions. His technical prowess spans network security, configuration, testing, troubleshooting, technical documentation, incident management, and advanced DevOps methodologies.",
                    "With a mastery of security event monitoring and incident response within the M365 stack, Isaac  ensures robust protection and seamless application deployment in multitenant cloud architectures. A collaborative leader, they thrive in diverse, cross-functional teams, driving agile, high-performance service development while consistently meeting project deadlines with precision.",
                ],
            },
        ],
    };
}

// Handle form submission
document
    .getElementById("dynamicForm")
    .addEventListener("submit", function (event) {
        event.preventDefault();
        handleFormSubmit();
    });

// Submit form data to Apps Script
function handleFormSubmit() {
    let formData = new FormData(document.getElementById("dynamicForm"));
    formData.append("g-recaptcha-response", grecaptcha.getResponse()); // Add reCAPTCHA response

    fetch(
        "https://script.google.com/macros/s/AKfycbz36Zbagcia9HzOC_vn4xi_wA43lon6vmD6U7DrNzX1VgcTNcqaAZIKP2d6DUcBj9DmCg/exec",
        {
            method: "POST",
            body: formData,
        }
    )
        .then((response) => response.json())
        .then((data) => {
            if (data.success) {
                alert(
                    "Form submitted successfully! Please check your email for verification."
                );
            } else {
                alert("There was an error. Please try again.");
            }
        })
        .catch((error) => alert("Error: " + error));
}

// Show the verification modal on successful verification
function showVerificationModal(submittedDetails) {
    document.getElementById("submittedDetails").textContent = submittedDetails;
    document.getElementById("verificationModal").classList.remove("hidden");
}

// Close the verification modal and reload the page
document.getElementById("closeModal").addEventListener("click", function () {
    window.location.reload(); // Reload the homepage after verification
});

// Check the URL for a token and show the verification modal
window.onload = function () {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");

    if (token) {
        // Fetch the token data from your backend here to verify and display the details
        // For example, you could make a request to your Apps Script to check if the token is valid
        fetch(
            `https://script.google.com/macros/s/AKfycbz36Zbagcia9HzOC_vn4xi_wA43lon6vmD6U7DrNzX1VgcTNcqaAZIKP2d6DUcBj9DmCg/exec?token=${token}`
        )
            .then((response) => response.json())
            .then((data) => {
                if (data.success) {
                    // If verification is successful, show the modal and the submitted details
                    showVerificationModal(data.submittedDetails);
                } else {
                    alert("Invalid or expired token.");
                }
            })
            .catch((error) => console.error("Error verifying token:", error));
    }
};
