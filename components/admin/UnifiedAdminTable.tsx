"use client"

import { useState } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { MoreVertical, Edit, Eye, EyeOff, Star, StarOff, Trash2 } from 'lucide-react'

export interface TableColumn<T> {
  key: string
  label: string
  render?: (item: T) => React.ReactNode
  className?: string
}

export interface TableAction<T> {
  label: string
  icon?: React.ReactNode
  onClick: (item: T) => void
  className?: string
  separator?: boolean
}

interface UnifiedAdminTableProps<T> {
  data: T[]
  columns: TableColumn<T>[]
  actions?: TableAction<T>[]
  keyExtractor: (item: T) => string
  emptyMessage?: React.ReactNode
}

export function UnifiedAdminTable<T>({
  data,
  columns,
  actions = [],
  keyExtractor,
  emptyMessage = 'No items found'
}: UnifiedAdminTableProps<T>) {
  
  if (data.length === 0) {
    return (
      <div className="text-center py-12 bg-muted/50 rounded-lg border-2 border-dashed">
        {typeof emptyMessage === 'string' ? (
          <p className="text-muted-foreground text-lg">{emptyMessage}</p>
        ) : (
          emptyMessage
        )}
      </div>
    )
  }

  return (
    <div className="bg-card border rounded-lg overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            {columns.map((column) => (
              <TableHead 
                key={column.key} 
                className={column.className}
              >
                {column.label}
              </TableHead>
            ))}
            {actions.length > 0 && (
              <TableHead className="text-right w-[80px]">Actions</TableHead>
            )}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item) => (
            <TableRow key={keyExtractor(item)}>
              {columns.map((column) => (
                <TableCell key={column.key} className={column.className}>
                  {column.render ? column.render(item) : (item as any)[column.key]}
                </TableCell>
              ))}
              {actions.length > 0 && (
                <TableCell className="text-right">
                  <DropdownMenu modal={false}>
                    <DropdownMenuTrigger asChild>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        className="h-8 w-8 p-0 hover:bg-accent"
                      >
                        <span className="sr-only">Open menu</span>
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent 
                      align="end" 
                      className="w-[200px] bg-popover border shadow-lg"
                      sideOffset={5}
                    >
                      {actions.map((action, idx) => (
                        <div key={idx}>
                          {action.separator && idx > 0 && <DropdownMenuSeparator />}
                          <DropdownMenuItem
                            onClick={() => action.onClick(item)}
                            className={action.className || 'cursor-pointer'}
                          >
                            {action.icon && <span className="mr-2">{action.icon}</span>}
                            {action.label}
                          </DropdownMenuItem>
                        </div>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export function createPublishedColumn<T extends { published?: boolean }>(): TableColumn<T> {
  return {
    key: 'published',
    label: 'Published',
    className: 'text-center',
    render: (item) => item.published ? (
      <Badge variant="default" className="bg-green-500">Published</Badge>
    ) : (
      <Badge variant="secondary">Draft</Badge>
    )
  }
}

export function createFeaturedColumn<T extends { featured?: boolean }>(): TableColumn<T> {
  return {
    key: 'featured',
    label: 'Featured',
    className: 'text-center',
    render: (item) => item.featured ? (
      <Star className="w-4 h-4 fill-orange-500 text-orange-500 mx-auto" />
    ) : (
      <StarOff className="w-4 h-4 text-muted-foreground mx-auto" />
    )
  }
}

export function createBooleanBadgeColumn<T>(
  key: string,
  label: string,
  trueLabel: string = 'Yes',
  falseLabel: string = 'No'
): TableColumn<T> {
  return {
    key,
    label,
    className: 'text-center',
    render: (item) => (item as any)[key] ? (
      <Badge variant="default" className="bg-blue-500">{trueLabel}</Badge>
    ) : (
      <Badge variant="secondary">{falseLabel}</Badge>
    )
  }
}

export function createStandardActions<T extends { id: string, published?: boolean, featured?: boolean }>(handlers: {
  onEdit: (item: T) => void,
  onTogglePublished: (item: T) => void,
  onToggleFeatured: (item: T) => void,
  onDelete: (item: T) => void
}): TableAction<T>[] {
  return [
    {
      label: 'Edit',
      icon: <Edit className="w-4 h-4" />,
      onClick: handlers.onEdit,
      className: 'cursor-pointer'
    },
    {
      label: 'Toggle Published',
      icon: <Eye className="w-4 h-4" />,
      onClick: handlers.onTogglePublished,
      className: 'cursor-pointer',
      separator: true
    },
    {
      label: 'Toggle Featured',
      icon: <Star className="w-4 h-4" />,
      onClick: handlers.onToggleFeatured,
      className: 'cursor-pointer'
    },
    {
      label: 'Delete',
      icon: <Trash2 className="w-4 h-4" />,
      onClick: handlers.onDelete,
      className: 'text-red-600 focus:text-red-600 cursor-pointer',
      separator: true
    }
  ]
}
