import { useQuery } from '@tanstack/react-query'
import { createClient } from '@/lib/supabase/client'
import { Skill } from '@/types/database'

export function useSkills() {
  return useQuery({
    queryKey: ['skills'],
    queryFn: async () => {
      const supabase = createClient()
      const { data, error } = await supabase
        .from('skills')
        .select('*')
        .order('sort_order', { ascending: true })

      if (error) throw error
      return data as Skill[]
    },
  })
}