// Simple test harness to verify the local fallback analysis logic
// Run with: node script/test_local_analysis.js

function generateLocalAnalysis() {
  const phytos = [
    { name: "Quercetin", benefits: "Anti-inflammatory — used for allergies and joint pain" },
    { name: "Rutin", benefits: "Supports blood vessel health and circulation" },
    { name: "Kaempferol", benefits: "Antioxidant; potential anticancer properties" },
    { name: "Tannins", benefits: "Astringent; digestive support and anti-diarrheal" },
    { name: "Carotenoids", benefits: "Antioxidant; supports eye health" },
  ];

  const geo = ["South America", "Southeast Asia", "Sub-Saharan Africa", "Mediterranean"];

  return {
    species: "Unknown Flower",
    confidence: 65,
    phytochemicals: phytos,
    geoDistribution: geo,
  };
}

console.log(JSON.stringify(generateLocalAnalysis(), null, 2));
