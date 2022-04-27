import { t_channel, t_msgInChannel } from "./type";

export let listChanel: t_channel[] = [
  {
    name: "RMC",
    id: 1,
    typeChannel: "private",
    password: "password",
    owner: "lenox",
    members: ["martin", "rapheal"],
    message: [{ user: "inconnu", content: "" }],
  },

  /* {
   *   name: "BEINSPORT",
   *   id: 2,
   *   type: "private",
   *   password: "password",
   *   owner: "martin",
   *   members: ["axel", "lenox", "boddez"],
   * },
   * {
   *   name: "TFI",
   *   id: 3,
   *   type: "private",
   *   password: "password",
   *   owner: "maxime",
   *   members: ["kery james", "youssoupha", "50 cent"],
   * }, */
];

export const userList = [
  {
    image: "https://avatars.dicebear.com/api/adventurer/ep.svg",
    name: "PATRICIA JOHNSON",
  },
  {
    image: "https://avatars.dicebear.com/api/human/:MARIA.svg",
    name: "MARIA FERGUSON",
  },
  {
    image: "https://avatars.dicebear.com/api/adventurer/KEISHA.svg",
    name: "KEISHA JACKSON",
  },
  {
    image: "https://avatars.dicebear.com/api/human/:LENOX.svg",
    name: "LENOX LEWIS",
  },
];
