import React from 'react'
import { createRoot } from 'react-dom/client'

import HtmlTodo from './components/app'

const rootElement = document.getElementById('root')

const root = createRoot(rootElement)

root.render(<HtmlTodo />)
