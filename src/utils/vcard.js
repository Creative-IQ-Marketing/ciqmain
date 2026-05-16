/**
 * CreativeIQ vCard utility
 * Generates a VCF 3.0 contact card and triggers a native download.
 * Works on iOS Safari, Android Chrome, and desktop browsers — no app required.
 */

async function getLogoBase64(url) {
  try {
    // Handle failed fetch requests and CORS errors
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(
        `Failed to fetch logo: ${response.status} ${response.statusText}`,
      );
    }

    const blob = await response.blob();

    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onerror = () => {
        console.error("FileReader error:", reader.error);
        reject(new Error("Failed to read logo file"));
      };

      reader.onloadend = () => {
        // Handle null/undefined FileReader results
        if (!reader.result) {
          console.error("FileReader returned empty result");
          reject(new Error("Logo file is empty"));
          return;
        }

        const base64 = reader.result.split(",")[1];
        if (!base64) {
          console.error("Failed to extract base64 from FileReader result");
          reject(new Error("Invalid logo format"));
          return;
        }

        resolve(base64);
      };

      reader.readAsDataURL(blob);
    });
  } catch (error) {
    // Log error but provide fallback to prevent UI crash
    console.error("Error loading logo:", error);

    // Check if it's a CORS error or network error
    if (error instanceof TypeError && error.message.includes("CORS")) {
      console.error("CORS error when fetching logo from CDN");
    }

    // Return empty string to allow vCard to be generated without logo
    throw new Error(`Could not load logo: ${error.message}`);
  }
}

export async function downloadVCard() {
  try {
    let logoBase64 = null;

    try {
      logoBase64 = await getLogoBase64(
        "https://assets.cdn.filesafe.space/5f7iztRPELugzDENTIXd/media/696726c902f1be6f8056c91d.png",
      );
    } catch (logoError) {
      // Log the error but continue with vCard generation without logo
      console.warn(
        "Proceeding with vCard generation without logo:",
        logoError.message,
      );
    }

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
    ];

    // Only add PHOTO if logo was successfully loaded
    if (logoBase64) {
      VCF_LINES.push(`PHOTO;ENCODING=b;TYPE=JPEG:${logoBase64}`);
    }

    VCF_LINES.push(
      "ADR;TYPE=WORK:;;San Antonio;TX;78205;US",
      "NOTE:AI-ready SEO\\, PPC\\, CRM automation & web development. San Antonio TX.",
      "CATEGORIES:Marketing,SEO,PPC,CRM,Web Development",
      "END:VCARD",
    );

    const vcf = VCF_LINES.join("\r\n");
    const dataUri = "data:text/vcard;charset=utf-8," + encodeURIComponent(vcf);
    const link = document.createElement("a");
    link.href = dataUri;
    link.download = "CreativeIQ.vcf";
    document.body.appendChild(link);
    link.click();
    link.remove();
  } catch (error) {
    // Log the error and throw to caller for UI handling
    console.error("Failed to download vCard:", error);
    throw error;
  }
}

/**
 * Downloads the vCard and then initiates a phone call after a short delay,
 * giving the OS time to process the contact file first.
 * The tel: redirect is skipped on desktop where it has no effect.
 */
export function saveAndCall() {
  downloadVCard().catch((error) => {
    console.error("saveAndCall error:", error);
    // Fail gracefully - still attempt the phone call
  });

  if (/Mobi|Android/i.test(navigator.userAgent)) {
    setTimeout(() => {
      window.location.href = "tel:+12108380177";
    }, 700);
  }
}
