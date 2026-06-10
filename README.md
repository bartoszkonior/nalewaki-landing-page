# nalewaki.pl Landing Page

A responsive business landing page created for nalewaki.pl, focused on presenting automatic beer dispenser services for events and improving customer contact through a built-in contact form.

## Overview

This project is a promotional website built with HTML, CSS, and JavaScript. It presents the offer of automatic beer dispensers for large events, highlights business benefits, showcases service packages, and allows potential clients to send inquiries using a contact form.

The website was designed as a simple, fast, and modern landing page with strong visual presentation, animated sections, and clear call-to-action elements.

## Features

- Responsive landing page layout
- Mobile navigation menu
- Smooth scrolling between sections
- Animated content reveal on scroll
- Contact form with real-time validation
- Email sending integration with EmailJS
- Modal confirmation after successful form submission
- Dynamic textarea placeholder based on future date
- Sticky navigation
- Offer packages and partner section

## Tech Stack

- HTML5
- CSS3
- JavaScript
- EmailJS
- Google Fonts
- Font Awesome
- Ionicons

## Project Structure

```bash
├── index.html
├── style.css
├── queries.css
├── script.js
├── form-validation.js
├── img/
└── docs/
```

## Contact Form

The contact form uses EmailJS to send messages directly from the frontend. It includes:
- required field validation,
- email format validation,
- optional phone number validation,
- privacy policy checkbox validation,
- loading state handling,
- success modal after submission.

## Notes

This project is a static frontend website. No backend server is required for basic usage, but the contact form depends on EmailJS configuration.

Sensitive API keys and production service IDs should be secured properly before public deployment.

## Live Website

[https://nalewaki.pl](https://nalewaki.pl)

## Status

Project completed and deployed.
