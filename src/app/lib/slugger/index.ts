import GitHubSlugger from "github-slugger";

class Slugger {
  private slugger: GitHubSlugger;

  constructor() {
    this.slugger = new GitHubSlugger();
  }

  reset() {
    this.slugger.reset();
  }

  getSlug(text: string) {
    return this.slugger.slug(text);
  }

  generateToc(markdown: string) {
    this.reset();
    const toc: { id: string; title: string; level: number }[] = [];
    markdown.split("\n").forEach((line) => {
      const match = line.match(/^(#{1,3})\s+(.*)/);
      if (match) {
        const level = match[1].length;
        const title = match[2].trim();
        const id = this.getSlug(title);
        toc.push({ id, title, level });
      }
    });
    return toc;
  }
}

// NOTE: シングルトンとして使わないと、同じタイトルの場合のslugに使う採番が狂う
export const sluggerInstance = new Slugger();
