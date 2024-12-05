import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { CONFIG_TECH_STACK, CONFIG_REMOTE_WORK } from '../../utils/config.js';
import RemoteWorkSelect from './RemoteWorkSelect.jsx';
import TechStackSelect from './TechStackSelect.jsx';

export const OfferForm = ({ offerData = {}, onSubmit, isEdit = false, isView = false }) => {
  const today = new Date().toISOString().split('T')[0];

  const [offer, setOffer] = useState({
    companyName: '',
    offerName: '',
    location: '',
    contactName: '',
    contactEmail: '',
    contactPhone: '',
    interviewDate: '',
    salary: '',
    status: 'SENDING',
    notes: '',
    sendAt: today,
    techStack: [], 
    remoteWork: 'ONSITE',
    imageData: '',
    showInterviewDate: false,
    ...offerData
  });

  const [remoteWork, setRemoteWork] = useState(offer.remoteWork);  
  const [techStack, setTechStack] = useState(offer.techStack); 
  const [selectedFile, setSelectedFile] = useState(null); 
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

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setOffer(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };



  const handleRemoteWorkChange = (value) => {
    setRemoteWork(value);
    handleInputChange({ target: { name: 'remoteWork', value } });  
  };

  const handleTechStackChange = (newValues) => {
    console.log("Tech stack selected:", newValues);
    setTechStack(newValues);
    setOffer(prevState => ({
      ...prevState,
      techStack: newValues,
    }));
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setOffer(prevState => ({
          ...prevState,
          imageData: reader.result
        }));
        setSelectedFile(file);
      };
      reader.readAsDataURL(file);
    }
  };

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

  const handleCheckboxChange = () => {
    setOffer(prevState => ({
      ...prevState,
      showInterviewDate: !prevState.showInterviewDate
    }));
  };
  return (
    <form onSubmit={handleSubmit} className="space-y-6 mt-6">
  <div className="flex justify-end space-x-4 mt-4">
    {!isView && (
      <button type="submit" className="btn btn-success sm:w-auto">
        {isEdit ? <i className="fa-solid fa-floppy-disk"></i> : <i className="fa-solid fa-floppy-disk"></i>}
      </button>
    )}
    <button type="button" onClick={handleCancel} className="btn bg-gray-500 sm:w-auto">
      {isView ? <i className="fa-solid fa-arrow-left"></i> : <i className="fa-solid fa-xmark"></i>}
    </button>
  </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label>Date d'envoi :</label>
          <input
            type="date"
            name="sendAt"
            value={offer.sendAt}
            onChange={handleInputChange}
            className="input input-bordered w-full"
            disabled={isView}
          />
        </div>

      <div className="space-y-2">
        <label>Nom de l'entreprise :</label>
        <input
          type="text"
          name="companyName"
          value={offer.companyName}
          onChange={handleInputChange}
          className="input input-bordered w-full"
          required
          disabled={isView}
        />
      </div>

      <div className="space-y-2">
        <label>Nom de l'offre :</label>
        <input
          type="text"
          name="offerName"
          value={offer.offerName}
          onChange={handleInputChange}
          className="input input-bordered w-full"
          disabled={isView}
        />
      </div>

      <div className="space-y-2">
        <label>Lieu :</label>
        <input
          type="text"
          name="location"
          value={offer.location}
          onChange={handleInputChange}
          className="input input-bordered w-full"
          disabled={isView}
        />
      </div>

      <div className="space-y-2">
        <label>Salaire :</label>
        <input
          type="text"
          name="salary"
          value={offer.salary}
          onChange={handleInputChange}
          className="input input-bordered w-full"
          disabled={isView}
        />
      </div>

      <div className="space-y-2">
          <label>Nom du contact :</label>
          <input
            type="text"
            name="contactName"
            value={offer.contactName}
            onChange={handleInputChange}
            className="input input-bordered w-full"
            disabled={isView}
          />
        </div>

        <div className="space-y-2">
          <label>Email du contact :</label>
          <input
            type="email"
            name="contactEmail"
            value={offer.contactEmail}
            onChange={handleInputChange}
            className="input input-bordered w-full"
            disabled={isView}
          />
        </div>

        <div className="space-y-2">
          <label>Téléphone du contact :</label>
          <input
            type="tel"
            name="contactPhone"
            value={offer.contactPhone}
            onChange={handleInputChange}
            className="input input-bordered w-full"
            disabled={isView}
          />
        </div>
        
        <div className="space-y-2">
        <label>
          <input 
            type="checkbox" 
            onChange={handleCheckboxChange}
            checked={offer.showInterviewDate}
            disabled={isView}
            className="checkbox checkbox-primary mr-1 checkbox-sm"
          /> 
          Entretien prévu
        </label>

        {offer.showInterviewDate && !isView && (
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
      
        <RemoteWorkSelect 
          value={remoteWork} 
          onChange={handleRemoteWorkChange} 
          isView={isView}
        />

        <TechStackSelect 
          value={techStack} 
          onChange={handleTechStackChange} 
          options={CONFIG_TECH_STACK} 
          isView={isView} 
        />


        <div className="space-y-2">
          <label>Notes :</label>
          <textarea
            name="notes"
            value={offer.notes}
            onChange={handleInputChange}
            className="textarea textarea-bordered w-full"
            disabled={isView}
          />
        </div>

  </div>

        {offer.imageData && isView ? (
            <img src={offer.imageData} alt="Offer" className="w-full rounded-lg shadow-lg" />
          ) : (
            !isView && (
              <div className="flex items-center space-x-4">
                <label
                  htmlFor="file-upload"
                  className="cursor-pointer inline-flex items-center justify-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all"
                >
                  <i className="fas fa-upload mr-2"></i> Choisir une image
                </label>
                <input
                  id="file-upload"
                  type="file"
                  name="image"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
                <span className="text-gray-500">
                  {selectedFile ? selectedFile.name : 'Aucun fichier choisi'}
                </span>
              </div>
            )
          )}
      
    </form>
  );
};
