import React, { memo } from 'react';


interface ActionButtonProps {
  label: string;
  onClick: () => void;
}


const ActionButtonComponent = ({ label, onClick }: ActionButtonProps) => {
  console.log('دکمه رندر شد:', label);

  return (
        <button onClick={onClick}>
      {label}
    </button>
  );
};


export const ActionButton = memo(ActionButtonComponent);
