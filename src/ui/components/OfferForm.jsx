import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import ImageUploader from './ImageUploader.jsx';
import OfferSection from './form/OfferSection.jsx';
import CompanySection from './form/CompanySection.jsx';
import ContactSection from './form/ContactSection.jsx';

export const OfferForm = ({ offerData = {}, onSubmit, isEdit = false, isView = false }) => {
  const today = new Date().toISOString().split('T')[0];

  const [offer, setOffer] = useState({
    status: 'SENDING',
    isLiked: false,

    sendAt: today,
    offerName: '',
    location: '',
    salary: '',
    remoteWork: 'ONSITE',
    techStack: [], 
    contractType: 'CDI',
    experienceRequired: '',
    startDate: '',
    offerSource: '',
    
    contactName: '',
    contactEmail: '',
    contactPhone: '',
    applicationInfo: '',
    feelingType: 'NEUTRAL',
    
    companyName: '',
    companyLink: '',
    domain: '',
    scheduleType: 'FLEXIBLE',
    benefits: '',
    commuteTime: '',
    
    notes: '',
    showInterviewDate: false,
    interviewDate: '',
    showRelaunchDate: false,
    relaunchDate: '',
    imageData: offerData.imageData || '',
    
    ...offerData
  });
  const navigate = useNavigate();
  const previousOfferDataRef = useRef(offerData);

  useEffect(() => {
    if (JSON.stringify(offerData) !== JSON.stringify(previousOfferDataRef.current)) {
      setOffer(prevState => ({
        ...prevState,
        ...offerData
      }));
      previousOfferDataRef.current = offerData;
    }
  }, [offerData]);


  const handleSubmit = (event) => {
    event.preventDefault();
    if (!isView) {
      const formData = { ...offer };
      if (offer.imageData) {
        formData.imageData = offer.imageData;
      }
      onSubmit(formData);  
      navigate('/offer');
    }
  };

  const handleCancel = () => {
    navigate('/offer');
  };

  const handleCheckboxChange = (fieldName) => {
    setOffer((prevState) => {
      const newState = { ...prevState, [fieldName]: !prevState[fieldName] };

      if (fieldName === 'showRelaunchDate' && !newState[fieldName]) {
        newState.relaunchDate = '';
      }
      if (fieldName === 'showInterviewDate' && !newState[fieldName]) {
        newState.interviewDate = '';
      }
  
      return newState;
    });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setOffer((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleImageUpload = (imageData) => {
    setOffer((prevState) => ({
      ...prevState,
      imageData
    }));
  };


  return (
    <form onSubmit={handleSubmit} className="space-y-6 mt-6">
      <div className="flex justify-end space-x-4 mt-4">
        {!isView && (
          <button type="submit" className="btn bg-gradient-to-r from-success-500 to-success-700 sm:w-auto">
            {isEdit ? <i className="fa-solid fa-floppy-disk"></i> : <i className="fa-solid fa-floppy-disk"></i>}
          </button>
        )}
        <button type="button" onClick={handleCancel} className="btn bg-gray-500 sm:w-auto">
          {isView ? <i className="fa-solid fa-arrow-left"></i> : <i className="fa-solid fa-xmark"></i>}
        </button>
      </div>

      <main>
      <OfferSection offer={offer} setOffer={setOffer} handleInputChange={handleInputChange} isView={isView} />

      <CompanySection offer={offer} handleInputChange={handleInputChange} isView={isView} />

      <ContactSection offer={offer} handleInputChange={handleInputChange} isView={isView} />

        <section className="mb-8 border-2 border-gray-500 rounded-lg p-8">
          <h3 className="text-2xl font-bold mb-4">Suivi</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label>
                <input 
                  type="checkbox" 
                  onChange={() => handleCheckboxChange('showInterviewDate')}
                  checked={offer.showInterviewDate}
                  disabled={isView}
                  className="checkbox checkbox-primary mr-1 checkbox-sm"
                /> 
                Entretien
              </label>

              {offer.showInterviewDate && (
                <input
                  type="date"
                  name="interviewDate"
                  value={offer.interviewDate || ''} 
                  onChange={handleInputChange}
                  className="input input-bordered w-full"
                  disabled={isView}
                />
              )}
            </div>

            <div className="space-y-2">
              <label>
                <input 
                  type="checkbox" 
                  onChange={() => handleCheckboxChange('showRelaunchDate')}
                  checked={offer.showRelaunchDate}
                  disabled={isView}
                  className="checkbox checkbox-primary mr-1 checkbox-sm"
                /> 
                Relance
              </label>

              {offer.showRelaunchDate && (
                <input
                  type="date"
                  name="relaunchDate"
                  value={offer.relaunchDate || ''} 
                  onChange={handleInputChange}
                  className="input input-bordered w-full"
                  disabled={isView}
                />
              )}
            </div>
          </div>

          <div className="space-y-2">
            <label>Notes :</label>
            <textarea
              name="notes"
              value={offer.notes}
              onChange={handleInputChange}
              className="textarea textarea-bordered w-full min-h-64"
              disabled={isView}
            />
          </div>
        </section>
      </main>

      <section className="mb-8 border-2 border-gray-500 rounded-lg p-8">
        <h3 className="text-2xl font-bold mb-4">Image</h3>
        <ImageUploader
          onImageUpload={handleImageUpload}
          isView={isView}
          initialImageData={offer.imageData}
        />
      </section>
      
    </form>
  );
};
