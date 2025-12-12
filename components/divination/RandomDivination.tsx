'use client'

import { useState } from 'react'

export default function RandomDivination() {
  const [question, setQuestion] = useState('')
  const [result, setResult] = useState<{
  hexagram: {
    number: number;
    name: string;
    symbol: string;
    description: string;
    interpretation: string;
  };
  record: {
    createdAt: string;
  };
} | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const handleDivination = async () => {
    setIsLoading(true)
    setError('')
    
    try {
      const token = localStorage.getItem('token')
      const response = await fetch('/api/divination/random', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ question })
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.error || '占卜失败')
        return
      }

      setResult(data)
    } catch {
      setError('网络错误，请重试')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">随机起卦</h2>
        
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            占卜问题（可选）
          </label>
          <textarea
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="请输入您想要占卜的问题..."
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
            rows={3}
          />
        </div>

        <button
          onClick={handleDivination}
          disabled={isLoading}
          className="w-full md:w-auto px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
        >
          {isLoading ? '起卦中...' : '开始占卜'}
        </button>

        {error && (
          <div className="mt-4 text-red-600 dark:text-red-400">
            {error}
          </div>
        )}

        {result && (
          <div className="mt-8 p-6 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">占卜结果</h3>
            
            <div className="mb-4">
              <div className="flex items-center justify-center mb-4">
                <div className="text-6xl">{result.hexagram.symbol}</div>
              </div>
              
              <h4 className="text-lg font-semibold text-center text-gray-900 dark:text-white">
                {result.hexagram.name}
              </h4>
              <p className="text-center text-gray-600 dark:text-gray-300 mb-4">
                {result.hexagram.description}
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <h5 className="font-medium text-gray-900 dark:text-white">卦象解释：</h5>
                <p className="text-gray-700 dark:text-gray-300">{result.hexagram.interpretation}</p>
              </div>

              {question && (
                <div>
                  <h5 className="font-medium text-gray-900 dark:text-white">问题：</h5>
                  <p className="text-gray-700 dark:text-gray-300">{question}</p>
                </div>
              )}

              <div>
                <h5 className="font-medium text-gray-900 dark:text-white">起卦时间：</h5>
                <p className="text-gray-700 dark:text-gray-300">
                  {new Date(result.record.createdAt).toLocaleString('zh-CN')}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}