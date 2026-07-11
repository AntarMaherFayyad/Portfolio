import { useQuery } from '@tanstack/react-query'
import { createClient } from '@/lib/supabase/client'
import { Project } from '@/types/database'

export function useProjects() {
  return useQuery({
    queryKey: ['projects'],
    queryFn: async () => {
      const supabase = createClient()
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: true })

      if (error) throw error
      return data as Project[]
    },
  })
}