import { execFileSync } from "node:child_process";

const project = "2";
const owner = "matiasgbq";

let projectData;

try {
  const response = execFileSync(
    "gh",
    [
      "project",
      "item-list",
      project,
      "--owner",
      owner,
      "--limit",
      "100",
      "--format",
      "json",
    ],
    { encoding: "utf8" },
  );

  projectData = JSON.parse(response);
} catch (error) {
  const detail = error instanceof Error ? error.message : String(error);
  console.error("Unable to read the GitHub Project through the local gh session.");
  console.error("Verify access with: gh auth status");
  console.error(detail);
  process.exit(1);
}

const relevantItems = projectData.items
  .filter((item) =>
    item.status === "En curso" ||
    item.status === "Bloqueado" ||
    Boolean(item.sprint),
  )
  .sort((left, right) => {
    const order = { "En curso": 0, Refinada: 1, Bloqueado: 2 };
    return (order[left.status] ?? 3) - (order[right.status] ?? 3);
  });

console.log("La Colorada · Current backlog context");

for (const item of relevantItems) {
  const number = item.content?.number ? `#${item.content.number}` : "draft";
  const sprint = item.sprint ? ` · ${item.sprint}` : "";
  console.log(`${item.status} · ${number} · ${item.title}${sprint}`);
}

if (relevantItems.length === 0) {
  console.log("No active sprint items or blockers were found.");
}
