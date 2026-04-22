/**
 * CreativeIQ vCard utility
 * Generates a VCF 3.0 contact card and triggers a native download.
 * Works on iOS Safari, Android Chrome, and desktop browsers — no app required.
 */

const VCF_LINES = [
  "BEGIN:VCARD",
  "VERSION:3.0",
  "FN:CreativeIQ Marketing",
  "N:Marketing;CreativeIQ;;;",
  "ORG:CreativeIQ Marketing",
  "TITLE:Full-Service Digital Marketing Agency",
  "TEL;TYPE=WORK,VOICE:+12108380177",
  "EMAIL;TYPE=WORK,INTERNET:CiQ@creativeiq.marketing",
  "URL:https://creativeiq.marketing",
  "ADR;TYPE=WORK:;;San Antonio;TX;78205;US",
  "NOTE:AI-ready SEO\\, PPC\\, CRM automation & web development. San Antonio TX.",
  "CATEGORIES:Marketing,SEO,PPC,CRM,Web Development",
  "END:VCARD",
];

/**
 * Download the CIQ contact card to the user's device.
 * On mobile the OS will prompt to add it directly to Contacts.
 */
export function downloadVCard() {
  const vcf = VCF_LINES.join("\r\n");
  const blob = new Blob([vcf], { type: "text/vcard;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "CreativeIQ.vcf";
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

/**
 * Downloads the vCard and then initiates a phone call after a short delay,
 * giving the OS time to process the contact file first.
 */
export function saveAndCall() {
  downloadVCard();
  setTimeout(() => {
    window.location.href = "tel:+12108380177";
  }, 700);
}
