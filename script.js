// List of quotes for the home page
var quotes = [
  "Travel is the only thing you buy that makes you richer.",
  "Adventure is worthwhile.",
  "Collect memories, not things.",
  "Life is short, explore more.",
  "Go where you feel most alive."
];

// --- HELPER FUNCTIONS (Reusable code) ---

// Function to save data to the browser's memory (localStorage)
function saveToStorage(key, value) {
  var jsonString = JSON.stringify(value);
  localStorage.setItem(key, jsonString);
}

// Function to get data from the browser's memory
function getFromStorage(key) {
  var data = localStorage.getItem(key);
  if (data) {
    return JSON.parse(data);
  } else {
    return []; // Return empty list if nothing is found
  }
}

// Function to fill a dropdown (select) with travel destinations
function populateDestinations(selectId) {
  var selectElement = document.getElementById(selectId);
  if (selectElement) {
    for (var i = 0; i < destinations.length; i++) {
      var place = destinations[i];
      var option = document.createElement("option");
      option.value = place.name;
      option.text = place.name;
      selectElement.appendChild(option);
    }
  }
}

// --- NAVIGATION (Mobile menu) ---

var hamburger = document.getElementById("hamburger");
var navLinks = document.getElementById("navLinks");

if (hamburger && navLinks) {
  hamburger.onclick = function() {
    navLinks.classList.toggle("active");
  };
}

// --- HOME PAGE: QUOTE ROTATOR ---

var quoteEl = document.getElementById("quote");
if (quoteEl) {
  var quoteIndex = 0;
  setInterval(function() {
    quoteIndex = (quoteIndex + 1) % quotes.length;
    quoteEl.style.opacity = 0; // Fade out
    
    setTimeout(function() {
      quoteEl.textContent = quotes[quoteIndex];
      quoteEl.style.opacity = 1; // Fade in
    }, 300);
  }, 3000); // Change every 3 seconds
}

// --- HOME PAGE: DAILY DESTINATION ---

var dailyBox = document.getElementById("dailyDestination");
if (dailyBox) {
  var today = new Date().getDate();
  var placeOfDay = destinations[today % destinations.length];
  
  dailyBox.innerHTML = 
    '<img src="' + placeOfDay.image + '" style="width:100%;max-height:400px;object-fit:cover;display:block;">' +
    '<div class="daily-card-content">' +
      '<h3>' + placeOfDay.name + ', ' + placeOfDay.country + '</h3>' +
      '<p>' + placeOfDay.description + '</p>' +
    '</div>';
}

// --- NEWSLETTER FORM ---

var newsletterForms = document.querySelectorAll("#newsletterForm, #footerNewsletterForm");
newsletterForms.forEach(function(form) {
  form.onsubmit = function(event) {
    event.preventDefault(); // Stop page from refreshing
    var emailInput = form.querySelector("input[type='email']");
    if (!emailInput) return;

    saveToStorage("newsletterEmail", emailInput.value);

    var msgArea = form.querySelector(".footer-newsletter-msg");
    if (!msgArea) {
      msgArea = document.getElementById("newsletterMsg");
    }
    if (msgArea) {
      msgArea.innerHTML = "Subscribed successfully";
      msgArea.style.color = "#7ee787";
      msgArea.style.marginTop = "15px";
    }
    form.reset();
  };
});

// --- EXPLORER PAGE: LISTING DESTINATIONS ---

var grid = document.getElementById("destinationGrid");
var searchInput = document.getElementById("searchInput");
var continentFilter = document.getElementById("continentFilter");
var modal = document.getElementById("modal");
var modalBody = document.getElementById("modalBody");
var closeModal = document.getElementById("closeModal");

function renderDestinations(list) {
  if (!grid) return;
  grid.innerHTML = ""; // Clear the grid first
  
  for (let i = 0; i < list.length; i++) {
    let dest = list[i];
    let card = document.createElement("div");
    card.className = "card";
    card.innerHTML = 
      '<img src="' + dest.image + '" alt="' + dest.name + '">' +
      '<div class="card-body">' +
        '<h3>' + dest.name + '</h3>' +
        '<p>' + dest.country + '</p>' +
      '</div>';
    
    card.onclick = function() {
      openModal(dest);
    };
    
    grid.appendChild(card);
  }
}

