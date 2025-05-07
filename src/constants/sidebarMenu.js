export const menuByRole = {
  admin: [
    { label: "Dashboard", path: "/admin" },
    { label: "Utilisateurs", path: "/users" },
    { label: "Clients", path: "/clients" },
    { label: "Sites", path: "/sites" },
    { label: "Stocks & Matériel", path: "/stock" },
  ],
  responsable_planning: [
    { label: "Dashboard", path: "/responsable_planning" },
    { label: "Planifier intervention", path: "/planifier-intervention" },
    { label: "Suivi des interventions", path: "/suivi-interventions" },
    { label: "Suivi des commandes", path: "/bons-commandes" },
    { label: "Techniciens", path: "/techniciens" },
  ],
  technicien: [
    { label: "Mon planning", path: "/technicien" },
    { label: "Demandes de matériel", path: "/demandes-materiel" },
    { label: "Fiche de vérification", path: "/fiche-verification" },
    { label: "Notifications", path: "/notifications" },
  ],
  assistante: [
    { label: "Dashboard", path: "/assistant" },
    { label: "Suivi des interventions", path: "/suivi-interventions" },
    { label: "Suivi des visites", path: "/suivi-visites" },
  ],
};
