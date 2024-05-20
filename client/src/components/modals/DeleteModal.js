import React, { useContext, useEffect } from 'react';
import InvoiceContext from '../../context/invoice/invoiceContext';
import DarkContext from '../../context/dark/darkContext';

const DeleteModal = () => {
  // Declare and destructure context
  const invoiceContext = useContext(InvoiceContext);
  const darkContext = useContext(DarkContext);
  const { dark } = darkContext;
  const {
    cancelDeleteClick,
    onConfirmDeleteClick,
    currentUser,
  } = invoiceContext;

  // Effect to fade in/out modal
  useEffect(() => {
    setTimeout(() => {
      document
        .getElementById('delete-modal-container')
        .classList.add('fade-in');
    }, 100);
    // eslint-disable-next-line
  }, []);

  return (
    <div id='delete-modal-container' className='back-drop'>
      <div id='delete-modal' className={dark ? 'dark' : undefined}>
        <p id='dm-heading' className={dark ? 'dark' : undefined}>
          Confirmer la suppression
        </p>
        <p id='dm-question' className={dark ? 'dark' : undefined}>
          Etes vous sure de supprimer la facture ?{' '}
          <span style={{ color: '#7E88C3' }}>#</span>
          {currentUser.id}? Impossible d'effectuer cette tache
        </p>
        <div id='dm-btns'>
          <button
            id='dm-cancel'
            className={dark ? 'dark form-btn' : 'form-btn'}
            onClick={cancelDeleteClick}
          >
            <p id='cancel' className={dark ? 'dark' : undefined}>
              Annuler
            </p>
          </button>
          <button
            id='dm-delete'
            className='form-btn'
            onClick={() => onConfirmDeleteClick(currentUser)}
          >
            <p id='delete'>Supprimer</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
