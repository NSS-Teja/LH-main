async function fetchUserProfile(userId) {
  try {
    const response = await fetch(`http://localhost:3000/api/users/${userId}`);
    const user = await response.json();

    if (response.ok) {
      document.getElementById("user-id").textContent = user._id;
      document.getElementById("user-name").textContent = user.name;
      document.getElementById("user-email").textContent = user.email;
      document.getElementById("user-phone").textContent = user.phone;
    } else {
      alert(user.error);
    }
  } catch (error) {
    console.error("Error fetching user profile:", error);
  }
}

// Example usage
// fetchUserProfile("USER_ID_HERE"); // Replace with actual user ID
