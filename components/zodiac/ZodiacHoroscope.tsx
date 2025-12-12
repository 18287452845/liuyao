'use client'

import { useState } from 'react'
import { zodiacSigns } from '../../../lib/zodiac'

export default function ZodiacHoroscope() {
  const [selectedSign, setSelectedSign] = useState('')
  const [period, setPeriod] = useState('daily')
  const [horoscope, setHoroscope] = useState<{
  sign: {
    symbol: string;
    name: string;
  };
  period: string;
  horoscope: {
    love: string;
    career: string;
    health: string;
    wealth: string;
  };
} | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const handleGetHoroscope = async () => {
    if (!selectedSign) {
      setError('请选择星座')
      return
    }

    setIsLoading(true)
    setError('')

    try {
      const token = localStorage.getItem('token')
      const response = await fetch(`/api/zodiac/horoscope?sign=${encodeURIComponent(selectedSign)}&period=${period}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.error || '获取运势失败')
        return
      }

      setHoroscope(data)
    } catch {
      setError('网络错误，请重试')
    } finally {
      setIsLoading(false)
    }
  }

  const periodLabels = {
    daily: '今日',
    weekly: '本周',
    monthly: '本月',
    yearly: '今年'
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">星座运势</h2>
        
        <div className="space-y-6">
          {/* 星座选择 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              选择星座
            </label>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {Object.entries(zodiacSigns).map(([name, sign]) => (
                <button
                  key={name}
                  onClick={() => setSelectedSign(name)}
                  className={`p-3 border rounded-lg text-center transition-colors ${
                    selectedSign === name
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                      : 'border-gray-300 dark:border-gray-600 hover:border-gray-400'
                  }`}
                >
                  <div className="text-lg mb-1">{sign.symbol}</div>
                  <div className="text-sm font-medium text-gray-900 dark:text-white">{name}</div>
                </button>
              ))}
            </div>
          </div>

          {/* 时间段选择 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              选择时间段
            </label>
            <div className="flex flex-wrap gap-2">
              {Object.entries(periodLabels).map(([value, label]) => (
                <button
                  key={value}
                  onClick={() => setPeriod(value)}
                  className={`px-4 py-2 rounded-md transition-colors ${
                    period === value
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={handleGetHoroscope}
            disabled={isLoading}
            className="w-full md:w-auto px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
          >
            {isLoading ? '查询中...' : '获取运势'}
          </button>

          {error && (
            <div className="text-red-600 dark:text-red-400">
              {error}
            </div>
          )}

          {horoscope && (
            <div className="mt-8 space-y-6">
              <div className="text-center">
                <div className="text-4xl mb-2">{horoscope.sign.symbol}</div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">{horoscope.sign.name}</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {periodLabels[horoscope.period as keyof typeof periodLabels]}运势
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-4 bg-pink-50 dark:bg-pink-900/20 rounded-lg">
                  <h4 className="font-medium text-gray-900 dark:text-white mb-2 flex items-center">
                    <span className="mr-2">💕</span>
                    爱情运势
                  </h4>
                  <p className="text-gray-700 dark:text-gray-300">{horoscope.horoscope.love}</p>
                </div>

                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <h4 className="font-medium text-gray-900 dark:text-white mb-2 flex items-center">
                    <span className="mr-2">💼</span>
                    事业运势
                  </h4>
                  <p className="text-gray-700 dark:text-gray-300">{horoscope.horoscope.career}</p>
                </div>

                <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <h4 className="font-medium text-gray-900 dark:text-white mb-2 flex items-center">
                    <span className="mr-2">💪</span>
                    健康运势
                  </h4>
                  <p className="text-gray-700 dark:text-gray-300">{horoscope.horoscope.health}</p>
                </div>

                <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                  <h4 className="font-medium text-gray-900 dark:text-white mb-2 flex items-center">
                    <span className="mr-2">💰</span>
                    财富运势
                  </h4>
                  <p className="text-gray-700 dark:text-gray-300">{horoscope.horoscope.wealth}</p>
                </div>
              </div>

              <div className="text-center">
                <button
                  onClick={handleGetHoroscope}
                  className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  刷新运势
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}