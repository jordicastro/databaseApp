import { createClient } from "@supabase/supabase-js";
import { Game } from "../types/Game";
import { Player } from "../types/Player";
import { Team } from "../types/Team";

//
const SUPABASE_URL = "https://wjaeqzloacpfephrdkke.supabase.co";
const SUPABASE_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndqYWVxemxvYWNwZmVwaHJka2tlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTMzNzU1NTAsImV4cCI6MjAyODk1MTU1MH0.cBnwyiYEouqTt11sL27xebGk4Ucm7HsB_3odBmEUzPQ";
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

type TableNames = "game" | "player" | "team";

const SupabaseService = () => {
  const getTable = async (tableName: TableNames) => {
    const { data, error } = await supabase.from(tableName).select("*");

    if (error) {
      throw new Error(error.message);
    }
    console.log("[supabaseService] Successfully fetched table contents");
    return data;
  };
  const addItem = async (tableName: TableNames, item: Game | Player | Team) => {
    const { data, error } = await supabase.from(tableName).insert([item]);

    if (error) {
      throw new Error(error.message);
    }
    console.log("[supabaseService] Successfully added item");
    return data;
  };

  const viewPlayersFromTeam = async (teamID: number) => {
    const { data, error } = await supabase
      .from("player")
      .select("*")
      .eq("teamID", teamID);

    if (error) {
      throw new Error(error.message);
    }
    console.log(
      `[supabaseService] Successfully fetched players from team ${teamID}`
    );

    return data;
  };

  const viewPlayersFromPosition = async (position: string) => {
    const { data, error } = await supabase
      .from("player")
      .select("*")
      .eq("position", position);
    
    if (error) {
      throw new Error(error.message);
    }
    console.log(
      `[supabaseService] Successfully fetched players from position ${position}`
    );

    return data;
  };

  return { getTable, addItem, viewPlayersFromTeam, viewPlayersFromPosition };
};

export default SupabaseService;
