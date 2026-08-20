export function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email || "").trim());
}

export function isValidPhone(phone) {
  return /^[0-9+()\-\s]{7,20}$/.test(String(phone || "").trim());
}

export function isValidPostalCode(code) {
  return String(code || "").trim().length >= 3;
}

export function validateLogin({ email, password }) {
  const errors = {};
  if (!email) errors.email = "Email is required.";
  else if (!isValidEmail(email)) errors.email = "Enter a valid email address.";
  if (!password) errors.password = "Password is required.";
  else if (password.length < 6) errors.password = "Password must be at least 6 characters.";
  return errors;
}

export function validateRegister({ firstName, lastName, email, password, confirmPassword }) {
  const errors = {};
  if (!firstName) errors.firstName = "First name is required.";
  if (!lastName) errors.lastName = "Last name is required.";
  if (!email) errors.email = "Email is required.";
  else if (!isValidEmail(email)) errors.email = "Enter a valid email address.";
  if (!password) errors.password = "Password is required.";
  else if (password.length < 6) errors.password = "Password must be at least 6 characters.";
  if (!confirmPassword) errors.confirmPassword = "Please confirm your password.";
  else if (password !== confirmPassword) errors.confirmPassword = "Passwords do not match.";
  return errors;
}

export function validateContact({ name, email, subject, message }) {
  const errors = {};
  if (!name) errors.name = "Name is required.";
  if (!email) errors.email = "Email is required.";
  else if (!isValidEmail(email)) errors.email = "Enter a valid email address.";
  if (!subject) errors.subject = "Subject is required.";
  if (!message || message.trim().length < 10) errors.message = "Message must be at least 10 characters.";
  return errors;
}

export function validateShipping(data) {
  const errors = {};
  ["firstName", "lastName", "email", "phone", "country", "city", "address", "postalCode"].forEach((f) => {
    if (!data[f] || !String(data[f]).trim()) errors[f] = "This field is required.";
  });
  if (data.email && !isValidEmail(data.email)) errors.email = "Enter a valid email address.";
  if (data.phone && !isValidPhone(data.phone)) errors.phone = "Enter a valid phone number.";
  return errors;
}

export function validateCard({ cardName, cardNumber, expiry, cvv }) {
  const errors = {};
  if (!cardName) errors.cardName = "Name on card is required.";
  if (!cardNumber || cardNumber.replace(/\s/g, "").length < 16) errors.cardNumber = "Enter a valid 16-digit card number.";
  if (!expiry || !/^(0[1-9]|1[0-2])\/\d{2}$/.test(expiry)) errors.expiry = "Use MM/YY format.";
  if (!cvv || !/^\d{3,4}$/.test(cvv)) errors.cvv = "Enter a valid CVV.";
  return errors;
}
