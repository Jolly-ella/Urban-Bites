
function setActiveLink() {
    const currentPage = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('.nav-link');
  
    navLinks.forEach(link => {
      if (link.getAttribute('href') === currentPage) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }
  
  document.addEventListener('DOMContentLoaded', setActiveLink);
  