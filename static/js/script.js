function signup() {
  // Perform signup logic, e.g., send data to server
  // For simplicity, we'll just log the signup details
  console.log("Signup Details:");
  console.log("Username: " + document.getElementById("signupUsername").value);
  console.log("Email: " + document.getElementById("signupEmail").value);
  console.log("Password: " + document.getElementById("signupPassword").value);

  // Simulate sending an OTP to the user's email
  var otp = generateOTP();
  console.log("OTP sent to email: " + otp);
  Gmail.App(document.getElementById("signupemail"));
  // Ask user to enter the OTP
  var enteredOTP = prompt("Enter the OTP sent to your email:");

  // Verify the entered OTP
  if (enteredOTP === otp) {
    alert("Signup successful! Redirecting to the dashboard.");
    // Redirect to the dashboard or perform any necessary actions
  } else {
    alert("Invalid OTP. Signup failed.");
  }
}

function login() {
  // Perform login logic, e.g., send data to server
  // For simplicity, we'll just log the login details
  console.log("Login Details:");
  console.log("Email: " + document.getElementById("loginEmail").value);
  console.log("Password: " + document.getElementById("loginPassword").value);

  // Simulate sending an OTP to the user's email
  var otp = generateOTP();
  console.log("OTP sent to email: " + otp);

  // Ask user to enter the OTP
  var enteredOTP = prompt("Enter the OTP sent to your email:");

  // Verify the entered OTP
  if (enteredOTP === otp) {
    alert("Login successful! Redirecting to the dashboard.");
    // Redirect to the dashboard or perform any necessary actions
  } else {
    alert("Invalid OTP. Login failed.");
  }
}

function generateOTP() {
  // Generate a 6-digit random OTP
  return Math.floor(100000 + Math.random() * 900000).toString();
}
