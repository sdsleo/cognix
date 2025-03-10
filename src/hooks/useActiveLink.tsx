export function useActiveLink(active: string) {
  if (active == "activeForm") {
    document.querySelector(".activeForm")?.classList.add("active");
    document.querySelector(".activeHist")?.classList.remove("active");
    document.querySelector(".activeParam")?.classList.remove("active");
    document.querySelector(".activeActivity")?.classList.remove("active");
  }
  if (active == "activeHist") {
    document.querySelector(".activeForm")?.classList.remove("active");
    document.querySelector(".activeHist")?.classList.add("active");
    document.querySelector(".activeParam")?.classList.remove("active");
    document.querySelector(".activeActivity")?.classList.remove("active");
  }
  if (active == "activeParam") {
    document.querySelector(".activeForm")?.classList.remove("active");
    document.querySelector(".activeHist")?.classList.remove("active");
    document.querySelector(".activeParam")?.classList.add("active");
    document.querySelector(".activeActivity")?.classList.remove("active");
  }
  if (active == "activeActivity") {
    document.querySelector(".activeForm")?.classList.remove("active");
    document.querySelector(".activeHist")?.classList.remove("active");
    document.querySelector(".activeParam")?.classList.remove("active");
    document.querySelector(".activeActivity")?.classList.add("active");
  }

  return useActiveLink;
}
