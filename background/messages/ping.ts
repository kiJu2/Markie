import type { PlasmoMessaging } from '@plasmohq/messaging';

console.log('ping.ts loaded');

const handler: PlasmoMessaging.MessageHandler = async (req, res) => {
  console.log('ping.ts handler called', req, res);
  res.send({
    message: 'Hello from background script',
  });
};

export default handler;
