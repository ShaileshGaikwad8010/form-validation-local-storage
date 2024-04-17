document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.getElementById('loginForm');
    const loginBtn = document.getElementById('loginBtn');

    loginBtn.addEventListener('click', function () {
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        // Retrieve user data array from local storage
        const formDataArray = JSON.parse(localStorage.getItem('formDataArray'));

        // Search for the user in the array
        const user = formDataArray.find(userData => userData.username === username && userData.password === password);

        if (user) {
            // Show login success alert
            alert("Login successful!");

            // Redirect to dashboard
            window.location.href = 'dashboard.html';
        } else {
            // Show user not found alert
            alert("User not found. Please check your credentials.");
        }
    });
});
