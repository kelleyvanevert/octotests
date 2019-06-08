const octokit = require("./octokit");

const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
const branch_name =
  "ui_edits/" +
  Array.from({ length: 5 })
    .map(() => chars[Math.floor(Math.random() * chars.length)])
    .join("");

console.log("creating branch:", branch_name);

(async () => {
  const master_ref = (await octokit.git.getRef({
    owner: "kelleyvanevert",
    repo: "octotests",
    ref: "heads/master"
  })).data;

  console.log("master ref", master_ref);

  const branch_ref = (await octokit.git.createRef({
    owner: "kelleyvanevert",
    repo: "octotests",
    ref: "refs/heads/" + branch_name,
    sha: master_ref.object.sha
  })).data;

  console.log("created branch ref", branch_ref);
})();
