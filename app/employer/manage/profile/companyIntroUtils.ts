type CompanyIntroSections = {
  intro: string[];
  vision: string[];
  coreValues: string[];
  services: string[];
  contact: string[];
};

export const parseCompanyIntro = (html: string): {
  intro: string;
  vision: string;
  coreValues: string;
  services: string;
  contact: string;
} => {
  const div = document.createElement("div");
  div.innerHTML = html;

  const sections = {
    intro: [] as string[],
    vision: [] as string[],
    coreValues: [] as string[],
    services: [] as string[],
    contact: [] as string[],
  };

  let currentKey: keyof typeof sections | null = null;

  for (const child of Array.from(div.children)) {
    const text = child.textContent?.trim() || "";

    // Xác định mục hiện tại
    if (child.tagName === "P" && text.includes("Giới thiệu")) {
      currentKey = "intro";
    } else if (child.tagName === "P" && text.includes("Tầm nhìn")) {
      currentKey = "vision";
    } else if (child.tagName === "P" && text.includes("Giá trị cốt lõi")) {
      currentKey = "coreValues";
    } else if (child.tagName === "P" && text.includes("Sản phẩm")) {
      currentKey = "services";
    } else if (child.tagName === "P" && text.includes("Liên hệ")) {
      currentKey = "contact";
    } else if (currentKey) {
      if (child.tagName === "UL") {
        const items = Array.from(child.querySelectorAll("li")).map((li) =>
          li.textContent?.trim() || ""
        );
        sections[currentKey].push(...items);
      } else {
        sections[currentKey].push(text);
      }
    }
  }

  return {
    intro: sections.intro.join("\n"),
    vision: sections.vision.join("\n"),
    coreValues: sections.coreValues.join("\n"),
    services: sections.services.join("\n"),
    contact: sections.contact.join("\n"),
  };
};


export const combineCompanyIntroHtml = () => {
  const intro = (document.getElementById("intro") as HTMLTextAreaElement)?.value;
  const vision = (document.getElementById("vision") as HTMLTextAreaElement)?.value;
  const coreValues = (document.getElementById("coreValues") as HTMLTextAreaElement)?.value;
  const services = (document.getElementById("services") as HTMLTextAreaElement)?.value;
  const contact = (document.getElementById("contact") as HTMLTextAreaElement)?.value;

  const createParagraphs = (title: string, text: string) => {
    const paragraphs = text
      .split("\n")
      .filter((line) => line.trim() !== "")
      .map((line) => `<p>${line.trim()}</p>`)
      .join("");
    return `<p><strong>${title}</strong></p>${paragraphs}`;
  };

  const createListSection = (title: string, text: string) => {
    const items = text
      .split("\n")
      .filter((line) => line.trim() !== "")
      .map((line) => `<li>${line.trim()}</li>`)
      .join("");
    return `<p><strong>${title}</strong></p><ul>${items}</ul>`;
  };

  return `
    ${createParagraphs("Giới thiệu về [Tên Công Ty]", intro)}
    ${createParagraphs("Tầm nhìn và Sứ mệnh", vision)}
    ${createListSection("Giá trị cốt lõi", coreValues)}
    ${createParagraphs("Sản phẩm & Dịch vụ", services)}
    ${createParagraphs("Liên hệ", contact)}
  `;
};