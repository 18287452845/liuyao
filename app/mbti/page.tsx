'use client'

import Navigation from '../../components/layout/Navigation'
import MBTITest from '../../components/mbti/MBTITest'

export default function MBTIPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navigation />
      
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              MBTI性格测试
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              了解您的性格类型，发现最适合的人际关系模式
            </p>
          </div>

          <MBTITest />

          <div className="mt-12 bg-white dark:bg-gray-800 rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
              关于MBTI性格测试
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">什么是MBTI？</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  MBTI（Myers-Briggs Type Indicator）是一种基于心理学理论的性格分类系统，
                  通过16种不同的性格类型来描述人们的思维、行为和偏好模式。
                </p>
                <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                  <li>• 四个基本维度分析</li>
                  <li>• 16种性格类型分类</li>
                  <li>• 个人发展指导</li>
                  <li>• 人际关系分析</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">四个核心维度</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">外向性 (E) vs 内向性 (I)</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">能量来源和注意力焦点</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">感觉性 (S) vs 直觉性 (N)</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">信息收集和认知方式</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">思考性 (T) vs 情感性 (F)</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">决策依据和判断标准</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">判断性 (J) vs 知觉性 (P)</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">生活方式和应对环境的态度</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}