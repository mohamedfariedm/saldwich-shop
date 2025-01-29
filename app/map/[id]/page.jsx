import { redirect } from 'next/navigation';

// Pre-defined valid IDs with specific URLs
const idRedirectMap = {
  S01: 'https://g.page/r/CfsVT-BNjtS1EAI/review',
  S02: 'https://g.page/r/CXlmI582f9ozEAI/review',
  S03: 'https://g.page/r/Cfgvz-ayhnzAEAI/review',
  S04: 'https://g.page/r/CW7fTeZyjaG8EAI/review',
  S05: 'https://g.page/r/CTRf8bHCWPP4EAI/review',
  S06: 'https://g.page/r/CWWlc-KKFpkzEAI/review',
  S08: 'https://g.page/r/CduR82ButI-jEAI/review',
  S09: 'https://g.page/r/CWsXYlutZ12VEAI/review',
  S10: 'https://g.page/r/CfDaYBKLG8WSEAI/review',
  S11: 'https://g.page/r/CbxHBwj1KcJMEAI/review',
  S12: 'https://g.page/r/CSgjATYLWuuBEAI/review',
  S13: 'https://g.page/r/CWL64KdrVZZCEAI/review',
  S14: 'https://g.page/r/CcOJ1S1usfSOEAI/review',
  S15: 'https://g.page/r/CQt6ABPRdnQUEAI/review',
  S16: 'https://g.page/r/CYVm57d27LeyEAI/review',
  S17: 'https://g.page/r/CRdvAZUNDgWGEAI/review',
  S18: 'https://g.page/r/CQZoEhthp9oBEAI/review',
  S19: 'https://g.page/r/CX2b3PuMH60XEAI/review',
  S20: 'https://g.page/r/CY7kyMlVIWMmEAI/review',
  S21: 'https://g.page/r/CUp-HjIWYqBlEAI/review',
  S22: 'https://g.page/r/CSnvDDqCZnWPEAI/review',
  S23: 'https://g.page/r/CZWZXJ_QOXRgEAI/review',
  S24: 'https://g.page/r/CYA7JVSZ8eg3EAI/review',
  S25: 'https://g.page/r/Ca9dAdfXp6gQEAI/review',
  S26: 'https://g.page/r/CRQ2yxL-vXwdEAI/review',
};


// Generate static parameters for valid IDs
export async function generateStaticParams() {
  return Object.keys(idRedirectMap).map((id) => ({ id }));
}

// Main component
const MapPage = ({ params }) => {
  const { id } = params;

  // Check if the ID exists in the mapping object
  if (idRedirectMap[id]) {
    // Redirect to the specific URL for the given ID
    redirect(idRedirectMap[id]);
  }

  // If the ID is not valid, return a 404 page
  return (
    <div>
      <h1>404 - Page Not Found</h1>
      <p>The requested map ID does not exist.</p>
    </div>
  );
};

export default MapPage;
