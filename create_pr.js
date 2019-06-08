const octokit = require("./octokit");

const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
const branch_name =
  "ui_edits/" +
  Array.from({ length: 5 })
    .map(() => chars[Math.floor(Math.random() * chars.length)])
    .join("");

(async () => {
  const master_ref = (await octokit.git.getRef({
    owner: "kelleyvanevert",
    repo: "octotests",
    ref: "heads/master"
  })).data;

  console.log("found master ref");

  await octokit.git.createRef({
    owner: "kelleyvanevert",
    repo: "octotests",
    ref: "refs/heads/" + branch_name,
    sha: master_ref.object.sha
  });

  console.log("created branch", branch_name);

  const file = (await octokit.repos.getContents({
    owner: "kelleyvanevert",
    repo: "octotests",
    path: "contents/hello.md"
  })).data;

  const { content, commit } = (await octokit.repos.createOrUpdateFile({
    owner: "kelleyvanevert",
    repo: "octotests",
    path: "contents/hello.md",
    message: "just some some small edits!",
    sha: file.sha,
    content: Buffer.from("The time is " + Date.now()).toString("base64"),
    branch: branch_name,
    committer: {
      name: "Bot",
      email: "bot@bot.bot"
    }
  })).data;

  console.log("committed update to file");

  const pr = (await octokit.pulls.create({
    owner: "kelleyvanevert",
    repo: "octotests",
    title: "Edits via UI",
    head: branch_name,
    base: "master",
    body:
      "Here are some small edits to the course contents, make from the UI at " +
      Date.now()
  })).data;

  console.log("created PR, see", pr.url);
})();
