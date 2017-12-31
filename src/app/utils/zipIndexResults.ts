export function zipIndexResults(releasesResults, agenciesResults) {
  return [...agenciesResults, ...releasesResults]
    .sort((a, b) => a.score > b.score ? -1 : a.score === b.score ? 0 : 1)
    .map(result => ({ ...result.item, score: result.score }));
}
