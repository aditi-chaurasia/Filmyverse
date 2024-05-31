// auth.js

// Function to check if the user is logged in
export const isLoggedIn = () => {
    // Assuming you have some logic to check if the user is logged in, for example, checking if a token exists in local storage
    const token = localStorage.getItem('token'); // Assuming you're storing a token in local storage upon login
    return !!token; // Convert token to a boolean value
};
