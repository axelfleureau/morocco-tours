"use client"

import React, { useState, useEffect } from 'react'
import { Plus, Edit, Trash2, Eye, Move, Type, Image, Square as ButtonIcon, Layout } from 'lucide-react'

interface Block {
  id: string
  type: 'text' | 'image' | 'button' | 'heading' | 'spacer'
  content: any
  styling?: {
    colors?: { background?: string; text?: string; accent?: string }
    typography?: { fontSize?: string; fontWeight?: string }
    spacing?: { padding?: string; margin?: string }
    layout?: { width?: string; alignment?: string }
  }
}

interface VisualEditorProps {
  pageId?: string
  pageType: 'homepage' | 'city' | 'experience' | 'travel' | 'about' | 'contact'
  onSave: (blocks: Block[]) => void
}

export default function VisualEditor({ pageId, pageType, onSave }: VisualEditorProps) {
  const [blocks, setBlocks] = useState<Block[]>([])
  const [selectedBlockId, setSelectedBlockId] = useState<string | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [previewMode, setPreviewMode] = useState(false)
  
  // Block templates
  const blockTemplates = {
    text: {
      type: 'text' as const,
      content: { text: 'Inserisci il tuo testo qui...', tag: 'p' },
      styling: { typography: { fontSize: '16px', fontWeight: '400' } }
    },
    heading: {
      type: 'heading' as const,
      content: { text: 'Titolo della sezione', tag: 'h2' },
      styling: { typography: { fontSize: '32px', fontWeight: '700' } }
    },
    image: {
      type: 'image' as const,
      content: { src: '/placeholder.jpg', alt: 'Immagine', caption: '' },
      styling: { layout: { width: '100%', alignment: 'center' } }
    },
    button: {
      type: 'button' as const,
      content: { text: 'Clicca qui', href: '#', variant: 'primary' },
      styling: { 
        colors: { background: '#3b82f6', text: '#ffffff' },
        spacing: { padding: '12px 24px' }
      }
    },
    spacer: {
      type: 'spacer' as const,
      content: { height: '40px' },
      styling: { spacing: { margin: '20px 0' } }
    }
  }

  // Add new block
  const addBlock = (type: keyof typeof blockTemplates) => {
    const newBlock: Block = {
      id: Date.now().toString(),
      ...blockTemplates[type]
    }
    setBlocks(prev => [...prev, newBlock])
    setSelectedBlockId(newBlock.id)
    setIsEditing(true)
  }

  // Update block content
  const updateBlock = (blockId: string, updates: Partial<Block>) => {
    setBlocks(prev => prev.map(block => 
      block.id === blockId ? { ...block, ...updates } : block
    ))
  }

  // Delete block
  const deleteBlock = (blockId: string) => {
    setBlocks(prev => prev.filter(block => block.id !== blockId))
    setSelectedBlockId(null)
  }

  // Move block up/down
  const moveBlock = (blockId: string, direction: 'up' | 'down') => {
    setBlocks(prev => {
      const index = prev.findIndex(block => block.id === blockId)
      if (index === -1) return prev
      
      const newIndex = direction === 'up' ? index - 1 : index + 1
      if (newIndex < 0 || newIndex >= prev.length) return prev
      
      const newBlocks = [...prev]
      const [block] = newBlocks.splice(index, 1)
      newBlocks.splice(newIndex, 0, block)
      return newBlocks
    })
  }

  // Render block in editor
  const renderBlock = (block: Block) => {
    const isSelected = selectedBlockId === block.id
    const styling = block.styling || {}
    
    const baseStyle = {
      padding: styling.spacing?.padding || '8px',
      margin: styling.spacing?.margin || '4px 0',
      backgroundColor: styling.colors?.background,
      color: styling.colors?.text,
      fontSize: styling.typography?.fontSize,
      fontWeight: styling.typography?.fontWeight,
      width: styling.layout?.width || 'auto',
      textAlign: styling.layout?.alignment as any || 'left'
    }

    let content
    switch (block.type) {
      case 'text':
        content = (
          <div style={baseStyle}>
            {React.createElement(
              block.content.tag || 'p',
              {},
              block.content.text
            )}
          </div>
        )
        break
      case 'heading':
        content = (
          <div style={baseStyle}>
            {React.createElement(
              block.content.tag || 'h2',
              {},
              block.content.text
            )}
          </div>
        )
        break
      case 'image':
        content = (
          <div style={baseStyle}>
            <img 
              src={block.content.src} 
              alt={block.content.alt}
              style={{ maxWidth: '100%', height: 'auto' }}
            />
            {block.content.caption && (
              <p className="text-sm text-gray-600 mt-2">{block.content.caption}</p>
            )}
          </div>
        )
        break
      case 'button':
        content = (
          <div style={baseStyle}>
            <button 
              style={{
                backgroundColor: styling.colors?.background || '#3b82f6',
                color: styling.colors?.text || '#ffffff',
                padding: styling.spacing?.padding || '12px 24px',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer'
              }}
            >
              {block.content.text}
            </button>
          </div>
        )
        break
      case 'spacer':
        content = (
          <div 
            style={{
              height: block.content.height,
              ...baseStyle
            }}
          />
        )
        break
      default:
        content = <div>Tipo blocco non supportato</div>
    }

    return (
      <div
        key={block.id}
        className={`relative group border-2 ${
          isSelected ? 'border-blue-500' : 'border-transparent hover:border-blue-300'
        } transition-colors cursor-pointer`}
        onClick={() => setSelectedBlockId(block.id)}
      >
        {content}
        
        {/* Block controls */}
        {isSelected && !previewMode && (
          <div className="absolute top-0 right-0 -mt-2 -mr-2 flex gap-1">
            <button
              onClick={(e) => {
                e.stopPropagation()
                moveBlock(block.id, 'up')
              }}
              className="p-1 bg-blue-500 text-white rounded text-xs hover:bg-blue-600"
              title="Sposta su"
            >
              ↑
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation()
                moveBlock(block.id, 'down')
              }}
              className="p-1 bg-blue-500 text-white rounded text-xs hover:bg-blue-600"
              title="Sposta giù"
            >
              ↓
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation()
                setIsEditing(true)
              }}
              className="p-1 bg-green-500 text-white rounded text-xs hover:bg-green-600"
              title="Modifica"
            >
              <Edit className="w-3 h-3" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation()
                deleteBlock(block.id)
              }}
              className="p-1 bg-red-500 text-white rounded text-xs hover:bg-red-600"
              title="Elimina"
            >
              <Trash2 className="w-3 h-3" />
            </button>
          </div>
        )}
      </div>
    )
  }

  // Render block properties editor
  const renderBlockEditor = () => {
    const selectedBlock = blocks.find(b => b.id === selectedBlockId)
    if (!selectedBlock) return null

    return (
      <div className="bg-white border rounded-lg p-4 mt-4">
        <h3 className="font-semibold mb-3">Modifica Blocco: {selectedBlock.type}</h3>
        
        {/* Content editing based on block type */}
        {selectedBlock.type === 'text' && (
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium mb-1">Testo</label>
              <textarea
                value={selectedBlock.content.text}
                onChange={(e) => updateBlock(selectedBlock.id, {
                  content: { ...selectedBlock.content, text: e.target.value }
                })}
                className="w-full p-2 border rounded"
                rows={3}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Tag HTML</label>
              <select
                value={selectedBlock.content.tag}
                onChange={(e) => updateBlock(selectedBlock.id, {
                  content: { ...selectedBlock.content, tag: e.target.value }
                })}
                className="p-2 border rounded"
              >
                <option value="p">Paragrafo (p)</option>
                <option value="span">Span</option>
                <option value="div">Div</option>
              </select>
            </div>
          </div>
        )}
        
        {selectedBlock.type === 'heading' && (
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium mb-1">Titolo</label>
              <input
                type="text"
                value={selectedBlock.content.text}
                onChange={(e) => updateBlock(selectedBlock.id, {
                  content: { ...selectedBlock.content, text: e.target.value }
                })}
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Livello</label>
              <select
                value={selectedBlock.content.tag}
                onChange={(e) => updateBlock(selectedBlock.id, {
                  content: { ...selectedBlock.content, tag: e.target.value }
                })}
                className="p-2 border rounded"
              >
                <option value="h1">H1</option>
                <option value="h2">H2</option>
                <option value="h3">H3</option>
                <option value="h4">H4</option>
              </select>
            </div>
          </div>
        )}
        
        {selectedBlock.type === 'button' && (
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium mb-1">Testo Pulsante</label>
              <input
                type="text"
                value={selectedBlock.content.text}
                onChange={(e) => updateBlock(selectedBlock.id, {
                  content: { ...selectedBlock.content, text: e.target.value }
                })}
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Link</label>
              <input
                type="text"
                value={selectedBlock.content.href}
                onChange={(e) => updateBlock(selectedBlock.id, {
                  content: { ...selectedBlock.content, href: e.target.value }
                })}
                className="w-full p-2 border rounded"
                placeholder="https://..."
              />
            </div>
          </div>
        )}

        {/* Universal styling options */}
        <div className="mt-4 pt-4 border-t">
          <h4 className="font-medium mb-3">Stile</h4>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium mb-1">Colore Testo</label>
              <input
                type="color"
                value={selectedBlock.styling?.colors?.text || '#000000'}
                onChange={(e) => updateBlock(selectedBlock.id, {
                  styling: {
                    ...selectedBlock.styling,
                    colors: {
                      ...selectedBlock.styling?.colors,
                      text: e.target.value
                    }
                  }
                })}
                className="w-full h-10 border rounded"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Colore Sfondo</label>
              <input
                type="color"
                value={selectedBlock.styling?.colors?.background || '#ffffff'}
                onChange={(e) => updateBlock(selectedBlock.id, {
                  styling: {
                    ...selectedBlock.styling,
                    colors: {
                      ...selectedBlock.styling?.colors,
                      background: e.target.value
                    }
                  }
                })}
                className="w-full h-10 border rounded"
              />
            </div>
          </div>
        </div>

        <div className="mt-4 flex gap-2">
          <button
            onClick={() => setIsEditing(false)}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Fine
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="h-full flex">
      {/* Toolbar */}
      <div className="w-64 bg-gray-50 p-4 border-r">
        <div className="space-y-4">
          <div className="flex items-center gap-2 mb-4">
            <Layout className="w-5 h-5" />
            <h2 className="font-semibold">Visual Editor</h2>
          </div>
          
          <div className="flex gap-2">
            <button
              onClick={() => setPreviewMode(!previewMode)}
              className={`flex-1 px-3 py-2 rounded text-sm ${
                previewMode ? 'bg-green-500 text-white' : 'bg-gray-200'
              }`}
            >
              <Eye className="w-4 h-4 inline mr-1" />
              {previewMode ? 'Modifica' : 'Anteprima'}
            </button>
            <button
              onClick={() => onSave(blocks)}
              className="px-3 py-2 bg-blue-500 text-white rounded text-sm hover:bg-blue-600"
            >
              Salva
            </button>
          </div>

          {!previewMode && (
            <div>
              <h3 className="font-medium mb-2">Aggiungi Blocco</h3>
              <div className="space-y-2">
                {Object.entries(blockTemplates).map(([type, template]) => (
                  <button
                    key={type}
                    onClick={() => addBlock(type as keyof typeof blockTemplates)}
                    className="w-full p-2 text-left bg-white border rounded hover:bg-gray-50 flex items-center gap-2"
                  >
                    {type === 'text' && <Type className="w-4 h-4" />}
                    {type === 'heading' && <Type className="w-4 h-4" />}
                    {type === 'image' && <Image className="w-4 h-4" />}
                    {type === 'button' && <ButtonIcon className="w-4 h-4" />}
                    {type === 'spacer' && <Layout className="w-4 h-4" />}
                    <span className="capitalize">{type}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Editor Canvas */}
      <div className="flex-1 p-4">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-lg font-semibold mb-4">
            Editor Pagina: {pageType} {pageId && `(${pageId})`}
          </h3>
          
          <div className="bg-white min-h-96 border rounded-lg p-4">
            {blocks.length === 0 ? (
              <div className="text-center text-gray-500 py-12">
                <Layout className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>Nessun blocco presente. Aggiungi il primo blocco dalla barra laterale.</p>
              </div>
            ) : (
              blocks.map(renderBlock)
            )}
          </div>
          
          {isEditing && renderBlockEditor()}
        </div>
      </div>
    </div>
  )
}