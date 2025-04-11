function sendEmail(params) {
    const serviceId = "service_qqx9bmg";
    const templateId = "template_4pjfbtl";
    const publicKey = "-vnO3NZoD9xkyLlar";

    emailjs.init(publicKey);

    emailjs.send(serviceId, templateId, params)
      .then(function (response) {
        console.log('SUCCESS!', response.status, response.text);
        alert('Email sent successfully!');
      }, function (error) {
        console.log('FAILED...', error);
        alert('Failed to send email. Please try again later.');
       });
    }