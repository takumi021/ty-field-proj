// Wait for the document to be fully loaded before running the script
document.addEventListener('DOMContentLoaded', () => {
    
    // Get the form element from the page
    const loginForm = document.getElementById('login-form');

    // Add an event listener for the 'submit' event
    loginForm.addEventListener('submit', (event) => {
        // Prevent the default form submission behavior (which reloads the page)
        event.preventDefault();

        // Get the values from the input fields
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        // For your project, you would send this data to your backend server.
        // For now, we'll just log it to the browser's developer console.
        console.log('Login attempt with:');
        console.log('Email:', email);
        console.log('Password:', password);

        // You could add a message to the user here, e.g.,
        // alert('Login functionality is not yet implemented.');
    });

    document.getElementById('demo-login').addEventListener('click', function() {
        window.location.href = 'dashboard.html';
    });

});