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
  console.log('create problem')

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
      console.log('submission ready')

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
      //save the problem to database
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
    }
  } catch (error) {
    console.log('Error in problem creation', error)

    return res.status(500).json({
      error: 'Error in problem creation',
    })
  }
}

const getAllProblems = async (req, res) => {}

const getProblemById = async (req, res) => {}

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
