import React, { useState, useEffect } from 'react'
import { useDidShow, useDidHide } from '@tarojs/taro'

// 页面返回
// 用法可参考 src\pages\game\index.tsx
function pageBack(hideStatus) {
  const [pageHide, setPageHide] = useState(hideStatus)
  useDidShow(() => {
    if (pageHide) {
      setPageHide(false)
    }
  })

  useDidHide(() => {
    setPageHide(true)
  })

  return [pageHide]
}

export default pageBack
