import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHandsHelping,
  faHeartbeat,
  faPeopleCarry,
  faShieldAlt,
  faCheckCircle,
  faUsers,
  faAward,
  faLightbulb
} from "@fortawesome/free-solid-svg-icons";
import { Parallax } from 'react-parallax';
import { FaArrowRight } from "react-icons/fa";

const About = () => {
  const teamMembers = [
    {
      name: "Dr. Sylvia Chebet",
      role: "Chief Executive Officer",
      image: "/assets/CEO.png",
      description: "Leading healthcare innovation for over 15 years"
    },
    {
      name: "Dr. Kenneth Kibathi",
      role: "Chief Technology Officer",
      image: "/assets/CTO.png",
      description: "Expert in digital healthcare solutions"
    },
    {
      name: "Dr. Dennis Mwangi",
      role: "Head of Partnerships",
      image: "/assets/HOP.jpeg",
      description: "Building bridges between businesses and healthcare"
    },
    {
      name: "James Omondi",
      role: "Operations Director",
      image: "https://img.freepik.com/free-photo/handsome-confident-smiling-man-with-hands-crossed-chest_176420-18743.jpg",
      description: "Ensuring seamless platform operations"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section with Parallax */}
      <div className="header relative">
        <Parallax
          className="w-full h-[500px] md:h-[600px] object-cover"
          bgImage="https://img.freepik.com/premium-photo/ecofriendly-business-summit-ecofriendly-company-meeting-with-business-people-save-nature_71956-34971.jpg?w=740"
          strength={300}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-[#020234]/90 to-[#020234]/70"></div>
          <div className="relative z-10 flex flex-col items-center justify-center h-full px-4">
            {/* Breadcrumb */}
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-0.5 bg-blue-500"></div>
              <p className="text-sm md:text-base font-medium text-gray-300 uppercase tracking-wider">
                About Us
              </p>
              <div className="w-12 h-0.5 bg-blue-500"></div>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white text-center mb-6 leading-tight">
              About Biashara First<br />Healthcare
            </h1>

            <p className="text-lg md:text-xl text-gray-300 text-center max-w-3xl">
              Revolutionizing healthcare connections between businesses and hospitals for a healthier tomorrow
            </p>
          </div>
        </Parallax>
      </div>

      {/* Story Section - Two Column Layout */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left - Content */}
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-0.5 bg-[#020234]"></div>
                <p className="text-sm font-semibold text-gray-600 uppercase tracking-wider">
                  Our Story
                </p>
              </div>

              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                Bridging Healthcare & Business Connections
              </h2>

              <p className="text-gray-600 text-lg leading-relaxed">
                At Biashara First Healthcare, we recognized a critical gap in the healthcare ecosystem.
                Small and medium businesses struggled to find reliable healthcare partnerships, while
                hospitals sought to expand their reach to the business community.
              </p>

              <p className="text-gray-600 text-lg leading-relaxed">
                Our platform was born from this need - a digital solution that connects businesses
                with nearby healthcare facilities, making healthcare accessible, efficient, and reliable
                for everyone in the community.
              </p>

              {/* Key Stats */}
              <div className="grid grid-cols-3 gap-6 pt-8">
                <div className="text-center">
                  <div className="text-4xl font-bold text-blue-500 mb-2">500+</div>
                  <div className="text-sm text-gray-600">Businesses</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-blue-500 mb-2">100+</div>
                  <div className="text-sm text-gray-600">Hospitals</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-blue-500 mb-2">7+</div>
                  <div className="text-sm text-gray-600">Years</div>
                </div>
              </div>
            </div>

            {/* Right - Image Collage */}
            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <img
                    src="https://img.freepik.com/premium-photo/students-looking-map-table_746565-178297.jpg?w=360"
                    alt="Team collaboration"
                    className="w-full h-64 object-cover rounded-lg shadow-lg"
                  />
                  <img
                    src="https://img.freepik.com/free-photo/young-adults-traveling-london_23-2149259460.jpg"
                    alt="Healthcare planning"
                    className="w-full h-48 object-cover rounded-lg shadow-lg"
                  />
                </div>
                <div className="space-y-4 pt-8">
                  <img
                    src="https://img.freepik.com/free-photo/healthcare-workers-medicine-insurance-pandemic-self-quarantine-concept-cheerful-friendly-asian-female-doctor-physician-white-coat-glasses-smiling-delighted-ready-help-patients_1258-107867.jpg"
                    alt="Healthcare professional"
                    className="w-full h-48 object-cover rounded-lg shadow-lg"
                  />
                  <img
                    src="https://img.freepik.com/free-photo/group-diverse-people-having-business-meeting_53876-25060.jpg"
                    alt="Business meeting"
                    className="w-full h-64 object-cover rounded-lg shadow-lg"
                  />
                </div>
              </div>

              {/* Floating badge */}
              <div className="absolute -bottom-8 -left-8 bg-blue-500 text-white p-6 rounded-lg shadow-xl">
                <div className="text-3xl font-bold">7+</div>
                <div className="text-sm">Years Experience</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision - Side by Side Cards */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Mission Card */}
            <div className="bg-white p-8 md:p-12 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border-t-4 border-blue-500">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                <FontAwesomeIcon icon={faLightbulb} className="text-3xl text-blue-500" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-4">Our Mission</h3>
              <p className="text-gray-600 text-lg leading-relaxed">
                To bridge the gap between businesses and healthcare services, ensuring that healthcare
                accessibility is seamless, efficient, and reliable for everyone. We empower businesses
                to make informed healthcare decisions while helping hospitals expand their reach.
              </p>
            </div>

            {/* Vision Card */}
            <div className="bg-white p-8 md:p-12 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border-t-4 border-purple-500">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-6">
                <FontAwesomeIcon icon={faAward} className="text-3xl text-purple-500" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-4">Our Vision</h3>
              <p className="text-gray-600 text-lg leading-relaxed">
                To create a future where businesses can easily find and partner with healthcare providers,
                improving overall health outcomes for communities through collaboration and innovation.
                We envision a healthier, more connected business ecosystem.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-12 h-0.5 bg-blue-500"></div>
              <p className="text-sm font-semibold text-gray-600 uppercase tracking-wider">
                What Drives Us
              </p>
              <div className="w-12 h-0.5 bg-blue-500"></div>
            </div>

            <h3 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Our Core Values</h3>
            <p className="text-gray-600 text-lg max-w-3xl mx-auto">
              We are committed to delivering exceptional services through our core values.
              These principles drive us to make a positive impact in the healthcare industry.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Value 1 */}
            <div className="group bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-red-300 hover:-translate-y-2">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-6 group-hover:bg-red-500 transition-colors duration-300">
                <FontAwesomeIcon icon={faHeartbeat} className="text-3xl text-red-500 group-hover:text-white transition-colors duration-300" />
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-3">Health & Wellness</h4>
              <p className="text-gray-600 leading-relaxed">
                We prioritize the health and wellness of our users, providing easy access to top healthcare facilities.
              </p>
            </div>

            {/* Value 2 */}
            <div className="group bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-blue-300 hover:-translate-y-2">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6 group-hover:bg-blue-500 transition-colors duration-300">
                <FontAwesomeIcon icon={faHandsHelping} className="text-3xl text-blue-500 group-hover:text-white transition-colors duration-300" />
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-3">Support & Collaboration</h4>
              <p className="text-gray-600 leading-relaxed">
                We believe in collaboration, supporting both businesses and healthcare providers for mutual growth.
              </p>
            </div>

            {/* Value 3 */}
            <div className="group bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-green-300 hover:-translate-y-2">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6 group-hover:bg-green-500 transition-colors duration-300">
                <FontAwesomeIcon icon={faPeopleCarry} className="text-3xl text-green-500 group-hover:text-white transition-colors duration-300" />
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-3">Community Impact</h4>
              <p className="text-gray-600 leading-relaxed">
                We are dedicated to building strong communities by making healthcare more accessible to all.
              </p>
            </div>

            {/* Value 4 */}
            <div className="group bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-purple-300 hover:-translate-y-2">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-6 group-hover:bg-purple-500 transition-colors duration-300">
                <FontAwesomeIcon icon={faShieldAlt} className="text-3xl text-purple-500 group-hover:text-white transition-colors duration-300" />
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-3">Trust & Integrity</h4>
              <p className="text-gray-600 leading-relaxed">
                Our platform is built on trust and integrity, ensuring dependable connections for all stakeholders.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left - Image */}
            <div className="relative">
              <img
                src="https://img.freepik.com/free-photo/medical-banner-with-doctor-wearing-goggles_23-2149611193.jpg"
                alt="Healthcare professional"
                className="w-full h-[500px] object-cover rounded-2xl shadow-2xl"
              />
              {/* Overlay stats */}
              <div className="absolute bottom-8 left-8 right-8 bg-white/95 backdrop-blur-sm p-6 rounded-xl shadow-lg">
                <h4 className="text-xl font-bold text-gray-900 mb-4">Platform Benefits</h4>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <FontAwesomeIcon icon={faCheckCircle} className="text-green-500 text-xl" />
                    <span className="text-gray-700">Easy Hospital Discovery</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <FontAwesomeIcon icon={faCheckCircle} className="text-green-500 text-xl" />
                    <span className="text-gray-700">Verified Healthcare Partners</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <FontAwesomeIcon icon={faCheckCircle} className="text-green-500 text-xl" />
                    <span className="text-gray-700">24/7 Support System</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right - Content */}
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-0.5 bg-blue-500"></div>
                <p className="text-sm font-semibold text-gray-600 uppercase tracking-wider">
                  Why Choose Us
                </p>
              </div>

              <h3 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                Your Trusted Healthcare Connection Platform
              </h3>

              <p className="text-gray-600 text-lg leading-relaxed">
                Biashara First Healthcare is more than just a platform; it's a movement aimed at
                creating stronger healthcare connections. We bring the power of businesses and
                healthcare providers together for better access to care and support.
              </p>

              {/* Features List */}
              <div className="space-y-4 pt-4">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                    <FontAwesomeIcon icon={faUsers} className="text-blue-500 text-xl" />
                  </div>
                  <div>
                    <h5 className="font-bold text-gray-900 text-lg mb-1">Extensive Network</h5>
                    <p className="text-gray-600">Access to 100+ verified hospitals and healthcare facilities across the region.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                    <FontAwesomeIcon icon={faCheckCircle} className="text-green-500 text-xl" />
                  </div>
                  <div>
                    <h5 className="font-bold text-gray-900 text-lg mb-1">Quality Assurance</h5>
                    <p className="text-gray-600">All healthcare partners are verified and meet our strict quality standards.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                    <FontAwesomeIcon icon={faLightbulb} className="text-purple-500 text-xl" />
                  </div>
                  <div>
                    <h5 className="font-bold text-gray-900 text-lg mb-1">Smart Matching</h5>
                    <p className="text-gray-600">Our intelligent system connects you with the most suitable healthcare partners.</p>
                  </div>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-6">
                <a
                  href="/register-business"
                  className="inline-flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-8 py-4 rounded-md font-semibold transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  Register Your Business
                  <FaArrowRight className="text-sm" />
                </a>
                <a
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 bg-white hover:bg-gray-50 text-gray-900 px-8 py-4 rounded-md font-semibold transition-all duration-300 shadow-lg border-2 border-gray-200"
                >
                  Get in Touch
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-12 h-0.5 bg-blue-500"></div>
              <p className="text-sm font-semibold text-gray-600 uppercase tracking-wider">
                Our Team
              </p>
              <div className="w-12 h-0.5 bg-blue-500"></div>
            </div>

            <h3 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Meet Our Leadership</h3>
            <p className="text-gray-600 text-lg max-w-3xl mx-auto">
              Our experienced team is dedicated to revolutionizing healthcare connections
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="group">
                <div className="relative overflow-hidden rounded-xl mb-4 bg-gradient-to-br from-gray-100 to-gray-200 aspect-square">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      e.target.src = "https://via.placeholder.com/400x400?text=Team+Member";
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#403343]/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                    <p className="text-white text-sm">{member.description}</p>
                  </div>
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-1">{member.name}</h4>
                <p className="text-[#403343] font-medium">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 bg-gradient-to-br from-[#020234] to-[#030350] relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-72 h-72 bg-blue-500 rounded-full filter blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500 rounded-full filter blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10 text-center">
          <h3 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Transform Your Healthcare Connections?
          </h3>
          <p className="text-lg text-gray-300 mb-12 max-w-2xl mx-auto">
            Join hundreds of businesses already benefiting from our platform
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a
              href="/register-business"
              className="inline-flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-8 py-4 rounded-md font-semibold transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
            >
              Get Started Today
              <FaArrowRight className="text-sm" />
            </a>
            <a
              href="/contact"
              className="inline-flex items-center justify-center gap-2 bg-white hover:bg-gray-100 text-[#020234] px-8 py-4 rounded-md font-semibold transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
            >
              Contact Our Team
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;