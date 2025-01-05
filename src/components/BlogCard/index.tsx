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
            <Link to={article.link}>
                <img src={article.thumbnail} alt={article.title} className={styles.thumbnail} />
                <h2>{article.title}</h2>
            </Link>
            <p>{article.postedAt}</p>
        </div>
    );
}
  
export default BlogCard;