import React, { useState, useEffect, useContext } from 'react';
import InvoiceModal from '../modals/InvoiceModal';
import DeleteModal from '../modals/DeleteModal';
import InvoiceContext from '../../context/invoice/invoiceContext';
import DarkContext from '../../context/dark/darkContext';

const Details = ({ currentUser }) => {
  // Use context hooks
  const {
    deleteConfirmation,
    editInvoiceForm,
    deleteButtonClick,
    editButtonClick,
    goBackClick,
    onMarkAsPaidClick,
  } = useContext(InvoiceContext);
  const { dark } = useContext(DarkContext);

  // Component state
  const [formattedDate, setFormattedDate] = useState({ year: '', month: '', day: '' });
  const [formattedDueDate, setFormattedDueDate] = useState({ dueYear: '', dueMonth: '', dueDay: '' });

  // Scroll to top on component mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Set formatted dates based on currentUser data
  useEffect(() => {
    const formatDate = (dateString) => {
      const date = new Date(dateString);
      return {
        year: date.getFullYear(),
        month: date.toLocaleString('default', { month: 'short' }),
        day: date.getDate(),
      };
    };

    setFormattedDate(formatDate(currentUser.createdAt));
    setFormattedDueDate(formatDate(currentUser.paymentDue));
  }, [currentUser]);

  const {
    status,
    total,
    items,
    id,
    description,
    clientName,
    clientEmail,
    clientAddress,
    senderAddress,
  } = currentUser;

  return (
    <>
      <div id="details-container" className={editInvoiceForm || deleteConfirmation ? 'modal-container' : null}>
        <div id="back-button" onClick={goBackClick}>
          <img src={require('../../images/icon-arrow-left.svg').default} alt="icon-arrow-left" />
          <p className={dark ? 'dark' : undefined}>Retour</p>
        </div>
        <header id="details-header" className={dark ? 'dark' : undefined}>
          <div id="dh-status">
            <p id="status-word" className={dark ? 'dark' : undefined}>Status</p>
            <div id={`${status}--${id}`} className={dark ? 'dark item-status-container' : 'item-status-container'}>
              <div className={dark ? 'dark dot' : 'dot'}></div>
              <p className={dark ? 'dark item-status' : 'item-status'}>
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </p>
            </div>
          </div>
          <div id="dh-options" style={{ display: 'flex', justifyContent: status === 'draft' ? 'flex-end' : 'space-between' }}>
            <button id="edit" className={dark ? 'form-btn dark' : 'form-btn'} onClick={editButtonClick}>
              <p>Modifier</p>
            </button>
            <button id="delete" className="form-btn" onClick={deleteButtonClick}>
              <p>Supprimer</p>
            </button>
            {status !== 'draft' && (
              <button id="mark-as-paid" className="form-btn" onClick={() => onMarkAsPaidClick(status)}>
                <p>{status === 'pending' ? 'Payé' : 'Impayé'}</p>
              </button>
            )}
          </div>
        </header>

        <section id="details-card" className={dark ? 'dark' : undefined}>
          <div id="top-details">
            <div id="td-group1" className="td-cn-group1">
              <p id="td-id" className={dark ? 'dark td-bold' : 'td-bold'}><span style={{ color: '#7E88C3' }}>#</span>{id}</p>
              <p id="td-description" className={dark ? 'dark td-beautiful' : 'td-beautiful'}>{description}</p>
            </div>
            <div id="td-group2" className="td-cn-group2">
              <p id="td-inv-date-header" className={dark ? 'dark td-beautiful' : 'td-beautiful'}>Date de facturation</p>
              <p id="td-inv-date" className={dark ? 'dark td-bold' : 'td-bold'}>{formattedDate.day} {formattedDate.month} {formattedDate.year}</p>
            </div>
            <div id="td-group3" className="td-cn-group3">
              <p id="td-due-date-header" className={dark ? 'dark td-beautiful' : 'td-beautiful'}>Paiement de</p>
              <p id="td-due-date" className={dark ? 'dark td-bold' : 'td-bold'}>{formattedDueDate.dueDay} {formattedDueDate.dueMonth} {formattedDueDate.dueYear}</p>
            </div>
            <div id="td-group4" className="td-cn-group4">
              <p id="td-bill-to-header" className={dark ? 'dark td-beautiful' : 'td-beautiful'}>Facture de :</p>
              <p id="td-bill-to-name" className={dark ? 'dark td-bold' : 'td-bold'}>{clientName}</p>
              <div id="td-bill-to-address" className={dark ? 'dark td-beautiful' : 'td-beautiful'}>
                <p id="client-street">{clientAddress.street}</p>
                <p id="client-city">{clientAddress.city}</p>
                <p id="client-zip">{clientAddress.postCode}</p>
                <p id="client-country">{clientAddress.country}</p>
              </div>
            </div>
            <div id="td-group5" className="td-cn-group5">
              <p id="td-sent-to-header" className={dark ? 'dark td-beautiful' : 'td-beautiful'}>Envoyer à:</p>
              <p id="td-sent-to-email" className={dark ? 'dark td-bold' : 'td-bold'}>{clientEmail}</p>
            </div>
            <div id="td-group6" className="td-cn-group6">
              <div id="td-sender-address" className={dark ? 'dark td-beautiful' : 'td-beautiful'}>
                <p id="client-street">{senderAddress.street}</p>
                <p id="client-city">{senderAddress.city}</p>
                <p id="client-zip">{senderAddress.postCode}</p>
                <p id="client-country">{senderAddress.country}</p>
              </div>
            </div>
          </div>
          <div id="details-card-items" className={dark ? 'dark' : undefined}>
            <div id="dc-items-header">
              <p id="item-name" className={dark ? 'dark' : undefined}>Nom</p>
              <p id="qty" className={dark ? 'dark' : undefined}>QTE.</p>
              <p id="price" className={dark ? 'dark' : undefined}>Prix</p>
              <p id="total" className={dark ? 'dark' : undefined}>Total</p>
            </div>
            {items.map((item, i) => (
              <div key={i} className="item-info">
                <p className={dark ? 'dark item-info-name' : 'item-info-name'}>{item.name}</p>
                <p className={dark ? 'dark item-info-quantity' : 'item-info-quantity'}>{item.quantity}</p>
                <p className={dark ? 'dark item-info-price' : 'item-info-price'}>Fcfa {parseFloat(item.price).toFixed(2)}</p>
                <p className={dark ? 'dark item-info-total' : 'item-info-total'}>Fcfa {(item.quantity * item.price).toFixed(2)}</p>
                <p id="random-x" className={dark ? 'dark' : undefined}>x</p>
              </div>
            ))}
          </div>
          <div id="details-card-total" className={dark ? 'dark' : undefined}>
            <p id="amount-due">Montant à payer</p>
            <div id="dc-total">Fcfa {total.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</div>
          </div>
        </section>
        <footer id="mobile-footer" className={dark ? 'dark' : undefined}>
          <div id="edit" className={dark ? 'form-btn dark' : 'form-btn'} onClick={editButtonClick}>
            <p>Modifier</p>
          </div>
          <div id="delete" className="form-btn" onClick={deleteButtonClick}>
            <p>Suppimer</p>
          </div>
          {status !== 'draft' && (
            <div id="mark-as-paid" className="form-btn" onClick={() => onMarkAsPaidClick(status)}>
              <p>{status === 'pending' ? 'Payé' : 'Impayé'}</p>
            </div>
          )}
        </footer>
      </div>
      {editInvoiceForm && <InvoiceModal />}
      {deleteConfirmation && <DeleteModal />}
    </>
  );
};

export default Details;
