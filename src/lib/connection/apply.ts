export const CONNECTION_ROLES = [
  "friend",
  "romantic-partner",
  "mentor",
  "mentee",
  "minion",
] as const;

export type ConnectionRole = (typeof CONNECTION_ROLES)[number];

const ROLE_WORDS: Record<ConnectionRole, string> = {
  friend: "friend",
  "romantic-partner": "romantic partner",
  mentor: "mentor",
  mentee: "mentee",
  minion: "minion",
};

const ROLE_LABELS: Record<ConnectionRole, string> = {
  friend: "Friend",
  "romantic-partner": "Romantic Partner",
  mentor: "Mentor",
  mentee: "Mentee",
  minion: "Minion",
};

const ROLE_DESCRIPTIONS: Partial<Record<ConnectionRole, string>> = {
  mentor: "You see the potential in me, and want to help nurture it",
  mentee: "You think you could learn a thing or two from the big man himself",
  minion:
    "You are willing to help me complete tasks with no acknowledgement or compensation of any kind. You want to be referred to only as igor.",
};

/** Asymmetric roles: what Ryan is when someone applies for `role`. */
const RYAN_COUNTERPART: Partial<Record<ConnectionRole, ConnectionRole>> = {
  mentor: "mentee",
  mentee: "mentor",
};

export function connectionRoleLabel(role: ConnectionRole) {
  return ROLE_LABELS[role];
}

export function connectionRoleDescription(role: ConnectionRole) {
  return ROLE_DESCRIPTIONS[role];
}

/** Role the applicant is applying for (relative to Ryan). */
export function applicantRoleWord(role: ConnectionRole) {
  return ROLE_WORDS[role];
}

/** Role Ryan would hold opposite the applicant. */
export function ryanRoleWord(role: ConnectionRole) {
  const counterpart = RYAN_COUNTERPART[role] ?? role;
  return ROLE_WORDS[counterpart];
}

export const EXCLUSIVE_PARTNER_ERROR =
  "I am not interested in exclusivity. I think love in all its forms should be cultivated wherever it arises <3. Try romantic partner instead";
