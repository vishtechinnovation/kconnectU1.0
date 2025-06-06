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

function validateSignupForm() {
    const inputs = document.querySelectorAll("#signupModal input");
    const maliciousPattern =
        /(<|>|script|onerror|onload|alert|SELECT|INSERT|DELETE|DROP|;)/i;

    for (const input of inputs) {
        if (maliciousPattern.test(input.value)) {
            alert(
                "Invalid input detected. Please avoid using special characters or code."
            );
            return false;
        }
    }

    alert(
        "Thank you for signing up! Please check your email for confirmation."
    );
    return true;
}

// Submission Trigger
let submitted = false;

function openSignupModal() {
    document.getElementById("signupModal").classList.remove("hidden");
    document.body.classList.add("overflow-hidden");
}

function closeSignupModal() {
    document.getElementById("signupModal").classList.add("hidden");
    document.body.classList.remove("overflow-hidden");
}

function closeModal(e) {
    if (e.target.id === "signupModal") {
        closeSignupModal();
    }
}

function validateSignupForm() {
    submitted = true;
    return true;
}

function formSubmitted() {
    const form = document.getElementById("earlySignupForm");
    const successMsg = document.getElementById("signupSuccessMessage");

    form.reset();

    // Show success message with fade-in
    successMsg.classList.remove("hidden");
    setTimeout(() => {
        successMsg.classList.add("opacity-100");
    }, 50);

    // Auto-hide and reload after 5s
    setTimeout(() => {
        successMsg.classList.remove("opacity-100");
        setTimeout(() => {
            successMsg.classList.add("hidden");
            location.reload(); // ✅ Reload after fade-out
        }, 700);
    }, 5000);

    submitted = false;
}

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

// reCAPTCHA
function onRecaptchaSubmit(token) {
    // Add the reCAPTCHA response to the form before submitting
    var recaptchaResponse = document.createElement("input");
    recaptchaResponse.setAttribute("type", "hidden");
    recaptchaResponse.setAttribute("name", "g-recaptcha-response");
    recaptchaResponse.setAttribute("value", token);
    document.getElementById("earlySignupForm").appendChild(recaptchaResponse);
}

// Handle Form Submission
function handleFormSubmit(event) {
    event.preventDefault();

    // Ensure that reCAPTCHA is checked before form submission
    var recaptchaResponse = document.getElementById(
        "g-recaptcha-response"
    ).value;
    if (!recaptchaResponse) {
        alert("Please verify that you are not a robot.");
        return false; // Prevent form submission if reCAPTCHA is not checked
    }

    // Get the form data
    var form = document.getElementById("earlySignupForm");
    var formData = new FormData(form);

    // Send the form data to Google Apps Script
    fetch(
        "https://script.google.com/macros/s/AKfycbxOELSjFwM7PzpDcp9GHnAiRvtLZq8KFGQhnh5nyGzo8qmA3ew2ItDEkdcAe2fVqt-mzA/exec",
        {
            method: "POST",
            body: formData,
        }
    )
        .then((response) => response.json())
        .then((data) => {
            // Handle success (email verification and other actions)
            alert(
                "Form submitted successfully! Please check your email to verify."
            );
        })
        .catch((error) => {
            alert("There was an error submitting the form. Please try again.");
            console.error(error);
        });

    return false; // Prevent traditional form submission
}

// Example for email verification - Simulate the email verification link.
const urlParams = new URLSearchParams(window.location.search);
const codeFromUrl = urlParams.get("code"); // Get code from URL

const storedCode = "w3ymfvsxwjs"; // Replace with actual stored code (e.g., from Google Sheets)

if (codeFromUrl) {
    document.getElementById("message").innerHTML = `
      <p class="text-center text-gray-600">Email verification link received. Please enter the code below to verify your email.</p>
      <div class="mb-4">
        <input type="text" id="verificationCode" placeholder="Enter your verification code" required
          class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-800">
      </div>
      <button onclick="verifyEmail()" class="w-full bg-blue-500 text-white py-2 rounded-md font-semibold hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
        Verify Email
      </button>
    `;
}

// Verify Email Logic
function verifyEmail() {
    const userCode = document.getElementById("verificationCode").value;
    if (userCode === storedCode) {
        document.getElementById(
            "message"
        ).innerHTML = `<div class="bg-green-500 text-white p-3 rounded-md text-center">Your email has been successfully verified!</div>`;
    } else {
        document.getElementById(
            "message"
        ).innerHTML = `<div class="bg-red-500 text-white p-3 rounded-md text-center">Invalid verification code. Please try again.</div>`;
    }
}
// New approach
// function handleFormSubmit() {
//     // Ensure that reCAPTCHA is checked before form submission
//     var recaptchaResponse = document.getElementById(
//         "g-recaptcha-response"
//     ).value;
//     if (!recaptchaResponse) {
//         alert("Please verify that you are not a robot.");
//         return false; // Prevent form submission if reCAPTCHA is not checked
//     }

//     // Get the form data
//     var form = document.getElementById("earlySignupForm");
//     var formData = new FormData(form);

//     // Send the form data to Google Apps Script
//     fetch(
//         "https://script.google.com/macros/s/AKfycbxOELSjFwM7PzpDcp9GHnAiRvtLZq8KFGQhnh5nyGzo8qmA3ew2ItDEkdcAe2fVqt-mzA/exec",
//         {
//             method: "POST",
//             body: formData,
//         }
//     )
//         .then((response) => response.json())
//         .then((data) => {
//             // Handle success (email verification and other actions)
//             alert(
//                 "Form submitted successfully! Please check your email to verify."
//             );
//             // Optionally, redirect to a success page
//         })
//         .catch((error) => {
//             alert("There was an error submitting the form. Please try again.");
//             console.error(error);
//         });

//     // Return false to prevent default form submission, since we are handling it via JavaScript
//     return false;
// }
