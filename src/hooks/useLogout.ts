import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

export function useLogout() {
  const router = useRouter()

  const logout = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/admin/login')
    router.refresh()
  }

  return logout
}