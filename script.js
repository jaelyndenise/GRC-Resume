function showDateTime() {
    const now = new Date();
    const formattedDateTime = now.toLocaleString(); // Formats date and time based on user's locale
    document.getElementById("dateTime").textContent = formattedDateTime;

    // Update the date and time every second
    setInterval(showDateTime, 1000);
}

function sendEmail() {
    window.location.href = "mailto:Jaelyn Denise <jaelyn.denise@gmail.com>";
}

function sendMailto(event) {
    event.preventDefault();
    const form = document.getElementById('contactForm');
    const first = form.first.value;
    const last = form.last.value;
    const email = form.email.value;
    const phone = form.phone.value;
    const message = form.message.value;
    const contactTime = form['contact-time'].value;
    const contactMethod = form['contact-method'].value;

    const subject = encodeURIComponent("Contact Form Submission");
    const body = encodeURIComponent(
        `First name: ${first}\n` +
        `Last name: ${last}\n` +
        `Email: ${email}\n` +
        `Phone: ${phone}\n` +
        `Message: ${message}\n` +
        `Best contact time: ${contactTime}\n` +
        `Preferred contact method: ${contactMethod}`
    );

    window.location.href = `mailto:Jaelyn Denise <jaelyn.denise@gmail.com>?subject=${subject}&body=${body}`;
    return false;
}
