import React from 'react';
import ReactDOM from 'react-dom';

export function Modal (props) {
  const modal = (
    <div className={'fixed z-10 inset-0 overflow-y-auto ' + (props.visible ? '' : 'hidden')}>
      <div className="flex items-center justify-center min-h-screen p-4 md:p-6">
        <div className={
          'fixed inset-0 transition-opacity bg-black ease duration-300 opacity-0 cursor-zoom-out ' + (props.visible ? 'opacity-50' : '')
        } onClick={() => props.closeModal()}/>

        <div className={'block flex-1 max-w-2xl p-6 bg-gray-800 rounded-xs overflow-hidden shadow-lg transform my-8'}>
          <button onClick={() => props.closeModal()} title="Close this overlay"
            className="absolute top-0 right-0 py-2 px-3 text-gray-500 hover:text-white">&times;</button>
          {props.children}
        </div>

      </div>
    </div>
  );

  return ReactDOM.createPortal(modal, document.getElementById('modal-container'));
}
