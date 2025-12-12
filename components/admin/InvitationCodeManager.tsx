'use client'

import { useState } from 'react'

export default function InvitationCodeManager() {
  const [codes, setCodes] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const generateCode = async () => {
    setIsLoading(true)
    setError('')
    setSuccess('')

    try {
      const token = localStorage.getItem('token')
      const response = await fetch('/api/user/invitation', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.error || '生成邀请码失败')
        return
      }

      setSuccess(`邀请码生成成功：${data.invitationCode.code}`)
      // 将新生成的邀请码添加到列表中
      setCodes(prev => [...prev, data.invitationCode])
    } catch (err) {
      setError('网络错误，请重试')
    } finally {
      setIsLoading(false)
    }
  }

  const copyToClipboard = (code: string) => {
    navigator.clipboard.writeText(code).then(() => {
      setSuccess('邀请码已复制到剪贴板')
      setTimeout(() => setSuccess(''), 3000)
    })
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">邀请码管理</h2>

        <div className="mb-6">
          <button
            onClick={generateCode}
            disabled={isLoading}
            className="w-full md:w-auto px-6 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50"
          >
            {isLoading ? '生成中...' : '生成新邀请码'}
          </button>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            生成的邀请码将在30天后过期
          </p>
        </div>

        {error && (
          <div className="mb-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md">
            <p className="text-red-800 dark:text-red-200">{error}</p>
          </div>
        )}

        {success && (
          <div className="mb-4 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-md">
            <p className="text-green-800 dark:text-green-200">{success}</p>
          </div>
        )}

        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">生成的邀请码</h3>
          
          {codes.length === 0 ? (
            <p className="text-gray-600 dark:text-gray-400">暂无邀请码，点击上方按钮生成</p>
          ) : (
            <div className="space-y-3">
              {codes.map((code) => (
                <div key={code.id} className="flex items-center justify-between p-3 bg-white dark:bg-gray-800 rounded border">
                  <div>
                    <div className="font-mono text-lg font-bold text-gray-900 dark:text-white">{code.code}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      有效期至：{new Date(code.expiresAt).toLocaleString('zh-CN')}
                    </div>
                  </div>
                  <button
                    onClick={() => copyToClipboard(code.code)}
                    className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    复制
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <h4 className="font-medium text-gray-900 dark:text-white mb-2">使用说明：</h4>
          <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
            <li>• 邀请码用于限制网站注册，需要邀请码才能注册</li>
            <li>• 每个邀请码只能使用一次</li>
            <li>• 邀请码生成后30天内有效</li>
            <li>• 请妥善保管邀请码，避免泄露给未授权人员</li>
          </ul>
        </div>
      </div>
    </div>
  )
}