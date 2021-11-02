import React from "react";

export interface Links {
  games: string;
  moves: string;
}

export interface LinksContext {
  links: Links;
  setLinks: React.Dispatch<React.SetStateAction<Links>>;
}

export const DownloadLinksContext = React.createContext<LinksContext>({
  links: {
    games: "",
    moves: "",
  },
  setLinks: () => {},
});
