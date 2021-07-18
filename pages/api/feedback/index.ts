import type { NextApiRequest, NextApiResponse } from 'next'
import { v4 as uuidv4 } from 'uuid'
import fs from 'fs'
import path from 'path'
import { Feedback } from '../../../typings'

export const buildFeedbackPath = () => path.join(process.cwd(), 'data', 'feedback.json')
export const extractFeedback = (filePath: string) => {
  const fileData = fs.readFileSync(filePath)
  const data: Feedback[] = JSON.parse(fileData.toString())
  return data
}

export default (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const { email, feedback } = req.body as Feedback
    const newFeedback: Feedback = {
      id: uuidv4(),
      email,
      feedback
    }
    // store in db or file
    const filePath = buildFeedbackPath()
    const data = extractFeedback(filePath)
    data.push(newFeedback)
    fs.writeFileSync(filePath, JSON.stringify(data))
    res.status(201).json({ message: 'Success!', feedback: newFeedback })
  } else {
    const filePath = buildFeedbackPath()
    const data = extractFeedback(filePath)
    res.status(200).json({ feedback: data })
  }
}
