import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

export const OfferForm = ({ offerData = {}, onSubmit, isEdit = false, isView = false }) => {
  const [offer, setOffer] = useState({
    companyName: '',
    offerName: '',
    location: '',
    contactName: '',
    contactEmail: '',
    contactPhone: '',
    interviewDate: '',
    salary: '',
    status: 'OPEN',
    notes: '',
    sendAt: '',
    techStack: [],
    remoteWork: 'ONSITE',
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

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!isView) {
      onSubmit(offer);
      navigate('/offer');
    }
  };

  const handleCancel = () => {
    navigate('/offer');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 mt-6">
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
          <label>Status :</label>
          <select
            name="status"
            value={offer.status}
            onChange={handleInputChange}
            className="input input-bordered w-full"
            disabled={isView}
          >
            <option value="OPEN">Ouvert</option>
            <option value="CLOSED">Fermé</option>
          </select>
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
        <div className="space-y-2 col-span-2">
          <label>Technologies utilisées :</label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {['ANGULAR', 'SYMFONY', 'REACT', 'VUE', 'DOCKER'].map((tech) => (
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
        <div className="space-y-2 col-span-2">
          <label>Travail à distance :</label>
          <select
            name="remoteWork"
            value={offer.remoteWork}
            onChange={handleInputChange}
            className="input input-bordered w-full"
            disabled={isView}
          >
            <option value="ONSITE">Pas de télétravail</option>
            <option value="ONEDAY">1 jour de télétravail</option>
            <option value="TWODAY">2 jours de télétravail</option>
            <option value="THREEDAY">3 jours de télétravail</option>
            <option value="FOURDAY">4 jours de télétravail</option>
            <option value="ALLDAY">Télétravail complet</option>
          </select>
        </div>
      </div>

      {!isView && (
        <button type="submit" className="btn btn-success w-full sm:w-auto">
          {isEdit ? 'Modifier l\'offre' : 'Ajouter l\'offre'}
        </button>
      )}

      <button type="button" onClick={handleCancel} className="btn btn-secondary w-full sm:w-auto mt-4">
        {isView ? 'Retour' : 'Annuler'}
      </button>
    </form>
  );
};
