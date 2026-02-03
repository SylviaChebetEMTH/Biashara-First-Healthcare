import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import MapView from "./MapView";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faBuilding, 
  faUser, 
  faPhone, 
  faEnvelope, 
  faMapMarkerAlt,
  faBriefcase,
  faFileAlt,
  faCheckCircle,
  faMapPin,
  faArrowRight,
  faArrowLeft
} from '@fortawesome/free-solid-svg-icons';

const RegisterBusiness = () => {
  const [formData, setFormData] = useState({
    business_owner: "",
    business_name: "",
    contact_number: "",
    email: "",
    address: "",
    business_type: "",
    description: "",
    latitude: "",
    longitude: "",
    useCurrentLocation: false,
  });

  const [currentStep, setCurrentStep] = useState(1);
  const [isPinPlaced, setIsPinPlaced] = useState(false);
  const navigate = useNavigate();

  const setCoordinates = (coordinates, isCurrentLocation = false) => {
    setFormData({
      ...formData,
      latitude: coordinates[1],
      longitude: coordinates[0],
      useCurrentLocation: isCurrentLocation,
    });
    setIsPinPlaced(true);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const businessData = {
      business_owner: formData.business_owner,
      business_name: formData.business_name,
      contact_number: formData.contact_number,
      email: formData.email,
      address: formData.address,
      business_type: formData.business_type,
      description: formData.description,
      latitude: formData.latitude,
      longitude: formData.longitude,
    };

    try {
      const response = await fetch("https://backend-bfhealth.onrender.com/register_business", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(businessData),
      });

      if (response.ok) {
        const result = await response.json();
        toast.success(result.message);
        setFormData({
          business_owner: "",
          business_name: "",
          contact_number: "",
          email: "",
          address: "",
          business_type: "",
          description: "",
          latitude: "",
          longitude: "",
          useCurrentLocation: false,
        });
        setTimeout(() => navigate("/"), 2000);
      } else {
        toast.error("Failed to register business");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred while registering the business");
    }
  };

  const handleUseCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userCoords = [
            position.coords.longitude,
            position.coords.latitude,
          ];
          setCoordinates(userCoords, true);
          window.updateMapView(userCoords[0], userCoords[1]);
          setIsPinPlaced(true);
          toast.success("Location detected successfully!");
        },
        (error) => {
          console.error("Geolocation error: ", error);
          toast.error("Unable to detect location. Please place a pin manually.");
        },
        {
          enableHighAccuracy: true,
        }
      );
    } else {
      toast.error("Geolocation is not supported by this browser.");
    }
  };

  const nextStep = () => {
    // Validation for each step
    if (currentStep === 1) {
      if (!formData.business_owner || !formData.business_name) {
        toast.warning("Please fill in all business information fields");
        return;
      }
    } else if (currentStep === 2) {
      if (!formData.contact_number || !formData.email || !formData.address) {
        toast.warning("Please fill in all contact information fields");
        return;
      }
    } else if (currentStep === 3) {
      if (!formData.business_type || !formData.description) {
        toast.warning("Please fill in all business details");
        return;
      }
    } else if (currentStep === 4) {
      if (!formData.latitude || !formData.longitude) {
        toast.warning("Please set your business location on the map");
        return;
      }
    }
    setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const steps = [
    { number: 1, title: "Business Info", icon: faBuilding },
    { number: 2, title: "Contact Details", icon: faPhone },
    { number: 3, title: "Business Details", icon: faBriefcase },
    { number: 4, title: "Location", icon: faMapMarkerAlt },
    { number: 5, title: "Review", icon: faCheckCircle }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-12 px-4">
      <div className="container mx-auto max-w-5xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-0.5 bg-blue-500"></div>
            <p className="text-sm font-semibold text-gray-600 uppercase tracking-wider">
              Join Our Network
            </p>
            <div className="w-12 h-0.5 bg-blue-500"></div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Register Your Business
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Connect with nearby hospitals and healthcare facilities. Complete the form below to join our growing network.
          </p>
        </div>

        {/* Progress Steps */}
        <div className="mb-12">
          <div className="flex justify-between items-center max-w-4xl mx-auto">
            {steps.map((step, index) => (
              <React.Fragment key={step.number}>
                <div className="flex flex-col items-center">
                  <div
                    className={`w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center transition-all duration-300 ${
                      currentStep >= step.number
                        ? 'bg-blue-500 text-white shadow-lg scale-110'
                        : 'bg-gray-200 text-gray-400'
                    }`}
                  >
                    <FontAwesomeIcon icon={step.icon} className="text-lg md:text-xl" />
                  </div>
                  <p className={`text-xs md:text-sm mt-2 font-medium ${
                    currentStep >= step.number ? 'text-blue-500' : 'text-gray-400'
                  }`}>
                    {step.title}
                  </p>
                </div>
                {index < steps.length - 1 && (
                  <div className="flex-1 h-1 mx-2 md:mx-4">
                    <div className={`h-full rounded transition-all duration-300 ${
                      currentStep > step.number ? 'bg-blue-500' : 'bg-gray-200'
                    }`}></div>
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Step 1: Business Information */}
            {currentStep === 1 && (
              <div className="space-y-6 animate-fadeIn">
                <div className="text-center mb-8">
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                    Business Information
                  </h2>
                  <p className="text-gray-600">Tell us about your business</p>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">
                      <FontAwesomeIcon icon={faUser} className="mr-2 text-blue-500" />
                      Business Owner <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="business_owner"
                      placeholder="e.g., Jane Doe"
                      value={formData.business_owner}
                      onChange={handleChange}
                      className="w-full p-4 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">
                      <FontAwesomeIcon icon={faBuilding} className="mr-2 text-blue-500" />
                      Business Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="business_name"
                      value={formData.business_name}
                      placeholder="e.g., UrbanBazaar Fashion Line"
                      onChange={handleChange}
                      className="w-full p-4 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
                      required
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Contact Information */}
            {currentStep === 2 && (
              <div className="space-y-6 animate-fadeIn">
                <div className="text-center mb-8">
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                    Contact Information
                  </h2>
                  <p className="text-gray-600">How can we reach you?</p>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">
                      <FontAwesomeIcon icon={faPhone} className="mr-2 text-blue-500" />
                      Contact Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="contact_number"
                      value={formData.contact_number}
                      placeholder="e.g., +254712345678"
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
                      value={formData.email}
                      placeholder="e.g., janedoe@example.com"
                      onChange={handleChange}
                      className="w-full p-4 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">
                      <FontAwesomeIcon icon={faMapMarkerAlt} className="mr-2 text-blue-500" />
                      Physical Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      placeholder="e.g., 123 Main Street, Nairobi, Kenya"
                      onChange={handleChange}
                      className="w-full p-4 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
                      required
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Business Details */}
            {currentStep === 3 && (
              <div className="space-y-6 animate-fadeIn">
                <div className="text-center mb-8">
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                    Business Details
                  </h2>
                  <p className="text-gray-600">Tell us more about what you do</p>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">
                      <FontAwesomeIcon icon={faBriefcase} className="mr-2 text-blue-500" />
                      Business Type <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="business_type"
                      value={formData.business_type}
                      placeholder="e.g., Clothing Store, Fashion Boutique, Apparel Shop"
                      onChange={handleChange}
                      className="w-full p-4 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">
                      <FontAwesomeIcon icon={faFileAlt} className="mr-2 text-blue-500" />
                      Business Description <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      name="description"
                      value={formData.description}
                      placeholder="Describe your business, products, or services..."
                      onChange={handleChange}
                      rows="5"
                      className="w-full p-4 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors resize-none"
                      required
                    />
                    <p className="text-sm text-gray-500 mt-2">
                      {formData.description.length} characters
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Location */}
            {currentStep === 4 && (
              <div className="space-y-6 animate-fadeIn">
                <div className="text-center mb-8">
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                    Set Your Location
                  </h2>
                  <p className="text-gray-600">Help us locate your business on the map</p>
                </div>

                {/* Location Instructions */}
                <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-lg mb-6">
                  <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                    <FontAwesomeIcon icon={faMapPin} className="mr-2 text-blue-500" />
                    Location Instructions
                  </h3>
                  <ul className="space-y-2 text-gray-700 text-sm">
                    <li className="flex items-start">
                      <span className="text-blue-500 mr-2">•</span>
                      <span>Click "Use Current Location" to automatically detect your position</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-500 mr-2">•</span>
                      <span>Or click anywhere on the map to manually place a pin at your business location</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-500 mr-2">•</span>
                      <span>You can adjust the pin by clicking again on a different location</span>
                    </li>
                  </ul>
                </div>

                {/* Location Button */}
                <button
                  type="button"
                  onClick={handleUseCurrentLocation}
                  className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white p-4 rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl font-semibold flex items-center justify-center gap-2"
                >
                  <FontAwesomeIcon icon={faMapMarkerAlt} />
                  Use Current Location
                </button>

                {/* Map */}
                <div className="h-[400px] md:h-[500px] rounded-xl overflow-hidden shadow-lg border-4 border-gray-200">
                  <MapView setCoordinates={setCoordinates} canPlacePin={true} />
                </div>

                {/* Location Status */}
                <div className={`p-4 rounded-lg text-center ${
                  isPinPlaced 
                    ? 'bg-green-50 border-2 border-green-200' 
                    : 'bg-yellow-50 border-2 border-yellow-200'
                }`}>
                  <p className={`font-medium ${
                    isPinPlaced ? 'text-green-700' : 'text-yellow-700'
                  }`}>
                    {isPinPlaced 
                      ? '✓ Location set successfully! You can adjust it by clicking on the map again.'
                      : '⚠ Please set your business location by clicking on the map or using current location.'}
                  </p>
                </div>

                {/* Coordinates Display */}
                {isPinPlaced && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-700 font-semibold mb-2">Latitude</label>
                      <input
                        type="text"
                        name="latitude"
                        value={formData.latitude}
                        readOnly
                        className="w-full p-3 border-2 border-gray-200 rounded-lg bg-gray-50"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 font-semibold mb-2">Longitude</label>
                      <input
                        type="text"
                        name="longitude"
                        value={formData.longitude}
                        readOnly
                        className="w-full p-3 border-2 border-gray-200 rounded-lg bg-gray-50"
                      />
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Step 5: Review */}
            {currentStep === 5 && (
              <div className="space-y-6 animate-fadeIn">
                <div className="text-center mb-8">
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                    Review Your Information
                  </h2>
                  <p className="text-gray-600">Please verify all details before submitting</p>
                </div>

                <div className="space-y-4">
                  {/* Business Information */}
                  <div className="bg-gray-50 p-6 rounded-lg border-2 border-gray-200">
                    <h3 className="font-bold text-lg text-gray-900 mb-4 flex items-center">
                      <FontAwesomeIcon icon={faBuilding} className="mr-2 text-blue-500" />
                      Business Information
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-gray-600">Business Owner</p>
                        <p className="font-semibold text-gray-900">{formData.business_owner}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Business Name</p>
                        <p className="font-semibold text-gray-900">{formData.business_name}</p>
                      </div>
                    </div>
                  </div>

                  {/* Contact Information */}
                  <div className="bg-gray-50 p-6 rounded-lg border-2 border-gray-200">
                    <h3 className="font-bold text-lg text-gray-900 mb-4 flex items-center">
                      <FontAwesomeIcon icon={faPhone} className="mr-2 text-blue-500" />
                      Contact Information
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-gray-600">Phone Number</p>
                        <p className="font-semibold text-gray-900">{formData.contact_number}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Email</p>
                        <p className="font-semibold text-gray-900">{formData.email}</p>
                      </div>
                      <div className="md:col-span-2">
                        <p className="text-gray-600">Address</p>
                        <p className="font-semibold text-gray-900">{formData.address}</p>
                      </div>
                    </div>
                  </div>

                  {/* Business Details */}
                  <div className="bg-gray-50 p-6 rounded-lg border-2 border-gray-200">
                    <h3 className="font-bold text-lg text-gray-900 mb-4 flex items-center">
                      <FontAwesomeIcon icon={faBriefcase} className="mr-2 text-blue-500" />
                      Business Details
                    </h3>
                    <div className="space-y-3 text-sm">
                      <div>
                        <p className="text-gray-600">Business Type</p>
                        <p className="font-semibold text-gray-900">{formData.business_type}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Description</p>
                        <p className="font-semibold text-gray-900">{formData.description}</p>
                      </div>
                    </div>
                  </div>

                  {/* Location */}
                  <div className="bg-gray-50 p-6 rounded-lg border-2 border-gray-200">
                    <h3 className="font-bold text-lg text-gray-900 mb-4 flex items-center">
                      <FontAwesomeIcon icon={faMapMarkerAlt} className="mr-2 text-blue-500" />
                      Location
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-gray-600">Latitude</p>
                        <p className="font-semibold text-gray-900">{formData.latitude}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Longitude</p>
                        <p className="font-semibold text-gray-900">{formData.longitude}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Terms */}
                <div className="bg-blue-50 p-6 rounded-lg border-2 border-blue-200">
                  <p className="text-sm text-gray-700">
                    By submitting this form, you agree to our terms of service and privacy policy. 
                    We will use your information to connect you with nearby healthcare facilities 
                    and improve our services.
                  </p>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between items-center pt-8 border-t-2 border-gray-200">
              {currentStep > 1 ? (
                <button
                  type="button"
                  onClick={prevStep}
                  className="flex items-center gap-2 px-8 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-all duration-300 font-semibold"
                >
                  <FontAwesomeIcon icon={faArrowLeft} />
                  Previous
                </button>
              ) : (
                <div></div>
              )}

              {currentStep < 5 ? (
                <button
                  type="button"
                  onClick={nextStep}
                  className="flex items-center gap-2 px-8 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl ml-auto"
                >
                  Next
                  <FontAwesomeIcon icon={faArrowRight} />
                </button>
              ) : (
                <button
                  type="submit"
                  className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:from-green-600 hover:to-green-700 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl ml-auto"
                >
                  <FontAwesomeIcon icon={faCheckCircle} />
                  Submit Registration
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Help Section */}
        <div className="mt-8 text-center">
          <p className="text-gray-600">
            Need help? <a href="/contact" className="text-blue-500 hover:underline font-semibold">Contact our support team</a>
          </p>
        </div>
      </div>

      {/* Toast notifications container */}
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

export default RegisterBusiness;