document.addEventListener("DOMContentLoaded", () => {
  // Wczytaj EmailJS SDK
  const script = document.createElement("script");
  script.src =
    "https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js";
  script.onload = () => {
    emailjs.init({
      publicKey: "He0D90Qe4WT1Zfw1s", // Twój klucz publiczny
    });
  };
  document.head.appendChild(script);

  const form = document.getElementById("contactForm");
  const fullName = document.getElementById("fullName");
  const email = document.getElementById("email");
  const phoneNumber = document.getElementById("phoneNumber");
  const message = document.getElementById("message");
  const privacyPolicy = document.getElementById("privacyPolicy");
  const privacyLabel = document.getElementById("privacyLabel");
  const submitButton = document.getElementById("submitButton");

  const fullNameError = document.getElementById("fullNameError");
  const emailError = document.getElementById("emailError");
  const phoneNumberError = document.getElementById("phoneNumberError");
  const messageError = document.getElementById("messageError");

  // Funkcja walidacji e-mail
  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  // Funkcja walidacji numeru telefonu (9 cyfr z opcjonalnym +48 i myślnikami/spacjami)
  const validatePhone = (phone) => {
    const re = /^(\+48[- ]?)?[0-9]{3}[- ]?[0-9]{3}[- ]?[0-9]{3}$/;
    return re.test(phone);
  };

  // Czyszczenie błędów
  const clearErrors = () => {
    fullNameError.textContent = "";
    emailError.textContent = "";
    phoneNumberError.textContent = "";
    messageError.textContent = "";
    privacyLabel.classList.remove("error");
  };

  // Walidacja przy wysyłaniu formularza
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    clearErrors();
    let isValid = true;

    // Walidacja pola nazwa nadawcy
    if (!fullName.value.trim()) {
      fullNameError.textContent = "Wpisz swoje dane!";
      isValid = false;
    }

    // Walidacja e-mail
    if (!validateEmail(email.value)) {
      emailError.textContent = "Nieprawidłowy format adresu e-mail";
      isValid = false;
    }

    // Walidacja numeru telefonu (jeśli podany)
    if (phoneNumber.value && !validatePhone(phoneNumber.value)) {
      phoneNumberError.textContent = "Nieprawidłowy format numeru telefonu";
      isValid = false;
    }

    // Walidacja pola wiadomości
    if (!message.value.trim()) {
      messageError.textContent = "Pole wiadomości jest wymagane";
      isValid = false;
    }

    // Walidacja checkboxa polityki prywatności
    if (!privacyPolicy.checked) {
      privacyLabel.classList.add("error");
      isValid = false;
    }

    // Jeśli wszystko jest poprawne, wyślij dane na jeden adres e-mail
    if (isValid) {
      // Pokaż spinner w przycisku i wyłącz przycisk
      submitButton.innerHTML = '<div class="spinner"></div>';
      submitButton.classList.add("loading");
      submitButton.disabled = true;

      // Wysłanie na adres e-mail (kontakt@nalewaki.pl)
      emailjs
        .sendForm("service_6640k6q", "template_414vkeh", form)
        .then(() => {
          console.log("SUCCESS! Formularz wysłany.");
          openModal({ preventDefault: () => {} }); // Otwórz modal przy sukcesie
          form.reset();
          privacyLabel.classList.remove("error");
        })
        .catch((error) => {
          console.error("FAILED...", error);
          alert(
            "Wystąpił błąd podczas wysyłania wiadomości. Spróbuj ponownie później."
          ); // Alert przy błędzie
        })
        .finally(() => {
          // Przywróć tekst przycisku, usuń spinner i włącz przycisk
          submitButton.innerHTML = "<span>Poproś o ofertę</span>";
          submitButton.classList.remove("loading");
          submitButton.disabled = false;
        });
    }
  });

  // Walidacja w czasie rzeczywistym dla nazwy nadawcy
  fullName.addEventListener("input", () => {
    if (!fullName.value.trim()) {
      fullNameError.textContent = "Wpisz swoje dane!";
    } else {
      fullNameError.textContent = "";
    }
  });

  // Walidacja w czasie rzeczywistym dla e-mail
  email.addEventListener("input", () => {
    if (email.value && !validateEmail(email.value)) {
      emailError.textContent = "Nieprawidłowy format adresu e-mail";
    } else {
      emailError.textContent = "";
    }
  });

  // Walidacja w czasie rzeczywistym dla numeru telefonu
  phoneNumber.addEventListener("input", () => {
    if (phoneNumber.value && !validatePhone(phoneNumber.value)) {
      phoneNumberError.textContent = "Nieprawidłowy format numeru telefonu";
      isValid = false;
    } else {
      phoneNumberError.textContent = "";
    }
  });

  // Walidacja w czasie rzeczywistym dla wiadomości
  message.addEventListener("input", () => {
    if (!message.value.trim()) {
      messageError.textContent = "Pole wiadomości jest wymagane";
    } else {
      messageError.textContent = "";
    }
  });

  // Usunięcie błędu polityki prywatności po zaznaczeniu checkboxa
  privacyPolicy.addEventListener("change", () => {
    if (privacyPolicy.checked) {
      privacyLabel.classList.remove("error");
    }
  });
});
