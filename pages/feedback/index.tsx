import { GetStaticProps } from 'next'
import { useState } from 'react'
import { Feedback } from '../../typings'
import { buildFeedbackPath, extractFeedback } from '../api/feedback'

type Props = {
  feedbackItems: Feedback[]
}

const FeedbackPage = ({ feedbackItems }: Props) => {
  const [feedbackData, setFeedbackData] = useState<Feedback>()
  const loadFeedbackHandler = (id: string) => {
    fetch(`/api/feedback/${id}`)
      .then(response => response.json())
      .then(data => setFeedbackData(data.feedback))
  }

  return (
    <>
      {feedbackData && <p>{feedbackData.email}</p>}
      <ul>
        {feedbackItems.map(item =>
          <li key={item.id}>
            {item.feedback}
            <button onClick={loadFeedbackHandler.bind(null, item.id)}>Show Details</button>
          </li>)}
      </ul>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const filePath = buildFeedbackPath()
  const data = extractFeedback(filePath)
  const feedbackItems = []
  return {
    props: {
      feedbackItems: data
    }
  }
}

export default FeedbackPage
