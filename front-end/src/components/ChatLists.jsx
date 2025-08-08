import React from 'react';

const ChatLists = ({ chats }) => {
  const user = localStorage.getItem('user');

  function SenderChat({ message, username, avatar }) {
    return (
      <div className='chat_sender' style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '10px' }}>
        <p style={{ background: '#dcf8c6', padding: '8px', borderRadius: '10px', maxWidth: '300px' }}>
          <strong>{username}</strong> <br />
          {message}
        </p>
        <img
          src={avatar}
          alt="avatar"
          style={{ width: '40px', height: '40px', borderRadius: '50%', marginLeft: '10px' }}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = 'https://via.placeholder.com/40';
          }}
        />
      </div>
    );
  }

  function ReceiverChat({ message, username, avatar }) {
    return (
      <div className='chat_receiver' style={{ display: 'flex', justifyContent: 'flex-start', marginBottom: '10px' }}>
        <img
          src={avatar}
          alt="avatar"
          style={{ width: '40px', height: '40px', borderRadius: '50%', marginRight: '10px' }}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = 'https://via.placeholder.com/40';
          }}
        />
        <p style={{ background: '#fff', padding: '8px', borderRadius: '10px', maxWidth: '300px' }}>
          <strong>{username}</strong> <br />
          {message}
        </p>
      </div>
    );
  }

  return (
    <div className='chats_list' style={{
      maxHeight: '70vh',
      overflowY: 'auto',
      padding: '10px',
      display: 'flex',
      flexDirection: 'column'
    }}>
      {
        chats.map((chat, index) =>
          chat.user === user ? (
            <SenderChat
              key={index}
              message={chat.message}
              username={chat.user}
              avatar={chat.avatar}
            />
          ) : (
            <ReceiverChat
              key={index}
              message={chat.message}
              username={chat.user}
              avatar={chat.avatar}
            />
          )
        )
      }
    </div>
  );
};

export default ChatLists;
