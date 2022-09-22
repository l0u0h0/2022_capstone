// import axios
import axios from "axios";
// import type
import { Datatype } from "../common/types";

/** setting API_URL
 *  -> develop : localhost:3306
 */
const API_URL =
  process.env.NODE_ENV === "production" ? "???" : "http://localhost:3306";

// create DataService class
export default class DataService {
  public static async getDatas(): Promise<Datatype[]> {
    const response = await axios.get(`${API_URL}/test/GET_DATAS`);
    return response.data;
  }

  // public static async
}