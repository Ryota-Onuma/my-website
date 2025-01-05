import { ReactNode } from "react";
import styles from "./styles.module.css";
import Link from "@docusaurus/Link";


interface BlogCardProps {
    article: {
      title: string;
      postedAt: string;
      thumbnail: string; // サムネイル画像のURL
      link: string; // 記事のURL
    };
  }

const BlogCard: React.FC<BlogCardProps> = ({ article }):ReactNode => {
    return (
        <div className={styles.card}>
            <Link href={article.link} className={styles.link}>
                <img src={article.thumbnail} alt={article.title} className={styles.thumbnail} />
                <h2>{article.title}</h2>
                <p>{article.postedAt}</p>
            </Link>
        </div>
    );
}
  
export default BlogCard;