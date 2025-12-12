'use client'

import { useState } from 'react'
import { hexagrams } from '../../../lib/hexagrams'

export default function ManualHexagramInput() {
  const [hexagramNumber, setHexagramNumber] = useState(1)
  const [question, setQuestion] = useState('')
  const [method, setMethod] = useState<'ZENG_SHAN_BU_YI' | 'BU_SHI_ZHENG_ZONG'>('ZENG_SHAN_BU_YI')
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

  const selectedHexagram = hexagrams[hexagramNumber as keyof typeof hexagrams]

  const handleSubmit = async () => {
    if (!selectedHexagram) {
      setError('卦象不存在')
      return
    }

    setIsLoading(true)
    setError('')
    
    try {
      const token = localStorage.getItem('token')
      const response = await fetch('/api/divination/manual', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ 
          hexagramNumber, 
          question, 
          method 
        })
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.error || '保存失败')
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
        <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">手动输入卦象</h2>
        
        <div className="space-y-6">
          {/* 卦象选择 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              选择卦象
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 max-h-96 overflow-y-auto">
              {Object.entries(hexagrams).map(([number, hexagram]) => (
                <button
                  key={number}
                  onClick={() => setHexagramNumber(parseInt(number))}
                  className={`p-4 border rounded-lg text-left transition-colors ${
                    hexagramNumber === parseInt(number)
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                      : 'border-gray-300 dark:border-gray-600 hover:border-gray-400'
                  }`}
                >
                  <div className="flex items-center justify-center mb-2">
                    <span className="text-2xl">{hexagram.symbol}</span>
                  </div>
                  <h3 className="font-medium text-gray-900 dark:text-white text-sm">
                    第{number}卦
                  </h3>
                  <h4 className="text-gray-800 dark:text-gray-200 text-sm mb-1">
                    {hexagram.name}
                  </h4>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    {hexagram.description}
                  </p>
                </button>
              ))}
            </div>
          </div>

          {/* 占卜方法选择 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              占卜方法
            </label>
            <select
              value={method}
              onChange={(e) => setMethod(e.target.value as 'ZENG_SHAN_BU_YI' | 'BU_SHI_ZHENG_ZONG')}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
            >
              <option value="ZENG_SHAN_BU_YI">增删卜易</option>
              <option value="BU_SHI_ZHENG_ZONG">卜筮正宗</option>
            </select>
          </div>

          {/* 问题输入 */}
          <div>
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

          {/* 选择的卦象预览 */}
          {selectedHexagram && (
            <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <h4 className="font-medium text-gray-900 dark:text-white mb-2">选择的卦象：</h4>
              <div className="flex items-center space-x-4">
                <span className="text-3xl">{selectedHexagram.symbol}</span>
                <div>
                  <h5 className="font-medium text-gray-900 dark:text-white">{selectedHexagram.name}</h5>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{selectedHexagram.description}</p>
                </div>
              </div>
            </div>
          )}

          <button
            onClick={handleSubmit}
            disabled={isLoading}
            className="w-full md:w-auto px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
          >
            {isLoading ? '保存中...' : '保存占卜记录'}
          </button>

          {error && (
            <div className="text-red-600 dark:text-red-400">
              {error}
            </div>
          )}

          {result && (
            <div className="mt-8 p-6 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">保存成功</h3>
              
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

                <div>
                  <h5 className="font-medium text-gray-900 dark:text-white">保存时间：</h5>
                  <p className="text-gray-700 dark:text-gray-300">
                    {new Date(result.record.createdAt).toLocaleString('zh-CN')}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}