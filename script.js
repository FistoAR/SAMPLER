// Section 1
const itemsHeight1 = document.querySelector(".container1__right").clientHeight;
const items1 = gsap.utils.toArray(".container1__item");



gsap.to(".container1__right", {
  y: -itemsHeight1 + 400,
  ease: "none",
  scrollTrigger: {
    id: "mpScroll",
    trigger: ".container1",
    start: "top top",
    end: () => "+=" + (itemsHeight1 - 300),
    scrub: 1,
    pin: true,
    pinSpacing: true,
    // snap: {
    //   snapTo: 1 / (items1.length - 1),
    //   duration: 0.2,
    //   delay: 0,
    // },
  },
});

items1.forEach((item) => {
  gsap.from(item, {
    scrollTrigger: {
      trigger: item,
      start: "top 50%",
      end: "bottom 50%",
      toggleClass: "active",
    },
  });
});

// Section 2
const itemsHeight2 = document.querySelector(".container2__inner").clientHeight;
const items2 = gsap.utils.toArray(".container2__item");

gsap.to(".container2__inner", {
  y: -itemsHeight2 + 400,
  ease: "none",
  scrollTrigger: {
    id: "optScroll",
    trigger: ".container2",
    start: "top top",
    end: () => "+=" + (itemsHeight2 - 300),
    scrub: 1,
    pin: true,
    pinSpacing: true,
    // snap: {
    //   snapTo: 1 / (items2.length - 1),
    //   duration: 0.2,
    //   delay: 0,
    // },
  },
});

items2.forEach((item) => {
  gsap.from(item, {
    scrollTrigger: {
      trigger: item,
      start: "top 50%",
      end: "bottom 50%",
      toggleClass: "active",
    },
  });
});

const buttons = document.querySelectorAll(".faq-button");
const image = document.getElementById("faq-image");

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    // Update image
    const imgSrc = button.getAttribute("data-image");
    image.src = imgSrc;

    // Remove 'active' class from all buttons
    buttons.forEach((btn) => btn.classList.remove("active"));

    // Add 'active' to clicked button
    button.classList.add("active");
  });
});

// faq section
class RapEngFAQManager {
  constructor() {
    this.faqItems = document.querySelectorAll(".rapeng-faq-item");
    this.initializeEventListeners();
  }

  initializeEventListeners() {
    this.faqItems.forEach((item) => {
      const header = item.querySelector(".rapeng-faq-header");
      header.addEventListener("click", () => this.toggleFAQItem(item));
    });
  }

  toggleFAQItem(clickedItem) {
    const isExpanded = clickedItem.classList.contains("rapeng-expanded");

    if (isExpanded) {
      this.collapseFAQItem(clickedItem);
    } else {
      // Close other items in the same panel
      const parentPanel = clickedItem.closest(
        ".rapeng-left-panel, .rapeng-right-panel"
      );
      const siblingItems = parentPanel.querySelectorAll(".rapeng-faq-item");

      siblingItems.forEach((item) => {
        if (item !== clickedItem) {
          this.collapseFAQItem(item);
        }
      });

      this.expandFAQItem(clickedItem);
    }
  }

  expandFAQItem(item) {
    item.classList.add("rapeng-expanded");
    const answerContainer = item.querySelector(".rapeng-answer-container");
    const answerContent = item.querySelector(".rapeng-answer-content");

    // Calculate the height needed
    const contentHeight = answerContent.scrollHeight;
    answerContainer.style.maxHeight = `${contentHeight + 24}px`; // Add padding
  }

  collapseFAQItem(item) {
    item.classList.remove("rapeng-expanded");
    const answerContainer = item.querySelector(".rapeng-answer-container");
    answerContainer.style.maxHeight = "0px";
  }
}

// Initialize the FAQ manager when the page loads
document.addEventListener("DOMContentLoaded", () => {
  new RapEngFAQManager();
});

// Add some interactive hover effects
document.addEventListener("DOMContentLoaded", () => {
  const faqHeaders = document.querySelectorAll(".rapeng-faq-header");

  faqHeaders.forEach((header) => {
    header.addEventListener("mouseenter", function () {
      this.style.transform = "translateX(4px)";
    });

    header.addEventListener("mouseleave", function () {
      this.style.transform = "translateX(0)";
    });
  });
});


document.addEventListener("DOMContentLoaded", ()=>{
  document.getElementById("globalPreloader").style.display = 'none';
});

