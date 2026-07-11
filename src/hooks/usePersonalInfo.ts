import { useQuery } from '@tanstack/react-query'
import { createClient } from '@/lib/supabase/client'
import { PersonalInfo } from '@/types/database'

export function usePersonalInfo() {
  return useQuery({
    queryKey: ['personal_info'],
    queryFn: async () => {
      const supabase = createClient()
      const { data, error } = await supabase
        .from('personal_info')
        .select('*')
        .single()

      if (error) throw error
      return data as PersonalInfo
    },
  })
}