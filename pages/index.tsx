import { FormEvent, MouseEvent, useRef, useState } from 'react'
import { Feedback } from '../typings'

const HomePage = () => {
  const [feedbackItems, setFeedbackItems] = useState<Feedback[]>([])

  const emailInputRef = useRef<HTMLInputElement>(null)
  const feedbackInputRef = useRef<HTMLTextAreaElement>(null)

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const email = emailInputRef.current?.value
    const feedback = feedbackInputRef.current?.value

    fetch('/api/feedback', {
      method: 'POST',
      body: JSON.stringify({ email, feedback }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(data => console.log(data))
    
    emailInputRef.current!.value = ""
    feedbackInputRef.current!.value = ""
  }

  const loadFeedbackHandler = (e: MouseEvent<HTMLButtonElement>) => {
    fetch('/api/feedback')
      .then(response => response.json())
      .then(data => setFeedbackItems(data.feedback))
  }

  return (
    <div>
      <h1>Home Page</h1>
      <form onSubmit={submitHandler}>
        <div>
          <label htmlFor="email">Email</label>
          <input type="email" id="email" ref={emailInputRef} />
        </div>
        <div>
          <label htmlFor="feedback">Feedback</label>
          <textarea id="feedback" cols={30} rows={10} ref={feedbackInputRef}></textarea>
        </div>
        <button>Send Feedback</button>
      </form>
      <hr />
      <button onClick={loadFeedbackHandler}>Load Feedback</button>
      <ul>
        {feedbackItems.map(item => <li key={item.id}>{item.feedback}</li>)}
      </ul>
    </div>
  )
}

export default HomePage
