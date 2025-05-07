// constants/routes.js
export const ROUTES = {
  PUBLIC: {
    LOGIN: "/login",
    CLIENT_LOGIN: "/client-login",
  },
  PROTECTED: {
    ADMIN: "/admin",
    TECHNICIEN: "/technicien",
    CLIENT: "/client",
    PLANNING: "/planning",
    SUIVI_INTERVENTIONS: "/suivi-interventions",
    BONS_COMMANDES: "/bons-commandes",
    DEMANDES_MATERIEL: "/demandes-materiel",
    FICHE_VERIFICATION: "/fiche-verification",
    SUIVI_VISITES: "/suivi-visites",
  },
  ROLES: {
    ADMIN: "admin",
    TECHNICIEN: "technicien",
    RESPONSABLE: "responsable_planning",
    ASSISTANTE: "assistante",
    CLIENT: "client",
  },
};
