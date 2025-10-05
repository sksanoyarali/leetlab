import { db } from '../libs/db.js'
import {
  getJudge0LanguageId,
  pollBatchResults,
  submitBatch,
} from '../libs/judge0.lib.js'
const createProblem = async (req, res) => {
  // algorithm
  //get data from req body
  const {
    title,
    description,
    difficulty,
    tags,
    examples,
    constraints,
    testcases,
    codeSnippets,
    referenceSolutions,
  } = req.body

  if (req.user.role !== 'ADMIN') {
    return res.status(403).json({
      error: 'You are not allowed to create a problem',
    })
  }
  try {
    for (const [language, solutionCode] of Object.entries(referenceSolutions)) {
      const languageId = getJudge0LanguageId(language)
      if (!languageId) {
        return res.status(400).json({
          error: `language ${language} is not supported`,
        })
      }

      const submissions = testcases.map(({ input, output }) => ({
        source_code: solutionCode,
        language_id: languageId,
        stdin: input,
        expected_output: output,
      }))

      const submissionResults = await submitBatch(submissions)

      const tokens = submissionResults.map((res) => res.token)

      const results = await pollBatchResults(tokens)
      for (let i = 0; i < results.length; i++) {
        const result = results[i]
        console.log('result', result)

        if (result.status.id !== 3) {
          return res.status(400).json({
            error: `testcase ${i + 1} failed for language ${language}`,
          })
        }
      }
    }
    const newProblem = await db.problem.create({
      data: {
        title,
        description,
        difficulty,
        tags,
        examples,
        constraints,
        testcases,
        codeSnippets,
        referenceSolutions,
        userId: req.user.id,
      },
    })
    return res.status(201).json({
      message: 'problem created successfully',
      success: true,
      problem: newProblem,
    })
  } catch (error) {
    return res.status(500).json({
      error: 'Error in problem creation',
    })
  }
}

const getAllProblems = async (req, res) => {
  try {
    const problems = await db.problem.findMany()
    if (!problems) {
      return res.status(404).json({
        error: 'No problem found',
      })
    }
    return res.status(200).json({
      success: true,
      message: 'Problems fetched successfully',
      problems,
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      error: 'Error while fetching problems',
    })
  }
}

const getProblemById = async (req, res) => {
  const { id } = req.params
  try {
    const problem = await db.problem.findUnique({
      where: {
        id,
      },
    })
    if (!problem) {
      return res.status(404).json({
        error: 'Problem not found',
      })
    }
    return res.status(200).json({
      success: true,
      message: 'problem fetched successfully',
      problem,
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      error: 'Error while fetching problems',
    })
  }
}

const getAllproblemsSolvedByUser = async (req, res) => {}

const updateProblem = async (req, res) => {}

const deleteProblem = async (req, res) => {}

export {
  createProblem,
  getAllProblems,
  getAllproblemsSolvedByUser,
  getProblemById,
  updateProblem,
  deleteProblem,
}
