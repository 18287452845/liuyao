'use client'

import { useState, useEffect } from 'react'
import { zodiacSigns } from '../../../lib/zodiac'

export default function ZodiacInfo() {
  const [selectedSign, setSelectedSign] = useState<string>('')
  const [signInfo, setSignInfo] = useState<{
  name: string;
  symbol: string;
  dateRange: string;
  planet: string;
  element: string;
  traits: string[];
  description: string;
  strengths: string[];
  weaknesses: string[];
} | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    // 自动获取用户星座（如果已设置）
    const savedSign = localStorage.getItem('zodiacSign')
    if (savedSign) {
      setSelectedSign(savedSign)
      loadSignInfo(savedSign)
    }
  }, [])

  const loadSignInfo = async (sign: string) => {
    setIsLoading(true)
    try {
      const token = localStorage.getItem('token')
      const response = await fetch(`/api/zodiac/info?sign=${encodeURIComponent(sign)}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      const data = await response.json()
      if (data.success) {
        setSignInfo(data.sign)
        localStorage.setItem('zodiacSign', sign)
      }
    } catch (error) {
      console.error('获取星座信息失败:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSignSelect = (sign: string) => {
    setSelectedSign(sign)
    loadSignInfo(sign)
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">星座查询</h2>
        
        {/* 星座选择 */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
          {Object.entries(zodiacSigns).map(([name, sign]) => (
            <button
              key={name}
              onClick={() => handleSignSelect(name)}
              className={`p-4 border rounded-lg text-center transition-colors ${
                selectedSign === name
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                  : 'border-gray-300 dark:border-gray-600 hover:border-gray-400'
              }`}
            >
              <div className="text-2xl mb-2">{sign.symbol}</div>
              <h3 className="font-medium text-gray-900 dark:text-white">{name}</h3>
              <p className="text-xs text-gray-600 dark:text-gray-400">{sign.dateRange}</p>
            </button>
          ))}
        </div>

        {isLoading && (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
            <p className="text-gray-600 dark:text-gray-400">加载中...</p>
          </div>
        )}

        {signInfo && (
          <div className="space-y-6">
            <div className="text-center">
              <div className="text-6xl mb-4">{signInfo.symbol}</div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{signInfo.name}</h3>
              <p className="text-gray-600 dark:text-gray-400">{signInfo.dateRange}</p>
              <p className="text-gray-600 dark:text-gray-400">守护星：{signInfo.planet} | 元素：{signInfo.element}</p>
            </div>

            <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <h4 className="font-medium text-gray-900 dark:text-white mb-2">星座特质</h4>
              <div className="flex flex-wrap gap-2">
                {signInfo.traits.map((trait: string) => (
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
              <h4 className="font-medium text-gray-900 dark:text-white mb-2">性格描述</h4>
              <p className="text-gray-700 dark:text-gray-300">{signInfo.description}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <h4 className="font-medium text-gray-900 dark:text-white mb-3">优点</h4>
                <ul className="space-y-1 text-sm text-gray-700 dark:text-gray-300">
                  {signInfo.strengths.map((strength: string) => (
                    <li key={strength}>• {strength}</li>
                  ))}
                </ul>
              </div>

              <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                <h4 className="font-medium text-gray-900 dark:text-white mb-3">需要注意的方面</h4>
                <ul className="space-y-1 text-sm text-gray-700 dark:text-gray-300">
                  {signInfo.weaknesses.map((weakness: string) => (
                    <li key={weakness}>• {weakness}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="text-center">
              <button
                onClick={() => loadSignInfo(selectedSign)}
                className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                刷新信息
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}