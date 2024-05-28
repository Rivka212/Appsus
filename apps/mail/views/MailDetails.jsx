const { useEffect, useState } = React
const { useParams, useLocation } = ReactRouter

import { mailService } from "../services/mail.service.js"
import { MailUpperBar } from "../cmps/MailUpperBar.jsx"
import { ComposeList } from "../cmps/ComposeList.jsx"

export function MailDetails() {

  const { id } = useParams();
  const [mail, setMail] = useState(null);
  const [date, setDate] = useState(null);
  const [isStarred, setIsStarred] = useState(false);
  const [isReply, setIsReply] = useState(false)
  const [isForward, setIsForward] = useState(false)


  const handleStarClick = () => {
    setIsStarred(!isStarred);
  };



  function formatDate(timestamp) {
    const options = {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    };
    const date = new Date(timestamp);
    return new Intl.DateTimeFormat('en-US', options).format(date);
  }

  const hoverTexts = {
    star: 'Star',
    reply: 'Reply',
    more: 'Mores'
  };


  useEffect(() => {
    mailService.getMail(id)
      .then(mail => {
        setMail(mail);
        setDate(formatDate(mail.sentAt));
      });
  }, [id]);

  function handleCloseModal() {
    setIsReply(false);
    setIsForward(false);
  }


  if (!mail) return <h3>Loading...</h3>;
  return (
    <section className="mail-details">
      <MailUpperBar mailId={id} />
      <div className="main-mail">
        <h2>{mail.subject}</h2>
        
        <div className="sender-details">
          <div>
            <div>
              <h3>{mail.from.split('@')[0]}</h3>
              <span className="from-and-date">{`<${mail.from}>`}</span>
            </div>
            <span>{mail.type === 'inbox' ? 'to me' : mail.to}</span>
          </div>
          <div className="actions">
            <div className="action-container"  onClick={handleStarClick}>
              <img className="star"  src={isStarred ? '../../../icons/goldstar.svg' : '../../../icons/star.svg'} alt="Star" />
              <span className="hover-text">{hoverTexts['star']}</span>
            </div>
            <div className="action-container">
              <img className="reply" src="../../icons/reply.png" alt="Reply" />
              <span className="hover-text">{hoverTexts['reply']}</span>
            </div>
            <div className="action-container">
              <img className="more" src="../../icons/more.png" alt="More" />
              <span className="hover-text">{hoverTexts['more']}</span>
            </div>
          </div>

        </div>
        <p>{mail.body}</p>
        <div className="btns">
          <button onClick={() => setIsReply(true)}>
            <img src="../../icons/reply.png" alt="Reply" />
            Reply
          </button>
          <button onClick={() => {
            debugger
            setIsForward(true)}}
            >
            <img className="forward" src="../../icons/reply.png" alt="Forward" />
            Forward
          </button>
          {isReply && <ComposeList
              initialRecipient={mail.from}
              closeModal={handleCloseModal}
            />}
          {isForward && <ComposeList initialSubject={`RE: ${mail.subject}`}
              initialBody={mail.body}
              closeModal={handleCloseModal}
            />}
        </div>
      </div>
    </section>
  );
}
