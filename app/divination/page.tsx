'use client'

import { useState } from 'react'
import Navigation from '../../components/layout/Navigation'
import RandomDivination from '../../components/divination/RandomDivination'
import ManualHexagramInput from '../../components/divination/ManualHexagramInput'

export default function DivinationPage() {
  const [activeTab, setActiveTab] = useState<'random' | 'manual'>('random')

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navigation />
      
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              占卜预测
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              选择占卜方式，探索命运指引
            </p>
          </div>

          <div className="mb-6">
            <div className="border-b border-gray-200 dark:border-gray-700">
              <nav className="-mb-px flex space-x-8">
                <button
                  onClick={() => setActiveTab('random')}
                  className={`py-2 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'random'
                      ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
                  }`}
                >
                  随机起卦
                </button>
                <button
                  onClick={() => setActiveTab('manual')}
                  className={`py-2 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'manual'
                      ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
                  }`}
                >
                  手动输入卦象
                </button>
              </nav>
            </div>
          </div>

          <div className="space-y-6">
            {activeTab === 'random' ? (
              <RandomDivination />
            ) : (
              <ManualHexagramInput />
            )}
          </div>

          <div className="mt-12 bg-white dark:bg-gray-800 rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
              占卜说明
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">增删卜易</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  增删卜易是中国传统占卜方法中的经典之作，由明代易学大师刘伯温所创。
                  这种方法通过投掷筮草或铜钱来生成卦象，结合卦辞和爻辞进行分析。
                </p>
                <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                  <li>• 传统筮草起卦方式</li>
                  <li>• 完整的六十四卦体系</li>
                  <li>• 详细的卦象解释</li>
                  <li>• AI智能解读辅助</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">卜筮正宗</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  卜筮正宗是清朝康熙年间程钟龄所著的占卜经典，强调占卜的规范性和准确性。
                  该方法注重起卦过程的标准化和解释的客观性。
                </p>
                <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                  <li>• 标准化起卦流程</li>
                  <li>• 精确的卦象计算</li>
                  <li>• 客观的分析方法</li>
                  <li>• 现代化的应用</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}