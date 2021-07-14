import { NextApiRequest, NextApiResponse } from 'next';
import { buildFeedbackPath, extractFeedback } from '.';

export default (req: NextApiRequest, res: NextApiResponse) => {
  // we could add if checks for req.method
  const { feedbackId } = req.query
  const filePath = buildFeedbackPath()
  const feedbackData = extractFeedback(filePath)
  const selectedFeedback = feedbackData.find(feedback => feedback.id === feedbackId)
  res.status(200).json({ feedback: selectedFeedback })
}