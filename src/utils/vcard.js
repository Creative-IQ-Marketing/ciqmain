/**
 * CreativeIQ vCard utility
 * Generates a VCF 3.0 contact card and triggers a native download.
 * Works on iOS Safari, Android Chrome, and desktop browsers — no app required.
 */

async function getLogoBase64(url) {
  const response = await fetch(url);
  const blob = await response.blob();
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result.split(",")[1]);
    reader.readAsDataURL(blob);
  });
}

export async function downloadVCard() {
  const logoBase64 = await getLogoBase64(
    "https://assets.cdn.filesafe.space/5f7iztRPELugzDENTIXd/media/696726c902f1be6f8056c91d.png",
  );

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
    `PHOTO;ENCODING=b;TYPE=JPEG:${logoBase64}`, // embedded, not URL
    "ADR;TYPE=WORK:;;San Antonio;TX;78205;US",
    "NOTE:AI-ready SEO\\, PPC\\, CRM automation & web development. San Antonio TX.",
    "CATEGORIES:Marketing,SEO,PPC,CRM,Web Development",
    "END:VCARD",
  ];

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
