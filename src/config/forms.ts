export const FORM_ENDPOINTS = {
  CREATIVE_WORKSPACE:
    'https://script.google.com/macros/s/AKfycbw5_mDENuthcse6rvt1jyXbyIC8xxejJLk0WDPIemxzqRktW-wo4jdhXejR5riHCW61/exec',
  CONTACT_LEADS:
    'https://script.google.com/macros/s/AKfycbyG_jBidpk5Qw25vlqU0P3Cz_64KwXRRECCQ5T-zVWLkiHfmM_M4RCUptaPNUv4AB7rKw/exec',
};

/**
 * Submits form data payload to Google Apps Script Web App.
 * Uses 'no-cors' mode with text/plain content type to ensure cross-origin 
 * requests bypass preflight (OPTIONS) blockers and reliably reach Google Sheets.
 */
export async function submitToGoogleSheet(
  url: string,
  payload: Record<string, unknown>
): Promise<void> {
  await fetch(url, {
    method: 'POST',
    mode: 'no-cors',
    headers: {
      'Content-Type': 'text/plain;charset=utf-8',
    },
    body: JSON.stringify(payload),
  });
}
