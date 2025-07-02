import * as cheerio from "cheerio";

type CompanyIntroSections = {
  intro: string[];
  vision: string[];
  coreValues: string[];
  services: string[];
  contact: string[];
};

export const parseCompanyIntro = (
  html: string
): {
  intro: string;
  vision: string;
  coreValues: string;
  services: string;
  contact: string;
} => {
  const $ = cheerio.load(html);
  const sections: CompanyIntroSections = {
    intro: [],
    vision: [],
    coreValues: [],
    services: [],
    contact: [],
  };

  let currentKey: keyof CompanyIntroSections | null = null;

  $("body")
    .children()
    .each((_, el) => {
      const text = $(el).text().trim();

      if ($(el).is("p") && text.includes("Giới thiệu")) {
        currentKey = "intro";
      } else if ($(el).is("p") && text.includes("Tầm nhìn")) {
        currentKey = "vision";
      } else if ($(el).is("p") && text.includes("Giá trị cốt lõi")) {
        currentKey = "coreValues";
      } else if ($(el).is("p") && text.includes("Sản phẩm")) {
        currentKey = "services";
      } else if ($(el).is("p") && text.includes("Liên hệ")) {
        currentKey = "contact";
      } else if (currentKey) {
        if ($(el).is("ul")) {
          $(el)
            .find("li")
            .each((_, li) => {
              const item = $(li).text().trim();
              if (item) sections[currentKey!].push(item);
            });
        } else {
          if (text) sections[currentKey].push(text);
        }
      }
    });

  return {
    intro: sections.intro.join("\n"),
    vision: sections.vision.join("\n"),
    coreValues: sections.coreValues.join("\n"),
    services: sections.services.join("\n"),
    contact: sections.contact.join("\n"),
  };
};


export const combineCompanyIntroHtml = (sections: {
  intro: string;
  vision: string;
  coreValues: string;
  services: string;
  contact: string;
}) => {
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
    ${createParagraphs("Giới thiệu về [Tên Công Ty]", sections.intro)}
    ${createParagraphs("Tầm nhìn và Sứ mệnh", sections.vision)}
    ${createListSection("Giá trị cốt lõi", sections.coreValues)}
    ${createParagraphs("Sản phẩm & Dịch vụ", sections.services)}
    ${createParagraphs("Liên hệ", sections.contact)}
  `;
};