document.addEventListener("DOMContentLoaded", () => {
  const dropdown = document.getElementById("dropdown");
  const pageInput = document.getElementById("pageInput");
  const pageTotal = document.getElementById("pageTotal");

  const sectionMap = {
    home: document.querySelector(".home-section"),
    introduction: document.querySelector(".intro-section"),
    mp_applications: document.querySelector(".container1__item:nth-child(2)"),
    mp_dimensions: document.querySelector(".container1__item:nth-child(3)"),
    mp_animation: document.querySelector(".container1__item:nth-child(4)"),
    opt_applications: document.querySelector(".container2__item:nth-child(1)"),
    opt_dimensions: document.querySelector(".container2__item:nth-child(2)"),
    opt_animation: document.querySelector(".container2__item:nth-child(3)"),
    modelview: document.querySelector(".model-view"),
    faq: document.querySelector(".rapeng-container"),
  };

  const sectionKeys = Object.keys(sectionMap);
  const totalPages = sectionKeys.length;
  pageTotal.textContent = `/ ${totalPages}`;
  pageInput.value = 1;

  // Helper: stop all audios
  function stopAllAudio() {
    document.querySelectorAll("audio").forEach((a) => {
      a.pause();
      a.currentTime = 0;
    });
  }

  let lastPlayedAudioKey = null;

  // Play audio for a section if available
  function playAudioForSection(key) {
    if (key == lastPlayedAudioKey) return;
    stopAllAudio();
    const audio = document.getElementById("audio-" + key);
    if (audio) {
      audio.play().catch(() => {});
      lastPlayedAudioKey = key;
    }
  }

  // Scroll to section
  // function scrollToSection(key) {
  //   const section = sectionMap[key];
  //   if (section) {
  //     section.scrollIntoView({ behavior: "smooth", block: "start" });
  //   }
  // }

function scrollToSection(key) {
  const section = sectionMap[key];
  if (!section) return;

  const container1 = document.querySelector(".container1__right");
  const container2 = document.querySelector(".container2__inner");

  const container1Items = Array.from(document.querySelectorAll(".container1__item"));
  const container2Items = Array.from(document.querySelectorAll(".container2__item"));

  const isInContainer1 = container1Items.includes(section);
  const isInContainer2 = container2Items.includes(section);

  if (isInContainer1) {
    const scrollTrigger = ScrollTrigger.getById("mpScroll");
    if (!scrollTrigger) return;

    // Get the item's offset within the scrollable container
    const targetOffsetY = section.offsetTop * 1.25;

    // Calculate total scrollable distance inside the ScrollTrigger
    const totalScroll = scrollTrigger.end - scrollTrigger.start;

    // Get the target scroll progress based on offsetTop relative to total height
    const progress = targetOffsetY / container1.scrollHeight;

    // Map that progress to an actual scroll position
    const scrollY = scrollTrigger.start + progress * totalScroll;

    window.scrollTo({ top: scrollY, behavior: "smooth" });
  } else if (isInContainer2) {
    const scrollTrigger = ScrollTrigger.getById("optScroll");
    if (!scrollTrigger) return;

    const targetOffsetY = section.offsetTop * 1.4;
    const totalScroll = scrollTrigger.end - scrollTrigger.start;

    const progress = targetOffsetY / container2.scrollHeight;
    const scrollY = scrollTrigger.start + progress * totalScroll;

    window.scrollTo({ top: scrollY, behavior: "smooth" });
  } else {
    // Not inside pinned scroll area
    section.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}


  // Dropdown change → scroll + play audio
  dropdown.addEventListener("change", (e) => {
    const key = e.target.value;
    scrollToSection(key);
    playAudioForSection(key);
    const pageIndex = sectionKeys.indexOf(key) + 1;
    pageInput.value = pageIndex;
  });

  document.addEventListener("keydown", (e) => {
  const currentKey = dropdown.value;
  const currentIndex = sectionKeys.indexOf(currentKey);

  if (e.key === "ArrowDown") {
    e.preventDefault();
    const nextIndex = currentIndex + 1;
    if (nextIndex < sectionKeys.length) {
      const nextKey = sectionKeys[nextIndex];
      dropdown.value = nextKey;
      pageInput.value = nextIndex + 1;
      scrollToSection(nextKey);
      playAudioForSection(nextKey);
    }
  } else if (e.key === "ArrowUp") {
    e.preventDefault();
    const prevIndex = currentIndex - 1;
    if (prevIndex >= 0) {
      const prevKey = sectionKeys[prevIndex];
      dropdown.value = prevKey;
      pageInput.value = prevIndex + 1;
      scrollToSection(prevKey);
      playAudioForSection(prevKey);
    }
  }
});


  // Page input navigation
  pageInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      const pageNum = parseInt(pageInput.value, 10);
      if (pageNum >= 1 && pageNum <= totalPages) {
        const key = sectionKeys[pageNum - 1];
        dropdown.value = key;
        scrollToSection(key);
        playAudioForSection(key);
      } else {
        pageInput.value = 1;
      }
    }
  });

  // Sync on scroll
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const key = Object.keys(sectionMap).find(
            (k) => sectionMap[k] === entry.target
          );
          if (key) {
            dropdown.value = key;
            playAudioForSection(key);
            const pageIndex = sectionKeys.indexOf(key) + 1;
            pageInput.value = pageIndex;
          }
        }
      });
    },
    { threshold: 0.5 }
  );

  Object.values(sectionMap).forEach((section) => {
    if (section) observer.observe(section);
  });
});

