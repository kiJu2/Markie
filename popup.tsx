import { useEffect, useState } from 'react';

import './src/styles/globals.css';

import { sendToBackground } from '@plasmohq/messaging';

function IndexPopup() {
  const [data, setData] = useState('');

  useEffect(() => {
    console.log('Popup mounted');
    const resp = sendToBackground({
      name: 'ping',
      body: {
        id: 123,
      },
    })
      .then((res) => {
        console.log('Response from background:', res);
      })
      .catch((err) => {
        console.error('Error sending message to background:', err);
      });
  }, []);

  return (
    <div>
      <h1>Hello</h1>
    </div>
  );
}

export default IndexPopup;
