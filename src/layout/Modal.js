import React from 'react';
import ReactDOM from 'react-dom';

export function Modal ({ visible, closeModal, label, children }) {
  React.useEffect(() => {
    if (!visible) {
      return undefined;
    }

    function closeOnEscape (event) {
      if (event.key === 'Escape') {
        closeModal();
      }
    }

    document.addEventListener('keydown', closeOnEscape);
    return () => document.removeEventListener('keydown', closeOnEscape);
  }, [closeModal, visible]);

  const modal = (
    <div className={'fixed z-10 inset-0 overflow-y-auto ' + (visible ? '' : 'hidden')}>
      <div className="flex items-center justify-center min-h-screen p-4 md:p-6">
        <div className={
          'fixed inset-0 transition-opacity bg-black ease duration-300 opacity-0 cursor-zoom-out ' + (visible ? 'opacity-50' : '')
        } onClick={() => closeModal()}/>

        <div
          role="dialog"
          aria-modal="true"
          aria-label={label || 'Dialog'}
          className="relative block flex-1 max-w-2xl p-6 bg-gray-800 rounded-xs overflow-hidden shadow-lg transform my-8">
          <button type="button" onClick={() => closeModal()} title="Close this overlay"
            className="absolute top-0 right-0 py-2 px-3 text-gray-500 hover:text-white">&times;</button>
          {children}
        </div>

      </div>
    </div>
  );

  return ReactDOM.createPortal(modal, document.getElementById('modal-container'));
}
