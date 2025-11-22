export async function getAdminToken(): Promise<string> {
  return process.env.NEXT_PUBLIC_ADMIN_TOKEN || ''
}
