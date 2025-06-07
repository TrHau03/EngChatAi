export function getRandomItems<T>(list: T[], count: number): T[] {
  if (!Array.isArray(list)) return [];
  const shuffled = [...list].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}
