// components/CopyToClipboardButton.js
import { useState } from 'react';
import copy from 'clipboard-copy';

const CopyToClipboardButton = ({ text }: {text: string}) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopyClick = async () => {
    try {
      await copy(text);
      setIsCopied(true);
    } catch (error) {
      console.error('Failed to copy text to clipboard', error);
    }
  };

  return (
    <div>
      <button onClick={handleCopyClick}>
        {isCopied ? 'Copied!' : 'Click here to Copy the Address'}
      </button>
    </div>
  );
};

export default CopyToClipboardButton;
