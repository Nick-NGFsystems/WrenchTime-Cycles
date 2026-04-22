'use client'
import { useEffect } from 'react'

export default function NgfEditBridge() {
  useEffect(() => {
    let editMode = false

    // Inject styles - only visible when edit mode is active (data-ngf-edit="true" on <html>)
    const style = document.createElement('style')
    style.id = 'ngf-edit-styles'
    style.textContent = `
      /* Edit indicators - only shown while in portal editor */
      [data-ngf-edit="true"] [data-ngf-field] {
        outline: 1.5px dashed rgba(59,130,246,0.45) !important;
        border-radius: 3px;
        cursor: pointer !important;
      }

      [data-ngf-edit="true"] [data-ngf-field]:hover {
        outline-color: #3b82f6 !important;
        background-color: rgba(59,130,246,0.06) !important;
      }

      /* Empty field placeholder — keeps blank fields clickable in edit mode */
      [data-ngf-edit="true"] [data-ngf-field]:empty {
        min-height: 1.2em;
        min-width: 60px;
        display: inline-block;
      }
      [data-ngf-edit="true"] [data-ngf-field]:empty::before {
        content: attr(data-ngf-label);
        color: #94a3b8;
        font-style: italic;
        pointer-events: none;
      }

      /* Block link/button navigation while editing */
      [data-ngf-edit="true"] a,
      [data-ngf-edit="true"] button {
        pointer-events: none;
      }
    `
    document.head.appendChild(style)

    // Signal parent that bridge is ready - parent will respond with setEditMode
    window.parent.postMessage({ type: 'ngfReady' }, '*')

    const messageHandler = (e: MessageEvent) => {
      if (e.data?.type === 'setEditMode') {
        editMode = !!e.data.enabled
        document.documentElement.setAttribute('data-ngf-edit', editMode ? 'true' : 'false')
      }

      if (e.data?.type === 'contentUpdate' && e.data.content) {
        // Recursively flatten nested content (including arrays) and update
        // every matching [data-ngf-field] element in the DOM.
        function applyFlat(obj: Record<string, unknown>, prefix: string) {
          for (const [key, value] of Object.entries(obj)) {
            const path = prefix ? `${prefix}.${key}` : key
            if (typeof value === 'string') {
              const el = document.querySelector<HTMLElement>(`[data-ngf-field="${path}"]`)
              if (el) el.textContent = value
            } else if (Array.isArray(value)) {
              value.forEach((item, i) => {
                if (item && typeof item === 'object') {
                  applyFlat(item as Record<string, unknown>, `${path}.${i}`)
                }
              })
            } else if (value && typeof value === 'object') {
              applyFlat(value as Record<string, unknown>, path)
            }
          }
        }
        applyFlat(e.data.content as Record<string, unknown>, '')
      }
    }

    // Capture phase - intercepts before any link/button default handlers
    const clickHandler = (e: MouseEvent) => {
      if (!editMode) return
      e.preventDefault()
      e.stopPropagation()
      e.stopImmediatePropagation()

      let target = e.target as HTMLElement | null
      while (target && target !== document.documentElement) {
        const attr = target.getAttribute('data-ngf-field')
        if (attr) {
          const dot = attr.indexOf('.')
          if (dot > -1) {
            const rect = target.getBoundingClientRect()
            window.parent.postMessage(
              {
                type: 'fieldClick',
                section: attr.substring(0, dot),
                field: attr.substring(dot + 1),
                currentValue: target.textContent?.trim() ?? '',
                elementRect: {
                  top: rect.top, left: rect.left,
                  bottom: rect.bottom, right: rect.right,
                  width: rect.width, height: rect.height,
                },
              },
              '*'
            )
          }
          return
        }
        target = target.parentElement
      }
    }

    window.addEventListener('message', messageHandler)
    document.addEventListener('click', clickHandler, true)

    return () => {
      window.removeEventListener('message', messageHandler)
      document.removeEventListener('click', clickHandler, true)
      document.getElementById('ngf-edit-styles')?.remove()
      document.documentElement.removeAttribute('data-ngf-edit')
    }
  }, [])

  return null
}
