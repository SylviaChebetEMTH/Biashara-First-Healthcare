import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faPhone, 
  faEnvelope, 
  faMapMarkerAlt,
  faUser,
  faBuilding,
  faPaperPlane,
  faClock,
  faCheckCircle
} from '@fortawesome/free-solid-svg-icons';
import { 
  faFacebook, 
  faTwitter, 
  faLinkedin, 
  faInstagram 
} from '@fortawesome/free-brands-svg-icons';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    subject: "",
    message: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call - Replace with your actual endpoint
    try {
      // Simulated delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Replace this with your actual API call
      // const response = await fetch("YOUR_API_ENDPOINT", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify(formData)
      // });

      toast.success("Message sent successfully! We'll get back to you soon.");
      
      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        company: "",
        subject: "",
        message: ""
      });
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: faPhone,
      title: "Call Us",
      details: ["+254 712 345 678", "+254 000 000 000"],
      color: "blue"
    },
    {
      icon: faEnvelope,
      title: "Email Us",
      details: ["info@biasharafirsthealth.com", "support@biasharafirsthealth.com"],
      color: "green"
    },
    {
      icon: faMapMarkerAlt,
      title: "Visit Us",
      details: ["123 Healthcare Avenue", "Nairobi, Kenya"],
      color: "red"
    },
    {
      icon: faClock,
      title: "Working Hours",
      details: ["Monday - Friday: 8AM - 6PM", "Saturday: 9AM - 2PM"],
      color: "purple"
    }
  ];

  const socialLinks = [
    { icon: faFacebook, url: "#", color: "bg-blue-600 hover:bg-blue-700" },
    { icon: faTwitter, url: "#", color: "bg-sky-500 hover:bg-sky-600" },
    { icon: faLinkedin, url: "#", color: "bg-blue-700 hover:bg-blue-800" },
    { icon: faInstagram, url: "#", color: "bg-pink-600 hover:bg-pink-700" }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#020234] to-[#030350] py-20 md:py-32 overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-72 h-72 bg-blue-500 rounded-full filter blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500 rounded-full filter blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            {/* Breadcrumb */}
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="w-12 h-0.5 bg-blue-500"></div>
              <p className="text-sm md:text-base font-medium text-gray-300 uppercase tracking-wider">
                Get In Touch
              </p>
              <div className="w-12 h-0.5 bg-blue-500"></div>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Contact Our Team
            </h1>

            <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
              Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 -mt-32 mb-12 relative z-10">
            {contactInfo.map((info, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 border-t-4 border-blue-500 hover:-translate-y-2"
              >
                <div className={`w-14 h-14 bg-${info.color}-100 rounded-full flex items-center justify-center mb-4`}>
                  <FontAwesomeIcon 
                    icon={info.icon} 
                    className={`text-2xl text-${info.color}-500`}
                  />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">{info.title}</h3>
                {info.details.map((detail, idx) => (
                  <p key={idx} className="text-gray-600 text-sm leading-relaxed">
                    {detail}
                  </p>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Map Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Contact Form */}
            <div>
              <div className="mb-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-0.5 bg-blue-500"></div>
                  <p className="text-sm font-semibold text-gray-600 uppercase tracking-wider">
                    Send Message
                  </p>
                </div>
                <h2 className="text-4xl font-bold text-gray-900 mb-4">
                  Drop Us a Line
                </h2>
                <p className="text-gray-600 text-lg">
                  Fill out the form below and our team will get back to you within 24 hours.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name & Email */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">
                      <FontAwesomeIcon icon={faUser} className="mr-2 text-blue-500" />
                      Your Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full p-4 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">
                      <FontAwesomeIcon icon={faEnvelope} className="mr-2 text-blue-500" />
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      placeholder="john@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full p-4 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
                      required
                    />
                  </div>
                </div>

                {/* Phone & Company */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">
                      <FontAwesomeIcon icon={faPhone} className="mr-2 text-blue-500" />
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      placeholder="+254 712 345 678"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full p-4 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">
                      <FontAwesomeIcon icon={faBuilding} className="mr-2 text-blue-500" />
                      Company Name
                    </label>
                    <input
                      type="text"
                      name="company"
                      placeholder="Your Company"
                      value={formData.company}
                      onChange={handleChange}
                      className="w-full p-4 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                {/* Subject */}
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    Subject <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="subject"
                    placeholder="How can we help you?"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full p-4 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
                    required
                  />
                </div>

                {/* Message */}
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    Message <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="message"
                    placeholder="Tell us more about your inquiry..."
                    value={formData.message}
                    onChange={handleChange}
                    rows="6"
                    className="w-full p-4 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors resize-none"
                    required
                  />
                  <p className="text-sm text-gray-500 mt-2">
                    {formData.message.length} characters
                  </p>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-4 rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2 ${
                    isSubmitting
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white'
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      Sending...
                    </>
                  ) : (
                    <>
                      <FontAwesomeIcon icon={faPaperPlane} />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Right Side - Map & Additional Info */}
            <div className="space-y-8">
              {/* Map */}
              <div className="rounded-xl overflow-hidden shadow-lg h-[400px]">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d255282.32297278583!2d36.70730744863279!3d-1.3028617999999995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f1172d84d49a7%3A0xf7cf0254b297924c!2sNairobi%2C%20Kenya!5e0!3m2!1sen!2ske!4v1234567890123"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Office Location"
                ></iframe>
              </div>

              {/* Why Contact Us */}
              <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-8 rounded-xl border-2 border-blue-100">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Why Contact Us?
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <FontAwesomeIcon icon={faCheckCircle} className="text-green-500 text-xl mt-1" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Quick Response</h4>
                      <p className="text-gray-600 text-sm">We respond to all inquiries within 24 hours</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <FontAwesomeIcon icon={faCheckCircle} className="text-green-500 text-xl mt-1" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Expert Support</h4>
                      <p className="text-gray-600 text-sm">Our team of healthcare experts is here to help</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <FontAwesomeIcon icon={faCheckCircle} className="text-green-500 text-xl mt-1" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Tailored Solutions</h4>
                      <p className="text-gray-600 text-sm">We provide customized healthcare connections</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <FontAwesomeIcon icon={faCheckCircle} className="text-green-500 text-xl mt-1" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Free Consultation</h4>
                      <p className="text-gray-600 text-sm">Get expert advice at no cost</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Media */}
              <div className="bg-white p-8 rounded-xl shadow-lg border-2 border-gray-100">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Follow Us</h3>
                <p className="text-gray-600 mb-6">
                  Stay connected with us on social media for the latest updates and healthcare tips.
                </p>
                <div className="flex gap-4">
                  {socialLinks.map((social, index) => (
                    <a
                      key={index}
                      href={social.url}
                      className={`w-12 h-12 rounded-full ${social.color} text-white flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-lg`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FontAwesomeIcon icon={social.icon} className="text-lg" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-12 h-0.5 bg-blue-500"></div>
              <p className="text-sm font-semibold text-gray-600 uppercase tracking-wider">
                FAQ
              </p>
              <div className="w-12 h-0.5 bg-blue-500"></div>
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Find quick answers to common questions
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-4">
            {[
              {
                question: "How long does it take to register my business?",
                answer: "The registration process typically takes 5-10 minutes. Once submitted, we'll review and approve your business within 24-48 hours."
              },
              {
                question: "Is there a fee to join the platform?",
                answer: "No, registration and basic access to our platform is completely free for businesses and healthcare facilities."
              },
              {
                question: "How do I find hospitals near my business?",
                answer: "Simply use our interactive map on the homepage. You can search, filter, and view all nearby hospitals with detailed information."
              },
              {
                question: "Can I update my business information later?",
                answer: "Yes, you can update your business information anytime by contacting our support team or through your dashboard (coming soon)."
              },
              {
                question: "What if I need technical support?",
                answer: "Our support team is available Monday-Friday, 8AM-6PM. You can reach us via phone, email, or the contact form above."
              }
            ].map((faq, index) => (
              <details
                key={index}
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 group"
              >
                <summary className="font-semibold text-gray-900 cursor-pointer flex justify-between items-center">
                  {faq.question}
                  <span className="text-blue-500 group-open:rotate-180 transition-transform duration-300">
                    ▼
                  </span>
                </summary>
                <p className="text-gray-600 mt-4 leading-relaxed">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-[#020234] to-[#030350] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-72 h-72 bg-blue-500 rounded-full filter blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500 rounded-full filter blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10 text-center">
          <h3 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Get Started?
          </h3>
          <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
            Join our platform today and connect with healthcare facilities in your area
          </p>
          <a
            href="/register-business"
            className="inline-flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
          >
            Register Your Business
            <FontAwesomeIcon icon={faPaperPlane} />
          </a>
        </div>
      </section>

      {/* Toast Container */}
      <ToastContainer 
        position="top-right" 
        autoClose={3000} 
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

export default Contact;