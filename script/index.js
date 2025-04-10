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
  fetch("/components/navbar.html")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok " + response.statusText);
      }
      return response.text();
    })
    .then((data) => {
      document.getElementById("navbar").innerHTML = data;
    })
    .catch((error) => {
      console.error("There was a problem with the fetch operation:", error);
    });
}

function loadConsultationForm() {
  fetch("/components/consultation-form.html")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok " + response.statusText);
      }
      return response.text();
    })
    .then((data) => {
      document.getElementById("consultation-form").innerHTML = data;
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
  setActiveNavbar();
});

// Initialize AOS
AOS.init({
  duration: 1000,
  once: true,
  offset: 100,
  easing: "ease-in-out",
});
