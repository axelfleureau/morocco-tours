"use client"

import { usePathname } from "next/navigation"
import ClientLayout from "./client-layout"

export default function ConditionalLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  
  const isAdminRoute = pathname?.startsWith('/admin')
  
  if (isAdminRoute) {
    return <>{children}</>
  }
  
  return <ClientLayout>{children}</ClientLayout>
}
