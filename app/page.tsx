'use client'

import { useState, useEffect } from 'react'
import Navigation from '../components/layout/Navigation'
import Link from 'next/link'

export default function Home() {
  const [user, setUser] = useState<{ id: number; username: string; role: string } | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // 检查用户登录状态
    const token = localStorage.getItem('token')
    const userData = localStorage.getItem('user')
    
    if (token && userData) {
      try {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setUser(JSON.parse(userData))
      } catch (error) {
        console.error('Error parsing user data:', error)
      }
    }
    setIsLoading(false)
  }, [])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Navigation />
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Navigation />
        <div className="flex min-h-screen items-center justify-center">
          <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-center gap-8 py-32 px-16">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                卜易堂
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
                专业的占卜、性格测试与星座服务平台
              </p>
              <div className="space-x-4">
                <Link
                  href="/auth/login"
                  className="inline-block px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  登录
                </Link>
                <Link
                  href="/auth/register"
                  className="inline-block px-6 py-3 bg-gray-600 text-white rounded-md hover:bg-gray-700"
                >
                  注册
                </Link>
              </div>
            </div>
          </main>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navigation />
      
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              欢迎回来，{user.username}！
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              选择您想要使用的功能模块
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* 占卜模块 */}
            <Link href="/divination">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer">
                <div className="text-center">
                  <div className="text-4xl mb-4">🔮</div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">占卜预测</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    增删卜易、卜筮正宗，随机起卦或手动选择卦象
                  </p>
                </div>
              </div>
            </Link>

            {/* MBTI测试模块 */}
            <Link href="/mbti">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer">
                <div className="text-center">
                  <div className="text-4xl mb-4">🧠</div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">MBTI性格测试</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    发现您的性格类型，了解性格匹配度
                  </p>
                </div>
              </div>
            </Link>

            {/* 星座模块 */}
            <Link href="/zodiac">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer">
                <div className="text-center">
                  <div className="text-4xl mb-4">⭐</div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">星座查询</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    星座信息、运势查询、星座匹配分析
                  </p>
                </div>
              </div>
            </Link>

            {/* 管理模块（仅管理员可见） */}
            {user.role === 'ADMIN' && (
              <Link href="/admin">
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer">
                  <div className="text-center">
                    <div className="text-4xl mb-4">⚙️</div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">系统管理</h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      用户管理、邀请码生成、权限控制
                    </p>
                  </div>
                </div>
              </Link>
            )}
          </div>

          {/* 功能特色介绍 */}
          <div className="mt-12 bg-white dark:bg-gray-800 rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
              功能特色
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-2xl mb-4">📜</div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">传统占卜</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  融合增删卜易与卜筮正宗两大传统占卜体系，提供专业准确的卦象解释
                </p>
              </div>
              
              <div className="text-center">
                <div className="text-2xl mb-4">🤖</div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">AI智能解读</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  结合DeepSeek AI技术，为传统卦象提供现代化的智能解读和分析
                </p>
              </div>
              
              <div className="text-center">
                <div className="text-2xl mb-4">🔐</div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">安全可靠</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  邀请码注册机制，保护用户隐私，每个用户的数据完全独立
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
