function index() {
  document.addEventListener("DOMContentLoaded", function () {
    if (window.location.hash) {
      let element = document.querySelector(window.location.hash);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 1000); // Delay to ensure scrolling works correctly
      }
    }
  });

  const animateCounter = (counter) => {
    const target = parseInt(counter.getAttribute("data-target"));
    const count = parseInt(counter.innerText);
    const increment = target / 100;

    if (count < target) {
      counter.innerText = Math.ceil(count + increment);
      setTimeout(() => animateCounter(counter), 20);
    } else {
      counter.innerText = target;
    }
  };

  const observerOptions = {
    threshold: 0.5,
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const counters = entry.target.querySelectorAll(".counter");
        counters.forEach((counter) => animateCounter(counter));
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  const statsSection = document.querySelector(".stats-section");
  observer.observe(statsSection);
}

index();
function loadNavbar() {
  const navbarElement = document.getElementById("navbar");
  if (!navbarElement) {
    console.error("Navbar element not found in the DOM.");
    return;
  }

  fetch("../components/navbar.html")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok " + response.statusText);
      }
      return response.text();
    })
    .then((data) => {
      navbarElement.innerHTML = data;
    })
    .catch((error) => {
      console.error("There was a problem with the fetch operation:", error);
    });
}

function loadConsultationForm() {
  const consultationFormElement = document.getElementById("consultation-form");
  if (!consultationFormElement) {
    const consultationFormElement =
      document.getElementById("consultation-form");
    return;
  }

  fetch("/components/consultation-form.html")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok " + response.statusText);
      }
      return response.text();
    })
    .then((data) => {
      consultationFormElement.innerHTML = data;
    })
    .catch((error) => {
      console.error("There was a problem with the fetch operation:", error);
    });
}

function setActiveNavbar() {
  const currentPath = window.location.pathname; // Get the current page path
  const navLinks = document.querySelectorAll(".navbar-nav .nav-link"); // Select all nav links

  navLinks.forEach((link) => {
    // Remove 'active' class from all links
    link.classList.remove("active");

    // Add 'active' class to the link that matches the current path
    if (link.getAttribute("href") === currentPath) {
      link.classList.add("active");

      // If the link is inside a dropdown, add 'active' to the parent dropdown
      const parentDropdown = link.closest(".dropdown");
      if (parentDropdown) {
        const dropdownToggle = parentDropdown.querySelector(".dropdown-toggle");
        if (dropdownToggle) {
          dropdownToggle.classList.add("active");
        }
      }
    }
  });
}

// Call the function after the DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
  loadNavbar();
  loadConsultationForm();
  // setActiveNavbar();
});

// Initialize AOS
AOS.init({
  duration: 1000,
  once: true,
  offset: 100,
  easing: "ease-in-out",
});

// Add the new functionality
$(document).ready(function () {
  const serviceCategory = $("#select-1");
  const secondaryDropdowns = {
    one: $("#prarambh-services"),
    two: $("#suraksha-services"),
    three: $("#satyapit-services"),
    four: $("#sampatti-services"),
    five: $("#unnati-services"),
    six: $("#prasar-services"),
  };

  function updateServiceDropdowns(selectedCategoryValue) {
    // Hide all dropdowns
    $.each(secondaryDropdowns, function (key, dropdown) {
      dropdown.hide();
    });

    // Show the selected dropdown
    if (selectedCategoryValue && secondaryDropdowns[selectedCategoryValue]) {
      secondaryDropdowns[selectedCategoryValue].show();
    }
  }

  serviceCategory.on("change", function () {
    updateServiceDropdowns(this.value);
  });

  // Initialize dropdown visibility
  updateServiceDropdowns(serviceCategory.val());

  // --- Magnific Popup Logic ---
  setTimeout(function () {
    // Check if popup is already open (good practice)
    if (!$.magnificPopup.instance.isOpen) {
      $.magnificPopup.open({
        items: {
          src: "#popup-form-container",
          type: "inline",
        },
        // Basic Magnific Popup options
        showCloseBtn: true, // Use Magnific Popup's button, styled by our CSS
        closeOnContentClick: false,
        closeOnBgClick: true, // Allow closing by clicking overlay
        enableEscapeKey: true,

        callbacks: {
          close: function () {
            console.log("Popup closed.");
          },
        },
      });
    }
  }, 5000); // 5 seconds delay
});

document.addEventListener("DOMContentLoaded", function () {
  const reachServiceCategory = document.getElementById("select-reach");
  const reachSecondaryDropdowns = {
    one: document.getElementById("prarambh-services-reach"),
    two: document.getElementById("suraksha-services-reach"),
    three: document.getElementById("satyapit-services-reach"),
    four: document.getElementById("sampatti-services-reach"),
    five: document.getElementById("unnati-services-reach"),
    six: document.getElementById("prasar-services-reach"),
  };

  function updateReachServiceDropdowns(selectedCategoryValue) {
    // Hide all dropdowns
    Object.values(reachSecondaryDropdowns).forEach((dropdown) => {
      if (dropdown) dropdown.style.display = "none";
    });

    // Show the selected dropdown
    if (
      selectedCategoryValue &&
      reachSecondaryDropdowns[selectedCategoryValue]
    ) {
      reachSecondaryDropdowns[selectedCategoryValue].style.display = "block";
    }
  }

  reachServiceCategory.addEventListener("change", function () {
    updateReachServiceDropdowns(this.value);
  });

  // Initialize dropdown visibility
  updateReachServiceDropdowns(reachServiceCategory.value);
});
