document.getElementById('register-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const name = e.target.name.value;
    const email = e.target.email.value;
    const phone = e.target.phone.value;
    const password = e.target.password.value;

    const response = await fetch('/api/users/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, phone, password })
    });

    if (response.ok) {
        alert('Registration successful!');
        window.location.href = 'login.html';
    } else {
        alert('Registration failed!');
    }
});

document.getElementById('login-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;

    const response = await fetch('/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    });

    if (response.ok) {
        alert('Login successful!');
        window.location.href = 'profile.html';
    } else {
        alert('Login failed!');
    }
});

// Function to handle field editing (name, email)
function editField(field) {
    const newValue = prompt(`Enter new ${field}:`);
    if (newValue) {
        updateUserProfile(field, newValue);
    }
}

async function updateUserProfile(field, value) {
    const userId = document.getElementById('user-id').innerText;

    const response = await fetch(`/api/users/edit/${userId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ [field]: value })
    });

    if (response.ok) {
        alert(`${field} updated successfully!`);
        location.reload();
    } else {
        alert(`Failed to update ${field}.`);
    }
}
