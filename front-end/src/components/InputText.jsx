import React, { useState } from 'react'

const InputText = ({addMessage}) => {
  const [message, setMessage] = useState()
 const sendMessage = () => {
  addMessage({ message })  
  setMessage("")           
}

  return (
    <div className='inputtext_container'>
      <textarea 
      placeholder="Type your message..."  
      value={message}
      onChange={(e) => setMessage(e.target.value)} 
      ></textarea>
      <button onClick={sendMessage} className='send_button'>Send</button>
    </div>
  );
};

export default InputText;
