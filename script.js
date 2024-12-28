document.addEventListener('DOMContentLoaded', function() {
    function validateForm(fields) {
        return fields.every(field => document.getElementById(field).value.trim());
    }

    function handleBooking(formId, fields, type) {
        const form = document.getElementById(formId);
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            if (!validateForm(fields)) {
                alert('معلوماتك أو بياناتك غير مكتملة. يرجى ملء جميع الحقول.');
                return;
            }
            const details = fields.map(field => document.getElementById(field).value).join(' إلى ');
            form.style.display = 'none';
            const message = document.createElement('div');
            message.classList.add('confirmation-message');
            message.innerHTML = `
                <h2>تم الحجز بنجاح!</h2>
                <p>تم حجز ${type} من ${details}</p>
                <button onclick="location.reload();">إعادة الحجز</button>
            `;
            document.body.appendChild(message);
            setTimeout(() => message.style.display = 'none', 5000);
        });
    }

    const bookingTypes = [
        { id: 'flight-form', fields: ['flight-from', 'flight-to', 'flight-date'], type: 'طيران' },
        { id: 'bus-form', fields: ['bus-from', 'bus-to', 'bus-date'], type: 'أتوبيس' },
        { id: 'train-form', fields: ['train-from', 'train-to', 'train-date'], type: 'قطار' },
        { id: 'hotel-form', fields: ['hotel-location', 'hotel-check-in', 'hotel-check-out'], type: 'فندق' },
        { id: 'car-form', fields: ['car-pickup', 'car-pickup-date', 'car-dropoff-date'], type: 'سيارة' },
        { id: 'tour-form', fields: ['tour-location', 'tour-date'], type: 'جولة' },
        { id: 'transfer-form', fields: ['transfer-from', 'transfer-to', 'transfer-date'], type: 'نقل خاص' }
    ];

    bookingTypes.forEach(booking => handleBooking(booking.id, booking.fields, booking.type));
});
