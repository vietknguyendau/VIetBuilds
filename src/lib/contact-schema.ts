/**
 * Contact form validation — shared shape, enforced on the server.
 * (No external validation library needed for five fields.)
 */

export const projectTypes = [
  "Custom application",
  "Workflow / business automation",
  "AI implementation idea",
  "League or community app",
  "Career opportunity",
  "Something else",
] as const;

export type ContactFields = {
  name: string;
  email: string;
  company: string;
  projectType: string;
  message: string;
};

export type ContactErrors = Partial<Record<keyof ContactFields, string>>;

export type ContactState =
  | { status: "idle" }
  | { status: "error"; message: string; errors?: ContactErrors; values?: Partial<ContactFields> }
  | { status: "success"; message: string };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export const limits = { name: 100, email: 254, company: 120, message: 3000, minMessage: 20 } as const;

export function validateContact(input: ContactFields): ContactErrors {
  const e: ContactErrors = {};
  if (!input.name) e.name = "Please enter your name.";
  else if (input.name.length > limits.name) e.name = `Please keep this under ${limits.name} characters.`;

  if (!input.email) e.email = "Please enter your email.";
  else if (input.email.length > limits.email || !EMAIL_RE.test(input.email)) e.email = "Please enter a valid email address.";

  if (input.company.length > limits.company) e.company = `Please keep this under ${limits.company} characters.`;

  if (!(projectTypes as readonly string[]).includes(input.projectType)) e.projectType = "Please choose a project type.";

  if (input.message.length < limits.minMessage)
    e.message = `Please share a bit more detail (at least ${limits.minMessage} characters).`;
  else if (input.message.length > limits.message) e.message = `Please keep this under ${limits.message} characters.`;

  return e;
}
