
import { createClient } from "@supabase/supabase-js";
import config from "../../config.json";

// Create a single supabase client for interacting with your database
const supabase = createClient(config.PROJECT_URL, config.API_KEY);

export function backendService() {
    return {
        getAllVideos() {

            return supabase.from("videos")
                .select("*");
        },

        getAllPlaylists() {
            return supabase.from("playlists")
                .select("*");
        }
    }
}