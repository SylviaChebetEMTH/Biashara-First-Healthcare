import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

const HospitalModal = ({ isOpen, onClose, hospitals, selectedBusiness }) => {
  if (!isOpen || !selectedBusiness) return null;

  const handleHospitalClick = (hospitalCoords) => {
    const businessCoords = [selectedBusiness.latitude, selectedBusiness.longitude];
    const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&origin=${businessCoords[0]},${businessCoords[1]}&destination=${hospitalCoords[1]},${hospitalCoords[0]}&travelmode=driving`;
    window.open(googleMapsUrl, "_blank");
    onClose();
  };

  return (
    <div 
      className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-50 p-4"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[85vh] overflow-hidden transform transition-all duration-300 scale-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-[#403343] to-[#584d5c] px-8 py-6 relative overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full -ml-12 -mb-12"></div>
          
          <div className="relative flex justify-between items-start">
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center flex-shrink-0 border border-white/20">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <div>
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
                  Nearby Healthcare Facilities
                </h3>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <p className="text-white/90 text-sm md:text-base font-medium">
                    {selectedBusiness.business_name}
                  </p>
                </div>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-10 h-10 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-lg text-white transition-all duration-300 flex items-center justify-center border border-white/20 hover:scale-110"
              aria-label="Close modal"
            >
              <FontAwesomeIcon icon={faTimes} className="text-lg" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="overflow-y-auto max-h-[calc(85vh-200px)] bg-gray-50">
          {hospitals.length > 0 ? (
            <div className="p-6 md:p-8">
              {/* Summary Card */}
              <div className="bg-white rounded-xl p-4 mb-6 border border-gray-200 shadow-sm">
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#403343]/10 rounded-lg flex items-center justify-center">
                      <svg className="w-5 h-5 text-[#403343]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 font-medium">Found</p>
                      <p className="text-2xl font-bold text-[#403343]">{hospitals.length}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                      <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 font-medium">Nearest</p>
                      <p className="text-2xl font-bold text-green-600">{hospitals[0]?.distance.toFixed(1)} km</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Hospital Cards */}
              <div className="space-y-3">
                {hospitals.map(({ hospitalFeature, distance }, index) => (
                  <div
                    key={index}
                    className="group relative bg-white border-2 border-gray-200 rounded-xl overflow-hidden hover:border-[#403343] hover:shadow-xl transition-all duration-300 cursor-pointer"
                    onClick={() => handleHospitalClick([
                      hospitalFeature.geometry.coordinates[0],
                      hospitalFeature.geometry.coordinates[1]
                    ])}
                  >
                    {/* Ranking Badge */}
                    <div className="absolute top-4 left-4 w-8 h-8 bg-[#403343] text-white rounded-full flex items-center justify-center text-sm font-bold shadow-lg z-10">
                      {index + 1}
                    </div>

                    <div className="p-5 md:p-6 pl-16">
                      <div className="flex items-center justify-between gap-4 flex-wrap">
                        <div className="flex-1 min-w-0">
                          {/* Hospital Name */}
                          <div className="flex items-start gap-3 mb-3">
                            <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                              <svg className="w-6 h-6 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1.323l3.954 1.582 1.599-.8a1 1 0 01.894 1.79l-1.233.616 1.738 5.42a1 1 0 01-.285 1.05A3.989 3.989 0 0115 15a3.989 3.989 0 01-2.667-1.019 1 1 0 01-.285-1.05l1.715-5.349L11 6.477V16h2a1 1 0 110 2H7a1 1 0 110-2h2V6.477L6.237 7.582l1.715 5.349a1 1 0 01-.285 1.05A3.989 3.989 0 015 15a3.989 3.989 0 01-2.667-1.019 1 1 0 01-.285-1.05l1.738-5.42-1.233-.617a1 1 0 01.894-1.788l1.599.799L9 4.323V3a1 1 0 011-1zm-5 8.274l-.818 2.552c.25.112.526.174.818.174.292 0 .569-.062.818-.174L5 10.274zm10 0l-.818 2.552c.25.112.526.174.818.174.292 0 .569-.062.818-.174L15 10.274z" clipRule="evenodd" />
                              </svg>
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="text-lg md:text-xl font-bold text-gray-900 group-hover:text-[#403343] transition-colors mb-1 truncate">
                                {hospitalFeature.properties.name}
                              </h4>
                              <p className="text-sm text-gray-500 font-medium">Healthcare Facility</p>
                            </div>
                          </div>

                          {/* Distance Info */}
                          <div className="flex items-center gap-4 flex-wrap">
                            <div className="flex items-center gap-2 px-3 py-1.5 bg-[#403343]/5 rounded-lg">
                              <svg className="w-4 h-4 text-[#403343]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                              </svg>
                              <span className="text-sm font-semibold text-[#403343]">
                                {distance.toFixed(2)} km
                              </span>
                            </div>
                            <div className="flex items-center gap-2 px-3 py-1.5 bg-blue-50 rounded-lg">
                              <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                              <span className="text-sm font-semibold text-blue-600">
                                ~{Math.ceil(distance * 2)} min
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Action Button */}
                        <button className="inline-flex items-center gap-2 px-6 py-3 bg-[#403343] text-white rounded-xl text-sm font-semibold group-hover:bg-[#584d5c] transition-all duration-300 shadow-lg group-hover:shadow-xl whitespace-nowrap">
                          <span>Get Directions</span>
                          <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </button>
                      </div>
                    </div>

                    {/* Hover Indicator */}
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#403343] to-[#584d5c] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="p-12 md:p-16 text-center">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h4 className="text-2xl font-bold text-gray-900 mb-3">
                No Hospitals Found Nearby
              </h4>
              <p className="text-gray-600 text-lg mb-2">
                There are no healthcare facilities within 10km of this location.
              </p>
              <p className="text-sm text-gray-500">
                Try selecting a different business or expand your search radius.
              </p>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="bg-white px-6 md:px-8 py-5 border-t border-gray-200">
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div className="flex items-start gap-3">
              <svg className="w-5 h-5 text-[#403343] flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              <p className="text-sm text-gray-600 leading-relaxed">
                Click on any hospital card to open Google Maps directions from your business location.
              </p>
            </div>
            <button
              onClick={onClose}
              className="px-6 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-semibold transition-all duration-300 border border-gray-300 whitespace-nowrap"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HospitalModal;