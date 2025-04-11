function sendEmails(params) {
  const serviceId = "service_startup";
  const templateId = "template_s1xjrns";
  const publicKey = "IaD3sEcN4PYULKejM";

  emailjs.init(publicKey);

  emailjs.send(serviceId, templateId, params).then(
    function (response) {
      console.log("SUCCESS!", response.status, response.text);
      alert("Email sent successfully!");
    },
    function (error) {
      console.log("FAILED...", error);
      alert("Failed to send email. Please try again later.");
    }
  );
}
