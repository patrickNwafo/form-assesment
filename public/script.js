document.getElementById('userForm').addEventListener('submit', function (event) {
    event.preventDefault();
    let errors = [];

    // First name validation
    let firstName = document.getElementById('firstName').value;
    if (!firstName) {
        errors.push("First name is required.");
    } else if (firstName.length < 1 || /\d/.test(firstName)) {
        errors.push("First name must be at least 1 character and cannot contain numbers.");
    }

    // Last name validation
    let lastName = document.getElementById('lastName').value;
    if (!lastName) {
        errors.push("Last name is required.");
    } else if (lastName.length < 1 || /\d/.test(lastName)) {
        errors.push("Last name must be at least 1 character and cannot contain numbers.");
    }

    // Other names validation
    let otherNames = document.getElementById('otherNames').value;
    if (/\d/.test(otherNames)) {
        errors.push("Other names cannot contain numbers.");
    }

    // Email validation
    let email = document.getElementById('email').value;
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
        errors.push("A valid email address is required.");
    }

    // Phone number validation
    let phoneNumber = document.getElementById('phoneNumber').value;
    if (!phoneNumber || phoneNumber.length !== 10) { // Adjust the length as needed
        errors.push("Phone number must be exactly 10 digits.");
    }

    // Gender validation
    let gender = document.getElementById('gender').value;
    if (!gender) {
        errors.push("Gender is required.");
    }

    // Display errors or submit the form
    if (errors.length > 0) {
        document.getElementById('errors').innerText = errors.join('\n');
    } else {
        let formData = {
            firstName,
            lastName,
            otherNames,
            email,
            phoneNumber,
            gender
        };

        fetch('/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        }).then(response => response.json()).then(data => {
            console.log(data);
            if (data.success) {
                alert("Form submitted successfully!");
            } else {
                document.getElementById('errors').innerText = "An error occurred while submitting the form.";
            }
        }).catch(error => {
            console.error('Error:', error);
            document.getElementById('errors').innerText = "An error occurred while submitting the form.";
        });
    }
});
