import { createClient } from "@supabase/supabase-js";
import { Game } from "../types/Game";
import { Player } from "../types/Player";
import { Team } from "../types/Team";

const SUPABASE_URL = "https://wjaeqzloacpfephrdkke.supabase.co";
const SUPABASE_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndqYWVxemxvYWNwZmVwaHJka2tlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTMzNzU1NTAsImV4cCI6MjAyODk1MTU1MH0.cBnwyiYEouqTt11sL27xebGk4Ucm7HsB_3odBmEUzPQ";
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

type TableNames = "game" | "player" | "team";

const SupabaseService = () => {
  /**
   * Retrieves all rows from a table
   */
  const getTable = async (tableName: TableNames) => {
    const { data, error } = await supabase.from(tableName).select("*");
    console.log(data);

    if (error) {
      throw new Error(error.message);
    }
    console.log("[SUPABASE_SERVICE] Successfully fetched table contents");
    return data;
  };

  const addItem = async (tableName: TableNames, item: Game | Player | Team) => {
    const { data, error } = await supabase.from(tableName).insert([item]);

    if (error) {
      throw new Error(error.message);
    }
    console.log("[SUPABASE_SERVICE] Successfully added item");
    return data;
  };

  const viewPlayersByTeam = async (teamID: number) => {
    const { data, error } = await supabase
      .from("player")
      .select("*")
      .eq("teamID", teamID);

    if (error) {
      throw new Error(error.message);
    }
    console.log(
      `[SUPABASE_SERVICE] Successfully fetched players from team ${teamID}`
    );

    return data;
  };

  const viewPlayersByPosition = async (position: string) => {
    const { data, error } = await supabase
      .from("player")
      .select("*")
      .eq("position", position);

    if (error) {
      throw new Error(error.message);
    }
    console.log(
      `[SUPABASE_SERVICE] Successfully fetched players from with position ${position}`
    );

    return data;
  };

  const viewTeamsByConference = async (conference: string) => {
    const { data, error } = await supabase
      .from("team")
      .select("*")
      .order("conference", { ascending: true })
      .order("wins", { ascending: false })
      .order("conferencewins", { ascending: false });

    if (error) {
      throw new Error(error.message);
    }
    console.log(
      `[SUPABASE_SERVICE] Successfully fetched teams from conference ${conference}`
    );

    return data;
  };

  const viewGamesByTeam = async (teamID: number) => {
    const { data, error } = await supabase
      .from("game")
      .select(
        `*,
      awayTeam:awayTeamId (nickname, location),
      homeTeam:homeTeamId (nickname, location)
      `
      )
      .or(`homeTeamId.eq.${teamID},awayTeamId.eq.${teamID}`);

    if (error) {
      throw new Error(error.message);
    }
    console.log(
      `[SUPABASE_SERVICE] Successfully fetched games from team ${teamID}`
    );

    return data;
  };

  const viewGamesByDate = async (date: string) => {
    const { data, error } = await supabase
      .from("game")
      .select(
        `awayTeamId, homeTeamId, awayTeamScore, homeTeamScore, date, 
        awayTeam:awayTeamId (nickname, location),
        homeTeam:homeTeamId (nickname, location)`
      )
      .eq("date", date);

    if (error) {
      throw new Error(error.message);
    }
    console.log(
      `[SUPABASE_SERVICE] Successfully fetched games from date ${date}`
    );

    return data;
  };

  return {
    getTable,
    addItem,
    viewPlayersByTeam,
    viewPlayersByPosition,
    viewTeamsByConference,
    viewGamesByTeam,
    viewGamesByDate,
  };
};

export default SupabaseService;
