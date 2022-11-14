
import { createClient } from "@supabase/supabase-js";

// Create a single supabase client for interacting with your database
const PROJECT_URL = 'https://hynjbhiedohvvghdrkwd.supabase.co';
const API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh5bmpiaGllZG9odnZnaGRya3dkIiwicm9sZSI6ImFub24iLCJpYXQiOjE2Njg0MjkzMjgsImV4cCI6MTk4NDAwNTMyOH0.1dmzA0RlwcfJbh6EuHLpIyMcB6ynFZBF33An5FlbaLU';
const supabase = createClient(PROJECT_URL, API_KEY);

export function videosService() {
    return {
        getAllVideos() {

            return supabase.from("videos")
                .select("*");
        }
    }
}