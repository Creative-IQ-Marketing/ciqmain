/**
 * CreativeIQ vCard utility
 * Generates a VCF 3.0 contact card and triggers a native download.
 * Works on iOS Safari, Android Chrome, and desktop browsers — no app required.
 */

const VCF_LINES = [
  "BEGIN:VCARD",
  "VERSION:3.0",
  "FN:CreativeIQ",
  "N:CreativeIQ;;;;",
  "ORG:CreativeIQ",
  "TITLE:AI Driven Digital Marketing Agency",
  "TEL;TYPE=WORK,VOICE:+12108380177",
  "EMAIL;TYPE=WORK,INTERNET:CiQ@creativeiq.marketing",
  "URL:https://creativeiq.marketing",
  "LOGO;VALUE=URI:https://storage.googleapis.com/msgsndr/5f7iztRPELugzDENTIXd/media/69443873e7887024232f3299.png",
  "ADR;TYPE=WORK:;;San Antonio;TX;78205;US",
  "NOTE:AI-ready SEO\\, PPC\\, CRM automation & web development. San Antonio TX.",
  "CATEGORIES:Marketing,SEO,PPC,CRM,Web Development",
  "END:VCARD",
];

/**
 * Download the CIQ contact card to the user's device.
 * Uses a data URI for reliable iOS Safari support.
 * On mobile the OS will prompt to add it directly to Contacts.
 */
export function downloadVCard() {
  const vcf = VCF_LINES.join("\r\n");
  const dataUri = "data:text/vcard;charset=utf-8," + encodeURIComponent(vcf);
  const link = document.createElement("a");
  link.href = dataUri;
  link.download = "CreativeIQ.vcf";
  document.body.appendChild(link);
  link.click();
  link.remove();
}

/**
 * Downloads the vCard and then initiates a phone call after a short delay,
 * giving the OS time to process the contact file first.
 * The tel: redirect is skipped on desktop where it has no effect.
 */
export function saveAndCall() {
  downloadVCard();
  if (/Mobi|Android/i.test(navigator.userAgent)) {
    setTimeout(() => {
      window.location.href = "tel:+12108380177";
    }, 700);
  }
}
