import { db } from '../libs/db.js'

// get all the submissions for current user
export const getAllSubmission = async (req, res) => {
  try {
    const userId = req.user.id
    const submissions = await db.submission.findMany({
      where: {
        userId: userId,
      },
    })
    res.status(200).json({
      success: true,
      message: 'Submission fetched Successfully',
      submissions,
    })
  } catch (error) {
    console.error('fetched Submission error', error)
    res.status(500).json({
      error: 'Failed to fetch submissions',
    })
  }
}

// get all the submission for current user for a particular problem
export const getSubmissionForProblem = async (req, res) => {
  const userId = req.user.id
  const problemId = req.params.problemId

  try {
    const submissions = await db.submission.findMany({
      where: {
        userId: userId,
        problemId: problemId,
      },
    })
    res.status(200).json({
      success: true,
      message: 'Submission fetched Successfully',
      submissions,
    })
  } catch (error) {
    console.error('fetched Submission error', error)
    res.status(500).json({
      error: 'Failed to fetch submissions',
    })
  }
}

// get submission count of a problem
export const getAllTheSubmissionForProblem = async (req, res) => {
  const problemId = req.params.problemId
  try {
    const submission = await db.submission.count({
      where: {
        problemId,
      },
    })
    res.status(200).json({
      success: true,
      message: 'Submission fetched Successfully',
      count: submission,
    })
  } catch (error) {
    console.error('Fetched Submission error', error)
    res.status(500).json({
      error: 'Failed to fetch submissions',
    })
  }
}
