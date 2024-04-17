document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('form');

    if (form) {
        form.addEventListener('submit', function (event) {
            event.preventDefault(); // Prevent the default form submission

            // Get form inputs
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirm_password').value;

            // Check if passwords match
            if (password !== confirmPassword) {
                alert("Passwords do not match. Please enter the same password in both fields.");
                return; // Stop form submission if passwords don't match
            }

            // If passwords match, proceed with form submission

            // Get other form inputs
            const formInputs = form.querySelectorAll('input, textarea');

            // Create an object to store form data
            const formData = {};
            formInputs.forEach(input => {
                if (input.type === 'radio' && input.checked) {
                    formData[input.name] = input.value;
                } else if (input.type !== 'radio') {
                    formData[input.id] = input.value;
                }
            });

            // Retrieve existing form submissions from local storage or initialize an empty array
            let formDataArray = JSON.parse(localStorage.getItem('formDataArray')) || [];

            // Add the new form submission to the array
            formDataArray.push(formData);
            console.log(formDataArray);

            // Save the updated form submissions array to local storage
            localStorage.setItem('formDataArray', JSON.stringify(formDataArray));

            // Redirect to dashboard page
            window.location.href = 'dashboard.html';
        });
    } else {
        console.error("Form element not found.");
    }
});
