import { createClient } from '@supabase/supabase-js'
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYzOTIxNzQ2MCwiZXhwIjoxOTU0NzkzNDYwfQ.NPi1lgVqh3XZ7hjjSAM_S3v94Pmeq6FufZ-puLActQ4'
export default ({ app }, inject) => {
    const supabaseUrl = 'https://fjpxmibvgnyjwxrpskdd.supabase.co'
    const supabaseKey = SUPABASE_KEY
    const supabase = createClient(supabaseUrl, supabaseKey)

    inject('supabase', supabase)
}