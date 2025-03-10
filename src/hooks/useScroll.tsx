export function useScroll(idElement: any) {
  const elementScroll: any = document.getElementById(`${idElement}`);
  elementScroll.scrollIntoView();
  elementScroll.scrollIntoView(true);
  elementScroll.scrollIntoView({ block: "start" });
  elementScroll.scrollIntoView({ block: "start", behavior: "instant" });

  return useScroll;
}