function openModal(dest) {
  if (!modalBody || !modal) return;
  
  var attractionList = "";
  for (var j = 0; j < dest.attractions.length; j++) {
    attractionList += "<li>" + dest.attractions[j] + "</li>";
  }

  modalBody.innerHTML = 
    '<img src="' + dest.image + '" style="width:100%; border-radius:15px; margin-bottom:20px;">' +
    '<h2>' + dest.name + ', ' + dest.country + '</h2>' +
    '<p style="margin:15px 0; line-height:1.6;">' + dest.description + '</p>' +
    '<h3>Top Attractions</h3>' +
    '<ul style="margin:10px 20px;">' + attractionList + '</ul>' +
    '<table class="cost-table">' +
      '<tr><th>Budget</th><th>Estimated Cost</th></tr>' +
      '<tr><td>Low</td><td>' + dest.cost.low + '</td></tr>' +
      '<tr><td>Moderate</td><td>' + dest.cost.moderate + '</td></tr>' +
      '<tr><td>Luxury</td><td>' + dest.cost.luxury + '</td></tr>' +
    '</table>';
    
  modal.classList.add("show");
}

if (closeModal) {
  closeModal.onclick = function() {
    modal.classList.remove("show");
  };
}

// Close modal if user clicks outside of it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.classList.remove("show");
  }
};

function filterDestinations() {
  var query = searchInput.value.toLowerCase();
  var selectedContinent = continentFilter.value;
  var filteredList = [];

  for (var i = 0; i < destinations.length; i++) {
    var dest = destinations[i];
    var nameMatch = dest.name.toLowerCase().indexOf(query) !== -1;
    var countryMatch = dest.country.toLowerCase().indexOf(query) !== -1;
    var continentMatch = (selectedContinent === "all" || dest.continent === selectedContinent);

    if ((nameMatch || countryMatch) && continentMatch) {
      filteredList.push(dest);
    }
  }
  renderDestinations(filteredList);
}

if (searchInput) searchInput.oninput = filterDestinations;
if (continentFilter) continentFilter.onchange = filterDestinations;
if (grid) renderDestinations(destinations);

// --- BUDGET PAGE ---

populateDestinations("budgetDestination");
var budgetForm = document.getElementById("budgetForm");

if (budgetForm) {
  budgetForm.onsubmit = function(event) {
    event.preventDefault();
    var destination = document.getElementById("budgetDestination").value;
    var days = Number(document.getElementById("days").value);
    var dailyBudget = Number(document.getElementById("dailyBudget").value);
    var total = days * dailyBudget;

    var status = "Low Budget";
    var barWidth = 30;
    
    if (total > 500 && total <= 1500) {
      status = "Moderate Budget";
      barWidth = 65;
    } else if (total > 1500) {
      status = "Luxury Budget";
      barWidth = 100;
    }

    document.getElementById("budgetResult").innerHTML = 
      '<div class="result-card">' +
        '<h3>' + destination + '</h3>' +
        '<p>Total Estimated Cost: <strong>$' + total + '</strong></p>' +
        '<p>Status: <strong>' + status + '</strong></p>' +
        '<div class="progress"><div class="progress-fill" id="progressFill"></div></div>' +
        '<button class="save-btn" onclick="saveBudget(\'' + destination + '\', ' + total + ')">Save Budget</button>' +
      '</div>';
    
    setTimeout(function() {
      var fill = document.getElementById("progressFill");
      if (fill) fill.style.width = barWidth + "%";
    }, 100);
  };
}

function saveBudget(destName, totalCost) {
  var allBudgets = getFromStorage("savedBudgets");
  allBudgets.push({ destination: destName, total: totalCost });
  saveToStorage("savedBudgets", allBudgets);
  alert("Budget saved");
}

// --- GENERATOR PAGE ---

var generateTripBtn = document.getElementById("generateTrip");
if (generateTripBtn) {
  generateTripBtn.onclick = function() {
    var type = document.getElementById("tripType").value;
    var pool = [];

    for (var i = 0; i < destinations.length; i++) {
      if (type === "all" || destinations[i].type.indexOf(type) !== -1) {
        pool.push(destinations[i]);
      }
    }

    var randomIndex = Math.floor(Math.random() * pool.length);
    var randomDest = pool[randomIndex];

    document.getElementById("tripResult").innerHTML = 
      '<div class="result-card">' +
        '<img src="' + randomDest.image + '" style="width:100%;border-radius:16px;margin-bottom:15px;">' +
        '<h3>' + randomDest.name + ', ' + randomDest.country + '</h3>' +
        '<p style="margin:10px 0;">' + randomDest.description + '</p>' +
        '<button class="save-btn" onclick="saveWishlist(\'' + randomDest.name + '\')">Save to Wishlist</button>' +
      '</div>';
  };
}

function saveWishlist(destName) {
  var list = getFromStorage("wishlist");
  
  // Check if already in list
  var exists = false;
  for (var i = 0; i < list.length; i++) {
    if (list[i] === destName) exists = true;
  }
  
  if (exists) {
    alert("Already in wishlist!");
  } else {
    list.push(destName);
    saveToStorage("wishlist", list);
    alert("Added to wishlist");
  }
}

