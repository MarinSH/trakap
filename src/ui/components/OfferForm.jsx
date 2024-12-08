import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { CONFIG_TECH_STACK, CONFIG_REMOTE_WORK, CONTRACT_TYPES, SCHEDULE_TYPES, FEELING_TYPES } from '../../utils/config.js';
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
    salary: '',
    status: 'SENDING',
    isLiked: false,
    notes: '',
    sendAt: today,
    techStack: [], 
    remoteWork: 'ONSITE',
    imageData: '',
    interviewDate: '',
    showInterviewDate: false,
    relaunchDate: '',
    showRelaunchDate: false,
    offerLink: '',
    offerSource: '',
    experienceRequired: '',
    contractType: 'CDI',
    domain: '',
    startDate: '',
    commuteTime: '',
    benefits: '',
    applicationInfo: '',
    companyLink: '',
    feelingType: 'NEUTRAL',
    scheduleType: 'FLEXIBLE',
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
      {/* ################################# offer ################################# */}
        <section className="mb-8 border-2 border-gray-500 rounded-lg p-8">
          <h3 className="text-2xl font-bold mb-4">Offre</h3>
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
              <label>Télétravail :</label>
              <RemoteWorkSelect 
              value={remoteWork} 
              onChange={handleRemoteWorkChange} 
              isView={isView}
              />
            </div>

            <div className="space-y-2">
              <label>Technologies utilisées :</label>
              <TechStackSelect 
              value={techStack} 
              onChange={handleTechStackChange} 
              options={CONFIG_TECH_STACK} 
              isView={isView} 
              />
            </div>

            <div className="space-y-2">
              <label>Lien de l'offre :</label>
              {!isView ? (
                <input
                  type="url"
                  name="offerLink"
                  value={offer.offerLink}
                  onChange={handleInputChange}
                  className="input input-bordered w-full"
                />
              ) : (
                offer.offerLink && (
                  <div className="space-y-2 mt-2">
                    <button
                      type="button"
                      onClick={() => window.open(offer.offerLink, "_blank")}
                      className="btn bg-gradient-to-r from-gray-500 to-gray-700 sm:w-auto"
                    >
                      Voir l'offre
                    </button>
                  </div>
                )
              )}
            </div>

            <div className="space-y-2">
              <label>Platform où vous avez trouvé l'offre :</label>
              <input
                type="text"
                name="offerSource"
                value={offer.offerSource}
                onChange={handleInputChange}
                className="input input-bordered w-full"
                disabled={isView}
              />
            </div>

            <div className="space-y-2">
              <label>Expérience demandée :</label>
              <input
                type="text"
                name="experienceRequired"
                value={offer.experienceRequired}
                onChange={handleInputChange}
                className="input input-bordered w-full"
                disabled={isView}
              />
            </div>

            <div className="space-y-2">
              <label>Type de contrat :</label>
              <select
                name="contractType"
                value={offer.contractType}
                onChange={handleInputChange}
                className="select select-bordered w-full"
                disabled={isView}
              >
                {CONTRACT_TYPES.map((contract) => (
                  <option key={contract.value} value={contract.value}>
                    {contract.label}
                  </option>
                ))}
              </select>
            </div>

            
            <div className="space-y-2">
              <label>Date de démarrage souhaitée :</label>
              <input
                type="date"
                name="startDate"
                value={offer.startDate}
                onChange={handleInputChange}
                className="input input-bordered w-full"
                disabled={isView}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label>Informations fournies lors de la candidature :</label>
            <textarea
              name="applicationInfo"
              value={offer.applicationInfo}
              onChange={handleInputChange}
              className="textarea textarea-bordered w-full min-h-64"
              disabled={isView}
            />
          </div>
        </section>

      {/* ################################# company ################################# */}
        <section className="mb-8 border-2 border-gray-500 rounded-lg p-8">
          <h3 className="text-2xl font-bold mb-4">Entreprise</h3>

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
              <label>Lien du site de l'entreprise :</label>
              {!isView ? (
                <input
                  type="url"
                  name="companyLink"
                  value={offer.companyLink}
                  onChange={handleInputChange}
                  className="input input-bordered w-full"
                />
              ) : (
                offer.companyLink && (
                  <div className="space-y-2 mt-2">
                    <button
                      type="button"
                      onClick={() => window.open(offer.companyLink, "_blank")}
                      className="btn bg-gradient-to-r from-gray-500 to-gray-700 sm:w-auto"
                    >
                      Voir le site de l'entreprise
                    </button>
                  </div>
                )
              )}
            </div>

            <div className="space-y-2">
              <label>Domaine d'activité :</label>
              <input
                type="text"
                name="domain"
                value={offer.domain}
                onChange={handleInputChange}
                className="input input-bordered w-full"
                disabled={isView}
              />
            </div>

            <div className="space-y-2">
              <label>Horaire :</label>
              <select
                name="scheduleType"
                value={offer.scheduleType}
                onChange={handleInputChange}
                className="select select-bordered w-full"
                disabled={isView}
              >
                {SCHEDULE_TYPES.map((schedule) => (
                  <option key={schedule.value} value={schedule.value}>
                    {schedule.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label>Temps du trajet :</label>
              <input
                type="text"
                name="commuteTime"
                value={offer.commuteTime}
                onChange={handleInputChange}
                className="input input-bordered w-full"
                disabled={isView}
              />
            </div>

            <div className="space-y-2">
              <label>Avantages :</label>
              <input
                type="text"
                name="benefits"
                value={offer.benefits}
                onChange={handleInputChange}
                className="input input-bordered w-full"
                disabled={isView}
              />
            </div>
          </div>
        </section>

        {/* ################################# contact #################################*/}
        <section className="mb-8 border-2 border-gray-500 rounded-lg p-8">
          <h3 className="text-2xl font-bold mb-4">Contact</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            
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
              <label>Feeling :</label>
              <select
                name="feelingType"
                value={offer.feelingType}
                onChange={handleInputChange}
                className="select select-bordered w-full"
                disabled={isView}
              >
                {FEELING_TYPES.map((feeling) => (
                  <option key={feeling.value} value={feeling.value}>
                    {feeling.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </section>

        {/* ################################# tracker ################################# */}
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
