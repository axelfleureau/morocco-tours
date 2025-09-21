"use client";

import { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Save, Eye, EyeOff, Calendar, Image, Type, Layout } from 'lucide-react';
import { CMSService, CMSContent, CMSSection } from '@/lib/cms';

interface CMSTab {
  id: string;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
}

export default function CMSInterface() {
  const [activeTab, setActiveTab] = useState('content');
  const [contents, setContents] = useState<CMSContent[]>([]);
  const [sections, setSections] = useState<CMSSection[]>([]);
  const [loading, setLoading] = useState(false);
  const [editingItem, setEditingItem] = useState<CMSContent | null>(null);
  const [showEditor, setShowEditor] = useState(false);

  const tabs: CMSTab[] = [
    { id: 'content', name: 'Gestione Contenuti', icon: Type },
    { id: 'sections', name: 'Sezioni Homepage', icon: Layout },
    { id: 'blog', name: 'Blog', icon: Calendar },
    { id: 'cities', name: 'Pagine Città', icon: Image }
  ];

  useEffect(() => {
    loadData();
  }, [activeTab]);

  const loadData = async () => {
    setLoading(true);
    try {
      if (activeTab === 'content' || activeTab === 'blog' || activeTab === 'cities') {
        const contentData = await CMSService.getAllContent();
        setContents(contentData);
      } else if (activeTab === 'sections') {
        const sectionsData = await CMSService.getAllSections();
        setSections(sectionsData);
      }
    } catch (error) {
      console.error('Error loading CMS data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateContent = () => {
    const newContent: Partial<CMSContent> = {
      type: activeTab === 'blog' ? 'blog' : activeTab === 'cities' ? 'page' : 'section',
      title: '',
      slug: '',
      content: {
        it: {
          title: '',
          description: '',
          body: ''
        }
      },
      published: false,
      featured: false,
      category: '',
      tags: [],
      images: [],
      author: 'Admin'
    };
    setEditingItem(newContent as CMSContent);
    setShowEditor(true);
  };

  const handleSaveContent = async (content: CMSContent) => {
    try {
      if (content.id) {
        await CMSService.updateContent(content.id, content);
      } else {
        await CMSService.saveContent(content);
      }
      setShowEditor(false);
      setEditingItem(null);
      loadData();
    } catch (error) {
      console.error('Error saving content:', error);
    }
  };

  const togglePublish = async (content: CMSContent) => {
    try {
      if (content.id) {
        await CMSService.updateContent(content.id, { published: !content.published });
        loadData();
      }
    } catch (error) {
      console.error('Error toggling publish:', error);
    }
  };

  const renderContentList = () => {
    const filteredContents = contents.filter(content => {
      if (activeTab === 'blog') return content.type === 'blog';
      if (activeTab === 'cities') return content.category === 'city';
      return content.type !== 'blog' && content.category !== 'city';
    });

    return (
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold">
            {activeTab === 'blog' ? 'Articoli Blog' : 
             activeTab === 'cities' ? 'Pagine Città' : 'Contenuti'}
          </h3>
          <button
            onClick={handleCreateContent}
            className="flex items-center space-x-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:opacity-90"
          >
            <Plus className="w-4 h-4" />
            <span>Nuovo</span>
          </button>
        </div>

        {loading ? (
          <div className="space-y-3">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-card p-4 rounded-lg animate-pulse">
                <div className="h-4 bg-muted rounded w-1/3 mb-2"></div>
                <div className="h-3 bg-muted rounded w-2/3"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-3">
            {filteredContents.map((content) => (
              <div key={content.id} className="bg-card border border-border rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3">
                      <h4 className="font-medium">{content.title}</h4>
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        content.published 
                          ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300'
                          : 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300'
                      }`}>
                        {content.published ? 'Pubblicato' : 'Bozza'}
                      </span>
                      {content.featured && (
                        <span className="px-2 py-1 text-xs rounded-full bg-primary/10 text-primary">
                          In Evidenza
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      {content.slug} • {content.category || 'Nessuna categoria'}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => togglePublish(content)}
                      className="p-2 hover:bg-muted rounded-lg"
                      title={content.published ? 'Nascondi' : 'Pubblica'}
                    >
                      {content.published ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                    <button
                      onClick={() => {
                        setEditingItem(content);
                        setShowEditor(true);
                      }}
                      className="p-2 hover:bg-muted rounded-lg"
                      title="Modifica"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteContent(content.id!)}
                      className="p-2 hover:bg-muted text-destructive rounded-lg"
                      title="Elimina"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  const handleDeleteContent = async (contentId: string) => {
    if (confirm('Sei sicuro di voler eliminare questo contenuto?')) {
      try {
        await CMSService.deleteContent(contentId);
        loadData();
      } catch (error) {
        console.error('Error deleting content:', error);
      }
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Content Management System
        </h1>
        <p className="text-gray-600 dark:text-gray-300 mt-2">
          Gestisci tutti i contenuti del sito in modo centralizzato
        </p>
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-border mb-6">
        <nav className="flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === tab.id
                  ? 'border-primary text-primary'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              <span>{tab.name}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Content Area */}
      <div className="bg-background rounded-lg">
        {renderContentList()}
      </div>

      {/* Content Editor Modal */}
      {showEditor && editingItem && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-background border border-border rounded-lg w-full max-w-4xl max-h-[90vh] overflow-hidden">
            <div className="p-6 border-b border-border">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">
                  {editingItem.id ? 'Modifica Contenuto' : 'Nuovo Contenuto'}
                </h3>
                <button
                  onClick={() => setShowEditor(false)}
                  className="p-2 hover:bg-muted rounded-lg"
                >
                  ×
                </button>
              </div>
            </div>
            
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
              <ContentEditor
                content={editingItem}
                onSave={handleSaveContent}
                onCancel={() => setShowEditor(false)}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

interface ContentEditorProps {
  content: CMSContent;
  onSave: (content: CMSContent) => void;
  onCancel: () => void;
}

function ContentEditor({ content, onSave, onCancel }: ContentEditorProps) {
  const [formData, setFormData] = useState(content);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">Titolo</label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="w-full px-3 py-2 border border-border rounded-lg"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Slug URL</label>
          <input
            type="text"
            value={formData.slug}
            onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
            className="w-full px-3 py-2 border border-border rounded-lg"
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Descrizione</label>
        <textarea
          value={formData.content?.it?.description || ''}
          onChange={(e) => setFormData({
            ...formData,
            content: {
              ...formData.content,
              it: {
                ...formData.content?.it,
                title: formData.title,
                description: e.target.value
              }
            }
          })}
          rows={3}
          className="w-full px-3 py-2 border border-border rounded-lg"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Contenuto</label>
        <textarea
          value={formData.content?.it?.body || ''}
          onChange={(e) => setFormData({
            ...formData,
            content: {
              ...formData.content,
              it: {
                ...formData.content?.it,
                title: formData.title,
                description: formData.content?.it?.description || '',
                body: e.target.value
              }
            }
          })}
          rows={8}
          className="w-full px-3 py-2 border border-border rounded-lg"
          placeholder="Contenuto principale..."
        />
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">Categoria</label>
          <input
            type="text"
            value={formData.category || ''}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            className="w-full px-3 py-2 border border-border rounded-lg"
          />
        </div>
        <div className="flex items-center space-x-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={formData.published}
              onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
              className="mr-2"
            />
            Pubblicato
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={formData.featured}
              onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
              className="mr-2"
            />
            In Evidenza
          </label>
        </div>
      </div>

      <div className="flex justify-end space-x-3">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 border border-border rounded-lg hover:bg-muted"
        >
          Annulla
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90"
        >
          Salva
        </button>
      </div>
    </form>
  );
}