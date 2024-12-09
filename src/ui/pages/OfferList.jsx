import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import OfferCard from '../components/OfferCard.jsx';
import { STATUS_LABELS, CONTRACT_TYPES, CONFIG_TECH_STACK } from '../../utils/config.js';
import RemoteWorkSelect from '../components/RemoteWorkSelect.jsx';

export default function OfferList() {
  const [offers, setOffers] = useState([]);
  const [collapsedColumns, setCollapsedColumns] = useState({});
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRemoteWork, setSelectedRemoteWork] = useState('');
  const [selectedContractType, setSelectedContractType] = useState('');
  const [selectedTechStack, setSelectedTechStack] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchOffers();
    const savedColumns = JSON.parse(localStorage.getItem('collapsedColumns'));
    const savedFilters = JSON.parse(localStorage.getItem('filters'));
    
    if (savedColumns) {
      setCollapsedColumns(savedColumns);
    } else {
      const initialCollapsedState = Object.keys(STATUS_LABELS).reduce((acc, status) => {
        acc[status] = false;
        return acc;
      }, {});
      setCollapsedColumns(initialCollapsedState);
    }

    if (savedFilters) {
      setSearchQuery(savedFilters.searchQuery || '');
      setSelectedRemoteWork(savedFilters.selectedRemoteWork || '');
      setSelectedContractType(savedFilters.selectedContractType || '');
      setSelectedTechStack(savedFilters.selectedTechStack || '');
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('collapsedColumns', JSON.stringify(collapsedColumns));
  }, [collapsedColumns]);

  useEffect(() => {
    const filters = {
      searchQuery,
      selectedRemoteWork,
      selectedContractType,
      selectedTechStack,
    };
    localStorage.setItem('filters', JSON.stringify(filters));
  }, [searchQuery, selectedRemoteWork, selectedContractType, selectedTechStack]);

  async function fetchOffers() {
    const fetchedOffers = await window.api.getOffers();
    setOffers(fetchedOffers);
  }

  const handleViewOffer = (id) => {
    navigate(`/offer/view/${id}`);
  };

  const handleEditOffer = (id) => {
    navigate(`/offer/edit/${id}`);
  };

  const handleStatusChange = async (id, newStatus) => {
    const updatedOffer = offers.find(offer => offer.id === id);
    if (updatedOffer) {
      updatedOffer.status = newStatus;
      await window.api.updateOffer(updatedOffer);
      fetchOffers();
    }
  };

  const handleDrop = (event, newStatus) => {
    const offerId = event.dataTransfer.getData('offerId');
    handleStatusChange(offerId, newStatus);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const toggleCollapse = (status) => {
    setCollapsedColumns(prevState => ({
      ...prevState,
      [status]: !prevState[status],
    }));
  };

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedRemoteWork('');
    setSelectedContractType('');
    setSelectedTechStack('');
  };

  const statusGradients = {
    SENDING: 'bg-gradient-to-r from-primary-500 to-primary-700',
    INTERVIEW: 'bg-gradient-to-r from-secondary-500 to-secondary-700',
    PENDING: 'bg-gradient-to-r from-gray-500 to-gray-700',
    ACCEPTED: 'bg-gradient-to-r from-success-500 to-success-700',
    REJECTED: 'bg-gradient-to-r from-warning-500 to-warning-700',
  };

  const filteredOffers = offers.filter(offer => {
    return (
      (searchQuery === '' || 
        offer.companyName.toLowerCase().includes(searchQuery.toLowerCase()) || 
        offer.offerName.toLowerCase().includes(searchQuery.toLowerCase())) &&
      (selectedRemoteWork === '' || offer.remoteWork === selectedRemoteWork) &&
      (selectedContractType === '' || offer.contractType === selectedContractType) &&
      (selectedTechStack === '' || offer.techStack.includes(selectedTechStack))
    );
  });

  const groupedOffers = filteredOffers.reduce((acc, offer) => {
    if (!acc[offer.status]) {
      acc[offer.status] = [];
    }
    acc[offer.status].push(offer);
    return acc;
  }, {});

  const handleToggleLike = (offerId) => {
    setOffers((prevOffers) =>
      prevOffers.map((offer) =>
        offer.id === offerId ? { ...offer, isLiked: !offer.isLiked } : offer
      )
    );
  };

  return (
    <section className="py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-6">Kanban des offres</h1>

        <div className="mb-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <div>
            <button
              onClick={resetFilters}
              className="btn bg-gradient-to-r from-primary-500 to-secondary-500"
            >
              <i className="fa-solid fa-xmark"></i>
            </button>
          </div>
          <div>
            <input
              type="text"
              placeholder="Recherche par nom d'entreprise ou poste"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input input-bordered w-full"
            />
          </div>
          <div>
            <RemoteWorkSelect 
              value={selectedRemoteWork}
              onChange={(value) => setSelectedRemoteWork(value)}
            />
          </div>
          <div>
            <select
              value={selectedContractType}
              onChange={(e) => setSelectedContractType(e.target.value)}
              className="select select-bordered w-full"
            >
              <option value="">Type de contrat</option>
              {CONTRACT_TYPES.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <select
              value={selectedTechStack}
              onChange={(e) => setSelectedTechStack(e.target.value)}
              className="select select-bordered w-full"
            >
              <option value="">Stack technique</option>
              {CONFIG_TECH_STACK.map(option => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex justify-between space-x-2">
          {Object.keys(STATUS_LABELS).map(status => (
            <div
              key={status}
              className={`kanban-column rounded-lg shadow-md ${collapsedColumns[status] ? 'w-24' : 'w-1/4'} flex flex-col border border-gray-600 transition-all duration-200`} 
              onDrop={(event) => handleDrop(event, status)}
              onDragOver={handleDragOver}
            >
              <div
                onClick={() => toggleCollapse(status)}
                className={`p-2 ${statusGradients[status]} rounded-t-lg flex h-14 items-center justify-between border-b border-gray-600 cursor-pointer`}
              >
                <div className="flex items-center">
                  <p className="text-center text-gray-100 flex items-center mr-4">
                    {groupedOffers[status]?.length || 0} <i className="fa-solid fa-folder-open ml-1"></i>
                  </p>

                  <h2 className="text-xl font-semibold text-gray-100">
                    {collapsedColumns[status] ? '' : STATUS_LABELS[status]}
                  </h2>
                </div>

                <i
                  className={`fa ${collapsedColumns[status] ? 'fa-chevron-right' : 'fa-chevron-left'} text-gray-100 mr-6`}
                ></i>
              </div>

              <div className="kanban-cards m-4 space-y-4 flex-1">
                {!collapsedColumns[status] && groupedOffers[status]?.map(offer => (
                  <OfferCard
                    key={offer.id}
                    offer={offer}
                    onView={handleViewOffer}
                    onEdit={handleEditOffer}
                    onStatusChange={handleStatusChange}
                    onLikeToggle={handleToggleLike}
                    status={status}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