// --- VIEW WISHLIST BUTTON ---

var viewWishlistBtn = document.getElementById("viewWishlist");
if (viewWishlistBtn) {
  viewWishlistBtn.onclick = function() {
    var wishlist = getFromStorage("wishlist");
    var wishlistSection = document.getElementById("wishlistSection");
    var wishlistDisplay = document.getElementById("wishlistDisplay");
    
    if (!wishlistSection || !wishlistDisplay) return;
    
    if (wishlist.length === 0) {
      wishlistDisplay.innerHTML = "<p style='color:#666;'>Your wishlist is empty. Start adding destinations!</p>";
    } else {
      var html = "";
      for (var i = 0; i < wishlist.length; i++) {
        html += "<div class='result-card' style='margin-bottom:15px;'><h4>" + wishlist[i] + "</h4></div>";
      }
      wishlistDisplay.innerHTML = html;
    }
    
    // Show the wishlist section
    wishlistSection.style.display = "block";
  };
}

// --- MOOD PAGE: AMBIENT SOUNDS ---

populateDestinations("trackDestination");
var player = document.getElementById("audioPlayer");

function playSound(type) {
  var sounds = {
    beach: "audio/beach-sound.mp3",
    forest: "audio/forest.mp3",
    city: "audio/city_sound.mp3"
  };
  
  if (player) {
    player.src = sounds[type];
    player.play();
  }
}

function stopSound() {
  if (player) {
    player.pause();
  }
}

// --- MOOD PAGE: TRAVEL TRACKER ---

function displayTracked() {
  var resultArea = document.getElementById("trackResult");
  if (!resultArea) return;
  
  var savedList = getFromStorage("travelTrack");
  if (savedList.length === 0) {
    resultArea.innerHTML = "<p style='margin-top:20px;color:#666;'>No destinations tracked yet.</p>";
    return;
  }

  var htmlContent = "<h3 style='margin-top:30px;margin-bottom:15px;'>Your Tracked Destinations</h3>";
  
  // Loop backwards to show newest first
  for (var i = savedList.length - 1; i >= 0; i--) {
    var item = savedList[i];
    htmlContent += 
      '<div class="result-card" style="margin-bottom:15px;">' +
        '<h4 style="font-size:20px;">' + item.place + '</h4>' +
        '<p>Status: <strong style="color:var(--primary);">' + item.status + '</strong></p>' +
      '</div>';
  }
  resultArea.innerHTML = htmlContent;
}

function markDestination(status) {
  var placeName = document.getElementById("trackDestination").value;
  if (!placeName) {
    alert("Select destination first");
    return;
  }

  var savedItems = getFromStorage("travelTrack");
  var existingIndex = -1;
  
  for (var i = 0; i < savedItems.length; i++) {
    if (savedItems[i].place === placeName) {
      existingIndex = i;
    }
  }

  if (existingIndex > -1) {
    savedItems[existingIndex].status = status;
  } else {
    savedItems.push({ place: placeName, status: status });
  }

  saveToStorage("travelTrack", savedItems);
  displayTracked();
}

if (document.getElementById("trackResult")) {
  displayTracked();
}

// --- FEEDBACK PAGE ---

var feedbackForm = document.getElementById("feedbackForm");
if (feedbackForm) {
  feedbackForm.onsubmit = function(event) {
    event.preventDefault();
    var nameVal = document.getElementById("name").value.trim();
    var emailVal = document.getElementById("email").value.trim();
    var messageVal = document.getElementById("message").value.trim();

    if (nameVal.length < 2) {
      alert("Name must be at least 2 characters long.");
      return;
    }
    if (emailVal.indexOf("@") === -1 || emailVal.indexOf(".") === -1) {
      alert("Please enter a valid email address.");
      return;
    }
    if (messageVal.length < 5) {
      alert("Message is too short. Please tell us more!");
      return;
    }

    var allFeedbacks = getFromStorage("feedbacks");
    allFeedbacks.push({ 
      name: nameVal, 
      email: emailVal, 
      message: messageVal, 
      date: new Date().toISOString() 
    });
    saveToStorage("feedbacks", allFeedbacks);
    
    alert("Feedback submitted successfully");
    feedbackForm.reset();
  };
}

// --- FAQ ACCORDION ---

var faqButtons = document.querySelectorAll(".faq-btn");
for (var i = 0; i < faqButtons.length; i++) {
  faqButtons[i].onclick = function() {
    this.parentElement.classList.toggle("active");
  };
}

// --- SERVICE WORKER REGISTRATION ---

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js')
      .then((registration) => {
        console.log('ServiceWorker registration successful with scope: ', registration.scope);
      })
      .catch((error) => {
        console.log('ServiceWorker registration failed: ', error);
      });
  });
}

