'use client'

import { useState } from 'react'
import Navigation from '../../components/layout/Navigation'
import ZodiacInfo from '../../components/zodiac/ZodiacInfo'
import ZodiacHoroscope from '../../components/zodiac/ZodiacHoroscope'

export default function ZodiacPage() {
  const [activeTab, setActiveTab] = useState<'info' | 'horoscope' | 'compatibility'>('info')

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navigation />
      
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              星座查询
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              探索星座奥秘，了解性格特质与运势走向
            </p>
          </div>

          <div className="mb-6">
            <div className="border-b border-gray-200 dark:border-gray-700">
              <nav className="-mb-px flex space-x-8">
                <button
                  onClick={() => setActiveTab('info')}
                  className={`py-2 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'info'
                      ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
                  }`}
                >
                  星座信息
                </button>
                <button
                  onClick={() => setActiveTab('horoscope')}
                  className={`py-2 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'horoscope'
                      ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
                  }`}
                >
                  运势查询
                </button>
                <button
                  onClick={() => setActiveTab('compatibility')}
                  className={`py-2 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'compatibility'
                      ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
                  }`}
                >
                  星座匹配
                </button>
              </nav>
            </div>
          </div>

          <div className="space-y-6">
            {activeTab === 'info' ? (
              <ZodiacInfo />
            ) : activeTab === 'horoscope' ? (
              <ZodiacHoroscope />
            ) : (
              <div className="max-w-4xl mx-auto p-6">
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
                  <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">星座匹配</h2>
                  <div className="text-center py-12">
                    <div className="text-6xl mb-4">💫</div>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      星座匹配功能即将推出
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-500">
                      该功能正在开发中，敬请期待
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="mt-12 bg-white dark:bg-gray-800 rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
              十二星座介绍
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { name: '白羊座', element: '火', trait: '热情积极', emoji: '♈' },
                { name: '金牛座', element: '土', trait: '稳重踏实', emoji: '♉' },
                { name: '双子座', element: '风', trait: '机智灵活', emoji: '♊' },
                { name: '巨蟹座', element: '水', trait: '温柔体贴', emoji: '♋' },
                { name: '狮子座', element: '火', trait: '自信慷慨', emoji: '♌' },
                { name: '处女座', element: '土', trait: '完美主义', emoji: '♍' },
                { name: '天秤座', element: '风', trait: '平衡和谐', emoji: '♎' },
                { name: '天蝎座', element: '水', trait: '深邃神秘', emoji: '♏' },
                { name: '射手座', element: '火', trait: '自由乐观', emoji: '♐' },
                { name: '摩羯座', element: '土', trait: '务实负责', emoji: '♑' },
                { name: '水瓶座', element: '风', trait: '独立创新', emoji: '♒' },
                { name: '双鱼座', element: '水', trait: '浪漫敏感', emoji: '♓' }
              ].map((sign) => (
                <div key={sign.name} className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="text-center">
                    <div className="text-2xl mb-2">{sign.emoji}</div>
                    <h3 className="font-medium text-gray-900 dark:text-white">{sign.name}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{sign.element}象星座</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{sign.trait}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}