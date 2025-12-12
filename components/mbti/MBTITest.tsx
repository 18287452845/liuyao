'use client'

import { useState } from 'react'
import { mbtiQuestions } from '../../../lib/mbti'

export default function MBTITest() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Array<{questionId: number; dimension: string; text: string}>>([])
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<{
    type: string;
    typeInfo: {
      name: string;
      description: string;
      traits: string[];
      strengths: string[];
      weaknesses: string[];
      compatibleWith: string[];
    };
    scores: {
      extraversion: number;
      sensing: number;
      thinking: number;
      judging: number;
    };
    matches: Array<{
      id: number;
      matchedType: string;
      compatibility: number;
      details: string;
    }>;
  } | null>(null)
  const [error, setError] = useState('')

  const handleAnswer = (option: { text: string; dimension: string }) => {
    const newAnswer = {
      questionId: mbtiQuestions[currentQuestion].id,
      dimension: option.dimension,
      text: option.text
    }

    const newAnswers = [...answers, newAnswer]
    setAnswers(newAnswers)

    if (currentQuestion < mbtiQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      // 测试完成，提交结果
      submitTest(newAnswers)
    }
  }

  const submitTest = async (finalAnswers: any[]) => {
    setIsLoading(true)
    setError('')
    
    try {
      const token = localStorage.getItem('token')
      const response = await fetch('/api/mbti/test', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ answers: finalAnswers })
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.error || '测试失败')
        return
      }

      setResult(data.result)
    } catch {
      setError('网络错误，请重试')
    } finally {
      setIsLoading(false)
    }
  }

  const resetTest = () => {
    setCurrentQuestion(0)
    setAnswers([])
    setResult(null)
    setError('')
  }

  if (result) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">MBTI测试结果</h2>
          
          <div className="text-center mb-8">
            <div className="text-6xl font-bold text-blue-600 dark:text-blue-400 mb-2">
              {result.type}
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              {result.typeInfo.name}
            </h3>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              {result.typeInfo.description}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <h4 className="font-medium text-gray-900 dark:text-white mb-3">性格特点</h4>
              <div className="flex flex-wrap gap-2">
                {result.typeInfo.traits.map((trait: string) => (
                  <span
                    key={trait}
                    className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm"
                  >
                    {trait}
                  </span>
                ))}
              </div>
            </div>

            <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <h4 className="font-medium text-gray-900 dark:text-white mb-3">优势</h4>
              <ul className="space-y-1 text-sm text-gray-700 dark:text-gray-300">
                {result.typeInfo.strengths.map((strength: string) => (
                  <li key={strength}>• {strength}</li>
                ))}
              </ul>
            </div>

            <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <h4 className="font-medium text-gray-900 dark:text-white mb-3">需要改进的方面</h4>
              <ul className="space-y-1 text-sm text-gray-700 dark:text-gray-300">
                {result.typeInfo.weaknesses.map((weakness: string) => (
                  <li key={weakness}>• {weakness}</li>
                ))}
              </ul>
            </div>

            <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <h4 className="font-medium text-gray-900 dark:text-white mb-3">维度分析</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">外向性 (E/I):</span>
                  <span className="text-gray-900 dark:text-white">{result.scores.extraversion}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">感觉性 (S/N):</span>
                  <span className="text-gray-900 dark:text-white">{result.scores.sensing}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">思考性 (T/F):</span>
                  <span className="text-gray-900 dark:text-white">{result.scores.thinking}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">判断性 (J/P):</span>
                  <span className="text-gray-900 dark:text-white">{result.scores.judging}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="p-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg mb-6">
            <h4 className="font-medium text-gray-900 dark:text-white mb-3">性格匹配</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {result.matches.map((match: any) => (
                <div key={match.id} className="flex items-center justify-between p-3 bg-white dark:bg-gray-800 rounded">
                  <div>
                    <div className="font-medium text-gray-900 dark:text-white">{match.matchedType}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">{match.details}</div>
                  </div>
                  <div className="text-lg font-semibold text-green-600 dark:text-green-400">
                    {match.compatibility}%
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={resetTest}
            className="w-full md:w-auto px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            重新测试
          </button>
        </div>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600 dark:text-gray-300">正在分析您的性格类型...</p>
          </div>
        </div>
      </div>
    )
  }

  const question = mbtiQuestions[currentQuestion]
  const progress = ((currentQuestion + 1) / mbtiQuestions.length) * 100

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">MBTI性格测试</h2>
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {currentQuestion + 1} / {mbtiQuestions.length}
            </span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        <div className="mb-8">
          <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-6">
            {question.question}
          </h3>

          <div className="space-y-3">
            {question.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(option)}
                className="w-full p-4 text-left border border-gray-300 dark:border-gray-600 rounded-lg hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
              >
                <span className="text-gray-900 dark:text-white">{option.text}</span>
              </button>
            ))}
          </div>
        </div>

        {error && (
          <div className="text-red-600 dark:text-red-400">
            {error}
          </div>
        )}
      </div>
    </div>
  )
}