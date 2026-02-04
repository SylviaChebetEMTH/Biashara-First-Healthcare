import React, { useState } from "react";
import MapView from "../components/MapView";
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock, FaHospital, FaInfoCircle } from "react-icons/fa";

const FindHospitals = () => {
    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <section className="bg-[#020234] text-white py-12 md:py-16">
                <div className="container mx-auto px-4">
                    <div className="max-w-3xl mx-auto text-center">
                        <div className="flex items-center justify-center gap-3 mb-4">
                            <FaMapMarkerAlt className="text-3xl text-[#3dd8c8]" />
                            <h1 className="text-3xl md:text-5xl font-bold">
                                Find Healthcare Providers
                            </h1>
                        </div>
                        <p className="text-base md:text-lg text-gray-300">
                            Use our interactive map to locate hospitals, clinics, and healthcare facilities
                            near your business location.
                        </p>
                    </div>
                </div>
            </section>


            {/* Info Banner */}
            <section className="bg-blue-50 border-b border-blue-100">
                <div className="container mx-auto px-4 py-3">
                    <div className="flex items-center gap-3 text-sm text-blue-800">
                        <FaInfoCircle className="flex-shrink-0" />
                        <p>
                            <strong>Tip:</strong> Click on any marker to view details and get directions.
                            Use the search bar to find specific facilities or locations.
                        </p>
                    </div>
                </div>
            </section>

            {/* Map Section */}
            <section className="py-6 md:py-8">
                <div className="container mx-auto px-4">
                    {/* Map Instructions */}
                    <div className="mb-4 bg-white p-4 rounded-lg shadow-sm">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                            <div>
                                <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-2">
                                    Interactive Hospital Map
                                </h2>
                                <p className="text-gray-600 text-sm">
                                    Explore healthcare facilities on the map. Click markers for more information
                                    or use the search to find specific locations.
                                </p>
                            </div>

                            {/* Legend */}
                            <div className="flex flex-wrap gap-4 text-sm">
                                <div className="flex items-center gap-2">
                                    <div className="w-4 h-4 rounded-full bg-red-500"></div>
                                    <span className="text-gray-700">Hospitals</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-4 h-4 rounded-full bg-blue-500"></div>
                                    <span className="text-gray-700">Businesses</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Map Container */}
                    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                        <div className="h-[500px] md:h-[600px] lg:h-[700px]">
                            <MapView
                                setCoordinates={setCoordinates}
                                canPlacePin={false}
                            />
                        </div>
                    </div>

                    {/* Map Features */}
                    <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                            <div className="flex items-start gap-4">
                                <div className="bg-blue-100 p-3 rounded-lg">
                                    <FaMapMarkerAlt className="text-2xl text-blue-600" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-gray-800 mb-1">Location Search</h3>
                                    <p className="text-sm text-gray-600">
                                        Search for hospitals by name or location using the search bar on the map
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                            <div className="flex items-start gap-4">
                                <div className="bg-green-100 p-3 rounded-lg">
                                    <FaClock className="text-2xl text-green-600" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-gray-800 mb-1">Real-time Information</h3>
                                    <p className="text-sm text-gray-600">
                                        View operating hours, contact details, and services offered by each facility
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                            <div className="flex items-start gap-4">
                                <div className="bg-purple-100 p-3 rounded-lg">
                                    <FaPhone className="text-2xl text-purple-600" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-gray-800 mb-1">Direct Directions</h3>
                                    <p className="text-sm text-gray-600">
                                        Get instant directions from your business to any healthcare facility
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-12 bg-gradient-to-r from-[#020234] to-[#030350]">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                        Don't See Your Hospital Listed?
                    </h2>
                    <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
                        Register your healthcare facility today to connect with businesses seeking
                        healthcare partnerships and increase your visibility.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">

                        <a href="/register-hospital"
                            className="inline-flex items-center justify-center gap-2 bg-[#3dd8c8] hover:bg-[#2bc4b4] text-[#020234] px-8 py-4 rounded-md font-semibold transition-all duration-300 shadow-lg"
                        >
                            <FaHospital />
                            Register Your Hospital
                        </a>

                        <a href="/contact"
                            className="inline-flex items-center justify-center gap-2 bg-white hover:bg-gray-100 text-[#020234] px-8 py-4 rounded-md font-semibold transition-all duration-300"
                        >
                            <FaPhone />
                            Contact Support
                        </a>
                    </div>
                </div>
            </section>

            {/* Help Section */}
            <section className="py-8 bg-gray-100">
                <div className="container mx-auto px-4">
                    <div className="max-w-3xl mx-auto text-center">
                        <h3 className="text-xl font-semibold text-gray-800 mb-4">
                            Need Help Finding the Right Healthcare Partner?
                        </h3>
                        <p className="text-gray-600 mb-6">
                            Our team is here to assist you in finding the perfect healthcare facilities
                            for your business needs.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center text-sm">
                            <a href="tel:+254790761708" className="flex items-center justify-center gap-2 text-[#020234] hover:text-[#3dd8c8]">
                                <FaPhone />
                                <span>+254 790 761 708</span>
                            </a>
                            <a href="mailto:hello@biasharafirsthealthcare.com" className="flex items-center justify-center gap-2 text-[#020234] hover:text-[#3dd8c8]">
                                <FaEnvelope />
                                <span>hello@biasharafirsthealthcare.com</span>
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default FindHospitals;