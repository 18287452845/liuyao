'use client'

import { useState } from 'react'
import Navigation from '../../components/layout/Navigation'
import UserManagement from '../../components/admin/UserManagement'
import InvitationCodeManager from '../../components/admin/InvitationCodeManager'

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<'users' | 'codes'>('users')

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navigation />
      
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              系统管理
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              管理系统用户、权限和邀请码
            </p>
          </div>

          <div className="mb-6">
            <div className="border-b border-gray-200 dark:border-gray-700">
              <nav className="-mb-px flex space-x-8">
                <button
                  onClick={() => setActiveTab('users')}
                  className={`py-2 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'users'
                      ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
                  }`}
                >
                  用户管理
                </button>
                <button
                  onClick={() => setActiveTab('codes')}
                  className={`py-2 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'codes'
                      ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
                  }`}
                >
                  邀请码管理
                </button>
              </nav>
            </div>
          </div>

          <div className="space-y-6">
            {activeTab === 'users' ? (
              <UserManagement />
            ) : (
              <InvitationCodeManager />
            )}
          </div>

          <div className="mt-12 bg-white dark:bg-gray-800 rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
              管理员功能说明
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">用户管理</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  管理员可以查看所有用户的详细信息，包括注册时间、各模块使用情况等。
                  这有助于了解用户活跃度和系统使用情况。
                </p>
                <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                  <li>• 查看用户基本信息</li>
                  <li>• 监控用户活跃度</li>
                  <li>• 跟踪功能使用统计</li>
                  <li>• 管理用户权限</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">邀请码管理</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  通过邀请码机制控制网站注册，确保只有获得邀请的用户才能注册使用，
                  有效防止恶意注册和垃圾账户。
                </p>
                <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                  <li>• 生成唯一邀请码</li>
                  <li>• 设置邀请码有效期</li>
                  <li>• 控制用户注册权限</li>
                  <li>• 防止恶意注册</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}