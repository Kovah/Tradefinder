import React from 'react';
import ReactDOM from 'react-dom';

export function Modal (props) {
  const [isVisible, setVisibility] = React.useState(props.visible);

  const modal = (
    <div className={'fixed z-10 inset-0 overflow-y-auto ' + (isVisible ? '' : 'hidden')}>
      <div className="flex items-center justify-center min-h-screen pt-4 px-4">
        <div className={
          'fixed inset-0 transition-opacity bg-black ease duration-300 opacity-0 ' + (isVisible ? 'opacity-50' : '')
        } onClick={() => props.closeModal()}/>

        <div className={'inline-block p-6 bg-gray-800 rounded-sm overflow-hidden shadow-lg transform my-8'}>
          {props.children}
        </div>

      </div>
    </div>
  );

  return ReactDOM.createPortal(modal, document.getElementById('modal-container'));
}
