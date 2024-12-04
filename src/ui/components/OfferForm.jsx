import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { CONFIG_TECH_STACK, CONFIG_REMOTE_WORK } from '../../utils/config';

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
    status: 'PENDING',
    notes: '',
    sendAt: today,
    techStack: [], 
    remoteWork: CONFIG_REMOTE_WORK[0].value,
    imageData: '',
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

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setOffer(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (event) => {
    const { name, value, checked } = event.target;
    setOffer(prevState => ({
      ...prevState,
      [name]: checked ? [...prevState[name], value] : prevState[name].filter(item => item !== value),
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

  return (
    <form onSubmit={handleSubmit} className="space-y-6 mt-6">
    {!isView && (
        <button type="submit" className="btn btn-success w-full sm:w-auto">
          {isEdit ? 'Modifier l\'offre' : 'Ajouter l\'offre'}
        </button>
      )}

      <button type="button" onClick={handleCancel} className="btn btn-secondary w-full sm:w-auto mt-4">
        {isView ? 'Retour' : 'Annuler'}
      </button>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
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
          <label>Notes :</label>
          <textarea
            name="notes"
            value={offer.notes}
            onChange={handleInputChange}
            className="textarea textarea-bordered w-full"
            disabled={isView}
          />
        </div>

        <div className="space-y-2">
          <label>Travail à distance :</label>
          <select
            name="remoteWork"
            value={offer.remoteWork}
            onChange={handleInputChange}
            className="input input-bordered w-full"
            disabled={isView}
          >
            {CONFIG_REMOTE_WORK.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        
        <div className="space-y-2">
          <label>Date de l'entretien :</label>
          <input
            type="date"
            name="interviewDate"
            value={offer.interviewDate}
            onChange={handleInputChange}
            className="input input-bordered w-full"
            disabled={isView}
          />
        </div>

        <div className="space-y-2">
          <label>Technologies utilisées :</label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {CONFIG_TECH_STACK.map((tech) => (
              <label key={tech} className="inline-flex items-center">
                <input
                  type="checkbox"
                  name="techStack"
                  value={tech}
                  onChange={handleCheckboxChange}
                  checked={offer.techStack.includes(tech)}
                  className="checkbox"
                  disabled={isView}
                />
                {tech}
              </label>
            ))}
          </div>
        </div>

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

        {offer.imageData && isView ? (
          <div className="space-y-2">
            <label>Image de l'offre :</label>
            <img src={offer.imageData} alt="Offer" className="w-full" />
          </div>
        ) : (
          !isView && (
            <div className="space-y-2">
              <label>Image de l'offre :</label>
              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={handleFileChange}
                className="input input-bordered w-full"
              />
            </div>
          )
        )}
      </div>

      
    </form>
  );
};
