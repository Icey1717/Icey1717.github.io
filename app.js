// Your Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyD_aIUJup0_3t51O4S3jEMX3rxSGOW2oOA",
    authDomain: "birthday-boy-e1605.firebaseapp.com",
    projectId: "birthday-boy-e1605",
    storageBucket: "birthday-boy-e1605.firebasestorage.app",
    messagingSenderId: "32454068318",
    appId: "1:32454068318:web:a849d3e6175719c348cccf"
  };

  // Initialize Firebase
  const app = firebase.initializeApp(firebaseConfig);
  const auth = firebase.auth();
  const db = firebase.firestore();

  // Check password and authenticate user
  function checkPassword() {
    const inputPassword = document.getElementById("password").value;

    auth.signInWithEmailAndPassword("party@guest.com", inputPassword)
      .then(() => {
        // Password correct, show main content
        document.getElementById("login").style.display = "none";
        document.getElementById("content").style.display = "block";
        loadPotluckData();
      })
      .catch(() => {
        // Password incorrect, show error message
        document.getElementById("error").textContent = "Incorrect password!";
      });
  }

  // Fetch and display potluck data
  async function loadPotluckData() {
  const dishList = document.getElementById("dish-list");
  dishList.innerHTML = ""; // Clear the list

  const querySnapshot = await db.collection("dishes").get();
  querySnapshot.forEach((doc) => {
      const dish = doc.data();
      const dishBox = document.createElement("div");
      dishBox.classList.add("dish-box");
      dishBox.textContent = `${dish.name} - ${dish.dish}`;

      // Randomize initial position and velocity
      dishBox.style.position = "absolute";
      let xPos = Math.random() * window.innerWidth;
      let yPos = Math.random() * window.innerHeight;

      let speedMultiplier = 1;
      let xVelocity = (Math.random() - 0.5) * speedMultiplier; // Random horizontal velocity (-1 to 1)
      let yVelocity = (Math.random() - 0.5) * speedMultiplier; // Random vertical velocity (-1 to 1)

      // Set initial position
      dishBox.style.left = `${xPos}px`;
      dishBox.style.top = `${yPos}px`;

      // Append to the dish list container
      dishList.appendChild(dishBox);

      // Update position and check for bouncing
      setInterval(() => {
        // Update the position with velocity
        xPos += xVelocity;
        yPos += yVelocity;

        // Check for wall collision and reverse velocity if necessary
        if (xPos <= 0 || xPos >= window.innerWidth - dishBox.offsetWidth) {
          xVelocity = -xVelocity; // Reverse horizontal direction
        }
        if (yPos <= 0 || yPos >= window.innerHeight - dishBox.offsetHeight) {
          yVelocity = -yVelocity; // Reverse vertical direction
        }

        // Set new position
        dishBox.style.left = `${xPos}px`;
        dishBox.style.top = `${yPos}px`;

      }, 8); // Update position roughly every frame (~60fps)
  });
}


  // Add a new dish to Firestore
  async function addDish() {
    const name = document.getElementById("name").value;
    const dish = document.getElementById("dish").value;

    if (name && dish) {
      await db.collection("dishes").add({ name, dish });
      document.getElementById("name").value = "";
      document.getElementById("dish").value = "";
      loadPotluckData();
    } else {
      alert("Please fill out both fields.");
    }
  }