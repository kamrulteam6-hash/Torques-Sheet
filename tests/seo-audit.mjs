const base = process.env.AUDIT_BASE_URL || "http://localhost:3100";
const origin = "https://torquesheet.com";
const sitemapResponse = await fetch(`${base}/sitemap.xml`);

if (!sitemapResponse.ok) {
  throw new Error(`Sitemap returned HTTP ${sitemapResponse.status}`);
}

const sitemap = await sitemapResponse.text();
const urls = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => match[1]);
const issues = [];
const titles = new Map();
const descriptions = new Map();
let nextIndex = 0;

const extract = (html, pattern) => html.match(pattern)?.[1]?.trim() || "";

async function auditWorker() {
  while (nextIndex < urls.length) {
    const url = urls[nextIndex++];
    try {
      const response = await fetch(url.replace(origin, base));
      const html = await response.text();
      const title = extract(html, /<title>(.*?)<\/title>/is);
      const description = extract(
        html,
        /<meta name="description" content="([^"]*)"/i,
      );
      const canonical = extract(
        html,
        /<link rel="canonical" href="([^"]*)"/i,
      );
      const robots = extract(html, /<meta name="robots" content="([^"]*)"/i);
      const openGraphTitle = extract(html, /<meta property="og:title" content="([^"]*)"/i);
      const openGraphDescription = extract(html, /<meta property="og:description" content="([^"]*)"/i);
      const openGraphUrl = extract(html, /<meta property="og:url" content="([^"]*)"/i);
      const openGraphImage = extract(html, /<meta property="og:image" content="([^"]*)"/i);
      const twitterCard = extract(html, /<meta name="twitter:card" content="([^"]*)"/i);
      const twitterTitle = extract(html, /<meta name="twitter:title" content="([^"]*)"/i);
      const twitterDescription = extract(html, /<meta name="twitter:description" content="([^"]*)"/i);
      const twitterImage = extract(html, /<meta name="twitter:image" content="([^"]*)"/i);
      const hasHeading = /<h1(?:\s|>)/i.test(html);
      const xRobotsTag = response.headers.get("x-robots-tag") || "";

      if (
        !response.ok ||
        !title ||
        !description ||
        !canonical ||
        !hasHeading ||
        !openGraphTitle ||
        !openGraphDescription ||
        !openGraphUrl ||
        !openGraphImage ||
        !twitterCard ||
        !twitterTitle ||
        !twitterDescription ||
        !twitterImage ||
        /noindex|nofollow/i.test(`${robots} ${xRobotsTag}`) ||
        canonical !== url
      ) {
        issues.push({
          url,
          status: response.status,
          title: Boolean(title),
          descriptionLength: description.length,
          canonical,
          robots,
          xRobotsTag,
          hasHeading,
          socialMetadataComplete: Boolean(
            openGraphTitle &&
              openGraphDescription &&
              openGraphUrl &&
              openGraphImage &&
              twitterCard &&
              twitterTitle &&
              twitterDescription &&
              twitterImage,
          ),
        });
      }

      if (title) {
        if (titles.has(title)) {
          issues.push({ url, title, duplicateTitleWith: titles.get(title) });
        } else {
          titles.set(title, url);
        }
      }
      if (description) {
        if (descriptions.has(description)) {
          issues.push({
            url,
            duplicateDescriptionWith: descriptions.get(description),
          });
        } else {
          descriptions.set(description, url);
        }
      }
    } catch (error) {
      issues.push({ url, error: String(error) });
    }
  }
}

await Promise.all(Array.from({ length: 12 }, () => auditWorker()));

console.log(
  JSON.stringify(
    {
      audited: urls.length,
      uniqueTitles: titles.size,
      uniqueDescriptions: descriptions.size,
      issueCount: issues.length,
      issues: issues.slice(0, 100),
    },
    null,
    2,
  ),
);

if (issues.length) process.exitCode = 1;
